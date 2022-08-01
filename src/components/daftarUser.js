import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const DaftarUser = () => {
    const [user, setUser] = useState([]);
    const nav = useNavigate();
    useEffect(() => {
        getAllUser();
    }, [])
    const devEnv = process.env.NODE_ENV !== "production";
    const deleteUser = async (id) => {
        await axios.delete(`${devEnv ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/deleteuser`, {
            data: {
                id: id
            },
        }).then(window.location.href = "/daftaruser")
    }

    const bannedUser = async (id,banned) => {
        await axios.patch(`${devEnv ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/banneduser`, {
            data: {
                id: id,
                banned:banned
            },
        }).then(window.location.href = "/daftaruser")
    }

    const getAllUser = async () => {
        await axios.get(`${devEnv ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/getuser`).
            then((res) => {
                console.log(res.data)
                if (res.data.length != 0) {
                    setUser(res.data);
                }
            }).catch((e) => {
                window.location.reload();
            });


    }

    return (
        <div>
            <Link to="/home" className='button is-primary mt-2 mr-3 mb-3'>Back To Home</Link>

            <table className='table is-stripped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Picture</th>
                        <th>Banned</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((User, index) => (
                        <tr key={User._id}>
                            <td>{index + 1}</td>
                            <td>{User._id}</td>
                            <td>{User.name}</td>
                            <td>{User.email}</td>
                            <td>{User.password}</td>
                            <td> <img src={User.picture} width="50" height="50" /></td>
                            <td>{((User.banned == 0) ? 'No' : 'Yes')}</td>
                            <td>
                                {((User.banned == 0) ? <button onClick={() => bannedUser(User._id,User.banned)} className='button is-small is-info'>Banned</button> : <button onClick={() => bannedUser(User._id,User.banned)} className='button is-small is-info'>Unbanned</button>)}
                               
                                <button onClick={() => deleteUser(User._id)} className='button is-small is-danger'>Delete</button>
                            </td>

                        </tr>

                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default DaftarUser
