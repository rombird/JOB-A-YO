<<<<<<< HEAD
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
=======
import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'; // 1. useRef 임포트
import useKakaoLoader from '../hooks/useKakaoLoader';

const KakaoMap = forwardRef(({ mapWidth, mapHeight, initialLat, initialLng, searchKeyword, onSearchComplete }, ref) => {
  
  // 맵 컨테이너를 참조할 useRef 선언
  const mapContainerRef = useRef(null); 
  // 스크립트 로드 상태를 체크
  const { isLoaded, error } = useKakaoLoader();
  const[map, setMap] = useState(null);
  const[markers, setMarkers] =useState([]); // 생성한 마커들을 관리
  const[infowindow, setInfowindow] = useState(null);

  // 부모 컴포넌트에서 지도 이동 및 인포윈도우 열기를 제어할 수 있게 노출
  useImperativeHandle(ref, () => ({
    moveToLocation: (place) => {
      if(!map) return;
      const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
      map.panTo(moveLatLon);  // 부드럽게 이동
      displayInfoWindow(place); // 인포윈도우 표시
    }
  }));

  useEffect(() => {
    // 지도 초기화 로직
    if (!isLoaded || !window.kakao || !mapContainerRef.current) { // window.kakao 체크 추가 (안정성)
      return;
    }
    
    // 맵, 인포윈도우 생성
>>>>>>> origin/임새롬
    const options = {
      center: new window.kakao.maps.LatLng(initialLat, initialLng),
      level: 3
    };
<<<<<<< HEAD
    mapInstance = new window.kakao.maps.Map(container, options);
    
    // 3. Cleanup: 컴포넌트 언마운트 시 맵 리소스를 정리
    return () => {
        // Cleanup 시에도 container를 안전하게 참조
        if (mapInstance && container) { 
            // 맵 인스턴스가 사용하던 DOM을 비움
            container.innerHTML = "";
=======
    const mapInstance = new window.kakao.maps.Map(mapContainerRef.current, options);
    const iw = new window.kakao.maps.InfoWindow({zIndex: 1});
    setMap(mapInstance);  // 생성된 지도 인스턴스를 상태에 저장
    setInfowindow(iw);  // 인포윈도우

    // Cleanup: 컴포넌트 언마운트 시 맵 리소스를 정리
    return () => {
        // Cleanup 시에도 container를 안전하게 참조
        if (mapInstance && mapContainerRef.current) { 
            // 맵 인스턴스가 사용하던 DOM을 비움
            mapContainerRef.current.innerHTML = "";
>>>>>>> origin/임새롬
            mapInstance = null;
        }
    };

  }, [isLoaded, initialLat, initialLng]); 

<<<<<<< HEAD
=======
  // 인포윈도우 표시 함수
  const displayInfoWindow = (place) => {
    if(!map || !infowindow) return;
    infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
    infowindow.setPosition(new window.kakao.maps.LatLng(place.y, place.x));
    infowindow.open(map);
  }

  // 2. 검색어(serchKeyword)가 변경될 때 실행되는 검색 로직 추가
  useEffect(() => {
    // 지도 객체가 없거나 검색어가 없으면 실행하지 않음
    if(!map || !searchKeyword) return;

    // 카카오 장소 검색 서비스 객체 생성
    const ps = new window.kakao.maps.services.Places();

    // 반경 500M 검색 옵션 추가
    const searchOptions = {
      location: map.getCenter(),  // 현재 지도 중심 기준
      radius: 500,    // 500미터 반경
      size: 15,
      sort: window.kakao.maps.services.SortBy.DISTANCE  // 거리순 정렬
    };

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(searchKeyword, (data, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK){
        // 검색 결과 데이터와 페이징 결과를 부모에게 전달
        // if(onSearchComplete) onSearchComplete(data, pagination);


        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위한 객체
        const bounds = new window.kakao.maps.LatLngBounds();
        let newMarkers = [];

        data.forEach((place) => {
          const position = new window.kakao.maps.LatLng(place.y, place.x);
          const marker = new window.kakao.maps.Marker({position, map});
        
          // 마커 클릭 시 인포윈도우 표시
          window.kakao.maps.event.addListener(marker, 'click', () => displayInfoWindow(place));

          newMarkers.push(marker);
          bounds.extend(position);
        });

        
        // 마커 상태 업데이트
        setMarkers(prev => [...prev, ...newMarkers]);

        // 모든 마커가 보이도록 지도 중심/ 레벨 조정
        map.setBounds(bounds);

        // 검색된 데이터를 부모컴포넌트(Home.jsx)로 전달
        if (onSearchComplete){
          onSearchComplete(data, pagination);
        }

      } else if (status == window.kakao.maps.services.Status.ZERO_RESULT){
        alert('검색 결과가 없습니다');
      }else{
        alert('검색 중 오류가 발생했습니다');
      }
    });
  }, [searchKeyword, map]); // 키워드나 지도가 바뀔 때마다 실행


>>>>>>> origin/임새롬
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
<<<<<<< HEAD
      style={{ width: mapWidth, height: mapHeight, border: "1px solid #ccc" }}
    />
  );
};
=======
      style={{ width: mapWidth, height: mapHeight}}
    />
  );
});
>>>>>>> origin/임새롬

export default KakaoMap;