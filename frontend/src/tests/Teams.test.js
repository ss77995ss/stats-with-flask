import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Teams from '../routes/Teams';

const queryClient = new QueryClient();

jest.mock('react-router-dom', () => ({
  useLoaderData: () => {
    return {
      standings: {
        'AL East': [],
        'AL Central': [],
        'AL West': [],
        'NL East': [],
        'NL Central': [],
        'NL West': [],
      },
    };
  },
}));

test('renders Standing page', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Teams />
    </QueryClientProvider>,
  );

  await screen.findByRole('heading');
  expect(screen.getByRole('heading')).toHaveTextContent('Teams');
});
