import { useState } from 'react';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import { Table, TableHeader, TableBody } from '../components/StatsTable';
import '../styles/components/Info.scss';

const RANK_MAP = {
  1: '1st',
  2: '2nd',
  3: '3rd',
  4: '4th',
  5: '5th',
};

export default function TeamInfo() {
  const { teamInfo } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [playerType, setPlayerType] = useState('Hitters');

  const handleToggle = (e) => {
    setPlayerType(e.target.value);
    setSearchParams({ type: e.target.value });
  };

  return (
    <div>
      <div className="info">
        <div className="info-content">
          <div className="info-content-team-img mr-2">
            <img src={`https://www.mlbstatic.com/team-logos/${teamInfo.id}.svg`} alt="team-info-img" />
          </div>
          <div className="info-content-detail">
            <h3>{teamInfo.name}</h3>
            <span className="info-content-detail-rank text-secondary">{`${RANK_MAP[teamInfo.divisionRank]} in ${
              teamInfo.division
            }`}</span>
            <span className="info-content-detail-record m-2">{`${teamInfo.wins} - ${teamInfo.losses} (${teamInfo.winningPercentage}) • ${teamInfo.divisionGamesBack} GB`}</span>
          </div>
        </div>
        <div className="info-toggle-buttons">
          <button
            value="Hitters"
            className={`${searchParams.get('type') !== 'Pitchers' && 'active'}`}
            onClick={handleToggle}
          >
            Hitters
          </button>
          <button
            value="Pitchers"
            className={`${searchParams.get('type') === 'Pitchers' && 'active'}`}
            onClick={handleToggle}
          >
            Pitchers
          </button>
        </div>
      </div>
      {searchParams.get('type') !== 'Pitchers' ? (
        <Hitters
          teamId={teamInfo.id}
          hitters={teamInfo.rosters.filter((roster) => roster.position !== 'P' && roster.position !== 'TWP')}
        />
      ) : (
        <Pitchers
          teamId={teamInfo.id}
          pitchers={teamInfo.rosters.filter((roster) => roster.position === 'P' || roster.position === 'TWP')}
        />
      )}
    </div>
  );
}

function Hitters({ teamId, hitters }) {
  return (
    <Table>
      <TableHeader>
        <th>Pos</th>
        <th>#</th>
        <th className="lg-cell">Player</th>
        <th>Age</th>
        <th>B</th>
        <th>T</th>
        <th>PA</th>
        <th>H</th>
        <th>2B</th>
        <th>3B</th>
        <th>HR</th>
        <th>SB</th>
        <th>SO%</th>
        <th>BB%</th>
        <th>AVG</th>
        <th>OBP</th>
        <th>OPS</th>
      </TableHeader>
      <TableBody>
        {hitters.map((stat) => (
          <tr className="text-center" key={`standing-stats-${stat.id}`}>
            <td>{stat.position}</td>
            <td>{stat.jerseyNumber}</td>
            <td className="lg-cell">
              <Link to={`/teams/${teamId}/player/${stat.id}`}>
                <img
                  src={`https://content.mlb.com/images/headshots/current/60x60/${stat.id}.png`}
                  srcSet={`https://content.mlb.com/images/headshots/current/60x60/${stat.id}@2x.png 2x, https://content.mlb.com/images/headshots/current/60x60/${stat.id}@4x.png 4x`}
                  alt={`${stat.fullName}-headshot`}
                />
                {stat.fullName}
              </Link>
            </td>
            <td>{stat.age}</td>
            <td>{stat.batSide}</td>
            <td>{stat.pitchHand}</td>
            <td>{stat.stat.plateAppearances}</td>
            <td>{stat.stat.hits}</td>
            <td>{stat.stat.doubles}</td>
            <td>{stat.stat.triples}</td>
            <td>{stat.stat.homeRuns}</td>
            <td>{stat.stat.stolenBases}</td>
            <td>
              {stat.stat.plateAppearances > 0
                ? (stat.stat.strikeOuts / stat.stat.plateAppearances).toFixed(3).replace(/^0+/, '')
                : '.000'}
            </td>
            <td>
              {stat.stat.plateAppearances > 0
                ? (stat.stat.baseOnBalls / stat.stat.plateAppearances).toFixed(3).replace(/^0+/, '')
                : '.000'}
            </td>
            <td>{stat.stat.avg}</td>
            <td>{stat.stat.obp}</td>
            <td>{stat.stat.ops}</td>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
}

function Pitchers({ teamId, pitchers }) {
  return (
    <Table>
      <TableHeader>
        <th>Pos</th>
        <th>#</th>
        <th className="lg-cell">Player</th>
        <th>Age</th>
        <th>T</th>
        <th>IP</th>
        <th>ERA</th>
        <th>SO</th>
        <th>BB</th>
        <th>SO%</th>
        <th>BB%</th>
        <th>HR/9</th>
        <th>OPS</th>
      </TableHeader>
      <TableBody>
        {pitchers.map((stat) => (
          <tr key={`standing-stats-${stat.id}`} className="text-center">
            <td>{stat.position}</td>
            <td>{stat.jerseyNumber}</td>
            <td className="lg-cell">
              <Link to={`/teams/${teamId}/player/${stat.id}`}>
                <img
                  src={`https://content.mlb.com/images/headshots/current/60x60/${stat.id}.png`}
                  alt={`${stat.fullName}-logo`}
                />
                {stat.fullName}
              </Link>
            </td>
            <td>{stat.age}</td>
            <td>{stat.pitchHand}</td>
            <td>{stat.stat.inningsPitched}</td>
            <td>{stat.stat.era}</td>
            <td>{stat.stat.strikeOuts}</td>
            <td>{stat.stat.baseOnBalls}</td>
            <td>
              {stat.stat.battersFaced > 0
                ? (stat.stat.strikeOuts / stat.stat.battersFaced).toFixed(3).replace(/^0+/, '')
                : '.000'}
            </td>
            <td>
              {stat.stat.battersFaced > 0
                ? (stat.stat.baseOnBalls / stat.stat.battersFaced).toFixed(3).replace(/^0+/, '')
                : '.000'}
            </td>
            <td>{stat.stat.homeRunsPer9}</td>
            <td>{stat.stat.ops}</td>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
}
