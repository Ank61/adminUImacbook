import Main from './Components/Pages/mainPage/mainPage';
import './App.css';
import User from './Components/Pages/User/user';
import DailyTask from './Components/Pages/DailyTask/DailyTask';
import { NavLink, Route, Routes } from "react-router-dom";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div >
      <Router>
        <Routes>

          <Route path="/" element={<Main />}></Route>

          <Route path='/user' element={<User />}></Route>

          <Route path="/dailyTask" element={<DailyTask />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
