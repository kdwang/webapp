<template>
<div id="main" class="" style="margin-top:51px;">
	<div class="specarSuccess">
	    <p class="mt10" style="font-size:0.8rem;line-height:24px;">
	        <b>您的购车意向提交成功</b>
	        此商品目前无货,非常抱歉。<br/>未来商品上架后我们会主动与您联系。
	    </p>

	</div>
</div>
</template>

<script>
	module.exports = {
		//props: ['父组建传的值'],
		data:function(){

			return {
				data_orderSuccess : {} // 品牌列表
			}
		},
		//这里才是route的生存周期
		route:{

			data: function(transition) {
				var _this = this;
				transition.next()
			}
		}
	}
</script>

<style>
.specarSuccess{
	text-align: center;
	color:#757575;
	font-size: 12px;
	padding: 160px 5% 0;
	position: relative;
}
.specarSuccess b{
	font-size: 20px;
	font-weight: normal;
	color:#212121;
	display: block;
           margin-bottom: 5px;
}
.specarSuccess:before
{
	position: absolute;
	content: "";
	display: block;
	width: 100px;
	height: 100px;
	left:50%;
	margin-left: -50px;
	top:50px;
	background: url("../imgs/ico_sprite2.png") no-repeat 0 0;
	background-size: 311px 100px;
}
</style>