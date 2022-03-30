import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useCommon } from "../utils/useCommon";
import { Config } from "../data/Config";
import axios from "axios";

const Dashboard = () => {
  const [auth, setAuthData] = useLocalStorage("auth", {});
  const { HideCircularProgress, ShowCircularProgress } = useCommon();

  const navigate = useNavigate();

  const [scheduledata, setScheduleData] = useState(null);
  const [errormessage, setErrorMessage] = useState(null);

  useEffect(async () => {
    ShowCircularProgress();
    await axios
      .post(
        Config.baseUrl + "/teachers/schedule",
        {},
        { headers: { Authorization: `bearer ${auth.token}` } }
      )
      .then((response) => {
        setScheduleData(response.data);
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

  async function StartClass(sessionid) {
    return navigate("/startcall/" + sessionid);
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
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
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
                  <li className="active">
                    <div className="dashSchBoxIn">
                      <div className="dashSchTim"> 10:00 AM - 11:00 AM</div>
                      <div className="dashLes"> Leon English - Basic</div>
                      <div className="dashStatus"> Completed</div>
                    </div>
                  </li>
                  {scheduledata &&
                    scheduledata.map((scheduledata, index) => {
                      return (
                        <li key={index}>
                          <div className="dashSchBoxIn">
                            <div className="dashSchTim">
                              {(new Date(
                                scheduledata.scheduledStart
                              ).getHours() > 12
                                ? 24 -
                                  new Date(
                                    scheduledata.scheduledStart
                                  ).getHours()
                                : new Date(
                                    scheduledata.scheduledStart
                                  ).getHours()) +
                                ":" +
                                new Date(
                                  scheduledata.scheduledStart
                                ).getMinutes() +
                                " " +
                                (new Date(
                                  scheduledata.scheduledStart
                                ).getHours() > 12
                                  ? "PM"
                                  : "AM")}{" "}
                              -{" "}
                              {(new Date(scheduledata.scheduledEnd).getHours() >
                              12
                                ? 24 -
                                  new Date(scheduledata.scheduledEnd).getHours()
                                : new Date(
                                    scheduledata.scheduledEnd
                                  ).getHours()) +
                                ":" +
                                new Date(
                                  scheduledata.scheduledEnd
                                ).getMinutes() +
                                " " +
                                (new Date(
                                  scheduledata.scheduledEnd
                                ).getHours() > 12
                                  ? "PM"
                                  : "AM")}
                            </div>
                            <div className="dashLes">
                              {scheduledata.courseName} -{" "}
                              {scheduledata.levelName}
                            </div>
                            <div
                              className="dashStatus"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => StartClass(scheduledata.roomId)}
                            >
                              Start Class
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  <li className="nextActive">
                    <div className="dashSchBoxIn">
                      <div className="dashSchTim"> 03:00 PM - 04:00 PM</div>
                      <div className="dashLes"> Maths - III</div>
                      <div className="dashStatus">
                        {" "}
                        Start in <span>04:20:60</span>
                      </div>
                    </div>
                  </li>
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
            <div className="boxBlue">
              <ul>
                <li>
                  <span className="blueBoxSm">My Students</span>
                  <div className="blueBoxHead">
                    <span>
                      <img src="/img/blueIcon1.svg" />
                    </span>
                    480
                  </div>
                </li>
                <li className="boxMid">
                  <span className="blueBoxSm">My Earnings</span>
                  <div className="blueBoxHead">
                    <span>
                      <img src="/img/blueIcon2.svg" />
                    </span>
                    102K
                  </div>
                </li>
                <li>
                  <span className="blueBoxSm">My Sessions</span>
                  <div className="blueBoxHead">
                    <span>
                      <img src="/img/blueIcon3.svg" />
                    </span>
                    170
                  </div>
                </li>
                <div className="clear"></div>
              </ul>
            </div>

            <div className="boxWhite">
              <h6>My Classes</h6>
              <ul>
                <li>
                  <div className="boxNo">84</div>
                </li>
                <li>
                  <div className="boxNo">24</div>
                  <span>English</span>
                  <div className="clear"></div>
                </li>
                <li>
                  <div className="boxNo">60</div>
                  <span>Maths</span>
                  <div className="clear"></div>
                </li>
              </ul>
              <div className="clear"></div>
            </div>

            <div className="topClass">
              <h4>Toppers in Class</h4>

              <div className="topClassList">
                <ul>
                  <li>
                    <div className="topClassBox">
                      <div className="topImg">
                        <img src="/img/topImg1.png" />
                      </div>
                      <div className="topTxt1">
                        <strong>Jenifer Johan</strong>
                        <span>ENGLISH LEON - Basic</span>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </li>
                  <li>
                    <div className="topClassBox">
                      <div className="topImg">
                        <img src="/img/topImg2.png" />
                      </div>
                      <div className="topTxt1">
                        <strong>Joseph Madrix</strong>
                        <span>SCIENCE LEON - Advance</span>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </li>
                  <li>
                    <div className="topClassBox">
                      <div className="topImg">
                        <img src="img/topImg1.png" />
                      </div>
                      <div className="topTxt1">
                        <strong>Jenifer Johan</strong>
                        <span>ENGLISH LEON - Basic</span>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </li>
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
