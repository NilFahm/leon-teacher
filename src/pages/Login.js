import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useAuthData } from "../data/AuthData";

const Login = () => {
  const navigate = useNavigate();
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
      setLoginData({
        Email: isremember.Email,
        Password: isremember.Password,
      });
    }
  }, [isremember]);

  async function DoLogin() {
    const response = await LoginUser(logindata);
    if (response) {
      setAuthData(response);
      navigate("/dashboard");
    } else {
      setErrorMessage("Invalid username or password");
    }
  }

  return (
    <>
      <div className="loginBox">
        <div className="loginLogo">
          <img src="/img/logo.svg" alt="" />
        </div>

        <div>
          <ul>
            <li>
              <label className="loginTxt">
                <input
                  placeholder=" "
                  autoComplete="Off"
                  value={logindata && logindata.email}
                  onChange={(e) =>
                    setLoginData({ ...logindata, email: e.target.value })
                  }
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
              <span className="errorTxt">{errormessage}</span>
              <div className="rememberBox FL">
                <label className="checkboxMain">
                  Remember me
                  <input
                    type="checkbox"
                    checked={isremember}
                    onChange={(e) => {
                      e.target.checked
                        ? setIsRemember(logindata)
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
