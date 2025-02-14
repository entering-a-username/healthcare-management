import { NavLink, useNavigate } from 'react-router-dom';

import { RiUserLine } from "@remixicon/react";

export default function Navbar() {
    const navigate = useNavigate();

    const user = localStorage.getItem("userId");

    async function logout() {
        const res = await fetch(`http://localhost:3030/logout`);
        const data = await res.json();

        if (data.status === "success") {
            localStorage.setItem("userId", "");
            navigate('/');
        }
    }

  return (
    <nav>
        <span onClick={() => navigate('/')} className='logo'>Healthcare</span>

        <ul>
            <NavLink to="/">
                <li>HOME</li>
            </NavLink>
            <NavLink to="/doctors">
                <li>OUR DOCTORS</li>
            </NavLink>
            <NavLink to="/about">
                <li>ABOUT</li>
            </NavLink>
            <NavLink to="/contact">
                <li>CONTACT</li>
            </NavLink>
        </ul>

        <div className="buttons">
            {
                user ? (
                    <div>
                        <RiUserLine className='user' />

                        <div className="dropdown">
                            <ul>
                                <NavLink to={`/profile/${localStorage.getItem("userId")}`}><li>My Profile</li></NavLink>
                                <NavLink to={`/appointments/${localStorage.getItem("userId")}`}><li>Appointments</li></NavLink>
                                <NavLink to="/logout" onClick={logout}><li>Logout</li></NavLink>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => navigate('/signup')}>Create Account</button>
                )
            }
            
        </div>
    </nav>
  )
}
