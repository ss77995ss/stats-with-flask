import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from '../App';

test('renders Home page', () => {
  const routes = [
    {
      path: '/',
      element: <App />,
      handle: {
        crumb: () => {},
      },
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 1,
  });

  render(<RouterProvider router={router} />);

  const teamsNav = screen.getByText(/Teams/i);
  const leaderboardNav = screen.getByText(/Leaderboards/i);

  expect(teamsNav).toBeInTheDocument();
  expect(leaderboardNav).toBeInTheDocument();
});
