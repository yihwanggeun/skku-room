import React, { useRef, useEffect, useState} from "react";

function Mainpage() {
  const containerRef = useRef(null); // useRef를 사용하여 참조 생성
  const [map, setMap] = useState(null);
  const options = {
    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  useEffect(() => {
    const mapContainer = containerRef.current; // useRef로 생성한 참조를 사용
    const newMap = new window.kakao.maps.Map(mapContainer, options);
    setMap(newMap);
    return () => {
      // 언마운트 시 정리 작업이 필요한 경우 추가
    };
  }, []); // 두번째 인자가 빈 배열이므로 컴포넌트가 마운트될 때만 실행
  useEffect(() => {
    const handleResize = () => {
        if(map){
            map.relayout();
        }
    };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
    }
  },[map]);

  return (
    <div className="main-wrapper">
        <div className="map" ref={containerRef}></div>
    </div>
    
  );
}

export default Mainpage;