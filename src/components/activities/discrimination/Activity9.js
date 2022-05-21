import './Activity9.css';
import React, { useState, useEffect, useRef } from 'react';
import { useCommon } from '../../../utils/useCommon';
import { Config } from '../../../data/Config';
import { useLocalStorage } from '../../../utils/useLocalStorage';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Activity9({ sessionid, details, detail }) {
  const [dragid, SetDragId] = useState(0);
  const [trueid, setTrueId] = useState(false);
  const navigate = useNavigate();
  const { HideCircularProgress, ShowCircularProgress } = useCommon();
  const [detailss, setdetailss] = useState(null)
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [ringimageid, setRingImageId] = useState(null);
  const [getde, setGetde] = useState(null)
  const successsound = useRef(null)
  const falsesound = useRef(null)
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
        setTrueId(null);
        SetDragId(null);
        setRingImageId(null)
      }, 2000);
    }
  }, [trueid])

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
    SetDragId(ev.target.id)
    setTrueId(null)
  }

  function Apicall() {
    if (obl != null) {
      if (obl.ob1 == '1') {
        window.document.getElementById(2).classList.add("hidden")
        window.document.getElementById(71).setAttribute("class", "cartr3 greenl")
      } if (obl.ob2 == '2') {
        window.document.getElementById(3).classList.add("hidden")
        window.document.getElementById(72).setAttribute("class", "cartr2 greenl")
      } if (obl.ob3 == '3') {
        window.document.getElementById(10).classList.add("hidden")
        window.document.getElementById(77).setAttribute("class", "butterrfytr1 greenl")
      } if (obl.ob4 == '4') {
        window.document.getElementById(11).classList.add("hidden")
        window.document.getElementById(78).setAttribute("class", "butterrfytr2 greenl")
      } if (obl.ob5 == '5') {
        window.document.getElementById(4).classList.add("hidden")
        window.document.getElementById(73).setAttribute("class", "flowerrtr1 greenl")
      } if (obl.ob6 == '6') {
        window.document.getElementById(6).classList.add("hidden")
        window.document.getElementById(74).setAttribute("class", "flowerrtr2 greenl")
      } if (obl.ob7 == '7') {
        window.document.getElementById(7).classList.add("hidden")
        window.document.getElementById(75).setAttribute("class", "bikeetr1 greenl")
      } if (obl.ob8 == '8') {
        window.document.getElementById(9).classList.add("hidden")
        window.document.getElementById(76).setAttribute("class", "bikeetr3 greenl")
      }
    }
  }


  async function drop(ev, allowid) {
    let value = ev.target.id
    console.log(ev.target.id + "null")
    let data = ev.dataTransfer.getData("text");
    ev.dataTransfer.allowDrop = false;
    // if (data == allowid) {
    //   setTrueId(null);

    //   window.document.getElementById(dragid).classList.add("hidden")
    //   await successsound.current.play(true);
    //   if (data == '3') {
    //     window.document.getElementById(71).setAttribute("class", "cartr3 greenl")
    //   } else if (data == '2') {
    //     window.document.getElementById(72).setAttribute("class", "cartr2 greenl")
    //   } else if (data == '10') {
    //     window.document.getElementById(77).setAttribute("class", "butterrfytr1 greenl")
    //   } else if (data == '11') {
    //     window.document.getElementById(78).setAttribute("class", "butterrfytr2 greenl")
    //   } else if (data == '4') {
    //     window.document.getElementById(73).setAttribute("class", "flowerrtr1 greenl")
    //   } else if (data == '6') {
    //     window.document.getElementById(74).setAttribute("class", "flowerrtr2 greenl")
    //   } else if (data == '7') {
    //     window.document.getElementById(75).setAttribute("class", "bikeetr1 greenl")
    //   } else if (data == '9') {
    //     window.document.getElementById(76).setAttribute("class", "bikeetr3 greenl")
    //   }
    // } else if (data == '3' && allowid == '2') {

    //   window.document.getElementById(dragid).classList.add("hidden")
    //   await successsound.current.play(true);
    //   window.document.getElementById(72).setAttribute("class", "cartr2 greenl")
    // } else if (data == '2' && allowid == '3') {

    //   window.document.getElementById(dragid).classList.add("hidden")
    //   await successsound.current.play(true);
    //   window.document.getElementById(71).setAttribute("class", "cartr3 greenl")
    // } else if (data == '10' && allowid == '11') {

    //   window.document.getElementById(dragid).classList.add("hidden")
    //   await successsound.current.play(true);
    //   window.document.getElementById(78).setAttribute("class", "butterrfytr2 greenl")
    // } else if (data == '11' && allowid == '10') {

    //   window.document.getElementById(dragid).classList.add("hidden")
    //   await successsound.current.play(true);
    //   window.document.getElementById(77).setAttribute("class", "butterrfytr1 greenl")
    // } else if (data == '4' && allowid == '6') {

    //   window.document.getElementById(dragid).classList.add("hidden")
    //   await successsound.current.play(true);
    //   window.document.getElementById(74).setAttribute("class", "flowerrtr2 greenl")
    // } else if (data == '6' && allowid == '4') {

    //   window.document.getElementById(dragid).classList.add("hidden")
    //   await successsound.current.play(true);
    //   window.document.getElementById(73).setAttribute("class", "flowerrtr1 greenl")
    // } else if (data == '7' && allowid == '9') {

    //   window.document.getElementById(dragid).classList.add("hidden")
    //   await successsound.current.play(true);
    //   window.document.getElementById(75).setAttribute("class", "bikeetr3 greenl")
    // } else if (data == '9' && allowid == '7') {

    //   window.document.getElementById(dragid).classList.add("hidden")
    //   await successsound.current.play(true);
    //   window.document.getElementById(76).setAttribute("class", "bikeetr1 greenl")
    // } else {
    //   await falsesound.current.play(true);
    //   setTrueId(allowid);
    //   window.document.getElementById(value).classList.remove('transbox');
    //   let data1 = window.document.getElementById(value).classList.value;
    //   setGetde(data1 + " redl")
    // }
  }
  return (
    <div className="d-flex position-relative activity hand">
      <audio src={"/images/activities/sound/decide.mp3"} ref={successsound}></audio>
      <audio src={"/images/activities/sound/negative_beeps.mp3"} ref={falsesound}></audio>
      <img src={"/images/activities/9/BG.svg"} style={{ width: "100%", objectFit: "cover", zIndex: "1" }} />
      <div>
        <img src={"/images/activities/9/Car.svg"} className="cars4" id="1" draggable="false"/>
        <img src={"/images/activities/9/Car.svg"} className="cars5" id="2" draggable={true}   />
        <img src={"/images/activities/9/Car.svg"} className="cars6" id="3" draggable={true}   />
      </div>
      <div>
        <img src={"/images/activities/9/Butterfly.svg"} className="butterfy1" id="10" draggable={true}   />
        <img src={"/images/activities/9/Butterfly.svg"} className="butterfy2" id="11" draggable={true}   />
        <img src={"/images/activities/9/Butterfly.svg"} className="butterfy3" id="12" draggable="false"/>
      </div>
      <div className="">
        <img src={"/images/activities/9/flower.svg"} className="flowertr1" id="4" draggable={true}   />
        <img src={"/images/activities/9/flower.svg"} className="flowertr2" id="5" draggable={true} />
        <img src={"/images/activities/9/flower.svg"} className="flowertr3" id="6" draggable={true}   />
      </div>
      <div className="">
        <img src={"/images/activities/9/Bike.svg"} className="biketr1" id="7" draggable={true}   />
        <img src={"/images/activities/9/Bike.svg"} className="biketr2" id="8" draggable="false"/>
        <img src={"/images/activities/9/Bike.svg"} className="biketr3" id="9" draggable={true}   />
      </div>
      <div onDrop={(e) => drop(e, "3")} id="81" className="transbox cartr3">
      </div>
      <div onDrop={(e) => drop(e, "2")} id="82" className="transbox cartr2">
      </div>
      <div onDrop={(e) => drop(e, "10")} id="83" className="transbox butterrfytr1">
      </div>
      <div onDrop={(e) => drop(e, "11")} id="84" className="transbox butterrfytr2">
      </div>
      <div onDrop={(e) => drop(e, "4")} id="85" className="transbox flowerrtr1">
      </div>
      <div onDrop={(e) => drop(e, "6")} id="86" className="transbox flowerrtr2">
      </div>
      <div onDrop={(e) => drop(e, "7")} id="87" className="transbox bikeetr1">
      </div>
      <div onDrop={(e) => drop(e, "9")} id="88" className="transbox bikeetr3">
      </div>
      <div>
        <img src={"/images/activities/9/Car.svg"} id="71" className='hidden' />
        <img src={"/images/activities/9/Car.svg"} id="72" className='hidden' />
        <img src={"/images/activities/9/flower.svg"} id="73" className='hidden' />
        <img src={"/images/activities/9/flower.svg"} id="74" className='hidden' />
        <img src={"/images/activities/9/Bike.svg"} id="75" className='hidden' />
        <img src={"/images/activities/9/Bike.svg"} id="76" className='hidden' />
        <img src={"/images/activities/9/Butterfly.svg"} id="77" className='hidden' />
        <img src={"/images/activities/9/Butterfly.svg"} id="78" className='hidden' />
      </div>
      <div>
        {trueid && <div>
          {ringimageid && dragid == '2' && <img src={"/images/activities/9/car.svg"} className={getde} />}
          {ringimageid && dragid == '3' && <img src={"/images/activities/9/car.svg"} className={getde} />}
          {ringimageid && dragid == '10' && <img src={"/images/activities/9/Butterfly.svg"} className={getde} />}
          {ringimageid && dragid == '11' && <img src={"/images/activities/9/Butterfly.svg"} className={getde} />}
          {ringimageid && dragid == '7' && <img src={"/images/activities/9/Bike.svg"} className={getde} />}
          {ringimageid && dragid == '9' && <img src={"/images/activities/9/Bike.svg"} className={getde} />}
          {ringimageid && dragid == '4' && <img src={"/images/activities/9/flower.svg"} className={getde} />}
          {ringimageid && dragid == '6' && <img src={"/images/activities/9/flower.svg"} className={getde} />}
        </div>}
      </div>
    </div>
  );
}

export default Activity9;
