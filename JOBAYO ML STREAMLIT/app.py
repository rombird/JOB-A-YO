import streamlit as st
import joblib
import pandas as pd

# 1. 저장된 자산 로드
model = joblib.load('xgb_model.pkl')
scaler = joblib.load('scaler.pkl')
df = pd.read_csv('merged_final_data.csv') # 상권 데이터 원본

st.title("🏘️ 창업 성공 확률 예측 서비스")

# 2. 사용자 입력 (드롭다운)
target_dong = st.selectbox("행정동을 선택하세요", df['행정동_코드_명'].unique())
target_biz = st.selectbox("업종을 선택하세요", df['서비스_업종_코드_명'].unique())

if st.button("성공 확률 확인하기"):
    # 3. 선택한 동네+업종의 데이터 추출
    input_data = df[(df['행정동_코드_명'] == target_dong) & (df['서비스_업종_코드_명'] == target_biz)]
    
    if not input_data.empty:
        # 학습에 사용했던 독립변수(X) 컬럼만 추출 (순서 중요!)
        features = ['점포_수', '유사_업종_점포_수', '개업_율', '당월_매출_금액', '총_유동인구_수', 
                    '총_상주인구_수', '총_가구_수', '월_평균_소득_금액', '지출_총금액', '음식_지출_총금액']
        
        X_input = input_data[features]
        
        # 4. 스케일링 및 예측
        X_scaled = scaler.transform(X_input)
        prob = model.predict_proba(X_scaled)[0][1]
        
        # 5. 결과 출력
        st.metric(label="예측 성공 확률", value=f"{prob*100:.2f}%")
        if prob >= 0.5:
            st.success("✅ 성공 가능성이 높은 상권입니다!")
        else:
            st.warning("⚠️ 창업에 신중한 접근이 필요합니다.")
    else:
        st.error("해당 조합의 데이터가 존재하지 않습니다.")