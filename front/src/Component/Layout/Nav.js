import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navi() {
  // isAuthed 값이 1이라고 가정
  const isAuthed = sessionStorage.getItem('isAuth');
  var check = false;
  if(isAuthed == "true"){
    check = true;
  }
  console.log(isAuthed);
  return (
    <>
      <Navbar style={{ maxWidth : '8000px', height: '80px', width: '100wh', backgroundColor: '#2b6653', border: 'solid 1px lightgray' }} data-bs-theme="light">
        <Container style={{ marginLeft: '8px' }}>
          <Navbar.Brand href="#home"><img className='logo' src='/logowhite.png' alt="Logo" /> </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/main">Home</Nav.Link>
            <Nav.Link href="/addroom">Add Room</Nav.Link>
            <Nav.Link href="/contract">Contract</Nav.Link>
            {check  ? (
              <>
              <Nav.Link style = {{marginLeft : '32px'}}href="/yourrequest" className="rounded-link">Request</Nav.Link>
              <Nav.Link href="/yourroom" className="rounded-link">Room</Nav.Link>
              <Nav.Link href="/" className="rounded-link">LogOut</Nav.Link>
              </>
          ) : (
              <>
              <Nav.Link style = {{marginLeft : '32px'}} href="/signin" className="rounded-link">Sign In</Nav.Link>
              <Nav.Link  href="/signup" className="rounded-link">Sign Up</Nav.Link>
              </>
          )}
          </Nav>
          
        </Container>
      </Navbar>
    </>
  );
}

export default Navi;
