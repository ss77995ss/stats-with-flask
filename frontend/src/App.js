import { Outlet, Link, NavLink } from 'react-router-dom';
import './styles/App.scss';
import logo from './homebase-logo.png';

function App() {
  return (
    <section className="main">
      <header>
        <nav className="navbar">
          <Link to="/">
            <img src={logo} alt="home-logo" />
          </Link>

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
      <section className="footer text-center">
        <footer className="p-2">
          <div>Author: Li-Hsuan Hsieh</div>
          <div>
            <a className="m-2" href="mailto:ss77995ss@gmail.com">
              <i className="bi bi-envelope"></i>
            </a>
            <a
              className="m-2"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/li-hsuan-hsieh-4b4390169/"
            >
              <i className="bi bi-linkedin"></i>
            </a>
            <a className="m-2" target="_blank" rel="noopener noreferrer" href="https://github.com/ss77995ss">
              <i className="bi bi-github"></i>
            </a>
          </div>
        </footer>
      </section>
    </section>
  );
}

export default App;
