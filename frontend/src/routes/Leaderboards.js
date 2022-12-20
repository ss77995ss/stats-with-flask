import { Link, useLoaderData } from 'react-router-dom';
import Leaders from '../components/Leaders';

export default function Leaderboards() {
  const leaders = useLoaderData();

  return (
    <div>
      <h3>League Leaders</h3>
      <Link to="more">More!</Link>
      <Leaders leaders={leaders} />
    </div>
  );
}
