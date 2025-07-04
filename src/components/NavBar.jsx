import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';          // keep any of your own styles

function NavBar() {
  const navigate = useNavigate();

  /* theme (light | dark) — defaults to light */
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  /* apply + persist theme */
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  /* flip theme (navbar stays dark) */
  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  /* logout */
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          TaskManager
        </Link>

        {/* toggle + logout */}
        <div className="ms-auto d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-light btn-sm"
            onClick={toggleTheme}
            title="Toggle light/dark"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button
            className="btn btn-outline-light btn-sm"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
