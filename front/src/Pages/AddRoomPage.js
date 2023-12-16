import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Alert } from 'bootstrap';

/**
 * AddRoomPage Component
 * Allows users to add information about a room to the system.
 */
const AddRoomPage = () => {
  // State variables for map, clicked coordinates, marker, and form data
  const [addMap, setAddMap] = useState(null);
  const [clickedLatLng, setClickedLatLng] = useState({ latitude: 0, longitude: 0 });
  const [marker, setMarker] = useState(null);
  const [formData, setFormData] = useState({
    roomDescription: '',
    depositAmount: 0,
    rentAmount: 0,
    latitude: 0.0,
    longitude: 0.0,
    location: '',
    image: 'https://ic.zigbang.com/ic/items/38483388/1.jpg', // Placeholder for file upload
    roomDesc: '',
    contactNumber: '',
  });

  // Map options for initializing Kakao Map
  const mapOption = {
    center: new window.kakao.maps.LatLng(37.300349, 126.97075),
    level: 3,
  };

  // useEffect to initialize Kakao Map and handle map clicks
  useEffect(() => {
    const addMapContainer = document.getElementsByClassName('add-map')[0];
    const addMap = new window.kakao.maps.Map(addMapContainer, mapOption);
    setAddMap(addMap);

    let existingMarker = null;

    window.kakao.maps.event.addListener(addMap, 'click', function (mouseEvent) {
      const latLng = mouseEvent.latLng;
      setClickedLatLng({ latitude: latLng.getLat(), longitude: latLng.getLng() });

      // Remove the existing marker if it exists
      if (existingMarker) {
        existingMarker.setMap(null);
      }

      // Create a new marker and set it on the map
      const newMarker = new window.kakao.maps.Marker({
        position: latLng,
        map: addMap,
      });

      // Update the existing marker reference
      existingMarker = newMarker;

      // Update the state to keep track of the current marker
      setMarker(newMarker);
    });

    // Cleanup resources on component unmount
    return () => {
      // Add cleanup code if needed
    };
  }, []);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    // Handle image file separately
    if (name === 'image') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: 'https://ic.zigbang.com/ic/items/38483388/1.jpg',
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Update state with clicked coordinates
    setFormData((prevData) => ({
      ...prevData,
      ['latitude']: clickedLatLng['latitude'],
      ['longitude']: clickedLatLng['longitude']
    }));

    try {
      // Perform API request to add room
      const response = await axios.post('http://localhost:3030/addroom',{
        userId : sessionStorage.getItem('userId'),
        image : "https://ifh.cc/g/2OFrRS.jpg",
        lat : clickedLatLng['latitude'],
        lng : clickedLatLng['longitude'],
        roomType : '투룸',
        rent: formData['rentAmount'],
        deposit: formData['depositAmount'],
        description: formData['roomDesc'],
        jibun : formData['location'],
        number : formData['contactNumber'],
        title : formData['roomDescription']
      });

      // Handle successful response
      alert("add room successfully!");
      
      // Show success message to user
    } catch (error) {
      // Handle error response
      console.error('Error adding room:', error);
      // Show error message to user
    }
  };

  return (
    <div className='add-wrapper' id='add'>
      <div className='add-content'>
        <div className='title-area'>
          <h1>Add Room</h1>
          <h3>Feel free to add the house you live in</h3>
        </div>

        {/* Room Information Form */}
        <Form onSubmit={handleSubmit} className='input-area'>
          {/* Room Description */}
          <div className='add-area' id='title2'>
            <div className='add-title'>Introduce Your Room</div>
            <div className='add-input'>
              <Form.Control
                type="text"
                placeholder="Enter room description"
                name="roomDescription"
                value={formData.roomDescription}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Deposit Amount */}
          <div className='add-area'>
            <div className='add-title'>Deposit</div>
            <div className='add-input'>
              <Form.Control
                type="text"
                placeholder="Enter deposit amount"
                name="depositAmount"
                value={formData.depositAmount}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Rent Amount */}
          <div className='add-area'>
            <div className='add-title'>Rent</div>
            <div className='add-input'>
              <Form.Control
                type="text"
                placeholder="Enter rent amount"
                name="rentAmount"
                value={formData.rentAmount}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Latitude */}
          <div className='add-area'>
            <div className='add-title'>Latitude</div>
            <div className='add-input'>
              <Form.Control
                type="text"
                placeholder="Enter deposit amount"
                name="latitude"
                value={clickedLatLng.latitude}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Longitude */}
          <div className='add-area'>
            <div className='add-title'>Longitude</div>
            <div className='add-input'>
              <Form.Control
                type="text"
                placeholder="Enter rent amount"
                name="longitude"
                value={clickedLatLng.longitude}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Location */}
          <div className='add-area'>
            <div className='add-title'>Location</div>
            <div className='add-input'>
              <Form.Control
                type="text"
                placeholder="Enter location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Contact Number */}
          <div className='add-area'>
            <div className='add-title'>Contact Number</div>
            <div className='add-input'>
              <Form.Control
                type="text"
                placeholder="Enter Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Room Description */}
          <div className='add-area'>
            <div className='add-title'>Description</div>
            <div className='add-input'>
              <Form.Control
                style={{ height: '80px' }}
                type="text"
                placeholder="Enter room description"
                name="roomDesc"
                value={formData.roomDesc}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Submit Button */}
          <button type="submit" className="custom-btn2" >Add</button>
        </Form>
      </div>

      {/* Map Section */}
      <div className='add-map-wrapper'>
        <div className='add-map'></div>
      </div>
    </div>
  );
};

export default AddRoomPage;
