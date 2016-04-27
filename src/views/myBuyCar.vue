<template>
  <div class="mycar mainautow mainhd" v-bind:class="{'car-expert':logic.cdr}">
    <ul class="mybuycar_list">
      <li v-for="(index, it) in items">
        <div class="edit_panel" :class="{'edit_panelS': it.active}" v-on:click="itemdeletefn(index)">
          <a href="javascript:;" class="mybuy_btnz del_btn">删除</a>
        </div>
        <div class="inner" :class="{'innerA': it.active}" v-touch:swiperleft="listswiperleftFn(index)"  v-touch:swiperright="swiperRightFn(index)">
          <div class="title" v-if="it.groupPurchaseCarGoods">
            <a href="javascript:;" class="fr shareicon" data-shareurl="http://www.qq.com" data-sharetext="{{it.carName}}" data-shartimg = "{{it.picURL}}">share</a>
            <span>{{it.areaName}}</span>{{it.carName}}<label class="txt-tuan">团购特惠</label>
          </div>
          <div class="title" v-if="!it.groupPurchaseCarGoods">
            <a href="javascript:;" class="fr shareicon" data-shareurl="http://www.qq.com" data-sharetext="{{it.carName}}" data-shartimg = "{{it.picURL}}">share</a>
            <span>{{it.areaName}}</span>{{it.carName}}<label class="txt-tuan" v-if="it.panicBuyingOutput">闪购</label>
          </div>

          <div class="p0_5">
            <div class="myflex clearfix">
              <div class="flex-item box1">
                <a ubt="loan" class="wh100 loHref1" Lid="" v-on:click.prevent="series($event, index, {name: 'loan'})">
                  <p class="box_title fs14">{{it.loanInfo.title}}</p>
                  <p v-show="!(it.ymcCarGoodsPrice==it.loanPrice)" class="low-loan">{{it.ymcCarGoodsPrice}}，{{it.loanPrice}}贷款购车，更优惠更时尚！<br />点我变更购车方式。</p>
                  <p v-show="it.loanInfo.value">{{it.loanInfo.value}}</p>
                  <p v-show="it.loanInfo.other">{{it.loanInfo.other}}</p>
                </a>
              </div>
              <div class="flex-item box2">
                <a ubt="selectedPackage" class="wh100 loHref2" Lid="" v-on:click.prevent="">
                  <p class="box_title fs14">{{it.productInfo.title}}</p>
                  <p class="low-loan"><strong>服务升级，暂停购买</strong></p>
                </a>
                <!-- <a v-if="it.productInfo.price !== 0" ubt="selectedPackage" class="wh100 loHref2" Lid="" v-on:click.prevent="series($event, index, {name: 'selected_package'})">
                  <p class="box_title fs14">{{it.productInfo.title}}</p>
                  <p><strong>{{it.productInfo.value}}</strong></p>
                  <p>¥{{it.productInfo.price | priceInt}}</p>
                </a>
                <a v-else ubt="selectedPackage" class="wh100 loHref2" Lid="" v-on:click.prevent="series($event, index, {name: 'selected_package'})">
                  <p class="box_title fs14">点击选择精品</p>
                </a>          -->
              </div>
            </div>
            <div class="car_price clearfix">
              <div class="fr" v-if="it.groupPurchaseCarGoods">
                <p>车价：<span :class="{'cross-out':it.loanInfo.title.indexOf('全额')!=-1}">¥{{it.groupPurchaseCarGoods.groupPurchasePrice | priceInt}}</span></p>
                <p>购置税：¥{{it.purchaseTax | priceInt}}</p>
                <p>{{it.purchaseTaxTitle}}</p>
              </div>
              <div class="fr" v-else>
                <p v-if="it.panicBuyingOutput">闪购价：<span :class="{'cross-out':it.loanInfo.title.indexOf('全额')==-1}">¥{{it.panicBuyingOutput.panicBuyingPrice | priceInt}}</span></p>
                <!--<p v-else>要买车价：<span :class="{'cross-out':it.loanInfo.title.indexOf('全额')==-1}">¥{{it.ymcCarGoodsPrice | priceInt}}</span></p>-->
                <p v-else>要买车价：<span :class="{'cross-out': (!(it.ymcCarGoodsPrice==it.loanPrice)) && it.loanInfo.title.indexOf('全额')==-1}">¥{{it.ymcCarGoodsPrice | priceInt}}</span></p>
                <!--<p >贷款购车价：<span :class="{'cross-out':it.loanInfo.title.indexOf('全额')!=-1}">¥{{it.loanPrice | priceInt}}</span></p>-->
                <p  v-show="!(it.ymcCarGoodsPrice==it.loanPrice)">贷款购车价：<span :class="{'cross-out':it.loanInfo.title.indexOf('全额')!=-1}">¥{{it.loanPrice | priceInt}}</span></p>
                <p>购置税：¥{{it.purchaseTax | priceInt}}</p>
                <p>{{it.purchaseTaxTitle}}</p>
              </div>
            </div>
            <div class="myflex clearfix">
              <div class="flex-item box3">
                <i class="ico ico-hot"></i>
                <a ubt="insurance" class="wh100 loHref3" Lid="" v-on:click.prevent="series($event, index, {name: 'insurance'})">
                  <p class="box_title fs14">{{it.insuranceInfo.title}}</p>
                    <p>{{it.insuranceInfo.value}}</p>
                    <!-- <p>{{it.insuranceInfo.other}} <span v-if="it.insuranceInfo.isForced && it.loanInfo.period">(含{{it.loanInfo.period/12}}年商业车险)</span></p> -->
                    <p>{{it.insuranceInfo.other}}</p>
                </a>
              </div>
              <div class="flex-item box4">
                <a ubt="service" class="wh100 loHref4" Lid="" v-on:click.prevent="series($event, index, {name: 'service'})">
                  <p class="box_title fs14">{{it.serviceInfo.title}}</p>
                  <p class="ellips">{{it.serviceInfo.value}}</p>
                  <p>¥{{it.serviceInfo.price | priceInt}}</p>
                </a>
              </div>
            </div>
            <div class="clearfix pro_img_panel" v-sturl="it.picURL">
              <a ubt="carLogo" v-link="{name: 'product', query: {id: it.carGoodsId }}"></a>
            </div>
          </div>
          <div class="bottom_panel">
            <!-- <p v-show="it.shippingFee">异地运输费：¥<span>{{it.shippingFee | currency ''}}</p> -->
            <p>异地运输费<span style="color:#ff4040;">（新春特惠免运费）</span></p>
            <div class="allPrice">
              <span v-if="!logic.cdr">
                <span v-if="it.panicBuyingOutput">
                  <a v-if="it.panicBuyingOutput.status===0" ubt="payBtn_{{it.carGoodsId}}" class="fr mybuy_btnz payBtn mybuy_btnz-disabled" v-on:click="buyfn($event, index)"><small class="fs12">报名未开始</small></a>
                  <span v-if="it.panicBuyingOutput.status===1">
                      <a v-if="it.panicBuyingOutput.isSignUp  && !isCarmaster" ubt="payBtn_{{it.carGoodsId}}" class="fr mybuy_btnz payBtn mybuy_btnz-disabled countdown" v-on:click="buyfn($event, index)">等待闪购</a>
                      <span v-else>
                        <a v-if="it.panicBuyingOutput.isEnrollingFull" ubt="payBtn_{{it.carGoodsId}}" class="fr mybuy_btnz payBtn mybuy_btnz-disabled" v-on:click="buyfn($event, index)"><small>报名人数已满</small></a>
                        <a v-else ubt="payBtn_{{it.carGoodsId}}" class="fr mybuy_btnz payBtn" v-link="{name: 'rushEnr', query:{activityId:it.panicBuyingOutput.panicBuyingActivityId,panicBuyingCarGoodsId:it.carGoodsId}}" gsqName="报名">报名</a>
                      </span>
                  </span>

                  <span v-if="it.panicBuyingOutput.status===2   && !isCarmaster">
                    <a ubt="payBtn_{{it.carGoodsId}}" class="fr mybuy_btnz payBtn mybuy_btnz-disabled" :class="{'countdown': it.panicBuyingOutput.isSignUp}" v-on:click="buyfn($event, index)">闪购未开始</a>
                  </span>
                  <span v-if="it.panicBuyingOutput.status===3">
                    <a v-if="it.saleInventory<=0  && !isCarmaster" ubt="payBtn_{{it.carGoodsId}}" class="fr mybuy_btnz payBtn mybuy_btnz-disabled" v-on:click="buyfn($event, index)">已抢完</a>
                    <a v-else ubt="payBtn_{{it.carGoodsId}}" class="fr mybuy_btnz payBtn" v-on:click="buyfn($event, index)" gsq="{{it.carGoodsId}}" gsqName="立即闪购">立即闪购</a>
                  </span>
                  <a v-show="it.panicBuyingOutput.status===4" ubt="payBtn_{{it.carGoodsId}}" class="fr mybuy_btnz payBtn mybuy_btnz-disabled" v-on:click="buyfn($event, index)">活动已结束</a>
                </span>
                <span v-else>
                  <a v-show="it.saleInventory<=0  && !isCarmaster" ubt="payBtn_{{it.carGoodsId}}" class="fr mybuy_btnz payBtn mybuy_btnz-disabled" v-on:click="buyfn($event, index)">支付定金</a>
                  <a v-show="it.saleInventory>0   && !isCarmaster" ubt="payBtn_{{it.carGoodsId}}" class="fr mybuy_btnz payBtn" v-on:click="buyfn($event, index)" gsq="{{it.carGoodsId}}" gsqName="支付定金按钮_01">支付定金</a>
                </span>
              </span>
              <span class="col_price clearfix">
                总价约：<span class="price" v-if="it.groupPurchaseCarGoods">¥{{it.groupPurchaseCarGoods.shoppingCarPrice | priceInt}}</span><span v-else class="price">¥{{it.totalAmount | priceInt}}</span>
              </span>
              <span>{{it.purchaseTaxTitle1}}</span>
            </div>
            <div v-if="it.panicBuyingOutput" class="fs12" style="color:#666;margin-top:5px;font-style:italic;">提示：车源与交车地不一致时会产生附加运费，运费标准约2元／公里，具体以闪购时的运费提示为准。</div>
          </div>
        </div>
      </li>
    </ul>
    <!-- 分享内容 -->
    <!-- <div id="shareDiv" class="bdsharebuttonbox shareDiv" data-tag="share" style="display:none;">
      <h3>分享到：</h3>
      <ul class="flex">
        <li class="flex-item"><a class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a></li>
        <li class="flex-item"><a class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博">腾讯微博</a></li>
      </ul>
    </div> -->

    <div id="shareOver" style="display:none;">
      <img width="100%" src="../imgs/shareguidance.png" />
    </div>
    <input id="shareUrl" data-url="" type="hidden" />
    <input id="shareText" data-txt="" type="hidden" />
    <input id="shareImg" data-img="" type="hidden" />

    <div class="markdiv" v-show="logic.showMarkdiv" style="display:none;" v-on:touchmove.stop.prevent></div>

    <a ubt="addnew" v-link="{name: 'brandList'}" v-show="logic.loaded" class="mybuycar_addnew"></a>
    <div class="Guide" v-show="logic.showGuide" style="display:none;" v-on:click="logic.showMarkdiv = logic.showGuide = false " v-on:touchmove.stop.prevent><img src="../imgs/Guide.png" width="100%" /></div>


  </div>
</template>

<script>

// require('../../node_modules/swiper/dist/css/swiper.min.css');
// var Swiper = require('swiper');
// require('../touch');
require('../zepto.cookie');

// Vue.config.debug = true
  module.exports = {
    //props: ['父组建传的值'],
    data:function(){
      return {
        items: [],
        dataA: {
          "userId":"3",
          "userKey":"",
          "cityId": router.app.cityId
        },
        logic: {
          showMarkdiv: false,
          showGuide: false,
          ctdTimeArr: [],
          timeId: null,
          loaded: false,
          // 车达人内隐藏支付按钮
          cdr: Prius.isCarMaster
        },
        isCarmaster : false,
        jmpPrefix: '../page/'
        // it: {
        //   loanInfo: {},
        //   insuranceInfo: {},
        //   serviceInfo: {},
        //   productInfo: {}
        // }
      }
    },
    computed:{

    },
    //这里才是route的生存周期
    route:{
      //waitForData: true, //数据加载完毕后再切换试图，也就是 点击之后先没反应，然后数据加载完，再出发过渡效果
      data: function(transition) {
        var _this = this;
        // YMC.log(router.app.cityId);
        this.dataA.cityId = router.app.cityId;

        // 修改title
        router.app.$dispatch('updateTitle','我的购车方案');
        // 隐藏头部分享按钮
        router.app.customTop.share = false;

        _this.isCarmaster = router.app.isCarmaster;

        /*解决手机click事件延迟300ms*/
        // FastClick.attach(document.body);

        // var $li = $('<li class="flex-item"><a class="bds_weixin" title="分享到微信">微信朋友</a></li>'),
        //   $shareOver = $('#shareOver'),mark = null;
        // if(YMC.isWeiXin){
        //   $("#shareDiv ul.flex").append($li);
        // }
        // $('.bds_weixin').on('click', function(){
        //   if(mark){
        //     $('.shareDiv ').toggleClass("shareDivUp");
        //     $shareOver.show();
        //   }
        // });


        // 重新加载数据，清空页面数据（修复切换时价格变动的问题）
        _this.items = [];

        // load the content
        YMC.ajax({
          url: 'Products/ShoppingCart/GetShoppingCartList',
          // url: 'http://localhost:8080/json/GetShoppingCartList.json',
          showLoading: true,
          data: _this.dataA,
          success: function (res) {
            if(!res.success){
              VUI.alert(res.error.message);
              return;
            }

            _this.logic.loaded = true;

            var resultData = res.result;

            // 图片连接转换
            // for(var i=0;i< resultData.items.length;i++){
            //   resultData.items[i].picURL =  YMC.getResourceUrl(resultData.items[i].picURL);
            // }

            // 为每个元素添加一个属性用于左滑操作
            resultData.items.forEach(function(val, key, arr){
              val.active = false;
            });

            // 先显示两条数据，1s后加重其他数据
            var arrLess = resultData.items.slice(0,2);
            _this.items = arrLess;
            setTimeout(function(){
              _this.items = resultData.items;
            },1000);
            // _this.items = resultData.items;

            // YMC.log("myBuyCar数据获取成功");
            // 数据获取后执行dom操作
            // Vue.nextTick(function () {
              // 重新进入该页面时，清空定时器数组
              _this.logic.ctdTimeArr = [];

              // 闪购倒计时
              if(resultData&&resultData.items&&resultData.items.length){
                resultData.items.forEach(function(v,i){
                    if(v.panicBuyingOutput&&v.panicBuyingOutput.isSignUp&&(v.panicBuyingOutput.status==1||v.panicBuyingOutput.status==2)){
                        _this.logic.ctdTimeArr.push(parseInt(v.panicBuyingOutput.remainingTime));
                        // _this.logic.ctdTimeArr.push(parseInt(60*60*24+2));
                    }
                });
              }
              if(_this.logic.ctdTimeArr.length){
                if(_this.logic.timeId){clearInterval(_this.logic.timeId);}
                _this.logic.timeId = setInterval(_this.countdown,1000);
              }


              // 判断用户是否是第一次进来，如果是第一次进来，则出现引导层，否则不出现引导层
              setTimeout(function(){
                // cookie设置begin
                var faList = $(".mybuycar_list li");
                if(faList && faList.length>0){
                  if($.fn.cookie('Guide') == "cookieMaiche"){
                    _this.logic.showGuide = false;
                    _this.logic.showMarkdiv = false;
                  }else{
                    _this.logic.showGuide = true;
                    _this.logic.showMarkdiv = true;
                    $.fn.cookie('Guide','cookieMaiche',{ expires: 9000000})
                  }  //cookie设置end
                }
              },300)


              // 左滑删除（使用事件代理）
              // $(".mybuycar_list").off("swipeLeft").off("swipeRight").on("swipeLeft",'.inner',function(){
              //   var aInner = $(".inner"),aDel_btn = $(".edit_panel");
              //   $.each(aInner,function(index1, item2){
              //     $(item2).removeClass("innerA");
              //     $(item2).prev().removeClass("edit_panelS");
              //   });
              //   $(this).addClass("innerA");
              //   $(this).prev().addClass("edit_panelS");
              // }).on("swipeRight",'.inner',function(){
              //   if($(this).hasClass("innerA")){
              //     $(this).removeClass("innerA");
              //     var This = $(this);
              //     setTimeout(function(){
              //       This.prev().removeClass("edit_panelS");
              //     },300)
              //   }
              // });

              transition.next();

            // });

            // Vue.nextTick(function(){
            //   transition.next();
            // });
          },
          error: function(e){
              VUI.alert("网络连接失败，请稍后再试", 1500, function(){
              //     //$(".uiload").hide();
              });
          },
          beforeSend : function(){},
          complete: function(){


          }
        });


      }
    },
    methods:{
      swiperLeftFn: function(index){
        var _this = this;
        _this.items[index].active = true;
      },
      swiperRightFn: function(index){
        var _this = this;
        _this.items[index].active = false;
      },
      listswiperleftFn: function(index){
        var _this = this;
        for (var i = 0; i < _this.items.length; i++) {
          _this.items[i].active = false;
        };
        _this.items[index].active = true;
      },
      series: function(ev, index, parameter){
        var $item = $(ev.target);
        if(!$item.hasClass('wh100')){
          // $item = $item.parents('.wh100');
          $item = $item.closest('.wh100');
        }
        var $carli = $item.closest('li');

        var imteId = this.items[index].id;

        var _host = window.location.href.split("page")[0]+"/page/";
        YMC.local("carGID",this.items[index].carGoodsId);

        if(window._track){
            _track.data.productId = this.items[index].carGoodsId;
        }

        // 国双统计
        if (window._gsTracker && (window.location.href.match('http(s)?:\/\/m.yaomaiche.com'))) {
          if($item.hasClass("loHref1")){
            _gsTracker.trackEvent("click","贷款方案",this.items[index].carGoodsId);
          }else if($item.hasClass("loHref2")){
            _gsTracker.trackEvent("click","精品套餐",this.items[index].carGoodsId);
          }else if($item.hasClass("loHref3")){
            _gsTracker.trackEvent("click","车险方案",this.items[index].carGoodsId);
          }else if($item.hasClass("loHref4")){
            _gsTracker.trackEvent("click","尊享服务",this.items[index].carGoodsId);
          }
        }


        /**
         * weijing
         * 在车达人app内 newpage
         * 2015年11月19日23:56:04
         */
        var pagetit = "",tarUrl = "";
        if($item.hasClass("loHref1")){
            tarUrl = '/#/loan'+"?id="+ imteId;
            pagetit = "购车付款方式";
        }else if($item.hasClass("loHref2")){
            tarUrl  = '/#/selected_package'+"?id="+ imteId;
            pagetit = "我的精品套餐方案";
        }else if($item.hasClass("loHref3")){
            tarUrl = '/#/insurance'+"?id="+ imteId;
            pagetit = "我的车险方案";
        }else if($item.hasClass("loHref4")){
            tarUrl = '/#/service'+"?id="+ imteId;
            pagetit = "尊享服务";
        }

        // if(Prius.isCarMaster){
        //   // Prius.openNewPage(pagetit, _host+tarUrl);
        //   Prius.openNewPage(pagetit, 'http://'+window.location.host +tarUrl);
        // }else{
        //   // window.location.href = tarUrl;
        //   parameter.query = {};
        //   parameter.query.id = imteId;
        //   router.go(parameter);
        // }
        parameter.query = {};
        parameter.query.id = imteId;
        router.go(parameter);
      },

      // 活动车型信息存入LS，供活动页使用
      // rushCarInfoToLS:function(actId, carId){
      //   var rushCarInfo = {};

      //   rushCarInfo.ActivityId = actId;
      //   rushCarInfo.PanicBuyingCarGoodsId = carId;
      //   YMC.local("rushCarInfo", JSON.stringify(rushCarInfo));
      // },

      // 点击支付定金、闪购等按钮时触发
      buyfn: function(ev, index){
        var _this = this;
        var $item = $(ev.target);
        if(!$item.hasClass('payBtn')){
          $item = $item.closest('.payBtn');
        }
        if(!$item.hasClass("mybuy_btnz-disabled")){
          var data_item = _this.items[index];
          var imteId = data_item.id,
              carGID = data_item.carGoodsId;
          YMC.local("carGID",carGID);
          // if($item.text().replace(/\s+/g,'')=='报名'){
          //   _this.rushCarInfoToLS(actId,carGID);
          //   // window.location.href = "rush-enrollment.html";
          //   window.location.href = _this.jmpPrefix+"rush-enrollment.html";
          //   // router.go({name: 'rushEnr'});
          // }else{
          //   // window.location.href = 'checkout.html'+"?id="+ imteId;
          //   router.go({name: 'checkout', query: {id: imteId}});
          // }
          router.go({name: 'checkout', query: {id: imteId}});
        }
      },
      // 时间格式化
      timeFormat: function(time){
        return time.toString().length>1?time:"0"+time;
      },
      // 倒计时
      countdown: function(){
        var _this = this;
        // ctdTimeArr的值以秒为单位
        var i = 0, temp=0,
          day = 0,
          hour = 0,
          minute = 0,
          second = 0,
          str = "",
          ctdEle = $(".countdown");

        for(i;i<_this.logic.ctdTimeArr.length;i++){
          temp = _this.logic.ctdTimeArr[i];

          if(temp>0){
            day = parseInt(temp/3600/24),
            hour = parseInt(temp/3600 - day*24),
            minute = parseInt(temp/60 - day*24*60 - hour*60),
            second = temp - day*24*3600 - hour*3600 - minute*60;

            _this.logic.ctdTimeArr[i] -= 1;

            str = (day?(day+"天"):"")+_this.timeFormat(hour)+":"+_this.timeFormat(minute)+":"+_this.timeFormat(second)+"后闪购";
            $(ctdEle[i]).html('<small class="fs12">'+str+'</small>');
          }else{
            // clearInterval(_this.logic.timeId);
            // ctdEle.removeClass("mybuy_btnz-disabled").text('立即闪购');
            _this.logic.ctdTimeArr.splice(i,1);
            $(ctdEle[i]).removeClass("mybuy_btnz-disabled countdown").text('立即闪购');
          }
        }
        if(_this.logic.ctdTimeArr.length==0){clearInterval(_this.logic.timeId);}
      },

      // 删除一组元素，并将数据提交至服务器
      itemdeletefn: function(index){
        var _this = this;

        // 提交删除数据
        YMC.ajax({
          url: 'Products/ShoppingCart/DeleteShoppingCart',
          data: {"ID":_this.items[index].id},
          success: function(res){
            // 如果删除数据成功则删除本地数据
            _this.items.splice(index,1);
          },
          error: function(){
          },
          beforeSend : function(){},
          complete   : function(){
            /**
             * 2015年11月18日20:02:33
             * 如果在车达人app内,删除全部购车方案
             * 返回上一页面
             */
            if(Prius.isCarMaster){
              var n=$(".mybuycar_list li").length;
              if(n<1){
                $(".mybuycar_list").remove();
                $(".mycar").append("<div class='empty-msg' style='text-align:center;line-height:150px;background:#f9f9f9;font-size:1rem;'>暂无购车方案,请返回重新加入~</div>");
              }
            }
          },
          showLoading: false //是否显示loading效果
        });

        // 删除统计 start
        var _adwqUid = YMC.local("ymcToken") ? JSON.parse(YMC.local("ymcToken")).userid : '';
        var curCarId = _this.items[index].cargoodid;
        _adwq.push([ '_setDataType','delete' ]);
        _adwq.push([ '_setCustomer',
          _adwqUid   // 当前登陆用户ID或用户名，未登录情况下传空字符串
        ]);
        _adwq.push(['_setItem',
          curCarId,    // 商品编号  - 必填项
          '',       // 商品名称  - 必填项
          '',    // 商品金额  - 必填项
          '1',        // 商品数量  - 必填项
          '',     // 商品分类编号  - 必填项
          ''        // 商品分类名称  - 必填项
        ]);
        _adwq.push([ '_trackTrans' ]);
        // 删除统计 end

      }
    },
    ready: function(){

    },
    detached: function(){
      if(this.logic.timeId){clearInterval(this.logic.timeId);}
      this.logic.loaded = false;
    }
  }
</script>
<style src="../css/mybuycar.css"></style>