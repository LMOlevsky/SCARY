import csv

def csvToDictStates(file):
    source = open(file, 'rU')
    body = source.read()
    source.close() 
    listofcontents = body.split('\n')
    listofcontents.pop()
    titles = listofcontents.pop(0).split(',')
    dict = {}
    
    for element in listofcontents:
        organizedlist = element.split(',')
        #print organizedlist

        dict[organizedlist[1].upper()] = int(organizedlist[0])

    return dict
	
stateIDs = csvToDictStates('states')

def csvToDictCities(filename):
    source = open(filename, 'rU')
    body = source.read()
    source.close() 
    listofcontents = body.split('\n')
    #remove the last element if its empty
    if(listofcontents[len(listofcontents)-1] == ''):
        listofcontents.pop()
    titles = listofcontents.pop(0).split(',')
    dict = {}

    #to keep track of state, because it is only written once
    state = listofcontents[0].split(',')[0]
    #print state
    for element in listofcontents:
        #print element
        
        #to remove the extra commas in numbers
        # using the quotes to find them
        quote = element.find('"');
        while(quote != -1):
            end = element.find('"',quote+1)
            element = element[:quote] + element[quote+1:end].replace(',','') + element[end+1:]
            quote = element.find('"')
        organizedlist = element.split(',')
        #print organizedlist
        #print len(organizedlist)
        subdict = {}
        
        #add the state data, update if necessary
        if(organizedlist[0] == ''):
            subdict['State'] = state
        else:
            state = organizedlist[0]
            subdict['State'] = state
            #print state

        #add the rest of the data
        position = 1
        while position < len(organizedlist):
            #filter out 2017 data
            if(organizedlist[2] == '2017'):
                break
            data = organizedlist[position]

            #add numbers as integers
            try:
                if(data == ""):
                    data = 0
                subdict[titles[position]] = int(data)
            except:
                subdict[titles[position]] = data
            position += 1
        
        #add the state's id for map
        try:
            subdict["ID"] = stateIDs[state]
        except:
            if(state == 'DISTRICT OF COLUMBIA'):
                subdict["ID"] = 51

        #add the city to the dictionary
        dict[organizedlist[1]] = subdict
    return dict

#make a dictionary of all the given data
d0 = csvToDictCities('alabama-through-california.csv')
d1 = csvToDictCities('colorado-through-hawaii.csv')
d2 = csvToDictCities('illinois-through-missouri.csv')
d3 = csvToDictCities('montana-through-ohio.csv')
d4 = csvToDictCities('oklahoma-through-wisconsin.csv')

#combine all the cities
all = dict(d0.items() + d1.items() + d2.items() + d3.items() + d4.items())

#to remove empty key
try:
    del all[""]
except:
    print

#to create a csv to use for the database
def writeData(d):
    with open('allCities.csv', 'wb') as f:  # Just use 'w' mode in 3.x
        w = csv.writer(f)
        w.writerow(d['NEW YORK'].keys())
        for key in d:
            w.writerow(d[key].values())

writeData(all)

