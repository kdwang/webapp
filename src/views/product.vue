<template>
    <div class="vProduct">
        <div id="main" class="mainautow mainhd" v-el:vpro>
            <div class="proBaseInfo">
                <div class="sliderImg">
                    <div class="swiper-container" v-el:swiperpic>
                        <ul class="swiper-wrapper">
                            <li class="swiper-slide attrSrc" track-by="$index"
                                v-for="item in aObject.picUrl"
                                v-sturl="item">
                            </li>
                        </ul>
                        <div class="swiper-pagination" v-if="aObject.picUrl.length>1"></div>
                    </div>
                    <div class="attention">
                        <span>{{bObject.carVCount}}</span>人想买
                    </div>
                </div>
                <ul class="txtS">
                    <li>
                    <h1 v-bind:class="{'nodai':!aObject.isFinancialLeasing}">
                        <a href="../Page/finance_lease_notice.html" class="dai clearfix" v-show="aObject.isFinancialLeasing">
                        <span>融资租赁<br/>购车需知</span></a>{{shareTitle}}
                    </h1>
                    </li>
                    <li class="speedBuy" v-if="fastbuy && fastbuy.status >= 0 && aObject.sta">
                        <div class="B-step">
                            <ul class="clearfix">
                                <li v-bind:class="{'on':fastbuy.status==1}"><i></i>我要报名</li>
                                <li v-bind:class="{'on':fastbuy.status==2}"><i></i>等待闪购</li>
                                <li v-bind:class="{'on':fastbuy.status==3}">闪购开始</li>
                            </ul>
                        </div>
                        <div class="B-steprice">
                            <p><em class="sho">指导价：¥{{aObject.officePrice | priceW}}万</em><span class="ml10">要买车价：¥{{aObject.ymcPrice | priceW}}万</span></p>
                            <p class="desc" v-show="fastbuy.activityDescription.length > 0">"{{fastbuy.activityDescription}}"</p>
                            <div class="fast clearfix"  v-if="fastbuy.tieredPrice.length>0">
                                <ul class="flex">
                                    <li class="flex-item" v-for="item in fastbuy.tieredPrice">{{item.minBuyer ? item.minBuyer :1}}人闪购价<br/><span>¥{{item.panicBuyingPrice | priceW}}</span><em>万元</em></li>
                                </ul>
                            </div>
                            <div v-else>
                                <div class="normal" v-if="fastbuy && fastbuy.status == 0"><div>闪购一口价<br/><span>¥{{aObject.ymcPrice | priceW}}</span><em>万元</em></div></div>
                                <div class="normal" v-else><div>闪购一口价<br/><span>¥{{fastbuy.panicBuyingPrice | priceW}}</span><em>万元</em></div></div>
                            </div>
                        </div>
                        <div class="B-date" v-show="fastbuy.status==1">
                            报名时间<br/>{{applyTime.begTime}}---{{applyTime.endTime}}
                        </div>
                        <div class="B-cd" v-bind:class="{'B-cdover':fastbuy.status==3}" v-show="fastbuy.status==0 || fastbuy.status==1 || fastbuy.status==2 || fastbuy.status==3">
                            <div>
                            <span v-show="fastbuy.status==1">离报名结束</span>
                            <span v-show="fastbuy.status==2">离闪购开始</span>
                            <span v-show="fastbuy.status==3">离闪购结束</span>
                            <span v-show="fastbuy.status==4">闪购已结束</span>
                            <em class="ml10"><!-- {{cdate.day}}</em>:<em> -->{{cdate.hour}}</em>:<em>{{cdate.minute}}</em>:<em>{{cdate.second}}</em>
                            </div>
                        </div>
                        <div class="B-link">
                            <div class="arrow item_arr-right">
                                <a href="#/rush-rule/" class="blockA openNewPage" ubt="buyRule">
                                    <h3><span>详见闪购细则</span></h3>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li v-else>
                        <div class="proPrice">
                            <p class="desc" v-show="aObject.remark.length >0" > "{{aObject.remark}}" </p>
                            <span class="priceoff">
                                <strong v-if="aObject.sta">要买车价：</strong>
                                <strong v-else>参考售价：</strong><b>¥<i>{{aObject.ymcPrice | priceW}}</i></b><em>万</em>
                            </span>
                            <!-- <label v-if="fastbuy && fastbuy.status == 0" class="txt-tuan txt-tuan3" v-show='aObject.sta && aObject.Spread>0'>直降{{aObject.officePrice - aObject.ymcPrice}}元</label> -->
                            <label class="txt-tuan txt-tuan3" v-show='aObject.sta && aObject.Spread>0'>直降{{aObject.officePrice - aObject.ymcPrice}}元</label>
                            <p><span>指导价：¥<i>{{aObject.officePrice | priceW}}</i>万</span></p>
                            <!--<div class="daikuan" v-if="aObject.sta">贷款购车：仅需<i>¥{{aObject.loanPrice | priceW}}</i>万<p>贷款购车会根据首付比例变更</p></div>-->
                        	<div class="daikuan" v-show="!(aObject.ymcPrice == aObject.loanPrice)">贷款购车：仅需<i>¥{{aObject.loanPrice | priceW}}</i>万<p>贷款购车会根据首付比例变更</p></div>
                        </div>
                    </li>
                <!--     <li>
                        <span class="supG">289人赞价格</span>
                    </li> -->
                    <li v-if="bObject.labelList && bObject.labelList.length > 0">
                        <div class="protip clearfix" >
                            <span v-for="item in bObject.labelList" track-by="$index">{{item}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="detailList mt10" >
                <div class="arrow item_arr-right clearfix" @click="showRight()" ubt="color" gsq="{{aObject.carGoodsId}}" gsqName="车辆详情颜色切换">
                    <h3><span>颜色</span></h3>
                    <p class="carColor">
                    <em>外：{{aObject.select[0]}}&nbsp;&nbsp;&nbsp;内：{{aObject.select[1]}}</em></p>
                </div>
                <div class="arrow itemPAR clearfix">
                    <h3>环保标准</h3>
                    <p>{{bObject.sgs}}</p>
                </div>
                <div ubt="carStore" class="arrow item_arr-right clearfix" style="position:relative;"  v-show="aObject.sta">
                    <a class="newpage aw100" v-link="{name: 'list_store',query:{'id':aObject.carGoodsId,'from':'product'}}"></a>
                    <h3>提车地点</h3>
                    <p class="add">{{bObject.addName}}</p>
                </div>
                <div class="enableH itemPAR" v-show="( aObject.sta && !(fastbuy.status==0 || fastbuy.status==1 || fastbuy.status==2) )">
                    <div class="clearfix">
                        <h3>库存状况</h3>
                        <p>{{bObject.saleInventory}}</p>
                    </div>
                    <span class="fs12 pFreight"  style="display:none;">全款购车下单起 / 按揭购车贷款合同审批通过起，预计运输时间<em class="cor_yellow">...</em>内完成，实际交付时间以客服经理联系为准</span>
                </div>
                <div class="arrow itemPAR car-freight" v-show="aObject.sta">
                    <div class="clearfix">
                        <h3>异地运输费</h3>
                        <p><em style="color:#ff4040;">(新春特惠免运费)</em></p>
                        <!-- <p><span>¥{{bObject.freight}}</span>({{bObject.sname}})</p> -->
                    </div>
                </div>
            </div>
            <div class="tab abs_size clearfix" id="tabA">
                <a href="javascript:;" class="current" ubt="spe"><span>汽车特点</span></a>
                <a href="javascript:;" ubt="ser"><span>购车服务</span></a>
                <a href="javascript:;" ubt="step"><span>购车流程</span></a>
            </div>
            <div class="proDesc" id="proDescCon">
                <div class="mPos tabc attr">
                    <ul class="clearfix">
                        <li v-for="item in data_car.carSpecial">
                            <span class="configure" v-bind:class="item.className"></span>
                            <p>{{item.title}}</p>
                        </li>
                    </ul>
                </div>
                <div class="carConfig config">
                    <div class="arrow item_arr-right">
                        <a v-link="{name:'car-argument',query: {id: dataB.Id}}" class="blockA openNewPage" ubt="carArg">
                            <h3><span>参数配置</span></h3>
                        </a>
                    </div>
                    <div class="table">
                        <ul class="clearfix">
                            <li v-for="item in data_car.carConfigure">
                                {{item.parameterName}}<br/><em>{{item.parameterValue}}</em>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="mPos config service" id="service">
                     <div class="arrow">
                        <h3><span>购车服务</span></h3>
                    </div>
                    <div class="lis">
                        <ul class="clearfix">
                            <li><span class="li-1"></span>
                            <p><b>售后</b>30天无理由退车，整车质保</p></li>
                            <li><span class="li-2"></span>
                            <p><b>贷款</b>5家银行可选，最低0首付</p></li>
                            <li><span class="li-3"></span>
                            <p><b>精品服务</b>2000种精选配件，随车质保</p></li>
                            <li><span class="li-4"></span>
                            <p><b>保险</b>10家保险机构选择，最低7折</p></li>
                        </ul>
                    </div>
                </div>
                <div class="comment mt10" ubt="comment" v-if="!isCarMaster">
                    <a v-if="data_car.comment.count" ubt="comment" v-link="{name:'comment',query: {id: dataB.Id}}" class="blockA">
                        <div class="comment-t arrow item_arr-right"><h3><span>用户评论</span></h3>
                            <p>{{data_car.comment.count}}条</p></div>
                        <div class="comment-b">
                            <ul>
                                <li v-for="item in data_car.comment.commentDetailOutputs">
                                    <div class="cominfo">
                                        <b>{{item.nickName}}</b>
                                        <span class="fr">{{item.creationTime}}</span>
                                    </div>
                                    <div class="comtext">{{item.commentContent}}</div>
                                </li>
                            </ul>
                        </div>
                    </a>
                     <a v-else v-link="{name:'comment',query: {id: dataB.Id}}" class="blockA">
                         <div class="comment-t arrow item_arr-right">
                            <h3><span>用户评论</span></h3>
                        </div>
                         <div class="comment-b">
                            <em></em>
                            <span class="noCom">暂无评论，点击发表评论</span>
                        </div>
                    </a>
                </div>
                <div class="mPos buyCarStep" id="buyCarStep">
                     <div class="arrow">
                        <h3><span>超简购车体验，最快7天提车</span></h3>
                    </div>
                    <div class="step abs_size">
                        <p><img src="../imgs/buycarPro.jpg" width="100%" /></p>
                         <ul class="flex">
                            <li class="flex-item">线上选车付定金</li>
                            <li class="flex-item">到店提车付余款</li>
                            <li class="flex-item">开着汽车回家咯</li>
                        </ul>
                    </div>
                </div>
                <div class="myPromise">
                     <div class="arrow">
                        <h3><span>我们的承诺</span></h3>
                    </div>
                    <div class="proList">
                        <ul class="clearfix">
                            <li class="item_arr-right">
                                <a class="aw100" v-link="{name:'refund-notice'}"></a>
                                <span class="li-1"></span>
                                <p><b>30天无理由退车</b>提车30天内，可以享受30天无理由退车，消除您一切顾虑</p></li>
                            <li class="item_arr-right">
                                <a class="aw100" v-link="{name:'warranty-services'}"></a>
                                <span class="li-2"></span>
                                <p><b>全国联保国家3包</b>消费者可凭“三包凭证”和购车发票依法享受国家《汽车三包规定》内的“3包”权益</p>
                            </li>
                            <li><span class="li-3"></span>
                            <p><b>出厂6个月内新车</b>所售车辆全部是国内外正规汽车制造厂商生
产、经检验合格、出厂日期在6个月内新车</p></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="pro proAction abs_size clearfix" v-if="fastbuy.status>=0 && aObject.sta">
                <template v-if="fastbuy.status == 0">
                    <a class="btn-buytrial act-btn-col2 act-btn-col2-1" ubt="buy" href="javascript:;" @click="subResult($event)" gsq="{{aObject.carGoodsId}}" gsqName="购车试算_01" >购车试算</a>
                    <a class="btn-buysale act-btn-col2 act-btn-col2-3" ubt="buy" href="javascript:;" @click="rushBtnEv('闪购报名还未开始')">闪购资格报名</a>
                </template>
                <template v-if="fastbuy.status == 1">
                    <a class="btn act-btn-col2 act-btn-col2-1" ubt="buy" href="javascript:;" @click="subResult($event)" gsq="{{aObject.carGoodsId}}" gsqName="购车试算_01">购车试算</a>
                    <a v-if="fastbuy.isEnrollingFull" class="btn act-btn-col2 act-btn-col2-3" ubt="buy" gsq="{{aObject.carGoodsId}}" gsqName="报名人数已满" @click="rushBtnEv('报名人数已满')">报名人数已满</a>
                    <a v-else class="btn act-btn-col2 act-btn-col2-2" ubt="buy" @click="signUp()" gsqName="报名">立即报名</a>
                </template>
                <template v-if="fastbuy.status == 2">
                    <a class="btn-buytrial act-btn-col2 act-btn-col2-1" ubt="buy" href="javascript:;" @click="subResult($event)" gsq="{{aObject.carGoodsId}}" gsqName="购车试算_01">购车试算</a>
                    <a class="btn-buysale act-btn-col2 act-btn-col2-3 fs12" ubt="buy" href="javascript:;" @click="rushBtnEv('闪购未开始')" gsq="{{aObject.carGoodsId}}" gsqName="闪购未开始">闪购未开始</a>
                </template>
                <template v-if="fastbuy.status == 3">
                    <a class="btn act-btn-col2 act-btn-col2-1" ubt="buy" href="javascript:;" @click="subResult($event)" gsq="{{aObject.carGoodsId}}" gsqName="购车试算_01">购车试算</a>
                    <a v-if="bObject.saleInventory != '售罄' " class="btn act-btn-col2 act-btn-col2-2" ubt="buy" href="javascript:;" @click="subResult($event)" gsq="{{aObject.carGoodsId}}" gsqName="立即闪购">立即闪购</a>
                    <a v-else class="btn act-btn-col2 act-btn-col2-3" ubt="buy" href="javascript:;"  gsq="{{aObject.carGoodsId}}" gsqName="售罄">已抢完</a>
                </template>
                <template v-if="fastbuy.status == 4">
                    <a class="btn-buytrial act-btn-col2 act-btn-col2-1" ubt="buy" href="javascript:;" @click="subResult($event)" gsq="{{aObject.carGoodsId}}" gsqName="购车试算_01">购车试算</a>
                    <a class="btn-buysale act-btn-col2 act-btn-col2-3" ubt="buy" href="javascript:;" @click="rushBtnEv('本次闪购已结束')">活动已结束</a>
                </template>
            </div>
            <div class="pro proAction abs_size clearfix" v-else>
                <a class="btn-primary-gray" ubt="buy" v-if="!aObject.sta">暂未上架</a>
                <a class="btn-buytrial btnYe" ubt="buy" @click="subResult($event)"  gsq="{{aObject.carGoodsId}}" gsqName="购车试算_01" v-else>购车试算</a>
            </div>
        </div>

        <productaside v-ref:productaside :salecolor.sync="aObject" :saleku.sync="bObject"
        :datainfo.sync="data_carInfo" :btnstatus.sync="fastbuy" :show.sync="showRightAside"  :placement.sync="asideTowards" ></productaside>

    </div>
</template>
<script>
require('../../node_modules/swiper/dist/css/swiper.min.css');
var Swiper = require('swiper');

module.exports = {
    data: function(){
                return {
                    urlSource:'',//页面来源
                    carName:'',//车辆名称
                    timer1:0,
                    timer2:0,
                    timer3:0,
                    timer4:0,
                    timer5:null,
                  //  isScroller : true, //判断是是否为滚动还是点击
                    scrollFun:function(){},
                    reTime:function(){},
                    cdate:{
                        day:0,
                        hour:0,
                        minute:0,
                        second:0,
                    },
                    applyTime : {},
                    shareTitle:'',
                    dataA : {},
                    cid : '',
                    rushCarInfo : {}, // 活动车型信息存入LS
                    flagId : false, //用于判断carModelId/carGoodsId
                    dataB:{}, //用于评论
                    tapEvent : true, //防止重复提交
                    aObject:{/*select选中，scVaule颜色值*/
                        "select" : [],
                        "scVaule" : [],
                        "ymcPrice": '', //要买车价
                        "officePrice" : '', //官方价
                        "Spread" : 0, //差额
                        "loanPrice" : 0, //贷款价
                        "picUrl" : [],
                        "sta" : false,
                        "carGoodsId" : '',
                        "StoreSysNo":'',
                        "remark":'',
                        "isFinancialLeasing":false
                    },
                    bObject:{
                        'freight' : 0, //运费
                        'saleInventory' : '', //库存
                        'shippingDay': '' ,//运输时间，单位(day)
                        'sname' : '', //储运地点
                        'addName' : '', //提车地点
                        'sgs' : '', //环保保准
                        'carVCount' : 0, //多少人想买
                        'labelList' : [] //标签
                    },
                    showRightAside:false,
                    freight:false,
                    asideTowards:'right',
                    asidewidth:'',
                    carGoodsApiUrl : 'Products/CarGoods/GetCarGoodsAndModelInfo', //页面基础数据接口
                    data_car : {
                        carSpecial : [],//汽车特点
                        carConfigure : [] ,//汽车配置
                        comment : [],//评论
                    },
                    fastbuy: {}, //闪购
                    data_carInfo : {},
                    win : {
                        wScrollTop : 0
                    },
                    cdruid   : "",//车达人uid;
                    isCarMaster : ''//是否在车达人app中
           }

    },
    components: {
            productaside: require('./../components/productaside.vue'), // 车辆颜色侧边栏
    },
    computed:{

    },
    ready : function(){

    },
    watch:{
       'aObject.carGoodsId' : function(val, oldVal){
            this.aObject.carGoodsId = val;
            this.fastBuy();
       }
    },
    route: {
        data: function(transition){

            var _this = this;
            _this.reTime();
            _this.cid = router.app.cityId;
            _this.isCarMaster = router.app.isCarmaster;
            //_this.isScroller = true;
            _this.aObject.carGoodsId = this.$route.query.id || this.$route.query.carModelId;
            YMC.local('carGoodsIdApp',this.$route.query.id);

            _this.flagId = this.$route.query.carModelId ? true : false;  //判断是carModelId或是id
            _this.aObject.carGoodsId = _this.editeRid(_this.aObject.carGoodsId); //对于分享至微博微信，点击分享的链接进入详情页，参数错误修正

            if(_this.$route.query.source){
                _this.urlSource = _this.$route.query.source;
            }

            if(_this.flagId){
                this.dataA = {
                    "carModelId":_this.aObject.carGoodsId,
                    "areaId": _this.cid
                };
                _this.flagId = false;
            }else{
                this.dataA = {
                    "CarGoodsId":_this.aObject.carGoodsId,
                    "areaId": _this.cid
                };
            }

            //闪购
            _this.fastBuy();

            _this.fixClass();

            /*滚动*/
            _this.scrollFun = function(){
                _this.win.wScrollTop =  $(window).scrollTop();
                _this.init();
            }
            $(window).on('scroll', _this.scrollFun);

            YMC.ajax({
                url: _this.carGoodsApiUrl,
                data:_this.dataA,
                showLoading:true,
                success: function(res) {

                    if(!res.success){
                        VUI.alert(res.error.message,1500,function(){
                           //在车达人app中,不需要跳转到首页
                           if(!Prius.isCarMaster){
                               router.go( {name:'home'} );
                           }
                       });
                       return;
                    }

                    _this.timer3 = setTimeout(function(){
                      $(".proAction").css('bottom',0);
                      $(".proAction1").css('position','absolute');
                    },1000);

                 // console.log(JSON.stringify(res, null ,4))
                    _this.shareTitle = res.result.carModelInfo.carModelName;

                    // pc扫码国双统计
                    if(_this.$route.query.source == 'pc' && window._gsTracker){
                        _gsTracker.trackEvent("click","pc扫码统计",_this.shareTitle + '_' + _this.aObject.carGoodsId);
                    }

                    _this.dataB = {
                        "Id": res.result.carModelInfo.carModelId  //车型ID 请求用于评论
                    }
                    YMC.local("proComID",res.result.carModelInfo.carModelId); //配置参数 详情 评论

                    _this.data_carInfo = res.result;
                    _this.data_car.carSpecial = res.result.specialLabelList;
                    _this.data_car.carConfigure = res.result.carParamaterList;

                    /*设置车辆特点*/
                    _this.setLab(_this.data_car.carSpecial);

                    /*设置标题*/
                    router.app.$dispatch('updateTitle','<span class="vProtitle">'+res.result.carModelInfo.carBrandName+'</span>');
                    if(Prius.isCarMaster){
                        router.app.header = res.result.carModelInfo.carBrandName;
                    }
                    // YMC.log('carName'+ +new Date());
                    _this.carName = res.result.carModelInfo.carModelName;

                    //进入页面后的分享配置
                    _this.timer1 = setTimeout(function(){
                        // 显示分享按钮
                        router.app.customTop.share = true;
                        router.app.shareCfg = {
                            title:_this.shareTitle,
                            content:'',
                            url:window.location.href,
                            imgUrl:_this.aObject.picUrl[0] ? YMC.getResourceUrl(_this.aObject.picUrl[0]) : ''
                        }
                        if(YMC.isWeiXin){
                            YMC.wxShareCon({
                                wxTitle: router.app.shareCfg.title,
                                wxDesc: router.app.shareCfg.content,
                                wxLink: router.app.shareCfg.url,
                                wxImgUrl: router.app.shareCfg.imgUrl
                            });
                        }

                        //车达人分享
                        if(Prius.isCarMaster) {
                            var carGoodsId = YMC.local('carGoodsIdApp');
                            var cdruid = "";
                            var shcfg = router.app.shareCfg;
                            Prius.addGlobalEventListener("share", {
                               onGlobalEvent: function(data) {
                                    //app分享  //参考文档 http://10.16.35.57:8090/pages/viewpage.action?pageId=3866638
                                    Prius.shareInfoWithImg(
                                        shcfg.title,
                                        shcfg.imgUrl,
                                        shcfg.content,
                                        encodeURI(window.location.href+"&uid="+data.uid+"&title="+shcfg.title+"&shareLinkId="+carGoodsId),
                                        {}
                                    );
                               }
                            });
                        }

                    },1500);


                    Vue.nextTick(function () {
                        _this.swiperPic();
                    });

                },
                complete: function(){
                     /*用户评论*/
                    YMC.ajax({
                        url: 'Products/CarGoods/GetFirstCommentDetail',
                        data: _this.dataB,
                        success: function(res1){
                            if(!res1.success){
                                VUI.alert(res1.error.message);
                                return;
                            }

                          _this.data_car.comment = res1.result;

                        }
                    });
                }
            });
        },
        canDeactivate : function(transition){
            var _this = this;
            $(window).off('scroll', _this.scrollFun);
            $(".proAction").css('bottom','1px');
            $(".proAction1").css('position','static');
            $("header.hd").css({
                "position" : "fixed"
            });
            $("#tabA").removeClass("sFix");
            clearTimeout(_this.timer1);
            clearTimeout(_this.timer2);
            clearTimeout(_this.timer3);
            clearTimeout(_this.timer4);
            transition.next();
        }
    },
    methods:{

        swiperPic:function(){
         	/*banner*/
            new Swiper(this.$els.swiperpic, {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay:3000 //3秒自动切换
            });
        },
        editeRid : function(el){
            var u = el.match(/[\w-]+/);
            if(u){
                return u[0]
            }else {
                return '';
            }
        },
        setLab:function(obj){
            for (var i = obj.length - 1; i >= 0; i--) {
                    var pText = obj[i].title;
                    var className = '';
                    switch(pText){
                        case "操控好":
                           className = "con_good" ;
                            break;
                        case "空间大":
                           className = "con_big" ;
                            break;
                        case "油耗低":
                           className = "con_low" ;
                            break;
                        case "动力强":
                           className = "con_strong" ;
                            break;
                        case "安全性强":
                           className = "con_safe" ;
                            break;
                        case "四驱":
                           className = "con_four" ;
                            break;
                        case "7座":
                           className = "con_seat" ;
                            break;
                        case "性价比高":
                            className = "con_price" ;
                            break;
                    }
                    Vue.set(obj[i],'className',className);
                };
        },
        showRight:function(){
            var _this = this;
            this.showRightAside = true;
        },
        cdTime : function(time,fn){
            var _this = this,timeClient = time;
            timeClient -=1;
            if(timeClient >= 0){
                _this.cdate.day = Math.floor(timeClient/86400);
                _this.cdate.hour = _this.twonum(Math.floor(timeClient%86400/3600) +_this.cdate.day*24);
                _this.cdate.minute = _this.twonum(Math.floor(timeClient%86400%3600/60));
                _this.cdate.second = _this.twonum(timeClient%60);
            }else{
                if(fn){
                    fn();
                }
                return;
            }
            clearTimeout(_this.timer2);
            _this.timer2 = setTimeout(function(){
                _this.cdTime(timeClient,fn);
            },1000);

        },
        twonum : function(str){
            if(str<10){
                return "0"+str;
            }else{
                return str;
            }
        },
        startMove : function(target){
            var _this = this;
            clearInterval(_this.timer5);
            _this.timer5 = setInterval(function(){
                var iSpeed =(target - $(window).scrollTop())/5;
                iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

                if(target == $(window).scrollTop()){
                    clearInterval(_this.timer5);
                }else{
                    $(window).scrollTop($(window).scrollTop() + iSpeed);
                }
            },30);
        },
        fastBuy : function(){
            var _this = this;
            /*车辆闪购*/
            YMC.ajax({
                url: 'Products/CarGoods/GetPanicBuying',
                data:{"Id":_this.aObject.carGoodsId},
                success: function(res){
                    if(!res.success){
                        VUI.alert(res.error.message);
                        return;
                    }
                    _this.fastbuy =  res.result || {};

                   // console.log(JSON.stringify(res.result,null,4))
                    /*    var iNew = +new Date(res.result.endTime.replace(/-/g,'/'));
                        var iNow = +new Date(res.result.signUpTime.replace(/-/g,'/'));
                        var endTime = Math.floor((iNew - iNow)/1000);
                         _this.cdTime(endTime,function(){
                            console.log("a")
                            _this.cdTime(20,function(){
                                console.log("b")
                            });
                         });*/

                     if(res.result){

                        /*倒计时s*/
                        for(var i=0,len = res.result.nodes.length;i<len;i++){
                            if(res.result.nodes[i].itemName == "报名阶段"){
                                _this.applyTime = {
                                    'begTime' : res.result.nodes[i].beginDate.substring(0,res.result.nodes[i].beginDate.length-3),
                                    'endTime' : res.result.nodes[i].endDate.substring(0,res.result.nodes[i].endDate.length-3)
                                }
                            }
                       }
                       _this.reTime = function(){
                           _this.cdTime(Math.floor(res.result.registerEnd),function(){
                                _this.fastbuy.status = 2;
                                _this.cdTime(Math.floor(res.result.panicBuyBegin),function(){
                                    _this.fastbuy.status = 3;
                                    _this.cdTime(Math.floor(res.result.panicBuyEnd),function(){
                                        _this.fastbuy.status = 4;
                                    });
                                });
                             });
                        }
                        _this.reTime();
                       /*倒计时e*/

                        _this.rushCarInfo.ActivityId = res.result.panicBuyingActivityId;
                        _this.rushCarInfo.PanicBuyingCarGoodsId = res.result.cargoodsId;

                    }else{
                        _this.rushCarInfo.ActivityId = "";
                        _this.rushCarInfo.PanicBuyingCarGoodsId = "";
                    }
                }
            });
        },
         signUp : function() {
            var _this = this;
            router.go({
                name: 'rushEnr',
                query: {
                    panicBuyingCarGoodsId: _this.rushCarInfo.PanicBuyingCarGoodsId,
                    activityId:_this.rushCarInfo.ActivityId
                }
            });

        },
        subResult: function(event){
            var _this = this;
            if(_this.tapEvent){
                _this.tapEvent = false;
                YMC.ajax({
                    url: 'Products/ShoppingCart/CreateShoppingCart',
                    data: {
                        "CarGoodsId":_this.aObject.carGoodsId,
                        "StoreSysNo":_this.aObject.StoreSysNo,
                        "CityId":router.app.cityId
                    },
                    success: function(res){
                        _this.tapEvent = true;
                        if(!res.success){
                            VUI.alert(res.error.message);
                             return;
                        }
                        if(res.result){
                            YMC.local("__UserKey", res.result);
                        }
                        router.go( {name:'myBuyCar',query: {id: _this.aObject.carGoodsId }} );
                    },
                    error: function(){
                    },
                    beforeSend : function(){},
                    complete: function(){},
                    showLoading: true //是否显示loading效果
                });
            }
        },
        returnEle : function(){
            return {
                tab : $('#tabA'),
                prod : $('#proDescCon'),
                arra : $('#tabA a'),
                oh : $('#tabA').height(),
                elem : {
                    0:"proDescCon",
                    1:"service",
                    2:"buyCarStep"
                }
            }
        },
        init : function(){
            var _this = this;
            _this.timer4 = setTimeout(function () {
                _this.auscroll();
                _this.chioceItem();
            }, 0);
        },
        auscroll:function(){
            var _this = this,tarH = _this.returnEle().prod.offset().top;
            if(tarH <= _this.win.wScrollTop){
                    _this.returnEle().tab.addClass("sFix");
                    _this.returnEle().prod.css({
                        'margin-top' : _this.returnEle().oh
                    })
            }else if(tarH > _this.win.wScrollTop){
                    _this.returnEle().tab.removeClass("sFix");
                    _this.returnEle().prod.css({
                        'margin-top' : 0
                    })
            }

            /*解决标题与tab重叠问题*/
            if(tarH-80 >_this.win.wScrollTop){
                $("header.hd").css({
                    "position" : "fixed"
                })
            }else{
                $("header.hd").css({
                    "position" : "absolute"
                })
            }
        },
        distan:function(){
            var arr = [],_this =this,aItem = _this.returnEle().elem,oh = _this.returnEle().oh;
            $.each(aItem,function(key,value){
                arr.push(parseInt($("#"+value).offset().top) - oh);
            })
            return arr;
        },
        chioceItem:function(){
            var _this = this,data = _this.distan(),arra = _this.returnEle().arra;
            for(var i=data.length;i>=0;i--){
                if(_this.win.wScrollTop >= data[i]){
                    $(arra).removeClass("current");
                    $(arra[i]).addClass("current");
                    break;
                }
            }
        },
         fixClass:function(){
            var _this = this;
            $(document).on('click', '.tab a', function(e){
                //_this.isScroller = false;
                if($(this).hasClass("current")){return;}
                var absTop = _this.distan()[$(this).index()];
                _this.startMove(absTop);
                //$(window).scrollTop(absTop);

            })

            /*var aItem =  _this.returnEle().arra;
             $.each(aItem,function(index,item){
                $(item).on('click',function(e) {
                    if($(this).hasClass("current")){return;}
                    var absTop = _this.distan()[$(this).index()];
                    $(window).scrollTop(absTop);
                })
            })*/
        },
        rushBtnEv: function(s){
            var _this = this;
            if(s){
                VUI.alert(s, 1500);
            }else{
                if(!YMC.register.loginStatus()){
                    router.go( { name: '_login',query:{source: 'product'}} );
                }else{
                   // _this.rushCarInfoToLS();
                }
            }
        }

    },
    detached: function() {
        router.app.customTop.share = false;
    }
}


</script>


<style>
.vProduct{
    background-color: #f0f0f0;
    width: 100%;
    position: relative;
}
.vProduct .proDesc{
    padding-bottom: 100px;
}
.vProduct .mainautow .btn-primary,
.vProduct .btn-primary{
    width: 100%;
    border-radius: 0;
    margin: 0;
    color:#000;
    border:0 none;
    height: 50px;
    line-height: 50px;
    background-color: #ffa200;
}
.vProduct .pro .btn-primary-gray{
    background-color: #ccc;
}

.vProduct .mainautow .btn-buytrial,
.vProduct .mainautow .btn-buysale,
.vProduct .aside .btn-buytrial,
.vProduct .aside .btn-buysale{
    width: 100%;
    border-radius: 0;
    margin: 0;
    color:#000;
    border:0 none;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    text-align:center;
    font-size: 16px;
    display:block;
}
.vProduct .mainautow .btnYe,
.vProduct .aside .btnYe{
    background-color: #fdc400;
    color:#fff;
}
.vProduct .mainautow .btn-primary-gray,
.vProduct .aside .btn-primary-gray{
    background-color: #ccc;
    width: 100%;
    color:#797979;
    margin: 0;
    color:#000;
    border:0 none;
    height: 50px;
    line-height: 50px;
    display: block;
    text-align:center;
    font-size: 16px;
}


.vProduct .none {
    display: none !important;
}
.vProduct .blockA{
    display: block;
    width: 100%;
    height: 100%;
}
.vProduct .cor_yellow{
    color:#fdd000;
    margin: 0 3px;
}
.vProduct .aw100{
    position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
}
.vProduct img{
    border:0 none;
    vertical-align: bottom;
}
/*开始 proBaseInfo*/
.vProduct .supG:before,
.vProduct .pro_arr-right:before,
.vProduct .pro_arr-up:before,
.vProduct .pro_arr-down:before,
.vProduct .proDesc .tabc .configure,
.vProduct .proList li span,
.vProduct .proDesc .lis li span,
.vProduct .speedBuy .B-step li:before,
.vProduct .speedBuy .B-step ul li i,
.vProduct .comment-b em,
.vProduct .txt-tuan3::after{
        background:url("../imgs/proIco.png") no-repeat scroll 0 0 / 300px auto;
}
.vProduct .proPrice h1{
    padding:5px 0;
}
/*.vProduct{
	position: relative;
	z-index: 10000;
}*/
.vProduct .hd{
	position: static;
	background: #2a2d33;
	border-bottom: 0 none;
	color:#fff;
}
.vProduct .mainautow{

}
.vProduct .swiper-pagination{
    text-align: center;
}
.vProduct .swiper-pagination-bullet{
    background:#b6b6b6;
    border:0 none;
    width: 10px;
    height: 10px;
}
.vProduct .swiper-pagination-bullet-active{
    background: #7b7b7b;
}

.vProduct .proBaseInfo {
    background-color: white;
}
.vProduct .proBaseInfo .sliderImg{
    position: relative;
    overflow: hidden;
}
.vProduct .proBaseInfo .sliderImg .attention{
    /*background:rgba(255,255,255,.4);*/
    text-align: center;
    color: #ffa200;
    min-width: 40px;
    position: absolute;
    border:1px solid #ffa200;
    border-radius: 3px;
    z-index: 2;
    right: 10px;
    bottom: 10px;
    font-size: 12px;
    padding:5px;
    line-height: 16px;
}
.vProduct .proBaseInfo .sliderImg .attention span{
    font-size: 14px;
    display: block;
}
.vProduct .proBaseInfo .sliderImg .attrSrc {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 300px auto;
    min-height: 220px;
}


/* 平常 */
.vProduct .proPrice{
    padding:10px;
}
.vProduct .proPrice .desc{
    color:#fe6863;
    margin: 0 0 10px 0;
}
/* 新的闪购 */

.vProduct .speedBuy .B-step{
    padding:15px 10px;
    font-size: 14px;
    color:#999;
    border-bottom: 1px solid #f0f0f0;
}
.vProduct .speedBuy .B-step ul li{
    position: relative;
    height: 25px;
    line-height: 25px;
    width: 35%;
    float: left;
    padding-left: 7%;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
}
.vProduct .speedBuy .B-step ul li:last-child{
    width: 30%;
}
.vProduct .speedBuy .B-step ul li i{
    position: absolute;
    width: 20px;
    height: 25px;
    left:75%;
    top:0;
    background-size: -250px auto;
    background-position: -275px -185px;

}
.vProduct .speedBuy .B-step li:before{
    position: absolute;
    content: "";
    left:0;
    top:0;
    width: 15px;
    height: 25px;
}
.vProduct .speedBuy .B-step li.on{
    color:#ffb745;
}
.vProduct .speedBuy .B-step li:nth-child(1):before{
    background-position: -189px -183px;
}
.vProduct .speedBuy .B-step li:nth-child(2):before{
    background-position: -220px -183px;
}
.vProduct .speedBuy .B-step li:nth-child(3):before{
    background-position: -251px -183px;
}
.vProduct .speedBuy .B-step li.on:nth-child(1):before{
    background-position: -189px -205px;
}
.vProduct .speedBuy .B-step li.on:nth-child(2):before{
    background-position: -220px -205px;
}
.vProduct .speedBuy .B-step li.on:nth-child(3):before{
    background-position: -251px -205px;
}

.vProduct .speedBuy .B-steprice{
    padding:10px;
}
.vProduct .speedBuy .B-steprice .sho{
    color: #ccc;
    text-decoration: line-through;
    font-size: 12px;
}
.vProduct .speedBuy .B-steprice .desc{
    color: #f65252;
    margin: 10px 0 20px 0;
}
.vProduct .speedBuy .B-steprice .normal{
    padding:5px 0;
    color:#999;
    margin:10px 0;
    border-left: 1px solid #e4e4e4;
    border-right: 1px solid #e4e4e4;
    position: relative;
}
.vProduct .speedBuy .B-steprice .normal div{
    width: 120px;
    height: 50px;
    margin:0 auto;
    background: #fff;
    text-align: center;
    position: relative;
    z-index: 2;
}
.vProduct .speedBuy .B-steprice .normal:before{
    content: "";
    position: absolute;
    width: 100%;
    height: 10px;
    top:50%;
    margin-top: -8px;
    left: 0;
    border-bottom: 1px solid #e4e4e4;
}
.vProduct .speedBuy .B-steprice .normal span,.vProduct .speedBuy .B-steprice .fast span{
    font-size: 16px;
    color:#ffa320;
}
.vProduct .speedBuy .B-steprice .normal em,.vProduct .speedBuy .B-steprice .fast em{
    color:#333;
    margin-left: 3px;
}
.vProduct .speedBuy .B-steprice .fast{
    color:#999;
    margin: 10px 0;
}
.vProduct .speedBuy .B-steprice .fast ul li{
    border-right: 1px solid #e4e4e4;
    text-align: center;
}
.vProduct .speedBuy .B-steprice .fast ul li:last-child{
    border-right: 0 none;
}



.vProduct .speedBuy .B-cd{
    background: #fffdea;
    padding:25px 0;
    color:#333;
    text-align: center;
    position: relative;
}

.vProduct .speedBuy .B-cd div{
    width: 190px;
    margin:0 auto;
    background: #fffdea;
    text-align: center;
    position: relative;
    z-index: 2;
}
.vProduct .speedBuy .B-cd:before{
    content: "";
    position: absolute;
    width: 80%;
    height: 10px;
    top:50%;
    margin-top: -9px;
    left: 10%;
    border-bottom: 1px solid #eee26b;
}
.vProduct .speedBuy .B-cd:before{
    content: "";
    position: absolute;
    width: 80%;
    height: 10px;
    top:50%;
    margin-top: -9px;
    left: 10%;
    border-bottom: 1px solid #eee26b;
}
.vProduct .speedBuy .B-cdover{
    background: #ffebea;
    color:#f65252;
}
.vProduct .speedBuy .B-cdover:before{
    border-bottom: 1px solid #f7bcb9;
}
.vProduct .speedBuy .B-cdover div{
    background: #ffebea;
}

.vProduct .speedBuy .B-cd span{

}
.vProduct .speedBuy .B-cd em{
   display: inline-block;
   width: 25px;
   height: 20px;
   line-height: 20px;
   background: #2a2d33;
   color:#fff;
   border-radius: 3px;
   margin:0 2px;
   text-align: center;
}
.vProduct .speedBuy .B-cd em:first-child{
    margin-left:10px;
}


.vProduct .speedBuy .B-date{
    padding:10px 0;
    text-align: center;
    color:#f65252;
    background: #ffebea;
}

.vProduct .speedBuy .B-price{
    padding:10px;
    color:#725d00;
    background: #ffd200;
}
.vProduct .speedBuy .B-price .normal{

}

.vProduct .speedBuy .B-price .normal span{
    padding:4px 8px;
    background: #987d02;
    color:#fff;
    border-radius: 3px;
}
.vProduct .speedBuy .B-price em.sho{
    color: #cea802;
    text-decoration: line-through;
    margin-left: 15px;
}
.vProduct .speedBuy .B-price .fast{

}
.vProduct .speedBuy .B-price .fast b{
    font-weight: normal;
    display: block;
}
.vProduct .speedBuy .B-price .fast ul{
    margin: 10px 0
}
.vProduct .speedBuy .B-price .fast li:nth-child(1),
.vProduct .speedBuy .B-price .fast li:nth-child(2){
    padding-right: 10px;
}
.vProduct .speedBuy .B-price .fast li span{
    border:1px dashed #725d00;
    border-radius: 3px;
    display: block;
}
.vProduct .speedBuy .B-price .fast li span i,
.vProduct .speedBuy .B-price .fast li span em{

    text-align: center;
    padding:4px 0;
}
.vProduct .speedBuy .B-price .fast li span i{
    font-style: normal;
    float: left;
    width:35%;
}

.vProduct .speedBuy .B-price .fast li span em{
    color:#fff;
    float: right;
    width:65%;
    background: #987d02;
}

.vProduct .proBaseInfo ul.txtS li h1{
    background: #f4f4f4;
    padding:10px 10px 10px 95px;
    border-bottom: 1px solid #e4e4e4;
    position: relative;
}
/* 新的闪购end */

/* 闪购 */


.vProduct .proBaseInfo ul.txtS li.spec-act-tlt{
    color: #262626;
    line-height: 20px;
    min-height: 20px;
}
.vProduct .proBaseInfo ul.txtS li h1.nodai{
    padding:10px;
}
.vProduct .proBaseInfo ul.txtS li h1 .dai{
    position: absolute;
    top:0;
    left: 0;
    width: 70px;
    padding-left:22px;
    height: 100%;
    background: #fe6863;
    color:#fff;
    line-height: 22px;
    font-size: 14px;
}
.vProduct .proBaseInfo ul.txtS li h1 .dai span{
    position: absolute;
    top:50%;
    margin-top: -25%;
}

.vProduct .proBaseInfo ul.txtS li h1 .dai span:after{
    position: absolute;
    content: "";
    width:20px;
    height:18px;
    left:-20px;
    top:50%;
    margin-top: -10px;
    background:url("../imgs/daiico.jpg") no-repeat center center / 14px auto;
}
.vProduct .proBaseInfo ul.txtS li{
/*     color: #262626; */
/*     line-height: 20px; */
    min-height: 20px;
    /* padding: 10px 5px 0; */
}
.vProduct .proBaseInfo li h1 {
    color: #333;
    font-size: 16px;
    line-height: 24px;
    font-weight:normal;
}
.vProduct .proBaseInfo ul.txtS li .supG{
    position: relative;
    padding:5px 7px 5px 29px;
    color:#fff;
    border-radius: 3px;
    background: #f7cf15;
    display: inline-block;
}
.vProduct .proBaseInfo .daikuan{
    color:#666;
}
.vProduct .proBaseInfo .daikuan i{
    color:#fe6863;
}
.vProduct .proBaseInfo .daikuan p{
    color:#999;
    position: relative;
    font-size: 12px;
    padding-left: 15px;
}
.vProduct .proBaseInfo .daikuan p:before{
    color:#999;
    display: block;
    content: "i";
    position: absolute;
    left: 0;
    top: 4px;
    text-align: center;
    width:12px;
    height: 12px;
    line-height: 12px;
    border-radius: 50%;
    background: #fe6863;
    color:#fff;
    font-size: 12px;
}
.vProduct .proBaseInfo ul.txtS li .supG:before{
    position: absolute;
    content: "";
    width:25px;
    height: 20px;
    left:0;
    top:0;
    background-position: 2px -40px;
    color:#999;
}

.vProduct .proBaseInfo .proPrice p span{
    text-decoration: line-through;
    font-size: 12px;
    color:#999;
}
.vProduct .proBaseInfo .proPrice .priceoff{
    color:#666;
}
.vProduct .proBaseInfo .proPrice .priceoff b,.vProduct .slideCon .s-t-text h2{
    color:#fe6863;
    font-size: 20px;
    font-weight: normal;
}

.vProduct .proBaseInfo .proPrice .priceoff em, .vProduct .slideCon .s-t-text i{
    font-size: 10px;
    color:#666;
}

.vProduct .proBaseInfo .protip{
    color:#666;
    border-top:1px solid #f2f2f2;
    padding:0px 10px 10px;
}
.vProduct .proBaseInfo .protip span{
    border:1px solid #999;
    float: left;
    padding:0 5px;
    height: 22px;
    line-height: 22px;
    border-radius: 2px;
    font-size: 12px;
    margin:10px 5px 0 0;
}
span.vProtitle{
    display: inline-block;
/*     line-height: 22px; */
    height: 50px;
    overflow: hidden;
    width: 80%;
/*     margin: 5px 0 0; */
    color:#fff;
}
span.vProtitle i{
    display: block;
    font-size: 12px;
    color:#ccc;
}

/*团购*/
.vProduct .cff4c66{
	color: #ff4c66;
}
.vProduct .proBaseInfo .tuan-price-infos{
    color: #999;
}
.vProduct .tuan-price-infos .txt-price{
	margin-right: 10px;
	font-size: 16px;
}
.vProduct .txt-tuan{
    position: relative;
    display: inline-block;
    font-weight: normal;
    color: #fff;
    text-align: center;
}
.vProduct .txt-tuan::before{
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    font-size: 0;
    border: 4px solid rgba(255,255,255,0);
}
.vProduct .txt-tuan1,.vProduct .txt-tuan3,.vProduct .txt-tuan4{
    margin-right: 10px;
    padding: 2px 6px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    background-color: #E7223E;
    border-radius: 4px;
}
.vProduct .txt-tuan1::before{
    top: 8px;
    right: -8px;
    border-left-color: #E7223E;
}
.vProduct .txt-tuan2{
    margin-left: 10px;
    padding: 0 4px;
    font-size: 12px;
    height: 16px;
    line-height: 16px;
    background-color: #FD6862;
    border-radius: 2px;
}
.vProduct .txt-tuan2::before{
    top: 4px;
    left: -8px;
    border-right-color: #FD6862;
}
.vProduct .txt-tuan3{
    margin:0 0 0 10px;
    padding: 2px 6px 2px 15px;
    background-color: #fe6863;
}
.vProduct .txt-tuan3::before{
    top: 8px;
    left: -8px;
    border-right-color: #fe6863;
}
.vProduct .txt-tuan3::after{
    content: '';
    position: absolute;
    width: 18px;
    height: 24px;
    background-position:0px -64px;
    left: 0px;
    top:0;
}
.vProduct .txt-tuan4{margin: 0 0 0 10px;}
.vProduct .txt-tuan4::before{
    top: 8px;
    left: -8px;
    border-right-color: #E7223E;
}

/*detailList*/
.vProduct .detailList {
    font-size: 14px;
    color: #595959;
    background: #fff;
    border-bottom: 10px solid #f9f9f9;
    position: relative;
    z-index: 1;
}
.vProduct .detailList h1{
    font-weight: normal;
}
/*高度自适应*/
.vProduct .detailList .enableH{
    min-height: 22px;
    line-height: 22px;
    padding:15px 30px 15px 10px;
}
/*高度固定*/
.vProduct .detailList .arrow,
.vProduct .proDesc .arrow,
.vProduct .speedBuy .arrow,
.vProduct .slideR-b .arrow{
    height: 52px;
    line-height: 52px;
    padding:0 30px 0 10px;
}
.vProduct .proDesc .carConfig .arrow,
.vProduct .txtS .speedBuy .B-link .arrow{
    padding:0;
}
.vProduct .proDesc .config .openNewPage h3 span,
.vProduct .speedBuy .B-link .openNewPage h3 span{
    padding-left:10px;
}
.vProduct .proDesc .carConfig .openNewPage {
    position: relative;
    z-index: 1;
}
.vProduct .detailList .arrow,
.vProduct .detailList .enableH,
.vProduct .proDesc .arrow,
.vProduct .slideR-b .arrow{
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
    position: relative;
    color:#999;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;

}
.vProduct .detailList .borderN,
.vProduct .detailList .borderN,
.vProduct .proDesc .borderN,
.vProduct .slideR-b .borderN{
    border: 0 none;
}
.vProduct .detailList .itemPAR,
.vProduct .slideR-b .itemPAR{
    padding-right:16px;
}
.vProduct .comment .arrow:before,
.vProduct .B-link .arrow:before,
.vProduct .detailList .arrow:before,
.vProduct .config .arrow:before,
.vProduct .proDesc .proList .item_arr-right:before,
.vProduct .proDesc .config .lis .blockA:before{
    right:5px;
}
.vProduct .detailList .item_arr-right:before{
    /*opacity: .3;*/
}

.vProduct .detailList .arrow h3,
.vProduct .detailList .enableH h3,
.vProduct .slideR-b .arrow h3,
.vProduct .speedBuy .arrow h3,
.vProduct .proDesc .arrow h3{
    float: left;
    font-weight: normal;
}
.vProduct .detailList .enableH h3,
.vProduct .detailList .arrow h3,
.vProduct .detailList .arrow p span,
.vProduct .speedBuy .arrow p span,
.vProduct .slideR-b .arrow h3,
.vProduct .proDesc .arrow h3 span,
.vProduct .slideR-b .arrow p span{
    color:#333;
}
.vProduct .detailList .arrow p,
.vProduct .slideR-b .arrow p,
.vProduct .detailList .enableH p,
.vProduct .proDesc .arrow p{
    float: right;
    text-align: right;
}

.vProduct .detailList .last {
    border: 0;
    padding-bottom: 5px;
}
.vProduct .detailList .chioceC span i em,
.vProduct .detailList .arrow p i em{
    padding: 0;
    margin:0;
    width: 6px;
    height: 12px;
    display: block;
    float: left;
}


/*tab*/
.vProduct .proDesc {
    width: 100%;
    overflow: hidden;
    position: relative;
}
.vProduct .proDesc.headerfixed{
    padding-top:76px;
}
/*.instead{
    height:50px;
    width: 100%;
    background:rgba(0,0,0,0);
    position: absolute;
    left:0;
    top:0;
}*/
@-webkit-keyframes fixed{
    0%{
        -webkit-transform: translate(0,-50px);
    }
    100%{
        -webkit-transform: translate(0,0);
    }
}
@-moz-keyframes fixed{
    0%{
        -moz-transform: translate(0,-50px);
    }
    100%{
        -moz-transform: translate(0,0);
    }
}
@keyframes fixed{
    0%{
        transform: translate(0,-50px);
    }
    100%{
        transform: translate(0,0);
    }
}

.vProduct .tab {
    background-color: #fff;
    height: 51px;
    line-height: 51px;
    border-bottom: 1px solid #f1f1f1;
    padding:15px 0 0;
    width: 100%;
}
.vProduct .sFix {
    position: fixed;
    top:0;
    left: 0;
    z-index: 100;
    margin-top: 0;
    z-index: 1000;
    -webkit-animation:fixed 0.3s ease-out 0s 1 normal none;
    -moz-animation:fixed 0.3s ease-out 0s 1 normal none;
    animation:fixed 0.3s ease-out 0s 1 normal none;
}

.vProduct .tab a {
    width:33%;
    float: left;
    display:block;
    text-align: center;
    font-size: 14px;
    color:#999;
    height:33px;
    line-height: 33px;
    border-right:1px dashed #eaeaea;
}

.vProduct .tab a span {
    display: inline-block;
    height:33px;
}

.vProduct .tab a.current span {
    color: #333;
    border-bottom: 2px solid #f7cf15;
}

.vProduct .proDesc .tabc {
    font-size: 14px;
    background:#fff;
    padding-top: 15px;
    color: #838a99;
}
.vProduct .proDesc .tabc li{
    float: left;
    width: 33%;
    text-align: center;
    margin-bottom: 15px;
}
.vProduct .proDesc .tabc span.configure {
    display: inline-block;
    width: 80px;
    padding:80px 0 0;
}
.vProduct .proDesc .tabc  span.con_good{
    background-position:  -26px 0;
}
.vProduct .proDesc .tabc  span.con_big{
    background-position:  -120px 0;
}
.vProduct .proDesc .tabc  span.con_low{
    background-position:  -215px 0;
}
.vProduct .proDesc .tabc  span.con_strong{
    background-position:  -26px -83px;
}
.vProduct .proDesc .tabc  span.con_safe{
    background-position:  -120px -83px;
}
.vProduct .proDesc .tabc  span.con_four{
    background-position:  -215px -83px;
}
.vProduct .proDesc .tabc  span.con_seat{
    background-position:  -26px -166px;
}
.vProduct .proDesc .tabc  span.con_price{
    background-position:  -109px -166px;
}

.vProduct .proDesc .arrow{
    background: #fff;
    margin:10px 0 0;
 }
.vProduct .proDesc .config .table{
    background: #fff;
}
.vProduct .proDesc .config .table ul{
    padding-left:2%;
}

.vProduct .proDesc .config .table ul li{
    float: left;
    width: 48%;
    text-align: center;
}
.vProduct .proDesc .config .table ul li{
    border-right: 1px solid #f1f1f1;
    border-top: 1px solid #f1f1f1;
    padding:10px 0;
}
.vProduct .proDesc .config .table ul li:nth-child(-n+2){
    border-top:0 none;
}
.vProduct .proDesc .config .table ul li:nth-child(2n){
    border-right: 0 none;
}
.vProduct .proDesc .config .table ul li em{
    color:#999;
    font-size: 12px;
}
/* .vProduct .proDesc .config table {
    background-color: #f9f9f9;
    width: 100%;
    color:#595959;
    font-size: 12px;
}
.vProduct .proDesc .config table td{
    padding:0 10px;
    color: #444;
    border-right: 1px solid #f1f1f1;
}
.vProduct .proDesc .config table td:nth-child(2n){
    text-align: left;
    color:#999;
}
.vProduct .proDesc .config table tr {
    height: 40px;
    border-bottom: 1px solid #f1f1f1;
    background-color: #fff;
} */
.vProduct .proDesc .config .lis{
    background: #fff;
}
.vProduct .proDesc .config .lis li{
    text-align: left;
    color: #999;
    font-size: 12px;
    overflow: hidden;
    padding:15px 30px 15px 5px;
    border-bottom: 1px solid #f1f1f1;
    position: relative;
}
.vProduct .proDesc .config .lis li span{
    display: inline-block;
    padding: 80px 0 0;
    width: 80px;
    float: left;
    margin-right: 10px;
}
.vProduct .proDesc .config .lis li p{
    font-size: 14px;
    color:#444;
    margin: 18px 0 0;
}
.vProduct .proDesc .config .lis li p b{
    display: block;
    color:#444;
}
.vProduct .proDesc .config .lis li span.li-1 {
    background-position: -8px -251px;
}
.vProduct .proDesc .config .lis li span.li-2 {
    background-position: -111px -251px;
}
.vProduct .proDesc .config .lis li span.li-3 {
    background-position: -214px -251px;
}
.vProduct .proDesc .config .lis li span.li-4 {
    background-position: -8px -423px;
}


/*评论*/
.vProduct .comment{
    background: #fff;
}
.vProduct .comment-t{
    height: 52px;
    line-height: 52px;
    padding: 0 30px 0 10px;
    border-bottom: 1px solid #f1f1f1;
    color:#595959;
}
.vProduct .comment-b{
    padding:0 10px;
}
.vProduct .comment-b em{
    display: block;
    width:80px;
    height: 80px;
    margin:10px auto 0;
    background-position: -111px -423px;
}
.vProduct .comment-b li{
    border-bottom: 1px solid #f1f1f1;
    margin-top: 15px;
}
.vProduct .comment-b .noCom{
    color:#b4b4b4;
    text-align: center;
    padding:10px 0;
    display: block;
}
.vProduct .comment-b li:last-child{
    border:0 none;
}
.vProduct .comment-b .cominfo b{
    font-weight: normal;
    color:#ffc822;
}
.vProduct .comment-b .cominfo span{
    font-size:12px;
    color:#ccc;
}
.vProduct .comment-b .comtext{
    margin-top: 10px;
    padding-bottom: 15px;
    color:#666;
    font-size: 13px;
}


/*承诺*/
.vProduct .myPromise{}
.vProduct .myPromise .proList{
    overflow: hidden;
    width: 100%;
     background: #fff;
}
.vProduct .myPromise .proList li{
    text-align: left;
    color: #999;
    font-size: 12px;
    overflow: hidden;
    padding:15px 30px 20px 5px;
    border-bottom: 1px solid #f1f1f1;
    position: relative;
}

.vProduct .myPromise .proList li:nth-child(n+3){
    border-bottom: 0 none;
}

.vProduct .myPromise .proList li span{
    display: inline-block;
    padding: 80px 0 0;
    width: 80px;
    float: left;
    margin-right: 10px;
}
.vProduct .myPromise .proList li p{
    font-size: 14px;
    color:#444;
    margin: 4px 0 0;
}
.vProduct .myPromise .proList li p b{
    display: block;
    color:#444;
}
.vProduct .myPromise .proList li span.li-1 {
    background-position: -8px -338px;
}
.vProduct .myPromise .proList li span.li-2 {
    background-position: -111px -338px;
}
.vProduct .myPromise .proList li span.li-3 {
    background-position: -214px -338px;
}

.vProduct .proPrice .priceoff strong{
    font-weight: normal;
}
/*step*/
.vProduct .buyCarStep .step{
    padding:20px 0;
    background: #fff;
    width: 100%;
    overflow: hidden;
}
.vProduct .buyCarStep .step li{
    height: 40px;
    line-height: 40px;
    text-align: center;
    color:#666;
    font-size: 12px;
}

/*buy*/
.vProduct .proAction {
    bottom: 0;
    left: 0;
    right:0;
    height: 50px;
    width: 100%;
    z-index: 2;
    color:#000;
    position: fixed;
    border-top: 1px solid #f1f1f1;
}

/*button*/
.vProduct  .spec-act-tlt .act-slogan{padding: 5px 0 0 15px;color: #999;font-size: 14px; display: inline-block;}
.vProduct  .proBaseInfo .spec-act-tlt h1{color: #262626;}
.vProduct  .proBaseInfo ol.act-price-steps{padding:10px 0 0;}
.vProduct  .proBaseInfo ol.act-price-steps li{
    padding:4px 0 4px 10px; color: #999;font-size: 12px;line-height: 1.2;
    border-bottom: none;background-color:#fff;
}
.vProduct ol.act-price-steps .act-price-step2,
.vProduct ol.act-price-steps .act-price-step3{
    border-left:1px dashed #E4E4E4;
}
.vProduct ol.act-price-steps li div{display: table-cell;vertical-align: middle; text-align:left;}
.vProduct ol.act-price-steps li .act-price-tag{min-width:3em;font-size: 11px;}
.vProduct ol.act-price-steps li .cf22d26{font-size: 15px;color:#f22d26;}
.vProduct ol.act-price-steps li span.priWan{text-align: center; margin-left:5px;}
.vProduct ol.act-price-steps li span.priWan em{font-size: 10px; margin-left: 3px;}
.vProduct .of-price{font-size: 12px;color: #ccc;}
.vProduct .of-price del{color: #333;}
.vProduct .btn-primary{width: 100%; border-radius: 0; margin: 0;}
.vProduct .pro{padding:0;}
.vProduct .pro .btn{height: 50px;margin:0;border-width: 0;line-height: 50px;border-radius: 0;}
.vProduct .pro .act-btn-col2{float: left;width: 50%;color:#000;}
.vProduct .act-btn-col2.act-btn-col2-1{background-color:#fff;}
.vProduct .act-btn-col2.act-btn-col2-2{background-color:#f65252; color:#fff;}
.vProduct .act-btn-col2.act-btn-col2-3{background-color:#ddd; color:#fff;}
.vProduct .pro .btn small{font-size:11px;}


</style>