import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './styles/custom.scss';
import App from './App';
import Teams from './routes/Teams';
import Leaderboards from './routes/Leaderboards';
import MoreLeaders from './routes/MoreLeaders';
import reportWebVitals from './reportWebVitals';
import { leaderTypesLoader, leaderboardLoader, teamsLoader, teamInfoLoader, playerInfoLoader } from './loaders';
import TeamInfo from './routes/TeamInfo';
import PlayerInfo from './routes/PlayerInfo';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    handle: {
      crumb: () => <Link to="/">Home</Link>,
    },
    children: [
      {
        path: 'teams',
        element: <Teams />,
        loader: teamsLoader,
        handle: {
          crumb: () => 'Teams',
        },
      },
      {
        path: 'leaderboards',
        element: <Leaderboards />,
        loader: leaderboardLoader,
        handle: {
          crumb: () => 'Leaderboards',
        },
      },
      {
        path: 'leaderboards/more',
        element: <MoreLeaders />,
        loader: leaderTypesLoader,
        handle: {
          crumb: () => (
            <>
              <span>
                <Link to="/leaderboards">Leaderboards</Link>
              </span>
              <span> / </span>
              <span>More</span>
            </>
          ),
        },
      },
      {
        path: 'teams/:teamId',
        element: <TeamInfo />,
        loader: teamInfoLoader,
        handle: {
          crumb: ({ teamInfo }) => (
            <>
              <span>
                <Link to="/teams">Teams</Link>
              </span>
              <span> / </span>
              <span>{teamInfo.name}</span>
            </>
          ),
        },
      },
      {
        path: 'teams/:teamId/player/:playerId',
        element: <PlayerInfo />,
        loader: playerInfoLoader,
        handle: {
          crumb: ({ playerInfo, teamInfo }) => (
            <>
              <span>
                <Link to="/teams">Teams</Link>
              </span>
              <span> / </span>
              <span>
                <Link to={`/teams/${teamInfo.id}`}>{teamInfo.name}</Link>
              </span>
              <span> / </span>
              <span>{playerInfo.fullName}</span>
            </>
          ),
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
