import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './custom.scss';
import App from './App';
import Teams from './routes/Teams';
import Leaderboards from './routes/Leaderboards';
import reportWebVitals from './reportWebVitals';
import { teamsLoader } from './loaders';

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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
