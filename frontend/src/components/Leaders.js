import { Link } from 'react-router-dom';
import { Table, TableHeader, TableBody } from '../components/StatsTable';

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

export default function Leaders({ leaders }) {
  return (
    <div className="row">
      {Object.keys(leaders).map((statGroup) => (
        <div key={`leaders-group-${statGroup}`} className="col">
          <h5>{statGroup.toUpperCase()}</h5>
          <div>
            {Object.keys(leaders[statGroup]).map((key) =>
              leaders[statGroup][key].length > 0 ? (
                <LeadersTable
                  key={`leaders-${statGroup}-${key}`}
                  statName={key.toUpperCase()}
                  leaders={leaders[statGroup][key]}
                />
              ) : (
                <div key={`leaders-${statGroup}-${key}`}>{`No ${statGroup} Data`}</div>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function LeadersTable({ statName, leaders }) {
  return (
    <div>
      {STAT_LABEL_MAP[statName] && (
        <label style={{ fontWeight: 'bold' }} className="my-2">
          {STAT_LABEL_MAP[statName]}
        </label>
      )}
      <Table>
        <TableHeader>
          <th>#</th>
          <th className="lg-cell">Player</th>
          <th>{statName}</th>
        </TableHeader>
        <TableBody>
          {leaders.map((leader) => (
            <tr key={`leaders-table-${statName}-${leader.person.id}`}>
              <td>{leader.rank}</td>
              <td className="lg-cell">
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
        </TableBody>
      </Table>
    </div>
  );
}
