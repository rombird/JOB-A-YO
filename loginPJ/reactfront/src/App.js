import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Main from "./components/Main";
import Login from "./components/user/Login";
import Join from "./components/user/Join";
import WriteBoard from './components/board/WriteBoard';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <h1> 메인페이지 입니다. </h1>
          <Link to="/">MAIN</Link> <br/>
          <Link to="/user/join">JOIN</Link> <br/>
        </div>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/join" element={<Join />} />
          <Route path="/board/WriteBoard" element={<WriteBoard />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
