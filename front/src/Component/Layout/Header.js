import React from 'react';
import { Link } from 'react-router-dom'; 

const Header = () => {
    return (
        <header>
           <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/wonroom">원룸</Link></li>
                    <li><Link to="/sharehouse">쉐어하우스</Link></li>
                    <li><Link to="/list-your-wonroom">원룸 내놓기</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;