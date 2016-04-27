<template>
<div>
	<div class="markdiv" v-if="show"></div>
	<div class="alertdiv" v-if="show" style="z-index:9999">
	    <div class="confirm">
	        <slot name="title"></slot>
	        <slot name="content"></slot>
	        <div class="confirmbtnp">
	        <a @click.stop.prevent="cancelClick" class="btna"><slot name="cancelTxt"></slot></a>
	        <a @click.stop.prevent="confirmClick" class="btna"><slot name="confirmTxt"></slot></a>
	        </div>
	    </div>
	</div>
</div>
</template>
<script>
	module.exports = {
		data:function(){
			return {
				show : false
			}
		},
		props: ['confirm'],
		watch:{
			//当给toast设置内容的时候就显示，如果没有定义时间，那么2.5秒后渐隐
			'confirm.title':function(val,oldVal){

				var _this = this;
				if(val == ''){
					return;
				}
				this.show = true;

				setTimeout(function(){
					_this.show = false;
					_this.reset();
				},this.confirm.timer || 60000);
			}
		},
		methods:{
			confirmClick:function(e){
				this.confirm.confirmClick && this.confirm.confirmClick(e);
				this.reset();
			},
			cancelClick:function(e){
				this.confirm.cancelClick && this.confirm.cancelClick(e);
				this.reset();
			},
			reset:function(){
				this.confirm.title = '';
				this.confirm.content = '';
				this.confirm.timer = 3000;
				this.confirm.confirmClick = function(){};
				this.confirm.cancelClick = function(){};
				this.show = false;
			}
		}
	}
</script>

<style>


</style>