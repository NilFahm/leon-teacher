import React, { useEffect, useState } from "react";
import LocalParticipant from "./LocalParticipant";
import ParticipantNotConnected from "./ParticipantNotConnected";
import Participant from "./Participant";
import Chat from "./Chat";
import Matching from "../activities/matching/Matching";
import Activity3 from "../activities/Observing-ability/Activity";
import Activity9 from "../activities/discrimination/Activity9";
import Activity10 from "../activities/colour-recognition/Activity10";
import { Link } from "react-router-dom";
import Result from "../result/result";
import Quantity from "../activities/Quantity Identification/Quantity";
import Mapping from "../activities/Mapping-ability/Mapping";

const StartActivity = ({
  participants,
  sessionid,
  StartNewActivity,
  room,
  isaudioon,
  isvideoon,
  StartCallOnly,
  newmessagecount,
  messages,
  auth,
  SendMessage,
  messagetext,
  setMessageText,
  activityname,
  Showdata,
  showresult,
  details
}) => {
  const [obl, setobl] = useState(0)

  useEffect(() => {
    console.log(showresult,details)
    console.log(activityname)
  }, [])
  
  // function Showdata(data) {
  //   if (showresult == true) {
  //     setShowresult(false)
  //     // setdetails(data)
  //     setobl(null)
  //   } else {
  //     setShowresult(true)
  //     setdetails(data)
  //     setobl(null)
  //   }
  // }

  return (
    <>
      <div className="container">
        <div className="arrowTop"></div>
        <div className="topBg"></div>
        <div className="innerContain">
          <div className="frameLeft1 FL">
            <div className="innHeader" style={{ zIndex: "100" }}>
              <h2>
                {activityname && activityname === "whiteboard" && "White Board"}
                {activityname && activityname === 3 && "Matching"}
                {activityname && activityname === 1 && "Observing ability"}
                {activityname && activityname === 4 && "Discrimination"}
                {activityname && activityname === 5 && "Quantity Identification"}
                {activityname && activityname === 6 && "Mapping-Ability"}
                {activityname && activityname === 2 && "Colour Recognition"}
              </h2>
            </div>
            <div className="viewImg1">
              <div
                className="closeBox"
                onClick={(e) => StartCallOnly()}
                style={{ cursor: "pointer", zIndex: "100" }}
              >
              </div>
              {showresult && <div className="charBtnBox"
                onClick={(e) => { Showdata() }}
                style={{ bottom: "5px", display: "block", zIndex: "10" }}>
              </div>}
              <div className="whiteBoardBox position-relative">
                {/* {activityname && setShowresult(false)} */}
                {activityname && activityname === 3 && (
                  <>
                    { showresult == false ? <Result sessionid={sessionid} StartNewActivity={Showdata} detail={activityname} /> : <Matching details={details} detail={activityname} sessionid={sessionid} />}
                  </>
                )}{" "}
                {activityname && activityname === 1 && (
                  <>
                    { showresult == false ? <Result sessionid={sessionid} StartNewActivity={Showdata} detail={activityname} /> : <Activity3 details={details} detail={activityname} sessionid={sessionid} obl={obl} />}
                  </>
                )}{" "}
                {activityname && activityname === 4 && (
                  <>
                    {showresult == false ? <Result sessionid={sessionid} StartNewActivity={Showdata} detail={activityname} /> : <Activity9 details={details} detail={activityname} sessionid={sessionid} />}
                  </>
                )}{" "}
                {activityname && activityname === 5 && (
                  <>
                    {showresult == false ? <Result sessionid={sessionid} StartNewActivity={Showdata} detail={activityname} /> : <Quantity details={details} detail={activityname} sessionid={sessionid} />}
                  </>
                )}{" "}
                {activityname && activityname === 2 && (
                  <>
                    {showresult == false ? <Result sessionid={sessionid} StartNewActivity={Showdata} detail={activityname} /> : <Activity10 details={details} detail={activityname} sessionid={sessionid} />}
                  </>
                )}{" "}
                {activityname && activityname === 6 && (
                  <>
                    {showresult == false ? <Result sessionid={sessionid} StartNewActivity={Showdata} detail={activityname} /> : <Mapping details={details} detail={activityname} sessionid={sessionid} />}
                  </>
                )}{" "}
                {activityname && activityname === "whiteboard" && (
                  <iframe
                    src={
                      "https://whiteboard.fahm-technologies.com/?whiteboardid=67c215e2-f2f4-49da-9c18-2f0df7c6fe81&username=" +
                      auth.name
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
                {/* {activitydata && activitydata.activityid == 1(<h6>h</h6>)} */}
              </div>
            </div>

            {/* <div className="shareBoxNew shareBoxNew2">
              <a href="#" className="shareBtn" data-content="toggle-text">
                Off
              </a>
            </div> */}
          </div>

          <div className="frameRight1 FR">
            <div className="viewTabs1">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="studList"
                  role="tabpanel"
                  aria-labelledby="studList-tab"
                >
                  <ul className="studList studList2 studList3">
                    <li>
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
                    <li>
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
                    <li>
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
                    <li>
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
                    <li>
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
                    <li>
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
                    <li>
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
                    <li>
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

                    <li className="w100 teachBox">
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

                    <div className="clear"></div>
                  </ul>
                </div>
                <div
                  className="tab-pane fade"
                  id="chatList"
                  role="tabpanel"
                  aria-labelledby="chatList-tab"
                >
                  <Chat
                    messages={messages}
                    auth={auth}
                    SendMessage={SendMessage}
                    messagetext={messagetext}
                    setMessageText={setMessageText}
                  />
                </div>
              </div>
              <ul className="nav nav-tabs tabsNew" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link active"
                    id="studList-tab"
                    data-toggle="tab"
                    href="#studList"
                    role="tab"
                    aria-controls="studList"
                    aria-selected="true"
                  >
                    List
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className="nav-link"
                    id="chatList-tab"
                    data-toggle="tab"
                    href="#chatList"
                    role="tab"
                    aria-controls="chatList"
                    aria-selected="false"
                  >
                    {newmessagecount && (
                      <span
                        style={{
                          width: "15px",
                          height: "15px",
                          background: "#ff0000",
                          borderRadius: "10px",
                          display: "block",
                          position: "absolute",
                          right: "30%",
                          marginTop: "4px",
                          fontSize: "11px",
                          color: " #fff",
                          textAlign: "center",
                          lineHeight: "15px",
                        }}
                      >
                        {newmessagecount}
                      </span>
                    )}
                    Chat
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      </div>
    </>
  );
};

export default StartActivity;
