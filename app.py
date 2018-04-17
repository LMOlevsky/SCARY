from flask import Flask, flash, render_template, request, redirect, url_for
from data import calculations, dbBuilder
import sqlite3
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
    dbBuilder.closeDB(db)
    return render_template('testmap.html',
                           murder=murder, arson=arson,
                           rape=rape, moto_theft=moto_theft, prop=prop
    )

if __name__ == "__main__":
    app.debug = True
    app.run()
