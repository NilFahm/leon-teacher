import React, { useState, useEffect, useRef } from "react";

const Participant = ({ participant }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [isaudioon, setIsAudioOn] = useState(true);
  const [isvideoon, setIsVideoOn] = useState(true);
  const videoRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    debugger;
    const trackpubsToTracks = (trackMap) =>
      Array.from(trackMap.values())
        .map((publication) => publication.track)
        .filter((track) => track !== null);

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    // const trackEnabled = (track) => {
    //   if (track.kind === "video") {
    //     setIsVideoOn(true);
    //   } else if (track.kind === "audio") {
    //     setIsAudioOn(true);
    //   }
    // };

    // const trackDisabled = (track) => {
    //   if (track.kind === "video") {
    //     setIsVideoOn(false);
    //   } else if (track.kind === "audio") {
    //     setIsAudioOn(false);
    //   }
    // };

    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);
    participant.on("trackEnabled", trackSubscribed);
    participant.on("trackDisabled", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      setIsVideoOn(videoTrack.isEnabled);
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    } else {
      setIsVideoOn(false);
    }
  }, [videoTracks]);

  useEffect(() => {
    debugger;
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      setIsAudioOn(audioTrack.isEnabled);
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    } else {
      setIsAudioOn(false);
    }
  }, [audioTracks]);

  return (
    <div class="studListBox">
      <div class="stuImgBox1">
        <div class="liveIcon">
          <a href="#">
            <img src="/img/liveIcon.svg" />
          </a>
        </div>
        <a href="#" className={isaudioon ? "micLink" : "micLink active"}></a>
        <a href="#" class="vidLink"></a>
        <a href="activity-matching.html" class="stuPlusLink"></a>
        {!isvideoon && (
          <>
            <div class="novidShow d-flex align-items-center justify-content-center">
              <img src="/img/novideoImg2Inner.svg" />
            </div>
            <img src="/img/novideoImg2.png" />
          </>
        )}
        <video
          ref={videoRef}
          autoPlay={true}
          style={{ display: isvideoon ? "block" : "none" }}
        />
        <audio ref={audioRef} autoPlay={true} />
      </div>
      <div class="stuName">
        <span>{participant.identity}</span>
      </div>
    </div>
  );
};

export default Participant;
