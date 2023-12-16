import React, { useEffect, useState } from "react";
import axios from 'axios';

const SidebarContract = ({item, onClick}) => {
    const [salesType, setSalesType] = useState(null);

    useEffect(() => {
        if (item.deposit != 0) {
            setSalesType('Monthly Rent');
        } else {
            setSalesType('Key Money');
        }
    }, [item.deposit]); // Add item.deposit as a dependency to useEffect

    return (
        <div onClick={() => { onClick(item.contractId); console.log(item.contractId)}}>
            <div className="sidebar-item-wrapper">
                <div className="left-box">
                    <img  src={`${item.image}`} alt="My Image" />
                </div>
                <div className="right-box">
                    <div className="roomtype">{item['roomType']}</div>
                    <div className="price">
                        <span>{item.deposit}</span>
                        <span>/{item.rent}</span>
                        <span style={{fontSize: '10px'}}>   ({salesType})</span>
                    </div>
                    <div className="jibun">{item.jibun}</div>
                    <div className="title">{item.title}</div>
                </div>
            </div>
        </div>
    );
};

export default SidebarContract;
