import React, { useState, useRef, useEffect } from 'react'
import "./Mapping.css";
import { useCommon } from '../../../utils/useCommon';
import { Config } from '../../../data/Config';
import { useLocalStorage } from '../../../utils/useLocalStorage';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Mapping = ({ sessionid, details, detail }) => {
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
    if (trueid > 0) {
      setRingImageId(trueid);
      setTimeout(function () {
        setTrueId(null);
        setRingImageId(null)
      }, 3000);
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

  async function click(ev) {
    let data = ev.target.id
    console.log(data)
    setGetid(data)
    if (data != null) {
      if (getid != null) {
        window.document.getElementById(getid).classList.remove("curser")
      }
      if (data == 'g') {
        window.document.getElementById(data).setAttribute("class", "greencray curser")
      } else if (data == 'r') {
        window.document.getElementById(data).setAttribute("class", "redcray curser")
      } else if (data == 'v') {
        window.document.getElementById(data).setAttribute("class", "violetcray curser")
      } else if (data == 'y') {
        window.document.getElementById(data).setAttribute("class", "yellowcray curser")
      }
    }
  }

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
        window.document.getElementById(14).setAttribute("class", "transcircle7 greenl")
      }
      if (obl.ob2 == '2') {
        window.document.getElementById(17).setAttribute("class", "transcircle9 greenl")
      }
      if (obl.ob3 == '3') {
        window.document.getElementById(19).setAttribute("class", "transcircle11 greenl")
      }
      if (obl.ob4 == '4') {
        window.document.getElementById(101).setAttribute("class", "transcircle13 greenl")
      }
      if (obl.ob5 == '5') {
        window.document.getElementById(103).setAttribute("class", "transcircle15 greenl")
      }
      if (obl.ob6 == '6') {
        window.document.getElementById(106).setAttribute("class", "transcircle33 greenl")
      }
      if (obl.ob7 == '7') {
        window.document.getElementById(108).setAttribute("class", "transcircle35 greenl")
      }
      if (obl.ob8 == '8') {
        window.document.getElementById(110).setAttribute("class", "transcircle37 greenl")
      }
      if (obl.ob9 == '9') {
        window.document.getElementById(11).setAttribute("class", "transcircle20 greenl")
      }
      if (obl.ob10 == '10') {
        window.document.getElementById(105).setAttribute("class", "transcircle22 greenl")
      }
      if (obl.ob11 == '11') {
        window.document.getElementById(107).setAttribute("class", "transcircle34 greenl")
      }
      if (obl.ob12 == '12') {
        window.document.getElementById(109).setAttribute("class", "transcircle36 greenl")
      }
      if (obl.ob13 == '13') {
        window.document.getElementById(16).setAttribute("class", "transcircle8 greenl")
      }
      if (obl.ob14 == '14') {
        window.document.getElementById(18).setAttribute("class", "transcircle10 greenl")
      }
      if (obl.ob15 == '15') {
        window.document.getElementById(20).setAttribute("class", "transcircle12 greenl")
      }
      if (obl.ob16 == '16') {
        window.document.getElementById(102).setAttribute("class", "transcircle14 greenl")
      }
      if (obl.ob17 == '17') {
        window.document.getElementById(15).setAttribute("class", "transcircle19 greenl")
      }
      if (obl.ob18 == '18') {
        window.document.getElementById(104).setAttribute("class", "transcircle21 greenl")
      }
      if (obl.ob19 == '19') {
        window.document.getElementById(111).setAttribute("class", "transcircle38 greenl")
      }

    }
  }

  // async function getdata(ev, allowid) {
  //   debugger
  //   console.log(allowid + ev)
  //   let data1 = ev.target.id

  //   if (allowid != null) {

  //     if (allowid == '21' && getid == '4') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(14).setAttribute("class", "transcircle7 greenl")
  //     } else if (allowid == '22' && getid == '6') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(16).setAttribute("class", "transcircle8 greenl")
  //     } else if (allowid == '25' && getid == '4') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(17).setAttribute("class", "transcircle9 greenl")
  //     } else if (allowid == '26' && getid == '6') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(18).setAttribute("class", "transcircle10 greenl")
  //     } else if (allowid == '27' && getid == '4') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(19).setAttribute("class", "transcircle11 greenl")
  //     } else if (allowid == '28' && getid == '6') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(20).setAttribute("class", "transcircle12 greenl")
  //     } else if (allowid == '29' && getid == '4') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(101).setAttribute("class", "transcircle13 greenl")
  //     } else if (allowid == '30' && getid == '6') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(102).setAttribute("class", "transcircle14 greenl")
  //     } else if (allowid == '31' && getid == '4') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(103).setAttribute("class", "transcircle15 greenl")
  //     } else if (allowid == '24' && getid == '5') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(15).setAttribute("class", "transcircle19 greenl")
  //     } else if (allowid == '23' && getid == '1') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(11).setAttribute("class", "transcircle20 greenl")
  //     } else if (allowid == '32' && getid == '5') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(104).setAttribute("class", "transcircle21 greenl")
  //     } else if (allowid == '33' && getid == '1') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(105).setAttribute("class", "transcircle22 greenl")
  //     } else if (allowid == '34' && getid == '4') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(106).setAttribute("class", "transcircle33 greenl")
  //     } else if (allowid == '35' && getid == '1') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(107).setAttribute("class", "transcircle34 greenl")
  //     } else if (allowid == '36' && getid == '4') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(108).setAttribute("class", "transcircle35 greenl")
  //     } else if (allowid == '37' && getid == '1') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(109).setAttribute("class", "transcircle36 greenl")
  //     } else if (allowid == '38' && getid == '4') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(110).setAttribute("class", "transcircle37 greenl")
  //     } else if (allowid == '39' && getid == '5') {
  //       await successsound.current.play(true)
  //       window.document.getElementById(111).setAttribute("class", "transcircle38 greenl")
  //     }


      // else {
      //   await falsesound.current.play(true);
      //   setTrueId(allowid);
      //   window.document.getElementById(data1).classList.remove('transbox');
      //   let data = window.document.getElementById(data1).classList.value;
      //   setGetde(data + " redl")
      // }
    // }
  // }

  return (
    <div className="d-flex position-relative activity hand" id="100">
      <audio src={"/images/activities/sound/decide.mp3"} ref={successsound}></audio>
      <audio src={"/images/activities/sound/negative_beeps.mp3"} ref={falsesound}></audio>
      <img src={"/images/activities/14/BG.svg"} style={{ width: "100%", objectFit: "cover", zIndex: "1" }} />
      <div>
        <img src={"/images/activities/14/Red Crayon.svg"} className="redcray" id="r" onClick={(e) => click(e)} />
      </div>
      <div>
        <img src={"/images/activities/14/Yellow Crayon.svg"} className="yellowcray" id="y" onClick={(e) => click(e)} />
      </div>
      <div>
        <img src={"/images/activities/14/Voilet Crayon.svg"} className="violetcray" id="v" onClick={(e) => click(e)} />
      </div>
      <div>
        <img src={"/images/activities/14/Green Crayon.svg"} className="greencray" id="g" onClick={(e) => click(e)} />
      </div>



      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle1' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle2' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle3' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle4' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle5' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle6' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle7' onClick={(e) => getdata(e, "21")} id="61" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle8' onClick={(e) => getdata(e, "22")} id="62" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle9' onClick={(e) => getdata(e, "25")} id="63" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle10' onClick={(e) => getdata(e, "26")} id="64" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle11' onClick={(e) => getdata(e, "27")} id="65" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle12' onClick={(e) => getdata(e, "28")} id="66" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle13' onClick={(e) => getdata(e, "29")} id="67" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle14' onClick={(e) => getdata(e, "30")} id="68" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle15' onClick={(e) => getdata(e, "31")} id="69" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle16' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle17' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle18' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle19' onClick={(e) => getdata(e, "24")} id="70" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle20' onClick={(e) => getdata(e, "23")} id="71" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle21' onClick={(e) => getdata(e, "32")} id="72" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle22' onClick={(e) => getdata(e, "33")} id="73" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle23' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle24' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle25' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle26' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle27' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle28' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle29' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle30' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle31' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle32' />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle33' onClick={(e) => getdata(e, "34")} id="74" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle34' onClick={(e) => getdata(e, "35")} id="75" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle35' onClick={(e) => getdata(e, "36")} id="76" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle36' onClick={(e) => getdata(e, "37")} id="77" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle37' onClick={(e) => getdata(e, "38")} id="78" />
      </div>
      <div> <img src={"/images/activities/14/transcircle.png"} className='transcircle38' onClick={(e) => getdata(e, "39")} id="79" />
      </div>
      <div> <img src={"/images/activities/14/Red circle.svg"} className='transcircle1' />
      </div>
      <div> <img src={"/images/activities/14/Yellow circle.svg"} className='transcircle2' />
      </div>
      <div> <img src={"/images/activities/14/Red circle.svg"} className='transcircle3' />
      </div>
      <div> <img src={"/images/activities/14/Yellow circle.svg"} className='transcircle4' />
      </div>
      <div> <img src={"/images/activities/14/Red circle.svg"} className='transcircle5' />
      </div>
      <div> <img src={"/images/activities/14/Yellow circle.svg"} className='transcircle6' />
      </div>
      <div> <img src={"/images/activities/14/Yellow circle.svg"} className='transcircle16' />
      </div>
      <div> <img src={"/images/activities/14/Voilet circle.svg"} className='transcircle17' />
      </div>
      <div> <img src={"/images/activities/14/Green circle.svg"} className='transcircle18' />
      </div>
      <div> <img src={"/images/activities/14/Red circle.svg"} className='transcircle23' />
      </div>
      <div> <img src={"/images/activities/14/Green circle.svg"} className='transcircle24' />
      </div>
      <div> <img src={"/images/activities/14/Red circle.svg"} className='transcircle25' />
      </div>
      <div> <img src={"/images/activities/14/Green circle.svg"} className='transcircle26' />
      </div>
      <div> <img src={"/images/activities/14/Red circle.svg"} className='transcircle27' />
      </div>
      <div> <img src={"/images/activities/14/Green circle.svg"} className='transcircle28' />
      </div>
      <div> <img src={"/images/activities/14/Red circle.svg"} className='transcircle29' />
      </div>
      <div> <img src={"/images/activities/14/Green circle.svg"} className='transcircle30' />
      </div>
      <div> <img src={"/images/activities/14/Red circle.svg"} className='transcircle31' />
      </div>
      <div> <img src={"/images/activities/14/Green circle.svg"} className='transcircle32' />
      </div>

      <div>
        <img src={"/images/activities/14/Red circle.svg"} id='14' className='hidden' />
        <img src={"/images/activities/14/Yellow circle.svg"} id='16' className='hidden' />
        <img src={"/images/activities/14/Red circle.svg"} id='17' className='hidden' />
        <img src={"/images/activities/14/Yellow circle.svg"} id='18' className='hidden' />
        <img src={"/images/activities/14/Red circle.svg"} id='19' className='hidden' />
        <img src={"/images/activities/14/Yellow circle.svg"} id='20' className='hidden' />
        <img src={"/images/activities/14/Red circle.svg"} id='101' className='hidden' />
        <img src={"/images/activities/14/Yellow circle.svg"} id='102' className='hidden' />
        <img src={"/images/activities/14/Red circle.svg"} id='103' className='hidden' />
        <img src={"/images/activities/14/Green circle.svg"} id='11' className='hidden' />
        <img src={"/images/activities/14/Voilet circle.svg"} id='15' className='hidden' />
        <img src={"/images/activities/14/Voilet circle.svg"} id='104' className='hidden' />
        <img src={"/images/activities/14/Green circle.svg"} id='105' className='hidden' />
        <img src={"/images/activities/14/Red circle.svg"} id='106' className='hidden' />
        <img src={"/images/activities/14/Green circle.svg"} id='107' className='hidden' />
        <img src={"/images/activities/14/Red circle.svg"} id='108' className='hidden' />
        <img src={"/images/activities/14/Green circle.svg"} id='109' className='hidden' />
        <img src={"/images/activities/14/Red circle.svg"} id='110' className='hidden' />
        <img src={"/images/activities/14/Voilet circle.svg"} id='111' className='hidden' />




      </div>

      {trueid && <div>
        {ringimageid && getid == "1" && <img src={"/images/activities/14/Green circle.svg"} className={getde} />}
        {ringimageid && getid == "4" && <img src={"/images/activities/14/Red circle.svg"} className={getde} />}
        {ringimageid && getid == "5" && <img src={"/images/activities/14/Voilet circle.svg"} className={getde} />}
        {ringimageid && getid == "6" && <img src={"/images/activities/14/Yellow circle.svg"} className={getde} />}
      </div>
      }

    </div>

  )
}
export default Mapping