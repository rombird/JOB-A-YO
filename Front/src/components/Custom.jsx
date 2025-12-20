import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import api from "../api/axiosConfig"; 

// 주요 지역 좌표 데이터 (서울 기준 예시)
// const districts = {
//   "종로구": [
//     { code: "11110515", name: "청운효자동" },
//     { code: "11110530", name: "사직동" }
//   ],
const regionData = [
  { name: "강남구", lat: 37.4959, lng: 127.0664 },
  { name: "강동구", lat: 37.5492, lng: 127.1464 },
  { name: "강북구", lat: 37.6469, lng: 127.0147 },
  { name: "강서구", lat: 37.5657, lng: 126.8226 },
  { name: "관악구", lat: 37.4653, lng: 126.9438 },
  { name: "광진구", lat: 37.5481, lng: 127.0857 },
  { name: "구로구", lat: 37.4954, lng: 126.8581 },
  { name: "금천구", lat: 37.4600, lng: 126.9008 },
  { name: "노원구", lat: 37.6552, lng: 127.0771 },
  { name: "동대문구", lat: 37.5838, lng: 127.0507 },
  { name: "동작구", lat: 37.4965, lng: 126.9443 },
  { name: "마포구", lat: 37.5622, lng: 126.9087 },
  { name: "서대문구", lat: 37.5820, lng: 126.9356 },
  { name: "서초구", lat: 37.4769, lng: 127.0378 },
  { name: "성동구", lat: 37.5506, lng: 127.0409 },
  { name: "성북구", lat: 37.6069, lng: 127.0232 },
  { name: "송파구", lat: 37.5048, lng: 127.1144 },
  { name: "양천구", lat: 37.5270, lng: 126.8561 },
  { name: "영등포구", lat: 37.5206, lng: 126.9139 },
  { name: "용산구", lat: 37.5311, lng: 126.9811 },
  { name: "은평구", lat: 37.6176, lng: 126.9227 },
  { name: "종로구", lat: 37.5991, lng: 126.9861 },
  { name: "중구", lat: 37.5579, lng: 126.9941 },
  { name: "중랑구", lat: 37.5953, lng: 127.0936 },
];

// 음식점 종류(업종) 리스트
const categories = ["한식", "중식", "일식", "양식", "카페", "치킨"];

const Custom = () => {
    // 1. 상태 통합 (선택된 지역 객체 하나로 관리)
    const [selectedRegion, setSelectedRegion] = useState(regionData[0]);
    const [category, setCategory] = useState("한식");
    const [storeCount, setStoreCount] = useState(null);
    const [loading, setLoading] = useState(false);

    // 지역 변경 핸들러
    const handleSelectChange = (e) => {
        const region = regionData.find((r) => r.name === e.target.value);
        setSelectedRegion(region);
        setStoreCount(null); // 지역 바뀌면 이전 결과 지우기
    };

    // 2. 통합 버튼 클릭 시 실행 (통신 + 알림)
    const handleFetchCount = async () => {
        setLoading(true);
        try {
            // 서버로 보내는 데이터: 현재 선택된 region의 name과 category
            const response = await api.post("/api/stores/count", {
                regionName: selectedRegion.name,
                category: category
            });

            setStoreCount(response.data);
            alert(`${selectedRegion.name}의 ${category} 점포 수 조회가 완료되었습니다.`);
        } catch (error) {
            console.error("데이터 조회 실패:", error);
            alert("서버 연결 실패! 포트 번호(8090)와 백엔드 실행 여부를 확인하세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h3>📍 지역 및 업종별 점포 조회</h3>
      
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                {/* 지역 선택 */}
                <select 
                    onChange={handleSelectChange} 
                    value={selectedRegion.name}
                    style={{ padding: "10px" }}
                >
                    {regionData.map((r) => (
                        <option key={r.name} value={r.name}>{r.name}</option>
                    ))}
                </select>

                {/* 업종 선택 */}
                <select 
                    value={category} 
                    onChange={(e) => { setCategory(e.target.value); setStoreCount(null); }}
                    style={{ padding: "10px" }}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                {/* 하나로 통합된 버튼 */}
                <button 
                    onClick={handleFetchCount} 
                    disabled={loading}
                    style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
                >
                    {loading ? "조회 중..." : "조회 및 데이터 전송"}
                </button>
            </div>

            {/* 결과 표시 창 */}
            {storeCount !== null && (
                <div style={{ padding: "15px", backgroundColor: "#eef2ff", borderRadius: "8px", marginBottom: "20px", border: "1px solid #4f46e5" }}>
                    <p style={{ fontSize: "18px", margin: 0 }}>
                        📍 <strong>{selectedRegion.name}</strong>의 <strong>{category}</strong> 점포 수는 
                        <span style={{ color: "#4f46e5", fontWeight: "bold" }}> {storeCount}개</span>입니다.
                    </p>
                </div>
            )}

            {/* 지도 영역 */}
            <Map
                center={{ lat: selectedRegion.lat, lng: selectedRegion.lng }}
                style={{ width: "100%", height: "450px", borderRadius: "10px" }}
                level={5}
            >
                <MapMarker position={{ lat: selectedRegion.lat, lng: selectedRegion.lng }}>
                    <div style={{ padding: "5px", color: "#000" }}>{selectedRegion.name}</div>
                </MapMarker>
            </Map>
        </div>
    );
};

export default Custom;