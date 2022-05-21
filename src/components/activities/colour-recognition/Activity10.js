import React, { useState, useRef, useEffect } from 'react'
import "./Activity10.css";
import { useCommon } from '../../../utils/useCommon';
import { Config } from '../../../data/Config';
import { useLocalStorage } from '../../../utils/useLocalStorage';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Activity10 = ({ sessionid, details, detail }) => {
  const [getid, setGetid] = useState(null)
  const [trueid, setTrueId] = useState(false);
  const [getde, setGetde] = useState(null)
  const navigate = useNavigate();
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [detailss, setdetailss] = useState(null)
  const successsound = useRef(null)
  const falsesound = useRef(null)
  const [ringimageid, setRingImageId] = useState(null);
  var obl;

  useEffect(() => {
    setInterval(() => {
      getdata()
      getdetails()
    }, 2000);
  }, [])

  useEffect(() => {
    console.log(sessionid)
    console.log(details)
    console.log(detail)
    if (trueid > 0) {
      setRingImageId(trueid);
      setTimeout(function () {
        setTrueId(null);
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


  // async function click(ev) {
  //   let data = ev.target.id
  //   setGetid(data)
  //   if (data != null) {
  //     console.log(getid)
  //     if (getid != null) {
  //       window.document.getElementById(getid).classList.remove("curser")
  //     }
  //     if (data == '2') {
  //       window.document.getElementById(data).setAttribute("class", "orngcray1 curser")
  //     } else if (data == '8') {
  //       window.document.getElementById(data).setAttribute("class", "greencray2 curser")
  //     } else if (data == '4') {
  //       window.document.getElementById(data).setAttribute("class", "redcray1 curser")
  //     } else if (data == '5') {
  //       window.document.getElementById(data).setAttribute("class", "violetcray1 curser")
  //     } else if (data == '6') {
  //       window.document.getElementById(data).setAttribute("class", "yellowcray1 curser")
  //     } else if (data == '7') {
  //       window.document.getElementById(data).setAttribute("class", "bluecray1 curser")
  //     }
  //   }
  // }
  async function getdetails() {
    if (obl != null) {
      if (obl.ob1 == 1) {
        window.document.getElementById(14).setAttribute("class", "redtbox1 greenl")
      } if (obl.ob2 == 2) {
        window.document.getElementById(12).setAttribute("class", "orgtbox1 greenl")
      } if (obl.ob3 == 3) {
        window.document.getElementById(16).setAttribute("class", "yellowtbox1 greenl")
      } if (obl.ob4 == 4) {
        window.document.getElementById(11).setAttribute("class", "greentbox1 greenl")
      } if (obl.ob5 == 5) {
        window.document.getElementById(17).setAttribute("class", "bluetbox1 greenl")
      } if (obl.ob6 == 6) {
        window.document.getElementById(15).setAttribute("class", "violettbox1 greenl")
      } if (obl.ob7 == 7) {
        window.document.getElementById(124).setAttribute("class", "redtbox2 greenl")
      } if (obl.ob8 == 8) {
        window.document.getElementById(122).setAttribute("class", "orgtbox2 greenl")
      } if (obl.ob9 == 9) {
        window.document.getElementById(126).setAttribute("class", "yellowtbox2 greenl")
      } if (obl.ob10 == 10) {
        window.document.getElementById(121).setAttribute("class", "greentbox2 greenl")
      } if (obl.ob11 == 11) {
        window.document.getElementById(127).setAttribute("class", "bluetbox2 greenl")
      } if (obl.ob12 == 12) {
        window.document.getElementById(125).setAttribute("class", "violettbox2 greenl")
      }
      // else {
      // await falsesound.current.play(true);
      // window.document.getElementById(data1).classList.remove('transbox');
      // let data = window.document.getElementById(data1).classList.value;
      // setGetde(data + " redl")
      // }
    }
  }

  return (
    <div className="d-flex position-relative activity hand" id="1">
      <audio src={"/images/activities/sound/decide.mp3"} ref={successsound}></audio>
      <audio src={"/images/activities/sound/negative_beeps.mp3"} ref={falsesound}></audio>
      <img src={"/images/activities/10/BG.svg"} style={{ height: "100vh", width: "100vw", objectFit: "cover", zIndex: "1" }} />
      <div>
        <img src={"/images/activities/10/canvas.svg"} className="paint" />
      </div>
      <div>
        <img src={"/images/activities/10/orange crayon.svg"} className="orngcray1" draggable="false" />
      </div>
      <div>
        <img src={"/images/activities/10/Red crayon.svg"} className="redcray1" draggable="false"/>
      </div>
      <div>
        <img src={"/images/activities/10/Voilet crayon.svg"} className="violetcray1" draggable="false"/>
      </div>
      <div>
        <img src={"/images/activities/10/green crayon.svg"} className="greencray2" draggable="false"/>
      </div>
      <div>
        <img src={"/images/activities/10/Yellow crayon.svg"} className="yellowcray1" draggable="false"/>
      </div>
      <div>
        <img src={"/images/activities/10/blue crayon.svg"} className="bluecray1" draggable="false" />
      </div>
      <div onClick={(e) => getdata(e, "24")} id="34" className="transbox redtbox1">
      </div>
      <div onClick={(e) => getdata(e, "22")} id="32" className="transbox orgtbox1">
      </div>
      <div onClick={(e) => getdata(e, "26")} id="36" className="transbox yellowtbox1">
      </div>
      <div onClick={(e) => getdata(e, "21")} id="31" className="transbox greentbox1">
      </div>
      <div onClick={(e) => getdata(e, "27")} id="37" className="transbox bluetbox1">
      </div>
      <div onClick={(e) => getdata(e, "25")} id="35" className="transbox violettbox1">
      </div>
      <div onClick={(e) => getdata(e, "44")} id="54" className="transbox redtbox2">
      </div>
      <div onClick={(e) => getdata(e, "42")} id="52" className="transbox orgtbox2">
      </div>
      <div onClick={(e) => getdata(e, "46")} id="56" className="transbox yellowtbox2">
      </div>
      <div onClick={(e) => getdata(e, "41")} id="51" className="transbox greentbox2">
      </div>
      <div onClick={(e) => getdata(e, "47")} id="57" className="transbox bluetbox2">
      </div>
      <div onClick={(e) => getdata(e, "45")} id="55" className="transbox violettbox2">
      </div>
      <div>
        <img src={"/images/activities/10/red.svg"} id='14' className='hidden' />
        <img src={"/images/activities/10/Orange.svg"} id='12' className='hidden' />
        <img src={"/images/activities/10/yellow.svg"} id='16' className='hidden' />
        <img src={"/images/activities/10/green.svg"} id='11' className='hidden' />
        <img src={"/images/activities/10/blue.svg"} id='17' className='hidden' />
        <img src={"/images/activities/10/voilet.svg"} id='15' className='hidden' />
        <img src={"/images/activities/10/red.svg"} id='124' className='hidden' />
        <img src={"/images/activities/10/orange.svg"} id='122' className='hidden' />
        <img src={"/images/activities/10/yellow.svg"} id='126' className='hidden' />
        <img src={"/images/activities/10/green.svg"} id='121' className='hidden' />
        <img src={"/images/activities/10/blue.svg"} id='127' className='hidden' />
        <img src={"/images/activities/10/voilet.svg"} id='125' className='hidden' />
      </div>
      {trueid && <div>
        {ringimageid && getid == "1" && <img src={"/images/activities/10/Green.svg"} className={getde} />}
        {ringimageid && getid == "2" && <img src={"/images/activities/10/orange.svg"} className={getde} />}
        {ringimageid && getid == "4" && <img src={"/images/activities/10/red.svg"} className={getde} />}
        {ringimageid && getid == "5" && <img src={"/images/activities/10/voilet.svg"} className={getde} />}
        {ringimageid && getid == "6" && <img src={"/images/activities/10/yellow.svg"} className={getde} />}
        {ringimageid && getid == "7" && <img src={"/images/activities/10/blue.svg"} className={getde} />}
      </div>}
    </div>
  )
}
export default Activity10
