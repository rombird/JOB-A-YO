import React, { useState, useMemo, useEffect, useRef } from "react";
import { Map, Polygon } from "react-kakao-maps-sdk";
import api from "../api/axiosConfig"; 
import "../css/custom.css";
import dongGeoJson from "../assets/BND_ADM_DONG.json";
import { dongDataByRegion, categories } from "../data/regionData.js";
import { transformGeoJsonToPath } from "../utils/mapUtils.js";

// 보통 GeoJSON의 행정동 코드는 ADM_CD 또는 ADM_DR_CD라는 이름의 프로퍼티에 담겨 있습니다.
const seoulDongGeoJson = {
    ...dongGeoJson,
    features: dongGeoJson.features.filter(f => 
        f.properties && String(f.properties.ADM_CD).startsWith("11")
    )
};

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
    const [category, setCategory] = useState("한식"); 
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false); 
    const mapRef = useRef(null); // Map 객체에 접근하기 위한 ref
    
    // 사용자가 행정동을 선택하면 dongGeoJson 파일안에서 같은 행정동을 find로 찾아냄
    // -> 복잡한 좌표들을 transformCoordinates로 변환해 저장
    const currentPath = useMemo(() => { 
        const feature = seoulDongGeoJson.features.find(
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
    };

    // '동' 변경 시 핸들러
    const handleSelectDongChange = (e) => {
        const dongName = e.target.value; // 사용자가 선택한 행정동
        
        // 기존 리스트(dongDataByRegion)에서 위도, 경도, 면적 정보를 가져옵니다.
        const baseDongInfo = dongDataByRegion[selectedGu].find((d) => d.name === dongName);
        // if (!baseDongInfo) return;

        // GeoJSON 데이터(dongGeoJson)에서 해당 동의 진짜 경계선(Feature) 찾음
        const geoFeature = seoulDongGeoJson.features.find(
            (f) => f.properties.ADM_NM === dongName // JSON의 ADM_NM과 일치하는지 확인
        );
        // 기본값 설정 (못 찾았을 경우 대비)
        let finalArea = baseDongInfo?.area || 0;
        let finalPath = [];

        // JSON 데이터가 확실히 있을 때만 카카오맵 형식으로 변환하여 저장
        if (geoFeature && geoFeature.properties) {
            finalArea = (geoFeature.properties.SHAPE_AREA / 1000000).toFixed(2);
            finalPath = geoFeature ? transformGeoJsonToPath(geoFeature.geometry) : [];
        }
        setSelectedDong({
            ...baseDongInfo,
            name: dongName,
            area: finalArea,
            path: finalPath
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
            const response = await api.post("/api/stores/custom", {
                regionName: selectedDong.name, // 행정동 보냄
                category: category
            });
            alert(`${selectedDong.name}의 ${category} 조회가 완료되었습니다.`);
            setAnalysisResult(response.data);
            
        } catch (error) {
            console.error("조회 실패:", error);
            alert("데이터를 가져오는데 실패했습니다.");
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
        <div className="map-container">
            <div className="map-controls" >
                <h4> 📝 상권 분석 조회 </h4>
                <div className="control-group">
                    <label>자치구</label>
                    <select onChange={handleGuChange} value={selectedGu}>
                        {Object.keys(dongDataByRegion).map((gu) => (
                            <option key={gu} value={gu}>{gu}</option>
                        ))}
                    </select>
                </div>
                <div className="control-group">
                    <label>행정동</label>
                    <select onChange={handleSelectDongChange} value={selectedDong.name}>
                        {dongDataByRegion[selectedGu].map(d => (
                            <option key={d.name} value={d.name}>{d.name}</option>
                        ))}
                    </select>
                </div>
                <div className="control-group">
                    <label>업종명</label>
                    <select value={category} onChange={(e) => { setCategory(e.target.value);}} >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <button className="analysis-btn" onClick={handleFetchCount} disabled={loading} >
                    {loading ? "분석 중..." : "분석하기"}
                </button>
            </div>

            {/* 결과 표시 창 */}
            {analysisResult && (
                <div className="analysis-box">
                    <div className="result-header">
                        <h4>📊 {analysisResult.dongName} {analysisResult.category} 리포트</h4>
                    </div>
                    <div className="result-content">
                        <p className="summary">{analysisResult.summary}</p>
                        <hr />
                        <ul>
                            <li>
                                <b>점포 증감률</b> : {analysisResult.storeChangeRate}
                                <br />
                                <span>{analysisResult.storeChangeComment}</span>
                            </li>
                            <li>
                                <b>업종 면적 밀도</b> : {analysisResult.areaDensity}
                                <br />
                                <span>{analysisResult.areaDensityComment}</span>
                            </li>
                            <li>
                                <b>점포당 유동인구</b> : {analysisResult.populationPerStore}
                                <br />
                                <span>{analysisResult.populationComment}</span>
                            </li>
                        </ul>
                        <hr />
                        <p>
                            ∘ 예상 전망 등급 : <b>{analysisResult.outlookGrade}</b>
                        </p>
                        <div className="term-guide">
                            <h5>💡 용어 설명</h5>
                            <dl>
                                <dt>점포 증감률</dt>
                                <dd>전년 대비 점포 수의 변화를 나타내는 지표입니다.</dd>
                                <dt>경쟁도 지수</dt>
                                <dd>해당 지역 내 동일 업종 간의 경쟁 강도를 나타냅니다.</dd>
                                <dt>업종 면적 밀도</dt>
                                <dd>지역 면적 대비 업종이 얼마나 밀집해 있는지 보여줍니다.</dd>
                                <dt>점포당 유동인구</dt>
                                <dd>한 점포가 가질 수 있는 잠재적 고객수를 의미합니다.</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            )}

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
        </div>
    );
};

export default Custom;