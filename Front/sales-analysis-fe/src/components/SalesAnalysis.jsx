// src/components/SalesAnalysis.jsx (파일명 변경 적용)

import React, { useState, useEffect, useCallback } from 'react';
import { fetchSalesSummary } from '../services/salesApi';
import { formatSalesData, getChangeStyle, formatQtrCode } from '../utils/formatters';
import '../css/SalesAnalysis.css';

// 자치구와 분기 코드는 프론트에서 미리 정의
const GU_OPTIONS = ['강남구', '강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구',];
const QTR_OPTIONS = ['20252', '20251','20244','20243','20242','20241','20234','20233','20232','20231','20224', '20223', '20222', '20221', '20214', '20213', '20212', '20211', '20204', '20203', '20202', '20201', '20194', '20193', '20192', '20191'];

const SalesAnalysis = () => { // 컴포넌트 이름도 파일명과 맞춰 SalesAnalysis로 변경
  // 1. 상태 관리 (드롭다운 선택 값 및 API 결과)
  const [guName, setGuName] = useState(GU_OPTIONS[0]); 
  const [qtrCode, setQtrCode] = useState(QTR_OPTIONS[0]); 
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. API 호출 로직
  const loadSalesData = useCallback(async (selectedGu, selectedQtr) => {
    if (!selectedGu || !selectedQtr) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchSalesSummary(selectedGu, selectedQtr);
      setData(result);
    } catch (err) {
      // API 통신 오류 발생 시 에러 메시지 설정
      setError(err.message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 3. 의존성 배열을 이용한 자동 호출 (선택 값이 바뀔 때마다)
  useEffect(() => {
    loadSalesData(guName, qtrCode);
  }, [guName, qtrCode, loadSalesData]);

  // 로딩 및 오류 상태 렌더링
  if (error) return <div className="analysis-widget-container error-state">
                        <h2>매출액 분석 (에러)</h2>
                        {/* 에러 상태에서도 드롭다운은 유지하여 재시도 가능하도록 함 */}
                        <div className="dropdown-row">
                             <select value={guName} onChange={(e) => setGuName(e.target.value)}>
                                {GU_OPTIONS.map(gu => <option key={gu} value={gu}>{gu}</option>)}
                            </select>
                            <select value={qtrCode} onChange={(e) => setQtrCode(e.target.value)}>
                                {QTR_OPTIONS.map(qtr => <option key={qtr} value={qtr}>{formatQtrCode(qtr)}</option>)}
                            </select>
                        </div>
                        <p>{error}</p>
                        <p>Spring Boot 서버 상태 및 Proxy 설정을 확인하세요.</p>
                     </div>;


  // 데이터 포맷팅 및 변수 할당
  const currentQtrText = formatQtrCode(qtrCode);
  const currentSales = data ? formatSalesData(data.monthlyAverageSales, false) : '-';
  const qoqChangeText = data ? formatSalesData(data.qoqChange, true) : '-';
  const yoyChangeText = data ? formatSalesData(data.yoyChange, true) : '-';

  
  return (
    <div className="analysis-widget-container">
      <h2>외식업 매출액 분석 (선택: {guName})</h2>

      {/* 1. 드롭다운 선택 영역 */}
      <div className="dropdown-row">
        {/* 자치구 선택 드롭다운 */}
        <select value={guName} onChange={(e) => setGuName(e.target.value)}>
          {GU_OPTIONS.map(gu => <option key={gu} value={gu}>{gu}</option>)}
        </select>
        
        {/* 분기 선택 드롭다운 */}
        <select value={qtrCode} onChange={(e) => setQtrCode(e.target.value)}>
          {QTR_OPTIONS.map(qtr => <option key={qtr} value={qtr}>{formatQtrCode(qtr)}</option>)}
        </select>
      </div>
      
      {/* 2. 데이터 카드 영역 */}
      {isLoading ? (
          <div className="loading-state">데이터를 불러오는 중입니다...</div>
      ) : (
        <div className="sales-card-box">
            <div className="card-header-info">
                <h3>매출액</h3>
                <p>{currentQtrText} 월평균 매출액</p>
            </div>
            
            <div className="card-content">
              
              {/* 전분기 대비 (QoQ) */}
              <div className={`change-card ${data ? getChangeStyle(data.qoqChange) : 'change-neutral'}`}>
                <p>전분기 대비</p>
                <h2>{qoqChangeText}</h2>
              </div>

              {/* 현재 분기 매출액 (중앙) */}
              <div className="current-sales-card">
                <p>{currentQtrText}</p>
                <h1>{currentSales}</h1> 
              </div>

              {/* 전년 동분기 대비 (YoY) */}
              <div className={`change-card ${data ? getChangeStyle(data.yoyChange) : 'change-neutral'}`}>
                <p>전년 동분기 대비</p>
                <h2>{yoyChangeText}</h2>
              </div>
            </div>
            

            {/* 하단 과거 데이터 (임시 자리) */}
            <div className="card-footer-info">
                <p>오차가 있을 수 있습니다</p>
            </div>
        </div>
      )}
    </div>
  );
};

export default SalesAnalysis;