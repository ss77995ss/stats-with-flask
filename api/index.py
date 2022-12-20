from flask import Flask
import urllib.request
import xmltodict
import json

app = Flask(__name__, static_folder='static', static_url_path='')
api_domain = "https://statsapi.mlb.com"
user_agent = "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7"
headers = {"User-Agent": user_agent}

division_map = {
    "200": "AL West",
    "201": "AL East",
    "202": "AL Central",
    "203": "NL West",
    "204": "NL East",
    "205": "NL Central"
}

team_url_map = {
    "108": "angels",
    "109": "dbacks",
    "110": "orioles",
    "111": "redsox",
    "112": "cubs",
    "113": "reds",
    "114": "guardians",
    "115": "rockies",
    "116": "tigers",
    "117": "astros",
    "118": "royals",
    "119": "dodgers",
    "120": "nationals",
    "121": "mets",
    "133": "athletics",
    "134": "pirates",
    "135": "padres",
    "136": "mariners",
    "137": "giants",
    "138": "cardinals",
    "139": "rays",
    "140": "rangers",
    "141": "bluejays",
    "142": "twins",
    "143": "phillies",
    "144": "braves",
    "145": "whitesox",
    "146": "marlins",
    "147": "yankees",
    "141": "marlins",
    "142": "yankees",
    "158": "brewers"
}


@app.route("/api/")
def home():
    return "Hello World!"


@app.route("/api/team/<team_id>")
def team(team_id):
    response = urllib.request.urlopen(
        f"{api_domain}/api/v1/teams/{team_id}?sportId=1")
    data = response.read()
    dict = json.loads(data)
    team = dict["teams"][0]

    return {
        "id": team["id"],
        "name": team["name"],
        "abbreviation": team["abbreviation"],
        "league": team["league"]["name"],
        "division": team["division"]["name"]
    }


@app.route("/api/rosters/<team_id>")
def rosters(team_id):
    response = urllib.request.urlopen(
        f"{api_domain}/api/v1/teams/{team_id}")
    data = response.read()
    dict = json.loads(data)
    team = dict["teams"][0]

    response = urllib.request.urlopen(
        f"{api_domain}/api/v1/standings?leagueId=103,104")
    data = response.read()
    dict = json.loads(data)
    records = dict["records"]
    division_records = list(
        filter(lambda x: x["division"]["id"] == team["division"]["id"], records))
    team_record = list(
        filter(lambda x: x["team"]["id"] == team["id"], division_records[0]["teamRecords"]))[0]

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
                "age": roster["person"]["currentAge"],
                "jerseyNumber": roster["jerseyNumber"],
                "batSide": roster["person"]["batSide"]["code"],
                "pitchHand": roster["person"]["pitchHand"]["code"],
                "fullName": roster["person"]["fullName"],
                "position": roster["position"]["abbreviation"],
                "stat": roster["person"]["stats"][0]["splits"][0]["stat"]
            })
        except Exception as e:
            print(roster["person"]["id"], roster["person"]["fullName"])
            print(repr(e))

    team_url = team_url_map[str(team["id"])]
    news_url = f"https://www.mlb.com/{team_url}/feeds/news/rss.xml"

    request = urllib.request.Request(
        news_url, None, headers)
    response = urllib.request.urlopen(request)
    data = response.read()
    data_dict = xmltodict.parse(data.decode("utf-8"))

    news = data_dict["rss"]["channel"]["item"]

    group_news = []
    group = []

    for index, item in enumerate(news):
        if index % 4 == 3:
            group.append(item)
            group_news.append(group)
            group = []
        else:
            group.append(item)

    if len(group) > 0:
        group_news.append(group)

    return {
        "id": team["id"],
        "name": team["name"],
        "division": division_map[str(team["division"]["id"])],
        "wins": team_record["wins"],
        "losses": team_record["losses"],
        "winningPercentage": team_record["winningPercentage"],
        "divisionGamesBack": team_record["divisionGamesBack"],
        "divisionRank": team_record["divisionRank"],
        "rosters": new_rosters,
        "news": group_news
    }


@app.route("/api/standings")
def standings():
    response = urllib.request.urlopen(f"{api_domain}/api/v1/teams?sportId=1")
    data = response.read()
    dict = json.loads(data)
    teams = dict["teams"]

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
                "name": list(filter(lambda x: x["id"] == team["team"]["id"], teams))[0]["abbreviation"],
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
        "draftYear": player["draftYear"] if "draftYear" in player else "N/A",
        "stats": new_stats
    }

    return new_player


@app.route("/api/leaderboard/types")
def leaderboard_types():
    response = urllib.request.urlopen(
        f"{api_domain}/api/v1/leagueLeaderTypes")
    data = response.read()
    dict = json.loads(data)

    return list(map(lambda x: x["displayName"], dict))


@app.route("/api/leaderboard/hitting/<category>")
def hitting_leaderboard(category):
    response = urllib.request.urlopen(
        f"{api_domain}/api/v1/stats/leaders?leaderCategories={category}")
    data = response.read()
    dict = json.loads(data)
    leaders = list(filter(lambda x: x["statGroup"] ==
                          "hitting", dict["leagueLeaders"]))

    return leaders[0]["leaders"][0:5] if len(leaders) > 0 else []


@app.route("/api/leaderboard/pitching/<category>")
def pitching_leaderboard(category):
    response = urllib.request.urlopen(
        f"{api_domain}/api/v1/stats/leaders?leaderCategories={category}")
    data = response.read()
    dict = json.loads(data)
    leaders = list(filter(lambda x: x["statGroup"] ==
                          "pitching", dict["leagueLeaders"]))

    return leaders[0]["leaders"][0:5] if len(leaders) > 0 else []


@app.route("/api/leaderboard/all/<category>")
def all_group_leaderboard(category):
    response = urllib.request.urlopen(
        f"{api_domain}/api/v1/stats/leaders?leaderCategories={category}")
    data = response.read()
    dict = json.loads(data)

    leaderboard = {}

    for leaders in dict["leagueLeaders"]:
        if leaders["statGroup"] not in leaderboard:
            if "leaders" in leaders:
                leaderboard[leaders["statGroup"]] = {}
                leaderboard[leaders["statGroup"]
                            ][leaders["leaderCategory"]] = leaders["leaders"][0:5]

    return leaderboard


@app.route("/api/news")
def news():
    url = "https://www.mlb.com/feeds/news/rss.xml"
    request = urllib.request.Request(
        url, None, headers)
    response = urllib.request.urlopen(request)
    data = response.read()
    data_dict = xmltodict.parse(data.decode("utf-8"))

    news = data_dict["rss"]["channel"]["item"]

    group_news = []
    group = []

    for index, item in enumerate(news):
        if index % 4 == 3:
            group.append(item)
            group_news.append(group)
            group = []
        else:
            group.append(item)

    if len(group) > 0:
        group_news.append(group)

    return group_news


@app.route("/api/news/<team_id>")
def team_news(team_id):
    url = f"https://www.mlb.com/{team_id}/feeds/news/rss.xml"

    request = urllib.request.Request(
        url, None, headers)
    response = urllib.request.urlopen(request)
    data = response.read()
    data_dict = xmltodict.parse(data.decode("utf-8"))

    news = data_dict["rss"]["channel"]["item"]

    group_news = []
    group = []

    for index, item in enumerate(news):
        if index % 4 == 3:
            group.append(item)
            group_news.append(group)
            group = []
        else:
            group.append(item)

    if len(group) > 0:
        group_news.append(group)

    return group_news
