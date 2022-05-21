import React, { useEffect, useState } from 'react'
import { useCommon } from '../../utils/useCommon';
import { Config } from '../../data/Config';
import { useLocalStorage } from '../../utils/useLocalStorage';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './result.css'
import Piechart from './Piechart';
import Table from './Table';


const Result = ({ sessionid,detail, StartNewActivity, activitydata}) => {

  const { HideCircularProgress, ShowCircularProgress } = useCommon();
  const [details, setdetails] = useState(null)
  const [auth, setAuth] = useLocalStorage("auth", {});
  const navigate = useNavigate();



  useEffect(async () => {
    getdata();
    setInterval(() => {
      getdata();
    }, 5000);
  }, [])
  
  async function getdata() {
    if (auth && typeof auth.id !== "undefined") {
      await axios
        .get(
          Config.baseUrl + "/tutors/schedule/sessionId/activities/activityId?sessionId=" + sessionid + "&activityId="+detail,
          { headers: { Authorization: `bearer ${auth.token}` } }
        )
        .then((response) => {
          setdetails(response.data)
          console.log(response.data);
          // HideCircularProgress();  
        })
        .catch((error) => {
          // HideCircularProgress();
          setAuth(null)
          navigate("/login");
        });
    }
  }

  return (
    <>
      <div style={{ disply: 'flex', justifyContent: "cener", height: "90%", width: "100%" }}>

        {/* <Piechart details={details} /> */}
        <div className="overflow-auto" style={{ height: "90%" }}><Table details={details} detail={detail} StartNewActivity={StartNewActivity} sessionid={sessionid}/></div>


      </div>
    </>
    // <Table details={details} />
  )
}

export default Result



