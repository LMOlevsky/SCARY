import sqlite3
import csv
import csvToDict
import dbBuilder

#c is the cursor
#returns a list where each index is the name of the state with that id
def getStates(c):
    stateIDs = csvToDict.csvToDictStates('./data/states')
    ans = [''] * 50
    for entry in stateIDs:
        ans[stateIDs[entry]] = entry
    return ans

#type is the crime, c is the cursor
#returns a list where each index is a dictionary with the city name
# as the key and the deaths as the value
def getCitiesStats(c):
    ans = []
    types = ["City","Murder","Arson","Violent crime","Motor vehicle theft","State","Property crime","Aggravated assault","Robbery","Year","Burglary","Larceny theft","ID","Rape","Population"]
    for i in range(0,50):
        data = []
        for entry in c.execute("SELECT * FROM cities WHERE ID = %d"%(i)):
            stats = []
            stats.append(entry[0])
            stats.append(entry[1])
            stats.append(entry[2])
            stats.append(entry[12])
            stats.append(entry[4])
            stats.append(entry[6])
        
            data.append(stats)
        ans.append(data)
    return ans 

#helper function to compare the rates of crime in each city for each state
def compareRates(id,typeNum,c):
    highest = -1
    for entry in c.execute("SELECT * FROM cities WHERE ID = %d"%(id)):
        crimes = entry[typeNum]
        pop = entry[14]
        percent = float(crimes)/pop
        if(percent > highest):
            highest = percent
    return highest

#type is a string of the type of crime (types can be found in the types list
# in the function below), and c is the cursor
#returns a list of the highest percentages of a certain type of crime
# in a state,
# where each index is the id of that state
#if there are no cities for a certain state, that index will have -1
def percentages(type,c):
    ans = []
    types = ["City","Murder","Arson","Violent crime","Motor vehicle theft","State","Property crime","Aggravated assault","Robbery","Year","Burglary","Larceny theft","ID","Rape","Population"]
    typeNum = types.index(type)
    for i in range(50):
        ans.append(compareRates(i,typeNum,c))
    return ans

#helper function to compare the rates of crime in each city for each state
def compareHighest(id,typeNum,c):
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
        ans.append(compareHighest(i,typeNum,c))
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

    
    states = getStates(c);
    print states
    print len(states)

    cities = getCitiesStats(c);
    print cities
    print len(cities)
    
    murder = percentages('Murder',c)
    murderHighest = crimeCount('Murder',c)
    murderCities = dangerousCities('Murder',c)
    print murder
    print murderHighest
    print murderCities

    arson = percentages('Arson',c)
    arsonHighest = crimeCount('Arson',c)
    arsonCities = dangerousCities('Arson',c)
    print arson
    print arsonHighest
    print arsonCities

    dbBuilder.closeDB(db)
