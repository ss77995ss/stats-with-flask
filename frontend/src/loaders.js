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
