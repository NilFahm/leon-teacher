import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useAuthData } from "../data/AuthData";
import { Config } from "../data/Config";
import { useCommon } from "../utils/useCommon";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { ShowCircularProgress, HideCircularProgress } = useCommon();
  const { LoginUser } = useAuthData();
  const [auth, setAuthData] = useLocalStorage("auth", {});
  const [passwordtype, setPasswordType] = useState("password");
  const [errormessage, setErrorMessage] = useState(null);
  const [isremember, setIsRemember] = useLocalStorage("rememberme", null);
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isremember && isremember !== null) {
      var jso = atob(isremember)
      var parse = JSON.parse(jso)
      setLoginData({
        Email: parse.Email,
        Password: parse.Password,
      });
    }
  }, [isremember]);

  function Remember() {
    debugger
    var data = JSON.stringify(logindata)
    var bto = btoa(data.toString())
    setIsRemember(bto)
   
  }


  async function DoLogin() {
    ShowCircularProgress();
    await axios
      .post(Config.baseUrl + "/tutors/login", logindata)
      .then((response) => {
        setAuthData(response.data);
        navigate("/dashboard");
        console.log(response.data)
        HideCircularProgress();
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        HideCircularProgress();
      });
  }

  return (
    <>
      <div className="loginBox">
        <div className="loginLogo">
          <img src="/img/logo.svg" alt="" />
        </div>

        <div>
          <ul>
            {errormessage && (
              <li>
                <span className="errorTxt">{errormessage}</span>
              </li>
            )}
            <li>
              <label className="loginTxt">
                <input
                  placeholder=" "
                  autoComplete="Off"
                  value={logindata && logindata.email}
                  // onKeyPress={(e) =>{
                  //   if(e.key === 'enter'){
                  //     console.log('enter press here! ')
                  //     setLoginData({ ...logindata, email: e.target.value })
                  //   }
                  //   }
                    
                  // }
                  onChange={(e) =>
                    setLoginData({ ...logindata, email: e.target.value })
                  }
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                     DoLogin()
                    }
                  }}
                  readOnly={true}
                  onFocus={(e) => (e.target.readOnly = false)}
                  type="email"
                  required={true}
                />
                <span>User Name</span>
              </label>
            </li>

            <li className="Input">
              <label className="loginTxt">
                <input
                  placeholder=" "
                  type={passwordtype}
                  autoComplete="Off"
                  value={logindata && logindata.password}
                  onChange={(e) =>
                    setLoginData({ ...logindata, password: e.target.value })
                  }
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                     DoLogin()
                    }
                  }}
                  readOnly={true}
                  onFocus={(e) => (e.target.readOnly = false)}
                  required={true}
                />
                <span>Password</span>
                <Link
                  to=""
                  onClick={(e) =>
                    setPasswordType(
                      passwordtype === "text" ? "password" : "text"
                    )
                  }
                  className="eyeIcon"
                >
                  &nbsp;
                </Link>
              </label>
              {/* <span className="errorTxt">Enter correct password</span> */}
            </li>
            <li>
              <div className="rememberBox FL">
                <label className="checkboxMain">
                  Remember me
                  {/* <input
                    type="checkbox"
                    checked={isremember}
                    onChange={(e) => {
                      e.target.checked
                        ? setIsRemember(logindata)
                        : setIsRemember(null);
                    }}
                  /> */}
                  <input
                    type="checkbox"
                    checked={isremember && isremember !== null}
                    onChange={(e) => {
                      e.target.checked
                        ? Remember()
                        : setIsRemember(null);
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>

              {/* <div className="FR">
                <Link to={"/forgotpassword"} className="forgotBtn">
                  Forgot Password?
                </Link>
              </div> */}
              <div className="clear"></div>
            </li>
          </ul>
        </div>

        <div className="box-btn text-center">
          <Link to="" className="btn btn-green" onClick={(e) => DoLogin()}>
            Login
          </Link>
        </div>
      </div>

      <div className="butter1">
        <img src="/img/buterfly1.svg" alt="" />
      </div>
      <div className="butter2">
        <img src="/img/buterfly2.svg" alt="" />
      </div>
      <div className="butter3">
        <img src="/img/buterfly3.svg" alt="" />
      </div>

      <div className="clear"></div>
    </>
  );
};

export default Login;
