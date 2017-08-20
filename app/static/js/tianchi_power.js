$(function(){
	

	var vu = new Vue({
		el: '#root',
		data: {
			input_data1:[
			3679973,3513088,4109362,4249464,4287459,4402083,4369295,4161898,3787603,
			4041268,3903333,4085366,4168955,4214550,4047430,3817657,4155488,4015123,
			3948699,3869580,3343687,3858150,3624080,3761623,3909831,4011378,4029224,
			3487881,3867982,3811394,4109812],
			input_data2:[],
			input_data3:[],
			output_data1:[
			4066668,3925296,3177414,3566662,3757287,3841049,4018482,3691852,3918906,
 			3929441,3927760,3633339,3447496,3713833,3832844,3749554,3946919,3975839,
 			3820881,3608073,3957586,4039707,4017043,4037352,4040154,3497499,3356801,
 			3873351,4000522,4542677],
			output_data2:[
			3802036,3836385,3838868,3606765,3846012,3859169,3841262,3795979,3745376,
 			3772656,3492280,3751244,3853258,3846714,3833638,3621018,3863818,3906163,
 			3899426,3803230,3809500,3803060,3754254,3748404,3479837,3738055,3846500,
 			3828592,3816106,3786154],
			output_data3:[],
			time_id:0,
			my_chart:{},
		},
		created: function() {
			var self = this;
		},
		watch: {},
		methods:{
			predictBtnClick:function(){
				var self = this;
				var step = 1;
				self.time_id = setInterval(function(){
					if(step>30){
						clearInterval(self.time_id);
						return;
					}
					else{
						_predictData(step);
					}
					step++;
				},700);

			},
			resetBtnClick:function(){
				var self = this;
				clearInterval(self.time_id);
				_resetData();
			}
		}
	});

	vu.$data.my_chart = _setEcart();
	_resetData();

	function _resetData(){
		var input_data1 = vu.$data.input_data1;
		var input_data2 = vu.$data.input_data2;
		var input_data3 = vu.$data.input_data3;
		var output_data1 = vu.$data.output_data1;
		var output_data2 = vu.$data.output_data2;
		var output_data3 = vu.$data.output_data3;

		input_data2 = DeepCopy(input_data1);
		input_data3 = [];
		output_data3 = [];

		vu.$data.input_data2 = input_data2;
		vu.$data.input_data3 = input_data3;
		vu.$data.output_data3 = output_data3;

		_refreshData();
	}

	function _predictData(step){
		var input_data1 = vu.$data.input_data1;
		var input_data2 = vu.$data.input_data2;
		var input_data3 = vu.$data.input_data3;
		var output_data1 = vu.$data.output_data1;
		var output_data2 = vu.$data.output_data2;
		var output_data3 = vu.$data.output_data3;

		output_data3.push(output_data2[step-1]);
		input_data2.shift();
		if(step>1){
			input_data3.push(output_data3[step-2]);
		}

		vu.$data.input_data2 = input_data2;
		vu.$data.input_data3 = input_data3;
		vu.$data.output_data3 = output_data3;

		_refreshData();
	}

	function _setEcart(){
		var myChart = echarts.init(document.getElementById('main'));
		var colors = ['#5793f3', '#d14a61'];
		option = {
		    color: colors,
		    legend: {
		        data:['真实值', '预测值']
		    },
		    xAxis: [
		        {
		            type: 'category',
		            axisTick: {
		                alignWithLabel: true
		            },
		            axisLine: {
		                onZero: false,
		                lineStyle: {
		                    color: colors[0]
		                }
		            },
		            data: [
		            "09-01","09-02","09-03","09-04","09-05","09-06","09-07","09-08","09-09","09-10",
		            "09-11","09-12","09-13","09-14","09-15","09-16","09-17","09-18","09-19","09-20",
		            "09-21","09-22","09-23","09-24","09-25","09-26","09-27","09-28","09-29","09-30"],
		            show:true
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            scale: true,
		            show:false
		        }
		    ],
		    series: [
		        {
		            name:'真实值',
		            type:'line',
		            smooth: true,
		            data: vu.$data.output_data1
		        },
		        {
		            name:'预测值',
		            type:'line',
		            smooth: true,
		            data: vu.$data.output_data3
		        }
		    ]
		};
        myChart.setOption(option);
        return myChart;
	}

	function _refreshData(){
	     if(!vu.$data.my_chart){
	          return;
	     }
	     var option = vu.$data.my_chart.getOption();
	     option.series[1].data = vu.$data.output_data3;   
	     vu.$data.my_chart.setOption(option);    
	}



});