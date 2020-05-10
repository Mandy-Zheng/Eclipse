# Data Visualization by Eclipse
# Covid-19 Tracker  
### by Team Eclipse
Roster: Amanda Zheng (PM),
        Tiffany Cao,
        Junhee Lee,
        Yifan Wang

SoftDev pd1

P04: Let the Data Speak

2020-04-24

### Description:
Our Covid-19 Tracker aims to give a comprehensive overview of the day-to-day changes of the spread of the coronavirus. Our focus is on a global scale, as well as a closer look on the United States. Starting from January to April 2020, the tracker can report visually the number of total cases, recoveries, and deaths per day on multiple graphs. The tracker also has an interactive, exploratory interface for users. They have the option of choosing which data they want to be included (they have the three choices listed before) and which countries or states they want to compare. The data for each state and/or country is represented with either a bar chart or a pie chart depending on the options chosen. Hovering over some charts will have a pop-up that shows information and numerical data. Sliders will be available for users to choose the dates, but a continuous, automatic animation of the daily changes can also be presented.

### How to Run
<!-- TODO: add details!!! -->
- `git clone https://github.com/Mandy-Zheng/Eclipse.git`
- `python3 -m venv covid19_venv`
- `. covid19_venv/bin/activate` - note the space!
- `cd Eclipse/`
- `pip3 install -r requirements.txt`
- `cd app/`
- `python3 app.py`

when complete
- `Ctrl+C`
- `deactivate`

#### Warning:
- Some functionalities do not work on Safari Browsers
      - Depending on the version of safari, the issues can range from minor styling mishaps to not rendering any of the graphs at all
- The recommended browser is Chrome or Firefox
#### Sources:
        - https://www.d3-graph-gallery.com/graph/pie_changeData.html
        - https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2
        - https://bl.ocks.org/d3noob/8952219
