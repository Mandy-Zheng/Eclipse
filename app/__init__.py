# Team Eclipse :: Mandy Zheng, Tiffany Cao, Junhee Lee, Yifan Wang
# SoftDev pd1
# P04 :: Let the Data Speak
# 2020-04-??

from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("_base.html", title="Covid-19 Tracker",heading="Welcome to Covid-19 Tracker!")

@app.route('/query')
def query():
    return render_template("query.html", title="Covid-19 Tracker")
@app.route('/data')

def displayData():
    pass

if __name__ == '__main__':
    app.debug = True
    app.run()
