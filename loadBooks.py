from csv import DictReader
import pymongo
import csv, os
from dotenv import load_dotenv
load_dotenv(dotenv_path=os.path.dirname(
    os.path.abspath(__file__))+"/backend/.env", verbose=True)

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["books_app"]
mycol = mydb['books']
base_dir = os.getenv("PYTHON_FILE_LOCATION")

print(myclient.list_database_names())
print(mydb.list_collection_names())
print("No of docs in books collection:", mycol.count_documents({}))

def addBooks(start,end):
    books = list()

    # open file in read mode
    i = 0
    with open('books.csv', 'r', encoding='utf-8') as read_obj:
        # pass the file object to DictReader() to get the DictReader object
        csv_dict_reader = csv.DictReader(read_obj)
        # iterate over each line as a ordered dictionary
        print("s:",start,"e:",end)
        for row in csv_dict_reader:
            if i <= start:
                i = i + 1
                continue
            if i == end:
                break
            # print(i)
            books.append(row)
            # print(row['bookID'])
            i = i + 1

    i = i - 1
    print("Length of books:", len(books))
    x = mycol.insert_many(books)
    print(x.inserted_ids)
    print("No of docs in books collection:", mycol.count_documents({}))
    print("=============")

    '''
        Use the below statements to delete all records.

    x = mycol.delete_many({})
    print(x.deleted_count, " documents deleted.")
    '''

def batchInsertof500(start_at=0):
    errors = []
    for i in range(start_at, 11000, 500):
        try:
            addBooks(i, i+500)
        except Exception as e:
            errors.append("s: " + str(i) + " " + "e: " + str(i+500))

    print("----")
    print(errors)

# batchInsertof500(9000)
batchInsertof500()
