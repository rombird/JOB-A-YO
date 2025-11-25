import React from 'react';
// 파일명이 SalesAnalysis.jsx로 변경되었으므로, import 경로를 './components/SalesAnalysis'로 수정합니다.
import SalesAnalysis from './components/SalesAnalysis'; 
import './App.css'; 

function App() {
  return (
    <div className="App">
      <header style={{ 
          padding: '20px', 
          textAlign: 'center', 
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e9ecef'
      }}>
      </header>

      {/* 우리가 만든 매출 분석 위젯 컴포넌트 */}
      <SalesAnalysis />
      
    </div>
  );
}

export default App;