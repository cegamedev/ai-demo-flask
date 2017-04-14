# coding=utf-8

from flask import request, redirect
from . import app, mnist_client, square_client, mnist_train_model
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


@app.route('/page_square')
def page_square():
    return square_client.main()


@app.route('/mnist_t_m')
def mnist_t_m():
    return mnist_train_model.main(1)
