import React, { useEffect, useState } from "react";
import axios from 'axios';
import SidebarItem from "../\bComponent/SidebarItem";
import ItemDetail from "../\bComponent/ItemDetail";

/**
 * Mainpage Component
 * Displays a map with markers, and a sidebar with item details.
 */
function Mainpage() {
    // State variables
    const [map, setMap] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [itemDetails, setItemDetails] = useState([]);

    // Map options
    const mapOption = {
        center: new window.kakao.maps.LatLng(37.300349, 126.97075),
        level: 3,
    };

    // Marker image and size
    const markerImage = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    const imageSize = new window.kakao.maps.Size(24, 35); 

    // Marker cluster settings
    const cluster = new window.kakao.maps.MarkerClusterer({
        map: map,
        minLevel: 3,
        averageCenter: true,
        disableClickZoom: true,
        styles: [{
            width: '50px',
            height: '50px',
            borderRadius: '30px',
            color: '#FFF',
            textAlign: 'center',
            fontWeight: 'bold',
            background: 'rgba(43, 102, 83, .8)',
            lineHeight: '50px'
        }]
    });

    // useEffect to initialize the map and fetch marker data
    useEffect(() => {
        const mapContainer = document.getElementsByClassName('map')[0];
        const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(newMap);

        axios.get('http://localhost:3030')
            .then(response => {
                const locations = response.data;
                setMarkers(locations);
            })
            .catch(error => {
                console.error('Error fetching location data');
            });

        // Cleanup resources on component unmount
        return () => {
            // Perform cleanup if needed
        };
    }, []);

    // useEffect to update markers on the map
    useEffect(() => {
        if (map && markers.length > 0) {
            const markerList = markers.map(location => {
                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: new window.kakao.maps.LatLng(location.lat, location.lng),
                    title: location.itemId,
                    image: new window.kakao.maps.MarkerImage(markerImage, imageSize),
                });
                marker.itemId = location.itemId;
                return marker;
            });

            cluster.addMarkers(markerList);
        }
    }, [map, markers]);

    // Event listener for cluster click
    window.kakao.maps.event.addListener(cluster, 'clusterclick', function (clusterPoint) {
        const markersInCluster = clusterPoint.getMarkers();
        const clickedMarkers = markersInCluster.map(marker => marker.itemId);

        axios.get('http://localhost:3030/getItemDetails', { params: { itemIds: clickedMarkers } })
            .then(response => {
                setItemDetails(response.data);
                setIsSidebarOpen(true);
                map.panTo(new window.kakao.maps.LatLng(response.data[0].lat, response.data[0].lng));
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    });

    // Event handler for item click
    const handleItemClick = (selectedItemId) => {
        setSelectedItem(selectedItemId);
    };

    // Event handler for back button click
    const handleBackButtonClick = () => {
        setSelectedItem(null);
    };

    return (
        <div className="main-wrapper">
            <div className="map"></div>
            {isSidebarOpen && (
                <div className="sidebar">
                    {selectedItem ? (
                        // Render selected item details
                        <div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <button style={{ border: '0px', backgroundColor: 'transparent', width: '24px' }} onClick={handleBackButtonClick}>&lt;</button>
                                <h2 style={{ flex: 1, marginLeft: 'auto', marginRight: '0px' }}>Selected Item Details</h2>
                            </div>
                            <ItemDetail selectedItemId={selectedItem} onBackButtonClick={handleBackButtonClick} />
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
            )}
        </div>
    );
}

export default Mainpage;
