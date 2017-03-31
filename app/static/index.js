var canvas = document.getElementById('canvas');
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);

canvas.addEventListener('touchstart', onMouseDown, false);
canvas.addEventListener('touchmove', onMouseMove, false);
canvas.addEventListener('touchend', onMouseUp, false)


canvas.height = 300;
canvas.width = getWidth() - 50;
var ctx = canvas.getContext('2d');

ctx.lineWidth = 3.0; // 设置线宽
ctx.strokeStyle = "#CC0000"; // 设置线的颜色

var flag = false;

function onMouseMove(evt) {
	evt.preventDefault();
	if (flag) {
		var p = pos(evt);
		ctx.lineTo(p.x, p.y);
		ctx.lineWidth = 6.0; // 设置线宽
		ctx.shadowColor = "#CC0000";
		ctx.shadowBlur = 1;
		//ctx.shadowOffsetX = 6;
		ctx.stroke();
	}
}

function onMouseDown(evt) {
	evt.preventDefault();
	ctx.beginPath();
	var p = pos(evt);
	ctx.moveTo(p.x, p.y);
	flag = true;
}


function onMouseUp(evt) {
	evt.preventDefault();
	flag = false;
}


var clear = document.getElementById('c');
clear.addEventListener('click', function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}, false);


function pos(event) {
	var x, y;
	if (isTouch(event)) {
		x = event.touches[0].pageX;
		y = event.touches[0].pageY;
	} else {
		x = event.layerX;
		y = event.layerY;
	}
	return {
		x: x,
		y: y
	};
}

function isTouch(event) {
	var type = event.type;
	if (type.indexOf('touch') >= 0) {
		return true;
	} else {
		return false;
	}
}

function getWidth() {
	var xWidth = null;

	if (window.innerWidth !== null) {
		xWidth = window.innerWidth;
	} else {
		xWidth = document.body.clientWidth;
	}

	return xWidth;
}