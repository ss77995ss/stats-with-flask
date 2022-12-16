import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import TeamInfo from '../routes/TeamInfo';

const queryClient = new QueryClient();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => {
    return {
      teamInfo: {
        division: 'AL East',
        divisionGamesBack: '7.0',
        divisionRank: '2',
        id: 141,
        losses: 70,
        name: 'Toronto Blue Jays',
        news: [],
        rosters: [],
      },
    };
  },
}));

test('renders TeamInfo page', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/teams/141']}>
        <Routes>
          <Route path="teams/:teamId" element={<TeamInfo />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );

  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(4);

  const hitterBtn = await screen.findByText(/Hitters/i);
  const pitcherBtn = await screen.findByText(/Pitchers/i);

  expect(hitterBtn).toBeInTheDocument();
  expect(pitcherBtn).toBeInTheDocument();

  const headers = await screen.findAllByRole('columnheader');
  expect(headers).toHaveLength(17);
});

test('switch between different player type', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/teams/141']}>
        <Routes>
          <Route path="teams/:teamId" element={<TeamInfo />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );

  await userEvent.click(screen.getByText('Pitchers'));

  const pitcherHeaders = await screen.findAllByRole('columnheader');
  expect(pitcherHeaders).toHaveLength(13);

  await userEvent.click(screen.getByText('Hitters'));
  const hitterHeaders = await screen.findAllByRole('columnheader');
  expect(hitterHeaders).toHaveLength(17);
});
