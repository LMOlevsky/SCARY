from flask import Flask, flash, render_template, request, redirect, url_for
from data import calculations, dbBuilder
import sqlite3
import string
app = Flask(__name__)

@app.route('/')
def root():
    db = dbBuilder.openDB()
    cursor = dbBuilder.createCursor(db)
    murder = calculations.percentages('Murder',cursor)
    arson = calculations.percentages('Arson',cursor)
    rape = calculations.percentages('Rape',cursor)
    moto_theft = calculations.percentages('Motor vehicle theft',cursor)
    prop = calculations.percentages('Property crime',cursor)
     ##
    murder2 = calculations.crimeCount('Murder',cursor)
    arson2 = calculations.crimeCount('Arson',cursor)
    rape2 = calculations.crimeCount('Rape',cursor)
    moto_theft2 = calculations.crimeCount('Motor vehicle theft',cursor)
    prop2 = calculations.crimeCount('Property crime',cursor)
    states=calculations.getStates(cursor)
    cities = []
    cities.append(calculations.dangerousCities("Murder", cursor))
    cities.append(calculations.dangerousCities("Arson", cursor))
    cities.append(calculations.dangerousCities("Rape", cursor))
    cities.append(calculations.dangerousCities("Motor vehicle theft", cursor))
    cities.append(calculations.dangerousCities("Property crime", cursor))
    citiesStats=calculations.getCitiesStats(cursor)
    dbBuilder.closeDB(db)
    return render_template('testmap.html',
                           murder=murder, arson=arson,
                           rape=rape, moto_theft=moto_theft, prop=prop, murder2=murder2, arson2=arson2, rape2=rape2, moto_theft2=moto_theft2, prop2=prop2, states=states, cities = cities, citiesStats=citiesStats)

if __name__ == "__main__":
    app.debug = True
    app.run()
