from flask import Flask, jsonify, request, abort
import pandas
import pandas as pd
from collections import Counter
from itertools import combinations
import csv, os
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules
from dotenv import load_dotenv
app = Flask(__name__)
load_dotenv(dotenv_path=os.path.dirname(os.path.abspath(__file__))+"/backend/.env", verbose=True)
import json
base_dir = os.getenv("PYTHON_FILE_LOCATION")

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
    v = open(base_dir+"/history.csv")
    r = csv.reader(v)
    row0 = next(r)
    print(row0)
    
write_history(10, 20)

def freq(iterable):
    if type(iterable) == pd.core.series.Series:
        return iterable.value_counts().rename("freq")
    else:
        return pd.Series(Counter(iterable)).rename("freq")
def order_count(order_item):
    return len(set(order_item.index))

def get_item_pairs(order_item):
    item_list = []
    for i in range(1,len(order_item)):
        if order_item[0][i] not in item_list:
            item_list.append(order_item[0][i])
    print(item_list)
    for item_pair in combinations(item_list, 2):
        yield item_pair

def association_rules(order_item, min_support, rawdata):
    print("Starting order_item: {:22d}".format(len(order_item)))
    items = []
    indices = []
    for i in range(len(order_item)):
        for j in order_item[i]:
            indices.append(i)
            items.append(j)
    order_item = pd.Series(items, index=indices).reset_index()
    order_item2 = order_item
    item_stats             = freq(order_item).to_frame("freq")
    item_stats['support']  = item_stats['freq'] / order_count(order_item) * 100



    qualifying_items       = item_stats[item_stats['support'] >= min_support].index
    order_item             = order_item[order_item.isin(qualifying_items)]

    print("Items with support >= {}: {:15d}".format(min_support, len(qualifying_items)))
    print("Remaining order_item: {:21d}".format(len(order_item)))

    order_size             = freq(order_item.index)
    qualifying_orders      = order_size[order_size >= 2].index
    order_item             = order_item[order_item.index.isin(qualifying_orders)]

    print("Remaining orders with 2+ items: {:11d}".format(len(qualifying_orders)))
    print("Remaining order_item: {:21d}".format(len(order_item)))

    item_stats             = freq(order_item).to_frame("freq")
    item_stats['support']  = item_stats['freq'] / order_count(order_item) * 100

    print(order_item2)
    item_pair_gen          = get_item_pairs(order_item2)

    item_pairs              = freq(item_pair_gen).to_frame("freqAB")
    item_pairs['supportAB'] = item_pairs['freqAB'] / len(qualifying_orders) * 100

    print("Item pairs: {:31d}".format(len(item_pairs)))

    item_pairs              = item_pairs[item_pairs['supportAB'] >= min_support]

    print("Item pairs with support >= {}: {:10d}\n".format(min_support, len(item_pairs)))

    item_pairs = item_pairs.reset_index().rename(columns={'level_0': 'item_A', 'level_1': 'item_B'})
    print(len(item_pairs))
    for i in range(len(item_pairs)):
        item1 = item_pairs['item_A'][i]
        item2 = item_pairs['item_B'][i]
        frequency = 0
        for j in rawdata:
            if item1 in j and item2 in j:
                frequency+=1
        item_pairs['freqAB'][i] = frequency
        item_pairs['supportAB'][i] = item_pairs['freqAB'][i] / len(item_pairs)
    item_pairs = item_pairs[item_pairs.freqAB !=0]
    item_pairs = item_pairs[item_pairs.supportAB>min_support]
    

    item_pairs = item_pairs.sort_values(['item_A', 'freqAB'], ascending=(True, False))
    #print(item_pairs)

    return item_pairs




    

def market_basket(user_purchases, all_purchases):
    recommendations = []
    rules = association_rules(all_purchases, 0.02, all_purchases)
    
    
    
    out = list(rules["item_B"]);
    if(len(out)>5):
        out = out[0:5]
    return out;

all_purchases = [[1,2,3,4],[2,3,6], [1,2], [4,7,9], [1,7,9], [2,6,7], [6,1,2,8]]
#market_basket(3, all_purchases)
    
@app.route('/recommend', methods=["POST"])
def get_recommend():
    u_id = request.get_json()["userid"]
    history = {}
    purchases = []
    #u_id = 'user2'
    with open(base_dir+'/history.csv', 'r') as f:
        reader = csv.reader(f)
        
        for i, line in enumerate(reader):
            history[line[0]] = line[1:]
            purchases.append(line[1:])
    print(history[u_id])
    #print(purchases)
    if u_id in history.keys():
        recommendation = 0
        #print(history[u_id])
        recommendation = market_basket(history[u_id], purchases)
        json_dump = json.dumps({"user":u_id, "books":recommendation});
        return json_dump
        
    else:
        json_dump = json.dumps({"user":u_id, "books":[]});
        return json_dump;
        
get_recommend()

