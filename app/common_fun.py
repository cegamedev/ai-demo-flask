# coding=utf-8

from PIL import Image, ImageFilter


def resize(w, h, w_box, h_box, pil_image):
    ''''' 
    resize a pil_image object so it will fit into 
    a box of size w_box times h_box, but retain aspect ratio 
    对一个pil_image对象进行缩放，让它在一个矩形框内，还能保持比例 
    '''

    f1 = 1.0 * w_box / w  # 1.0 forces float division in Python2
    f2 = 1.0 * h_box / h
    factor = min([f1, f2])
    # print(f1, f2, factor) # test
    # use best down-sizing filter
    width = int(w * factor)
    height = int(h * factor)
    return pil_image.resize((width, height), Image.ANTIALIAS)


# 标准化,mu（即均值）用np.average()，sigma（即标准差）用np.std()即可
def Z_ScoreNormalization(x, mu, sigma):
    x = (x - mu) / sigma
    return x
