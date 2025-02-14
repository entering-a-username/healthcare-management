import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import Account from './pages/Account';
import Contact from './pages/Contact';
import Appointments from './pages/Appointments';
import Signup from './pages/Signup';
import Doctor from './pages/Doctor';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import "./styles/main.scss";

function App() {

  return (
    <>
    <div className='root'>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<Doctor />} />
        <Route path="/doctors/:speciality" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile/:id" element={<Account />} />
        <Route path="/appointments/:id" element={<Appointments />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />

    </div>
      
    </>
  )
}

export default App;
