import React, { useEffect, useState } from "react";
import axios from 'axios';
const ItemDetail = ({ selectedItemId }) => {
    const [itemData, setItemData] = useState(null);
    const [itemImages, setItemImages] = useState(null);
    const [itemOptions, setItemOptions] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:3030/itemdetail', { params: { itemId: selectedItemId } })
            .then(response => {
                console.log(response);
                setItemData(response.data);
            })
            .catch(error => {
                console.error('아이템 상세 데이터를 가져오는 중 오류 발생', error);
            });

        axios.get('http://localhost:3030/itemimages', { params: { itemId: selectedItemId } })
        .then(response => {
            console.log(response);
            setItemImages(response.data);
        })
        .catch(error => {
            console.error('아이템 상세 데이터를 가져오는 중 오류 발생', error);
        });
        
        axios.get('http://localhost:3030/itemoptions', { params: { itemId: selectedItemId } })
        .then(response => {
            console.log(response);
            setItemOptions(response.data);
        })
        .catch(error => {
            console.error('아이템 상세 데이터를 가져오는 중 오류 발생', error);
        });
        // 컴포넌트가 언마운트되었을 때 isMounted를 false로 설정하여 메모리 누수 방지
        return () => {
        };
    }, []); // selectedItemId가 변경될 때마다 useEffect 실행

    return (
        <div>
            <div className='room-image'></div>
            <div className='room-jibun'>{selectedItemId}</div>
            <div className='room-price'></div>
            <div className='room-title'></div>
            <div className='room-size'></div>
            <div className='room-type'></div>
            <div className='room-parking'></div>
            <div className='room-floor'></div>
            <h2>옵션 정보</h2>
            <div className='room-options'></div>
            <h2>상세정보</h2>
            <div className='room-desc'></div>
        </div>
    );
};

export default ItemDetail;