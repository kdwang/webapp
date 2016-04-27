<template>
    <div class="mainautow vcheckout" style="padding-top:51px">
        <div class="scroll">
            <div id="checkoutPannel">
                <div class="checkout ">
                       <div class="car clearfix mt10">
                        <div class="carImg" v-sturl="result.carOrder.picUrl" >
                            </div>
                            <div class="name abs_size">
                                <template v-if="result.groupPurchaseCarGoods">
                                    <h2>{{result.groupPurchaseCarGoods.carGoodsTitle}}<label class="txt-tuan">团购特惠</label></h2>
                                        <p v-if="result.groupPurchaseCarGoods.orderCount < result.groupPurchaseCarGoods.minBuyerCount">{{result.groupPurchaseCarGoods.orderCount}}人已预订，满<i class="cor_red">{{result.groupPurchaseCarGoods.minBuyerCount}}</i>人可享团购价！</p>
                                        <p v-else>{{result.groupPurchaseCarGoods.orderCount}}人已预订，团购价<i class="cor_red">已激活</i>！</p>
                                </template>
                                <template v-else>
                                    <h2>{{result.carOrder.name}}</h2>
                                    <p> </p>
                                </template>
                            </div>
                        </div>
                        <ul class="scheme" v-if="result.storeName">
                            <li class="title" style="border-top:none;">交付中心 <span>{{result.storeName}}</span></li>
                            <li style="font-style: italic;text-align: justify;"> 交付门店的选择与车辆库存分配、保险、按揭、牌证服务等关系紧密，<span style="color:red;float:none;">订单一经创建则无法变更</span>。当下如需修改交付门店，请返回“首页”顶部重新选择您期望的交付门店对象。 </li>
                        </ul>
                        <ul class="scheme mt10">
                            <li class="title">要买车产品</li>
                            <li class="clearfix">{{onePay ? '汽车价格': (result.schemeLoanOrder.title.indexOf('全款')!= -1) ? '汽车价格':'贷款优惠价'}} &nbsp;<!-- 全款购买 ？ 汽车价格 : 贷款优惠价 --> <span><em>¥ </em>{{result.carOrder.price | price}}</span></li>
                            <li class="clearfix">
                                购买方式<span> {{result.schemeLoanOrder.title}} </span>
                            </li>
                            <li v-if="result.productOrder.subProductOrders.length" class="clearfix item_arr-down" :class="{'item_arr-up':showjingping}" @click="showjingping=!showjingping">
                                精品价格<span> {{result.productOrder.title}} <em>¥</em>{{result.productOrder.amount|price}}</span>
                            </li>
                            <li v-if="result.productOrder.subProductOrders.length" class="openT" v-show="showjingping">
                                <div class="ex_oper">
                                    <dl v-for="item in result.productOrder.subProductOrders">
                                        <dt>{{item.title}}<span>¥{{item.amount}}</span></dt>
                                        <dd v-if="item.subProductOrders&&item.subProductOrders.length">
                                            <template v-for="iitem in item.subProductOrders">
                                                {{iitem.title}} <span>¥{{iitem.amount}}</span> <br>
                                            </template>
                                        </dd>
                                    </dl>
                                </div>
                            </li>
                        </ul>
                        <ul class="scheme mt10">
                            <li class="title">要买车服务</li>
                            <li class="clearfix">要买车服务费<span><em>¥</em>{{result.ymcserviceFee | price}}</span></li>
                            <li class="clearfix">金融服务费
                                <span>
                                    <em class="cor_red" v-if="result.schemeLoanOrder.isFree"> （限时免费） </em>
                                    <em class="line-t"
                                    servicefee="{{result.schemeLoanOrder.serviceFee}"
                                    :class="{'line-through;':result.schemeLoanOrder.isFree}">
                                    ¥ {{result.schemeLoanOrder.serviceFee | price}}
                                    </em>
                                </span>
                            </li>
                            <li class="clearfix" v-if="result.carOrder.shippingFee">异地运输费<span><em>¥</em>{{result.carOrder.shippingFee|price}}</span></li>
                        </ul>
                        <ul class="scheme mt10">
                            <li class="title question">代收代缴</li>
                            <li class="  clearfix item_arr-down" :class="{ 'item_arr-up':showinsurance }" @click="showinsurance=!showinsurance">
                                车险价格<span>{{result.insuranceOrder.title}}<em>¥</em>{{result.insuranceOrder.amount|price}}</span>
                            </li>
                            <li class="openT">
                                <div class="ex_oper" v-show="showinsurance">
                                    <dl v-for="item in result.insuranceOrder.subInsuranceOrders">
                                           <dt>{{item.title}}<span>¥{{item.amount | price}}</span></dt>
                                           <dd   v-for="iitem in item.subInsuranceOrders">
                                               {{iitem.title}} {{iitem.amount | price}} <br>
                                           </dd>
                                    </dl>
                                </div>
                            </li>
                        </ul>
                        <ul class="scheme">
                            <li class="  clearfix item_arr-down" :class="{'item_arr-up':showFee }" @click="showFee=!showFee">机动车登记费<span><em>¥</em>{{result.regFeeTotal|price}}</span></li>
                            <li class="openT">
                                <div class="ex_oper  " v-show="showFee">
                                    <dl v-for="item in result.seviceOrder">
                                        <dt class="lastL">{{item.title}}<span>¥{{item.amount | price}}</span></dt>
                                    </dl>
                                </div>
                            </li>
                        </ul>
                        <ul class="scheme">
                            <li v-if="result.licenceAmount">预估购置税（多退少补）<span><em>¥</em>{{result.carOrder.purchaseTax|price}}</span></li>
                            <li v-else>购置税需另行缴纳（约）¥{{result.carOrder.purchaseTax|price}}</li>
                        </ul>


                        <ul class="scheme coupons-no mt10" v-if="result.totalDiscountAmt" >
                           <li>优惠抵扣<span><em>¥ </em>{{result.totalDiscountAmt}}</span></li>
                        </ul>

                        <div class="price"> 总价约：
                            <span><em>¥ </em>{{result.totalAmount|price}}</span><template v-if="!result.licenceAmount">(不含购置税)</template>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data:function(){
            return {
                onePay:false,  //全款购买 ？汽车价格 : 贷款优惠价
                id              : '',//购物车id
                subCityId       : '',//城市id，---验证优惠券的时候需要用到
                regFeeTotal     : 0,
                showjingping    : false,//精品价格隐藏显示
                showinsurance   : false,//车险价格隐藏显示
                showFee         : false,//机动车登记费价格隐藏显示
                result          : {
                    carOrder        : {},
                    schemeLoanOrder : {},
                    productOrder    : {},
                    insuranceOrder  : {}
                }
            }
        },
        route:{
            data: function(transition) {
                var _this = this;
                //重置
                _this.id            = '';//购物车id
                _this.subCityId     = '';//城市id，---验证优惠券的时候需要用到
                _this.regFeeTotal   = 0;
                _this.showjingping  = false;//精品价格隐藏显示
                _this.showinsurance = false;//车险价格隐藏显示
                _this.showFee       = false;//机动车登记费价格隐藏显示
                _this.result        = {
                    carOrder        : {},
                    schemeLoanOrder : {},
                    productOrder    : {},
                    insuranceOrder  : {}
                };

                _this.id = this.$route.query.id;
                YMC.ajax({
                    url: 'Products/order/GetOrderDetail',
                    data: {
                        id : _this.id
                    },
                    success: function(res){
                        if(!res.success){
                            VUI.alert(res.error.message);
                            if(res.error.code == 0){
                                router.go({name:'_login'});
                            }else{
                                router.go({name:'home'});
                            }
                            return;
                        }
                        _this.render(res);
                    }
                });
                transition.next();
            }
        },
        methods:{
            render:function(res){
                var _this = this;

                var result = res.result;
                //先把机动车登记费拿出来
                var regFeeTotal = 0;//机动车登记费

                //把金额为0的剔除出去
                for (var i = result.seviceOrder.length - 1; i >= 0; i--) {
                    if(result.seviceOrder[i].amount==0){
                        result.seviceOrder.splice(i,1);
                        break;
                    }
                };
                //在数组里面删除预估购置税
                for (var i = result.seviceOrder.length - 1; i >= 0; i--) {
                    if(result.seviceOrder[i].title ==  "预估购置税"){
                        result.seviceOrder.splice(i,1);
                        break;
                    }
                }

                for (var i = result.seviceOrder.length - 1; i >= 0; i--) {


                    if(result.seviceOrder[i].vipCode == 'vip9000002'){
                        result.ymcserviceFee = result.seviceOrder[i].amount;
                        result.seviceOrder.splice(i,1);//在数组里面删除要买车供模板渲染
                    } else {
                        regFeeTotal += result.seviceOrder[i].amount;
                    }

                    if(result.seviceOrder[i] && (result.seviceOrder[i].vipCode == 'vip9000005') ){
                        result.seviceOrder.splice(i,1);
                    }

                };
                //机动车登记费总额
                result.regFeeTotal = regFeeTotal;
                result.totalAmount =  result.totalAmount;// + result.totalDiscountAmt;

                //配置图片地址
                result.carOrder.picUrl = YMC.getResourceUrl(result.carOrder.picUrl);

                //payTit 全款购买 ？汽车价格 : 贷款优惠价  fix:NMS-1312
                if(result.carOrder.ymcPrice > result.carOrder.price){
                    _this.onePay = false;
                }else{
                    _this.onePay = true;
                }


                _this.result = result;
            }
        }
    }
</script>
<style src="../css/checkout.css"></style>