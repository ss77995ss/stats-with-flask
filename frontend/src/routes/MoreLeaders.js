import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from 'react-query';
import Leaders from '../components/Leaders';

export default function MoreLeaders() {
  const [selectedType, setSelectedType] = useState('');
  const { leaderTypes } = useLoaderData();

  const handleSelect = (e) => setSelectedType(e.target.value);

  return (
    <div>
      <h3>Leaderboards</h3>
      <div className="text-center">
        <h5>Select Stat: {selectedType}</h5>
        <select onChange={handleSelect}>
          <option value=""></option>
          {leaderTypes.map((leader, index) => (
            <option key={`select-leader-type-${index}`} value={leader}>
              {leader}
            </option>
          ))}
        </select>
      </div>
      <SelectedLeaders type={selectedType} />
    </div>
  );
}

function SelectedLeaders({ type }) {
  const {
    isLoading,
    error,
    data: leaders,
  } = useQuery(['selectedLeaders', type], async () => fetch(`/api/leaderboard/all/${type}`).then((res) => res.json()), {
    // The query will not execute until the userId exists
    enabled: !!type,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!leaders) return <div></div>;

  return <Leaders leaders={leaders} />;
}
