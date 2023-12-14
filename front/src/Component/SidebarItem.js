// SidebarItem.js
import React from "react";

const SidebarItem = ({ item, onClick }) => {
        return (
        <div onClick={() => { onClick(item.itemId); console.log(item.itemId)}}>
            <div className="sidebar-item-wrapper">
                <div className="left-box">
                <img style={ {objectFit : "cover"}} src='https://ic.zigbang.com/ic/items/38743082/1.jpg?w=400&h=300&q=70&a=1' alt="My Image" />
                </div>
                <div className="right-box">
                    <div className="roomtype">분리형 원룸</div>
                    <div className="price">월세 1,000/52</div>
                    {/* <div className="area">20m^2</div> */}
                    <div className="jibun">수원시 장안구 율전동 288-17</div>
                    <div className="title">채광좋고 넓은 원룸. 쪽문에서 도보로 3분위치.</div>
                </div>
            </div>
        </div>
    );
};

export default SidebarItem;
