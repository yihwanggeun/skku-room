import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarContract from '../\bComponent/SidebarContract';
import Form from 'react-bootstrap/Form';

const YourRoomPage = () => {
    const [yourRoom, setYourRoom] = useState();
    const currentId = sessionStorage.getItem('userId');
    const [selectedContractId, setSelectedContractId] = useState(null);
    const [requestContract, setRequestContract] = useState(null);
    const handleItemClick = (selectedItem) => {
        setSelectedContractId(selectedItem);
    };

    useEffect(() => {
        axios.get('http://localhost:3030/contract')
            .then(response => {
                const userRooms = response.data.filter(item => item.userId == currentId);
                setYourRoom(userRooms);
            })
            .catch(error => {
                console.error('아이템 상세 데이터를 가져오는 중 오류 발생', error);
            });

        return () => {
        };
    }, []);

    useEffect(() => {
        console.log(selectedContractId);
        axios.get('http://localhost:3030/contract/reqdetail', { params: { contractId: selectedContractId } })
            .then(response => {
                console.log(response);
                if(response.data.length == 0){
                    alert("There is nothing Request");
                }
                else{
                    setRequestContract(response.data[0]);
                    alert("Here is Request");
                }
                console.log(response);
            })
            .catch(error => {
                console.error('아이템 상세 데이터를 가져오는 중 오류 발생', error);
            });
        return () => {
        };
    }, [selectedContractId]);

const acceptReqest = () => {
    console.log("acceptBtn");
    axios.post('http://localhost:3030/contract/accept',{
        requestId : requestContract.requestId
    })
    .then(response => {
        if(response.data == "Okay"){
        alert("ACCECTED");
        }
    }).catch(function (error) {
        console.log(error);
    });
};

    return (
        <div className="main-wrapper">
            <div className="sidebar">
                <h2>SKKU ROOM LIST</h2>
                {yourRoom && (
                    <div>
                        {yourRoom.map(item => (
                            <SidebarContract
                                key={item.contractId}
                                item={item}
                                onClick={() => handleItemClick(item.contractId)}
                            />
                        ))}
                    </div>
                )}
                {!yourRoom && (
                    <div>Loading...</div>
                )}
            </div>
            {requestContract && (
                
                <div className="contract">
                
                        <div className='contract-title-area'>
                            <h1>Your Room</h1>
                        </div>
                        <div className='contract-area'>
                            <div className='contract-group'>
                                <div className='contract-title'>Name</div>
                                <div className='contract-input'>{requestContract.userName}</div>
                            </div>
                            <div className='contract-group'>
                                <div className='contract-title'>Personal Id</div>
                                <div className='contract-input'>{requestContract.personalId}</div>
                            </div>
                            <div className='contract-group'>
                                <div className='contract-title'>Current Location</div>
                                <div className='contract-input'>{requestContract.currentLocation}</div>
                            </div>
                            <div className='contract-group'>
                                <div className='contract-title'>Phone</div>
                                <div className='contract-input'>{requestContract.phone}</div>
                            </div>
                            <div className='contract-group'>
                                <div className='contract-title'>Purpose</div>
                                <div className='contract-input'>{requestContract.purpose}</div>
                            </div>
                            <div className='contract-group'>
                                <div className='contract-title'>MoneyCapacity ($)</div>
                                <div className='contract-input'>{requestContract.moneyCapacity}</div>
                            </div>
                            <div className='contract-group'>
                                <div className='contract-title'>Comment</div>
                                <div className='contract-input'>{requestContract.comment}</div>
                            </div>
    
                        </div>
                        <button type="submit"className="custom3-btn" onClick={acceptReqest}>Accept</button>
                </div>
            )}
            {!requestContract && (
                <div></div>
            )}
        </div>
    );
};

export default YourRoomPage;
