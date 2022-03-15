import React from "react";
import Participant from "./Participant";
import ParticipantNotConnected from "./ParticipantNotConnected";
import LocalParticipant from "./LocalParticipant";

const StartCall = ({ participants, room, isaudioon, isvideoon }) => {
  return (
    <>
      <div className="container">
        <div className="innerContain innerContain2">
          <ul className="row">
            <li className="col-lg-4 col-md-4 col-sm-4">
              {participants && participants.length > 0 && participants[0] ? (
                <Participant
                  key={participants[0].sid}
                  participant={participants[0]}
                />
              ) : (
                <ParticipantNotConnected />
              )}
            </li>
            <li className="col-lg-4 col-md-4 col-sm-4">
              {participants && participants.length > 0 && participants[1] ? (
                <Participant
                  key={participants[1].sid}
                  participant={participants[1]}
                />
              ) : (
                <ParticipantNotConnected />
              )}
            </li>
            <li className="col-lg-4 col-md-4 col-sm-4">
              {participants && participants.length > 0 && participants[2] ? (
                <Participant
                  key={participants[2].sid}
                  participant={participants[2]}
                />
              ) : (
                <ParticipantNotConnected />
              )}
            </li>
            <li className="col-lg-4 col-md-4 col-sm-4">
              {participants && participants.length > 0 && participants[3] ? (
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
              {participants && participants.length > 0 && participants[4] ? (
                <Participant
                  key={participants[4].sid}
                  participant={participants[4]}
                />
              ) : (
                <ParticipantNotConnected />
              )}
            </li>

            <li className="col-lg-4 col-md-4 col-sm-4">
              {participants && participants.length > 0 && participants[5] ? (
                <Participant
                  key={participants[5].sid}
                  participant={participants[5]}
                />
              ) : (
                <ParticipantNotConnected />
              )}
            </li>
            <li className="col-lg-4 col-md-4 col-sm-4">
              {participants && participants.length > 0 && participants[6] ? (
                <Participant
                  key={participants[6].sid}
                  participant={participants[6]}
                />
              ) : (
                <ParticipantNotConnected />
              )}
            </li>
            <li className="col-lg-4 col-md-4 col-sm-4">
              {participants && participants.length > 0 && participants[7] ? (
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
    </>
  );
};

export default StartCall;
