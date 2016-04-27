<template>
<div id="helpIndex" class="helpIndex">
    <div class="img">
        <img src="../imgs/aus.jpg" width="100%" />
    </div>
    <ul class="one">
        <li>
            <a ubt="carProcess" v-link="{ name: 'carProcess'}">
                <div class="item item_arr-right clearfix">
                    <div class="item_left">购车流程</div>
                </div>
            </a>
        </li>
        <li>
            <a ubt="aboutPay" v-link="{ name: 'aboutPay'}">
                <div class="item item_arr-right clearfix">
                    <div class="item_left">关于支付</div>
                </div>
            </a>
        </li>
        <li>
            <a ubt="turnCenter" v-link="{ name: 'turnCenter'}">
                <div class="item item_arr-right clearfix">
                    <div class="item_left">交付中心</div>
                </div>
            </a>
        </li>
    </ul>
    <ul class="two">
        <li>
            <a ubt="aboutUs" v-link="{ name: 'aboutUs'}">
                <div class="item item_arr-right clearfix">
                    <div class="item_left">关于我们</div>
                </div>
            </a>
        </li>
        <!-- <li>
            <a ubt="comCulture" href="comCulture.html?source=helpIndex">
                <div class="item item_arr-right clearfix">
                    <div class="item_left">企业文化</div>
                </div>
            </a>
        </li> -->
        <li>
            <a ubt="contactUs" v-link="{ name: 'contactUs'}">
                <div class="item item_arr-right clearfix">
                    <div class="item_left">联系我们</div>
                </div>
            </a>
        </li>
        <li>
            <a ubt="job" v-link="{ name: 'job'}">
                <div class="item item_arr-right clearfix">
                    <div class="item_left">招贤纳士</div>
                </div>
            </a>
        </li>
    </ul>
    <ul class="three">
        <li>
            <a ubt="issue" v-link="{ name: 'issue'}">
                <div class="item item_arr-right clearfix">
                    <div class="item_left">常见问题</div>
                </div>
            </a>
        </li>
        <li>
            <a ubt="agreement" v-link="{ name: 'agreement'}">
                <div class="item item_arr-right clearfix">
                    <div class="item_left">服务协议</div>
                </div>
            </a>
        </li>
        <li>
            <a ubt="afterSalesService" v-link="{ name: 'after-sales-service'}">
                <div class="item item_arr-right clearfix">
                    <div class="item_left">售后服务</div>
                </div>
            </a>
        </li>
    </ul>
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
				transition.next()
			}
		}
	}
</script>

<style>
.helpIndex {
    height: 100%;
    padding-top: 51px;
    background-color: #f9f9f9;
    box-sizing: border-box;
}
.helpIndex img{
	vertical-align: bottom;
}
.helpIndex ul li{
	position: relative;
}
.helpIndex ul li:before{
	position: absolute;
	content: " ";
	display: block;
	left:13px;
	top:50%;
	margin-top:-15px;
	width:30px;
	height: 30px;
	background:url("../imgs/helpCenter.png") no-repeat 0 0;
	background-size: 175px 209px;
	z-index: 10;
}
.helpIndex ul li .item{
	border-color:#f1f1f1;
	height: 50px;
	line-height: 50px;
}
.helpIndex ul li .item .item_left{
	padding-left: 25px;
}
.helpIndex ul li:last-child .item{
	border: 0 none;
}

.helpIndex .two,
.helpIndex .three{
	margin: 15px 0 0;
}
.helpIndex ul.one li:nth-child(1):before{
	background-position: -71px -4px;
}
.helpIndex ul.one li:nth-child(2):before{
	background-position: -68px -43px;
}
.helpIndex ul.one li:nth-child(3):before{
	background-position: -68px -80px;
}

.helpIndex ul.two li:nth-child(1):before{
	background-position: -109px -3px;
}
.helpIndex ul.two li:nth-child(2):before{
	background-position:  -109px -41px;
}
.helpIndex ul.two li:nth-child(3):before{
	background-position:  -109px -76px;
}
.helpIndex ul.two li:nth-child(4):before{
	background-position:  -109px -113px;
}

.helpIndex ul.three li:nth-child(1):before{
	background-position:  -146px -6px;
}
.helpIndex ul.three li:nth-child(2):before{
	background-position:  -146px -42px;
}
.helpIndex ul.three li:nth-child(3):before{
	background-position:  -146px -80px;
}
</style>