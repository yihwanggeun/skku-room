import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { SlSizeFullscreen } from "react-icons/sl";
import { MdOutlineElevator } from "react-icons/md";
import { FaParking } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
const ContractRoomPage = () => {
    const { contractId } = useParams();
    const [formData, setFormData] = useState({
        userid: sessionStorage.getItem("userId"),
        username:'',
        personid: '',
        currentlocation: '',
        phone: '',
        purpose: '',
        moneycapacity: '',
        comment: '',
        contractId: contractId,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const [itemData, setItemData] = useState(null);
    console.log(contractId);
    const [salesType, setSalesType] = useState(null);
    const handleButton = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3030/contract/req", {
            userid : formData['userid'],
            username:  formData['username'],
            personid: formData['personid'],
            currentlocation: formData['currentlocation'],
            phone: formData['phone'],
            purpose: formData['purpose'],
            moneycapacity: formData['moneycapacity'],
            comment: formData['comment'],
            contractId: formData['contractId'],
        }).then(function (response) {
            console.log(response.data);
            if (response.status === 200) {
                if(response.data == "No"){
                    alert("Add Fail");
                }
                else{
                    alert("Check Your Contract Progress")
                    window.location.href ="/contract"
                } 
            }
                
             
        }).catch(function (error) {
            console.log(error);
        });
    }
    useEffect(() => {
        axios.get('http://localhost:3030/contract/side', { params: { contractId: contractId } })
            .then(response => {
                console.log(response);
                setItemData(response.data[0]);
                if(response.data[0].deposit == 0){
                    setSalesType("Key Money");
                }
                else{
                    setSalesType("Montly Rent");
                }
            })
            .catch(error => {
                console.error('아이템 상세 데이터를 가져오는 중 오류 발생', error);
            });

        // 컴포넌트가 언마운트되었을 때 isMounted를 false로 설정하여 메모리 누수 방지
        return () => {
        };
    }, []); // selectedItemId가 변경될 때마다 useEffect 실행
    return (
        <div className="main-wrapper">
            <div className="sidebar">
                <div className="detail-wrapper">
                    {itemData && ( // Check if itemData is truthy
                    <div className="detail-wrapper">
                    <div className='room-image'> <img src={`${itemData.image}`} alt={`Item ${contractId}`} /></div>
                    <div className="divider" style={{ marginTop : '8px', border : "0.5px solid lightgray", width : '100%'} }></div>
                    <div className='room-jibun'>{itemData.jibun}</div>
                    <div className='room-price'><p>{salesType}</p> <span>{itemData.deposit}</span><span>/{itemData.rent}</span></div>
                    <div className="divider" style={{ marginTop : '8px', border : "0.5px solid lightgray", width : '100%'} }></div>
                    <div className='room-title'>{itemData.title}</div>
                    <div className="room-info">
                        <div className='room-list'><SlSizeFullscreen className="icon"/><div>{itemData['size']} m²</div></div>
                        <div className='room-list'><MdBedroomParent className="icon"/><div>{itemData['roomType']}</div></div>
                        <div className='room-list'><FaPhone className="icon"/><div>{itemData['number']}</div></div>
                    </div>
                    <div className='room-image'> <img src='/Roominfoimage.jpg' alt={`Item ${contractId}`} /></div>
                    {/* <h2>옵션 정보</h2>
                    <div className='room-options'></div> */}
                    </div>
                    )}
                    {!itemData && (
                        <div>Loading...</div> // Optional: Show a loading indicator or message
                    )}
                </div>
            </div>


            <div className="contract">
                <div className='contract-title-area'>
                    <h1>Contract</h1>
                </div>
                <div className='contract-area'>
                 
                    <div className='contract-group'>
                        <div className='contract-title'>Name</div>
                        
                            <Form.Control
                            className='contract-input'
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            />
                        
                        </div>
                    <div className='contract-group'>
                        <div className='contract-title'>Personal Id</div>
                            
                            <Form.Control
                            className='contract-input'
                            type="text"
                            placeholder="XXXXXX-XXXXXXX"
                            name="personid"
                            value={formData.personid}
                            onChange={handleChange}
                            />
                            
                        </div>
                    <div className='contract-group'>
                        <div className='contract-title'>Current Location</div>
                        
                            <Form.Control
                            className='contract-input'
                            type="text"
                            placeholder="Enter Current Location"
                            name="currentlocation"
                            value={formData.currentlocation}
                            onChange={handleChange}
                            />
                        
                        </div>
                    <div className='contract-group'>
                        <div className='contract-title'>phone</div>
                        
                            <Form.Control
                            className='contract-input'
                            type="text"
                            placeholder="010-XXXX-XXXX"
                            name="phone"
                            value={formData.password}
                            onChange={handleChange}
                            />
                        
                    </div>
                    <div className='contract-group'>
                        <div className='contract-title'>Purpose</div>
                        
                            <Form.Control
                            className='contract-input'
                            type="text"
                            placeholder="Enter Purpose"
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleChange}
                            />
                        
                    </div>
                    <div className='contract-group'>
                        <div className='contract-title'>MoneyCapacity ($)</div>
                        
                            <Form.Control
                            className='contract-input'
                            type="text"
                            placeholder="Enter Money Capacity"
                            name="moneycapacity"
                            value={formData.moneycapacity}
                            onChange={handleChange}
                            />
                        
                    </div>
                    <div className='contract-group' id='comment'>
                        <div className='contract-title' >Comment</div>
                        
                            <Form.Control
                            className='contract-input'
                            type="text"
                            placeholder="Enter Comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            />
                        
                    </div>
                
            </div>
            <button className="custom3-btn" type="submit" onClick={handleButton}>Contract</button>
                </div>
            
        </div>
    );
};

export default ContractRoomPage;