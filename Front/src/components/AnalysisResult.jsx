// AnalysisResult.jsx
import React from 'react';

const AnalysisResult = ({ data }) => {
  if (!data) return null;

  const { dong, sector, predicted_revenue, reasons } = data;

  const displayRevenue = predicted_revenue 
    ? Math.floor(predicted_revenue).toLocaleString() 
    : "계산 중...";

  console.log("얼마? ", data);

  return (
    <div className="analysis-card" style={styles.card}>
      <h2 style={styles.title}>{dong} {sector} 분석 결과</h2>
      
      <div style={styles.revenueSection}>
        <span style={styles.label}>예상 점포당 월 매출</span>
        <strong style={styles.revenue}>
          {displayRevenue}원
        </strong>
      </div>

      <hr style={styles.divider} />

      <div style={styles.reasonSection}>
        <h3 style={styles.subTitle}>{dong}의 특징</h3>
        <ul style={styles.list}>
          {reasons.map((reason, index) => (
            <li key={index} style={reason.includes('⚠️') ? styles.warningItem : styles.listItem}>
              {reason}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// 스타일링
const styles = {
  card: { border: '1px solid #ddd', borderRadius: '12px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '500px' },
  title: { fontSize: '1.2rem', marginBottom: '15px', color: '#333' },
  revenueSection: { display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '20px' },
  label: { fontSize: '0.9rem', color: '#666' },
  revenue: { fontSize: '1.8rem', color: '#007bff', fontWeight: 'bold' },
  divider: { border: '0', borderTop: '1px solid #eee', margin: '15px 0' },
  subTitle: { fontSize: '1rem', marginBottom: '10px' },
  list: { paddingLeft: '20px', lineHeight: '1.6' },
  listItem: { color: '#444', marginBottom: '8px' },
  warningItem: { color: '#d9534f', fontWeight: '500', marginBottom: '8px' }
};

export default AnalysisResult;