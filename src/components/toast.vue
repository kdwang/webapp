<template>
<div>
	<div class="markdiv" v-if="show"></div>
	<div class="alertdiv" transition="toast" v-if="show">
		<slot name="content"></slot>
	</div>
</div>
</template>
<script>
	module.exports = {
		data:function(){
			return {
				show : false,
				fnList: [],
			}
		},
		props: ['toast'],
		watch:{
			//当给toast设置内容的时候就显示，如果没有定义时间，那么2.5秒后渐隐
			'toast.rd':function(val,oldVal){
				if(val == ''){
					return;
				}
				var _this = this;
				_this.show = true;
				_this.toast.cb && _this.fnList.push(_this.toast.cb);
				setTimeout(function(){
					_this.show = false;
					while(_this.fnList.length > 0){
						_this.fnList.shift()();
					}
					setTimeout(function(){
						if(_this.fnList.length==0){
							_this.toast.content = '';
						}
					},310);//这里的300是动画的延迟，故意多设置10毫秒
				},_this.toast.timer || 3000);
			}
		}
	}
</script>

<style>


</style>