import React, { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "bulma/css/bulma.min.css";

const ChangePassword = () => {

    const [repassword, setRePassword] = useState();
    const [password, setPassword] = useState();
    const { email } = useParams();
    useEffect(()=>{
        getUserEmail();
    },[])

    /* TOKEN */
    const getUserEmail= async ()=>{
       
        const devEnv = process.env.NODE_ENV !== "production";
        const {REACT_APP_DEV_URL, REACT_APP_PROD_URL} = process.env;
    
        await axios.get(`${devEnv  ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/getuseremail`,{
            params:{
                email:email
            }
        }).then((response)=>{
         if(response.data.length==0){
            window.location.replace('/error');
         }
        });
        
    }

    const nav = useNavigate();

    /* Check table user di db */
    const ChangePasswordUser = async (e) => {

        const devEnv = process.env.NODE_ENV !== "production";
        const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
        console.log(process.env)
        console.log(process.env.REACT_APP_PROD_URL)

        if (repassword && password) {

            const devEnv = process.env.NODE_ENV !== "production";
            const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;

            await axios.patch(`${devEnv ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/updatepassword`, {
                data: {
                    email: email,
                    password: password
                }
            }).then((respon) => {
                console.log(respon);
              
                window.alert("Password Berhasil Diubah");
                setTimeout(window.location.reload(),
                    2000
                );
                
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
                <div className="loginInput"><input type="password" id="pass" onChange={e => setPassword(e.target.value)} required /></div>

                <div className="loginLabel">Re-Type Password</div>
                <div className="loginInput"><input type="password" id="repass" onChange={e => setRePassword(e.target.value)} required /></div>
                <br />
                <button className="button is-link" onClick={ChangePasswordUser} >Change Password</button>


            </div>

        </center>

    )

}

export default ChangePassword;