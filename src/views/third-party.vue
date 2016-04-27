<template>
	<div class="third-party">
		<div id="main" class="third-party-wrap">
	        <iframe :src="thirdInfo" frameborder="no" SECURITY="restricted" id="webview" v-if="thirdInfo">
	        </iframe>
	        <p class="tc fs16 mt10" v-else>目前什么要显示的数据</p>
	    </div>
	</div>
</template>
<script>
module.exports = {
	data: function(){
		return {
			thirdInfo: {} 
		}
	},
	route: {
		data: function(){
			var _this = this;
			_this.thirdInfo = _this.$route.query&&_this.$route.query.target;

			// 头部文字
			router.app.$dispatch('updateTitle',(_this.thirdInfo.txt||'第三方网站'));
		}
	},
	ready: function(){
		
	},
	methods:{
	}

}
</script>
<style>
.third-party,
.third-party-wrap{
	width: 100%;
	min-width: 320px;
	height: 100%;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
.third-party-wrap{
	padding-top: 50px;
}
.third-party-wrap iframe{
	width: 100%;
	height: 100%;
	border: none;
}
</style>