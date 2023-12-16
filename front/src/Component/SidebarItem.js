// SidebarItem.js
import React from "react";
import axios from 'axios';

/**
 * SidebarItem Component
 * Displays a single item in the sidebar with relevant details.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.item - The item object containing information.
 * @param {Function} props.onClick - The function to handle item click events.
 */
const SidebarItem = ({ item, onClick }) => {
    // Modify salesType for display purposes
    if (item) {
        item.salesType = item.salesType === "월세" ? "Monthly Rent" : "Key Money";
    }

    return (
        <div onClick={() => { onClick(item.itemId); console.log(item.itemId) }}>
            {/* Item Wrapper */}
            <div className="sidebar-item-wrapper">
                {/* Left Box - Display Image Thumbnail */}
                <div className="left-box">
                    <img src={`${item.imageThumbnail}?w=400&h=200&q=70&a=1`} alt="Item Image" />
                </div>
                {/* Right Box - Display Item Details */}
                <div className="right-box">
                    {/* Room Type */}
                    <div className="roomtype">{item['roomType']}</div>
                    {/* Price - Display Deposit, Rent, and Sales Type */}
                    <div className="price">
                        <span>{item.deposit}</span>
                        <span>/{item.rent}</span>
                        <span style={{ fontSize: '10px' }}>   ({item.salesType})</span>
                    </div>
                    {/* Jibun Address */}
                    <div className="jibun">{item.jibunAddress}</div>
                    {/* Title */}
                    <div className="title">{item.title}</div>
                </div>
            </div>
        </div>
    );
};

export default SidebarItem;
