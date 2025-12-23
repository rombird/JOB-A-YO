import React, {useState} from 'react';

const AnalysisSearch = ({ onSearch, loading }) => {
    const [dong, setDong] = useState("");
    const [sector, setSector] = useState("한식음식점"); // 초기값 설정

    // 업종 리스트
    const sectors = [
        '한식음식점', '중식음식점', '일식음식점', '양식음식점', '제과점', '패스트푸드점',
        '치킨전문점', '분식전문점', '호프-간이주점', '커피-음료'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!dong.trim()) {
            alert("지역명(행정동)을 입력해주세요");
            return;
        }
        onSearch(dong, sector);
    };

    return (
        <>
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* 동 입력 */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>지역명</label>
                        <input
                            type='text'
                            placeholder='예: 역삼1동'
                            value={dong}
                            onChange={(e) => setDong(e.target.value)}
                            style={styles.input}   
                        />
                    </div>
                    {/* 업종 입력 */}
                    <div style={styles.inputGroup}>
                        <label>업종 선택</label>
                        <select
                            value={sector}
                            onChange={(e) => setSector(e.target.value)}
                            style={styles.select}
                        >
                            {sectors.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                        
                    <button type='submit' disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
                        {loading ? 'AI 분석 중...' : '매출 예측하기'}
                    </button>
                
            </form>
        </>
    );
};

const styles = {
  form: { display: 'flex', justifyContent:'center' ,flexWrap: 'wrap', gap: '15px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px', marginBottom: '20px', alignItems: 'flex-end' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' },
  label: { fontSize: '0.85rem', fontWeight: 'bold', color: '#555' },
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minWidth: '200px' },
  select: { padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#fff', minWidth: '150px' },
  button: { padding: '10px 20px', backgroundColor: '#65A3FF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', height: '41px', marginLeft: '120px' },
  buttonDisabled: { padding: '10px 20px', backgroundColor: '#ccc', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'not-allowed', height: '41px', marginLeft: '120px' }
};

export default AnalysisSearch;