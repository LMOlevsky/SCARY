from flask import Flask, flash, render_template, request, redirect, url_for
from data import calculations, dbBuilder
import sqlite3
app = Flask(__name__)

@app.route('/')
def root():
    db = dbBuilder.openDB()
    cursor = dbBuilder.createCursor(db)
    crime = calculations.percentages('Murder',cursor)
    dbBuilder.closeDB(db)
    return render_template('testmap.html', crime = crime)

if __name__ == "__main__":
    app.debug = True
    app.run()
