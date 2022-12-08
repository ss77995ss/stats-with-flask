import './standing.scss';

export default function StandingTable({ division, standing }) {
  const sortedStanding = standing.sort((a, b) => parseInt(a.divisionRank, 10) - parseInt(b.divisionRank, 10));

  return (
    <div className="card text-black bg-secondary mb-4">
      <div style={{ fontWeight: 'bold', borderBottom: 'none' }} className="card-header text-white row row-cols-8">
        <div className="col-3">{division}</div>
        <div className="col text-center">W</div>
        <div className="col text-center">L</div>
        <div className="col text-center">Pct</div>
        <div className="col text-center">GB</div>
        <div className="col text-center">L10</div>
        <div className="col text-center">DIFF</div>
        <div className="col text-center">Str</div>
      </div>
      <ul className="list-group list-group-flush bg-white">
        {sortedStanding.map((stat) => (
          <li key={`standing-stats-${stat.id}`} className="list-group-item">
            <div className="row row-cols-8">
              <div className="col-3">
                <img src={`https://www.mlbstatic.com/team-logos/${stat.id}.svg`} alt={`${stat.name}-logo`} />
                {stat.name}
              </div>
              <div className="col text-center">{stat.wins}</div>
              <div className="col text-center">{stat.losses}</div>
              <div className="col text-center">{stat.winningPercentage}</div>
              <div className="col text-center">{stat.wildCardGamesBack}</div>
              <div className="col text-center">{`${stat.lastTen[0].wins}-${stat.lastTen[0].losses}`}</div>
              <div className="col text-center">{stat.runDifferential}</div>
              <div className="col text-center">{stat.streak}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
