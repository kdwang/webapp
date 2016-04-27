<template>
<div>
	<div class="markdiv"  @touchmove.stop.prevent v-if="show" :transition="loadingeffect"></div>
	<div class="uiload" v-if="show">
		<div class="uiloadicon"><span class="ui-loading"><i class="t1"></i><i class="t2"></i><i class="t3"></i></span><span>加载中...</span>
		</div>
	</div>
</div>
</template>
<script>
	module.exports = {
		props: ['show'],
		data:function(){
			return {
				loadingeffect:''
			}
		},
		ready:function(){

			var ua = window.navigator.userAgent;
			if(
				ua.match(/iPhone|iPad|iPod/)  //苹果设备 加入渐隐效果
				|| !("ontouchstart" in window) //pc       加入渐隐效果
			){
				this.loadingeffect = 'loadingfade';
			}
		}
	}
</script>

<style>
.loadingfade-enter {
  animation: loadingfade-in .5s;
}
.loadingfade-leave {
  animation: loadingfade-out .5s;
}
@keyframes loadingfade-in {
  0% {
    opacity:0;
  }
  100% {
    opacity:.5;
  }
}
@keyframes loadingfade-out {
  0% {
    opacity:.5;
  }
  100% {
    opacity:0;
  }
}
</style>
