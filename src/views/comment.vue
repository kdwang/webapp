<template>
	<div class="vComment" v-el:vcom>
	    <div class="warp">
		    <div class="comment" style="padding-top:51px;">
		        <div class="comment-b">
		                <ul class="list">
		                	<li v-for="item in com.list">
			            <div class="cominfo">
			                <b>{{item.nickName}}</b>
			                <span class="fr">{{item.creationTime}}</span>
			            </div>
			            <div class="comtext">{{item.commentContent}}</div>
			             <div class="reply">
			                <ul>
			                	<!-- 官方回复 -->
					<li class="comCus" v-if="item.customerServiceReply!=null">
            					<div class="clearfix mb10">
            					    <span>{{item.customerServiceReply.replyTime}}</span>
            					    <em>{{item.customerServiceReply.name}}:</em>
            					</div>
            					{{item.customerServiceReply.replyContent}}
					</li>
					<li v-for="item1 in item.childCommentDetailList">
						<div class="clearfix mb10">
						    <span>{{item1.creationTime}}</span>
						    <em>{{item1.nickName}}:</em>
						</div>
						{{item1.commentContent}}
					</li>
			                </ul>
			            </div>
				<div class="delCom clearfix">
					<span class="delBtn fl" v-show="item.canDelete" @click="removePlan(item.id,$index)">删除</span>
					<span ubt="replyBtn" class="replyBtn fr" @click="saySomething(item.id,item.nickName)">回复</span>
				</div>
			        </li>
		                </ul>
		            </div>
		            <div class="loadingMore" v-el:loading><span>{{status}}</span></div>
		    </div>
		    <div class="speakCom" ubt="talkAny" id="talkAny" @click="showPop"><p>输入你的评论</p></div>
		</div>
		<section class="cmnt_pop" v-show="replyStatus.show">
			<aside class="cmnt_wrap">
			    <div class="cmnt_btn clearfix">
			        <a href="javascript:;" class="cmnt_cancel" @click="cancelFun">取消</a>
			        <a href="javascript:;" class="cmnt_smt" @click="smtFun">发送</a>
			    </div>
			    <textarea id="ttf" placeholder="输入你的评论" v-el:textarea></textarea>
			</aside>
		</section>
	</div>
</template>
<script>


module.exports = {
	data: function(){
		return {
                                timer1:0,
                                timer2:0,
                                timer3:0,
                                timer4:0,
			scrollFun:function(){},
			ajaxUrl: 'Common/Comment/GetCommentQueryByObjectId',
                                load : true,
                                title: '',
			com : {
				list: [],
				title: '',
				totalCount: 0,
				name: ''
			},
			repid :'', //回复id
			status : '', //加载时文字的各种状态
			replyStatus :{
				'show': false,
				'isSend': true
			},
			options : {
			        "id": '',
			        "TypeKey": "1001",
			        "PageSize": 5,
			        "PageIndex": 1,
			        "isCom":false, //当为true时，清空页面内容，重新加载数据，false时往列表后面添加.
			        "flag" : true, //当为true时，说明评论还有，滚动可以加载一页
			        "isScroll" : true, //避免滚动多次加载,要求滚动只加载一页数据
			        "userID":"输入你的评论"
		    	},
			win : {
				wHeight : $(window).height(),
				wScrollTop : 0
			}

		}
	},
	computed:{

	},
	route: {
		data: function(){
                                var _this = this;
                                /*_this.com.list = [];
                                _this.load = true;
                                _this.options.flag=_this.options.isScroll = true;
                                _this.options.PageIndex = 1;*/
                                _this.reset(); //重置 重新渲染
                                _this.options.id = this.$route.query.id;
                                //console.warn(_this.options.id)
                                //console.log(_this.options.flag,_this.options.isScroll)
			this.comLoad(); //默认加载一次评论


			 /*滚动加载评论*/
			_this.scrollFun = function(){
                                            $(window).on('scroll', function(){
                                            _this.win.wScrollTop =  $(window).scrollTop();
                                            if(_this.options.flag){
                                                _this.comLoad();
                                            }

				});
			}
			$(window).on('scroll', _this.scrollFun);
		},
		canDeactivate : function(transition){
                            var _this = this;
                            _this.load = false;
                            $(window).off('scroll', _this.scrollFun);
                            transition.next();
                            clearTimeout(_this.timer1);
                            clearTimeout(_this.timer2);
                            clearTimeout(_this.timer3);
		}
	},
	ready: function(){

	},
	methods:{
		comLoad: function(opt){
			var _this = this;
			_this.setOptions(opt);
			_this.timer1 = setTimeout(function () {
			   _this.auAdd();
			}, 1000);
		},
                     reset : function(){
                        var _this = this;
                        _this.com.list = [];
                        _this.load = true;
                        _this.options.flag=_this.options.isScroll = true;
                        _this.options.PageIndex = 1;
                        $(_this.$els.loading).offset().top = _this.win.wScrollTop = 0;
                     },
		pageTop:function(){
			var _this =this;
		    	return _this.win.wHeight + _this.win.wScrollTop;
		},
		setOptions: function(opt) {
			var _this = this;
			$.extend(_this.options, opt || {});
		},
		auAdd:function(){
			var _this = this,obj = _this.$els.loading;
                                //console.log($(obj).offset().top,_this.pageTop(),_this.options.flag)
			if(obj){
			    $(obj).offset().top <= _this.pageTop() && _this.options.flag && (_this.comListAction());
			}
		},
		comListAction:function(){
			var _this = this,obj = _this.$els.loading;
			if(obj){
				_this.status = "评论加载中...";
			}

			if(_this.options.isScroll){
                                //console.log("a",_this.load,_this.options.PageIndex)
				_this.options.isScroll = false;
				_this.timer2 = setTimeout(function(){

				        YMC.ajax({
				            url: _this.ajaxUrl,
				            data:_this.options,
				            success: function(res){
                                if(!_this.load){
                                    return;  //车辆详情页，进入评论页后返回详情页，解决页面title错误
                                }
								if(!res.success){
									VUI.alert(res.error.message,"",function(){
									    //window.location.href = "../index.html";
									    router.go( { name: 'home'} );
									});
									return;
								}

                                                                _this.com.title = res.result.carModelName;
						router.app.$dispatch('updateTitle','<span class="vComtitle">全部评论<i>'+res.result.carModelName+'</i></span>');


					           _this.options.PageIndex++;

						if(_this.options.isCom){
							_this.com.list = [];
							_this.com.list = res.result.commentDetailList;
							_this.options.isCom = false;
						}else{
							for (var i =0; i <res.result.commentDetailList.length; i++) {
								_this.com.list.push(res.result.commentDetailList[i]);
							};
						}

					           _this.com.totalCount = res.result.totalCount;
					           _this.com.name = res.result.carModelName;

					          // console.info(JSON.stringify(res, null, 4));


						if(_this.com.list.length != res.result.totalCount){
						     _this.status = "向下滑动加载更多...";
						     _this.options.isScroll = true;
						}else{
						    _this.options.flag = false;
						    _this.status = "暂无其它评论";
						    _this.options.isScroll = false;
						}
				            },
				            error: function(){
				               VUI.alert('网络连接失败,请稍后再试!');
				            },
				            complete: function(){},
				            showLoading: true //是否显示loading效果
				        });
				},0)
			}
		},
		saySomething: function(repid,userid){
			var _this = this;

			if(!YMC.register.loginStatus()){
				router.go( { name: '_login',query:{source: 'comment'}} );
			}else{
				_this.options.userID = "回复用户"+userid;
				_this.showPop();
				_this.repid = repid;
			}

		},
		showPop:function(){
                                if(!YMC.register.loginStatus()){
                                    router.go( {name:'_login',query:{source: 'comment'}} );
                                }else{
            			var _this = this;
            			_this.replyStatus.show = true;
            			$(_this.$els.textarea).attr("placeholder",_this.options.userID)
            			CC.bodyUntouch();
                                }
		},
		cancelFun : function(){
			var _that = this;

			if($(_that.$els.textarea).val().length>0){
			    VUI.confirm("", "是否放弃当前内容?", [function(e) {}, function(e) {
                                        CC._nubind();
                                        _that.replyStatus.show = false;
                                        $(_that.$els.textarea).val("");
                                     }],60000);
			}else{
                                    CC._nubind();
			    _that.replyStatus.show = false;
			}
		},
		smtFun : function(){
			var _this = this;
			var _that = this,oValue = $(_that.$els.textarea).val();
			    if(_that.replyStatus.isSend && oValue.length>0){
			         _that.replyStatus.isSend = false;
			         var comData = {
			            //评论类型键值
			            "commentTypeKey": "1001",
			            //评论对象Id
			           /* "commentObjectId": YMC.local("proComID"),*/
			           "commentObjectId": _that.options.id,
			            //车品牌
			            "objectRemark": _that.com.name,
			            //被回复评论Id
			            "parentCommentId": _that.repid || "",
			            //评论内容
			            "commentContent": $(_that.$els.textarea).val(),
			            //评论图片
			            "commentImageUrls": []
			        }
			         YMC.ajax({
			                url: 'Common/Comment/AddComment',
			                data:comData,
			                success: function(res){
			                    _that.replyStatus.isSend = true;
			                    if(!res.success){
			                       VUI.alert(res.error.message);
			                        return;
			                    }
                                                    CC._nubind();
			                    //_this.empty();
			                    _this.timer3 = setTimeout(function(){
									VUI.alert("发表成功",1000,function(){
			                            $(_that.$els.textarea).val("");
										_that.replyStatus.show = false;
										_that.options.isCom = true;
										_that.options.PageIndex= 1; //默认加载第一页
										_that.options.isScroll = true;
										_that.options.flag = true;   //再次滚动加载评论条件
										/*提交成功默认加载第1页*/
										_that.comListAction();
									});
				                },50)
			                },
			                error: function(){
			                    _that.replyStatus.isSend = true;
			                    VUI.alert("发表失败");
			                },
			                complete: function(){},
			                showLoading: false //是否显示loading效果
			            });
			    }else{
			        VUI.alert("内容不能为空，请输入",1000);
			    }
		},
		removePlan : function(dac,index){
			var _this = this;
			YMC.ajax({
				url: 'Common/Comment/DeleteComment',
				data: {"id":dac},
				success: function(res){
				    _this.com.list.splice(index,1)
				},
				error: function(){},
				beforeSend : function(){},
				complete   : function(){},
				showLoading: true //是否显示loading效果
			})
		}

/*ed*/
	}

}
var CC = {};

CC.eventDefault = function(e){
            e.preventDefault();
};
CC.bodyUntouch = function(){
    document.addEventListener("touchmove", CC.eventDefault, false);
};
CC._nubind = function() {
    document.removeEventListener("touchmove", CC.eventDefault ,false);
};
</script>
<style>

.vComment .comment{
    padding:51px 0 80px 0;
    position: relative;
}
span.vComtitle{
    display: inline-block;
    line-height: 22px;
    height: 50px;
    overflow: hidden;
    width: 80%;
    margin: 5px 0 0;
    color:#fff;
}
span.vComtitle i{
    display: block;
    font-size: 12px;
    color:#ccc;
}
/*评论列表*/
.vComment .comment-b .list > li{
    border-bottom: 1px solid #f1f1f1;
    margin-top: 20px;
    padding:0 10px 20px;
    font-size: 16px;
}

.vComment .comment-b .cominfo b{
    font-weight: normal;
}
.vComment .comment-b .cominfo span{
    font-size:12px;
    color:#ccc;
}
.vComment .comment-b .comtext{
    margin: 15px 0 5px 0;
    color:#666;
    line-height: 22px;
    word-wrap:break-word;
}
.vComment .comment-b .compic{
    margin-top: 10px;
}
.vComment .comment-b .compic li{
    float: left;
    width: 33.333%;
    text-indent: center;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
}
.vComment .comment-b .compic li img{
    width: 95%;
}
.vComment .comment-b .reply{
    font-size: 14px;
}

.vComment .comment-b .reply li{
    padding:10px 5px;
    background: #f6f6f6;
    border-bottom: 1px dashed #e4e4e4;
    line-height: 20px;
    position: relative;
    word-wrap:break-word;
}
.vComment .comment-b .reply li:last-child{
    border:0 none;
}
.vComment .comment-b .reply li span{
    float: right;
    color:#999;
    font-size: 12px;
}
.vComment .comment-b .reply li em{
    color:#7c7c7c;
    margin-right: 5px;
}

.vComment .comment-b .reply li.comCus em,
.vComment .comment-b .reply li.comCus span{
    color:#da7420;
}
.vComment .comment-b .delCom{
    margin:15px 0 0;
    color:#f7c53a;
}
.vComment .comment-b .delCom span{
    text-align: center;
    font-size: 14px;
    color:#00a0fe;
}

.vComment .loadingMore{
    padding:20px 0;
    text-align: center;
    font-size: 16px;
    color:#999;
}

.vComment .speakCom{
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px 3%;
    width: 94%;
    background: rgb(245,245,245);
  /*  border-top:1px solid #e4e4e4;*/
}
.vComment .speakCom p{
    width: 96%;
    padding:15px 2%;
    line-height: 18px;
    height: 18px;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
    background: #fff;
    color: #d8d8d8;
    text-align: center;
    font-size: 16px;
}

.vComment .cmnt_pop{
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 10px 3%;
    position: fixed;
    background: #f5f5f5;
    z-index: 1000;
}
.vComment .cmnt_pop .cmnt_btn{
    height: 30px;
    padding:0 0 10px;
}
.vComment .cmnt_pop .cmnt_btn a{
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 60px;
    border: medium none;
    border-radius: 2px;
}
.vComment .cmnt_pop .cmnt_btn .cmnt_cancel{
    background: #eee;
    color: #666;
}
.vComment .cmnt_pop .cmnt_btn .cmnt_cancel:active{
    background: #cfcfcf;
}
.vComment .cmnt_pop .cmnt_btn .cmnt_smt{
    background: #00a0fe;
    color: #fff;
    float: right;
}
.vComment .cmnt_pop .cmnt_btn .cmnt_smt:active{
    background: #0073b7;
}
.vComment .cmnt_pop textarea{
    width: 96%;
    padding:10px 2%;
    line-height: 18px;
    height: 100px;
    display: block;
    border: 1px solid #e4e4e4;
    border-radius: 3px;
    background: #fff;
    word-wrap:break-word;
    resize:none;
    overflow: auto;
}
.vComment .cmnt_pop ::-webkit-textarea-placeholder { /* WebKit browsers */
    color:#919191;
    text-align: left;
}
.vComment .cmnt_pop :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:#919191;
    text-align: left;
}
.vComment .cmnt_pop ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:#919191;
    text-align: left;
}
.vComment .cmnt_pop :-ms-textarea-placeholder { /* Internet Explorer 10+ */
    color:#919191;
    text-align: left;
}
.vComment .cmnt_pop textarea:focus{
    border-color:#f7c53a;
}
</style>