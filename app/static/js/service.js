var maxtime = 2000;
var host = "/";

function AjaxApiCalculator(jsonData) {
    jsonData = JSON.stringify(jsonData);
    console.log("apiCalculator", jsonData);
    var def = $.Deferred();
    var action = host + "api/calculator";
    $.ajax({
        url: action,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: jsonData,
        timeout: maxtime,
        success: function(data) {
            console.log("apiCalculator-success", data);
            def.resolve(data);
        },
        error: function(data) {
            console.log("apiCalculator-error", data);
            def.reject(data);
        }
    });
    return def.promise();
}
