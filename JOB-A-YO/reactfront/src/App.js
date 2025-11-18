import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from "./components/user/Login";


function App() {
  return (
    <div className="App">

      <Router>
        <div>
          <Link to="/user/login">Login 화면</Link> <br />
        </div>
        <Routes>
          {/* Route 설정 */}
          <Route path="/user/login" element={<Login />} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
