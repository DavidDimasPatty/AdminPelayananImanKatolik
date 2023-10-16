import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './asset/logo.png'

const Header = () => {

  const nav = useNavigate();
  function logOut(){
     localStorage.removeItem("token");
     nav("/");
  }

  return (
    <Navbar expand="lg" className="bg-body has-shadow">
      <Navbar.Brand href="/home" className="ml-5"> <img
              alt=""
              src={logo}
              width="40"
              height="30"
              className="d-inline-block align-middle me-2"
            /> <center className="mt-2">Admin Pelayanan Katolik</center></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Item className='me-3' ><button className='button is-info ml-5' onClick={()=>{logOut()}}>Log Out</button></Nav.Item>     
        </Nav>
      </Navbar.Collapse>
      
  </Navbar>
  
  );
};

export default Header;
