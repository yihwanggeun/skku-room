// ItemDetail.js
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { SlSizeFullscreen } from "react-icons/sl";
import { MdOutlineElevator } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";

/**
 * ItemDetail Component
 * Displays detailed information about a selected item.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.selectedItemId - The ID of the selected item.
 */
const ItemDetail = ({ selectedItemId }) => {
    // State variables to store item data, images, and options
    const [itemData, setItemData] = useState(null);
    const [itemImages, setItemImages] = useState(null);
    const [itemOptions, setItemOptions] = useState(null);

    // useEffect to fetch item data, images, and options based on selectedItemId
    useEffect(() => {
        // Fetch item data
        axios.get('http://localhost:3030/itemdetail', { params: { itemId: selectedItemId } })
            .then(response => {
                setItemData(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching item detail data', error);
            });

        // Fetch item images
        axios.get('http://localhost:3030/itemimages', { params: { itemId: selectedItemId } })
            .then(response => {
                setItemImages(response.data);
            })
            .catch(error => {
                console.error('Error fetching item images', error);
            });

        // Fetch item options
        axios.get('http://localhost:3030/itemoptions', { params: { itemId: selectedItemId } })
            .then(response => {
                setItemOptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching item options', error);
            });

        // Cleanup resources on component unmount
        return () => {
            // Perform cleanup if needed
        };
    }, [selectedItemId]); // Run useEffect whenever selectedItemId changes

    // useEffect to modify salesType for display purposes
    useEffect(() => {
        if (itemData) {
            itemData.salesType = itemData.salesType === "월세" ? "Monthly Rent" : "Key Money";
        }
    }, [itemData]);

    return (
        <div className="detail-wrapper">
            {itemData && (
                <div className="detail-wrapper">
                    {/* Display Item Image */}
                    <div className='room-image'>
                        <img src={`${itemData.imageThumbnail}?w=400&h=200&q=70&a=1`} alt={`Item ${selectedItemId}`} />
                    </div>
                    {/* Divider Line */}
                    <div className="divider" style={{ marginTop: '8px', border: "0.5px solid lightgray", width: '100%' }}></div>
                    {/* Display Jibun Address */}
                    <div className='room-jibun'>{itemData.jibunAddress}</div>
                    {/* Display Price */}
                    <div className='room-price'>
                        <p>{itemData.salesType}</p>
                        <span>{itemData.deposit}</span>
                        <span>/{itemData.rent}</span>
                    </div>
                    {/* Divider Line */}
                    <div className="divider" style={{ marginTop: '16px', border: "0.5px solid lightgray", width: '100%' }}></div>
                    {/* Display Title */}
                    <div className='room-title'>{itemData.title}</div>
                    {/* Display Room Information */}
                    <div className="room-info">
                        {/* Display Size */}
                        <div className='room-list'>
                            <SlSizeFullscreen className="icon" />
                            <div>{itemData['전용면적M2']} m²</div>
                        </div>
                        {/* Display Floor Information */}
                        <div className='room-list'>
                            <MdOutlineElevator className="icon" />
                            <div>{itemData['floor']}th Floor / {itemData['allFloors']}th Floor</div>
                        </div>
                        {/* Display Parking Availability */}
                        <div className='room-list'>
                            <FaParking className="icon" />
                            <div>{itemData['parkingAvailableText']}</div>
                        </div>
                        {/* Display Room Type */}
                        <div className='room-list'>
                            <MdBedroomParent className="icon" />
                            <div>{itemData['roomType']}</div>
                        </div>
                    </div>
                </div>
            )}
            {!itemData && (
                <div>Loading...</div> // Optional: Show a loading indicator or message
            )}
        </div>
    );
};

export default ItemDetail;
