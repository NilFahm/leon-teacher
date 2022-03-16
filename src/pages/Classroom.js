import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTwilioData } from "../data/TwilioData";
import { useLocalStorage } from "../utils/useLocalStorage";
import StartCall from "../components/call/StartCall";
import StartActivity from "../components/call/StartActivity";
import io from "socket.io-client";

import Video from "twilio-video";

const Classroom = () => {
  const [auth] = useLocalStorage("auth", {});
  // const [messages, setMessages] = useLocalStorage("messages", []);
  const navigate = useNavigate();
  const { sessionid } = useParams();
  const { GetRoomToken } = useTwilioData();
  const [twiliotoken, setTwilioToken] = useState("");
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isvideoon, setIsVideoOn] = useState(true);
  const [isaudioon, setIsAudioOn] = useState(true);
  const [isactivity, setIsActivity] = useState(false);
  const [activityname, setActivityName] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagetext, setMessageText] = useState("");
  const [bottomact, setBottomAct] = useState(false);

  const socket = io.connect("https://socket.fahm-technologies.com");

  useEffect(async () => {
    if (auth && typeof auth.id !== "undefined") {
      const response = await GetRoomToken(auth.token, sessionid);
      setTwilioToken(response.authToken);
      const joindata = { userid: auth.id, roomname: sessionid };
      socket.emit("joinroom", joindata);
    }
  }, [auth]);

  useEffect(() => {
    console.log("activityname", activityname);
  }, [activityname]);

  useEffect(() => {
    let activname = activityname;
    socket.on("activity", (data) => {
      if (
        data.activity !== activityname &&
        data.activity !== "startcall" &&
        data.activity !== "endcall"
      ) {
        window.localStorage.setItem("activity", data.activity.toString());
        setActivityName(data.activity.toString());
        setIsActivity(true);
        setBottomAct(false);
      } else {
        setActivityName(null);
        window.localStorage.removeItem("activity");
        setIsActivity(false);
      }
    });

    socket.on("message", (data) => {
      let messa = messages;
      messa.push(data);
      setMessages(messa);
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
      });
    } else {
      room.localParticipant.videoTracks.forEach(function (track, trackId) {
        track.track.enable();
      });
    }
    setIsVideoOn(!on);
  }

  async function AudioOnOff(on) {
    if (on) {
      room.localParticipant.audioTracks.forEach(function (track, trackId) {
        track.track.disable();
      });
    } else {
      room.localParticipant.audioTracks.forEach(function (track, trackId) {
        track.track.enable();
      });
    }
    setIsAudioOn(!on);
  }

  async function StartNewActivity(actname) {
    socket.emit("activity", { activity: actname, roomname: sessionid });
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
                  Attendance <strong>8/8</strong>
                </div>
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
                    <h4>Select Activity</h4>
                    <div className="starLink">
                      <a href="teacher-className-matching.html">Matching</a>
                      <a href="teacher-className-classification.html">
                        Classification
                      </a>
                      <a href="teacher-className-discrimination.html">
                        Discrimination
                      </a>
                      <a href="teacher-className-spelling.html">
                        Correct the Spelling
                      </a>
                      <a href="teacher-className-identify.html">
                        Identify the Object
                      </a>
                      <a href="teacher-className-count.html">
                        Count the Numbers
                      </a>
                    </div>
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
                <div className="recTiming"> 00:17:46 </div>
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
              room={room}
              isaudioon={isaudioon}
              isvideoon={isvideoon}
              StartCallOnly={StartCallOnly}
              messages={messages}
              auth={auth}
              SendMessage={SendMessage}
              messagetext={messagetext}
              setMessageText={setMessageText}
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

        <div className={bottomact ? "techOptBox active" : "techOptBox"}>
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

        <div className="subNameBox">
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
        </div>
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
                <a href="teacher-className-matching.html">Matching</a>
                <a href="teacher-className-classification.html">
                  Classification
                </a>
                <a href="teacher-className-discrimination.html">
                  Discrimination
                </a>
                <a href="teacher-className-spelling.html">
                  Correct the Spelling
                </a>
                <a href="teacher-className-identify.html">
                  Identify the Object
                </a>
                <a href="teacher-className-count.html">Count the Numbers</a>
              </div>
              <div className="btnBOx">
                <a href="#" className="btn" data-dismiss="modal">
                  DONE
                </a>
              </div>
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
