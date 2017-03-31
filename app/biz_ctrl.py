# coding=utf-8

from flask import request, redirect
from . import app, mnist_client
import json


@app.route('/')
def index():
    return redirect('/static/index.html')


@app.route('/static')
def static_entry():
    return redirect('/static/index.html')


@app.errorhandler(404)
def page_not_found(error):
    return 'error 404', 404


@app.route('/mnist')
def mnist():
    return mnist_client.main(1)
