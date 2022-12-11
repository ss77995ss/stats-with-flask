export async function teamsLoader() {
  const standings = await fetch('/api/standings').then((res) => res.json());

  return { standings };
}

export async function teamInfoLoader({ params }) {
  const teamInfo = await fetch(`/api/rosters/${params.teamId}`).then((res) => res.json());

  return { teamInfo };
}
