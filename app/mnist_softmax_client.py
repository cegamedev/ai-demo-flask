# Copyright 2016 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ==============================================================================

#!/usr/bin/env python2.7

"""A client that talks to tensorflow_model_server loaded with mnist model.

The client downloads test images of mnist data set, queries the service with
such test images to get predictions, and calculates the inference error rate.

Typical usage example:

    mnist_client.py --num_tests=100 --server=localhost:9000
"""

from __future__ import print_function

# This is a placeholder for a Google-internal import.

from grpc.beta import implementations
import numpy as np
import tensorflow as tf

from tensorflow_serving.apis import predict_pb2, prediction_service_pb2


class _ResultCounter(object):
    """Counter for the prediction results."""

    def __init__():
        self._testtest = 1


def do_inference(hostport, work_dir, req_x):
    req_x = np.array([req_x], dtype=np.float32)
    host, port = hostport.split(':')
    channel = implementations.insecure_channel(host, int(port))
    stub = prediction_service_pb2.beta_create_PredictionService_stub(channel)

    request = predict_pb2.PredictRequest()
    request.model_spec.name = 'mnist_softmax'
    request.model_spec.signature_name = 'predict_x'
    request.inputs['req_x'].CopyFrom(
        tf.contrib.util.make_tensor_proto(req_x))

    result_future = stub.Predict.future(request, 5.0)  # 5 seconds

    exception = result_future.exception()
    response_data = {'tensor': {}}
    if exception:
        response_data['tensor']['error_code'] = 1
        response_data = exception
    else:
        response_data['tensor']['error_code'] = 0
        response_data['tensor']['data'] = np.array(result_future.result().outputs[
            'res_y'].float_val).tolist()
    return response_data


def main(req_x):
    res_y = do_inference('littleorangelamp.com:9001', '/tmp', req_x)
    return res_y


if __name__ == '__main__':
    tf.app.run()
