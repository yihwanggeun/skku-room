import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import axios from 'axios';

/**
 * SignUpPage Component
 * Handles user registration by sending form data to the server.
 */
const SignUpPage = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        username:'',
        email: '',
        password: '',
        phone: ''
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
     * Handles the Sign Up button click event.
     * Sends a POST request to the server for user registration.
     */
    const handleButton = () => {
        axios.post("http://localhost:3030/signup", {
            username: formData['username'],
            password: formData['password'],
            phone: formData['phone'],
            email: formData['email']
        }).then(function (response) {
            if (response.status === 200) {
                if(response.data === "EXIST"){
                    console.log("Exist");
                    alert("This account already exists");
                } else {
                    console.log("SignUp Success");
                    window.location.href = "/main";
                }
            } else if (response.status === 409) {
                // Handle conflict status
            } else {
                console.log(response);
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
                    {/* Username Input */}
                    <div className='form-group'>
                        <div className='add-title'>UserName</div>
                        <Form.Control
                            className='form-input'
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Phone Number Input */}
                    <div className='form-group'>
                        <div className='add-title'>Phone Number</div>
                        <Form.Control
                            className='form-input'
                            type="text"
                            placeholder="Enter Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

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
            {/* Sign Up Button */}
            <button className="custom-btn" type="submit" onClick={handleButton}>Sign Up</button>
        </div>
    );
};

export default SignUpPage;
