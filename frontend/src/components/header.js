import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {



  return (
    <Navbar expand="lg" className="bg-body has-shadow">
      <Navbar.Brand href="/home" className="ml-5">Admin Pelayanan Katolik</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Item className='me-3' ><button className='button is-primary ml-5'>Log Out</button></Nav.Item>     
        </Nav>
      </Navbar.Collapse>
  </Navbar>
  );
};

export default Header;
