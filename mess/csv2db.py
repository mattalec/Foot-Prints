import sqlite3
import time
from numpy import genfromtxt

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def Create_DB(db):      
    #Create DB and format it as needed
    with sqlite3.connect(db) as conn:
        conn.row_factory = dict_factory
        conn.text_factory = str

        cursor = conn.cursor()

        cursor.execute("CREATE TABLE Scripts ([id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, [dob] VARCHAR, [name] VARCHAR, [email] VARCHAR, [medication] VARCHAR, [dose] VARCHAR, [quantity] VARCHAR, [date] DATE);")

def Add_Record(db, data):
    #Insert record into table
    with sqlite3.connect(db) as conn:
        conn.row_factory = dict_factory
        conn.text_factory = str

        cursor = conn.cursor()
        cursor.execute("INSERT INTO Scripts ({cols}) VALUES ({vals});".format(cols=str(data.keys()).strip('[]'), vals=str([data[i] for i in data]).strip('[]')))


def Load_Data(file_name):
    data = genfromtxt(file_name, delimiter=',', converters={0: lambda s: str(s)})
    return data.tolist()


if __name__ == "__main__":
    t = time.time() 

    db = './scripts.db' #Database filename 
    file_name = "./prescriptions.csv" #sample CSV file used:  http://www.google.com/finance/historical?q=NYSE%3AT&ei=W4ikVam8LYWjmAGjhoHACw&output=csv

    data = Load_Data(file_name) #Get data from CSV

    Create_DB(db) #Create DB

    #For every record, format and insert to table
    for i in data:
        record = {
                'dob' : i[0],
                'name' : i[1],
                'email' : i[2],
                'medication' : i[3],
                'dose' : i[4],
                'quantity' : i[5],
                'date' : i[6]
            }
        Add_Record(db, record)

    #print "Time elapsed: " + str(time.time() - t) + " s." #3.604s
