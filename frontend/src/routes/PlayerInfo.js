import { Link, useLoaderData } from 'react-router-dom';
import '../table.scss';

function InfoItem({ labelText, description }) {
  return (
    <div className="m-2">
      <label className="text-secondary" style={{ fontSize: '.75rem' }}>
        {labelText}
      </label>
      <p>{description}</p>
    </div>
  );
}

export default function PlayerInfo() {
  const { playerInfo, teamInfo } = useLoaderData();

  return (
    <div>
      <div className="team-info">
        <div className="team-info-content">
          <div className="player-info-content-img">
            <img
              src={`https://content.mlb.com/images/headshots/current/60x60/${playerInfo.id}.png`}
              srcSet={`https://content.mlb.com/images/headshots/current/60x60/${playerInfo.id}@2x.png 2x, https://content.mlb.com/images/headshots/current/60x60/${playerInfo.id}@4x.png 4x`}
              alt={`${playerInfo.fullName}-headshot`}
            />
          </div>
          <div className="team-info-content-detail">
            <h3>{playerInfo.fullName}</h3>
            <span className="team-info-content-detail-rank text-secondary">{playerInfo.primaryPosition}</span>
            <Link to={`/teams/${teamInfo.id}`}>
              <span style={{ color: 'white' }} className="team-info-content-detail-record m-2">
                {teamInfo.name}
              </span>
            </Link>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <InfoItem labelText="B/T" description={`${`${playerInfo.batSide}/${playerInfo.pitchHand}`}`} />
          <InfoItem labelText="Age" description={playerInfo.age} />
          <InfoItem labelText="H" description={playerInfo.height} />
          <InfoItem labelText="W" description={playerInfo.weight} />
          <InfoItem labelText="Drafted" description={playerInfo.draftYear} />
        </div>
      </div>
      <div>
        {playerInfo.primaryPosition === 'P' || playerInfo.primaryPosition === 'TWP' ? (
          <Pitchers playerInfo={playerInfo} />
        ) : (
          <Hitters playerInfo={playerInfo} />
        )}
      </div>
    </div>
  );
}

function Hitters({ playerInfo }) {
  return (
    <table className="stats-table">
      <thead>
        <tr className="bg-secondary text-center">
          <th>Year</th>
          <th>Team</th>
          <th>G</th>
          <th>PA</th>
          <th>AB</th>
          <th>R</th>
          <th>H</th>
          <th>2B</th>
          <th>3B</th>
          <th>HR</th>
          <th>RBI</th>
          <th>SB</th>
          <th>BB</th>
          <th>OBP</th>
          <th>SLG</th>
          <th>OPS</th>
        </tr>
      </thead>
      <tbody>
        {playerInfo.stats.hitting.map((stat) => (
          <tr className="text-center">
            {stat.team && (
              <>
                <td>{stat.season}</td>
                <td>
                  <Link to={`/teams/${stat.team.id}`}>
                    <img
                      className="ml-2"
                      src={`https://www.mlbstatic.com/team-logos/${stat.team.id}.svg`}
                      alt={`${stat.team.name}-logo`}
                    />
                    <span>{stat.team.name}</span>
                  </Link>
                </td>
                <td>{stat.stat.gamesPlayed}</td>
                <td>{stat.stat.plateAppearances}</td>
                <td>{stat.stat.atBats}</td>
                <td>{stat.stat.runs}</td>
                <td>{stat.stat.hits}</td>
                <td>{stat.stat.doubles}</td>
                <td>{stat.stat.triples}</td>
                <td>{stat.stat.homeRuns}</td>
                <td>{stat.stat.rbi}</td>
                <td>{stat.stat.strikeOuts}</td>
                <td>{stat.stat.baseOnBalls}</td>
                <td>{stat.stat.obp}</td>
                <td>{stat.stat.slg}</td>
                <td>{stat.stat.ops}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Pitchers({ playerInfo }) {
  return (
    <table className="stats-table">
      <thead>
        <tr className="bg-secondary text-center">
          <th>Year</th>
          <th>Team</th>
          <th>G</th>
          <th>IP</th>
          <th>W</th>
          <th>L</th>
          <th>SV</th>
          <th>ERA</th>
          <th>WHIP</th>
          <th>H</th>
          <th>R</th>
          <th>SO</th>
          <th>BB</th>
          <th>HR/9</th>
          <th>OPS</th>
        </tr>
      </thead>
      <tbody>
        {playerInfo.stats.pitching.map((stat) => (
          <tr className="text-center">
            {stat.team && (
              <>
                <td>{stat.season}</td>
                <td>
                  <Link to={`/teams/${stat.team.id}`}>
                    <img
                      className="ml-2"
                      src={`https://www.mlbstatic.com/team-logos/${stat.team.id}.svg`}
                      alt={`${stat.team.name}-logo`}
                    />
                    <span>{stat.team.name}</span>
                  </Link>
                </td>
                <td>{stat.stat.gamesPitched}</td>
                <td>{stat.stat.inningsPitched}</td>
                <td>{stat.stat.wins}</td>
                <td>{stat.stat.losses}</td>
                <td>{stat.stat.saves}</td>
                <td>{stat.stat.era}</td>
                <td>{stat.stat.whip}</td>
                <td>{stat.stat.hits}</td>
                <td>{stat.stat.runs}</td>
                <td>{stat.stat.strikeOuts}</td>
                <td>{stat.stat.baseOnBalls}</td>
                <td>{stat.stat.homeRunsPer9}</td>
                <td>{stat.stat.ops}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
