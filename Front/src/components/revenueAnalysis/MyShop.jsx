import React, {useState} from "react";
import api from "../../api/axiosConfig";
import AnalysisSearch from "./AnalysisSearch";
import AnalysisResult from "./AnalysisResult";

const MyShop = () => {
    
    // 데이터 분석 모델에 쓸 상태들
    const[result, setResult] = useState(null);
    const[loading, setLoading] = useState(false);

    const handlePredict = async (dong, sector) => {
        setLoading(true);
        try{
            // 스프링부트 엔드포인트로 요청
            const [revenueRes, successRes] = await Promise.all([
                api.get('/api/analysis/predict', {params: {dong, sector}}),
                api.get('/api/analysis/success-rate', {params: {dong, sector}})
            ])


            // const response = await api.get('/api/analysis/predict', {
            //     params: {dong, sector}
            // });

            console.log("매출 데이터: ", revenueRes.data);
            console.log("성공 확률 데이터: ", successRes.data);

            // 두 데이터를 합쳐서 상태 저장
            setResult({
                revenueData: revenueRes.data,
                successData: successRes.data
            })


            // console.log("뭘 들고오냐?: ", response);
            // setResult(response.data);
        }catch(error){
            alert("데이터를 가져오는 중 오류가 발생했습니다(동네 이름을 확인해주세요)");
        }finally{
            setLoading(false);
        }
    };
    

    return(
        <>
            <div style={{ padding: '20px' }}>
                    <h1>우리 동네 업종별 예상 매출을 AI로 분석해보세요.</h1>
                    <AnalysisSearch onSearch={handlePredict} loading={loading} />
                    <AnalysisResult data={result} />
            </div>
        </>
    );
};

export default MyShop;