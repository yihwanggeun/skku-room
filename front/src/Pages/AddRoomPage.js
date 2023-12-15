import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';

const AddRoomPage = () => {
    const [addMap, setAddMap] = useState(null);
    const [clickedLatLng, setClickedLatLng] = useState(null);
    const [marker, setMarker] = useState(null);
    const mapOption = {
        center: new window.kakao.maps.LatLng(37.300349, 126.97075),
        level: 3,
    };
    const markerImage = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const imageSize = new window.kakao.maps.Size(24, 35); 
    useEffect(() => {
    const addMapContainer = document.getElementsByClassName('add-map')[0];
    const addMap = new window.kakao.maps.Map(addMapContainer, mapOption);
    setAddMap(addMap);

    let existingMarker = null;

    window.kakao.maps.event.addListener(addMap, 'click', function (mouseEvent) {
        const latLng = mouseEvent.latLng;
        setClickedLatLng({ lat: latLng.getLat(), lng: latLng.getLng() });

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

        // 컴포넌트 언마운트 시 지도 리소스 정리
        return () => {
            
        };
    }, []);
    useEffect(() => {
       console.log(marker);
        return () => {
            
        };
    }, [clickedLatLng]);
    return (
        <div className='main-wrapper' id='add'>
        <div className='add-content'>
            <div className='title-area'>
            <h1>Add Room</h1>
            <h3>Feel free to add the house you live in</h3>
            </div>

            <div className='input-area'>
            <div className='add-area' id='title2'>
                <div className='add-title'>Introduce Your Room</div>
                <div className='add-input'>
                <Form.Control type="text" placeholder="Enter room description" />
                </div>
            </div>
            <div className='add-area'>
                <div className='add-title'>Deposit</div>
                <div className='add-input'>
                <Form.Control type="text" placeholder="Enter deposit amount" />
                </div>
            </div>
            <div className='add-area'>
                <div className='add-title'>Rent</div>
                <div className='add-input'>
                <Form.Control type="text" placeholder="Enter rent amount" />
                </div>
            </div>
            <div className='add-area'>
                <div className='add-title'>Latitude</div>
                <div className='add-input'>
                <Form.Control type="text" placeholder="Enter deposit amount" value={clickedLatLng.lat} />
                </div>
            </div>
            <div className='add-area'>
                <div className='add-title'>Longtitude</div>
                <div className='add-input'>
                <Form.Control type="text" placeholder="Enter rent amount" value={clickedLatLng.lng}/>
                </div>
            </div>
            <div className='add-area'>
                <div className='add-title'>Location</div>
                <div className='add-input'>
                <Form.Control type="text" placeholder="Enter location" />
                </div>
            </div>
            <div className='add-area'>
                <div className='add-title'>Image</div>
                <div className='add-input'>
                <Form.Control type="file" placeholder="Upload room image" />
                </div>
            </div>
            <div className='add-area'>
                <div className='add-title'>Desc</div>
                <div className='add-input'>
                <Form.Control style = {{height : "80px"}}type="text" placeholder="Enter room DESC" />
                </div>
            </div>
            </div>
        </div>

        <div className='add-map-wrapper'>
            <div className='add-map'>

            </div>
        </div>
        </div>
    );
    };

export default AddRoomPage;
