import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
function Navi() {
  return (
    <>
      {/* <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}

      {/* <br /> */}
      <Navbar  style={{ height: '80px', backgroundColor:'#2b6653', border: 'solid 1px lightgray'}} data-bs-theme="light">
        <Container style={{ marginLeft :'8px'}}>
        <Navbar.Brand href="#home"><img className='logo' src='/logowhite.png' alt="Logo" /> </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/main">Home</Nav.Link>
            <Nav.Link href="/shareroom">Share Room</Nav.Link>
            <Nav.Link href="/addroom">Add Room</Nav.Link>
            <Nav.Link href="/contract">Contract</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navi;