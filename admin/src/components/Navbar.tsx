import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  async function logout() {
    const res = await fetch(`http://localhost:3030/logout`);
    const data = await res.json();

    if (data.status === "success") {
      localStorage.setItem("doctorId", "");
      navigate(0);
    }
  }
  return (
    <nav>
      <span className="logo">Healthcare</span>

      <div>
          <p>Logged in as Doctor</p>
          <button onClick={logout}>Logout</button>
      </div>
    </nav>
  )
}
