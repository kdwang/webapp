<template>
	<div class="hotcar">
        <div class="car_logo_outer_wrap">
            <div class="car_logo_outer" :class="{'car_logo_fix': flagObj.isCarLogoFix}">
                <div class="car_logo_wrap-view swiper-container">

                    <div class="car_logo_wrap swiper-wrapper">
                        <ul class="car_logo_sec swiper-slide" v-if="brandList.length" v-for="brandGroup in brandList">

                            <li v-for="it in brandGroup" class="car_logo" :class="{'car_logo-on':ajaxDat.carBrandId==it.carBrandId && !isScroll}" ubt="brand_{{it.carBrandId}}" gsq="{{it.carBrandId}}" gsqName="{{it.name}}" @click="brandToCarListRender(it)">
                                <img :src="it.logoUrl | imgUrl" title="{{it.name}}" class="car_img" />
                            </li>
                        </ul>
                    </div>
                    <a href="javascript:;" class="rush-logo-arr rush-logo-arr-prev"></a>
                    <a href="javascript:;" class="rush-logo-arr rush-logo-arr-next"></a>
                </div>
            </div>
        </div>
		<div id="main" class="mainautow mainhd">
            <div class="hotcar-brand" v-for="item in allBrandList">
                <div v-for="it in item">
                    <!-- <div class="home-sec-tlt">
                        <div class="home-sec-tlt-txt">{{it.manufacturerName}}</div>
                    </div> -->
                    <ul class="home-sec-main clearfix" >
                        <li v-for="it2 in it.carModelModels" :class ="{'hotcar-bg':$index==0}" class="home-sec-prod ">
                            <div v-if="$index==0">
                                <a class="home-prod-link" v-link="{name:'product',query:{id:it2.carGoods.carGoodsId}}" ubt="carId_{{it2.carGoods.carGoodsId}}" gsq="{{it2.carGoods.carGoodsId}}" gsqName="{{it2.carSeriesName+it2.modelName}}">
                                    <div class="prod-img" v-sturl="it2.carGoods.picUrl"></div>
                                    <div class="prod-infos">
                                        <p class="home-prod-series">
                                        {{it2.carSeriesName}}
                                        <span v-if="it2.officePrice-it2.carGoods.ymcPrice>0" class="txt-tag">直降<span>{{it2.officePrice-it2.carGoods.ymcPrice | priceW}}</span>万元<i class="iho iho-5"></i></span>
                                        </p>
                                        <p class="home-prod-name">{{it2.modelName}}</p>
                                        <div class="price_wrap">
                                            <del>市场指导价：<em>{{it2.officePrice | priceW}}</em>万元</del>
                                            <p class="price_ymc"><span class="price-bg">{{it2.carGoods.ymcPrice | priceW}}</span>万元</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div v-if="$index>=1">
                                <a class="home-prod-link" v-link="{name:'product',query:{id:it2.carGoods.carGoodsId}}" ubt="carId_{{it2.carGoods.carGoodsId}}" gsq="{{it2.carGoods.carGoodsId}}" gsqName="{{it2.carSeriesName+it2.modelName}}">
                                    <div class="prod-img"  v-sturl="it2.carGoods.picUrl"></div>
                                    <p class="home-prod-name">{{it2.carSeriesName+it2.modelName}}</p>
                                    <div class="price_wrap">
                                        <del>市场指导价：<em>{{it2.officePrice | priceW}}</em>万元</del>
                                        <p class="price_ymc"><span class="price-bg">{{it2.carGoods.ymcPrice | priceW}}</span>万元</p>
                                    </div>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="viewother tc" :class="{'view-load-end': isLoadEnd}"  v-el:loadmore><i class="i-load20"></i>{{loadMore}}</div>
	    </div>
	</div>

</template>

<script>
require('../../node_modules/swiper/dist/css/swiper.min.css');
var Swiper = require('swiper');
module.exports = {
	data: function(){
		return {
            allBrandList : [],
            curIndex    : 0,//当前品牌index
            loadingEnd : false,//结束加载
            isScroll   :true,//是否允许滚动,点击品牌后,就不需要在滚动加载了
            isLoadEnd  :false,//是否允许滚动,点击品牌后,就不需要在滚动加载了
            allBrandId : [],//所有品牌列表
            brandList: [],
            brandSwiper  :{},
            scrollFn:function(){},
            ajaxDat: {
                "carBrandId": "",
                "CityId":router.app.cityId
                // "pageSize": 3,//暂时不能分页
                // "pageIndex": 1
            },
			flagObj: {
                isCarLogoFix: true
            },
            loadMore:''//加载状态
		}
	},
	route: {
		data: function(transition) {
			this.carLogoRender();
            transition.next();
		},
        deactivate: function(){ // 离开页面时清除定时器
            this.dataClear();
        }
	},
	methods: {
        dataClear: function(){
            var _this = this;
            _this.ajaxDat = {
                "carBrandId": ""
                // "pageSize": 3,
                // "pageIndex": 1
            };
            _this.curIndex = 0;
            _this.allBrandList = [];
            _this.allBrandId = [];
            _this.brandList = [];
            _this.isScroll = true;
            _this.loadingEnd = false;
            _this.isLoadEnd=true;

            if(typeof _this.brandSwiper.setWrapperTranslate != 'undefined'){
                if(_this.brandSwiper){
                    _this.brandSwiper.setWrapperTranslate(0);
                    _this.brandSwiper.destroy(true);
                }
            }


            // 清除滚动事件
            clearTimeout(_this.timeDataLd);

            _this.scrollFn = function(){};
            $(document).off("scroll",_this.scrollFn);
        },
        mySwiper: function(){
            var _this = this;

            _this.brandSwiper = new Swiper('.hotcar .car_logo_wrap-view',{
                //loop: _this.brandList.length-1,
                //loopedSlides:_this.brandList.length,
                prevButton:'.hotcar .rush-logo-arr-prev',
                nextButton:'.hotcar .rush-logo-arr-next'
            });


        },
        carLogoRender: function(){
            var _this = this;
            YMC.ajax({
                data: {CityId:router.app.cityId},
                url: 'Products/CarModel/GetNormalCarBrandList',
                success: function(res){

                    if(res.success&&res.result&&res.result.length){
                        _this.allBrandId.push(res.result);
                        var tmpArr = res.result,
                            groupNum = 10;
                        _this.brandList = [];
                        //取第一个品牌Id
                        _this.ajaxDat.carBrandId = tmpArr[0].carBrandId;

                        // 品牌分为groupNum个一组
                        for (var i = 0; i < tmpArr.length; i+=10) {
                             _this.brandList.push(tmpArr.slice(i,i+10));
                        };

                        // while(tmpArr.length&&tmpArr.length>groupNum){
                        //     _this.brandList.push(tmpArr.splice(0,10));
                        // }
                        setTimeout(_this.mySwiper, 1000);
                    }else{
                        VUI.alert('暂无热销车型，去首页看看吧！',1500,function(){
                            router.go({
                                name: 'home'
                            });
                        })
                    }
                },
                complete:function(){
                    //渲染第一个品牌的车型
                    _this.carListRender();
                },
                showLoading: true
            })
        },
        carListRender: function(){
            var _this = this;
            _this.loadingEnd = false;
            YMC.ajax({
                data: _this.ajaxDat,
                url: 'Products/CarModel/GetNormalCarModelList',
                beforeSend:function(){
                    _this.loadMore = "正在加载更多车型...";
                    _this.loadingEnd = false;
                },
                success: function(res){
                    if(res.success&&res.result&&res.result.length){
                        _this.allBrandList.push(res.result);
                    }
                },
                complete:function(){
                    //点击品牌,将对应品牌的数据都加载出来
                    if(_this.isScroll){
                        _this.loadMore = "正在加载更多车型...";
                    }else{
                       _this.loadMore="没有更多数据了...";
                       _this.isLoadEnd=true;
                    }
                    Vue.nextTick(function () {
                       _this.loadingEnd = true;
                       //滚动加载
                       _this.scrollFn =function(){
                           _this.scrollHandle();
                        }
                        //如果第一个品牌都加载完,还没出现滚动条,就继续自动加载,直至出现滚动条
                        _this.timeDataLd = setTimeout(function(){
                            if($("#main").height()<$(window).height() && _this.isScroll){
                                _this.scrollFn();
                            }
                            clearTimeout(_this.timeDataLd);
                        },800);
                        // if($("#main").height()<$(window).height() && _this.isScroll){
                        //     setTimeout(function(){
                        //         _this.scrollFn();
                        //     })
                        //     _this.scrollFn();
                        // }

                          $(window).on('scroll',function(){
                               if(_this.isScroll){
                                   _this.scrollFn();
                               }else{
                                   return false;
                               }
                          })

                    });

                }
            })
        },
        brandToCarListRender: function(targ){
            var _this = this;
            _this.isScroll = false;
            _this.allBrandList = [];
            _this.ajaxDat.carBrandId = targ.carBrandId;
            _this.carListRender();
            window.scrollTo(0,0);
        },
        scrollHandle:function(){
            var _this = this;
            var docH=$(document).height();
            var t=$(window).scrollTop();
            var h=$(window).height();
            var objT=$(_this.$els.loadmore).offset().top;
            var itemHeight = 180,
                ajaxLen = 3*itemHeight;
            // if(objT<t+h && _this.loadingEnd){
            if((objT-t-h)<ajaxLen && _this.loadingEnd){
                _this.loadingEnd = false;

                _this.curIndex++;
                var allBrand = _this.allBrandId[0];
                if(_this.curIndex>= allBrand.length){
                    _this.curIndex = allBrand.length;
                    _this.loadMore = "没有更多数据了...";
                    _this.isLoadEnd=true;
                    return false;
                }
                _this.ajaxDat.carBrandId = allBrand[_this.curIndex].carBrandId;
                _this.carListRender();
                // setTimeout(function(){
                //     _this.carListRender();
                //  },200);
            }
        }
    },
	ready: function(){
	}

};
</script>

<style>
.hotcar{background-color: #f4f4f4;}
.hotcar .view-load-end .i-load20{display: none;}
.hotcar .car_logo_outer_wrap {
    position: relative;
    /*margin-bottom: 10px;*/
    overflow: hidden;
    height: 100px;
    background-color: #fff;
}
.hotcar .car_logo_wrap-view{
    position: relative;
    max-width: 540px;
    margin: 0 auto;
    overflow: hidden;
    background-color: #fff;
    /*box-shadow: 0px 1px 4px rgba(0,0,0,.5);*/
}
.hotcar .car_logo_wrap {
    height: 100px;
    background-color: #fff;
    -webkit-transition: all .3s ease-out;
    -ms-transition: all .3s ease-out;
    transition: all .3s ease-out
}
.hotcar .car_logo_sec{
    float: left;
    height: 100px;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
}
.hotcar .car_logo_wrap-view .ia_arr{
    position: absolute;
    top: 50%;
    margin-top: -7px;
}
.hotcar .car_logo_wrap-view .ia_arr-prev{
    display: none;
    left: 0;
}
.hotcar .car_logo_wrap-view .ia_arr-next{
    right: 0;
}
.hotcar .car_logo_fix {
    position: fixed;
    top: 50px;
    z-index: 100;
    width: 100%;
    left: 0;
    /*border-bottom: 1px solid #E4E4E4;*/
    background-color: #fff;
    /*-webkit-animation: carlogo .3s ease-out;
    -ms-animation: carlogo .3s ease-out;
    animation: carlogo .3s ease-out;*/
}

.hotcar .car_logo {
    position: relative;
    overflow: hidden;
    float: left;
    width: 20%;
    height: 50px;
    line-height: 50px;
    border-right: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
    background-color: #fff;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box
}
.hotcar .car_logo img {
    display: block;
    max-width: 100%;
    height: 40px;
    margin: 5px auto;
}
.hotcar .car_logo:nth-child(5n) {
    border-right: none;
}
.hotcar .car_logo.car_logo-on{
    background-color: #f8f8f8;
}

.hotcar .rush-logo-arr{z-index: 2;position: absolute;top:50%;width:20px;height: 20px;margin-top:-10px;background-color: #f4f4f4;}
/*.hotcar .rush-logo-arr:active{background-color: #393d44}*/
.hotcar .rush-logo-arr::before{content: '';position: absolute;top:50%;left: 50%;width: 8px;height: 8px;margin-top:-4px;border-top:2px solid #ccc;border-right:2px solid #ccc;}
.hotcar .rush-logo-arr.rush-logo-arr-prev{left:0;}
.hotcar .rush-logo-arr.rush-logo-arr-next{right:0;}
.hotcar .rush-logo-arr.rush-logo-arr-prev::before{margin-left:-3px;-webkit-transform:rotate(-135deg);transform:rotate(-135deg);}
.hotcar .rush-logo-arr.rush-logo-arr-next::before{margin-left:-6px;-webkit-transform:rotate(45deg);transform:rotate(45deg);}

.hotcar .home-sec-main .home-sec-prod{border-top: 1px solid #f0f0f0;}
.hotcar .home-sec-main .home-sec-prod:nth-child(2n){border-left: none;}
.hotcar .home-sec-main .home-sec-prod:nth-child(2n+1){border-left: 1px solid #f0f0f0;}
.hotcar .price_wrap .price_ymc{color: #999;}
.hotcar .price_ymc .price-bg{color: #000;}

.hotcar .hotcar-bg{position: relative;width: 100%;padding:10px 0;}
.hotcar .home-sec-main .home-sec-prod.hotcar-bg{border-top: none;border-left: none;}
.hotcar .hotcar-bg .home-prod-link{padding-left: 12px;text-align: left;}
.hotcar .hotcar-bg .prod-img{position: absolute;right: 0;top:15px;width: 56%;max-height: 120px;}
.hotcar .hotcar-bg .prod-infos{padding-right: 58%;}
.hotcar .hotcar-bg .home-prod-series{font-size: 19px;color: #666;white-space: nowrap;}
.hotcar .hotcar-bg .home-prod-name{min-height: auto;padding: 0 0 5px;font-size: 12px;color: #999;}
.hotcar .txt-tag{position: relative;display: inline-block;margin-left:1em;height: 15px;padding:0 8px;font-size: 12px;line-height: 15px;color:#fff;background-color: #fdd000;vertical-align: 3px;border-radius: 1px;}
.hotcar .txt-tag .iho-5{position: absolute;right: -5px;top:0;bottom: 0;}
.hotcar .hotcar-bg .price-bg{font-size: 24px;color: #f71e16;}
.hotcar-brand .home-prod-name{height: 42px;overflow: hidden;}
.hotcar-brand >div{
    margin: 20px 0 0;
}
</style>