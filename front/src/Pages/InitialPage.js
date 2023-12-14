import React, {useState, useRef} from 'react';
import { Headline0 } from '../\bComponent/Headline';
import { Headline1 } from '../\bComponent/Headline';
import { Headline2 } from '../\bComponent/Headline';
import { Headline3 } from '../\bComponent/Headline';
import { Link } from 'react-router-dom'; 
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';

const InitialPage = () => {
    const ref0 = useRef(null);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const handleHome = () => {
        ref0.current?.scrollIntoView({behavior: 'smooth'})
    };
    const handleShare = () => {
        ref1.current?.scrollIntoView({behavior: 'smooth'})
    };
    const handleAdd = () => {
        ref2.current?.scrollIntoView({behavior: 'smooth'})
    };
    const handleContract = () => {
        ref3.current?.scrollIntoView({behavior: 'smooth'})
    };
    return (
        <div className='back-main-wrapper'>
            <Navbar  className='initial-nav' fixed="top" style={{ height: '80px', backgroundColor:'#2b6653', border: 'solid 1px lightgray'}} data-bs-theme="light">
                <Container style={{ marginLeft :'8px'}}>
                    <Navbar.Brand href="#home"><img className='logo' src='/logowhite.png' alt="Logo" /> </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link onClick={handleHome}>Home</Nav.Link>
                            <Nav.Link onClick={handleShare}>Share Room</Nav.Link>
                            <Nav.Link onClick={handleAdd}>Add Room</Nav.Link>
                            <Nav.Link onClick={handleContract}>Contract</Nav.Link>
                        </Nav>
                </Container>
            </Navbar>     

            <Headline0 ref={ref0}text=""></Headline0>
            <div className='first'>
                <div className='overlay-text'>
                    <div className='inner-desc'>
                    <p/>
                        <h1>Find Your Room</h1>
                        <p>Discover perfect accommodation with</p>
                        <span class="skku-room">SKKU ROOM</span>
                        <Link to="/main">
                        <Button style = {{ marginTop:'8px', width : '360px', fontSize: '32px', color:'white', border:'solid 3px white'}} variant="outline-success">Start using it now!</Button>{' '}
                        </Link>
                    </div>
                    
                </div>
                
            </div>
            <Headline1 ref={ref1}text=""></Headline1>
            <div className='second'>
                <div className='overlay-text'>
                    <div className='inner-desc'>
                        <h1>Recruit Your Roommate</h1>
                        <p>Find the perfect roommate with</p>
                        <span class="skku-room">SKKU ROOM</span>
                        <Link to="/shareroom">
                        <Button style = {{ marginTop:'8px', width : '360px', fontSize: '32px', color:'white', border:'solid 3px white'}} variant="outline-success">Start using it now!</Button>{' '}
                        </Link>
                    </div>
                    
                </div>
            </div>
            <Headline1 ref={ref2}text=""></Headline1>
            <div className='third'>
                <div className='overlay-text'>
                    <div className='inner-desc'>
                        <h1>Add Your Room</h1>
                        <p>Add your room easily with</p>
                        <span class="skku-room">SKKU ROOM</span>
                        <Link to="/addroom">
                        <Button style = {{ marginTop:'8px', width : '360px', fontSize: '32px', color:'white', border:'solid 3px white'}} variant="outline-success">Start using it now!</Button>{' '}
                        </Link>
                    </div>
                        
                </div>
            </div>
            <Headline2 ref={ref3}text=""></Headline2>
            <div className='fourth'>
                <div className='overlay-text'>
                    <div className='inner-desc'>
                        <h1>Contract Room Safe</h1>
                        <p>Ensure a secure room contract withg</p>
                        <span class="skku-room">SKKU ROOM</span>
                        <Link to="/contract">
                        <Button style = {{ marginTop:'8px', width : '360px', fontSize: '32px', color:'white', border:'solid 3px white'}} variant="outline-success">Start using it now!</Button>{' '}
                        </Link>
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default InitialPage;