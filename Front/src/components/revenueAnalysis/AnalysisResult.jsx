// // AnalysisResult.jsx
// import React from 'react';

// const AnalysisResult = ({ data }) => {
//   if (!data) return null;

//   const { dong, sector, predicted_revenue, reasons } = data;

//   const displayRevenue = predicted_revenue 
//     ? Math.floor(predicted_revenue).toLocaleString() 
//     : "계산 중...";

//   console.log("얼마? ", data);

//   return (
//     <>
//       <div style={styles.container}>
//         <div className="analysis-card" style={styles.card}>
//           <h2 style={styles.title}>{dong} {sector} 분석 결과</h2>

//           <div style={styles.revenueSection}>
//             <span style={styles.label}>예상 점포당 월 매출</span>
//             <strong style={styles.revenue}>
//               {displayRevenue}원
//             </strong>
//           </div>

//           <hr style={styles.divider} />

//           <div style={styles.reasonSection}>
//             <h3 style={styles.subTitle}>{dong}의 특징</h3>
//             <ul style={styles.list}>
//               {reasons.map((reason, index) => (
//                 <li key={index} style={reason.includes('⚠️') ? styles.warningItem : styles.listItem}>
//                   {reason}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div >
//       </div>
//     </>
//   );
// };

// // 스타일링
// const styles = {
//   container: {display: 'flex', justifyContent: 'center', width: '100%', padding: '20px 0'},
//   card: { border: '1px solid #ddd', borderRadius: '12px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '500px' },
//   title: { fontSize: '1.2rem', marginBottom: '15px', color: '#333' },
//   revenueSection: { display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '20px' },
//   label: { fontSize: '0.9rem', color: '#666' },
//   revenue: { fontSize: '1.8rem', color: '#65A3FF', fontWeight: 'bold' },
//   divider: { border: '0', borderTop: '1px solid #eee', margin: '15px 0' },
//   subTitle: { fontSize: '1rem', marginBottom: '10px' },
//   list: { paddingLeft: '20px', lineHeight: '1.6' },
//   listItem: { color: '#444', marginBottom: '8px' },
//   warningItem: { color: '#d9534f', fontWeight: '500', marginBottom: '8px' }
// };

// export default AnalysisResult;

import React from 'react';

const AnalysisResult = ({ data }) => {
  if (!data) return null;

  const { revenueData, successData } = data;

  // 매출 정보
  const displayRevenue = revenueData.predicted_revenue
    ? Math.floor(revenueData.predicted_revenue).toLocaleString()
    : "0";

  // 성공 확률 정보
  const prob = successData.success_probability * 100;

  // 확률에 따른 색상 결정
  const getProbColor = (p) => {
    if (p >= 70) return '#28a745'; // 녹색 (안전)
    if (p >= 40) return '#ffc107'; // 황색 (주의)
    return '#dc3545';             // 적색 (위험)
  };

  // 단순 수치 대신 해석을 덧붙임
  const getStatusText = (p) => {
    if (p >= 70) return "매우 안정적";
    if (p >= 40) return "보통";
    if (p >= 10) return "주의";
    return "고위험 상권";
  };



  return (
    <div style={styles.container}>
      <div className="analysis-card" style={styles.card}>
        <h2 style={styles.title}>{revenueData.dong} {revenueData.sector} 분석 결과</h2>

        <div style={styles.mainInfo}>
          {/* 예상 매출액 섹션 */}
          <div style={styles.infoBox}>
            <span style={styles.label}>예상 점포당 월 매출</span>
            <strong style={styles.revenue}>{displayRevenue}원</strong>
          </div>

          {/* [추가] 성공 확률 섹션 */}
          <div style={styles.infoBox}>
            {/* <span style={styles.label}>상권 생존 안정성 점수</span>
            <strong style={{ ...styles.probability, color: getProbColor(prob) }}>
              {prob < 1 ? "1% 미만" : `${prob.toFixed(1)}%`}
            </strong>
            <span style={{ fontSize: '0.8rem', color: getProbColor(prob) }}>{getStatusText(prob)}</span> */}

            <span style={styles.label}>AI 예측 창업 성공 확률</span>
            <strong style={{ ...styles.probability, color: getProbColor(prob) }}>
              {prob.toFixed(1)}%
            </strong>
          </div>
        </div>

        <hr style={styles.divider} />

        <div style={styles.reasonSection}>
          <h3 style={styles.subTitle}>{revenueData.dong}의 상권 특징</h3>
          <ul style={styles.list}>
            {revenueData.reasons.map((reason, index) => (
              <li key={index} style={reason.includes('⚠️') ? styles.warningItem : styles.listItem}>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', width: '100%', padding: '20px 0' },
  card: { border: '1px solid #ddd', borderRadius: '12px', padding: '25px', backgroundColor: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '600px' },
  title: { fontSize: '1.4rem', marginBottom: '20px', color: '#333', textAlign: 'center' },
  mainInfo: { display: 'flex', justifyContent: 'space-around', gap: '20px', marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '10px' },
  infoBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' },
  label: { fontSize: '0.85rem', color: '#777', fontWeight: 'bold' },
  revenue: { fontSize: '1.6rem', color: '#65A3FF', fontWeight: 'bold' },
  probability: { fontSize: '1.6rem', fontWeight: 'bold' },
  divider: { border: '0', borderTop: '1px solid #eee', margin: '20px 0' },
  subTitle: { fontSize: '1.1rem', marginBottom: '12px', fontWeight: 'bold', color: '#444' },
  list: { paddingLeft: '15px', lineHeight: '1.7' },
  listItem: { color: '#555', marginBottom: '10px', listStyleType: 'none' },
  warningItem: { color: '#d9534f', fontWeight: '600', marginBottom: '10px', listStyleType: 'none' }
};

export default AnalysisResult;