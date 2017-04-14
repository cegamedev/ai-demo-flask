$(function() {
	var vu = new Vue({
		el: '#root',
		data: {
			x: '',
			y: '?',
			x_lab: 'X'
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
				} else {
					self.x_lab = newV;
				}
			},
			'y': function(newV, oldV) {

			}
		},
		methods: {}
	});

	Zepto.init();
});