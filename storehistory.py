from flask import Flask, jsonify, request, abort
import pandas
import pandas as pd
from collections import Counter
from itertools import combinations
import csv, os

from dotenv import load_dotenv
app = Flask(__name__)
load_dotenv(dotenv_path=os.path.dirname(os.path.abspath(__file__))+"/backend/.env", verbose=True)
import json
import sys
base_dir = os.getenv("PYTHON_FILE_LOCATION")

user = sys.argv[1]
isbn = sys.argv[2]
allrows = []
exists = 0
with open('history.csv', 'r') as f, open('history_out.csv', 'w') as out:
    reader = csv.reader(f)
    writer = csv.writer(out, lineterminator='\n')
    
    
    for i,line in enumerate(reader):
        if(user in line):
            exists = 1
            if isbn not in line:
                line.append(isbn)
            
        allrows.append(line)
    if(exists == 0):
        allrows.append([user,isbn])
    for i in allrows:
        writer.writerow(i)
        
    
os.remove('history.csv')
os.rename(r'history_out.csv', r'history.csv')

                
