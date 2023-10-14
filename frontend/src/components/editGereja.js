import React from 'react'
import {useState,useEffect} from 'react'
import axios from "axios";
import { useNavigate,useParams} from 'react-router-dom';

const EditGereja = () => {
    const [nama, setNama]=useState('');
    const [address, setAddress]=useState('');
    const [kapasitas, setKapasitas]=useState('');
    const [paroki, setParoki]=useState('');
    const [lingkungan, setLingkungan]=useState('');
    const nav=useNavigate();
    const {id}=useParams();

    const UpdateGereja = async (e)=>{
        const devEnv = process.env.NODE_ENV !== "production";
        const {REACT_APP_DEV_URL, REACT_APP_PROD_URL} = process.env;
    
        e.preventDefault();
        await axios.patch(`${devEnv  ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/updategereja`,{
        
            data:{
                id:id,
                nama:nama,
                address:address,
                kapasitas:kapasitas,
                paroki:paroki,
                lingkungan:lingkungan
            }
        }).then( window.location.href="/daftargereja");
    }

    useEffect(()=>{
        getIdGereja();
    },[]);

    const getIdGereja= async ()=>{
        console.log(id)
        const devEnv = process.env.NODE_ENV !== "production";
        const {REACT_APP_DEV_URL, REACT_APP_PROD_URL} = process.env;
    
        await axios.get(`${devEnv  ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/getidgereja`,{
            params:{
                id:id
            }
        }).then((response)=>{
            setNama(response.data.nama);
            setAddress(response.data.address);
            setKapasitas(response.data.kapasitas);
            setParoki(response.data.paroki);
            setLingkungan(response.data.lingkungan);
        });
        
    }

  return (
    <div>
            <form onSubmit={UpdateGereja}>
                <div className='field'>
                    <label className='label'>Nama</label>
                    <input className="input"
                     type="text"
                     placeholder="question"
                     value={nama}
                     onChange={(e) =>setNama(e.target.value)}
                     ></input>
                </div>
                <div className='field'>
                    <label className='label'>Address</label>
                    <input className="input" 
                    type="text"
                     placeholder="option 1"
                     value={address}
                     onChange={(e) =>setAddress(e.target.value)}
                     ></input>
                </div>
                <div className='field'>
                    <label className='label'>Kapasitas</label>
                    <input className="input" 
                    type="text"
                     placeholder="option 2"
                     value={kapasitas}
                     onChange={(e) =>setKapasitas(e.target.value)}
                     ></input>
                </div>
                <div className='field'>
                    <label className='label'>Paroki</label>
                    <input className="input" type="text" 
                    placeholder="option 3"
                    value={paroki}
                     onChange={(e) =>setParoki(e.target.value)}
                    ></input>
                </div>

                <div className='field'>
                    <label className='label'>Lingkungan</label>
                    <input className="input" 
                    type="text" 
                    placeholder="option 4"
                    value={lingkungan}
                     onChange={(e) =>setLingkungan(e.target.value)}
                    ></input>
                </div>

                <div className='field'>
                        <button className='button is-primary'>Update</button>
                 </div>
            </form>
          
    </div>
    
  )
}

export default EditGereja