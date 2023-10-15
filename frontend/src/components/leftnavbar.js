import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Leftnavbar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState();
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname); // Inisialisasi activeLink dengan pathname awal
  }, [location.pathname]);

  return (
    <aside class="column ml-4" style={{ width: "100%" }}>
      <p class="menu-label">Navigation</p>
      <ul class="menu-list">
        <li>
          <a
            onClick={() => navigate("/home")}
            className={activeLink === "/home" ? "is-active" : ""}
          >
            <span class="icon">
              <i class="fa fa-home"></i>
            </span>{" "}
            Home
          </a>

          <a
            onClick={() => navigate("/daftaruser")}
            className={activeLink === "/daftaruser" ? "is-active" : ""}
          >
            <span class="icon">
              <i class="fa fa-table"></i>
            </span>{" "}
            Users List
          </a>

          <a
            onClick={() => navigate("/daftarimam")}
            className={activeLink === "/daftarimam" ? "is-active" : ""}
          >
            <span class="icon">
              <i class="fa fa-info"></i>
            </span>{" "}
            Imam List
          </a>

          <a
            onClick={() => navigate("/daftargereja")}
            className={activeLink === "/daftargereja" ? "is-active" : ""}
          >
            <span class="icon">
              <i class="fa fa-info"></i>
            </span>{" "}
            Gereja List
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Leftnavbar;
