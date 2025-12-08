import { useEffect, useRef } from "react";

const KakaoMap = ({mapWidth = "100%", mapHeight = "500px", initialLat = 33.450701, initialLng = 126.570667 }) => {
    // 지도를 삽입할 Dom 요소의 참조를 저장
    const mapContainer = useRef(null);

    useEffect(() => {
        // 카카오맵 라이브러리가 로드되었는지 확인
        if(!window.kakao || !mapContainer.current){
            console.error("카카오맵 api가 로드되지 않았거나, DOM요소가 준비되지 않았습니다.");
            return;
        }

        // 지도 표시 영역(컨테이너) 확보
        const container = mapContainer.current;

        // 지도의 중심 좌표 설정
        const options = {
            center: new window.kakao.maps.LatLng(initialLat, initialLng),
            level: 3    // 지도의 확대 레벨
        };

        // 지도 객체 생성 및 렌더링
        const map = new window.kakao.maps.Map(container, options);

        // 마커
        const markerPosition  = new window.kakao.maps.LatLng(initialLat, initialLng); 
        const marker = new window.kakao.maps.Marker({position: markerPosition});
        marker.setMap(map);

        return () => {
        };

    }, [initialLat, initialLng]); // 초기 좌표가 변경되면 지도를 다시 그리도록 의존성 배열에 포함

    // 지도가 그려질 영역 반환하기
    return (
        <>
        <div
        ref={mapContainer}
        style={{width: mapWidth, height: mapHeight}}
        />
        </>
    );
};

export default KakaoMap;