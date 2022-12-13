import { Link, useLoaderData } from 'react-router-dom';

const STAT_LABEL_MAP = {
  AVG: 'BATTING AVERAGE',
  HR: 'HOME RUNS',
  RBI: 'RUNS BATTED IN',
  HIT: 'HITS',
  SB: 'STOLEN BASES',
  WIN: 'WINS',
  ERA: 'EARNED RUN AVERAGE',
  SV: 'SAVES',
  SO: 'STRIKE OUTS',
  HOLD: 'HOLDS',
};

function LeadersTable({ statName, leaders }) {
  return (
    <div>
      <label style={{ fontWeight: 'bold' }} className="my-2">
        {STAT_LABEL_MAP[statName]}
      </label>
      <table className="stats-table">
        <thead>
          <tr className="bg-secondary text-center">
            <th>#</th>
            <th>Player</th>
            <th>{statName}</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leader) => (
            <tr className="text-center">
              <td>{leader.rank}</td>
              <td>
                <Link to={`/teams/${leader.team.id}/player/${leader.person.id}`}>
                  <img
                    src={`https://content.mlb.com/images/headshots/current/60x60/${leader.person.id}.png`}
                    srcSet={`https://content.mlb.com/images/headshots/current/60x60/${leader.person.id}@2x.png 2x, https://content.mlb.com/images/headshots/current/60x60/${leader.person.id}@4x.png 4x`}
                    alt={`${leader.person.fullName}-headshot`}
                  />
                  {leader.person.fullName}
                </Link>
              </td>
              <td>{leader.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Leaderboards() {
  const { hitting, pitching } = useLoaderData();
  return (
    <div>
      <h3>League Leaders</h3>
      <div className="row">
        <div className="col">
          <h5>Hitting</h5>
          <div>
            {Object.keys(hitting).map((key) => (
              <LeadersTable statName={key.toUpperCase()} leaders={hitting[key]} />
            ))}
          </div>
        </div>
        <div className="col">
          <h5>Pitching</h5>
          <div>
            {Object.keys(pitching).map((key) => (
              <LeadersTable statName={key.toUpperCase()} leaders={pitching[key]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
