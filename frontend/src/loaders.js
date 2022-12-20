export async function teamsLoader() {
  const standings = await fetch('/api/standings').then((res) => res.json());

  return { standings };
}

export async function teamInfoLoader({ params }) {
  const teamInfo = await fetch(`/api/rosters/${params.teamId}`).then((res) => res.json());

  return { teamInfo };
}

export async function playerInfoLoader({ params }) {
  const teamInfo = await fetch(`/api/team/${params.teamId}`).then((res) => res.json());
  const playerInfo = await fetch(`/api/player/${params.playerId}`).then((res) => res.json());

  return { teamInfo, playerInfo };
}

export async function leaderTypesLoader() {
  const leaderTypes = await fetch('/api/leaderboard/types').then((res) => res.json());

  return { leaderTypes };
}

export async function leaderboardLoader() {
  const avg = await fetch('/api/leaderboard/hitting/avg').then((res) => res.json());
  const hr = await fetch('/api/leaderboard/hitting/homeRuns').then((res) => res.json());
  const rbi = await fetch('/api/leaderboard/hitting/rbi').then((res) => res.json());
  const hit = await fetch('/api/leaderboard/hitting/hits').then((res) => res.json());
  const sb = await fetch('/api/leaderboard/hitting/stolenBases').then((res) => res.json());

  const win = await fetch('/api/leaderboard/pitching/wins').then((res) => res.json());
  const era = await fetch('/api/leaderboard/pitching/era').then((res) => res.json());
  const sv = await fetch('/api/leaderboard/pitching/saves').then((res) => res.json());
  const so = await fetch('/api/leaderboard/pitching/strikeOuts').then((res) => res.json());
  const hold = await fetch('/api/leaderboard/pitching/holds').then((res) => res.json());

  return {
    hitting: {
      avg,
      hr,
      rbi,
      hit,
      sb,
    },
    pitching: {
      win,
      era,
      sv,
      so,
      hold,
    },
  };
}
