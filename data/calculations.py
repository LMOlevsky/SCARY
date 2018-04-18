import sqlite3
import csv
import dbBuilder

#helper function to compare the rates of crime in each city for each state
def compareRates(id,typeNum,c):
    highest = -1
    highestCrime = -1
    for entry in c.execute("SELECT * FROM cities WHERE ID = %d"%(id)):
        crimes = entry[typeNum]
        pop = entry[14]
        percent = float(crimes)/pop
        if(percent > highest):
            highest = percent
            highestCrime = crimes
    return highestCrime

#type is a string of the type of crime (types can be found in the types list
# in the function below), and c is the cursor
#returns a list of the highest number of a certain type of crime
# in a state,
# where each index is the id of that state
#if there are no cities for a certain state, that index will have -1
def crimeCount(type,c):
    ans = []
    types = ["City","Murder","Arson","Violent crime","Motor vehicle theft","State","Property crime","Aggravated assault","Robbery","Year","Burglary","Larceny theft","ID","Rape","Population"]
    typeNum = types.index(type)
    for i in range(50):
        ans.append(compareRates(i,typeNum,c))
    return ans

#helper function to compare the rates of crime in each city for each state
# and keep track of the most dangerous city
def compareCities(id,typeNum,c):
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

#type is a string of the type of crime, and c is the cursor
#returns a list of the most dangerous cities in a state
# for a certain type of crime,
# where each index is the id of that state
#if there are no cities for a certain state, that index will be an empty string
def dangerousCities(type,c):
    ans = []
    types = ["City","Murder","Arson","Violent crime","Motor vehicle theft","State","Property crime","Aggravated assault","Robbery","Year","Burglary","Larceny theft","ID","Rape","Population"]
    typeNum = types.index(type)
    for i in range(50):
        ans.append(compareCities(i,typeNum,c))
    return ans

if __name__ == "__main__":
    #examples
    db = dbBuilder.openDB()
    c = dbBuilder.createCursor(db)
    
    murder = crimeCount('Murder',c)
    murderCities = dangerousCities('Murder',c)
    print murder
    print murderCities

    arson = crimeCount('Arson',c)
    arsonCities = dangerousCities('Arson',c)
    print arson
    print arsonCities

    dbBuilder.closeDB(db)
