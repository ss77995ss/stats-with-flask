import { useMemo } from 'react';
import { Link, useLoaderData, useSearchParams } from 'react-router-dom';
import useSortStat from '../hooks/useSortStat';
import { Table, TableHeader, TableHeaderSortCell, TableBody } from '../components/StatsTable';
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

  const handleToggle = (e) => {
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

const getResolvedStats = (type, stats) =>
  stats.map((item) => {
    if (type === 'Pitchers') {
      return {
        ...item,
        stat: {
          ...item.stat,
          strikeOutsPercent:
            item.stat.battersFaced > 0
              ? (item.stat.strikeOuts / item.stat.battersFaced).toFixed(3).replace(/^0+/, '')
              : '.000',
          basedOnBallPercent:
            item.stat.battersFaced > 0
              ? (item.stat.baseOnBalls / item.stat.battersFaced).toFixed(3).replace(/^0+/, '')
              : '.000',
        },
      };
    }

    return {
      ...item,
      stat: {
        ...item.stat,
        strikeOutsPercent:
          item.stat.plateAppearances > 0
            ? (item.stat.strikeOuts / item.stat.plateAppearances).toFixed(3).replace(/^0+/, '')
            : '.000',
        basedOnBallPercent:
          item.stat.plateAppearances > 0
            ? (item.stat.baseOnBalls / item.stat.plateAppearances).toFixed(3).replace(/^0+/, '')
            : '.000',
      },
    };
  });

function Hitters({ teamId, hitters }) {
  const [sorted, handleOnSelectStat] = useSortStat();
  const resolvedHitters = useMemo(() => getResolvedStats('Hitters', hitters), [hitters]);

  return (
    <Table>
      <TableHeader>
        <th>Pos</th>
        <th>#</th>
        <th className="lg-cell">Player</th>
        <th>Age</th>
        <th>B</th>
        <th>T</th>
        <TableHeaderSortCell onClick={handleOnSelectStat('plateAppearances')}>PA</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('hits')}>H</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('doubles')}>2B</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('triples')}>3B</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('homeRuns')}>HR</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('stolenBases')}>SB</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('strikeOutsPercent')}>SO%</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('basedOnBallPercent')}>BB%</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('avg')}>AVG</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('obp')}>OBP</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('ops')}>OPS</TableHeaderSortCell>
      </TableHeader>
      <TableBody>
        {sorted(resolvedHitters).map((stat) => (
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
            <td>{stat.stat.strikeOutsPercent}</td>
            <td>{stat.stat.basedOnBallPercent}</td>
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
  const [sorted, handleOnSelectStat] = useSortStat();
  const resolvedPitchers = useMemo(() => getResolvedStats('Pitchers', pitchers), [pitchers]);

  return (
    <Table>
      <TableHeader>
        <th>Pos</th>
        <th>#</th>
        <th className="lg-cell">Player</th>
        <th>Age</th>
        <th>T</th>
        <TableHeaderSortCell onClick={handleOnSelectStat('inningsPitched')}>IP</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('era')}>ERA</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('strikeOuts')}>SO</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('baseOnBalls')}>BB</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('strikeOutsPercent')}>SO%</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('basedOnBallPercent')}>BB%</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('homeRunsPer9')}>HR/9</TableHeaderSortCell>
        <TableHeaderSortCell onClick={handleOnSelectStat('ops')}>OPS</TableHeaderSortCell>
      </TableHeader>
      <TableBody>
        {sorted(resolvedPitchers).map((stat) => (
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
            <td>{stat.stat.strikeOutsPercent}</td>
            <td>{stat.stat.basedOnBallPercent}</td>
            <td>{stat.stat.homeRunsPer9}</td>
            <td>{stat.stat.ops}</td>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
}
