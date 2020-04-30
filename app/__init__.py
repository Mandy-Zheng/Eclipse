# Team Eclipse :: Mandy Zheng, Tiffany Cao, Junhee Lee, Yifan Wang
# SoftDev pd1
# P04 :: Let the Data Speak
# 2020-04-??

from flask import Flask, render_template, request, redirect, url_for, session, flash
from functools import wraps
import os, random, csv
import urllib3, json, urllib

app = Flask(__name__)
countries = []
states = []
abbrev = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'American Samoa': 'AS',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'District of Columbia': 'DC',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Guam': 'GU',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Northern Mariana Islands':'MP',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Puerto Rico': 'PR',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virgin Islands': 'VI',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
}

countriesList=["Spain", "China", "Italy", "Iran", "Canada", "South Korea", "Turkey", "United Kingdom", "Egypt", "Zimbabwe", "United States"]

def loadData(data, csvfile):
    with open(csvfile, 'r') as f:
        reader = csv.reader(f)
        for row in reader:
            date = row[0].split('-')
            row[0] = ''.join(date)
            data.append(row)

@app.route('/')
def home():
    return render_template("welcome.html", title="COVID-19 Tracker", heading="Welcome to COVID-19 Tracker!")

@app.route('/query')
def query():
    states=abbrev.keys()
    return render_template("query.html", title="COVID-19 Tracker", heading="Data Selection", states=states, countries=countries, state_dict=abbrev, countriesList=countriesList)

@app.route('/data', methods=['POST'])
def displayData():
    pass

@app.route('/data', methods=['GET'])
def jsonData():
    try:
        c = [row for row in countries if row[0] == request.args['date']]
        s = [row for row in states if row[0] == request.args['date']]
    except KeyError:
        return json.dumps()

#def filter(data, region):


if __name__ == "__main__":
    app.debug = True
    loadData(countries, 'static/data/covid_countries.csv')
    loadData(states, 'static/data/covid_states.csv')
    app.run()
