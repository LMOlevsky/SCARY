from flask import Flask, flash, render_template, request, redirect, url_for
import sqlite3
from data import calculations
app = Flask(__name__)

@app.route('/')
def root():
    crime = calculations.percentages('Murder')
    print crime
    return render_template('testmap.html', crime = crime)

if __name__ == "__main__":
    app.debug = True
    app.run()
