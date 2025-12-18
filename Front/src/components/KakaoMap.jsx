import React, { useEffect, useRef, useState } from 'react'; // 1. useRef 임포트
import useKakaoLoader from '../hooks/useKakaoLoader';

const KakaoMap = ({ mapWidth, mapHeight, initialLat, initialLng, searchKeyword, onSearchComplete }) => {
  
  // 2. 맵 컨테이너를 참조할 useRef 선언
  const mapContainerRef = useRef(null); 
  
  // 스크립트 로드 상태를 체크
  const { isLoaded, error } = useKakaoLoader();

  const[map, setMap] = useState(null);
  const[markers, setMarkers] =useState([]); // 생성한 마커들을 관리

  useEffect(() => {
    // 지도 초기화 로직
    if (!isLoaded || !window.kakao) { // window.kakao 체크 추가 (안정성)
      return;
    }
    
    // 3. document.getElementById("map") 대신 useRef 참조 사용
    const container = mapContainerRef.current; 

    // 컨테이너가 아직 DOM에 마운트되지 않았거나 null인 경우 종료
    if (!container) {
        return;
    }
    
    // 맵 생성
    const options = {
      center: new window.kakao.maps.LatLng(initialLat, initialLng),
      level: 3
    };
    const mapInstance = new window.kakao.maps.Map(container, options);
    
    // 생성된 지도 인스턴스를 상태에 저장(검색 기능에서 써야하니까)
    setMap(mapInstance);

    // Cleanup: 컴포넌트 언마운트 시 맵 리소스를 정리
    return () => {
        // Cleanup 시에도 container를 안전하게 참조
        if (mapInstance && container) { 
            // 맵 인스턴스가 사용하던 DOM을 비움
            container.innerHTML = "";
            mapInstance = null;
        }
    };

  }, [isLoaded, initialLat, initialLng]); 

  // 2. 검색어(serchKeyword)가 변경될 때 실행되는 검색 로직 추가
  useEffect(() => {
    // 지도 객체가 없거나 검색어가 없으면 실행하지 않음
    if(!map || !searchKeyword) return;

    // 카카오 장소 검색 서비스 객체 생성
    const ps = new window.kakao.maps.services.Places();

    // 키워도르 장소를 검색합니다
    ps.keywordSearch(searchKeyword, (data, status, _pagination) => {
      if (status === window.kakao.maps.services.Status.OK){
        // 기존에 지도에 찍혀있는 마커를 모두 지운다
        markers.forEach(marker => marker.setMap(null));

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위한 객체
        const bounds = new window.kakao.maps.LatLngBounds();
        let newMarkers = [];

        for (let i = 0; i< data.length; i++){
          const position = new window.kakao.maps.LatLng(data[i].y, data[i].x);
          const marker = new window.kakao.maps.Marker({
            position: position,
            map: map
          });
          
          newMarkers.push(marker);
          bounds.extend(position);  // 범위에 이 좌표를 포함 시킴
        }

        // 마커 상태 업데이트
        setMarkers(newMarkers);

        // 모든 마커가 보이도록 지도 중심/ 레벨 조정
        map.setBounds(bounds);

        // 검색된 데이터를 부모컴포넌트(Home.jsx)로 전달
        if (onSearchComplete){
          onSearchComplete(data);
        }
        
      } else if (status == window.kakao.maps.services.Status.ZERO_RESULT){
        alert('검색 결과가 없습니다');
      }else{
        alert('검색 중 오류가 발생했습니다');
      }
    });
  }, [searchKeyword, map]); // 키워드나 지도가 바뀔 때마다 실행


  // 에러 처리
  if (error) {
    return <div style={{ width: mapWidth, height: mapHeight, padding: 20 }}>
               에러 발생: {error}
           </div>;
  }

  // 로딩 상태 표시
  if (!isLoaded) {
    return <div style={{ width: mapWidth, height: mapHeight, padding: 20 }}>
               카카오맵 로딩 중...
           </div>;
  }

  // 맵 컨테이너
  return (
    <div
      // 4. ID를 제거하고 ref={mapContainerRef}로 연결
      ref={mapContainerRef} 
      style={{ width: mapWidth, height: mapHeight, border: "1px solid #ccc" }}
    />
  );
};

export default KakaoMap;