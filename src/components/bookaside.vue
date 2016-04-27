<template>
    <div v-if="show">
      <div class="book_aside_mask" transition="modal"  @touchmove.stop.prevent @click.stop="closePoup"></div>
      <div class="aside_components_mask" transition="modal"  @touchmove.stop.prevent @click.stop="closePoup"></div>
    </div>
    <div id="fixtab" v-if="show"  v-bind:transition="slideTransition" >
      <div class="aside-tab">
        <ul>
          <li @click="selectCar(1)" :class="{'active':isAll}">
            所有车系
          </li>
          <li @click="selectCar(0)" :class="{'active':!isAll}">
            可售车系
          </li>
        </ul>
      </div>
    </div>
    <div class="aside" :class="placement" v-if="show"  v-bind:transition="slideTransition" style="width:80%;max-width:480px;">

    <div id="booking-aside" v-el:bookingaside>
          <div v-if="isAll" class="swiper-container-aside swiper-sideBar" v-el:swiperside  @touchmove.stop.prevent>
              <div class="swiper-wrapper" v-el:swiperbox>
                <div class="swiper-slide" >
                  <div class="slideCon">

                    <div class="selectBrand">
                        <div v-if="!isLoading" class="loading-txt">{{loadingTxt}}</div>
                        <h2 class="select_cartitle"  v-if="isLoading">
                          <span class="type" id="title">
                            <img :src="data_CarSeriesList.logoUrl | imgUrl">
                            {{data_CarSeriesList.carBrandName}}
                          </span>
                        </h2>
                        <div class="specificar">
                          <dl v-for="car in data_CarSeriesList.carManufacturerSeriesList">
                            <dt>
                              {{car.carManufacturerName}}
                            </dt>
                            <dd v-for="item in car.carSeriesList"  @click="setBrandId(item.id)">
                              <a ubt="car_{{item.id}}" gsq="car_{{item.id}}" gsqName="品牌列表_{{item.name}}" data-value="{{item.id}}" v-link="{name:'car-model-list',query:{carSeriesId: item.id, isAll: isAll}}">
                                <img :src="item.picUrl | imgUrl">
                                <span>
                                  {{item.name}}
                                </span>
                              </a>
                            </dd>
                          </dl>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <div v-if="!isAll" class="swiper-container-aside swiper-sideBar" v-el:swiperside  @touchmove.stop.prevent>
                <div class="swiper-wrapper" v-el:swiperbox1>
                  <div class="swiper-slide" >
                    <div class="slideCon">
                      <div class="selectBrand">
                        <div v-if="!isLoading" class="loading-txt">{{loadingTxt}}</div>
                        <div v-if="!isEmpty && isLoading">
                          <h2 class="select_cartitle" >
                            <span class="type" id="title">
                              <img :src="data_CarSeriesList.logoUrl | imgUrl">
                              {{data_CarSeriesList.carBrandName}}
                            </span>
                          </h2>
                          <div class="specificar">
                            <dl v-for="car in data_CarSeriesList.carManufacturerSeriesList">

                               <dt v-if="!car.curType">
                                 {{car.carManufacturerName}}
                                </dt>

                                <dd  v-for="item in car.carSeriesList" v-if="item.inventory" @click="setBrandId(item.id)">
                                  <a ubt="car_{{item.id}}" gsq="car_{{item.id}}" gsqName="车系_{{item.name}}" data-value="{{item.id}}" v-link="{name:'car-model-list',query:{carSeriesId: item.id, isAll: isAll}}">
                                    <img :src="item.picUrl | imgUrl">
                                    <span>
                                      {{item.name}}
                                    </span>
                                  </a>
                                </dd>

                            </dl>
                          </div>
                        </div>

                        <div v-if="isEmpty" class="nocar-msg">
                          <p>暂时没有<span>{{data_CarSeriesList.carBrandName}}</span>的可售车系</p>
                        </div>

                        <div v-if="isLoading && !isEquity">
                          <div class="viewother"  @click="selectCar(1)">
                            <a ubt="chooseMore" href="javascript:" gsq="其它更多车型品牌">
                              其它更多车系
                            </a>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
          </div>
    </div>
</template>
<script>
require('../../node_modules/swiper/dist/css/swiper.min.css');
var Swiper = require('swiper');
module.exports = {
    data: function() {
      return {
        motion                : 'click',
        isAll                 : '',// 所有车系、现有车系
        isEmpty               :'',//是否有现车
        isEquity              :true,//现车和所有是否相等
        myScroll              :null,//
        curType               :"",
        swi                   :null,
        carTitle              :[],//根据接口得出现车和所有车
        swflag                :true,//是否滑动
        brandId               :"",//当前选择品牌Id
        cfg                   :{ probeType: 3, mouseWheel: true,click:YMC.iScrollClick},//iscroll配置
        loadingTxt            : '正在加载中',//加载文案
        isLoading             : false,//加载状态
        selectType            :'',//选中的是现车还是所有
        data_CarSeriesList    : { // 品牌列表
          carSeriesList:[],
          logoUrl:''
        }
      }
    },
    props: {
        show: {
            type: Boolean,
            require: true
        },
        placement: {
            type: String
        },
        width: {
            type: Number
        },
        id: {
            type: String
        },
        fn: {
            type: Function
        }
    },
    computed: {
        slideTransition: function() {
            //console.log('slide' + this.placement);
            return 'slide' + this.placement;
        }
    },
    methods:{
      getData:function(id,isall){
        var _that = this;
        _that.isLoading = false;
        _that.data_CarSeriesList={ // 品牌列表
          carSeriesList:[],
          logoUrl:''
        }


        if(isall){
          _that.isAll  = router.app.isAll;
        }else{
          _that.isAll = JSON.parse(YMC.local('selectAll'));
        }


        _that.swflag = true;
        _that.brandId = id;
        YMC.ajax({
         url: 'Products/CarSeries/GetCarSeriesList',
         data: {Id:id,IsAll:true},
         showLoading: false,
         beforeSend:function(){
            var el = _that.isAll ? 'swiperbox' :'swiperbox1';
            $(_that.$els[el]).css({"transform":"translate3d(0px, 0px, 0px)","-webkit-transform":"translate3d(0px, 0px, 0px)"});
         },
         success:function(res){
          $.each(res.result.carManufacturerSeriesList,function(a,b){
            //判断对应厂商的车系是否都是可售
            if(b.carSeriesList.length==$.grep(b.carSeriesList,
              function(o,p){return o.inventory==true}).length){
               b.AllSaled=true;
            }else{
               b.AllSaled=false;
            }

          //判断可售中是否有现车
          if(b.carSeriesList.length==$.grep(b.carSeriesList,
              function(o,p){return o.inventory==false}).length){
                b.curType=true;
            }else{
                b.curType=false;
            }
          });


           if(res.result.carManufacturerSeriesList.length>0){
             _that.data_CarSeriesList = res.result;
           }


           var temp=$.grep(res.result.carManufacturerSeriesList,function(a,b){return a.AllSaled==false;}).length;
           var AllTemp=$.grep(res.result.carManufacturerSeriesList,function(a,b){return a.curType==false;}).length;

           //判断对应厂商的车系是否有可售的以及是否相等
           if(temp>0){
             _that.isEquity = false;
           }else{
             _that.isEquity = true;
           }

           if(AllTemp>0){
             _that.isEmpty = false;
           }else{
             _that.isEmpty = true;
           }


           var SeriesList =res.result.carManufacturerSeriesList;

           //isEmpty
           _that.selectType = _that.isAll;
           _that.$nextTick(function(){
              _that.isLoading  = true;
             _that.swiperSide();
           });
         }
        })
      },
      selectCar:function (flag) {
        var _this = this;
        _this.isAll = flag==1;
        YMC.local('selectAll',_this.isAll);
        _this.$nextTick(function(){
          _this.swiperSide();
        });
      },
      closePoup:function(){
        this.show=false;
        YMC.local('setBrandId',null);
        this.clearData();
      },
      clearData:function(){
        this.data_CarSeriesList =  { // 品牌列表
          carSeriesList:[],
          logoUrl:''
        };
        $(this.$parent.$els.vbrandlist).removeClass('setzindex');
      },
      swiperSide:function(){
          var _this = this;
          _this.swi = new Swiper(this.$els.swiperside,{
                direction: 'vertical',
                slidesPerView: 'auto',
                mousewheelControl: false,
                freeMode: true,
                autoHeight: true,
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
                autoplayDisableOnInteraction:false,
                onTouchMove : function(){
                  if(_this.swflag){
                    _this.swflag = false;
                    _this.swiperSide();
                  }
                }
            });
      },
      setBrandId:function(id){
        _track.setD({productId:id,pShow:'seriesShow'});
        YMC.local('selectAll',this.isAll);
        YMC.local('setBrandId',this.brandId);
      }
    }
}
</script>

<style>
.aside{
  z-index: 1000;
}

.book_aside_mask{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

/*侧边加上滚动条css  不要删除*/
#booking-aside  .swiper-sideBar{ width:100%; height: 100%;}
#booking-aside  .swiper-sideBar .swiper-slide {
        height: auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

}
#booking-aside .loading-txt{
  text-align: center;
  padding: 50px 0;
}
.swiper-container-aside{
  position: relative;
  overflow: hidden;
  z-index: 1;
}
#booking-aside .selectBrand{
  padding: 50px 0 0;
}
#booking-aside{
  position: relative;
  height: 100%;
}
#fixtab{
   width:80%;
   max-width: 480px;
   position:fixed;
   height: 50px;
   right: 0;
   top:0;
   z-index: 1001;
   background:#fff;
}
.aside-tab ul li{
  width: 50%;
  float: left;
  text-align:center;
  line-height: 50px;
  height: 50px;
  border-bottom: 1px solid #ccc;
}
.aside-tab ul li.active{
  border-bottom: 2px solid #f60;
}

.pagetitle .type img{
  height: 40px;
      vertical-align: -14px;
}
#booking-aside .specificar{
  background-color: #fff;
  box-sizing:border-box;
}
#booking-aside .specificar dl{
  font-size: 14px;
  color:#333;
}
#booking-aside .specificar dl dt{
  height:40px;
  line-height: 40px;
  background: #f0f0f0;
  color:#777;
  padding:0 5%;
  /*border-left: 3px solid #f1692f;*/
}
#booking-aside .specificar dl dd{
    opacity: 1;
    -webkit-animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
    -moz-animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
    -ms-animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
    animation: fromBack 0.4s linear backwards, fadeOut 0.3s linear backwards;
}

#booking-aside .specificar dl:nth-child(1) dt dd:nth-child(1) {
  -webkit-animation-delay: 0s, 5s;
  -moz-animation-delay: 0s, 5s;
  -ms-animation-delay: 0s, 5s;
  animation-delay: 0s, 5s;
}

#booking-aside .specificar dd{
  overflow: hidden;
  height: 60px;
  line-height: 60px;
  margin-left:5%;
  border-bottom:1px solid #f2f2f2;
}
#booking-aside .specificar dd a{
  display: block;
  width: 100%;
  height: 100%;
}
#booking-aside .specificar dd:last-child{
  border:0 none;
}
#booking-aside .specificar dd img{
  height: 60px;
  margin-right: 15px;
}
#booking-aside .specificar dd img,.specificar dd span{
  float: left;
}


#booking-aside .select_cartitle{
  text-align: center;
  padding: 15px 0 5px;
  font-size: 1rem;
  color: #333;
  clear: both;
}

.nocar-msg{
  text-align: center;
  padding: 50px 0;
}
.nocar-msg p span{
  color: #f00;
  border-bottom: 1px dashed #f00;
  margin:0 5px;
}

/* -webkit- */
@-webkit-keyframes fromBack{
  0%{
    /*-webkit-transform: scale(0);*/
    opacity: 0;
  }
  100%{
   /* -webkit-transform: scale(1);*/
    opacity: 1;
  }
}

@-moz-keyframes fromBack{
  0%{
    /*-moz-transform: scale(0);*/
    opacity: 0;
  }
  100%{
   /* -moz-transform: scale(1);*/
    opacity: 1;
  }
}
/**/


@keyframes fromBack{
  0%{
    /*transform: scale(0);*/
    opacity: 0;
  }
  100%{
    /*transform: scale(1);*/
    opacity: 1;
  }
}

</style>