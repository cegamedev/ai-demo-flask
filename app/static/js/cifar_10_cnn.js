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
				var photoBase64 = this.result;
				$("#j-image").attr('src',photoBase64);
				$("#j-image-div").show();

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
		}


	});

});