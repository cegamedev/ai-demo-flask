# coding=utf-8

from flask import Flask

app = Flask(__name__)
app.config.STATIC_URL = 'static'

import biz_ctrl
