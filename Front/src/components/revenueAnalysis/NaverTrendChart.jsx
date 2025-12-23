import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from "../../api/axiosConfig";


const NaverTrendChart = () => {
    const [inputValue, setInputValue] = useState("");   // 입력창의 실시간 텍스트
    const [chartKeyword, setChartKeyword] = useState("");   // 실제 검색에 사용될 키워드
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    // 날짜 설정, 기본적으로 2025년분
    const [startDate, setStartDate] = useState("2025-01-01");
    const [endDate, setEndDate] = useState("2025-12-22")

    // 검색 실행 함수
    const handleChartSearch = (e) => {
        e.preventDefault();
        if (!inputValue.trim()){
            alert("분석할 키워드를 입력해주세요");
            return;
        }
        setChartKeyword(inputValue);   
    }

    // 키워드나 날짜 변경시 API 호출
    useEffect(() => {
        if(!chartKeyword) return;

        const fetchTrendData = async () => {
            setLoading(true);

            try{
                const response = await api.post('/api/trend', {
                    startDate: startDate,
                    endDate: endDate,
                    timeUnit: "date",
                    keywordGroups: [
                        {
                            groupName: chartKeyword,
                            keywords: [chartKeyword]
                        }
                    ]
                });

                const formatted = response.data.results[0].data.map(item => ({
                    period: item.period,
                    ratio: item.ratio
                }));
                setChartData(formatted);
            }catch(error){
                console.error("NaverTrendApi 호출 에러: ", error);
            }finally{
                setLoading(false);
            }
        };
        fetchTrendData();

    }, [chartKeyword, startDate, endDate]);  // 키워드나 날짜가 바뀌면 다시 호출

    if (!chartKeyword) {
        return (
            <div style={containerStyle}>
                <div style={searchBarContainer}>
                    <form onSubmit={handleChartSearch} style={{ display: 'flex', gap: '10px', flex: 1 }}>
                        <input 
                            type="text" 
                            placeholder="분석하고 싶은 키워드를 검색해 보세요." 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            style={chartInputStyle}
                        />
                        <button type="submit" style={chartBtnStyle}>분석</button>
                    </form>
                </div>
                <div style={emptyStyle}>키워드를 입력하면 네이버 검색량 추이가 나타납니다.</div>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            {/* 상단: 차트 전용 검색 바 */}
            <div style={searchBarContainer}>
                <form onSubmit={handleChartSearch} style={{ display: 'flex', gap: '10px', flex: 1 }}>
                    <input 
                        type="text" 
                        placeholder="트렌드 분석 키워드 입력 (예: 캠핑, 맛집)" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={chartInputStyle}
                    />
                    <button type="submit" style={chartBtnStyle}>분석</button>
                </form>
                
                {/* 날짜 선택 영역 */}
                <div style={dateContainer}>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={dateInputStyle} />
                    <span>~</span>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={dateInputStyle} />
                </div>
            </div>

            {/* 하단: 차트 영역 */}
            <div style={{ width: '100%', height: '350px', minHeight: '350px', marginTop: '20px' }}>
                {chartKeyword ? (
                    loading ? (
                        <div style={msgStyle}>데이터를 불러오는 중입니다...</div>
                    ) : chartData.length > 0 ? (
                        <>
                            <p style={{fontSize: '14px', color: '#555'}}><b>'{chartKeyword}'</b> 검색량 변화</p>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="period" hide />
                                    <YAxis tick={{fontSize: 11}} />
                                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)'}} />
                                    <Legend />
                                    <Line type="monotone" dataKey="ratio" name="검색 비중" stroke="#00C73C" strokeWidth={3} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </>
                    ) : <div style={msgStyle}>데이터가 없습니다.</div>
                ) : (
                    <div style={msgStyle}>분석하고 싶은 키워드를 검색해 보세요.</div>
                )}
            </div>
        </div>
    );
};

// --- 스타일 (인라인) ---
const containerStyle = { marginTop: '30px', padding: '25px', backgroundColor: '#f9f9f9', borderRadius: '15px', border: '1px solid #eee' };
const searchBarContainer = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' };
const chartInputStyle = { flex: 1, padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' };
const chartBtnStyle = { padding: '10px 20px', backgroundColor: '#00C73C', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const dateContainer = { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#666' };
const dateInputStyle = { padding: '8px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '13px' };
const msgStyle = { height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#999', fontSize: '15px' };
const emptyStyle = {
    marginTop: '20px',
    textAlign: 'center',
    padding: '40px',
    color: '#aaa',
    border: '1px dashed #ddd',
    borderRadius: '12px'
};

export default NaverTrendChart;