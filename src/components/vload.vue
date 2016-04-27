<template>
<div class="vui-mask" @touchstart.stop.prevent v-show="show" :transition="loadingeffect">
    <div class="vui-loading" :style.sync="loadingEndStyle" :class="{'vui-loading-end':vLoadEndFlag, 'vui-loading-on': show}"></div>
</div>
</template>
<script>
	module.exports = {
		props: ['show'],
		data:function(){
			return {
				loadingeffect:'',
				vLoadEndFlag: false,
				loadingEndStyle:null
			}
		},
		events: {
			vLoadEndFn: function(){
				var _this = this;
				_this.vLoadEndFlag = true;

				var delta = parseInt(Math.max($('.vui-mask').width(),$('.vui-mask-virtual').width())/2+30)+1; //180为初始width 120为结束动画

				_this.loadingEndStyle = {
                    '-webkit-transition': '-webkit-transform .3s ease-in-out',
					'transition': '-webkit-transform .3s ease-in-out,transform .3s ease-in-out',
					'-webkit-transform': 'translateX(-'+delta+'px)',
					'-moz-transform': 'translateX(-'+delta+'px)',
					'-ms-transform': 'translateX(-'+delta+'px)',
					'transform': 'translateX(-'+delta+'px)'
				}
			},
			vLoadInit: function(){
				this.vLoadEndFlag = false;
				this.loadingEndStyle = null;
			}
		}
	}
</script>

<style>
.vui-mask{z-index: 2000;position:fixed;top: 0;left: 0;right: 0;bottom: 0;width: 100%;height: 100%;opacity: 1;background-color: rgba(0,0,0,.5);}
.vui-loading{position: absolute;top:50%;left:50%;width: 180px; height: 60px;margin:-30px 0 0 -90px;background-image: url(../imgs/loading2.0.svg);background-repeat: no-repeat;background-size: 180px 180px;background-position: 0 0;}
.vui-loading-on{-webkit-animation: vui-load .3s steps(3) infinite normal;animation: vui-load .3s steps(3) infinite normal;}
.vui-loading-on1{-webkit-animation: vui-load1 .3s steps(2) infinite normal;animation: vui-load1 .3s steps(2) infinite normal;}
.vui-loading-end{overflow: hidden;width: 120px;}

@-webkit-keyframes vui-load{
    0%{
        background-position: 0 0;
    }
    33.32%{
        background-position: 0 0;
    }
    33.33%{
        background-position: 0 -60px;
    }
    66.66%{
        background-position: 0 -60px;
    }
    66.67%{
        background-position: 0 -120px;
    }
    100%{
        background-position: 0 -120px;
    }
}
@keyframes vui-load{
    0%{
        background-position: 0 0;
    }
    33.32%{
        background-position: 0 0;
    }
    33.33%{
        background-position: 0 -60px;
    }
    66.66%{
        background-position: 0 -60px;
    }
    66.67%{
        background-position: 0 -120px;
    }
    100%{
        background-position: 0 -120px;
    }
}
@-webkit-keyframes vui-load1{
    from{background-position: 0 0;}
    to{background-position: 0 -120px;}
}
@keyframes vui-load1{
    from{background-position: 0 0;}
    to{background-position: 0 -120px;}
}
</style>
