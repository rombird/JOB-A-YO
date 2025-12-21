import React, { useState, useMemo, useEffect, useRef } from "react";
import { Map, Polygon } from "react-kakao-maps-sdk";
import api from "../api/axiosConfig"; 
import "../css/custom.css";
import dongGeoJson from "../assets/BND_ADM_DONG.json";
import { dongDataByRegion, categories } from "../data/regionData.js";
import { transformCoordinates, transformGeoJsonToPath } from "../utils/mapUtils.js";
import { dongDataByRegion } from '../data/regionData.js';

const Custom = () => {
    // 상태 관리
    const [selectedGu, setSelectedGu] = useState("강남구");  // 선택된 구 이름 
    const [selectedDong, setSelectedDong] = useState(() => {
        const guName = "강남구";
        //  해당 구의 첫 번째 동 객체 가져오기 { name: "역삼1동", lat: ..., ... }
        const firstDong = dongDataByRegion[guName][0]; 
        
        // GeoJSON에서 경계 데이터(Polygon) 찾기
        
        const geoFeature = dongGeoJson.features.find(
        f =>
            f.properties.SIDO_NM === "서울특별시" &&
            f.properties.SGG_NM === selectedGu &&
            f.properties.ADM_NM.includes(selectedDong.name)
        );

        // 3. 기존 데이터와 GeoJSON 데이터를 합쳐서 상태 초기화
        return {
            ...firstDong,
            area: geoFeature ? (geoFeature.properties.SHAPE_AREA / 1000000).toFixed(2) : firstDong.area,
            path: geoFeature ? transformGeoJsonToPath(geoFeature.geometry.coordinates) : []
        };
    });

    

    // 사용 예시: 강남구의 동 목록 가져오기
    console.log(dongDataByRegion["강남구"]);

    const [category, setCategory] = useState("한식"); 
    const [storeCount, setStoreCount] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const mapRef = useRef(null); // Map 객체에 접근하기 위한 ref
    
    // 사용자가 행정동을 선택하면 dongGeoJson 파일안에서 같은 행정동을 find로 찾아냄
    // -> 복잡한 좌표들을 transformCoordinates로 변환해 저장
    const currentPath = useMemo(() => { 
        const feature = dongGeoJson.features.find(
            (f) => f.properties.ADM_NM === selectedDong.name 
        );
        return feature ? transformGeoJsonToPath(feature.geometry) : [];
    }, [selectedDong.name]);
    
    // '구' 변경 시 핸들러
    const handleGuChange = (e) => {
        const guName = e.target.value;
        setSelectedGu(guName);
        // 구가 바뀌면 해당 구의 첫 번째 동으로 자동 설정
        setSelectedDong(dongDataByRegion[guName][0]);
        setStoreCount(null);
    };

    // '동' 변경 시 핸들러
    const handleSelectDongChange = (e) => {
        const dongName = e.target.value; // 사용자가 선택한 행정동
        
        // 기존 리스트(dongDataByRegion)에서 위도, 경도, 면적 정보를 가져옵니다.
        const baseDongInfo = dongDataByRegion[selectedGu].find((d) => d.name === dongName);
        // if (!baseDongInfo) return;

        // GeoJSON 데이터(dongGeoJson)에서 해당 동의 진짜 경계선(Feature) 찾음
        const geoFeature = dongGeoJson.features.find(
            (f) => f.properties.ADM_NM === dongName // JSON의 ADM_NM과 일치하는지 확인
        );
        // 기본값 설정 (못 찾았을 경우 대비)
        let finalArea = baseDongInfo?.area || 0;
        let finalPath = [];

        // JSON 데이터가 확실히 있을 때만 카카오맵 형식으로 변환하여 저장
        if (geoFeature && geoFeature.properties) {
            finalArea = (geoFeature.properties.SHAPE_AREA / 1000000).toFixed(2);
            finalPath = transformGeoJsonToPath(geoFeature.geometry);
        }
        setSelectedDong({
            ...baseDongInfo,
            area: finalArea,
            path: geoFeature ? transformGeoJsonToPath(geoFeature.geometry) : []
        });

        console.log(geoFeature.properties); // ADM_NM, SGG_NM, SIDO_NM 
        console.log("coordinates 전체:", geoFeature.geometry.coordinates);
        console.log("첫 ring:", geoFeature.geometry.coordinates[0]);
        console.log("첫 좌표:", geoFeature.geometry.coordinates[0][0]);

        console.log(
        dongGeoJson.features.slice(0, 5).map(f => f.geometry.coordinates[0][0])
        );

    };

    const handleFetchCount = async () => {
        setLoading(true);
        try {
            const response = await api.post("/api/stores/count", {
                regionName: selectedDong.name, // 여기서 '동' 이름을 보냅니다!
                category: category
            });

            setStoreCount(response.data);
            alert(`${selectedDong.name}의 ${category} 조회가 완료되었습니다.`);
        } catch (error) {
            console.error("조회 실패:", error);
            alert("서버 연결 실패! 포트 번호(8090)와 백엔드 실행 여부를 확인하세요.");
        } finally {
            setLoading(false);
        }
    };

    // currentPath가 변경될 때마다 지도의 영역을 해당 경계에 맞춤
    useEffect(() => {
        const map = mapRef.current;
        if (!map || currentPath.length === 0) return;

        // kakao.maps.LatLngBounds 객체 생성
        const bounds = new window.kakao.maps.LatLngBounds();

        // currentPath는 [{lat, lng}, ...] 형태이므로 반복문을 통해 bounds 확장
        currentPath.forEach(pos => {
            bounds.extend(new window.kakao.maps.LatLng(pos.lat, pos.lng));
        });

        // 지도를 해당 영역으로 이동 (여백을 주려면 두 번째 인자로 padding 값 가능)
        map.setBounds(bounds);
    }, [currentPath]);

    return (
        <div className="custom">
            <h3>📍 지역 및 업종별 점포 조회</h3>
      
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>

                <select onChange={handleGuChange} value={selectedGu}>
                    {Object.keys(dongDataByRegion).map((gu) => (
                        <option key={gu} value={gu}>{gu}</option>
                    ))}
                </select>

                <select onChange={handleSelectDongChange} value={selectedDong.name}>
                    {dongDataByRegion[selectedGu].map(d => (
                        <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                </select>
                <button onClick={handleFetchCount}>업종 선택 전 조회하기</button>

                {/* 업종 선택 */}
                <select value={category} onChange={(e) => { setCategory(e.target.value); setStoreCount(null); }}
                    style={{ padding: "10px" }}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* 하나로 통합된 버튼 */}
                {/* <button 
                    onClick={handleFetchCount} 
                    disabled={loading}
                    style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                    {loading ? "조회 중..." : "조회 및 데이터 전송"}
                </button> */}
            </div>

            {/* 결과 표시 창 */}
            {/* {storeCount !== null && (
                <div style={{ padding: "15px", backgroundColor: "#eef2ff", borderRadius: "8px", marginBottom: "20px", border: "1px solid #4f46e5" }}>
                    <p style={{ fontSize: "18px", margin: 0 }}>
                        <strong>{selectedRegion.name}</strong>의 <strong>{category}</strong> 점포 수는 
                        <span style={{ color: "#4f46e5", fontWeight: "bold" }}> {storeCount}개</span>입니다.
                    </p>
                </div>
            )} */}

            {/* 지도 영역 */}
            <Map className="kakaomap" center={{ lat: selectedDong.lat, lng: selectedDong.lng }} ref={mapRef} level={7}>
                {currentPath.length > 0 && (
                    <Polygon
                        path={currentPath} // 경계 좌표 배열
                        strokeWeight={3} // 선의 두께
                        strokeColor={"#39f"} // 선의 색깔
                        strokeOpacity={0.8} // 선의 불투명도
                        fillColor={"#39f"} // 채우기 색깔
                        fillOpacity={0.3} // 채우기 불투명도
                    />
                )}
            </Map>

            {selectedDong && (
                <div className="info-box">
                    <p>선택된 동: {selectedDong.name}</p>
                    {/* area 값이 있는지 확인 후 출력 */}
                    <p>면적: {selectedDong.area ? `${selectedDong.area} km²` : "면적 정보 없음"}</p>
                </div>
            )}
        </div>
    );
};

export default Custom;