$(function() {
	var vu = new Vue({
		el: '#root',
		data: {
			x: '',
			y: '?',
			x_lab: 'X',
			y_s:'?',
			loss:0
		},
		created: function() {
			var self = this;
		},
		watch: {
			'x': function(newV, oldV) {
				var self = this;
				self.y = '?';
				if (!newV) {
					self.x_lab = 'X';
					self.y_s = '?';
				} else {
					self.x_lab = newV;
					self.y_s = (self.x*self.x-0.5).toFixed(6);
				}
			},
			'y': function(newV, oldV) {
				var self = this;
				if(self.y!='?'){
					self.loss = Math.abs(self.y-self.y_s).toFixed(6);
				}
			}
		},
		methods: {
			calculaorClick: function() {
				var self = this;
				if(self.x===''){
					Zepto.toast("请输入数字");
					return;
				}
				AjaxApiCalculator({'req_x':self.x}).then(function(data) {
					var tensor = data.data.tensor;
					if(!tensor.error_code){
						self.y = tensor.data[0].toFixed(6);
					}
					else{
						Zepto.toast(tensor.message);
					}
				}, function(data) {
					Zepto.toast("网络不给力");
				});
			}
		}
	});

	Zepto.init();
});