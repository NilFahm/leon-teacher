import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useCommon } from "../utils/useCommon";
import { Config } from "../data/Config";
import axios from "axios";
import ScheduleCard from "../components/Dashboard/ScheduleCard";
import DashboardSummary from "../components/Dashboard/DashboardSummary";
import DashboardToppers from "../components/Dashboard/DashboardToppers";

const Dashboard = () => {
  const [auth, setAuthData] = useLocalStorage("auth", {});
  const { HideCircularProgress, ShowCircularProgress } = useCommon();

  const [scheduledata, setScheduleData] = useState(null);
  const [summarydata, SetSummaryData] = useState(null);
  const [toppersdata, Settoppersdata] = useState(null);
  const [errormessage, setErrorMessage] = useState(null);

  useEffect(async () => {
    ShowCircularProgress();
    await axios
      .get(
        Config.baseUrl + "/tutors/schedule",
        { headers: { Authorization: `bearer ${auth.token}` } }
      )
      .then((response) => {
        console.log(response.data);
        setScheduleData(response.data.schedule);
        Settoppersdata(response.data.toppers)
        SetSummaryData(response.data.summary);
        HideCircularProgress();
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        HideCircularProgress();
      });
  }, [auth]);

  async function HandleLogout() {
    setAuthData(null);
    window.location.href = "/";
  }

  return (
    <div className="teachMainBox">
      <div className="wapper overHidden">
        <div className="dashOverFlow">
          <div className="menuLeft menuSmall">
            <div className="menuLogo">
              <a href="#">
                <img src="/img/logo2.svg" />
              </a>
            </div>
            <div className="dashLinks">
              <div className="dashclickLayer"></div>
              <a href="#" className="iconDash active">
                {" "}
                Dashboard
              </a>
              <a href="#" className="iconSch">
                Schedule
              </a>
              <a href="#" className="iconActi">
                Activities
              </a>
              <a href="#" className="iconReports">
                Reports
              </a>
              <a href="#" className="iconReso">
                Resources
              </a>
              <a href="#" className="iconPay">
                Payments
              </a>
              <a href="#" className="iconSet">
                Settings
              </a>
            </div>

            <div className="dashTech">
              <div className="profil">
                <div className="dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src="/img/dashTechmg.png" />
                    <span>{auth.name}</span>
                  </a>
                  <div
                    className="dropdown-menu  dropdown-menu-right"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a className="dropdown-item" href="#">
                      My Profile
                    </a>
                    {/* <a className="dropdown-item" href="#">
                      Settings
                    </a> */}
                    <Link
                      className="dropdown-item"
                      to=""
                      onClick={(e) => HandleLogout()}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashBox1">
            <h1>Dashboard</h1>

            <div className="dashTxt1">
              <div className="dashWel">
                Welcome <strong>{auth.name},</strong>
              </div>
              <h2>Your Schedule Today</h2>
            </div>
            <div className="scroll-pane">
              <div className="dashSchBox">
                <ul>
                  {/* <li className="active">
                    <div className="dashSchBoxIn">
                      <div className="dashSchTim"> 10:00 AM - 11:00 AM</div>
                      <div className="dashLes"> Leon English - Basic</div>
                      <div className="dashStatus"> Completed</div>
                    </div>
                  </li> */}
                  {scheduledata && scheduledata.length > 0 &&
                    scheduledata.map((item, index) => {
                      return <ScheduleCard scheduledata={item} key={index} />;
                    })}
                  {/* <li className="nextActive">
                    <div className="dashSchBoxIn">
                      <div className="dashSchTim"> 03:00 PM - 04:00 PM</div>
                      <div className="dashLes"> Maths - III</div>
                      <div className="dashStatus">
                        {" "}
                        Start in <span>04:20:60</span>
                      </div>
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>

            <div className="wantLearn">
              <div className="wantLearnIn">
                <h4>Want to earn 2X more?</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <a href="#" className="wantArrow">
                  <img src="/img/wantArrow.svg" />
                </a>
                <div className="clear"></div>
              </div>
            </div>
          </div>

          <div className="dashBox2">
            <div className="noti">
              <span></span>
            </div>

            <div></div>
            <DashboardSummary summarydata={summarydata}/>
            <div className="topClass">
              <h4>Toppers in Class</h4>
              <div className="topClassList">
                <ul>
                    {toppersdata && toppersdata.length > 0 &&
                      toppersdata.map((item, index) => {
                        return <DashboardToppers toppersdata={item} key={index} />;
                      })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashclickLayerRight"></div>
    </div>
  );
};

export default Dashboard;
