import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";

const Login = () => {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  /* TOKEN */


  const nav = useNavigate();

  /* Check table user di db */
  const login = async (e) => {
    
    if(username && password) {
      
      const devEnv = process.env.NODE_ENV !== "production";
      const {REACT_APP_DEV_URL, REACT_APP_PROD_URL} = process.env;
  
      await axios.get(`${devEnv ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/user`, {
        params: {
          username:username,
          password:password
        }
      }).then((respon) => {
        console.log(respon);
        if(respon.data.length !== 0) {
          nav("/home");
        }
        else{
        
          window.alert("Invalid username or password");
        }

      }).catch((err) => console.log(err));

    }
    else{
      window.alert("Username or password can't be empty");
    }

  }
  /*  */
  return (

  <center>

    <div className="loginContainer">
      
      <div className="loginTitle">Log In</div>
      
      <div className="loginLabel">Username</div>
      <div className="loginInput"><input type="text" onChange={e => setUserName(e.target.value)} spellCheck="false" required/></div>

      <div className="loginLabel">Password</div>
      <div className="loginInput"><input type="password" onChange={e => setPassword(e.target.value)} required/></div>

      <button className="loginButton" onClick={login}>Login</button>
      
    
    </div>

  </center>

  )

}

export default Login;