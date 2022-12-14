import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './styles/custom.scss';
import App from './App';
import Teams from './routes/Teams';
import Leaderboards from './routes/Leaderboards';
import reportWebVitals from './reportWebVitals';
import { leaderboardLoader, teamsLoader, teamInfoLoader, playerInfoLoader } from './loaders';
import TeamInfo from './routes/TeamInfo';
import PlayerInfo from './routes/PlayerInfo';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'teams',
        element: <Teams />,
        loader: teamsLoader,
      },
      {
        path: 'leaderboards',
        element: <Leaderboards />,
        loader: leaderboardLoader,
      },
      {
        path: 'teams/:teamId',
        element: <TeamInfo />,
        loader: teamInfoLoader,
      },
      {
        path: 'teams/:teamId/player/:playerId',
        element: <PlayerInfo />,
        loader: playerInfoLoader,
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
