import "./App.css";
import LoanForm from "../src/Components/LoanForm";
import LoanStatus from "../src/Components/LoanStatus";
import AdminDashboard from "../src/Components/AdminDashboard";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from "./Components/Homepage";
import LoginPage from "./Components/LoginPage"
import SignUp from "./Components/SignUp";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/loan" element={<LoanForm/>}/>
        <Route path="/status/:userId" element={<LoanStatus/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
