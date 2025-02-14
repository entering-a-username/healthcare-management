import { Route, Routes } from "react-router-dom";

import Navbar from './components/Navbar';

import Login from './pages/Login';
import Table from './pages/Table';
import View from './pages/View';

export default function App() {
  const doctorId = localStorage.getItem("doctorId");

  return doctorId ? (
    <div className='div'>
      <Navbar />

      <div>
        <Routes>
          <Route path="/" element={<View />} />
          <Route path="/list/:type" element={<Table />} />
          <Route path="/:type/:id" element={<View />} />
        </Routes>

      </div>


    </div>
  ) : (
    <div className='login-div'>
      <Login />
    </div>
  )
}
