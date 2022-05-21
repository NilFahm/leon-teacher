import './Activity.css';
import React, { useState, useEffect, useRef } from 'react';
import { useCommon } from '../../../utils/useCommon';
import { Config } from '../../../data/Config';
import { useLocalStorage } from '../../../utils/useLocalStorage';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Activity3({ sessionid, details, detail }) {
  const [dragid, SetDragId] = useState(0);
  const [trueid, setTrueId] = useState(false);
  const navigate = useNavigate();
  const [ringimageid, setRingImageId] = useState(null);
  const { HideCircularProgress, ShowCircularProgress } = useCommon();
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [detailss, setdetailss] = useState(null)
  const [data1, setData] = useState(null)
  const [filtername, setfiltername] = useState(null)
  const successsound = useRef(null)
  const falsesound = useRef(null)
  var obl;

  useEffect(() => {
    // Remove()
    getdata()
    Apicall()
    setInterval(() => {
      getdata()
      Apicall()
    }, 2000);
  }, [])


  async function getdata() {
    if (auth && typeof auth.id !== "undefined") {
      await axios
        .get(
          Config.baseUrl + "/tutors/schedule/sessionId/activities/activityId/studentId?sessionId="+sessionid+"&activityId="+detail+"&studentId="+details,
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

  useEffect(() => {
    if (trueid > 0) {
      setRingImageId(trueid);
      setTimeout(function () {
        setRingImageId(dragid);
      }, 2000);
      setTimeout(function () {
        setTrueId(null);
        SetDragId(null);
        setRingImageId(null)
      }, 4000);
    }
  }, [trueid])

  async function Apicall() {
    if (obl != null) {
      if (obl.ob1 == '1') {
        window.document.getElementById("umbrela").setAttribute("class", "umbrellat");
      } if (obl.ob2 == '2') {
        window.document.getElementById("ball").setAttribute("class", "ballt");
      } if (obl.ob3 == '3') {
        window.document.getElementById("shirt2").setAttribute("class", "shirtt");
      }
    }
  }

  // function Remove() {
  //   var umbrella = window.document.getElementById(5).classList.value
  //   console.log(umbrella)
  //   if (umbrella == "umbrellat") {
  //     window.document.getElementById(5).classList.remove("umbrellat")
  //     window.document.getElementById(5).setAttribute("class", "umbrella");
  //   } else {
      
  //   }
  //   // window.document.getElementById(5).remove("umbrelat");
  //   // window.document.getElementById(5).setAttribute("class", "umbrella");
  //   // window.document.getElementById(6).setAttribute("class", "ball ");
  //   // window.document.getElementById(7).setAttribute("class", "shirt2 ");

  // }

  async function fclick(ev) {
    ev.target.classList.add("redalert")
    await falsesound.current.play(true);
    setTimeout(() => {
      ev.target.classList.remove("redalert")
    }, 2000);
  }


  return (
    <div className="d-flex position-relative activity hand">
      <audio src={"/images/activities/sound/decide.mp3"} ref={successsound}></audio>
      <audio src={"/images/activities/sound/negative_beeps.mp3"} ref={falsesound}></audio>
      <img src={"/images/activities/3/BG.svg"} style={{ objectFit: "cover", zIndex: "1", width: "100%", height: "100%" }} />
      <div>
        <img src={"/images/activities/3/racket.svg"} className="racket1" id="1" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/racket.svg"} className="racket2" id="1" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/racket.svg"} className="racket3" id="1" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/Umbrella.svg"} className="umbrela" id="umbrela" style={{ height: "10%" }} />
        <img src={"/images/activities/3/racket.svg"} className="racket5" id="1" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/racket.svg"} className="racket6" id="1" onClick={(ev => fclick(ev))} />

      </div>
      <div className="">
        <img src={"/images/activities/3/watermelon.svg"} className="watermelon1" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/watermelon.svg"} className="watermelon2" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/watermelon.svg"} className="watermelon3" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/watermelon.svg"} className="watermelon4" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/watermelon.svg"} className="watermelon5" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/ball.svg"} className="ball" id="ball" draggable="false" />
      </div>
      <div className="">
        <img src={"/images/activities/3/pink shirt.svg"} className="shirt1" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/blue shirt.svg"} className="shirt2" id="shirt2" draggable="false" />
        <img src={"/images/activities/3/pink shirt.svg"} className="shirt3" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/pink shirt.svg"} className="shirt4" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/pink shirt.svg"} className="shirt5" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/3/pink shirt.svg"} className="shirt6" id="2" draggable="false" onClick={(ev => fclick(ev))} />
      </div>

      <div>
        <img src={"/images/activities/3/basket.svg"} className="basket" id="2" draggable="false" />
      </div>
    </div>
  );
}

export default Activity3;
