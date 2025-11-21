import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import Home from "./components/Home";
import Login from "./components/user/Login";
import Redirect from "./components/user/Redirect";
import Logout from "./components/user/Logout";
import MyPage from "./components/user/MyPage";
import Join from "./components/user/Join";
import WriteBoard from './components/board/WriteBoard';
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <div>
            <Header /> 
            {/* <Home /> */}
            <div>
                {/* <Link to="/">MAIN</Link> <br/>
                <Link to="/user">USER</Link> <br/>
                <Link to="/join">JOIN</Link> <br/>
                <Link to="/login">LOGIN</Link> <br/> */}
              </div>
            <main className="">
              <Routes> 
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/oauth" element={<Redirect />} /> */}
                <Route path="/logout" element={<Logout />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/join" element={<Join />} />
                <Route path="/board/WriteBoard" element={<WriteBoard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
