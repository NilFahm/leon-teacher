import './Quantity.css';
import React, { useState, useEffect, useRef } from 'react';
import { useCommon } from '../../../utils/useCommon';
import { Config } from '../../../data/Config';
import { useLocalStorage } from '../../../utils/useLocalStorage';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Quantity({ sessionid, details, detail }) {
  const [dragid, SetDragId] = useState(0);
  const [trueid, setTrueId] = useState(false);
  const [ringimageid, setRingImageId] = useState(null);
  var obl;
  const navigate = useNavigate();
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [detailss, setdetailss] = useState(null)
  const successsound = useRef(null)
  const falsesound = useRef(null)

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

  useEffect(() => {
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

  async function Apicall() {
    if (obl != null) {
      if (obl.ob1 == '1') {
        window.document.getElementById(5).setAttribute("class", "teapott");
      }
      if (obl.ob2 == '2') {
        window.document.getElementById(6).setAttribute("class", "flower");
      }
      if (obl.ob3 == '3') {
        window.document.getElementById(7).setAttribute("class", "bike6");
      }
    }
  }

  async function click(ev) {
    let data = ev.target.id
    if (data != null) {
      ev.target.classList.add("hidden");
      await successsound.current.play(true);
      if (data == '5') {
        window.document.getElementById(data).setAttribute("class", "teapott tea");
      } else if (data == '6') {
        window.document.getElementById(data).setAttribute("class", "flower flowert");
      } else if (data == '7') {
        window.document.getElementById(data).setAttribute("class", "bike6 bike");
      }
    } else {
      await falsesound.current.play(true);
    }
  }

  async function fclick(ev) {
    await falsesound.current.play(true)
    ev.target.classList.add("reda13")
  }


  return (
    <div className="d-flex position-relative activity hand">
      <audio src={"/images/activities/sound/decide.mp3"} ref={successsound}></audio>
      <audio src={"/images/activities/sound/negative_beeps.mp3"} ref={falsesound}></audio>
      <img src={"/images/activities/13/BG.svg"} style={{ width: "100%", objectFit: "cover", zIndex: "1" }} />
      <div>
        <img src={"/images/activities/13/Tea pot.svg"} className="teapot2" id="1" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/13/Tea pot.svg"} className="teapot3" id="1" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/13/Tea pot.svg"} className="teapot1" id="5" onClick={(ev) => click(ev)} />
        <img src={"/images/activities/13/Tea pot.svg"} className="teapot5" id="1" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/13/Tea pot.svg"} className="teapot6" id="1" onClick={(ev => fclick(ev))} />

      </div>
      <div className="">
        <img src={"/images/activities/13/flower.svg"} className="flower1" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/13/flower.svg"} className="flower2" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/13/flower.svg"} className="flower3" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/13/flower.svg"} className="flower6" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/13/flower.svg"} className="flower5" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/13/flower.svg"} className="flower4" id="6" draggable="false" onClick={(ev) => click(ev)} />
      </div>
      <div className="">
        <img src={"/images/activities/13/Bike.svg"} className="bike1" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/13/Bike.svg"} className="bike4" id="7" draggable="false" onClick={(ev) => click(ev)} />
        <img src={"/images/activities/13/Bike.svg"} className="bike3" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/13/Bike.svg"} className="bike2" id="2" draggable="false" onClick={(ev => fclick(ev))} />
        <img src={"/images/activities/13/Bike.svg"} className="bike5" id="2" draggable="false" onClick={(ev => fclick(ev))} />
      </div>
    </div>
  );
}

export default Quantity;
