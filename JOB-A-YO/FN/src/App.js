import logo from "./logo.svg";
import "./App.css";
import "./join.css";


import MemoPost from "./components/User/join";


import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Link to="/param">PARAM TEST</Link> <br/>
        <Link to="/memo/post">MEMO POST</Link> <br/>
        <Link to="/memo/list">MEMO LIST(EXCEPTION TEST)</Link> <br/><br/>
      </div>
      <Routes>
        {/* Route 설정 */}
        <Route path="/user/join" element={<Join />} />
        <Route path="/memo/list" element={<MemoList />} />
        <Route path="/exception" element={<Exception />} />
      </Routes>
    </Router>
  );
}

export default App;
