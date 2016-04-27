<template>
<div class="rush-usr">
	<div class="mainautow mainhd">
		<div class="main_cnt">
			<template v-if="result&&result.length">
				<div class="notice">
			        <div class="notice-ico"><i class="ia ia-1"></i></div>
			        <div class="notice-info">
			            <p class="fs13">下单按照闪购价生成订单，组团闪购价会在活动结束时，根据闪购人数统一调整。</p>
			        </div>
			    </div>
			    <ul class="act-car-list">
			    	<li class="act-bill" v-for="it in result" @click.stop.prevent="linkToDetail(it.carGoodsId)">
			    		<!-- <a class="act-prodinfo-link" v-link="{name:'product', query:{id:it.carGoodsId}}"> -->
			    			<div v-if="it.isPanicBuyingFinish||(!it.panicBuyingActivityCurrentNodeDto)">
					            <div class="act-status-hd" v-if="it.enrollingStatus==1&&it.isPanicBuying==0">
					            	<label class="act-status-tag cfe6863">闪购失败</label>
			    					<span v-if="it.isPanicBuyingFinish&&it.enrollingDateTime">{{it.enrollingDateTime}}</span>
					            </div>
					            <div class="act-status-hd" v-if="it.enrollingStatus==1&&it.isPanicBuying==1">
					            	<label class="act-status-tag cfe6863">闪购成功</label>
			    					<span v-if="it.isPanicBuyingFinish&&it.enrollingDateTime">{{it.enrollingDateTime}}</span>
			    					<span v-else>恭喜您闪购成功！</span>
					            </div>
					            <div class="act-status-hd" v-if="it.enrollingStatus==1&&it.isPanicBuying==2">
					            	<label class="act-status-tag cfe6863">活动结束</label>
			    					<span v-if="it.isPanicBuyingFinish&&it.enrollingDateTime">{{it.enrollingDateTime}}</span>
			    					<span v-else>本次闪购结束！</span>
					            </div>
					            <div class="act-prodinfo">
					                <div class="act-sec-left">
					                    <img class="act-prod-img" :src="it.carGoodsPic | imgUrl" />
					                </div>
					                <div class="act-sec-main">
					                    <h2 class="act-cartitle ellips">{{it.carBrandName}} {{it.carGoodsTitle}}</h2>
					                    <h4 class="act-cardecor">外饰{{it.externalColor}}，内饰{{it.internalColor}}</h4>
										<!-- <template v-if="it.panicBuyingCarGoodsTieredPrice&&(it.isPanicBuying!=1)">
											<div class="act-price">
					                            <del><em>{{it.officePrice | priceFormatWan}}</em></del>
					                        </div>
					                        <ol class="act-price-steps clearfix">
					                            <li class="act-price-step" v-for="step in it.panicBuyingCarGoodsTieredPrice">
					                                <h3 v-if="step.minBuyer">{{step.minBuyer}}人</h3>
					                                <h3 v-else>1人</h3>
					                                <p>闪购价</p>
					                                <p class="cf22d26"><i>{{step.panicBuyingPrice | priceFormatWan}}</i></p>
					                            </li>
					                        </ol>
										</template>
					                    <div class="act-price" v-else>
				                            <i class="txt-price cff4c66"><em>{{it.payPrice | priceFormatWan}}</em></i>
				                            <del><em>{{it.officePrice | priceFormatWan}}</em></del>
				                        </div> -->
										<div class="act-price" v-if="it.panicBuyingCarGoodsTieredPrice&&(it.isPanicBuying!=1)">
				                            <del><em>{{it.officePrice | priceFormatWan}}</em></del>
				                        </div>
				                        <ol class="act-price-steps clearfix" v-if="it.panicBuyingCarGoodsTieredPrice&&(it.isPanicBuying!=1)">
				                            <li class="act-price-step" v-for="step in it.panicBuyingCarGoodsTieredPrice">
				                                <h3 v-if="step.minBuyer">{{step.minBuyer}}人</h3>
				                                <h3 v-else>1人</h3>
				                                <p>闪购价</p>
				                                <p class="cf22d26"><i>{{step.panicBuyingPrice | priceFormatWan}}</i></p>
				                            </li>
				                        </ol>
					                    <div class="act-price"  v-if="!(it.panicBuyingCarGoodsTieredPrice&&(it.isPanicBuying!=1))">
				                            <i class="txt-price cff4c66"><em>{{it.payPrice | priceFormatWan}}</em></i>
				                            <del><em>{{it.officePrice | priceFormatWan}}</em></del>
				                        </div>
					                </div>
					            </div>
					            <div class="act-btn-panel" v-if="it.isPanicBuying==1&&it.isOrder">
					                <a v-link="{name:'orderTrack'}" @click.stop class="btn btn-gobill">查看订单</a>
					            </div>
			    			</div>
			    			<div v-else>
			    				<!-- <div class="act-status-hd" v-if="it.enrollingStatus==1">
				    				<template v-if="it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==1||it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==2">
				    					<label class="act-status-tag cfe6863">报名成功</label>
					                    <span class="countdown">离闪购开始还有{{{ctdTimeObj[it.carGoodsId] | countdown 6}}}</span>
				    				</template>
				    				<template v-if="it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==3">
				    					<template v-if="it.isPanicBuying==0">
				    						<label class="act-status-tag cfe6863">正在闪购</label>
					                    	<span class="countdown">离闪购结束还有{{{ctdTimeObj[it.carGoodsId] | countdown 6}}}</span>
				    					</template>
				    					<template v-if="it.isPanicBuying==1">
				    						<label class="act-status-tag cfe6863">闪购成功</label>恭喜您闪购成功！
				    					</template>
				    					<template v-if="it.isPanicBuying==2">
				    						<label class="act-status-tag cfe6863">已抢完</label>很遗憾，闪购失败！
				    					</template>
				    				</template>
					            </div> -->
					            <!-- 已报名 S-->
					            <div class="act-status-hd" v-if="it.enrollingStatus==1&&(it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==1||it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==2)">
					            	<label class="act-status-tag cfe6863">报名成功</label>
				                    <span class="countdown">离闪购开始还有{{{ctdTimeObj[it.carGoodsId] | countdown 6}}}</span>
					            </div>
					            <div class="act-status-hd" v-if="it.enrollingStatus==1&&it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==3&&it.isPanicBuying==0">
					            	<label class="act-status-tag cfe6863">正在闪购</label>
			                    	<span class="countdown">离闪购结束还有{{{ctdTimeObj[it.carGoodsId] | countdown 6}}}</span>
					            </div>
					            <div class="act-status-hd" v-if="it.enrollingStatus==1&&it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==3&&it.isPanicBuying==1">
					            	<label class="act-status-tag cfe6863">闪购成功</label>恭喜您闪购成功！
					            </div>
					            <div class="act-status-hd" v-if="it.enrollingStatus==1&&it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==3&&it.isPanicBuying==2">
					            	<label class="act-status-tag cfe6863">已抢完</label>很遗憾，闪购失败！
					            </div>
					            <!-- 已报名 E-->
					            <div class="act-prodinfo">
					                <div class="act-sec-left">
					                    <img class="act-prod-img" :src="it.carGoodsPic | imgUrl" />
					                    <div class="act-num" v-if="it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==3&&it.remainingCarGoodsNum&&it.isPanicBuying==0">{{it.panicBuyingNum}}人闪购<span class="act-car-num">剩{{it.remainingCarGoodsNum}}辆</span></div>
				                    	<div class="act-num" v-if="it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==3&&it.remainingCarGoodsNum&&it.isPanicBuying==1&&it.isTieredPrice">{{it.panicBuyingNum}}人闪购</div>
					                </div>
					                <div class="act-sec-main">
					                    <h2 class="act-cartitle ellips">{{it.carBrandName}} {{it.carGoodsTitle}}</h2>
					                    <h4 class="act-cardecor">外饰{{it.externalColor}}，内饰{{it.internalColor}}</h4>
										<div v-if="it.panicBuyingCarGoodsTieredPrice">
											<div class="act-price" v-if="it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==1 || it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==2 || (it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==3&&(it.isPanicBuying!=1))">
					                            <del><em>{{it.officePrice | priceFormatWan}}</em></del>
					                        </div>
					                        <ol class="act-price-steps clearfix" v-if="it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==1 || it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==2 || (it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==3&&(it.isPanicBuying!=1))">
					                            <li class="act-price-step" v-for="step in it.panicBuyingCarGoodsTieredPrice">
					                                <h3 v-if="step.minBuyer">{{step.minBuyer}}人</h3>
					                                <h3 v-else>1人</h3>
					                                <p>闪购价</p>
					                                <p class="cf22d26"><i>{{step.panicBuyingPrice | priceFormatWan}}</i></p>
					                            </li>
					                        </ol>
											<div class="act-price" v-if="it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==3&&it.isPanicBuying==1">
				                                <i class="txt-price cff4c66"><em>{{it.payPrice | priceFormatWan}}</em></i>
				                                <del><em>{{it.officePrice | priceFormatWan}}</em></del>
				                            </div>
				                            <div class="act-ison" v-if="it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==3&&it.isPanicBuying==1&&it.isTieredPrice">还差<i class="cff4c66">{{it.remainPersonCount}}</i>人，闪购价即可降至<i class="cff4c66">{{it.nextTieredPrice | priceFormatWan}}</i></div>
										</div>
				                        <div class="act-price" v-else>
				                            <i class="txt-price cff4c66"><em>{{it.payPrice | priceFormatWan}}</em></i>
				                            <del><em>{{it.officePrice | priceFormatWan}}</em></del>
				                        </div>
					                    <div class="act-coupon-code cfe6863" v-if="it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==1 || it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==2 || (it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==3 && it.isPanicBuying==0)">{{it.registrationCode}}</div>
					                </div>
					            </div>
					            <div class="act-btn-md-panel clearfix" v-if="it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==1 || it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==2">
				                    <a href="javascript:;" class="act-btn-md act-btn-md-1" @click.stop.prevent="createCart(it.carGoodsId,it.deliveryAreaId)">购车试算</a>
				                    <a href="javascript:;" class="act-btn-md act-btn-md-3" @click.stop.prevent>立即闪购</a>
				                </div>
				                <!-- <template v-if="it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==3">
				                	<div class="act-btn-md-panel clearfix" v-if="it.isPanicBuying==0">
					                    <a href="javascript:;" class="act-btn-md act-btn-md-1" @click.stop.prevent="createCart(it.carGoodsId,it.deliveryAreaId)">购车试算</a>
					                    <a href="javascript:;" class="act-btn-md act-btn-md-2" @click.stop.prevent="createCart(it.carGoodsId,it.deliveryAreaId)">立即闪购</a>
					                </div>
					                <div class="act-btn-panel" v-if="it.isPanicBuying==1&&it.isOrder">
					                    <a v-link="{name:'orderTrack'}" class="btn btn-gobill">查看订单</a>
					                </div>
				                </template> -->
				                <div class="act-btn-md-panel clearfix" v-if="it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==3&&it.isPanicBuying==0">
				                    <a href="javascript:;" class="act-btn-md act-btn-md-1" @click.stop.prevent="createCart(it.carGoodsId,it.deliveryAreaId)">购车试算</a>
				                    <a href="javascript:;" class="act-btn-md act-btn-md-2" @click.stop.prevent="createCart(it.carGoodsId,it.deliveryAreaId)">立即闪购</a>
				                </div>
				                <div class="act-btn-panel" v-if="it.panicBuyingActivityCurrentNodeDto.activityNodeCodeType==3&&it.isPanicBuying==1&&it.isOrder">
				                    <a v-link="{name:'orderTrack'}" @click.stop class="btn btn-gobill">查看订单</a>
				                </div>
			    			</div>
			    		<!-- </a> -->
	    			</li>
		    	</ul>
			</template>
			<div class="rushcar-no tc" v-else>
		        <i class="ico-rushcode"></i>
		        您未报名任何闪购活动!
		        <a v-link="{name:'rush'}" class="act-btn act-btn-4">返回活动车型列表</a>
		    </div>
		</div>
	</div>
</div> 
</template>
<script>
module.exports = {
	data: function(){
		return {
			result: null,
			ctdTimeObj: {},
			isCtdEnabled: false
		}
	},
	route: {
		data: function(){
			this.myRushCarRender();
		}
	},
	ready: function(){

	},
	methods: {
		resetDat: function(){
			var _this = this;

			_this.result = null;
			_this.ctdTimeObj = {};
			_this.isCtdEnabled = false;

			clearInterval(_this.timeId);
		},
		myRushCarRender: function(){
			var _this = this;
			
			YMC.ajax({
                url: 'Marketing/Enrolling/GetMyEnrollingList',
                success: function(res){
                    if(res.success){
                        var dat = res.result;

                        _this.result = dat;
                        if(dat&&dat.length){
                        	// _this.result = [];
                            dat.forEach(function(v,i){
                                if(v.panicBuyingActivityCurrentNodeDto){
                                    var step = v.panicBuyingActivityCurrentNodeDto.activityNodeCodeType;
                                    if(step==1||step==2){
                                        if(v.panicBuyingBeginTime&&(v.panicBuyingBeginTime>0)){
                                            // _this.ctdTimeArr.push(parseInt(v.panicBuyingBeginTime));
                                            // _this.ctdTimeIndexArr.push(v.id);
                                            _this.ctdTimeObj[v.carGoodsId] = parseInt(v.panicBuyingBeginTime);
                                            _this.isCtdEnabled = true;
                                        }
                                    }else if(step==3){
                                        if(v.panicBuyingEndTime&&(v.panicBuyingEndTime>0)&&v.isPanicBuying==0){
                                            // _this.ctdTimeArr.push(parseInt(v.panicBuyingEndTime));
                                            // _this.ctdTimeIndexArr.push(v.id);
                                            _this.ctdTimeObj[v.carGoodsId] = parseInt(v.panicBuyingEndTime);
                                            _this.isCtdEnabled = true;
                                        }
                                    }
                                }
                            });
							
	
                            if(_this.isCtdEnabled) _this.timeId = setInterval(_this.countdown,1000);
                        }
                        // _this.result = dat;
                        // alert(JSON.stringify(_this.result));
                    }else{
                    	_this.result = res.result;
                    }
                },
                error:function(){
                    VUI.alert("网络连接失败，请稍后再试。", 1500);
                },
                showLoading: true
            });
		},
		linkToDetail: function(gid){
			router.go({
				name: 'product',
				query:{
					id: gid
				}
			});
		},
		createCart: function(carId, deliAreaId){
			var _this = this,
				ajxDat = {
					"CarGoodsId": carId,
                    "CityId": deliAreaId
				};
			YMC.ajax({
	            url: 'Products/ShoppingCart/CreateOrUpdateShoppingCart',
	            data: ajxDat,
	            success: function(res){
	                if(res.success&&res.result){
	                    router.go({
                        	name: 'myBuyCar',
                        	query: {id: carId}
                        });
	                }else{
	                    VUI.alert(res.error.message,1500);
	                }
	            },
	            showLoading: true //是否显示loading效果
	        });
		},
		countdown: function(){
            var _this = this,
                goRender = false,
                temp = _this.ctdTimeObj;

            _this.ctdTimeObj = {};

            for(var i in temp){
            	temp[i] -= 1;
            	if(temp[i]<=0){
            		goRender = true;
            	}
            }
            _this.$set('ctdTimeObj', temp);
            if(goRender){
                // clearInterval(_this.timeId);
                _this.resetDat();
                _this.myRushCarRender();
            }
        }
	},
    detached: function(){
        clearInterval(this.timeId);
        this.resetDat();
    }
}
</script>
<style src="../css/rush.css"></style>
<style type="text/css">
.rush-usr{min-height: 100%;background-color: #f0f0f0;}
.rush-usr .act-prodinfo-link{display: block;}
.rushcar-no{padding: 80px 15px 10px;color: #444;font-size: 16px;}
.rushcar-no .ico-rushcode{display: block;margin: 0 auto 20px;}
.rushcar-no .act-btn{margin-top: 20px;}
</style>
