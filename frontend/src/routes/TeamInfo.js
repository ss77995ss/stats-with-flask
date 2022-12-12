import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import './TeamInfo.scss';

const RANK_MAP = {
  1: '1st',
  2: '2nd',
  3: '3rd',
  4: '4th',
  5: '5th',
};

export default function TeamInfo() {
  const { teamInfo } = useLoaderData();
  const [playerType, setPlayerType] = useState('Hitters');

  const handleToggle = (e) => setPlayerType(e.target.value);

  return (
    <div>
      <div className="team-info">
        <div className="team-info-content">
          <div className="team-info-content-img">
            <img src={`https://www.mlbstatic.com/team-logos/${teamInfo.id}.svg`} alt="team-info-img" />
          </div>
          <div className="team-info-content-detail">
            <h3>{teamInfo.name}</h3>
            <span className="team-info-content-detail-rank text-secondary">{`${RANK_MAP[teamInfo.divisionRank]} in ${
              teamInfo.division
            }`}</span>
            <span className="team-info-content-detail-record m-2">{`${teamInfo.wins} - ${teamInfo.losses} (${teamInfo.winningPercentage}) • ${teamInfo.divisionGamesBack} GB`}</span>
          </div>
        </div>
        <div className="team-info-toggle-buttons">
          <button value="Hitters" className={`${playerType === 'Hitters' && 'active'}`} onClick={handleToggle}>
            Hitters
          </button>
          <button value="Pitchers" className={`${playerType === 'Pitchers' && 'active'}`} onClick={handleToggle}>
            Pitchers
          </button>
        </div>
      </div>
      {playerType === 'Hitters' ? (
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
    <div className="team-info-hitters card text-black bg-secondary mb-4">
      <div style={{ fontWeight: 'bold', borderBottom: 'none' }} className="card-header text-white row row-cols-17">
        <div className="col text-center">Pos</div>
        <div className="col text-center">#</div>
        <div className="col-3">Player</div>
        <div className="col text-center">Age</div>
        <div className="col text-center">B</div>
        <div className="col text-center">T</div>
        <div className="col text-center">PA</div>
        <div className="col text-center">H</div>
        <div className="col text-center">2B</div>
        <div className="col text-center">3B</div>
        <div className="col text-center">HR</div>
        <div className="col text-center">SB</div>
        <div className="col text-center">SO%</div>
        <div className="col text-center">BB%</div>
        <div className="col text-center">AVG</div>
        <div className="col text-center">OBP</div>
        <div className="col text-center">OPS</div>
      </div>
      <ul className="list-group list-group-flush bg-white">
        {hitters.map((stat) => (
          <li key={`standing-stats-${stat.id}`} className="list-group-item">
            <div className="row row-cols-17">
              <div className="col text-center">{stat.position}</div>
              <div className="col text-center">{stat.jerseyNumber}</div>
              <div className="col-3">
                <Link to={`/teams/${teamId}/player/${stat.id}`}>
                  <img
                    src={`https://content.mlb.com/images/headshots/current/60x60/${stat.id}.png`}
                    alt={`${stat.fullName}-headshot`}
                  />
                  {stat.fullName}
                </Link>
              </div>
              <div className="col text-center">{stat.age}</div>
              <div className="col text-center">{stat.batSide}</div>
              <div className="col text-center">{stat.pitchHand}</div>
              <div className="col text-center">{stat.stat.plateAppearances}</div>
              <div className="col text-center">{stat.stat.hits}</div>
              <div className="col text-center">{stat.stat.doubles}</div>
              <div className="col text-center">{stat.stat.triples}</div>
              <div className="col text-center">{stat.stat.homeRuns}</div>
              <div className="col text-center">{stat.stat.stolenBases}</div>
              <div className="col text-center">
                {stat.stat.plateAppearances > 0
                  ? (stat.stat.strikeOuts / stat.stat.plateAppearances).toFixed(3).replace(/^0+/, '')
                  : '.000'}
              </div>
              <div className="col text-center">
                {stat.stat.plateAppearances > 0
                  ? (stat.stat.baseOnBalls / stat.stat.plateAppearances).toFixed(3).replace(/^0+/, '')
                  : '.000'}
              </div>
              <div className="col text-center">{stat.stat.avg}</div>
              <div className="col text-center">{stat.stat.obp}</div>
              <div className="col text-center">{stat.stat.ops}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Pitchers({ teamId, pitchers }) {
  return (
    <div className="team-info-hitters card text-black bg-secondary mb-4">
      <div style={{ fontWeight: 'bold', borderBottom: 'none' }} className="card-header text-white row row-cols-13">
        <div className="col text-center">Pos</div>
        <div className="col text-center">#</div>
        <div className="col-3">Player</div>
        <div className="col text-center">Age</div>
        <div className="col text-center">T</div>
        <div className="col text-center">IP</div>
        <div className="col text-center">ERA</div>
        <div className="col text-center">SO</div>
        <div className="col text-center">BB</div>
        <div className="col text-center">SO%</div>
        <div className="col text-center">BB%</div>
        <div className="col text-center">HR/9</div>
        <div className="col text-center">OPS</div>
      </div>
      <ul className="list-group list-group-flush bg-white">
        {pitchers.map((stat) => (
          <li key={`standing-stats-${stat.id}`} className="list-group-item">
            <div className="row row-cols-13">
              <div className="col text-center">{stat.position}</div>
              <div className="col text-center">{stat.jerseyNumber}</div>
              <div className="col-3">
                <Link to={`/teams/${teamId}/player/${stat.id}`}>
                  <img
                    src={`https://content.mlb.com/images/headshots/current/60x60/${stat.id}.png`}
                    alt={`${stat.fullName}-logo`}
                  />
                  {stat.fullName}
                </Link>
              </div>
              <div className="col text-center">{stat.age}</div>
              <div className="col text-center">{stat.pitchHand}</div>
              <div className="col text-center">{stat.stat.inningsPitched}</div>
              <div className="col text-center">{stat.stat.era}</div>
              <div className="col text-center">{stat.stat.strikeOuts}</div>
              <div className="col text-center">{stat.stat.baseOnBalls}</div>
              <div className="col text-center">
                {stat.stat.battersFaced > 0
                  ? (stat.stat.strikeOuts / stat.stat.battersFaced).toFixed(3).replace(/^0+/, '')
                  : '.000'}
              </div>
              <div className="col text-center">
                {stat.stat.battersFaced > 0
                  ? (stat.stat.baseOnBalls / stat.stat.battersFaced).toFixed(3).replace(/^0+/, '')
                  : '.000'}
              </div>
              <div className="col text-center">{stat.stat.homeRunsPer9}</div>
              <div className="col text-center">{stat.stat.ops}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
