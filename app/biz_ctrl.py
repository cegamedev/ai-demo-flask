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


@app.route('/api/calculator', methods=['GET', 'POST', 'PUT', 'DELETE'])
def api_calculator():
    params_arr = request.get_json()
    result = {}
    result['data'] = square_client.main(params_arr['req_x'])
    print result
    return json.dumps(result, indent=4)


@app.route('/mnist')
def mnist():
    return mnist_client.main(1)


@app.route('/mnist_t_m')
def mnist_t_m():
    return mnist_train_model.main(1)
