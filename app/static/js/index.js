$(function(){

	var vu = new Vue({
		el: '#root',
		data: {
			x:'',
			y:''
		},
		created: function() {
			var self = this;
			AjaxQueryOrderList({}).then(function(data) {
				if (!data.status) {
					console.log(data.data);
				} else {
					Zepto.toast(data.message);
				}
			}, function(data) {
				Zepto.toast("网络不给力");
			});
		},
		watch: {
			'x': function(newV, oldV) {
				var self = this;
				self.y = ''
			},
			'y': function(newV, oldV) {
				
			}
		},
		methods: {
		}
	});

	Zepto.init();
});