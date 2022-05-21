import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTwilioData } from "../data/TwilioData";
import { useLocalStorage } from "../utils/useLocalStorage";
import StartCall from "../components/call/StartCall";
import StartActivity from "../components/call/StartActivity";
import axios from "axios";
import { useCommon } from "../utils/useCommon";
import { Config } from "../data/Config";
import io from "socket.io-client";

import Video from "twilio-video";
import RTime from "../components/satrtactivity/RTime";

const Classroom = () => {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const navigate = useNavigate();
  const { sessionid } = useParams();
  const { HideCircularProgress, ShowCircularProgress } = useCommon();
  const [twiliotoken, setTwilioToken] = useState("");
  const [getactivitydetails, setGetactivitydetails] = useState(null);
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isvideoon, setIsVideoOn] = useState(true);
  const [isaudioon, setIsAudioOn] = useState(true);
  const [isactivity, setIsActivity] = useState(false);
  const [activityname, setActivityName] = useState(null);
  const [scheduledetails, setscheduledetails] = useState(null);
  const [activitydata, setActivitydata] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagetext, setMessageText] = useState("");
  const [bottomact, setBottomAct] = useState(false);
  const [showresult, setShowresult] = useState(false);
  const [details, setdetails] = useState(null);

  const socket = io.connect("https://socket.fahm-technologies.com");

  useEffect(() => {
    window.localStorage.removeItem("messages");
  }, []);

  useEffect(() => {
    navigate("/startcall/" + sessionid);
  }, [isactivity]);

  useEffect(() => {
    console.log("activityname", activityname);
  }, [activityname]);

  useEffect(async () => {
    if (auth && typeof auth.id !== "undefined") {
      const joindata = { userid: auth.id, roomname: sessionid };
      socket.emit("joinroom", joindata);

      ShowCircularProgress();
      await axios
        .post(
          Config.baseUrl + "/tutors/get-room-token",
          { roomid: sessionid },
          { headers: { Authorization: `bearer ${auth.token}` } }
        )
        .then((response) => {
          // setTwilioToken(response.data.authToken);
          HideCircularProgress();
        })
        .catch((error) => {
          HideCircularProgress();
          setAuth(null);
          navigate("/login");
        });
      await axios
        .get(
          Config.baseUrl +
            "/tutors/schedule/sessionId/activities?sessionId=" +
            sessionid,
          { headers: { Authorization: `bearer ${auth.token}` } }
        )
        .then((response) => {
          // setTwilioToken(response.data.authToken);
          setGetactivitydetails(response.data);
          console.log(response.data);
          HideCircularProgress();
        })
        .catch((error) => {
          HideCircularProgress();
          setAuth(null);
          navigate("/login");
        });
    }
  }, [auth]);

  useEffect(async () => {
    if (auth && typeof auth.id !== "undefined") {
      ShowCircularProgress();
      await axios

        .get(
          Config.baseUrl + "/tutors/schedule/sessionId?sessionId=" + sessionid,
          { headers: { Authorization: `bearer ${auth.token}` } }
        )
        .then((respone) => {
          // setTwilioToken(response.data.authToken);
          console.log(respone.data);
          setscheduledetails(respone.data);
          HideCircularProgress();
        })
        .catch((error) => {
          HideCircularProgress();
          setAuth(null);
          navigate("/login");
        });
    }
  }, [auth]);

  useEffect(() => {
    console.log("activityname", activityname);
  }, [activityname]);

  useEffect(() => {
    socket.on("activity", (data) => {
      console.log("activityname", activityname);
      console.log(" data.activity", data.activity);
      if (data.activity != activityname) {
        if (
          data.activity != activityname &&
          data.activity !== "startcall" &&
          data.activity !== "endcall"
        ) {
          window.localStorage.setItem("activity", data.activity, data.details);
          setActivityName(data.activity);
          var detailss = data.details;
          setActivitydata(detailss);
          console.log(data.activity);
          setIsActivity(true);
          setBottomAct(false);
        } else {
          setActivityName(data.activity);
          window.localStorage.removeItem("activity");
          setIsActivity(false);
        }
      } else {
        setBottomAct(false);
      }
    });

    socket.on("message", (data) => {
      let messa = JSON.parse(window.localStorage.getItem("messages"));
      if (!messa) {
        window.localStorage.setItem("messages", JSON.stringify([]));
        messa = JSON.parse(window.localStorage.getItem("messages"));
      }
      messa.push(data);
      window.localStorage.setItem("messages", JSON.stringify(messa));
      setMessages(JSON.parse(window.localStorage.getItem("messages")));
      setMessageText("");
    });

    socket.on("joinroom", (data) => {
      if (window.localStorage.getItem("activity")) {
        StartCurrentActivity();
      }
    });
  }, [socket]);

  async function StartCurrentActivity() {
    socket.emit("activity", {
      activity: window.localStorage.getItem("activity"),
      roomname: sessionid,
    });
  }

  useEffect(() => {
    if (twiliotoken && twiliotoken !== "") {
      const participantConnected = (participant) => {
        setParticipants((prevParticipants) => [
          ...prevParticipants,
          participant,
        ]);
      };
      const participantDisconnected = (participant) => {
        setParticipants((prevParticipants) =>
          prevParticipants.filter((p) => p !== participant)
        );
      };

      Video.connect(twiliotoken, {
        name: sessionid,
      }).then((room) => {
        setRoom(room);
        room.on("participantConnected", participantConnected);
        room.on("participantDisconnected", participantDisconnected);
        room.participants.forEach(participantConnected);
      });
      return () => {
        setRoom((currentRoom) => {
          if (
            currentRoom &&
            currentRoom.localParticipant.state === "connected"
          ) {
            currentRoom.localParticipant.tracks.forEach(function (
              trackPublication
            ) {
              trackPublication.track.stop();
            });
            currentRoom.disconnect();
            return null;
          } else {
            return currentRoom;
          }
        });
      };
    }
  }, [sessionid, twiliotoken]);

  async function EndCall() {
    socket.emit("activity", { activity: "endcall", roomname: sessionid });
    window.localStorage.removeItem("activity");
    setTwilioToken("");
    window.location.href = "/dashboard";
  }

  async function VideoOnOff(on) {
    if (on) {
      room.localParticipant.videoTracks.forEach(function (track, trackId) {
        track.track.disable();
        setIsVideoOn(false);
      });
    } else {
      room.localParticipant.videoTracks.forEach(function (track, trackId) {
        track.track.enable();
        setIsVideoOn(true);
      });
    }
  }

  async function AudioOnOff(on) {
    if (on) {
      room.localParticipant.audioTracks.forEach(function (track, trackId) {
        track.track.disable();
        setIsAudioOn(false);
      });
    } else {
      room.localParticipant.audioTracks.forEach(function (track, trackId) {
        track.track.enable();
        setIsAudioOn(true);
      });
    }
  }

  async function StartNewActivity(actname, details) {
    debugger;
    socket.emit("activity", {
      activity: actname,
      roomname: sessionid,
      details: details,
    });
    if (actname !== null) {
      setShowresult(false);
    }
  }

  function Showdata(data) {
    debugger;
    if (data !== null) {
      if (showresult == false) {
        setShowresult(true);
        setdetails(data);
      } else {
        setShowresult(false);
        // setdetails(data)
      }
    }
  }

  async function StartCallOnly() {
    socket.emit("activity", { activity: "startcall", roomname: sessionid });
  }

  async function SendMessage() {
    socket.emit("chat", {
      roomname: sessionid,
      username: auth.name,
      userid: auth.id,
      messagetext: messagetext,
    });
  }
  return (
    <>
      <div className="teachMainBox teachMainBox2">
        <div className="wapper overHidden">
          <header>
            <div className="topLeft">
              <div className="timerBox timerBox2 timerBox3">
                <div className="timerTxt">
                  Attendance
                  <strong>
                    {" "}
                    2/{scheduledetails && scheduledetails.students.length}
                  </strong>
                </div>
              </div>
            </div>
            <div class="subNameBox">
              <div class="homeLion2">
                <img src="/img/homeLion2.svg" />
              </div>
              <span>Smart Active</span>
              <div class="SubName">
                <strong>
                  LEON {scheduledetails && scheduledetails.sessionName}
                  <br />
                  L1 Session 02
                </strong>
                <b>S1</b>
              </div>
            </div>

            <a href="#" className="logoBox">
              <img src="/img/logo.svg" />
            </a>
            <div className="topRight">
              <div className="profil brainBtn">
                <div className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src="/img/spacer.png" />
                  </a>
                  <div
                    className="dropdown-menu  dropdown-menu-center"
                    aria-labelledby="dropdownMenuButton"
                  >
                    {/* <h4>Select Activity</h4>
                    {getactivitydetails && getactivitydetails.map((item, index) => {
                      return <StartActivity getactivitydetails={item} key={index} />
                    })} */}
                  </div>
                </div>
              </div>

              <div className="recoTop">
                <a
                  href="#"
                  className="recBtn"
                  data-toggle="modal"
                  data-target="#stopPup"
                >
                  <img src="/img/recIcon.svg" />
                </a>
                <RTime schedule={scheduledetails} />
                <a href="#" className="wifiBtn">
                  <img src="/img/wifIcon.svg" />
                </a>
                <div className="clear"></div>
              </div>
              <div className="profil">
                <div className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src="/img/proImg.png" />
                  </a>
                  <div
                    className="dropdown-menu  dropdown-menu-right"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="#">
                      My Profile
                    </a>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {isactivity ? (
            <StartActivity
              participants={participants}
              sessionid={sessionid}
              room={room}
              StartNewActivity={StartNewActivity}
              isaudioon={isaudioon}
              isvideoon={isvideoon}
              StartCallOnly={StartCallOnly}
              messages={messages}
              auth={auth}
              SendMessage={SendMessage}
              messagetext={messagetext}
              setMessageText={setMessageText}
              activityname={activityname}
              activitydata={activitydata}
              Showdata={Showdata}
              showresult={showresult}
              details={details}
            />
          ) : (
            <StartCall
              participants={participants}
              room={room}
              isaudioon={isaudioon}
              isvideoon={isvideoon}
            />
          )}
        </div>

        <div className="teachBotomLinks">
          <a
            href="#"
            className="techListIcon"
            style={{ cursor: "pointer" }}
          ></a>
          {room && (
            <Link
              to=""
              className={isaudioon ? "techMicIcon" : "techMicIcon active"}
              onClick={(e) => room && AudioOnOff(isaudioon)}
              style={{ cursor: "pointer" }}
            ></Link>
          )}
          <Link
            to=""
            className="techEndIcon active"
            onClick={(e) => EndCall()}
            style={{ cursor: "pointer" }}
          ></Link>
          {room && (
            <Link
              to=""
              className={isvideoon ? "techVidIcon" : "techVidIcon active"}
              onClick={(e) => room && VideoOnOff(isvideoon)}
              style={{ cursor: "pointer" }}
              disable={!room}
            ></Link>
          )}
          <Link
            to=""
            className={bottomact ? "techOptIcon active" : "techOptIcon"}
            style={{ cursor: "pointer" }}
            onClick={(e) => setBottomAct(!bottomact)}
          ></Link>
        </div>

        <div
          className={bottomact ? "techOptBox active" : "techOptBox"}
          style={{ height: "40%" }}
        >
          <div className={"model-body"}>
            <button
              type="button"
              className="close"
              data-dismiss="techOptBox active"
              onClick={(e) => setBottomAct(!bottomact)}
            >
              <h3> &times;</h3>
            </button>
          </div>
          <h3>Class Exercise </h3>
          <div className="classEx">
            <ul>
              {/* <li>
                <a href="#">
                  <div className="classExBox shareBox"></div>
                  <h5>Share Screen</h5>
                </a>
              </li> */}
              <li>
                <Link
                  to=""
                  style={{ cursor: "pointer" }}
                  onClick={(e) => StartNewActivity("whiteboard")}
                >
                  <div className="classExBox whiteBox"></div>
                  <h5>White Board</h5>
                </Link>
              </li>
              <li>
                <a href="#" data-toggle="modal" data-target="#startActivitypup">
                  <div className="classExBox brainBox"></div>
                  <h5>Start Activity</h5>
                </a>
              </li>
              {/* <li>
                <a href="#">
                  <div className="classExBox muteIcon"></div>
                  <h5>Mute All</h5>
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        {/* <div className="subNameBox">
          <div className="homeLion2">
            <img src="/img/homeLion2.svg" />
          </div>
          <span>Smart Active</span>
          <div className="SubName">
            <strong>
              LEON English &gt; <br />
              L1 &gt;Session 02
            </strong>
            <b>S1</b>
          </div>
        </div> */}
      </div>

      <div className="modal startActivitypup" id="startActivitypup">
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
            <div className="modal-body">
              <h4>Select Activity</h4>
              <div className="starLink">
                {getactivitydetails &&
                  getactivitydetails.map((details) => {
                    return (
                      <Link
                        key={details.activityid}
                        to=""
                        style={{ cursor: "pointer" }}
                        data-dismiss="modal"
                        onClick={(e) =>
                          StartNewActivity(details.activityid, details)
                        }
                      >
                        {details.activityid}. {details.activityname}
                      </Link>
                    );
                  })}
                <Link
                  to=""
                  style={{ cursor: "pointer", height: "10%" }}
                  data-dismiss="modal"
                  onClick={(e) => StartNewActivity(5)}
                >
                  5. Quantity
                </Link>
                <Link
                  to=""
                  style={{ cursor: "pointer", height: "10%" }}
                  data-dismiss="modal"
                  onClick={(e) => StartNewActivity(6)}
                >
                  6. Mapping-Ability
                </Link>
              </div>
              {/* <div className="btnBOx">
                <a href="#" className="btn" data-dismiss="modal">
                  DONE
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="modal startActivitypup stopPupBox" id="stopPup">
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h4>Confirm</h4>

              <div className="txt1">
                <span>Do you want to END!</span>
                <strong>Session 02</strong>
              </div>

              <div className="radioBoxes">
                <ul>
                  <li>
                    <label className="container">
                      Completed
                      <input type="radio" name="radio" />
                      <span className="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label className="container">
                      In Progress
                      <input type="radio" name="radio" />
                      <span className="checkmark"></span>
                    </label>
                  </li>
                  <div className="clear"></div>
                </ul>
              </div>
            </div>
            <div className="noYesBox">
              <a href="#" data-dismiss="modal">
                No
              </a>
              <a href="#" data-dismiss="modal">
                Yes
              </a>
              <div className="clear"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Classroom;
