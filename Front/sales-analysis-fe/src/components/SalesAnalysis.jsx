import React, { useState, useEffect, useCallback } from 'react';
import { fetchSalesSummary } from '../services/salesApi';
import { formatSalesData, getChangeStyle, formatQtrCode, getPreviousQtrCode, getPreviousYearQtrCode } from '../utils/formatters';
import '../css/SalesAnalysis.css';

const GU_OPTIONS = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구',];
const QTR_OPTIONS = ['20252', '20251', '20244', '20243', '20242', '20241', '20234', '20233', '20232', '20231', '20224', '20223', '20222', '20221', '20214', '20213', '20212', '20211', '20204', '20203', '20202', '20201', '20194', '20193', '20192', '20191'];

const SalesAnalysis = () => {
  const [guName, setGuName] = useState(GU_OPTIONS[0]);
  const [qtrCode, setQtrCode] = useState(QTR_OPTIONS[0]);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadSalesData = useCallback(async (selectedGu, selectedQtr) => {
    if (!selectedGu || !selectedQtr) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchSalesSummary(selectedGu, selectedQtr);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSalesData(guName, qtrCode);
  }, [guName, qtrCode, loadSalesData]);

  // 모든 변수를 if (error) 체크 전에 선언
  const currentQtrText = formatQtrCode(qtrCode);
  const currentSales = data ? formatSalesData(data.monthlyAverageSales, false) : '-';
  const qoqChangeText = data ? formatSalesData(data.qoqChange, true) : '-';
  const yoyChangeText = data ? formatSalesData(data.yoyChange, true) : '-';

  const previousQtrText = formatQtrCode(getPreviousQtrCode(qtrCode));
  const previousYearQtrText = formatQtrCode(getPreviousYearQtrCode(qtrCode));

  const previousQtrSales = data ? formatSalesData(data.previousQtrSales, false) : '-';
  const previousYearSales = data ? formatSalesData(data.previousYearSales, false) : '-';

  if (error) return <div className="analysis-widget-container error-state">
    <h2>매출액 분석 (에러)</h2>
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

  return (
    <div className="analysis-widget-container">
      <div className="container-below-contents">
        <h2>외식업 매출액 분석 (선택: {guName})</h2>

        <div className="dropdown-row">
          <select value={guName} onChange={(e) => setGuName(e.target.value)}>
            {GU_OPTIONS.map(gu => <option key={gu} value={gu}>{gu}</option>)}
          </select>

          <select value={qtrCode} onChange={(e) => setQtrCode(e.target.value)}>
            {QTR_OPTIONS.map(qtr => <option key={qtr} value={qtr}>{formatQtrCode(qtr)}</option>)}
          </select>
        </div>

        {isLoading ? (
          <div className="loading-state">데이터를 불러오는 중입니다...</div>
        ) : (
          <div className="sales-card-box">
            <div className="card-header-info">
              <h3>매출액</h3>
              <p>{currentQtrText} 월평균 매출액</p>
            </div>

            <div className="card-content">
              <div className={`change-card ${data ? getChangeStyle(data.qoqChange) : 'change-neutral'}`}>
                <p>전분기 대비</p>
                <h2>{qoqChangeText}</h2>
              </div>

              <div className="current-sales-card">
                <p>{currentQtrText}</p>
                <h1>{currentSales}</h1>
              </div>

              <div className={`change-card ${data ? getChangeStyle(data.yoyChange) : 'change-neutral'}`}>
                <p>전년 동분기 대비</p>
                <h2>{yoyChangeText}</h2>
              </div>
            </div>

            {/* 하단 과거 데이터 표시 */}
            <div className="card-footer-info">
              <div className="footer-data-row">
                <span className="footer-label">{previousQtrText}</span>
                <span className="footer-value">{previousQtrSales}</span>
              </div>
              <div className="footer-data-row">
                <span className="footer-label">{previousYearQtrText}</span>
                <span className="footer-value">{previousYearSales}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesAnalysis;