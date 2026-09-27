import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div>
        <h1>Welcome back, Oceansync 🌊</h1>
        <p>Real-time polar ocean monitoring system</p>
      </div>

      <div 
        className="profile"
        onClick={() => navigate("/settings")}>
        <div className="profile-avatar">O</div>

        <div className="profile-info">
          <strong>Oceansync</strong>
          <span>Monitoring Team</span>
        </div>

        <span className="profile-arrow">⌄</span>
      </div>
    </header>
  );
}

export default Header;