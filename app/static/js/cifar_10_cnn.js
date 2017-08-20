$(function() {



	var vu = new Vue({
		el: '#root',
		data: {
			img_lab: '???',
			const_data:{
				'0':'飞机',
				'1':'小汽车',
				'2':'鸟',
				'3':'猫',
				'4':'鹿',
				'5':'狗',
				'6':'青蛙',
				'7':'马',
				'8':'船',
				'9':'卡车'
			}
		},
		created: function() {
			var self = this;
		},
		watch: {}
	});

	Zepto.init();

	$("#j-input-img").change(function() {
		var fileReader = new FileReader(),
			files = this.files,
			file;

		if (!files.length) {
			return;
		}

		file = files[0];

		if (/^image\/\w+$/.test(file.type)) {
			fileReader.readAsDataURL(file);
			fileReader.onload = function(e) {
				var canvas = document.getElementById("j-canvas");
				var ctx = canvas.getContext("2d");

				var photoBase64 = this.result;

				var img = new Image();
				img.onload = function() {
					var imgW = img.width;
					var imgH = img.height;
					
					var sx = sy = swh = 0;
					if (imgW > imgH) {
						swh = imgH;
						sx = (imgW - imgH) / 2;
						sy = 0;
					} else {
						swh = imgW;
						sx = 0;
						sy = (imgH - imgW) / 2;
					}
					canvas.width = canvas.height = swh;
					ctx.drawImage(img, sx, sy, swh, swh, 0, 0, swh, swh);

					var photoBase64 = canvas.toDataURL('image/png');
					$('#j-image').attr('src',photoBase64);
					$('#j-image-div').show();
					var photoBlob = DataURLtoBlob(photoBase64);
					var form = document.forms[0];
					var imgform = new FormData(form);
					imgform.append('file', photoBlob, 'temp.png');

					Zepto.showIndicator();
					AjaxFormUploadImageCifar10Cnn(imgform).then(function(data) {
						Zepto.hideIndicator();
						console.log(data);
						vu.$data.img_lab = vu.$data.const_data[data.data];
					}, function(data) {
						Zepto.hideIndicator();
						Zepto.toast("网络不给力");
					});
				};
				img.src = photoBase64;

			};
		}


	});

});