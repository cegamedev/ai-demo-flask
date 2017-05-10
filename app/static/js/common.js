function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]);
	return null;
}

function DataURLtoBlob(dataurl) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {
		type: mime
	});
}

Vue.filter('f_date', function(value, format) {

	if (!value) {
		return;
	}

	switch (format) {
		case 'yy-mm-dd':
			return getMyDate(value, 'y') + '-' + getMyDate(value, 'm') + '-' + getMyDate(value, 'd');
			break;
		case 'yy-mm-dd h:i':
			return getMyDate(value, 'y') + '-' + getMyDate(value, 'm') + '-' + getMyDate(value, 'd') + ' ' + getMyDate(value, 'h') + ':' + getMyDate(value, 'i');
			break;
		case 'yy.mm.dd h:i':
			return getMyDate(value, 'y') + '.' + getMyDate(value, 'm') + '.' + getMyDate(value, 'd') + ' ' + getMyDate(value, 'h') + ':' + getMyDate(value, 'i');
			break;
		case 'yy-mm-dd h:i:s':
			return getMyDate(value, 'y') + '-' + getMyDate(value, 'm') + '-' + getMyDate(value, 'd') + ' ' + getMyDate(value, 'h') + ':' + getMyDate(value, 'i') + ':' + getMyDate(value, 's');
			break;
	}

	function getMyDate(str, format) {
		var oDate = new Date(str),
			oYear = oDate.getFullYear(),
			oMonth = oDate.getMonth() + 1,
			oDay = oDate.getDate(),
			oHour = oDate.getHours(),
			oMin = oDate.getMinutes(),
			oSen = oDate.getSeconds(),
			oTime = '';
		switch (format) {
			case 'y':
				oTime = oYear;
				break;
			case 'm':
				oTime = getzf(oMonth);
				break;
			case 'd':
				oTime = getzf(oDay);
				break;
			case 'h':
				oTime = getzf(oHour);
				break;
			case 'i':
				oTime = getzf(oMin);
				break;
			case 's':
				oTime = getzf(oSen);
				break;
		}
		return oTime;
	};
	//补0操作  
	function getzf(num) {
		if (parseInt(num) < 10) {
			num = '0' + num;
		}
		return num;
	}

});

Vue.filter('f_substr', function(value, len, isDot) {

	if (!value) {
		return;
	}

	var valuestr = "";

	if (value.length > len) {
		valuestr = value.substr(0, len);
		if (isDot) {
			valuestr += "...";
		}
	} else {
		valuestr = value;
	}

	return valuestr;

});


;