#!/usr/bin/env python
# 
# tournament.py

import psycopg2

def connect():
    """Connect to the PostgreSQL database.  Returns a database connection."""
    return psycopg2.connect("dbname=tournament")

def deleteMatches():
    """Remove all matches in database."""
    conn = connect()
    cur = conn.cursor()
    
    sql = "DELETE FROM matches;"
    cur.execute(sql)
    
    conn.commit()
    conn.close()

def deletePlayers():
    """Remove all players in database."""
    conn = connect()
    cur = conn.cursor()
    
    sql = "DELETE FROM players;"
    cur.execute(sql)
    
    conn.commit()
    conn.close()

def countPlayers():
    """Returns the number of registed players."""
    try:
        conn = connect()
        cur = conn.cursor()
    
        sql = "SELECT count(*) FROM players;"
        cur.execute(sql)
        
        return cur.fetchone()[0]
    finally:
        conn.commit()
        conn.close()

def registerPlayer(name):
    """Registers player in database."""
    conn = connect()
    cur = conn.cursor()
    
    sql = "INSERT INTO players VALUES (%s);"
    cur.execute(sql, (name,))
    
    conn.commit()
    conn.close()

def playerStandings():
    """Returns a list of players with their win/loss records. Goes from first to last place"""
    try:
        conn = connect()
        cur = conn.cursor()
        
        sql = "SELECT * FROM standings;"
        cur.execute(sql)
        
        return cur.fetchall()
    finally:
        conn.commit()
        conn.close()

def reportMatch(winner, loser, draw=False):
    """Reports outcome of match to database."""
    conn = connect()
    cur = conn.cursor()
    
    if not draw:
        winner_sql = "INSERT INTO matches VALUES (1, %s, %s);"
        loser_sql = "INSERT INTO matches VALUES (0, %s, %s);"
    else:
        winner_sql = "INSERT INTO matches VALUES (0.5, %s, %s);"
        loser_sql = "INSERT INTO matches VALUES (0.5, %s, %s);"
        
    cur.execute(winner_sql, (winner,loser))
    cur.execute(loser_sql, (loser,winner))
    
    conn.commit()
    conn.close()
 
def swissPairings():
    """
    Returns list of pairs for the next round of match.
    
    Individuals are paired with those with as close of a win record as possible.
    """
    
    standings = playerStandings()
    
    return [(standings[i-1][0], standings[i-1][1], standings[i][0], standings[i][1])
            for i in range(1, len(standings), 2)]
