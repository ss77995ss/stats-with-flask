import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './custom.scss';
import App from './App';
import Teams from './routes/Teams';
import Leaderboards from './routes/Leaderboards';
import reportWebVitals from './reportWebVitals';
import { teamsLoader, teamInfoLoader } from './loaders';
import TeamInfo from './routes/TeamInfo';

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
      },
      {
        path: 'teams/:teamId',
        element: <TeamInfo />,
        loader: teamInfoLoader,
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
