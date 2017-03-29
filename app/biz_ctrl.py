# coding=utf-8

from flask import request
from . import app
import json


@app.route('/')
def index():
    return 'Hello World!'
