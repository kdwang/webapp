<template>
<div class="vShare" v-show="shareDivUp">
	<div class="share_components_mask" transition="modal" @touchmove.stop.prevent @click.stop="shareDivUp=false"></div>
	<div class="bdsharebuttonbox shareDiv" :class="{'shareDivUp':shareDivUp}"   data-tag="share">
	    <h3>分享到：</h3>
	    <ul class="flex">
	        <li class="flex-item"><a @click="shareDivUp=false" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a></li>
	        <!-- <li class="flex-item"><a @click="shareDivUp=false"="shareDivUp=false" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博">腾讯微博</a></li> -->
	        <!--这里微信里面才有-->
	        <li v-show="inWeiXin" @click="weiXinShare=true" class="flex-item"><a class="bds_weixin" title="分享到微信">微信朋友</a></li>
	    </ul>
	</div>
	<div id="shareOver"  v-show="weiXinShare" @click="weiXinShare=false">
	    <img width="100%" src="../imgs/shareguidance.png" />
	</div>
</div>
</template>
<script>
	module.exports = {
		data:function(){
			return {
				//是否在微信内部分享
				inWeiXin : (window.navigator.userAgent || "").toLocaleLowerCase().match(/MicroMessenger/i) == 'micromessenger',
				//inWeiXin:true,
				weiXinShare:false,
				shareDivUp:false,//显示浮层
			}
		},
		props: ['share'],
		watch:{
			'shareDivUp':function(val){
                var _this = this;
				//console.log('shareDivUp'+val);
                if(val==false){
                   _this.resetShare();
                   _this.weiXinShare = false;
               }
			},
			'share.title':function(val,oldVal){
				if(val == ''){
					return;
				}
				var _this = this;
				/*在微信app里面*/
				YMC.wxShareCon({
				    wxTitle: _this.share.title,
				    wxDesc: _this.share.content,
				    wxLink: _this.share.shareUrl,
				    wxImgUrl: _this.share.imgUrl
				});

				/*分享*/
				if(Prius.isInsideApp && Prius.isYaomaiche){

				    Prius.shareInfoWithImg(
				        _this.share.title,
				        _this.share.imgUrl,
				        _this.share.content||'',
				        _this.share.shareUrl,
				        {}
				    );
                    //app中需要重置一下
                    _this.resetShare();
				} else if(Prius.isCarMaster) {
                    var carMasteruid = "";
                     var carGoodsId = YMC.local('carGoodsIdApp');
                     Prius.addGlobalEventListener("giveMeToken", {
                          onGlobalEvent: function(data) {
                           carMasteruid = data.uid;
                                Prius.addGlobalEventListener("share", {
                                   onGlobalEvent: function(data) {
                                        //app分享  //参考文档 http://10.16.35.57:8090/pages/viewpage.action?pageId=3866638
                                        Prius.shareInfoWithImg(
                                            _this.share.title,
                                            _this.share.imgUrl,
                                            _this.share.content,
                                            _this.share.shareUrl+"&uid="+carMasteruid+"&title="+_this.share.title+"&shareLinkId="+carGoodsId,
                                            {}
                                        );
                                   }
                                });
                                //app中需要重置一下
                                _this.resetShare();
                          }
                    });
				}else{
					//网页html中
					_this.shareDivUp = true;

				}
			}
		},
        methods:{
            resetShare:function(){
                this.share = {
                    title:'',
                    content:'',
                    imgUrl:'',
                    shareUrl:''
                }
            }
        },
		ready:function(){
            var _this = this;
            window._bd_share_config = {
                common: {
                    onBeforeClick: function(cmd, config) {
                        // 设置url,text,img
                        return {
                            bdUrl: _this.share.shareUrl,
                            bdText: _this.share.title,
                            bdPic: _this.share.imgUrl,
                            bdDesc:_this.share.content
                        };
                    }
                },
                 share: [{
                    //"bdCustomStyle": "../css/style.css"
                }]
            };
            var _script = document.createElement('script');
            _script.src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)
            document.body.appendChild(_script);


        }
	}
</script>
<style src="../css/share.css"></style>
<style>
.share_components_mask{
	position: fixed;
	z-index: 999;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	background: rgba(0,0,0,.5);
	-webkit-transition: opacity .3s ease;
	transition: opacity .3s ease;
}
.bdshare-button-style0-16 a.bds_tqq, .bdshare-button-style0-16 a.bds_tsina, .bdshare-button-style0-16 a.bds_weixin {
    color: #525252;
    margin: 0;
    padding: 70px 0 0;
    text-align: center;
}

/*分享层*/
.vShare .shareDiv{
    position: fixed;
    opacity:0;
    bottom:0;
    left:0;
    right: 0;
    background:rgba(255,255,255,1);
    width: 100%;
    z-index: 10000;
    overflow:hidden;
    -webkit-transform: translate3d(0px, 100%, 0px);
    -moz-transform: translate3d(0px, 100%, 0px);
    -ms-transform: translate3d(0px, 100%, 0px);
    transform: translate3d(0px, 100%, 0px);
    -webkit-transition: all ease-out .3s;
    -moz-transition: all ease-out .3s;
    -ms-transition: all ease-out .3s;
    transition: all ease-out .3s;
}
.vShare .shareDiv ul{
    padding:20px 0 25px
}
.vShare .shareDiv h3 {
    border-bottom: 1px solid #f1f1f1;
    border-top: 5px solid #f8c623;
    color: #000;
    display: block;
    font-size: 24px;
    font-weight: normal;
    height: 60px;
    line-height: 60px;
    margin: 0;
    padding: 0;
    text-align: center;
}
.vShare .shareDivUp{
    opacity: 1;
    -webkit-transform: translate3d(0px, 0px, 0px);
    -moz-transform: translate3d(0px, 0px, 0px);
    -ms-transform: translate3d(0px, 0px, 0px);
    transform: translate3d(0px, 0px, 0px);
}
.vShare .bdshare-button-style0-16 a {
    background: url("../imgs/icons_0_32.png") no-repeat scroll 0 0;
    background-size: 16px 1580px;
    color: #000;
    cursor: pointer;
    display: block;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    margin: 5px 0 0 25px;
    overflow: hidden;
    padding: 0 0 5px 25px;
}
.vShare .bdshare-button-style0-16{
    padding:0 !important;
}
.vShare .bdshare-button-style0-16 a.bds_tsina,
.vShare .bdshare-button-style0-16 a.bds_tqq,
.vShare .bdshare-button-style0-16 a.bds_weixin{
	float:none;
    text-align: center;
    padding: 70px 0 0;
    margin:0;
    color:#525252;
}
.vShare .bdshare-button-style0-16 a.bds_tsina{
    background:url("../imgs/sinablog.png") no-repeat center top / 60px auto;
}
.vShare .bdshare-button-style0-16 a.bds_tqq{
    background:url("../imgs/tencent.png") no-repeat center top / 60px auto;
}
.vShare .bdshare-button-style0-16 a.bds_weixin{
    background:url("../imgs/wechat.png") no-repeat center top / 60px auto;
}
.vShare #shareOver{
    position: fixed;
    top:5px;
    left: 5%;
    z-index: 9999999;
    width: 90%;
}

</style>