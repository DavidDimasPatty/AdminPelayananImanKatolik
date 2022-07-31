import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate} from 'react-router-dom';

const AddGereja = () => {
    const [nama, setNama]=useState('');
    const [address, setAddress]=useState('');
    const [kapasitas, setKapasitas]=useState('');
    const [paroki, setParoki]=useState('');
    const [lingkungan, setLingkungan]=useState('');
    const nav=useNavigate();
    useEffect(()=>{
   
    },[])
    
    const saveGereja= async ()=>{
        const devEnv = process.env.NODE_ENV !== "production";
        await axios.post(`${devEnv  ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/addgereja `,{
           
            nama:nama,
            address:address,
            kapasitas:kapasitas,
            paroki:paroki,
            lingkungan:lingkungan
        }).then( window.location.href="/daftargereja")
    }

    // const getAllCategory= async()=>{
    //     const devEnv = process.env.NODE_ENV !== "production";
    //     await axios.get(`${devEnv  ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PROD_URL}/getallcategory`).
    //     then((res)=>{
    //          console.log(res.data)
    //          if (res.data.length!=0){
    //             setCategory(res.data);
    //             }
    //     }).catch((e)=>{
    //        // window.location.reload();
    //     });
    // }

  return (
    <div>
             <form onSubmit={saveGereja}>
                <div className='field'>
                    <label className='label'>Nama</label>
                    <input className="input"
                     type="text"
                     placeholder="question"
                     onChange={(e) =>setNama(e.target.value)}
                     ></input>
                </div>
                <div className='field'>
                    <label className='label'>Address</label>
                    <input className="input" 
                    type="text"
                     placeholder="option 1"
                     onChange={(e) =>setAddress(e.target.value)}
                     ></input>
                </div>
                <div className='field'>
                    <label className='label'>Kapasitas</label>
                    <input className="input" 
                    type="text"
                     placeholder="option 2"
                     onChange={(e) =>setKapasitas(e.target.value)}
                     ></input>
                </div>
                <div className='field'>
                    <label className='label'>Paroki</label>
                    <input className="input" type="text" 
                    placeholder="option 3"
                     onChange={(e) =>setParoki(e.target.value)}
                    ></input>
                </div>

                <div className='field'>
                    <label className='label'>Lingkungan</label>
                    <input className="input" 
                    type="text" 
                    placeholder="option 4"
                     onChange={(e) =>setLingkungan(e.target.value)}
                    ></input>
                </div>

                {/* <div className='field'>
                    <label className='label'>Category</label>
                    <select  onChange={(e) =>setCategory2(e.target.value)} > 
                   
                    { category.map((category,key)=>(
                        <option value={category._id} selected={(category2=== category._id) ? true : false} >{category.name}</option>
                     ))}
                      
                    </select>
                </div> */}

                <div className='field'>
                        <button className='button is-primary'>Add Gereja</button>
                 </div>
            </form>
    </div>
  )
}

export default AddGereja