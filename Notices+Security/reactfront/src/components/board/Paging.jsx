
import apiClient from "../utils/apiClient";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import "../../css/common.css";




const Login = ()=>{
    const API_BASE_URL = '/api/board/paging';

    function BoardListPaging(){
        const navigate = useNavigate();
        const [searchParams] = useSearchParams();

        // 현재 페이지 번호
    }
    
    return (
        <>
            
            

        
        </>

    )

}

export default Paging;


