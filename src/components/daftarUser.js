import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";

const DaftarUser = () => {
    const [user,setUser]=useState([]);
    const nav = useNavigate();
    useEffect(()=>{
        getAllUser();
    },[])
    const devEnv = process.env.NODE_ENV !== "production";
    const deleteQuiz= async(id)=>{
        await axios.delete(`${devEnv  ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/delete`,{
               data:{ 
                   id:id
                },
         }).then( window.location.href="/admin")
    }

    const getAllUser= async()=>{
        await axios.get(`${devEnv  ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/getuser`).
        then((res)=>{
             console.log(res.data)
             if (res.data.length!=0){
                setUser(res.data);
                }
        }).catch((e)=>{
            window.location.reload();
        });
        

    }
  
    return (
      <div>    
        <Link to="/" className='button is-primary mt-2 mr-3 mb-3'>Back To Home</Link>
        <Link to="add" className='button is-primary mt-2'>Add Quiz</Link>
        <table className='table is-stripped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Id</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                { user.map((User,index)=>(
                <tr key={User._id}>
                <td>{index+1}</td>
                <td>{User._id}</td>
                <td>{User.name}</td>
                <td>{User.email}</td>
                <td>{User.password}</td>
                <td>{User.picture}</td>
                <td>
                    <Link to={`/edit/${User._id}`} className='button is-small is-info'>Edit</Link>
                    <button onClick={()=>deleteQuiz(User._id)} className='button is-small is-danger'>Delete</button>
                </td>

                </tr>

                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default DaftarUser
