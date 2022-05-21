import React, { useEffect, useState, useRef } from "react";
import "./matching.css";
import { useCommon } from '../../../utils/useCommon';
import { Config } from '../../../data/Config';
import { useLocalStorage } from '../../../utils/useLocalStorage';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Matching = ({ sessionid, details, detail }) => {
  const [dragid, SetDragId] = useState(0);
  const [trueid, setTrueId] = useState(false);
  const [ringimageid, setRingImageId] = useState(null);
  const navigate = useNavigate();
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [detailss, setdetailss] = useState(null)
  const successsound = useRef(null);
  const falsesound = useRef(null);
  var obl;

  useEffect(() => {
    getdata()
    Apicall()
    setInterval(() => {
      getdata()
      Apicall()
    }, 2000);
  }, [])

  useEffect(() => {
    if (trueid > 0) {
      setRingImageId(trueid);
      setTimeout(function () {
        setRingImageId(dragid);
      }, 2000);
      setTimeout(function () {
        setTrueId(null);
        SetDragId(null);
        setRingImageId(null);
      }, 4000);
    }
  }, [trueid]);

  async function getdata() {
    if (auth && typeof auth.id !== "undefined") {
      await axios
        .get(
          Config.baseUrl + "/tutors/schedule/sessionId/activities/activityId/studentId?sessionId=" + sessionid + "&activityId=" + detail + "&studentId=" + details,
          { headers: { Authorization: `bearer ${auth.token}` } }
        )
        .then((response) => {
          setdetailss(response.data)
          console.log(response.data)
          obl = JSON.parse(response.data.studentResult);
          console.log(obl)
        })
        .catch((error) => {
          setAuth(null)
          navigate("/login");
        });
    }
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    SetDragId(ev.target.id);
  }

  async function drop(ev, allowid) {
    let data = ev.dataTransfer.getData("text");
    ev.dataTransfer.allowDrop = false;

    // if (data == allowid) {
    //   ev.target.classList.add("hidden");
    //   window.document.getElementById(dragid).classList.add("hidden")
    //   await successsound.current.play(true);
    //   if (data == "1") {
    //     window.document.getElementById(11).setAttribute("class", "div6")
    //   } else if (data == "2") {
    //     window.document.getElementById(13).setAttribute("class", "div4")
    //   } else if (data == "3") {
    //     window.document.getElementById(12).setAttribute("class", "div5")
    //   }
    // } else {
    //   await falsesound.current.play(true);
    //   ev.dataTransfer.allowDrop = false;
    //   setTrueId(allowid);
    // }
  }
  async function Apicall() {
    if (obl != null) {

      if (obl.ob1 == '1') {
        window.document.getElementById(1).classList.add("hidden")
        window.document.getElementById(10).classList.add("hidden")
        window.document.getElementById(11).setAttribute("class", "div6");
      }
      if (obl.ob2 == '2') {
        window.document.getElementById(2).classList.add("hidden")
        window.document.getElementById(8).classList.add("hidden")
        window.document.getElementById(13).setAttribute("class", "div4");
      }
      if (obl.ob3 == '3') {
        window.document.getElementById(3).classList.add("hidden")
        window.document.getElementById(9).classList.add("hidden")
        window.document.getElementById(12).setAttribute("class", "div5");
      }
    }
  }
  return (
    <div
      className="d-flex position-relative activity"
      style={{ overflow: "hidden" }}
    >
      <audio
        src={"/images/activities/1/sound/success.mp3"}
        ref={successsound}
      ></audio>
      <audio
        src={"/images/activities/1/sound/false.wav"}
        ref={falsesound}
      ></audio>
      <img
        src={"/images/activities/1/background.png"}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          zIndex: "1",
        }}
      />
      <div>
        <img
          src={"/images/activities/1/Crab.svg"}
          className="div1 wave1"
          id="1"
          draggable={true}
          onDragStart={(e) => drag(e)}
        />
      </div>
      <div>
        <img
          src={"/images/activities/1/Fish.svg"}
          className="div2 wave1"
          id="2"
          draggable={true}
          onDragStart={(e) => drag(e)}
        />
      </div>
      <div>
        <img
          src={"/images/activities/1/LOBSTER.svg"}
          className="div3 wave1"
          id="3"
          draggable={true}
          onDragStart={(e) => drag(e)}
        />
      </div>
      <div onDrop={(e) => drop(e, "2")} onDragOver={(e) => allowDrop(e)}>
        <img
          src={"/images/activities/1/Fish transparent.svg"}
          draggable="false"
          id="8"
          className="div4 wave2"
        />
      </div>
      <div onDrop={(e) => drop(e, "3")} onDragOver={(e) => allowDrop(e)}>
        <img
          src={"/images/activities/1/lobster transparent.svg"}
          id="9"
          draggable="false"
          className="div5 wave2"
        />
      </div>
      <div onDrop={(e) => drop(e, "1")} onDragOver={(e) => allowDrop(e)}>
        <div>
          <img
            src={"/images/activities/1/Crab transparent.svg"}
            id="10"
            draggable="false"
            className="div6 wave2"
          />
        </div>
      </div>
      <div>
        <img src={"/images/activities/1/crab.svg"} id='11' className='hidden' />
        <img src={"/images/activities/1/lobster.svg"} id='12' className='hidden' />
        <img src={"/images/activities/1/Fish.svg"} id='13' className='hidden' />
      </div>
      {trueid && (
        <div>
          <img src={"/images/activities/1/Ring.svg"} className="ring" />
          {ringimageid && ringimageid == "1" && (
            <img src={"/images/activities/1/Crab.svg"} className="ringimage" />
          )}
          {ringimageid && ringimageid == "2" && (
            <img src={"/images/activities/1/Fish.svg"} className="ringimage" />
          )}
          {ringimageid && ringimageid == "3" && (
            <img
              src={"/images/activities/1/LOBSTER.svg"}
              className="ringimage"
            />
          )}
        </div>
      )}
      <div class="ocean">
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </div>
  );
};

export default Matching;
