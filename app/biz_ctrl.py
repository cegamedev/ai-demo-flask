# coding=utf-8

from flask import request, redirect
from . import app, square_client, mnist_softmax_client, mnist_input_data
import json
import cv2
from PIL import Image
import numpy as np

'''
入口
'''


@app.route('/')
def index():
    return redirect('/static/index.html')


@app.route('/static')
def static_entry():
    return redirect('/static/index.html')

'''
公共
'''


@app.errorhandler(404)
def page_not_found(error):
    return 'error 404', 404


'''
具体功能
'''


# 模拟一元二次方程
@app.route('/api/calculator', methods=['GET', 'POST', 'PUT', 'DELETE'])
def api_calculator():
    params_arr = request.get_json()
    result = {}
    result['data'] = square_client.main(params_arr['req_x'])
    print result
    return json.dumps(result, indent=4)


# softmax手写数字识别
@app.route('/api/upload_image', methods=['GET', 'POST', 'PUT', 'DELETE'])
def upload_image():
    file = request.files['file']
    size = (28, 28)
    im = Image.open(file)
    im.thumbnail(size)
    # im.save('app/static/img/test.png')
    # 转灰度
    gray_im = im.convert('L')
    # im.save('app/static/img/test_auto.png')
    # 转数组，并由二维转一维

    gray_im = Image.open('app/static/img/test_cv.png')

    gray_im_arr = np.array(gray_im).reshape(784) / 255.0
    result = {}
    result['data'] = mnist_softmax_client.main(gray_im_arr)
    soft_arr = result['data']['tensor']['data']
    print(soft_arr)
    max_index = soft_arr.index(max(soft_arr))
    print(max_index)
    result['data']['predict_index'] = max_index
    return json.dumps(result, indent=4)


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
