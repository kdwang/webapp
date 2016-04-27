<template>
	<div id="localError">
			<div id="local-wrap">
				<div class="errorMsg">
					<h5>无法获取您的位置</h5>
					<i class="ico-error"></i>
					<span class="choose-city"><a @click.stop.prevent="changeCity" >请选择您的上牌城市</a></span>
				</div>
			</div>
	</div>
</template>
<script>
	module.exports = {
		//props: ['父组建传的值'],
		data:function(){

			return {
				msg:'这里返回数据'
			}
		},
		//这里才是route的生存周期
		route:{

			data: function(transition) {
				var _this = this;
				var userCity = JSON.parse(YMC.local('userCity')) || {};
				if(userCity.cardCity){
					routeList.splice(routeList.length-1,1);
					transition.abort();
					router.replace({name:'home'});
				}
				transition.next()
			}
		},
		methods:{
			changeCity:function(){
				// routeList.splice(routeList.length-1,1);
				router.go({name:'city'});
			}
		}
	}
</script>
<style>
	#localError{
		background-color: #f4f4f4;
		overflow: hidden;
	}
	#localError .errorMsg{
		margin:70px 0 0;
		background-color: #fff;
		padding: 50px 0;
		text-align: center;
		color: #999;
	}
	#localError .errorMsg .ico-error{
		background: url("../imgs/local_error.png") center /100% 100% no-repeat #fff;
		display:block;
		width: 66px;
		height: 82px;
		margin: 16px auto 32px;
	}
	#localError .errorMsg h5{
		font-size: 16px;
	}

	#localError .choose-city{
		padding: 0 10%;
		display: block;
	}
	#localError .choose-city a{
		display: block;
		width:100%;
		background-color: #ffd40b;
		border-radius: 5px;
		line-height: 40px;
		color: #725d00;
	}

	.bottips{
		padding: 20px 0;
	}
	.bottips p{
		text-align: center;
		color: #d8d8d8;
		font-size: 14px;
	}
</style>