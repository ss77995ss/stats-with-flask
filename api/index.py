from flask import Flask
import urllib.request
import json

app = Flask(__name__)
api_domain = "https://statsapi.mlb.com"


@app.route("/api/")
def home():
    return "Hello World!"


@app.route("/api/teams")
def teams():
    response = urllib.request.urlopen(f"{api_domain}/api/v1/teams?sportId=1")
    data = response.read()
    dict = json.loads(data)
    teams = dict["teams"]
    new_teams = []

    for team in teams:
        new_teams.append({
            "id": team["id"],
            "abbreviation": team["abbreviation"],
            "league": team["league"]["name"],
            "division": team["division"]["name"]
        })

    return new_teams


@app.route("/api/rosters/<team_id>")
def rosters(team_id):
    response = urllib.request.urlopen(
        f"{api_domain}/api/v1/teams/{team_id}/roster/Active?hydrate=person(stats(type=season))")
    data = response.read()
    dict = json.loads(data)
    rosters = dict["roster"]
    new_rosters = []

    for roster in rosters:
        # Filter out rosters that don't have `stats` column
        try:
            new_rosters.append({
                "id": roster["person"]["id"],
                "jerseyNumber": roster["jerseyNumber"],
                "batSide": roster["person"]["batSide"]["code"],
                "pitchHand": roster["person"]["pitchHand"]["code"],
                "fullName": roster["person"]["fullName"],
                "position": roster["position"]["abbreviation"],
                "stat": roster["person"]["stats"][0]["splits"][0]["stat"]
            })
        except:
            print(roster["person"]["id"])

    return new_rosters


@app.route("/api/standings")
def standings():
    division_map = {
        "200": "AL West",
        "201": "AL East",
        "202": "AL Central",
        "203": "NL West",
        "204": "NL East",
        "205": "NL Central"
    }

    response = urllib.request.urlopen(
        f"{api_domain}/api/v1/standings?leagueId=103,104")
    data = response.read()
    dict = json.loads(data)
    records = dict["records"]
    standing_dict = {}

    for record in records:
        division_id = record["division"]["id"]
        division_team_records = []

        for team in record["teamRecords"]:
            division_team_records.append({
                "id": team["team"]["id"],
                "name": team["team"]["name"],
                "wins": team["wins"],
                "losses": team["losses"],
                "winningPercentage": team["winningPercentage"],
                "streak": team["streak"]["streakCode"],
                "wildCardGamesBack": team["wildCardGamesBack"],
                "divisionRank": team["divisionRank"],
                "runDifferential": team["runDifferential"],
                "lastTen": list(filter(lambda x: x["type"] == "lastTen", team["records"]["splitRecords"]))
            })

        standing_dict[division_map[str(division_id)]] = division_team_records

    return standing_dict


@app.route("/api/player/<player_id>")
def player(player_id):
    response = urllib.request.urlopen(
        f"{api_domain}/api/v1/people/{player_id}?hydrate=stats(group=[hitting,pitching,fielding],type=[yearByYear])")
    data = response.read()
    dict = json.loads(data)
    player = dict["people"][0]
    stats = player["stats"]
    new_stats = {}

    for stat in stats:
        new_stats[stat["group"]["displayName"]] = stat["splits"]

    new_player = {
        "id": player["id"],
        "fullName": player["fullName"],
        "batSide": player["batSide"]["code"],
        "pitchHand": player["pitchHand"]["code"],
        "age": player["currentAge"],
        "primaryPosition": player["primaryPosition"]["abbreviation"],
        "height": player["height"],
        "weight": player["weight"],
        "draftYear": player["draftYear"],
        "stats": new_stats
    }

    return new_player


@app.route("/api/leaderboard/<category>")
def leaderboard(category):
    response = urllib.request.urlopen(
        f"{api_domain}/api/v1/stats/leaders?leaderCategories={category}")
    data = response.read()
    dict = json.loads(data)
    leaders = dict["leagueLeaders"]

    return leaders
