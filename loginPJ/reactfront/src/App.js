import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from "./components/Home";
import Login from "./components/user/Login";
import Join from "./components/user/Join";
import WriteBoard from './components/board/WriteBoard';
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
      <Router>
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
              <Route path="/" element={<Home />}></Route>
              <Route path="/user/login" element={<Login />} />
              <Route path="/user/join" element={<Join />} />
              <Route path="/board/WriteBoard" element={<WriteBoard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
