import csv

def csvToDict(filename):
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
    print state
    for element in listofcontents:
        #ALABAMA,BIRMINGHAM,2016,"212,549","1,732",44,75,460,"1,153","5,875","1,318","3,807",750,76
        #print element
        #to remove the extra commas in numbers
        # using the quotes to find themxs
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
            print state

        #add the rest of the data
        position = 1
        while position < len(organizedlist):
            #filter out 2017 data
            if(organizedlist[2] == '2017'):
                break
            data = organizedlist[position]
            #print data
            #if(data.find('@') != -1):
            #    data = data.replace('@','')
            try:
                subdict[titles[position]] = int(data)
            except:
                subdict[titles[position]] = data
            #print position
            position += 1
        dict[organizedlist[1]] = subdict
    return dict
	
d0 = csvToDict('alabama-through-california.csv')
d1 = csvToDict('colorado-through-hawaii.csv')
d2 = csvToDict('illinois-through-missouri.csv')
d3 = csvToDict('montana-through-ohio.csv')
d4 = csvToDict('oklahoma-through-wisconsin.csv')

all = dict(d0.items() + d1.items() + d2.items() + d3.items() + d4.items())

#to remove empty key
try:
    del all[""]
except:
    print
    
print

#to create a csv to use for the database
def writeData(d):
    with open('allCities.csv', 'wb') as f:  # Just use 'w' mode in 3.x
        w = csv.writer(f)
        w.writerow(d['NEW YORK'].keys())
        for key in d:
            #print
            print key
            if key == "WISCONSIN":
                print key
            w.writerow(d[key].values())

writeData(all)
