import { Outlet, NavLink } from 'react-router-dom';
import './styles/App.scss';
import logo from './homebase-logo.png';

function App() {
  return (
    <section className="main">
      <header>
        <nav className="navbar">
          <img src={logo} alt="home-logo" />

          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `p-2 rounded-0 ${isActive ? 'active' : ''}`} to="teams">
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `p-2 rounded-0 ${isActive ? 'active' : ''}`} to="leaderboards">
                Leaderboards
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <section className="content">
        <Outlet />
      </section>
    </section>
  );
}

export default App;
