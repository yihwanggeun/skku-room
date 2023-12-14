import React, { useEffect, useState } from "react";
import axios from 'axios';
import SidebarItem from "../\bComponent/SidebarItem";
import ItemDetail from "../\bComponent/ItemDetail";

const ShareRoomPage = () => {
    const [shareMap, setShareMap] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const mapOption = {
        center: new window.kakao.maps.LatLng(37.300349, 126.97075),
        level: 3,
    };
    const markerImage = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const imageSize = new window.kakao.maps.Size(24, 35); 
    const [markers, setMarkers] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemDetails, setItemDetails] = useState([]);
    var cluster = new window.kakao.maps.MarkerClusterer({
        map: shareMap,
        minLevel: 3,
        averageCenter: true, // 필요에 따라 설정
        disableClickZoom : true,
        styles:[{
            width : '50px', height : '50px',
            borderRadius: '30px',
            color: '#FFF',
            textAlign : 'center',
            fontWeight: 'bold',
            background : 'rgba(43, 52, 83, .8)',
            lineHeight: '50px'
        }]
    });
    useEffect(() => {
        const shareMapContainer = document.getElementsByClassName('share-map')[0];
        const shareMap = new window.kakao.maps.Map(shareMapContainer, mapOption);
        setShareMap(shareMap);
        axios.get('http://localhost:3030/share')
            .then(response => {
                const locations = response.data;
                console.log(locations)
                setMarkers(locations);
            })
            .catch(error => {
                console.error('Error fetching location data');
            });
        
        // 컴포넌트 언마운트 시 지도 리소스 정리
        return () => {
            
        };
    }, []);
    
    useEffect(() => {
        // 마커를 추가하는 부분
        if (shareMap && markers.length > 0) {
            var markerList = markers.map(location => {
                const marker = new window.kakao.maps.Marker({
                    map: shareMap,
                    position: new window.kakao.maps.LatLng(location.lat, location.lng),
                    title: location.itemId,
                    image: new window.kakao.maps.MarkerImage(markerImage, imageSize),
                });
                marker.itemId = location.itemId;
                return marker
            });
            
            cluster.addMarkers(markerList);
        }
    }, [shareMap, markers]);

    window.kakao.maps.event.addListener(cluster, 'clusterclick', function(clusterPoint){
        var makrersInCluster = clusterPoint.getMarkers();
        var clickedMarkers = []
        makrersInCluster.forEach(marker =>{
            clickedMarkers.push(marker.itemId);
        });

        axios.get('http://localhost:3030/getItemDetails',{params : {itemIds: clickedMarkers}})
        .then(response => {
            console.log(response.data);
            setItemDetails(response.data);
            setIsSidebarOpen(true);
            console.log(isSidebarOpen)
            shareMap.panTo(new window.kakao.maps.LatLng(response.data[0].lat, response.data[0].lng))
        })
        .catch(error => {
            console.error('Error fetching data', error);
        });
    });
    const handleItemClick = (selectedItemId) => {
        const selectedItem = selectedItemId;
        setSelectedItem(selectedItem);
        console.log(selectedItem);
    };
    useEffect(() => {
        console.log(isSidebarOpen);
    }, [isSidebarOpen]);
    return (
        <div className="main-wrapper">
            <div className="share-map"/>
            {isSidebarOpen && (
            <div className="sidebar">
                {selectedItem ? (
                        <div>
                            <h2>Selected Item Details</h2>
                            <ItemDetail selectedItemId={selectedItem} />
                        </div>
                    ) : (
                        // Render the list of items
                        <div>
                            <h2>SKKU ROOM LIST</h2>
                            {itemDetails.map(detail => (
                                <SidebarItem
                                    key={detail.itemId}
                                    item={detail}
                                    onClick={() => handleItemClick(detail.itemId)} // Handle item click
                                />
                            ))}
                        </div>
                    )}
            </div>
            )
                }
        </div>
    );
};

export default ShareRoomPage;