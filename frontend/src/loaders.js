export async function teamsLoader() {
  const standings = await fetch('/api/standings').then((res) => res.json());

  return { standings };
}

export async function teamInfoLoader({ params }) {
  const teamInfo = await fetch(`/api/rosters/${params.teamId}`).then((res) => res.json());

  return { teamInfo };
}

export async function playerInfoLoader({ params }) {
  const info = await Promise.all([
    fetch(`/api/team/${params.teamId}`).then((res) => res.json()),
    fetch(`/api/player/${params.playerId}`).then((res) => res.json()),
  ]);

  return { teamInfo: info[0], playerInfo: info[1] };
}

export async function leaderTypesLoader() {
  const leaderTypes = await fetch('/api/leaderboard/types').then((res) => res.json());

  return { leaderTypes };
}

const getLeaders = (position, type) => fetch(`/api/leaderboard/${position}/${type}`).then((res) => res.json());

export async function leaderboardLoader() {
  const leaders = await Promise.all([
    getLeaders('hitting', 'avg'),
    getLeaders('hitting', 'homeRuns'),
    getLeaders('hitting', 'rbi'),
    getLeaders('hitting', 'hits'),
    getLeaders('hitting', 'stolenBases'),
    getLeaders('pitching', 'wins'),
    getLeaders('pitching', 'era'),
    getLeaders('pitching', 'saves'),
    getLeaders('pitching', 'strikeOuts'),
    getLeaders('pitching', 'holds'),
  ]);

  return {
    hitting: {
      avg: leaders[0],
      hr: leaders[1],
      rbi: leaders[2],
      hit: leaders[3],
      sb: leaders[4],
    },
    pitching: {
      win: leaders[5],
      era: leaders[6],
      sv: leaders[7],
      so: leaders[8],
      hold: leaders[9],
    },
  };
}
