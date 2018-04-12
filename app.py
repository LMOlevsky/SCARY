from flask import Flask, flash, render_template, request, redirect, url_for
app = Flask(__name__)

@app.route('/')
def root():
    return render_template('testmap.html')

if __name__ == "__main__":
    app.debug = True
    app.run()
