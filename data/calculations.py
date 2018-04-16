import sqlite3
import csv
import dbBuilder

f="./data/cities.db"
db = sqlite3.connect(f)
c = db.cursor()

#helper function to compare the rates of crime in each city for each state
def compareRates(id,typeNum):
    highest = -1
    for entry in c.execute("SELECT * FROM cities WHERE ID = %d"%(id)):
        crimes = entry[typeNum]
        pop = entry[14]
        percent = float(crimes)/pop
        if(percent > highest):
            highest = percent
    return highest

#type is a string of the type of crime (types can be found in the types list
# in the function below)
#returns a list of the highest percentages of a certain type of crime
# in a state,
# where each index is the id of that state
#if there are no cities for a certain state, that index will have -1
def percentages(type):
    ans = []
    types = ["City","Murder","Arson","Violent crime","Motor vehicle theft","State","Property crime","Aggravated assault","Robbery","Year","Burglary","Larceny theft","ID","Rape","Population"]
    typeNum = types.index(type)
    for i in range(50):
        ans.append(compareRates(i,typeNum))
    return ans

#helper function to compare the rates of crime in each city for each state
# and keep track of the most dangerous city
def compareCities(id,typeNum):
    highest = -1
    highestCity = ""
    for entry in c.execute("SELECT * FROM cities WHERE ID = %d"%(id)):
        crimes = entry[typeNum]
        pop = entry[14]
        percent = float(crimes)/pop
        if(percent > highest):
            highest = percent
            highestCity = entry[0]
    return highestCity

#type is a string of the type of crime
#returns a list of the most dangerous cities in a state
# for a certain type of crime,
# where each index is the id of that state
#if there are no cities for a certain state, that index will be an empty string
def dangerousCities(type):
    ans = []
    types = ["City","Murder","Arson","Violent crime","Motor vehicle theft","State","Property crime","Aggravated assault","Robbery","Year","Burglary","Larceny theft","ID","Rape","Population"]
    typeNum = types.index(type)
    for i in range(50):
        ans.append(compareCities(i,typeNum))
    return ans

#examples
murder = percentages('Murder')
murderCities = dangerousCities('Murder')
print murder
print murderCities

arson = percentages('Arson')
arsonCities = dangerousCities('Arson')
print arson
print arsonCities

db.commit()
db.close()
