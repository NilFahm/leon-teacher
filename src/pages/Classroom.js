import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTwilioData } from "../data/TwilioData";
import { useLocalStorage } from "../utils/useLocalStorage";
import Participant from "../components/call/Participant";
import ParticipantNotConnected from "../components/call/ParticipantNotConnected";

import Video from "twilio-video";
import LocalParticipant from "../components/call/LocalParticipant";

const Classroom = () => {
  const [auth] = useLocalStorage("auth", {});
  const navigate = useNavigate();
  const { sessionid } = useParams();
  const { GetRoomToken } = useTwilioData();
  const [twiliotoken, setTwilioToken] = useState(null);
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isvideoon, setIsVideoOn] = useState(true);
  const [isaudioon, setIsAudioOn] = useState(true);

  useEffect(async () => {
    if (auth && typeof auth.id !== "undefined") {
      const response = await GetRoomToken(auth.token, sessionid);
      setTwilioToken(response.authToken);
    }
  }, [auth]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
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
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
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
  }, [sessionid, twiliotoken]);

  async function EndCall() {
    setTwilioToken(null);
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

          <div className="container">
            <div className="innerContain innerContain2">
              <ul className="row">
                <li className="col-lg-4 col-md-4 col-sm-4">
                  {participants &&
                  participants.length > 0 &&
                  participants[0] ? (
                    <Participant
                      key={participants[0].sid}
                      participant={participants[0]}
                    />
                  ) : (
                    <ParticipantNotConnected />
                  )}
                </li>
                <li className="col-lg-4 col-md-4 col-sm-4">
                  {participants &&
                  participants.length > 0 &&
                  participants[1] ? (
                    <Participant
                      key={participants[1].sid}
                      participant={participants[1]}
                    />
                  ) : (
                    <ParticipantNotConnected />
                  )}
                </li>
                <li className="col-lg-4 col-md-4 col-sm-4">
                  {participants &&
                  participants.length > 0 &&
                  participants[2] ? (
                    <Participant
                      key={participants[2].sid}
                      participant={participants[2]}
                    />
                  ) : (
                    <ParticipantNotConnected />
                  )}
                </li>
                <li className="col-lg-4 col-md-4 col-sm-4">
                  {participants &&
                  participants.length > 0 &&
                  participants[3] ? (
                    <Participant
                      key={participants[3].sid}
                      participant={participants[3]}
                    />
                  ) : (
                    <ParticipantNotConnected />
                  )}
                </li>
                <li className="col-lg-4 col-md-4 col-sm-4">
                  {room ? (
                    <LocalParticipant
                      key={room.localParticipant.sid}
                      participant={room.localParticipant}
                      isaudioon={isaudioon}
                      isvideoon={isvideoon}
                    />
                  ) : (
                    <ParticipantNotConnected />
                  )}
                </li>
                <li className="col-lg-4 col-md-4 col-sm-4">
                  {participants &&
                  participants.length > 0 &&
                  participants[4] ? (
                    <Participant
                      key={participants[4].sid}
                      participant={participants[4]}
                    />
                  ) : (
                    <ParticipantNotConnected />
                  )}
                </li>

                <li className="col-lg-4 col-md-4 col-sm-4">
                  {participants &&
                  participants.length > 0 &&
                  participants[5] ? (
                    <Participant
                      key={participants[5].sid}
                      participant={participants[5]}
                    />
                  ) : (
                    <ParticipantNotConnected />
                  )}
                </li>
                <li className="col-lg-4 col-md-4 col-sm-4">
                  {participants &&
                  participants.length > 0 &&
                  participants[6] ? (
                    <Participant
                      key={participants[6].sid}
                      participant={participants[6]}
                    />
                  ) : (
                    <ParticipantNotConnected />
                  )}
                </li>
                <li className="col-lg-4 col-md-4 col-sm-4">
                  {participants &&
                  participants.length > 0 &&
                  participants[7] ? (
                    <Participant
                      key={participants[7].sid}
                      participant={participants[7]}
                    />
                  ) : (
                    <ParticipantNotConnected />
                  )}
                </li>
              </ul>
            </div>

            <div className="clear"></div>
          </div>
        </div>

        <div className="teachBotomLinks">
          <a
            href="#"
            className="techListIcon"
            style={{ cursor: "pointer" }}
          ></a>
          <Link
            to=""
            className={isaudioon ? "techMicIcon" : "techMicIcon active"}
            onClick={(e) => AudioOnOff(isaudioon)}
            style={{ cursor: "pointer" }}
          ></Link>
          <Link
            to=""
            className="techEndIcon active"
            onClick={(e) => EndCall()}
            style={{ cursor: "pointer" }}
          ></Link>
          <Link
            to=""
            className={isvideoon ? "techVidIcon" : "techVidIcon active"}
            onClick={(e) => VideoOnOff(isvideoon)}
            style={{ cursor: "pointer" }}
          ></Link>
          <a href="#" className="techOptIcon" style={{ cursor: "pointer" }}></a>
        </div>

        <div className="techOptBox">
          <h3>Class Exercise </h3>
          <div className="classEx">
            <ul>
              <li>
                <a href="#">
                  <div className="classExBox shareBox"></div>
                  <h5>Share Screen</h5>
                </a>
              </li>
              <li>
                <a href="teacher-className-white-board.html">
                  <div className="classExBox whiteBox"></div>
                  <h5>White Board</h5>
                </a>
              </li>
              <li>
                <a href="#" data-toggle="modal" data-target="#startActivitypup">
                  <div className="classExBox brainBox"></div>
                  <h5>Start Activity</h5>
                </a>
              </li>
              <li>
                <a href="#">
                  <div className="classExBox muteIcon"></div>
                  <h5>Mute All</h5>
                </a>
              </li>
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
