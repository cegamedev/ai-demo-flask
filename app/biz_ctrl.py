# coding=utf-8

from flask import request, redirect
from . import app, square_client, mnist_pre_make, mnist_softmax_client, mnist_input_data
import json
import cv2
from PIL import Image, ImageFilter
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
    # size = (28, 28)
    img = Image.open(file)
    # img = img.filter(ImageFilter.CONTOUR)
    # img.thumbnail(size)
    img.save('app/static/img/mnist_tmp.png')
    # # 转灰度
    # gray_im = img.convert('L')
    # gray_im.save('app/static/img/test_auto.png')
    # # 转数组，并由二维转一维

    # # gray_im = Image.open('app/static/img/test_cv.png')

    # img = cv2.imread('app/static/img/test_mnist_cv_9.png', 0)
    # img = cv2.resize(img, (28, 28), interpolation=cv2.INTER_AREA)
    # img = img.convert('F')
    # cv2.imwrite("app/static/img/test.png", img)
    # img = cv2.blur(img, (2, 2))
    # img = cv2.GaussianBlur(img, (2, 2), 0)
    # img = cv2.bilateralFilter(img, 2, 2, 2)
    # img = cv2.medianBlur(img, 3)

    # cv2.imwrite("app/static/img/test_auto.png", img)

    # img = cv2.threshold(img, 127, 255, cv2.THRESH_TRUNC)

    # img = cv2.adaptiveThreshold(
    #     img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 5, 0)

    # img = cv2.GaussianBlur(img, (3, 3), 0)

    # img = cv2.adaptiveThreshold(
    #     img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 5, 0)
    # cv2.imwrite("app/static/img/test_auto2.png", img)

    # img = Image.open('app/static/img/test_m_1.png')
    # img = img.convert('F')

    # img = cv2.equalizeHist(img)
    # cv2.imwrite("app/static/img/test_mnist_9.png", img)

    # ret, thresh1 = cv2.threshold(img, 44,
    #                              0, cv2.THRESH_TRUNC)

    # ret, thresh1 = cv2.threshold(img, 0,
    #                              255, cv2.THRESH_BINARY)

    # ret, thresh1 = cv2.threshold(img, 44,
    #                              255, cv2.THRESH_TOZERO_INV)

    # cv2.imwrite("app/static/img/test_mnist_9.png", thresh1)

    img = mnist_pre_make.main('app/static/img/mnist_tmp.png')

    gray_im_arr = np.array(img).reshape(784) / 255.0

    # idx = gray_im_arr != 0
    # gray_im_arr_f_mean = np.mean(gray_im_arr[idx])

    # print(gray_im_arr_f_mean)

    # g_mean = np.mean(gray_im_arr)
    # g_var = np.var(gray_im_arr)
    # print(g_mean)
    # print(g_var)
    # gray_im_arr = gray_im_arr - g_mean
    # print(np.mean(gray_im_arr))
    # gray_im_arr = gray_im_arr / g_var
    # print(np.var(gray_im_arr))
    # print(gray_im_arr)

    # gray_im_arr = gray_im_arr - np.mean(gray_im_arr)

    # gray_im_arr = gray_im_arr / (np.var(gray_im_arr) + 0.00001)

    # print(gray_im_arr)

    result = {}
    result['data'] = mnist_softmax_client.main(gray_im_arr)
    soft_arr = result['data']['tensor']['data']
    print(soft_arr)
    max_index = soft_arr.index(max(soft_arr))
    print(max_index)
    result['data']['predict_index'] = max_index
    return json.dumps(result, indent=4)
