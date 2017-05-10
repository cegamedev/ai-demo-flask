var maxtime = 5000;
var host = "/";

function AjaxApiCalculator(jsonData) {
    jsonData = JSON.stringify(jsonData);
    console.log("api/calculator", jsonData);
    var def = $.Deferred();
    var action = host + "api/calculator";
    $.ajax({
        url: action,
        type: 'post',
        dataType: 'json',
        contentType: 'api/calculator/json; charset=UTF-8',
        data: jsonData,
        timeout: maxtime,
        success: function(data) {
            console.log("api/calculator-success", data);
            def.resolve(data);
        },
        error: function(data) {
            console.log("api/calculator-error", data);
            def.reject(data);
        }
    });
    return def.promise();
}

function AjaxFormUploadImage(formData) {
    console.log("api/upload_image", formData);
    var def = $.Deferred();
    var action = host + "api/upload_image";
    $.ajax({
        url: action,
        type: "post",
        dataType: 'json',
        data: formData,
        async: true,
        processData: false,
        contentType: false,
        timeout: maxtime,
        success: function(data) {
            console.log("api/upload_image-success", data);
            def.resolve(data);
        },
        error: function(data) {
            console.log("api/upload_image-error", data);
            def.reject(data);
        }
    });
    return def.promise();
}

function AjaxFormUploadImageSimpleCnn(formData) {
    console.log("api/upload_image_simple_cnn", formData);
    var def = $.Deferred();
    var action = host + "api/upload_image_simple_cnn";
    $.ajax({
        url: action,
        type: "post",
        dataType: 'json',
        data: formData,
        async: true,
        processData: false,
        contentType: false,
        timeout: maxtime,
        success: function(data) {
            console.log("api/upload_image_simple_cnn-success", data);
            def.resolve(data);
        },
        error: function(data) {
            console.log("api/upload_image_simple_cnn-error", data);
            def.reject(data);
        }
    });
    return def.promise();
}

function AjaxFormUploadImageCifar10Cnn(formData) {
    console.log("api/upload_image_cifar10_cnn", formData);
    var def = $.Deferred();
    var action = host + "api/upload_image_cifar10_cnn";
    $.ajax({
        url: action,
        type: "post",
        dataType: 'json',
        data: formData,
        async: true,
        processData: false,
        contentType: false,
        timeout: maxtime,
        success: function(data) {
            console.log("api/upload_image_cifar10_cnn-success", data);
            def.resolve(data);
        },
        error: function(data) {
            console.log("api/upload_image_cifar10_cnn-error", data);
            def.reject(data);
        }
    });
    return def.promise();
}