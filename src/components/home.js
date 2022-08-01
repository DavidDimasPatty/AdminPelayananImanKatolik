import React from 'react'
import {Link} from "react-router-dom";


function Home() {
  return ( 
      <body>
         
        <div className='buttons'>
        <h1 style={{color:"white",fontSize:"20px"}}>Welcome To Quizez</h1>
        <Link to={`/daftargereja`} id='start'className='button-27'>Daftar Gereja</Link>
        <Link to={`/daftaruser`} id='scoreboard' className='button-27'>Daftar User</Link>    
       
        </div>
     </body>
     )
}

export default Home