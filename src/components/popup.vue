<template>
<div class="act-markdiv" v-if="show" @click.stop.prevent="show=!show">
	<div class="act-pop-wrap">
		<div class="act-pop" @click.stop.prevent>
			<h2 class="act-pop-tlt">活动细则<span class="act-pop-close" @click.stop.prevent="show=!show">关闭</span></h2>
			<slot name="act-cnt"></slot> 
		</div>
	</div>
</div>
</template>
<script>
	module.exports = {
		data:function(){
			return {}
		},
        props: {
            show: {
                type: Boolean,
                require: true
            }
        }
	}
</script>

<style>
.act-markdiv{
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: table;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
}
.act-markdiv .act-pop-wrap{display: table-cell;vertical-align: middle;}
.act-pop-wrap .act-pop{
	position: relative;
    width: 80%;
    height: 400px;
    margin: 0 auto;
    background-color: #fff;
    overflow: hidden;
}
.act-pop .act-pop-tlt{
	z-index: 1;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 40px;
	color: #999;
	line-height: 40px;
	font-size: 16px;
	text-align: center;
	background-color: #eee;
	font-weight: normal;
}
.act-pop .act-pop-tlt .act-pop-close{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: 40px;
    padding: 0 10px;
    font-size: 14px;
    line-height: 40px;
    background: #ffde00;
    color: #3c3c3c;
}
.act-pop .act-pop-cnt{
	height: 100%;
    padding: 46px 10px 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
</style>