import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";
import "./login.css"

const Login = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  /* TOKEN */

  const nav = useNavigate();

  /* Check table user di db */
  const login = async (e) => {
    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    console.log(process.env);
    console.log(process.env.REACT_APP_PROD_URL);

    if (username && password) {
      const devEnv = process.env.NODE_ENV !== "production";
      const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;

      await axios
        .get(
          `${
            devEnv
              ? process.env.REACT_APP_DEV_URL
              : process.env.REACT_APP_PROD_URL
          }/user`,
          {
            params: {
              username: username,
              password: password,
            },
          }
        )
        .then((respon) => {
          console.log(respon.data);
          if (respon.data.length !== 0) {
            localStorage.setItem("token", respon.data[0].user);
            nav("/home");
          } else {
            window.alert("Invalid username or password");
          }
        })
        .catch((err) => console.log(err));
    } else {
      window.alert("Username or password can't be empty");
    }
  };
  /*  */
  if(localStorage.getItem("token")==="admin"){
    window.location.href="\home";
  }

  return (
    <center  class="column is-vcentered">
    <div class="column is-one-third">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div className="loginContainer">
              <br />
              <h2 style={{ color: "Black", fontSize: "20px" }}>Log In</h2>
              <br />
              <div className="loginLabel">Username</div>
              <div className="loginInput">
                <input
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  spellCheck="false"
                  required
                />
              </div>

              <div className="loginLabel">Password</div>
              <div className="loginInput">
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <br />
              <button className="button is-link" onClick={login}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </center>
  );

};

export default Login;
