# coding=utf-8

from flask import request, redirect
from . import app, square_client, mnist_softmax_client, mnist_input_data
import json
import Image


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


@app.route('/api/upload_image', methods=['GET', 'POST', 'PUT', 'DELETE'])
def upload_image():
    file = request.files['file']
    size = (28, 28)
    im = Image.open(file)
    out = im.resize(size, Image.ANTIALIAS)
    out.save('MNIST_data/test.png')
    return {'s': 'over'}


@app.route('/mnist')
def mnist():
    test_data_set = mnist_input_data.read_data_sets(
        'MNIST_data', one_hot=True).test
    image, label = test_data_set.next_batch(1)
    req_x = image[0]
    result = mnist_softmax_client.main(req_x)
    print(result)
    data_arr = result['tensor']['data']
    max_index = data_arr.index(max(data_arr))
    print(max_index)
    return 'over'
