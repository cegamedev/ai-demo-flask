var maxtime = 2000;
var host = "/";

function AjaxQueryOrderList(jsonData) {
    console.log("queryOrderList", jsonData);
    var def = $.Deferred();
    var action = host + "billing/queryOrderList.json";
    $.ajax({
        url: action,
        type: 'post',
        dataType: 'json',
        data: jsonData,
        timeout: maxtime,
        success: function(data) {
            console.log("queryOrderList-success", data);
            def.resolve(data);
        },
        error: function(data) {
            console.log("queryOrderList-error", data);
            def.reject(data);
        }
    });
    return def.promise();
}
