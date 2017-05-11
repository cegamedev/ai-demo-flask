$(function() {



	var vu = new Vue({
		el: '#root',
		data: {
			img_lab: '???',
		},
		created: function() {
			var self = this;
		},
		watch: {},
		methods: {
			uploadImageClick: function() {
				return;
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

					AjaxFormUploadImageCifar10Cnn(imgform).then(function(data) {
						self.number_lab = data.data.predict_index;
					}, function(data) {
						Zepto.toast("网络不给力");
					});
				};
				img.src = photoBase64;

			};
		}


	});

});