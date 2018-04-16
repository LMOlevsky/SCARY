import sqlite3
import csv

f="./data/cities.db"
db = sqlite3.connect(f)
c = db.cursor()

def populate(file):
    reader = csv.reader(open(file,'rU'))
    #get the table name
    name = file.split('.csv')[0].split('/')[2]
    #get the table fields
    row = next(reader)
    #print row
    index = 0
    #create the table with all the fields
    command = "CREATE TABLE " + name + " ("
    while index < len(row):
        type = " INTEGER,"
        if (row[index] == "City" or row[index] == "State"):
            type = " TEXT,"
        command += row[index] + type
        index += 1
    command = command[:len(command)-1]
    command += ");"
    #print command
    try:
        c.execute(command)
    except:
        return
    reader = csv.DictReader(open(file,'rU'))
    
    #get the names of the keys for the dictionary
    f0,f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14 = row
    
    #add each city to the database
    for row in reader:
        #print row
        command = "INSERT INTO " + name + " VALUES ("
        command += "'" + row[f0] + "', "
        command += row[f1] + ","
        command += row[f2] + ","
        command += row[f3] + ","
        command += row[f4] + ","
        command += "'" + row[f5] + "',"
        command += row[f6] + ","
        command += row[f7] + ","
        command += row[f8] + ","
        command += row[f9] + ","
        command += row[f10] + ","
        command += row[f11] + ","
        command += row[f12] + ","
        command += row[f13] + ","
        command += row[f14]
        command += ");"
        #print command
        c.execute(command)

populate("./data/cities.csv")

db.commit()
db.close()
