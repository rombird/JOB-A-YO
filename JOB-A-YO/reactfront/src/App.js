import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from "./components/user/Login";
import WriteBoard from './components/board/WriteBoard.jsx';
import Paging from './components/board/Paging.jsx';
import BoardDetail from './components/board/BoardDetail.jsx';

function App() {
  return (
    <div className="App">

      <Router>
        <div>
          <Link to="/user/login">Login 화면</Link> <br />
          <Link to="/board/WriteBoard">글쓰기 화면</Link> <br />
          <Link to="/board/Paging">게시판</Link> <br />
          
        </div>
        <Routes>
          {/* Route 설정 */}
          <Route path="/user/login" element={<Login />} />
          <Route path="/board/WriteBoard" element={<WriteBoard />} />
          <Route path="/board/Paging" element={<Paging />} />
          <Route path="/board/Boarddetail/:id" element={<BoardDetail />} />
          
        </Routes>
      </Router>

    </div>
  );
}

export default App;
