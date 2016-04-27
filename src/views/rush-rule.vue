<template>
	<div class="rush-rule">
		<div class="mainautow mainhd">
			<div class="main_cnt">
				<div class="figure">
				    <li><img src="../imgs/rush-rule/rule_02.jpg" alt=""></li>
				    <li><img src="../imgs/rush-rule/rule_03.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_04.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_05.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_06.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_07.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_08.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_09.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_10.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_11.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_12.jpg" alt=""></li>
                                                <li><a v-link="{name: 'carProcess'}"><img src="../imgs/rush-rule/rule_13.jpg" alt=""></a></li>
                                                <li><img src="../imgs/rush-rule/rule_14.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_15.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_16.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_17.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_18.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_19.jpg" alt=""></li>
                                                <li><img src="../imgs/rush-rule/rule_20.jpg" alt=""></li>
                                                <li><a v-link="{name:'rush'}"><img src="../imgs/rush-rule/rule_21.jpg" alt=""></a></li>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
module.exports = {
	data: function(){
		return {}
	},
	route: {
		data: function(){
			setTimeout(function(){
                router.app.shareCfg = {
                    title: "#闪购攻略",
                    content:'闪购攻略 为您量身定制的购车模式',
                    url:window.location.href,
                    imgUrl:"http://m.yaomaiche.com/activity/images/Flashsales/flashsales.jpg"
                }
            },1000)
		}
	},
	method:{

	}
}
</script>
<style>
.rush-rule .figure{
    text-align: center;
    list-style: none;
    max-width: 640px;
    margin:auto;
}
.rush-rule .figure img{
    vertical-align:top;
    width:100%;
}
</style>