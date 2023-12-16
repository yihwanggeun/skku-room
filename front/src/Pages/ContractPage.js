import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ContractPage = () => {
    // State to store room data fetched from the server
    const [rooms, setRooms] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch room data from the server when the component mounts
        axios.get('http://localhost:3030/contract')
            .then(response => {
                // Extract room data from the response and update state
                const rooms = response.data;
                console.log(rooms)
                setRooms(rooms);
            })
            .catch(error => {
                console.error('Error fetching location data');
            });
        
        // Cleanup: This function is called when the component is unmounted
        return () => {
            // You can add cleanup code here if needed
        };
    }, []);  // The empty dependency array ensures the effect runs only once on mount

    // Display only the first 6 rooms
    const displayedRooms = rooms && rooms.slice(0, 6);

    // Function to navigate to the room detail page when a room is clicked
    const navigateToRoomDetail = (contractId) => {
        navigate(`/contract/room/${contractId}`);
    };

    return (
        <div className='contract-wrapper'>
            <div className='contract-inner-wrapper'>
                {/* Title and subtitle for the contract page */}
                <div className='contract-title-area'>
                    <div className='contract-subtitle'>Find a house where you can sign a contract yourself</div>
                    <div className='contract-title'>E-commerce contract recommendation room</div>
                </div>
                
                {/* Display area for contract rooms */}
                <div className='contract-room-area'>
                    {rooms && rooms.map(room => (
                        // Display each room with an image and make it clickable
                        <div key={room.contractId} className='contract-room' onClick={() => navigateToRoomDetail(room.contractId)}>
                            <img src={`${room.image}?w=400&h=200&q=70&a=1`} alt={`Room ${room.id}`}  />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContractPage;
