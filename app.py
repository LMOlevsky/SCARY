from flask import Flask, flash, render_template, request, redirect, url_for
from data import calculations
import sqlite3
app = Flask(__name__)

@app.route('/')
def root():
    crime = calculations.percentages('Murder')
    print crime
    return render_template('testmap.html', crime = crime)

if __name__ == "__main__":
    app.debug = True
    app.run()
