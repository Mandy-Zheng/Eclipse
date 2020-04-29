# Team Eclipse :: Mandy Zheng, Tiffany Cao, Junhee Lee, Yifan Wang
# SoftDev pd1
# P04 :: Let the Data Speak
# 2020-04-??

from flask import Flask, render_template, request, redirect, url_for, session, flash

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("welcome.html", title="Covid-19 Tracker", heading="Welcome to Covid-19 Tracker!")

@app.route('/query')
def query():
    return render_template("query.html", title="Data Selection", heading = "Data Selection")

@app.route('/data')
def displayData():
    pass

if __name__ == '__main__':
    app.debug = True
    app.run()
