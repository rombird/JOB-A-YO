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
            const response = await api.get('/api/analysis/predict', {
                params: {dong, sector}
            });

            console.log("뭘 들고오냐?: ", response);
            setResult(response.data);
        }catch(error){
            alert("데이터를 가져오는 중 오류가 발생했습니다");
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