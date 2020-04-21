# Team Eclipse :: Mandy Zheng, Tiffany Cao, Junhee Lee, Yifan Wang
# SoftDev pd1
# P? :: ????
# 2020-04-??

from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():


if __name__ == '__main__':
    app.debug = True
    app.run()