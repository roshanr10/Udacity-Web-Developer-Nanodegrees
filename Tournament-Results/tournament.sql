-- Database Definition for Swiss Pairing

-- Configuration
DROP DATABASE IF EXISTS tournament;
CREATE DATABASE tournament;
\c tournament;

-- Tables
CREATE TABLE players ( name TEXT, id SERIAL PRIMARY KEY );

CREATE TABLE matches ( result REAL,
                       playerid INTEGER REFERENCES players,
                       opponent INTEGER REFERENCES players,
                       id SERIAL PRIMARY KEY );

-- Views
CREATE VIEW standings AS
    SELECT players.id, players.name, COALESCE(sum(matches.result), 0) AS wins, count(matches.result)
    FROM players LEFT JOIN matches ON players.id = matches.playerid
    GROUP BY players.id
    ORDER BY wins DESC;