import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";

const ChangePassword = () => {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  /* TOKEN */


  const nav = useNavigate();

  /* Check table user di db */
  const login = async (e) => {

    const devEnv = process.env.NODE_ENV !== "production";
    const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
    console.log(process.env)
    console.log(process.env.REACT_APP_PROD_URL)

    if (username && password) {

      const devEnv = process.env.NODE_ENV !== "production";
      const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;

      await axios.get(`${devEnv ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/user`, {
        params: {
          username: username,
          password: password
        }
      }).then((respon) => {
        console.log(respon);
        if (respon.data.length !== 0) {
          nav("/home");
        }
        else {

          window.alert("Invalid username or password");
        }

      }).catch((err) => console.log(err));

    }
    else {
      window.alert("Username or password can't be empty");
    }

  }
  /*  */
  return (

    <center>

      <div className="loginContainer">
        <br />
        <h2 style={{ color: "Black", fontSize: "20px" }}>ChangePassword</h2>
        <br />
       
        <div className="loginLabel">Password</div>
        <div className="loginInput"><input type="password" onChange={e => setPassword(e.target.value)} required /></div>

        <div className="loginLabel">Re-Type Password</div>
        <div className="loginInput"><input type="password" onChange={e => setPassword(e.target.value)} required /></div>
        <br />
        <button className="button is-link" onClick={login} >Login</button>


      </div>

    </center>

  )

}

export default ChangePassword;