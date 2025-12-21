from fastapi import FastAPI, HTTPException
import joblib
import pandas as pd
import numpy as np

app = FastAPI()

# 시작할 때 모델과 데이터 로드
# 매출 예측 관련
try:
    model = joblib.load('revenue_model.pkl')    # 평균 구하는 모델
    model_cols = joblib.load('model_columns.pkl')   # 원-핫 인코딩 할 때 컬럼 순서
    dong_df = pd.read_pickle('dong_data.pkl')
    # 미리 평균값을 구해서 메모리에 올려둠
    global_avg = dong_df.mean(numeric_only=True) 
    print("모델 및 평균 데이터 로드 완료")
except Exception as e:
    print(f"로드 실패: {e}")


@app.get("/predict")
def predict_revenue(dong_name: str, sector_name: str):
    # 동네 데이터 찾기
    dong_data = dong_df[dong_df['행정동_코드_명'] == dong_name].sort_values(by = '기준_년분기_코드', ascending = False)

    if dong_data.empty:
        raise HTTPException(status_code = 404, detail = f"'{dong_name}'데이터를 찾을 수 없습니다.")
    
    sample_row = dong_data.iloc[0]

    # 입력 데이터프레임 생성(학습 때와 컬럼순서를 동일하게)
    input_df = pd.DataFrame(0, index = [0], columns=model_cols)

    # 상권 지표 채우기
    feature_avg = ['월_평균_소득_금액', '총_직장_인구_수', '총_상주인구_수', '총_유동인구_수', '집객시설_수', '폐업_률']
    for col in feature_avg:
        if col in sample_row:
            input_df[col] = sample_row[col]

    # 업종 설정
    sector_col = f'서비스_업종_코드_명_{sector_name}'
    if sector_col in model_cols:
        input_df[sector_col] = 1
    else:
        raise HTTPException(status_code = 400, detail=f"'{sector_name}' 업종 코드가 존재하지 않습니다")
    
    # 예측(로그 변환 했던 거 복원)
    pred_log = model.predict(input_df)
    predicted_sales = np.expm1(pred_log)[0]


    # 원인 분석 로직 (기존 코드를 리스트 담기로 변경)
    analysis_reasons = []
    # 직장인구 분석(1.5배 이상)
    if sample_row['총_직장_인구_수'] > global_avg['총_직장_인구_수'] * 1.5:
        analysis_reasons.append("직장인구가 서울시 평균보다 많아 평일 수요가 강력합니다.")
    
    # 소득 수준 분석(1.2배 이상)
    if sample_row['월_평균_소득_금액'] > global_avg['월_평균_소득_금액'] * 1.2:
        analysis_reasons.append("주변 소득 수준이 평균보다 높아 단가가 높은 메뉴 운영에 유리합니다.")

    # 유동인구 분석
    if sample_row['총_유동인구_수'] > global_avg['총_유동인구_수'] * 1.2:
        analysis_reasons.append("유동인구가 풍부하여 신규 고객 유입 및 홍보 효과가 탁월합니다.")

    # 집객시설 분석
    if sample_row['집객시설_수'] > global_avg['집객시설_수'] * 1.3:
        analysis_reasons.append("역세권이나 주요 공공기관 등 집객 시설이 밀집되어 있어 유입 인구가 많습니다.")

    # 폐업률 분석 (위험하다는 신호)
    if sample_row['폐업_률'] > global_avg['폐업_률'] * 1.1:
        analysis_reasons.append("⚠️ 해당 지역은 폐업률이 평균보다 다소 높아 위험할 수도 있습니다.")

    # 특별한 특징이 없는 경우 처리
    if not analysis_reasons:
        analysis_reasons.append("이 상권은 서울시 평균 수준의 지표를 보이고 있습니다.")

    return{
        "dong": dong_name,
        "sector": sector_name,
        "predicted_revenue": float(predicted_sales),
        "reasons": analysis_reasons
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host = '0.0.0.0', port=8000)