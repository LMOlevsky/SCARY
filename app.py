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
    violent2 = calculations.crimeCount('Violent crime',cursor)
    assault2=calculations.crimeCount('Aggravated assault',cursor)
    burglary2=calculations.crimeCount('Burglary',cursor)
    larceny2=calculations.crimeCount('Larceny theft',cursor)
    states=calculations.getStates(cursor)
    dbBuilder.closeDB(db)
    return render_template('testmap.html',
                           murder=murder, arson=arson,
                           rape=rape, moto_theft=moto_theft, prop=prop, murder2=murder2, arson2=arson2,
                           rape2=rape2, moto_theft2=moto_theft2, prop2=prop2, violent2=violent2, assault2=assault2, burglary2=burglary2, larceny2=larceny2, states=states
    )

if __name__ == "__main__":
    app.debug = True
    app.run()
