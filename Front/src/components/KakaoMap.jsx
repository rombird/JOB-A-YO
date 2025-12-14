import React, { useEffect, useRef } from 'react'; // 👈 1. useRef 임포트
import useKakaoLoader from '../hooks/useKakaoLoader';

const KakaoMap = ({ mapWidth, mapHeight, initialLat, initialLng }) => {
  
  // 2. 맵 컨테이너를 참조할 useRef 선언
  const mapContainerRef = useRef(null); 
  
  // 스크립트 로드 상태를 체크
  const { isLoaded, error } = useKakaoLoader();

  useEffect(() => {
    // 1. 스크립트 로드 완료 후에만 맵을 생성
    if (!isLoaded || !window.kakao) { // window.kakao 체크 추가 (안정성)
      return;
    }

    let mapInstance = null;
    
    // 3. document.getElementById("map") 대신 useRef 참조 사용
    const container = mapContainerRef.current; 

    // 컨테이너가 아직 DOM에 마운트되지 않았거나 null인 경우 종료
    if (!container) {
        return;
    }
    
    // 2. 맵 생성
    const options = {
      center: new window.kakao.maps.LatLng(initialLat, initialLng),
      level: 3
    };
    mapInstance = new window.kakao.maps.Map(container, options);
    
    // 3. Cleanup: 컴포넌트 언마운트 시 맵 리소스를 정리
    return () => {
        // Cleanup 시에도 container를 안전하게 참조
        if (mapInstance && container) { 
            // 맵 인스턴스가 사용하던 DOM을 비움
            container.innerHTML = "";
            mapInstance = null;
        }
    };

  }, [isLoaded, initialLat, initialLng]); 

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