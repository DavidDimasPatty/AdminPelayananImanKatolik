import React from "react"
import { Link, useNavigate } from "react-router-dom";



const Leftnavbar=()=>{
    return(
        <aside class="column ml-4" style={{"width":"100%"}}>
        <p class="menu-label">Navigation</p>
        <ul class="menu-list">
          <li>
            <a href="/home" class="">
              <span class="icon"><i class="fa fa-home"></i></span> Home
            </a>
            <a href="/daftaruser" class="">
              <span class="icon"><i class="fa fa-table"></i></span> Users List
            </a>
            <a href="/daftarimam" class="">
              <span class="icon"><i class="fa fa-info"></i></span> Imam List
            </a>
            <a href="/daftargereja" class="">
              <span class="icon"><i class="fa fa-info"></i></span> Gereja List
            </a>
      
            </li>
        </ul>
      </aside>
    
    )
}

export default Leftnavbar;