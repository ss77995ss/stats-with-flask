import { Outlet, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <header>
        <h3>HOMEBASE</h3>
        <nav>
          <ul>
            <li>
              <Link to="teams">Teams</Link>
            </li>
            <li>
              <Link to="leaderboards">Leaderboards</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
