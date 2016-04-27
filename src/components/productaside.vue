<template>
  <div>
      <div class="aside_components_mask"
              v-show="show"
              transition="modal"
              @touchmove.stop.prevent
              @click.stop="markClick">
      </div>
      <div class="aside"
            :class="placement"
            v-show="show"
            style="width: 85%; max-width:480px;height:100%; overflow:visible;"
            v-bind:transition="slideTransition">

     <!-- 滚动区域start -->
      <div class="swiper-container swiper-sideBar" v-el:swiperside @touchmove.stop.prevent>
          <div class="swiper-wrapper">
              <div class="swiper-slide">
                  <div class="slideCon">
                      <div class="slideR-t clearfix">
                          <div class="s-t-pic fl" >
                              <div class="carPbg" v-sturl="onItem.picUrl[0]"></div>
                          </div>
                          <div class="s-t-text abs_size fl">
                              <h2 v-if="side.btns.panicBuyingPrice && side.btns.status>0">¥{{side.btns.panicBuyingPrice | priceW}} <i>万</i></h2>
                              <h2 v-else>¥{{onItem.ymcPrice | priceW}} <i>万</i></h2>
                              <ul>
                                  <li v-if="( onItem.sta && !(side.btns.status==0 || side.btns.status==1 || side.btns.status==2) )">
                                    <span>{{kuCun.saleInventory}}</span>
                                  </li>
                                  <li><span>外观：</span>
                                    <i v-bind:style="{backgroundColor:onItem.scVaule[0]}"></i>{{onItem.select[0]}}</li>
                                  <li v-if="twoC"><span>内饰：</span>
                                    <i v-bind:style="{backgroundColor:onItem.scVaule[1]}"></i>{{onItem.select[1]}}</li>
                                  <li v-else><span>内饰：</span>
                                    <i class="cleafix">
                                      <em v-bind:style="{backgroundColor:onItem.doubleColor[0]}"></em>
                                      <em v-bind:style="{backgroundColor:onItem.doubleColor[1]}"></em>
                                    </i>{{onItem.select[1]}}
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div class="slideR-b">
                          <div class="textArr">
                              <div class="arrow itemPAR clearfix" v-show="onItem.sta">
                                  <h3>提车地点</h3>
                                  <p>{{kuCun.addName}}</p>
                              </div>
                              <div class="arrow itemPAR borderN clearfix" v-show="onItem.sta">
                                  <h3>异地运输费</h3>
                                  <p><em style="color:#ff4040;">(新春特惠免运费)</em></p>
                                  <!-- <p><span>¥{{kuCun.freight}}</span>({{kuCun.sname}})</p> -->
                              </div>
                          </div>
                          <div class="colorsArr">
                               <div ubt="outColor" class="chioceC">
                                  <h3>外观颜色</h3>
                                  <div class="chioceC-Out">
                                      <ul class="clearfix">
                                          <li v-for="item in side.colorEx"
                                          v-bind:class="{'selectOn' : onItem.selectOnEx.indexOf(item.exName)  !=-1,'select' : (onItem.select[0] && onItem.select[0] === item.exName) }"
                                          @click.stop="chioceColor($event,'ex')" ubt="{{item.exName}}" gsq="{{item.exColorId}}" gsqName="{{item.exName}}"
                                          >{{item.exName}}</li>
                                      </ul>
                                  </div>
                              </div>
                              <div ubt="innerColor" class="chioceC">
                                  <h3>内饰颜色</h3>
                                  <div class="chioceC-In">
                                      <ul class="clearfix">
                                          <li v-for="item in side.colorIn"
                                               v-show="onItem.selectOn.indexOf(item.inName) !=-1"
                                               v-bind:class="{'selectOn' : onItem.selectOnIn.indexOf(item.inName) !=-1,'select' : (onItem.select[1] && onItem.select[1] === item.inName) }"
                                               @click.stop="chioceColor($event,'in')" ubt="{{item.inName}}" gsq="{{item.exColorId}}" gsqName="{{item.inName}}"
                                          >{{item.inName}}</li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
        <!-- 滚动区域end -->
            <div class="pro proAction1 abs_size clearfix" v-if="side.btns.status>=0 && onItem.sta">
                <template v-if="side.btns.status == 0">
                    <a class="btn-buytrial act-btn-col2 act-btn-col2-1" ubt="buy" href="javascript:;" @click="subMit($event)" gsq="{{onItem.carGoodsId}}" gsqName="购车试算" >购车试算</a>
                    <a class="btn-buysale act-btn-col2 act-btn-col2-3" ubt="buy" href="javascript:;" @click="rushBtnEv('闪购报名还未开始')">闪购资格报名</a>
                </template>
                <template v-if="side.btns.status == 1">
                      <a class="btn-buytrial act-btn-col2 act-btn-col2-1" ubt="buy" href="javascript:;" @click="subMit($event)" gsq="{{onItem.carGoodsId}}" gsqName="购车试算">购车试算</a>
                      <a v-if="side.btns.isEnrollingFull" class="btn-buysale act-btn-col2 act-btn-col2-3" ubt="buy" gsq="{{onItem.carGoodsId}}" gsqName="报名" @click="rushBtnEv('报名人数已满')">报名人数已满</a>
                      <a v-else class="btn act-btn-col2 act-btn-col2-2" ubt="buy" @click="signUp()" gsq="{{onItem.carGoodsId}}" gsqName="报名">立即报名</a>
                </template>
                <template v-if="side.btns.status == 2">
                    <a class="btn-buytrial act-btn-col2 act-btn-col2-1" ubt="buy" href="javascript:;" @click="subMit($event)" gsq="{{onItem.carGoodsId}}" gsqName="购车试算">购车试算</a>
                    <a class="btn-buysale act-btn-col2 act-btn-col2-3 fs12" ubt="buy" href="javascript:;" @click="rushBtnEv('闪购还未开始')" gsq="{{onItem.carGoodsId}}" gsqName="开始闪购">闪购未开始</a>
                </template>
                <template v-if="side.btns.status == 3">
                    <a class="btn act-btn-col2 act-btn-col2-1" ubt="buy" href="javascript:;" @click="subResult($event)" gsq="{{onItem.carGoodsId}}" gsqName="购车试算">购车试算</a>
                    <a v-if="kuCun.saleInventory != '售罄' " class="btn act-btn-col2 act-btn-col2-2" ubt="buy" href="javascript:;" @click="subMit($event)" gsq="{{onItem.carGoodsId}}" gsqName="立即闪购">立即闪购</a>
                    <a v-else class="btn act-btn-col2 act-btn-col2-3" ubt="buy" href="javascript:;"  gsq="{{onItem.carGoodsId}}" gsqName="售罄">已抢完</a>
                </template>
                <template v-if="side.btns.status == 4">
                    <a class="btn-buytrial act-btn-col2 act-btn-col2-1" ubt="buy" href="javascript:;" @click="subMit($event)" gsq="{{onItem.carGoodsId}}" gsqName="购车试算">购车试算</a>
                    <a class="btn-buysale act-btn-col2 act-btn-col2-3" ubt="buy" href="javascript:;" @click="rushBtnEv('本次闪购已结束')">活动已结束</a>
                </template>
            </div>
            <div class="pro proAction1 abs_size clearfix" v-else>
                <a class="btn-primary-gray" ubt="buy" v-if="!onItem.sta">暂未上架</a>
                <a class="btn-buytrial btnYe" ubt="buy" @click="subMit($event)" gsq="{{onItem.carGoodsId}}" gsqName="购车试算" v-else>购车试算</a>
            </div>
            <!-- 按钮区域end -->

    </div>
</div>
</template>
<script>

require('../../node_modules/swiper/dist/css/swiper.min.css');
var Swiper = require('swiper');

module.exports = {
    data: function() {
        return {
           side : {
                dataCar : {}, //车辆信息
                colorEx: [], //车辆外饰颜色
                colorIn: [], //车辆内饰颜色
                btns : {},
                ctime : {}
            },
            swi : null,
            swflag : true,
            rushCarInfo:{}, // 活动车型信息存入LS
            kuCun : {
                'freight' : 0, //运费
                'saleInventory' : '', //库存
                'shippingDay': '' ,//运输时间，单位(day)
                'sname' : '', //储运地点
                'addName' : '', //提车地点
                'sgs' : '', //环保保准
                'carVCount' : 0, //多少人想买
                'labelList' : []//标签
            },
            twoC: true, /*是否为*/
            tapEvent : true, //防止重复提交
            onItem : {/*select选中，scVaule颜色值*/
                "selectOnEx": [], //可选择的外饰颜色
                "selectOnIn" : [], //可选择的内饰颜色
                "selectOn" : [], //对应的内饰颜色
                "select" : [],
                "scVaule" : [],
                "doubleColor" : [],
                "sta" : false,
                "ymcPrice": '', //要买车价
                "officePrice" : '', //官方价
                "Spread" : 0, //差额
                "loanPrice" : 0, //贷款价
                "picUrl" : [],
                "carGoodsId" : '',
                "StoreSysNo":'',
                "remark":'',
                "isFinancialLeasing":false
            }
        }
    },
    props: {
        show: {
            type: Boolean,
            require: true
        },
        salecolor:{
            type:Object
        },
        saleku:{
            type:Object
        },
        btnstatus :{
            type : Object
        },
        datainfo: {
            type : Object
        },
        placement: {
            type: String
        },
        width: {
            type: String
        },
        fn: {
            type: Function
        }
    },
    ready: function() {
        var _this = this;


    },
    watch:{
       'datainfo' : function(val, oldVal){
            this.side.dataCar = val;
            this.resultUiColor(val);
            this.editColorAttr(val);
       },
       'btnstatus' : function(val, oldVal){
            this.side.btns = val;
            this.fastBuy(val);
       }
    },
    computed: {
        slideTransition: function() {
            return 'slide' + this.placement;
        }
    },
    methods: {
        chooseColorSendUBTData:function(){
          var _this = this;
          if(window._track){
            //车辆名称，价格，productId
            //整合上报
            _track.clickData = {};
            var _t = {};
            _t[_this.onItem.select.join(':')] = 1;
            _track.setProduct({
              parameters : {
                carName:_this.$parent.carName,
                price:(_this.onItem.ymcPrice+''),
                source:(_this.$parent.urlSource||'')
              },
              clickData:_t,
              productId : _this.onItem.carGoodsId,
              pShow : 'productShow'
            });
          }
        },
        markClick: function() {
            this.show = false;
        },
        swiperSide:function(){
          var _this = this;
          _this.swi = new Swiper(this.$els.swiperside,{
                direction: 'vertical',
                slidesPerView: 'auto',
                mousewheelControl: true,
                freeMode: true,
                autoHeight: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                autoplayDisableOnInteraction:false,
                freeMode: true,
                onTouchMove : function(){
                  if(_this.swflag){
                    _this.swflag = false;
                    _this.swiperSide();
                  }
                }
            });
        },
        unique:function(arr,attr){
            var _arr = arr.slice();
            var res = [];
            var json = {};
            for(var i=0;i<_arr.length;i++){
                if(!json[_arr[i][attr]]){
                    res.push(JSON.parse(JSON.stringify(_arr[i])));
                    json[_arr[i][attr]] = _arr[i][attr];
                }
            }
            return res;
        },
        resultUiColor:function(res){
            var res1 = res.colorList;
            this.side.colorEx = this.unique(res1,'exColorId');
            this.side.colorIn = this.unique(res1,'inColorId');
        },
        editColorAttr:function(res){
            var _this = this;
            var res1 = res.colorList;

            this.onItem.selectOnEx = [];
            this.onItem.selectOnIn = [];
            this.onItem.selectOn = [];
            this.onItem.select = [];
            this.onItem.scVaule = [];
            this.onItem.picUrl = [];

            /*赋值*/
            function valuationInit(sel){
                // YMC.log('valuationInit');
                sel.onItem.officePrice = res.carModelInfo.officePrice;
                sel.kuCun.addName = res.storeList[0].name;
                sel.kuCun.sgs = res.carModelInfo.rohs;
                sel.onItem.StoreSysNo = res.storeList[0].sysId;

                sel.onItem.select.push(res1[i].exName,res1[i].inName);
                sel.onItem.isFinancialLeasing = res1[i].isFinancialLeasing;
                sel.onItem.scVaule.push(res1[i].exrbg,res1[i].inrbg);
                sel.onItem.ymcPrice = res1[i].ymcPrice;
                sel.onItem.remark = res1[i].remark;

                sel.onItem.picUrl.push(res1[i].picUrls[0]);
                sel.onItem.carGoodsId = res1[i].carGoodsId;
                sel.onItem.sta = res1[i].status;
                sel.onItem.loanPrice = res1[i].loanPrice;
                sel.onItem.Spread = Number(sel.onItem.officePrice) - Number(sel.onItem.ymcPrice);

            }



            var saleTrue = false,selectExName='';
            for(var i=0;i<res1.length;i++){
                if(res1[i].status){
                    saleTrue = true;
                }
                if(res1[i].isSelected == true){
                  selectExName = res1[i].exName;
                }
            }

            for(var i=0;i<res1.length;i++){
              if(res1[i].exName == selectExName){
                this.onItem.selectOn.push(res1[i].inName);
              }
            }


            if(saleTrue){
                for(var i=0;i<res1.length;i++){
                     if(res1[i].status){
                      /*selectOnEx,selectOnIn代表入选的外、内颜色*/
                        this.onItem.selectOnEx.push(res1[i].exName);
                        if(res1[i].exName == selectExName){
                          this.onItem.selectOnIn.push(res1[i].inName);
                        }

                        if(res1[i].isSelected == true){
                          valuationInit(this);
                        }

                    }
                }
            }else{
                for(var i=0;i<res1.length;i++){
                    if(res1[i].isSelected == true){
                        valuationInit(this);
                    }
                }
            }

            this.salecolor = this.onItem;
            this.sale();
            this.saleku = this.kuCun;
            this.isTwoc();

            //默认选中的时候的埋点上报
            this.chooseColorSendUBTData();

            this.$nextTick(function(){
                this.swiperSide();
            });
        },
        chioceColor:function(event,s){
            var _this = this;
            //YMC.log('chioceColor');
            /*赋值*/
            function valuation(sel){
                sel.onItem.scVaule.push(resColorList[i].exrbg,resColorList[i].inrbg);
                sel.onItem.ymcPrice = resColorList[i].ymcPrice;
                sel.onItem.picUrl.push(resColorList[i].picUrls[0]);
                sel.onItem.carGoodsId = resColorList[i].carGoodsId;
                sel.onItem.remark = resColorList[i].remark;

                sel.onItem.sta = resColorList[i].status;
                sel.onItem.isFinancialLeasing = resColorList[i].isFinancialLeasing;
                sel.onItem.loanPrice = resColorList[i].loanPrice;
                sel.onItem.Spread = Number(sel.side.dataCar.carModelInfo.officePrice) - Number(sel.onItem.ymcPrice);
                YMC.local('carGoodsIdApp',resColorList[i].carGoodsId);
            }

            var that = $(event.target);
            var resColorList = this.side.dataCar.colorList;
            var s1=s2=s3= true;
            thisText  = $.trim($(that).text());
            /*防止重复提交*/
            if($(that).hasClass('select')){return;}

            if(s=="ex"){ /*点击外饰*/
                this.onItem.selectOnIn = [];
                this.onItem.selectOn = [];
                this.onItem.scVaule = [];
                this.onItem.picUrl = [];

                for(var i=0;i<resColorList.length;i++){
                    if(resColorList[i].exName == thisText){
                      this.onItem.selectOn.push(resColorList[i].inName);
                    }
                }
                for(var i=0;i<resColorList.length;i++){
                      /*代表入选的颜色*/
                      if( resColorList[i].exName == thisText && resColorList[i].status){
                          this.onItem.selectOnIn.push(resColorList[i].inName);
                      }
                }

                for(var i=0;i<resColorList.length;i++){
                        if( resColorList[i].exName == thisText && resColorList[i].status && resColorList[i].inName == this.onItem.select[1] ){
                            this.onItem.select.splice(0,2,resColorList[i].exName,resColorList[i].inName);
                            if(this.onItem.scVaule.length<=0){
                                valuation(this);
                                s2 = false;
                                s1 = false;
                            }
                        }
                }


                if(s1){
                  for(var i=0;i<resColorList.length;i++){

                        if( resColorList[i].exName == thisText && resColorList[i].status){
                            this.onItem.select.splice(0,2,resColorList[i].exName,resColorList[i].inName);
                            if(this.onItem.scVaule.length<=0){
                                valuation(this);
                                s2 = false;
                            }
                        }
                    }
                }


                if(s2){
                     for(var i=0;i<resColorList.length;i++){
                        if( !resColorList[i].status && resColorList[i].exName == thisText){
                              if(this.onItem.scVaule.length<=0){
                                  this.onItem.select.splice(0,2,thisText,resColorList[i].inName);
                                  valuation(this);
                              }
                          }
                    }
                }

           }else{/*点击内饰*/

                this.onItem.scVaule = [];
                this.onItem.picUrl = [];

                for(var i=0;i<resColorList.length;i++){
                        if( resColorList[i].inName == thisText  && resColorList[i].exName == this.onItem.select[0] && resColorList[i].status ){
                            if(this.onItem.scVaule.length<=0){
                                this.onItem.select.splice(this.onItem.select.length-1,1,thisText);
                                valuation(this);
                                s3 = false;
                               }
                        }
                }

                if(s3){
                     for(var i=0;i<resColorList.length;i++){
                        if( resColorList[i].inName == thisText && resColorList[i].exName == this.onItem.select[0] && !resColorList[i].status ){
                            if(this.onItem.scVaule.length<=0){
                                this.onItem.select.splice(this.onItem.select.length-1,1,thisText);
                                valuation(this);
                            }
                        }
                    }
                }
           }

            //选择颜色埋点上报
            this.chooseColorSendUBTData();

            this.salecolor = this.onItem;
            this.saleku = this.kuCun;
            this.sale();
            this.isTwoc();
        },
        sale : function(){
             /*库存、运输费*/
            var _this = this;
            YMC.ajax({
                 url: 'Products/CarGoods/GetCarGoodsSourceInfo',
                 data:{
                  "CarGoodsId":_this.onItem.carGoodsId,
                  "areaId": router.app.cityId
                },
                 success: function(res){

                    if(!res.success){
                        VUI.alert(res.error.message);
                        return;
                    }

                    _this.kuCun.freight = res.result.freight;
                    _this.kuCun.saleInventory = res.result.saleInventory;
                    _this.kuCun.shippingDay = res.result.shippingDay;
                    _this.kuCun.sname = res.result.name ? res.result.name : "暂无";

                 }
            });

            /*多少人想买*/
            YMC.ajax({
                url: 'Products/CarGoods/UpdateUniqueVisitorCount',
                data:{"Id":_this.onItem.carGoodsId},
                success: function(res){
                    if(!res.success){
                        VUI.alert(res.error.message);
                        return;
                    }

                    _this.kuCun.carVCount =  res.result.carModelUVCount;
                }
            });

              /*车辆标签*/
            YMC.ajax({
                url: 'Products/CarGoods/GetCarGoodsLabelList',
                data:{"Id":_this.onItem.carGoodsId},
                success: function(res){
                    if(!res.success){
                        VUI.alert(res.error.message);
                        return;
                    }
                    var label= res.result;
                    _this.kuCun.labelList = [];


                    for(var i=0;i<label.length;i++){
                        _this.kuCun.labelList.push(label[i].title)
                    }

                }
            });
        },
        isTwoc:function(){
            var _this = this;
            if(_this.onItem.scVaule[1] && _this.onItem.scVaule[1].indexOf("/") > -1){
                _this.onItem.doubleColor = _this.onItem.scVaule[1].split("/");
                _this.twoC = false;
            }else{
                _this.twoC = true;
            }
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
        },
        fastBuy : function(el){
            var _this = this;
            if(el){
              _this.rushCarInfo.ActivityId = el.panicBuyingActivityId;
              _this.rushCarInfo.PanicBuyingCarGoodsId = el.cargoodsId;
            }else{
              _this.rushCarInfo.ActivityId = "";
              _this.rushCarInfo.PanicBuyingCarGoodsId = "";
            }
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
        subMit:function(event){
            var _this = this;
            this.show = false;
            if(_this.tapEvent){
              _this.tapEvent = false;
              YMC.ajax({
                  url: 'Products/ShoppingCart/CreateShoppingCart',
                  data: {
                      "CarGoodsId":_this.onItem.carGoodsId,
                      "StoreSysNo":_this.onItem.StoreSysNo,
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
                     /* var tarUrl = "myBuyCar.html?id="+dataB.CarGoodsId;
                      var local= window.location.href.split("page")[0];
                      if(Prius.isCarMaster){
                          Prius.openNewPage("我的购车方案", local+"/page/"+tarUrl);
                      }else{
                          window.location.href = tarUrl;
                      }*/

                      // 国双统计
                      // if (window._gsTracker) {
                      //     _gsTracker.trackEvent("click","购车试算",_this.onItem.carGoodsId);
                      // }

                      router.go( {name:'myBuyCar',query: {id: _this.onItem.carGoodsId }} );
                  },
                  error: function(){},
                  beforeSend : function(){},
                  complete: function(){},
                  showLoading: true //是否显示loading效果
              });
          }


            /*end*/
        }
    }
}


</script>

<style>

/*swiper-sideBar*/
/*侧边加上滚动条css  不要删除*/
.vProduct .swiper-sideBar{ width:100%; height: 90%;}
.vProduct .swiper-sideBar .swiper-slide {
    height: auto;
    padding:10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
/*.vProduct .sideBar_car {
    width: 100%;
    height: 100%;
    background: #f4f4f4;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    position: relative;
    z-index: 1001;
}
.vProduct #countdown1{
    font-size: 11px;
}*/
.vProduct .swiper-container{
    overflow: visible;
}


.vProduct .slideCon{
    background-color: #fff;
}
.vProduct .proAction1{
    position: absolute;
    bottom:0;
    left: 0;
    width: 100%;
    z-index: 2;
    border-top: 1px solid #f1f1f1;
}
.vProduct .slideCon .slideR-t{
    position: relative;
    left:-21px;
}
.vProduct .slideCon .slideR-t .s-t-pic{
    width: 40%;
    height: 100px;
    background: url('../imgs/carPBg.png') no-repeat 0 center;
    background-size: 110px auto;
}

.vProduct .slideCon .slideR-t .s-t-pic .carPbg{
    width: 100%;
    height: 100%;
    background-position: center 60%;
    background-repeat: no-repeat;
    background-size: 90px auto;
    max-height: 100px;
}
@media screen and (min-width:400px) and (max-width:499px){
    .vProduct .slideCon .slideR-t .s-t-pic .carPbg{
        background-size: 140px auto;
    }
}
@media screen and (min-width:500px){
    .vProduct .slideCon .slideR-t .s-t-pic .carPbg{
        background-size: 160px auto;
    }
}
.vProduct .slideCon .slideR-t .s-t-text{
    width: 60%;
    padding-left:10px;
}
.vProduct .slideCon .slideR-t .s-t-text li{
    line-height: 22px;
    color:#666;
}
.vProduct .slideCon .slideR-t .s-t-text li i{
    margin: 0 5px;
    display: inline-block;
    width:16px;
    height: 16px;
    background: #000;
    vertical-align:-3px;
    -webkit-border-radius:50%;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #ccc;
}

.vProduct .slideCon .slideR-t .s-t-text li span{
    color:#333;
}
.vProduct .slideCon .slideR-t .s-t-text li i em{
    padding: 0;
    margin:0;
    width: 8px;
    height: 16px;
    display: block;
    float: left;
}

.vProduct .slideCon .slideR-b{}
.vProduct .slideCon .slideR-b .textArr{
    padding:0 10px;
}
.vProduct .slideCon .slideR-b .colorsArr{
    padding:0 10px 5px;
    border-top:15px solid #f4f4f4;
}
.vProduct .slideCon .slideR-b .arrow{
    padding:0;
}
.vProduct .slideCon .slideR-b .chioceC {
    background-color: #fff;
}
.vProduct .slideCon .slideR-b .chioceC h3{
    height: 52px;
    line-height: 52px;
    font-weight: normal;
}
.vProduct .slideCon .slideR-b .chioceC .chioceC-Out{
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 5px;
}
.vProduct .slideCon .slideR-b .chioceC ul li{
    line-height: 30px;
    height: 30px;
    float: left;
    padding:0 10px;
    border:1px dashed #999;
    border-radius: 3px;
    color:#666;
    margin: 0 10px 10px 0;
/*    -webkit-background-size: 3px 3px;
    -moz-background-size: 3px 3px;
    background-size: 3px 3px; */
}
.vProduct .slideCon .slideR-b .chioceC ul li.select{
    background-color: #ffd522;
    border: 0 none;
    height: 32px;
    line-height: 32px;
    padding:0 11px;
}

/*代表上架可选的颜色*/
.vProduct .slideCon .slideR-b .chioceC ul li.selectOn{
    border-style: solid;
}

/*代表未上架的颜色和没有该组合颜色
.slideCon .slideR-b .chioceC ul li.selectLine{
   background-image: -webkit-gradient(linear, 0 0, 100% 100%,
      color-stop(.25, rgba(255, 255, 255, 1)), color-stop(.25, transparent),
      color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, 1)),
      color-stop(.75, rgba(255, 255, 255, 1)), color-stop(.75, transparent),
      to(transparent));
   background-image: -moz-linear-gradient(-45deg, rgba(255, 255, 255, 1) 25%, transparent 25%,
      transparent 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 75%,
      transparent 75%, transparent);
   background-image: -o-linear-gradient(-45deg, rgba(255, 255, 255, 1) 25%, transparent 25%,
      transparent 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 75%,
      transparent 75%, transparent);
   background-image: linear-gradient(-45deg, rgba(255, 255, 255, 1) 25%, transparent 25%,
      transparent 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 75%,
      transparent 75%, transparent);
}*/
</style>