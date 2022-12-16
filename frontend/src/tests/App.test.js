import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('renders Home page', () => {
  render(<App />, { wrapper: BrowserRouter });

  const teamsNav = screen.getByText(/Teams/i);
  const leaderboardNav = screen.getByText(/Leaderboards/i);

  expect(teamsNav).toBeInTheDocument();
  expect(leaderboardNav).toBeInTheDocument();
});
