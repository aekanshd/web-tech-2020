from flask import Flask, jsonify, request, abort

import pandas

import csv

app = Flask(__name__)
"""
Format:

User table
username, userid (Primary Key), password, email

History table
userid + Book id = primary key?


Purchase table
user id, book id, date of purchase

book table
book id, name, author, genre

History stored in a CSV File:
userid, book1, book2, book3
userid, book1
userid, book1, book2


"""

def write_history(userid, books):
    v = open("history.csv")
    r = csv.reader(v)
    row0 = next(r)
    print(row0)
    
write_history(10, 20)

#mysql = MySQL(app)

@app.route('/recommend', methods=["POST"])
def get_recommend():
    u_id = request.get_json()["userid"]
    history = {}
    with open('history.csv', 'r') as f:
        reader = csv.reader(f)
        for i, line in enumerate(reader):
            history[line[0]] = line[1:]
            
    if u_id in history.keys():
        recommendation = market_basket(history[u_id])
        return recommendation
    else:
        return 0;
get_recommend()
    
