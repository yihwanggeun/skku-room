import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarContract from '../\bComponent/SidebarContract';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const YourRequestPage = () => {
    // State for modal visibility
    const [showModal, setShowModal] = useState(false);

    // Functions to open and close the modal
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // State to track acceptance status
    const [isAccecpted, setIsAccepted] = useState(null);

    // State to store requests
    const [request, setRequest] = useState(null);

    // Get the current user's ID from sessionStorage
    const currentId = sessionStorage.getItem('userId');

    // State to store user's requests
    const [requestContract, setRequestContract] = useState(null);

    // State to store selected contract ID
    const [selectedContractId, setSelectedContractId] = useState(null);

    // State to store contract data
    const [contractData, setContractData] = useState(null);

    // State to store selected request data
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Fetch user's requests when the component mounts
    useEffect(() => {
        axios.get('http://localhost:3030/contract/myreqest', { params: { userId: currentId } })
            .then(response => {
                if (response.data.length === 0) {
                    alert("There is nothing Request");
                } else {
                    setRequestContract(response.data);
                }
                console.log(response);
            })
            .catch(error => {
                console.error('Error fetching user requests', error);
            });
        return () => {
            // Cleanup: This function is called when the component is unmounted
        };
    }, []);

    // Fetch contract data related to user's requests
    useEffect(() => {
        axios.get('http://localhost:3030/contract')
            .then(response => {
                // Filter contracts based on user's requests
                const filteredContracts = response.data.filter(contract => {
                    return requestContract && requestContract.some(request => request.contractId === contract.contractId);
                });

                setContractData(filteredContracts);
            })
            .catch(error => {
                console.error('Error fetching contract data', error);
            });
        return () => {
            // Cleanup: This function is called when the component is unmounted
        };
    }, [requestContract]);

    // Log contractData to the console when it changes
    useEffect(() => {
        console.log(contractData);
    }, [contractData]);

    // Handle click on a contract item in the sidebar
    const handleItemClick = (selectedItem) => {
        console.log(selectedItem);
        setSelectedContractId(selectedItem);
        setSelectedRequest(contractData.filter(item => item.contractId == selectedItem));
        const request = requestContract.filter(item => item.contractId == selectedItem);
        if (request[0].accepted == 1) {
            setIsAccepted("Already Accepted");
        } else {
            setIsAccepted("Under review.");
        }
    };

    // Check the contract paper and show the modal if already accepted
    const checkContractPaper = () => {
        if (isAccecpted === "Already Accepted") {
            handleShow(); // Show the modal
        } else {
            // Handle other cases if needed
        }
    }

    return (
        <div className="main-wrapper">
            <div className="sidebar">
                <h2>SKKU ROOM LIST</h2>
                {contractData && (
                    <div>
                        {contractData.map(item => (
                            <SidebarContract
                                key={item.contractId}
                                item={item}
                                onClick={() => handleItemClick(item.contractId)}
                            />
                        ))}
                    </div>
                )}
                {!contractData && (
                    <div>Loading...</div>
                )}
            </div>
            {selectedRequest && (
                <div className="contract">
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Already Accepted</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img src="/contractimage.jpg" alt="Already Accepted" style={{ width: '100%' }} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className='contract-title-area'>
                        <h1>Your Room</h1>
                    </div>
                    <div className='contract-area'>
                        {/* Display contract details */}
                        <div className='contract-group'>
                            <div className='contract-title'>Title</div>
                            <div className='contract-input'>{selectedRequest[0].title}</div>
                        </div>
                        <div className='contract-group'>
                            <div className='contract-title'>Location</div>
                            <div className='contract-input'>{selectedRequest[0].jibun}</div>
                        </div>
                        <div className='contract-group'>
                            <div className='contract-title'>Deposit</div>
                            <div className='contract-input'>{selectedRequest[0].deposit}</div>
                        </div>
                        <div className='contract-group'>
                            <div className='contract-title'>Rent</div>
                            <div className='contract-input'>{selectedRequest[0].rent}</div>
                        </div>
                        <div className='contract-group'>
                            <div className='contract-title'>Latitude</div>
                            <div className='contract-input'>{selectedRequest[0].lat}</div>
                        </div>
                        <div className='contract-group'>
                            <div className='contract-title'>Longitude</div>
                            <div className='contract-input'>{selectedRequest[0].lng}</div>
                        </div>
                        <div className='contract-group'>
                            <div className='contract-title'>Contact Number</div>
                            <div className='contract-input'>{selectedRequest[0].number}</div>
                        </div>
                        <div className='contract-group'>
                            <div className='contract-title'>Description</div>
                            <div className='contract-input'>{selectedRequest[0].description}</div>
                        </div>
                    </div>
                    {/* Display acceptance status and handle actions */}
                    <div className="custom3-btn" onClick={checkContractPaper}>{isAccecpted}</div>
                </div>
            )}
            {!selectedRequest && (
                <div></div>
            )}
        </div>
    );
};

export default YourRequestPage;
