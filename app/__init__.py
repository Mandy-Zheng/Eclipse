# Team Eclipse :: Mandy Zheng, Tiffany Cao, Junhee Lee, Yifan Wang
# SoftDev pd1
# P04 :: Let the Data Speak
# 2020-04-??

from flask import Flask, render_template, request, redirect, url_for, session, flash
from functools import wraps
from datetime import date, timedelta
from utl.constants import *
import os, random, csv
import urllib3, json, urllib

app = Flask(__name__)
countries = []
states = []

def loadData(data, csvfile):
    with open(csvfile, 'r') as f:
        reader = csv.reader(f)
        next(reader, None)
        for row in reader:
            indDate = row[0].split('-')
            datestring = ''.join(indDate)
            row[0] = date.fromisoformat('-'.join((datestring[:4], datestring[4:6], datestring[6:])))
            data.append(row)

@app.route('/')
def home():
    return render_template("welcome.html", title="COVID-19 Tracker", heading="Welcome to COVID-19 Tracker!", date = "May 4, 2020")

@app.route('/query', methods=['GET'])
def query():
    statesList=abbrev.keys()
    return render_template("query.html", title="COVID-19 Tracker", states=statesList, countries=countries, state_dict=abbrev, countriesList=countriesList)

@app.route('/query', methods=['POST'])
def encode():
    #encode data recieved from the query form and redirect to a proper url for /data
    dataRequestS=[]
    dataRequestC=[]
    if request.form.get("allStates")=='on':
        dataRequestS=abbrev.keys()
    else:
        for checkbox in abbrev.keys():
            value = request.form.get(checkbox)
            if value=='on':
                dataRequestS.append(checkbox)
    if request.form.get("allCountries")=='on':
        dataRequestC=countriesList
    else:
        for checkbox in countriesList:
            value = request.form.get(checkbox)
            if value=='on':
                dataRequestC.append(checkbox)
    statesList = list(abbrev.keys())
    statesList.sort()
    stateStr = ''
    stateArg = 0
    for state in dataRequestS:
        stateArg += 2 ** statesList.index(state)
    while stateArg > 0:
        stateStr = encodestr[stateArg % 64] + stateStr
        stateArg = stateArg // 64
    countryStr = ''
    countryArg = 0
    for country in dataRequestC:
        countryArg += 2 ** countriesList.index(country)
    while countryArg > 0:
        countryStr = encodestr[countryArg % 64] + countryStr
        countryArg = countryArg // 64
    return redirect('/data?q=%s~%s' % (countryStr, stateStr))

def decode(argstr):
    #decodes the encoded data to turn it into a list of countries and a list of states
    statesList = list(abbrev.keys())
    statesList.sort()
    rawC, rawS = argstr.split('~')
    intC = 0
    for char in rawC:
        intC *= 64
        intC += encodestr.index(char)
    intS = 0
    for char in rawS:
        intS *= 64
        intS += encodestr.index(char)
    c = []
    s = []
    for country in countriesList:
        if intC % 2:
            c.append(country)
        intC = intC // 2
        if not intC:
            break
    for state in abbrev.keys():
        if intS % 2:
            s.append(state)
        intS = intS // 2
        if not intS:
            break
    return [c, s]

@app.route('/data', methods=['GET'])
def displayData():
    dataRequestC, dataRequestS = decode(request.args['q'])
    if(len(dataRequestC) == 0 and len(dataRequestS) == 0 ):
        statesList=abbrev.keys()
        error='Please Select at least One Location'
        return render_template("query.html", title="COVID-19 Tracker", states=statesList, countries=countries, state_dict=abbrev, countriesList=countriesList,error=error)
    return render_template("data.html", states=dataRequestS, countries=dataRequestC)

@app.route('/data', methods=['POST'])
def getData():
    cList, sList = decode(request.form['q'])
    day = date.fromisoformat('2020-01-21') + timedelta(days=int(request.form['date']))
    c = [format(row) for row in countries if row[0] == day and row[1] in cList]
    for country in ['Australia', 'Canada', 'China', 'Denmark', 'France', 'Netherlands', 'United Kingdom']:
        if country in cList:
            temp = [data for data in c if data['location'] == country]
            new = {'location': country, 'cases': 0, 'recovered': 0, 'deaths': 0}
            for entry in temp:
                c.remove(entry)
                new['cases'] += int(entry['cases'])
                new['recovered'] += int(entry['recovered'])
                new['deaths'] += int(entry['deaths'])
            c.append(new)
    s = [format(row, True) for row in states if row[0] == day and full(row[1]) in sList]
    for state in sList:
        if state not in [entry['location'] for entry in s]:
            s.append({'location': state, 'cases': 0, 'recovered': 0, 'deaths': 0})
    return {'date': day.isoformat(), 'data': c + s}

def format(data, state=False):
    if state:
        return {
            'location': lineBreak(full(data[1])),
            'cases': data[2] if data[2] != '' else 0,
            'recovered': data[11] if data[11] != '' else 0,
            'deaths': data[14] if data[14] != '' else 0
            }
    else:
        return {
            'location': lineBreak(data[1]),
            'cases': data[5] if data[5] != '' else 0,
            'recovered': data[6] if data[6] != '' else 0,
            'deaths': data[7] if data[7] != '' else 0
            }

def full(short):
    return [name for name in abbrev.keys() if abbrev[name] == short][0]

def lineBreak(name):
    if len(name) > 12:
        l = name.split()
        if len(l) > 1:
            return '. '.join([word[0] for word in l])
    return name

if __name__ == "__main__":
    app.debug = True
    loadData(countries, 'static/data/covid_countries.csv')
    loadData(states, 'static/data/covid_states.csv')
    app.run()
