# Backend

## APIs

#### Team

```python
{
  path: "/api/team/<team_id>",
  variable: {
    team_id: "Id that represent MLB team"
  },
  descripition: "Get Team's information like abbreviation, name or division"
}
```

#### Rosters

```python
{
  path: "/api/rosters/<team_id>",
  variable: {
    team_id: "Id that represent MLB team"
  },
  descripition: "Get Team's rosters with general stats like `ops` and news for each team"
}
```

#### Standings

```python
{
  path: "/api/standings",
  variable: None,
  descripition: "Get standings for each division"
}
```

#### Player

```python
{
  path: "/api/player/<player_id>",
  variable: {
    player_id: "Id that represent one player"
  },
  descripition: "Get Player's detail stats"
}
```

#### Leaderboard Types

```python
{
  path: "/api/leaderboard/types",
  variable: None,
  descripition: "Get stat categories which can apply for leaderboards"
}
```

#### Leaderboard

```python
{
  path: "/api/leaderboard/<stat_group>/<category>",
  variable: {
    stat_group: "Stat's group such as `pitching`, `fielding`",
    category: "Stat's category"
  },
  descripition: "Get leaders by specific group and category"
}
```

#### All Group Leaderboard

```python
{
  path: "/api/leaderboard/all/<category>",
  variable: {
    category: "Stat's category"
  },
  descripition: "Get all the group leaders by stat's category"
}
```

#### News

```python
{
  path: "/api/news",
  variable: None,
  descripition: "Get news from MLB rss.yml"
}
```

#### Team News

```python
{
  path: "/api/news/<team_id>",
  variable: {
    team_id: "Id that represent MLB team"
  },
  descripition: "Get news from each team's rss.yml"
}
```
