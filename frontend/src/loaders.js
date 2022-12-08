export async function teamsLoader() {
  const standings = await fetch('/api/standings').then((res) => res.json());

  return { standings };
}
