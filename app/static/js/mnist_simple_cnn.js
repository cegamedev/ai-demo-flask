$(function() {

	var vu = new Vue({
		el: '#root',
		data: {
			number_lab: '???',
		},
		created: function() {
			var self = this;
		},
		watch: {
		},
		methods: {
			uploadImageClick: function() {
				var self = this;
				var canvas = document.getElementById('canvas');
				var photoBase64 = canvas.toDataURL('image/png');
				var photoBlob = DataURLtoBlob(photoBase64);
				var form = document.forms[0];
				var imgform = new FormData(form);
				imgform.append('file', photoBlob, 'temp.png');

				AjaxFormUploadImageSimpleCnn(imgform).then(function(data) {
					self.number_lab = data.data.predict_index;
				}, function(data) {
					Zepto.toast("网络不给力");
				});
			}
		}
	});

	Zepto.init();

	cavan_fun();

	function cavan_fun() {
		var canvas = document.getElementById('canvas');
		canvas.addEventListener('mousemove', onMouseMove, false);
		canvas.addEventListener('mousedown', onMouseDown, false);
		canvas.addEventListener('mouseup', onMouseUp, false);

		canvas.addEventListener('touchstart', onMouseDown, false);
		canvas.addEventListener('touchmove', onMouseMove, false);
		canvas.addEventListener('touchend', onMouseUp, false)


		canvas.height = 300;
		canvas.width = 300;
		// canvas.width = getWidth();
		// canvas.width = $('.j-cbwidth').width();
		var ctx = canvas.getContext('2d');

		ctx.lineWidth = 6.0; // 设置线宽
		ctx.strokeStyle = "#cc0"; // 设置线的颜色

		var flag = false;

		function onMouseMove(evt) {
			evt.preventDefault();
			if (flag) {
				var p = pos(evt);
				ctx.lineTo(p.x, p.y);
				// ctx.lineWidth = 6.0; // 设置线宽
				// ctx.shadowColor = "#ccc";
				// ctx.shadowBlur = 1;
				// ctx.shadowOffsetX = 6;
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
			vu.$data.number_lab = '???';
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}, false);


		function pos(event) {
			var x, y;
			if (isTouch(event)) {
				x = event.touches[0].pageX - $("#canvas").offset().left;
				y = event.touches[0].pageY - $("#canvas").offset().top;
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
	}

});