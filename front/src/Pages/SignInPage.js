import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import axios from 'axios';

/**
 * SignInPage Component
 * Handles user authentication by sending login credentials to the server.
 */
const SignInPage = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    /**
     * Handles form input changes and updates the corresponding state.
     * @param {Object} e - The event object.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    /**
     * Handles the Login button click event.
     * Sends a POST request to the server for user authentication.
     * @param {Object} e - The event object.
     */
    const handleButton = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3030/signin", {
            password: formData['password'],
            email: formData['email']
        }).then(function (response) {
            console.log(response.data);
            if (response.status === 200) {
                if(response.data === "No"){
                    // Handle login failure
                    alert("Login failed. Please check your credentials.");
                } else {
                    // Set user authentication in session storage and redirect to the main page
                    sessionStorage.setItem("userId", response.data.id);
                    sessionStorage.setItem("isAuth", true);
                    window.location.href = "/main";
                } 
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className='sign-wrapper'>
            <div className='sign-logo'></div>
            <div className='sign-area'>
                <form>
                    {/* Email Input */}
                    <div className='form-group'>
                        <div className='add-title'>E-Mail</div>
                        <Form.Control
                            className='form-input'
                            type="text"
                            placeholder="Enter e-mail"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password Input */}
                    <div className='form-group'>
                        <div className='add-title'>Password</div>
                        <Form.Control
                            className='form-input'
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>
            {/* Login Button */}
            <button className="custom-btn" type="submit" onClick={handleButton}>Login</button>
        </div>
    );
};

export default SignInPage;
