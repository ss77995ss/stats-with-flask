![Test Check](https://github.com/ss77995ss/stats-with-flask/actions/workflows/check.yml/badge.svg)

# Stats With Flask

## Introduction

This application is built by [Flask](https://flask.palletsprojects.com/en/2.2.x/) as a backend server, [React](https://reactjs.org/) as a frontend framework to build UI and [Vercel](https://vercel.com/) as a deployment tool.

Datasource is based on MLB [statsapi](https://statsapi.mlb.com)

## Features

- **Header** with two navigation link `Team` and `Leaderboards` and always fixed on the top of the screen
- **Footer** with Author's name and contact information
- **Team**:
  - Show **standings** for each divisions
  - Show MLB's latest news
  - Click the name of each team can access to `TeamInfo` page
- **TeamInfo**:
  - Show selected team's information and its rosters
  - Show selected team's news
  - Click stats headers can sort the table
  - Click switch button to change display players (Hitting or Pitching)
  - Click each player's name to access to `PlayerInfo` page
- **PlayerInfo**:
  - Show selected player's detail by year
  - Click team name can go to selected team's page
- **Leaderboards**:
  - Display ten default league leaders' tables
  - Click player's name to access their info page
  - Click link `More!` to see more leaders
- **MoreLeaders**:
  - Use select menu to search different category of leaders
- **Breadcrumb**:
  - Depends on route tree can switch back to parent route

* **Unit Testing** with [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)
* Implement checking actions with **Github action** so that we can check our App status before merge our code

## Demo

API Server: https://stats-with-flask.vercel.app/
Demo Site: https://stats-with-flask-f2e-demo.vercel.app/

## How it Works

This example uses the Web Server Gateway Interface (WSGI) with Flask to enable handling requests on Vercel with Serverless Functions.

As for frontend client, I use [Create React App](https://create-react-app.dev/) to startup the UI display

## Running Locally

### Backend

```bash
npm i -g vercel
vercel dev
```

Go to `http://localhost:3000` and we can see the API is working on `localhost`

### Frontend

After starting the API server

```bash
cd frontend
yarn install
yarn start
```

Go to `http://localhost:5000` and we can see the UI website is working on `localhost` (It will have error if the API server does not working)

### Improvement

- Only write unit tests for `frontend` and should also write tests for `python` code
- Could use [Docker](https://www.docker.com/) to build the environment and execute those command with `images`
- API folder structure could be more clean (I added all the api code in one file). Maybe use [Blueprint](https://flask.palletsprojects.com/en/2.2.x/blueprints/) is a better idea
- Add more comments if have time so that other developers can understand the code much easier
- Implement UI for different devices since not only the users use PC but also mobile devices like smartphone
- Do better on error handling

### Encounter Issues

- I found that players like Ohtani has `TWP` position which should have data on both **Pitching** and **Hitting**. However, I could only find his pitching data so I marked `TWP` players as pitchers
- Some rosters seem not have stat column. For example, 663878 Nate Pearson from BlueJays. I excluded them in my API. Therefore, their info would not show on this app
