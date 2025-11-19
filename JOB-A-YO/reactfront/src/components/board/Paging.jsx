



import axios from "axios";
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import moment from 'moment';
import { useEffect, useState, useCallback } from "react";

import "../../css/common.css";

// 수정: 모든 로직을 Paging 함수 컴포넌트 내부에 정의합니다.
const Paging = () => {
    
    const API_BASE_URL = 'http://localhost:8090/api/board/paging';
    
    //  Hook들은 여기서 선언
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // 현재 페이지 번호
    const page = searchParams.get('page') || '1';
    const pageSize = 11;
    //  클라이언트 측에서 -1을 해서 서버(0부터 시작)로 보냅니다.
    // const pageIndex = parseInt(page, 10) - 1; 

    // State 선언
    const[boardData, setBoardData] = useState({
        content: [],
        number: 0,
        totalPages: 1,
        first: true,
        last: true
    });
    const[loading, setLoading] = useState(true);
    const[startPage, setStartPage] = useState(1);
    const[endPage, setEndPage] = useState(1);

    // 데이터 로딩 함수
    const fetchBoardList = useCallback(async () => {
        setLoading(true);
        try{
            // 요청 시 pageIndex 사용 (0부터 시작)
            const response = await axios.get(`${API_BASE_URL}?page=${page}&size=${pageSize}`);
            const data = response.data;
            
            // 백엔드 JSON 응답 키(boardList)에 맞게 업데이트
            setBoardData(data.boardList);
            setStartPage(data.startPage);
            setEndPage(data.endPage);

        }catch(error){
            console.error("게시글 목록을 불러오는데 실패했습니다.", error);
            // totalPages의 키가 totalPages로 정확해야 합니다. (이전 totalPage 오타 수정)
            setBoardData({content : [], number : 0, totalPages: 1, first: true, last: true }); 
            setStartPage(1);
            setEndPage(1);
        } finally{
            setLoading(false);
        }
    },[page]); // pageIndex가 변경될 때마다 다시 호출

    useEffect(() => {
        fetchBoardList();
    }, [fetchBoardList]); 

    // 현재 페이지 번호 (사용자에게 1부터 보여주는 번호)
    const currentDisplayPage = boardData.number + 1;

    // '글 작성' 버튼 클릭 핸들러
    const saveReq = () => {
        navigate('/board/writeBoard');
    };

    // 로딩 중일 때 표시
    if(loading){
        return <div className="loading-state">Loading...</div>
    }

    // ... (나머지 JSX 코드는 아래에 포함)

    // ############ 게시글 목록 테이블 JSX ###################
    const boardTable = (
        <table className="board-table">
            <thead>
                <tr>
                    <th>게시글.No</th>
                    <th>제목</th>
                    <th>글쓴이</th>
                    <th>날짜</th>
                    <th>조회수</th>
                </tr>
            </thead>
            <tbody>
                {boardData.content.length > 0 ? (
                    boardData.content.map((board) => (
                        <tr key={board.id}>
                            <td>{board.id}</td>
                            <td>
                                <Link to={`/board/${board.id}?page=${currentDisplayPage}`}>
                                    {board.boardTitle}
                                </Link>
                            </td>
                            <td>{board.boardWriter}</td>
                            <td>
                                {moment(board.boardCreateTime).format('YYYY-MM-DD HH:mm:ss')} {/* 💡 moment 포맷 YYYY 수정 */}
                            </td>
                            <td>{board.boardHits}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className="no-data">등록된 게시글이 없습니다</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
    
    // #################### 페이징 링크 및 생성 JSX #########################

    const getPageLink = (pageNum) => `/board/paging?page=${pageNum}`;

    const pageNumbers = Array.from(
        {length: endPage - startPage + 1},
        (_, i) => startPage + i
    );

    const pagingLinks = (
        <div className="paging-container">
            <Link to = {getPageLink(1)}>처음</Link>
            <Link
                to = {boardData.first ? '#' : getPageLink(currentDisplayPage -1)}
                className={boardData.first ? 'disabled-link' : ''}>
                이전
            </Link>

            <span className="page-numbers">
                {pageNumbers.map(pageNum => (
                    <span key={pageNum} className="page-number-item">
                        {pageNum === currentDisplayPage ? (
                            <span className="current-page">{pageNum}</span>
                        ) : (
                            <Link to={getPageLink(pageNum)}>{pageNum}</Link>
                        )}
                    </span>
                ))}
            </span>
            
            <Link
                to={boardData.last ? '#': getPageLink(currentDisplayPage + 1)}
                className={boardData.last ? 'disabled-link': ''}>
                다음
            </Link>
            <Link to={getPageLink(boardData.totalPages)}>마지막</Link>
        </div>
    );

    return (
        <div className="board-list-container">
            <button onClick={saveReq}>글 작성</button>
            {boardTable}
            {pagingLinks}
        </div>
    );
}

export default Paging;

