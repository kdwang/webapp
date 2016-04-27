<template>
<div  id="checkout" class="mainautow vcheckout" style="padding-top:51px;">
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

                        </template>
                            <p class="car-color clearfix" v-html="outerColor"></p>
                            <p class="car-color clearfix" v-html="innerColor"></p>
                        </div>

                    </div>
                    <ul class="scheme" v-if="result.storeName">
                        <li class="title" style="border-top:none;">交付中心 <span style="color:#fe6863;">{{result.storeName}}</span></li>
                        <li style="text-align: justify;text-indent: 2em;font-size:14px;"> 交付门店的选择与车辆库存分配、保险、按揭、牌证服务等关系紧密，<span style="color:#fe6863;float:none;">订单一经创建则无法变更</span>。当下如需修改交付门店，请返回“首页”顶部重新选择您期望的交付门店对象。 </li>
                    </ul>
                    <ul class="scheme mt10">
                        <li class="title">要买车产品</li>
                        <li class="clearfix">{{onePay ? '汽车价格':'贷款优惠价'}}<!-- 全款购买 ？ 汽车价格 : 贷款优惠价 --><span><em>¥</em>
                        <template v-if="result.groupPurchaseCarGoods">{{result.groupPurchaseCarGoods.groupPurchasePrice | price}}</template>
                        <template v-else>{{result.carOrder.price | price}}</template>
                        </span></li>
                        <li class="clearfix">
                            购买方式<span style="color:#fe6863;"> {{result.schemeLoanOrder.title}} </span>
                        </li>
                    </ul>
                    <ul class="scheme mt10">
                        <li class="title">要买车服务</li>
                        <li class="clearfix">要买车服务费<span><em>¥</em>{{result.ymcserviceFee | price}}</span></li>
                        <li class="clearfix">金融服务费<span><em class="cor_red" v-if="result.schemeLoanOrder.isFree"> （限时免费） </em><em class="line-t" servicefee="{{result.schemeLoanOrder.serviceFee}"  :class="{'line-through;':result.schemeLoanOrder.isFree}">¥ {{result.schemeLoanOrder.serviceFee | price}}</em></span></li>
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
                                        {{iitem.title}} {{iitem.amount}} <br>
                                    </dd>
                                </dl>
                            </div>
                        </li>
                    </ul>
                    <ul class="scheme">
                        <li class="  clearfix item_arr-down" :class="{'item_arr-up':showFee }" @click="showFee=!showFee">机动车登记费<span><em>¥</em>{{regFeeTotal|price}}</span></li>
                        <li class="openT">
                            <div class="ex_oper  " v-show="showFee">
                                <dl v-for="item in result.seviceOrder">
                                    <dt class="lastL">{{item.title}}<span>¥{{item.amount}}</span></dt>
                                </dl>
                            </div>
                        </li>
                    </ul>
                    <ul class="scheme">
                        <li v-if="result.licenceAmount">预估购置税（多退少补）<span><em>¥</em>{{result.carOrder.purchaseTax|price}}</span></li>
                        <li v-else>购置税需另行缴纳（约）¥{{result.carOrder.purchaseTax|price}}</li>
                    </ul>
                    <template v-if="result.enabledCoupons">
                    <div class="favorable clearfix" v-show="!promotionPrice">
                        <p id="p1">
                            <input ubt="codeInput" id="PromotionCodeTB" v-model="promotionCode" class="menu1" type="text" placeholder = "请输入优惠码" value="">
                        </p>
                        <p id="p2">
                            <input ubt="codeBtn" id="SBPromotionCode"  @click="checkPromotionCode" class="menu2" type="button" value="提交">
                        </p>
                    </div>
                    <ul class="scheme coupons-no" v-show="promotionPrice">
                       <li>{{couponsName}}<span><em>¥</em>-{{promotionPrice}}</span></li>
                    </ul>
                    </template>
                    <template v-else>
                        <p class="txt-tip mt10">该商品不支持优惠券支付。</p>
                    </template>

                    <div class="price"> 总价约：
                        <span class="pp"><em>¥</em>
                            <template v-if="result.groupPurchaseCarGoods">
                                    {{result.groupPurchaseCarGoods.shoppingCarPrice|price}}
                                </template>
                                <template v-else>
                                {{result.totalAmount|price}}
                                </template>
                        </span>
                        <template v-if="!result.licenceAmount">(不含购置税)</template>
                    </div>
                    <div class="agree checkbox_handle">
                        <span class="agree-item" ubt="chkAgree" @click="chkAgree=!chkAgree"><i :class="{'checkbox_checked':chkAgree}" class="checkbox_wrap"></i>我已阅读并同意</span>
                        <span><em class="hasRightArrow" data-target="salecontract_pop"><a ubt="agreement" id="agree-rule" v-link="{name:'agreement'}">《要买车用户服务协议》</a></em></span>
                    </div>
                    <ul class="userinfo">
                        <li>车主姓名：
                            <input type="text" v-model="name" ubt="name" class="direction_ltr" id="userName" placeholder="请填写车主的真实姓名">
                        </li>
                        <li>&emsp;手机号：
                            <input type="text" v-el:phone v-model="phoneNum | phone" ubt="phoneNum" maxlength="13" id="userPhone" placeholder="请输入电话号码" >
                        </li>
                         <li class="last" v-show="!isLogin">&emsp;验证码：
                            <input ubt="validateCdode" type="text" id="userValidateCode" maxlength="6" placeholder="短信中6位数字">
                            <a ubt="sendCode" id="getvalidatecode"  @click="getValidateCode" href="javascript:void(0)">发送验证码</a>
                            <a id="checkout_tipReget" class="tipReget"></a>
                        </li>
                    </ul>
                    <div class="txt-tip">下单后购车者需本人携带有效证件到店验车提车，订单车辆发票的登记人信息需与验车提车人保持一致。
                    <p>此处姓名即为：<span style="color:#FE6863">车主、被保险人、车贷申请人</span> </p>
                    </div>
                    <h1 class="chosePayTypeTit">
                        请选择支付方式<span>定金：<em>¥</em><i> {{result.deposit|price}}</i></span>
                    </h1>
                    <div class="chosePayType">
                        <a class="btnAlipay" v-show="!inWeiXin" ubt="alipay" @click="submitbefore('alipay')"   > </a>
                        <a class="btnWeixinpay" ubt="weixinpay"  @click="submitbefore('weixin')" > </a>
                    </div>

            </div>
        </div>
    </div>

    <div class="markdiv act-markdiv" id="qgMark" v-show="showQgMark">
        <div class="act-pop-wrap">
            <div class="act-pop tc">
                <h4>您的闪购码为</h4>
                <div class="coupon-code-wrap">
                    <span id="qgCode">{{qgCode}}</span>
                    <i class="ia ia-8"></i>
                    <i class="ia ia-9"></i>
                </div>
                <p class="fs12">下单按照闪购价生成订单，<br>组团闪购价会在活动结束时，<br>根据闪购人数统一调整。</p>
                <p><a v-link="{name: 'rush-rule', replace: true}" class="btn vUseInfo">使用说明</a></p>
                <div id="qg-use" @click="qgUse" class="act-btn act-btn-4">确认使用</div>
            </div>
        </div>
    </div>
    <div class="markdiv act-markdiv" id="qgSorry" v-show="showQgSorry">
        <div class="act-pop-wrap">
            <div class="act-pop tc">
                <h3>很抱歉</h3>
                <p class="fs12" v-text="sorryTxt"></p>
                <p><a v-link="{name:'home'}" class="btn">返回首页</a></p>
                <p><a v-link="{name: 'rush-rule', replace: true}" class="btn">使用说明</a></p>
            </div>
        </div>
    </div>

    <div class="pay-confirm-mark" v-show="payConfirm"></div>
    <div class="pay-confirm-wrap" v-show="payConfirm">
        <div class="pay-confirm" >
            <div class="pay-confirm-main">
                <div class="pay-confirm-body">
                <p class="pay-confirm-content">请在 <span style="color:#FC4A44">3分钟</span>内完成支付，否则订单将自动关闭。一旦完成支付，订单信息不可更改。</p>
                <p class="pay-confirm-comment">如因个人原因导致订单作废，定金无法退回。</p>
                </div>
                <div class="pay-confirm-foot">
                    <div class="pay-confirm-foot-cancel" @click.stop.prevent="payConfirm=false">我再看看</div><div class="pay-confirm-foot-confirm" @click.stop.prevent="payConfirmCb">确认支付</div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
    module.exports = {
        //props: ['父组建传的值'],
        data:function(){
            return {
                outerColor:'',//外观
                innerColor:'',//内饰
                payConfirm:false, //支付前确认
                payConfirmCb:function(){},//支付确认回调
                onePay:false,  //全款购买 ？汽车价格 : 贷款优惠价
                sorryTxt:'',
                ajaxUrl         : 'Products/shoppingCart/GetShoppingCartDetail',
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
                },
                promotionCode   : '',//优惠码
                name            : '',//姓名
                phoneNum        : '',//手机号
                promotionPrice  : 0,//优惠券金额
                couponsName     : '',//优惠券名字
                chkAgree        : false,//我已阅读并同意要买车用户服务
                isLogin:false,          //是否登陆
                payMethod:'',//支付方式
                panicbuyingCode:'',//闪购码
                qgCode:'',
                showQgMark:false,//显示闪购的层
                showQgSorry:false,//没报名，闪购失败
                orderNum:'', //提交时订单号
                createOrderIng:false,//创建订单中。。。
                inWeiXin : false,
                payMethod:'',//支付方式  微信:'1' 支付宝:'2'
                //第三方统计
                adwqStr : {
                    id : '',
                    pay : '',
                    carname : '',
                    price : ''
                },
                // 国双统计
                gridsumToken: {
                    orderId: '',
                    carGoodsId: '',
                    deposit: 0,
                    payMethod: 0
                }
            }
        },
        //这里才是route的生存周期
        route:{
            data: function(transition) {
                var _this = this;

                _this.reset();
                _this.id = this.$route.query.id;
                if(!_this.id){
                    VUI.alert('购物车编号获取失败');
                    return;
                }

                // 进入页面重置用于国双统计的参数
                _this.gridsumToken= {
                    orderId: '',
                    carGoodsId: '',
                    deposit: 0,
                    payMethod: 0
                }


                _this.orderNum = '';
                //业务代码
                YMC.ajax({
                     url:  _this.ajaxUrl,
                     data:  {
                         id:_this.id
                     },
                     showLoading:true,
                     success: function(res){
                         _this.render(res);
                     },
                     error: function(){
                         // VUI.alert("提交失败，请稍后再试", 1500);
                     }
                });
                // setTimeout(function(){
                //     _this.render();
                // },300);
            }
        },
        computed:{

        },
        methods:{
            render:function(res){
                var _this = this;
                //var res = {"success":true,"result":{"cityName":"北京","cityId":"9420aade-7fcb-47b3-bac1-ea204d253a40","storeId":"b0fe04a6-64ea-4d86-a76c-4c3b3e43adf7","storeName":"北京石景店","totalAmount":290672.0,"totalDiscountAmt":0.0,"carOrder":{"name":"Q3 2015款 35 TFSI quattro 技术型 国V 冰川白 黑色","picUrl":"/upload/image/original/201510/310201165916.png","price":275900.00,"purchaseTax":28530.00,"shippingFee":2100.00},"productOrder":{"title":"智惠之选","amount":3438.00,"warning":null,"productStatus":0,"subProductOrders":[{"title":"智惠之选","amount":3438.00,"warning":null,"productStatus":0,"subProductOrders":[{"title":"3M太阳膜组合-田园风光+瑞丽冰酷(适用SUV或MPV)","amount":2640.00,"warning":null,"productStatus":2,"subProductOrders":null},{"title":"PAPAGO New P1W行车记录仪(送8G卡)","amount":499.00,"warning":null,"productStatus":2,"subProductOrders":null},{"title":"环保无味丝圈脚垫","amount":299.00,"warning":null,"productStatus":2,"subProductOrders":null}]}]},"schemeLoanOrder":{"title":"南京银行 首付0% 12期4.50%","serviceFee":5518.00000000,"isFree":true,"firstPay":0.0000},"insuranceOrder":{"title":"大众智选","amount":8229.916,"detailType":null,"subInsuranceOrders":[{"title":"太平洋 车损险","amount":5042.036,"detailType":"I","subInsuranceOrders":null},{"title":"太平洋 三责险","amount":2204.55,"detailType":"I","subInsuranceOrders":null},{"title":"太平洋 交强险","amount":950.0,"detailType":"C","subInsuranceOrders":null},{"title":"太平洋 车船税","amount":33.33,"detailType":"V","subInsuranceOrders":null}]},"seviceOrder":[{"amount":5.00000,"title":"临时牌照注册登记费","vipCode":"vip9000003"},{"amount":1000.00000,"title":"要买车服务费","vipCode":"vip9000002"}],"purchaseTaxTitle":"(需另行缴纳)","deposit":999.0,"isHasCarInventory":true,"noInventoryProduct":null,"licenceAmount":false,"groupPurchaseCarGoods":null,"confirmOrderOutPut":null,"enabledCoupons":true,"panicBuyingOuput":null},"error":null,"unAuthorizedRequest":false};

                if(res.success==false){
                    VUI.alert(res.error.message,2000,function(){
                        //跳转首页
                        router.go({name:'home'});
                    });
                    return;
                }

                //获取车辆颜色
                if(res.result.carOrder.appearanceColorName){
                    var otColor = res.result.carOrder.appearanceColorRGB.split("/");
                    otColorHTML = '<span style="background-color:'+otColor[0]+'"></span>';
                    otColorHTML += ( otColor[1] ? '<span class="sec" style="background-color:' + otColor[1] + '"></span>' : '' );
                    this.outerColor = '外观：<i class="clearfix">'+ otColorHTML +'</i>' + res.result.carOrder.appearanceColorName;

                    var inColor = res.result.carOrder.interiorColorRGB.split("/");
                    inColorHTML = '<span style="background-color:'+inColor[0]+'"></span>';
                    inColorHTML += ( inColor[1] ? '<span class="sec" style="background-color:' + inColor[1] + '"></span>' : '' );
                    this.innerColor = '内饰：<i class="clearfix">'+ inColorHTML +'</i>' + res.result.carOrder.interiorColorName
                }

                // 获取车型id用于国双统计
                if(res.result.carOrder.carGoodsId){
                    _this.gridsumToken.carGoodsId = res.result.carOrder.carGoodsId;
                }

                //闪购的一些需求

                if(res.result && res.result.panicBuyingOuput && res.result.panicBuyingOuput.cargoodsId){
                    _this.qginit(res.result.panicBuyingOuput.cargoodsId);
                }

                var result = res.result;
                _this.subCityId = result.cityId;

                //处理一下数据
                //有没有库存的东西
                if(result.noInventoryProduct && result.noInventoryProduct.length){
                    VUI.confirm("您选择的" + result.noInventoryProduct.join("") + "库存不足，请重新选择", "库存不足", [function (e) {
                        //确定
                        router.go({name:'myBuyCar'});
                    }, function () {

                    }], 1000000, "修改购车方案", "取消");

                }

                // 以后可能用得上下面两个字段
                // result.carOrder.ymcPrice 要买车车辆价格
                // result.carOrder.loanDiscountAmt  贷款优惠

                //设置部分统计信息
                _this.adwqStr.id = _this.id;
                _this.adwqStr.pay = result.deposit;
                _this.adwqStr.carname = result.carOrder.name;
                _this.adwqStr.price = result.carOrder.price;

                //先把机动车登记费拿出来
                var regFeeTotal = 0;//机动车登记费

                //把金额为0的剔除出去
                for (var i = result.seviceOrder.length - 1; i >= 0; i--) {
                    if(result.seviceOrder[i].amount == 0){
                        result.seviceOrder.splice(i,1);
                        break;
                    }
                };

                for (var i = result.seviceOrder.length - 1; i >= 0; i--) {
                    if(result.seviceOrder[i].title == '要买车服务费' ||  result.seviceOrder[i].title == '交验车服务费'){
                        result.ymcserviceFee = result.seviceOrder[i].amount;
                        result.seviceOrder.splice(i,1);//在数组里面删除要买车供模板渲染
                    } else {
                        regFeeTotal += result.seviceOrder[i].amount;
                    }
                };

                //机动车登记费总额
                _this.regFeeTotal = regFeeTotal;
                _this.totalAmount =  result.totalAmount

                //配置图片地址
                result.carOrder.picUrl = YMC.getResourceUrl(result.carOrder.picUrl);

                //获取firstpay，使用优惠券的时候计算金额
                _this.firstPay = result.schemeLoanOrder.firstPay;

                //payTit 全款购买 ？汽车价格 : 贷款优惠价  fix:NMS-1312
                if(result.carOrder.ymcPrice > result.carOrder.price){
                    _this.onePay = false;
                }else{
                    _this.onePay = true;
                }

                _this.result = result;


                //检查登陆
                _this.checkLogin();

                //如果是微信环境，那么隐藏支付宝，显示微信支付
                if(YMC.isWeiXin){
                    _this.inWeiXin = true;
                }

                $("#agree-rule").attr("href", function(){
                    return $(this).attr("href") + "&id="+ _this.id;
                });

                //如果前面有存优惠券，那么这里再填写一下
                setTimeout(function(){
                    _this.registerPromotionCode();
                },100);

            },
            //如果页面里面有存优惠券，那么自动填入，并删除localstorage里面存的值
            registerPromotionCode:function(){
                var _this = this;
                var code = YMC.local('PromotionCode');
                if(code){
                    _this.promotionCode = code;
                    //_this.checkPromotionCode();
                }
            },
            //验证优惠券
            checkPromotionCode:function(){
                var _this = this;

                // 国双统计代码
                if (window._gsTracker && !!_this.gridsumToken.carGoodsId && (window.location.href.match('http(s)?:\/\/m.yaomaiche.com'))) {
                    _gsTracker.trackEvent("click","优惠代码提交",_this.gridsumToken.carGoodsId);
                }


                //用户可能不填写优惠券，所以在有值的时候再去验证
                _this.promotionCode = $.trim(_this.promotionCode);
                if(_this.promotionCode===""){
                    VUI.alert('请填写优惠券',1000);
                    return;
                }

                var data = {
                    couponsNo : _this.promotionCode,
                    cityId: _this.subCityId || '',
                    shoppingCartId: _this.id
                };


                //测试
                // _this.promotionPrice = 1000;
                // _this.couponsName = '优惠券名字';
                // //更新总价
                // _this.result.totalAmount = _this.result.totalAmount - _this.promotionPrice;
                // //优惠券计算公式
                // var pri = _this.result.schemeLoanOrder.serviceFee * 1 - ( ( 1 - _this.firstPay ) *  _this.promotionPrice * 0.02 );
                // if(!isNaN(pri)){
                //     _this.result.schemeLoanOrder.serviceFee = pri;
                // }
                // return;
                //测试-end

                //验证优惠券
                YMC.ajax({
                    url: 'Marketing/PrivilegeMaster/GetCouponsAmountByCouponsNo',
                    data: data,
                    showLoading:true,
                    success: function(res){
                        if(res.success){
                            //优惠券可用
                            var result = res.result;
                            _this.promotionPrice = result.couponsAmount;
                            _this.couponsName = result.couponsName;
                            //更新总价
                            _this.result.totalAmount = _this.result.totalAmount - _this.promotionPrice;
                            //优惠券计算公式
                            var pri = _this.result.schemeLoanOrder.serviceFee * 1 - ( ( 1 - _this.firstPay ) *  _this.promotionPrice * 0.02 );
                            if(!isNaN(pri)){
                                _this.result.schemeLoanOrder.serviceFee = pri;
                            }

                        } else {
                            VUI.alert(res.error.message);
                        }
                    },
                    error: function(){
                        VUI.alert("验证失败，请稍后再试", 1500);
                    }
                });
            },
            //提交前的检查
            checkPage:function(){
                //                 promotionCode   : '',//优惠码
                // name            : '',//姓名
                // phoneNum        : '',//手机号
                // promotionPrice  : 0,//优惠券金额
                // couponsName     : '',//优惠券名字
                // chkAgree        : false,//我已阅读并同意要买车用户服务
                if (!this.chkAgree) {
                    VUI.alert("请阅读并同意要买车用户服务协议！",1500);
                    return false;
                }
                //验证
                if (this.name == "") {
                    VUI.alert("请输入您的姓名！",1500);
                    return false;
                }

                if(this.phoneNum == "") {
                    VUI.alert("请输入手机号码！",1500);
                    return false;
                }

                if ( !YMC.register.validateMobile(this.phoneNum) ) {
                    VUI.alert("请输入正确的手机号码！",1500);
                    return false;
                }

                //没有登陆的时候才 需要  填手机验证码
                if ( !this.isLogin && $('#userValidateCode').val().trim() == '' ) {
                    VUI.alert("请输入手机验证码！",1500);
                    return false;
                }

                return true;
            },
            //创建订单
            createOrder:function(opt){
                var _this = this;
                if(_this.createOrderIng){
                    VUI.alert('订单创建中，请稍等。');
                    return;
                }
                _this.createOrderIng = true;
                //创建订单
                // YMC.ajax({
                //     url: 'api/services/Products/order/CreateOrder',
                //     data: {
                //         // 购物车ID
                //         "shoppingCartId":pageStatus.shoppingCartId,
                //         // 优惠券Key
                //         "couponNo":pageStatus.couponNo || '',
                //         // 支付方式
                //         "payMethod":pageStatus.payMethod,
                //         // 姓名
                //         "trueName": $('#userName').val().trim(),
                //         "plateform":'3'   //订单来源（int，1：手机App，2：PC商城，3：M站点）  目前写死 3
                //     },
                //     beforeSend:function(xhr){
                //         xhr.setRequestHeader("Authorization", "Bearer" + pageStatus.userToken);
                //     },
                //     success: function(res){
                //         //var result = res.result;
                //         opt.success && opt.success(res);

                //     },
                //     error: function(){
                //         opt.error && opt.error();
                //         // VUI.alert("提交失败，请稍后再试", 1500);
                //     }
                // });
                //VUI.alert('创建订单中。。。');
                //创建订单test
                var yima = {
                    source : $.fn.cookie('source') || '',
                    channel : $.fn.cookie('channel') || '',
                    cid : $.fn.cookie('cid') || '',
                    wi : $.fn.cookie('wi') || ''
                }
                var CreateOrderInput = {
                    //电话号码
                    "phone"          : $('#userPhone').val().trim().replace(/\s/g,''),
                    // 购物车ID
                    "shoppingCartId" : _this.id,
                    // 优惠券Key
                    "couponNo"       : _this.promotionCode || '',
                    // 支付方式
                    "payMethod"      : _this.payMethod,
                    // 姓名
                    "trueName"       : $('#userName').val().trim(),
                    "plateform"      : '3',   //订单来源（int，1：手机App，2：PC商城，3：M站点）  目前写死 3
                    "source" : yima.source,
                    "channel" : yima.channel,
                    "cid" : yima.cid,
                    "wi" : yima.wi
                }

                // 存在闪购码就添加
                if(_this.panicbuyingCode){
                    CreateOrderInput.panicbuyingCode = _this.panicbuyingCode;
                }

                YMC.ajax({
                    url: 'products/order/CreateOrder',//'http://10.16.46.127:1111/api/services/products/order/CreateOrderService',//
                    data: CreateOrderInput,
                    showLoading: true,
                    success: function(res){
                        if(res.success){
                            //删除页面已存在的优惠券
                            YMC.local('PromotionCode',null);
                            if(opt.success){
                                var orderNum = res.result && res.result.orderNum;
                                window._track && (window._track.data.orderNum = orderNum);
                                window._track && _track.setD({orderId:orderNum});
                                //第三方统计
                                _this._adwqOrder(orderNum);


                                // 创建订单成功则将 localstorage 的国双统计数据删除
                                YMC.local( "gridsumToken", null );

                                // 将订单号存入ls，用户支付完成页面获取（国双统计）
                                _this.gridsumToken.orderId = window._track.data.orderNum;
                                _this.gridsumToken.payMethod = CreateOrderInput.payMethod;
                                _this.gridsumToken.deposit = _this.result.deposit;

                                var userKeyStr = YMC.local( "__UserKey") || '';
                                YMC.log("支付页-确认支付定金点击总数-统计开始之前");
                                YMC.wdLog(userKeyStr, _this.gridsumToken.orderId, "支付页-确认支付定金点击总数-统计开始之前");
                                // new Image().src="http://120.26.64.136:9001/api/gs/ClientLog?logstring=userKey:"+userKeyStr+";orderId:"+_this.gridsumToken.orderId+";state:支付页-确认支付定金点击总数-统计开始之前;rd:"+Math.random();
                                if(window._gsTracker && (window.location.href.match('http(s)?:\/\/m.yaomaiche.com'))) {
                                    if(CreateOrderInput.payMethod === '2'){
                                        _gsTracker.trackEvent("click","支付宝支付",_this.gridsumToken.orderId);
                                    }else{
                                        _gsTracker.trackEvent("click","微信支付",_this.gridsumToken.orderId);
                                    }
                                    YMC.log("支付页-确认支付定金点击总数-统计开始");
                                    YMC.wdLog(userKeyStr, _this.gridsumToken.orderId, "支付页-确认支付定金点击总数-统计开始");
                                    _gsTracker.trackEvent("click","确认支付定金点击总数_01",_this.gridsumToken.orderId);

                                    YMC.local( "gridsumToken", JSON.stringify( _this.gridsumToken ) );
                                    YMC.log("支付页-确认支付定金点击总数-统计完成且写入ls");
                                    YMC.wdLog(userKeyStr, _this.gridsumToken.orderId, "支付页-确认支付定金点击总数-统计完成且写入ls");
                                }


                                // 将国双cookie传给服务器-start
                                // 获取国双cookie
                                function getGsCookie(){
                                    var gsCookie = document.cookie.split(/\s?;\s?/);
                                    var gsStr='';
                                    gsCookie.forEach(function(val,key,arr){
                                      if(val.match("_gs")){
                                         if(key==gsCookie.length-1){
                                            gsStr += val;
                                        }else{
                                          gsStr += val+";";
                                        }
                                      }
                                    });
                                    return gsStr;
                                }
                                var gsCookieStr = getGsCookie();
                                if(gsCookieStr.length > 5){
                                    gsCookieStr = window._track.data.orderNum +";"+ gsCookieStr;
                                    // 去除空格
                                    gsCookieStr = gsCookieStr.replace(/\s/g, '');
                                    YMC.log(gsCookieStr);
                                    var oimg = new Image();
                                    oimg.src='http://120.26.64.136:9001/api/gs/gscookie?cookieStr='+gsCookieStr;
                                    /*YMC.ajax({
                                        url: 'http://120.26.64.136:9001/api/gs/gscookie?cookieStr='+gsCookieStr,
                                        showLoading: false,
                                        success: function(res){},
                                        errow: function(){},
                                        complete:function(){}
                                    });*/
                                }
                                // 将国双cookie传给服务器-end


                                var now = +new Date;
                                while(new Date - now >= 500) {} // 阻塞 100ms

                                opt.success(res);
                            }
                        } else {
                            VUI.alert(res.error.message);
                        }
                    },
                    error:function(){
                        opt.error && opt.error();
                    },
                    complete:function(){
                        _this.createOrderIng = false;
                    }
                });

            },
            submitbefore:function(payType){
                var _this = this;
                if(!this.checkPage()){
                    return;
                }
                _this.payConfirm = true;
                _this.payConfirmCb = function(){
                    _this.submit(payType);
                    _this.payConfirm = false;
                }
            },
            submit:function(payType){
                var _this = this;
                var userKeyStr = YMC.local( "__UserKey") || '';
                YMC.log("支付页-点击支付按钮-创建订单之前");
                YMC.wdLog(userKeyStr, '', "支付页-点击支付按钮-创建订单之前");
                if(!this.checkPage()){
                    return;
                }

                if(payType === 'weixin'){
                    this.payMethod = '1';
                }

                if(payType === 'alipay'){
                    this.payMethod = '2';
                }

                var goPay = function(){
                    // if(_this.orderNum){
                    //     if(payType === 'alipay'){
                    //         YMC.pay.alipay(_this.orderNum)
                    //     }

                    //     if(payType === 'weixin'){
                    //         YMC.pay.weixin(_this.orderNum);
                    //     }
                    //     return;
                    // }

                    _this.createOrder({
                        success:function(res){
                            _this.orderNum =  res.result.orderNum;
                            YMC.wdLog(userKeyStr, '', "支付页-去支付");
                            if(payType === 'alipay'){
                                YMC.pay.alipay(_this.orderNum)
                            }

                            if(payType === 'weixin'){
                                YMC.pay.weixin(_this.orderNum);
                            }
                        },
                        error:function(){
                            VUI.alert('订单创建失败，请稍后再试！');
                        }
                    });
                }
                if(_this.isLogin){
                    goPay();
                } else {
                    //未登陆
                    _this.registerUser(goPay);
                }
            },
            //检查是否登陆
            checkLogin:function(){
                var _this = this;
                //如果已经登陆
                var userToken = YMC.register.loginStatus();
                if(userToken){
                    _this.isLogin = true;
                    //通过token查找用户手机 号码
                     YMC.ajax({
                         url: 'UserInfo/UserBaseInfo/GetSimpleInfo',
                         success: function(res){
                            if(res.success){
                                var result = res.result;
                                _this.userPhone = result.phone;
                                _this.name = result.name;
                                _this.phoneNum = result.phone;
                                _this.name = (result.name == result.phone ? '' : result.name);  //如果姓名是手机号，则不显示
                                _this.$els.phone.readOnly = true;

                            }
                         }
                     });
                } else {
                    //如果没有登陆
                    _this.isLogin = false;
                }
            },
            //闪购的一些需求
            //进入页面先请求接口，传入 如果没登陆那么跳转到
            qginit:function(id){
                var _this = this;
                _this.sorryTxt = '您没有此商品的闪购码，不能参与闪购';
                // 第三阶段前先不走
                YMC.ajax({
                    url: 'marketing/panicBuyingActivity/checkUserPanicBuyingStatus',
                    data: {
                        id:id
                    },
                    showLoading:true,
                    success: function(res){
                        if(res.success&&res.result){
                            var result = res.result;

                    // "isLogin": false,  //是否登陆
                    // "isSignUp": false, //是否报名
                    // "code":''          //填入code12121

                            if(result.isPanicBuyingGoods){
                                if(!result.isLogin){
                                    router.go({name:'_login',query:{source:'checkout',id:_this.id}});
                                    return false;
                                }
                                if(!result.isSignUp){
                                    //没报名,弹第二个层跳首页
                                    _this.showQgSorry = true;
                                    return false;
                                }

                                if(!result.code){
                                    //已使用闪购码
                                    _this.sorryTxt = '您的闪购码已使用！';
                                    _this.showQgSorry = true;
                                    return false;
                                }

                                //填入code
                                _this.qgCode = result.code;
                                _this.showQgMark = true;
                            }
                        }else{
                            setTimeout(function(){
                                VUI.alert(res.error.message);
                            },100);
                        }

                    }
                });
            },
            //使用闪购码
            qgUse:function(){
                this.panicbuyingCode = this.qgCode;
                this.showQgMark      = false
            },
            //发送验证码
            getValidateCode:function(fn){
                var _this = this;

                if(_this.phoneNum.replace(/\s/g,'') === ''){
                    VUI.alert("请输入手机号！",1500);
                    return;
                }

                //发送验证码            //发送验证码按钮       // 倒计时dom
                YMC.register.coutDown(  $('#getvalidatecode'), $('#checkout_tipReget'));
                var data = {
                    Mobile: _this.phoneNum.replace(/\s/g,'')
                };

                YMC.ajax({
                    url: "UserAccount/UserLogin/GetCodeForCreatOrder",
                    data: data,
                    success: function (res) {
                        if(res.success){

                        }else{
                            VUI.alert(res.error.message, 1000);
                            //发送失败
                            $('#getvalidatecode').show();
                            YMC.register.registerNum = 0;
                            $('#checkout_tipReget').hide();
                        }
                    },
                    error: function(res){
                        // VUI.alert(res.error.message, 1500);
                        VUI.alert("网络连接失败，请稍后再试。", 1500);
                    }
                });
            },
            //@注册或者登陆用户
            registerUser:function(goPay){
                var _this = this;
                YMC.ajax({
                    url: 'UserAccount/UserRegister/RegisterOrLogin',
                    data: {
                        trueName: _this.name.trim(),
                        mobile :  _this.phoneNum.replace(/\s/g,''),
                        verificationCode : $('#userValidateCode').val()
                    },
                    showLoading:true,
                    success: function(res){
                        //存取当前用户
                        if(res.success){
                            //注册成功
                            var expireTime = +new Date + res.result.expiresMinutes * 60 * 1000;
                            var ymcToken = {
                                "id"         : res.result.token,
                                "expireTime" : expireTime
                            }
                            //如果在app里面登陆的时候
                            if(Prius.isInsideApp){
                                Prius.appLoginIn(res.result.token,$('#userPhone').val().trim().replace(/\s/g,''));
                            }
                            YMC.local( "ymcToken", JSON.stringify( ymcToken ) );
                            router.app.userState  =  YMC.register.loginStatus();
                            //用于埋点的cookie
                            if(res.result.ymC_Token){
                                $.fn.cookie('ymc_userkey',res.result.ymC_Token);
                            }

                            //创建订单去支付
                            goPay();
                        } else {
                            setTimeout(function(){
                                VUI.alert(res.error.message);
                            },10);
                            _this.createOrderIng = false;
                        }
                    },
                    error: function(xhr){
                        VUI.alert("用户注册失败，请稍后再试", 1500);
                        _this.createOrderIng = false;
                    }
                });
            },
            // 闪购码使用规则
            goRushRule: function(){
                router.replace({
                    name: 'rush-rule'
                });
            },
            //第三方统计
            _adwqOrder:function(ord){
                var _this = this;
                var _adwqUid = JSON.parse(YMC.local("ymcToken")).userid || this.phoneNum.replace(/\s/g, "");
                _adwq.push([ '_setDataType', 'order' ]);
                _adwq.push([ '_setCustomer',
                    _adwqUid  // 当前登陆用户ID - 注意不能回传中文
                ]);
                _adwq.push(['_setOrder',
                    ord,     // 订单编号  - 必填项
                    _this.adwqStr.pay,   // 用户实际支付金额 – 必填项
                    '' // 下单时间 – 可选
                ]);

                _adwq.push(['_setItem',
                    '',    // 商品编号  - 必填项
                    _this.adwqStr.carname,    // 商品名称  - 必填项
                    _this.adwqStr.price,    // 商品金额  - 必填项
                    '1',        // 商品数量  - 必填项
                    '',     // 商品分类编号  - 必填项
                    ''        // 商品分类名称  - 必填项
                ]);
                _adwq.push([ '_trackTrans' ]);
            },
            //重置
            reset:function(){
                this.outerColor='',//外观
                this.innerColor='',//内饰
                this.payConfirm=false, //支付前确认
                this.payConfirmCb=function(){},//支付确认回调
                this.onePay=false,  //全款购买 ？汽车价格 : 贷款优惠价
                this.sorryTxt        = '',
                this.id              = '',//购物车id
                this.subCityId       = '',//城市id，---验证优惠券的时候需要用到
                this.regFeeTotal     = 0,
                this.showjingping    = false,//精品价格隐藏显示
                this.showinsurance   = false,//车险价格隐藏显示
                this.showFee         = false,//机动车登记费价格隐藏显示
                this.result          = {
                    carOrder        : {},
                    schemeLoanOrder : {},
                    productOrder    : {},
                    insuranceOrder  : {}
                },
                this.promotionCode   = '',//优惠码
                this.name            = '',//姓名
                this.phoneNum        = '',//手机号
                this.promotionPrice  = 0,//优惠券金额
                this.couponsName     = '',//优惠券名字
                this.chkAgree        = false,//我已阅读并同意要买车用户服务
                this.isLogin         = false,          //是否登陆
                this.payMethod       = '',//支付方式
                this.panicbuyingCode = '',//闪购码
                this.qgCode          = '',
                this.showQgMark      = false,//显示闪购的层
                this.showQgSorry     = false,//没报名，闪购失败
                this.orderNum        = '', //提交时订单号
                this.createOrderIng  = false,//创建订单中。。。
                this.inWeiXin        = false,
                this.payMethod       = '',//支付方式  微信:'1' 支付宝:'2'
                //第三方统计
                this.adwqStr         = {
                    id : '',
                    pay : '',
                    carname : '',
                    price : ''
                },
                // 国双统计
                this.gridsumToken    = {
                    orderId: '',
                    carGoodsId: '',
                    deposit: 0,
                    payMethod: 0
                };
            }
        }
    }
</script>
<style src="../css/checkout.css"></style>
<style>
    .vcheckout .ia{display: inline-block;background-image: url(../imgs/ico_act.png);background-repeat: no-repeat;background-size: 116px 185px;}
    .vcheckout .ia-8,
    .vcheckout .ia-9{width: 7px;height: 46px;}
    .vcheckout .ia-8{background-position: -100px 0;}
    .vcheckout .ia-9{background-position: -109px 0;}
    .vcheckout .act-markdiv{display: table;width: 100%;height: 100%;opacity: 1;background-color: rgba(0,0,0,.5);}
    .vcheckout .act-markdiv .act-pop-wrap{display: table-cell;vertical-align: middle;}
    .vcheckout .act-pop-wrap .act-pop{width: 80%;height: auto;margin: 0 auto;padding-top: 10px;background-color: #fff;border-radius: 4px;overflow: hidden;}
    .vcheckout .act-pop h3{font-size: 20px;color: #444;font-weight: normal;margin-bottom: 10px;}
    .vcheckout .act-pop h3 .ia-10{margin-right: 4px;vertical-align: -3px;}
    .vcheckout .act-pop p{margin:10px 0;color: #777;}
    .vcheckout .act-pop .btn{height: 24px;font-size: 12px;line-height: 24px;color: #999;}
    .vcheckout .act-pop .act-btn{margin-top: 10px;border-radius: 0;}
    .vcheckout .act-pop .act-btn::before{content: initial;}
    .vcheckout .act-btn{display: block;width: 100%;height: 38px;margin-top: 6px;line-height: 38px;text-align: center;color: #fff;border-radius: 4px;}
    .vcheckout .act-btn.act-btn-4{color: #3a312e;background-color: #F7CF15}

    .vcheckout .coupon-code-wrap{position: relative;width: 120px;height: 46px;margin:10px auto;font: 24px/46px Consolas, monospace;color: #fff;background-color: #f6110a;-webkit-user-select:text;}
    .vcheckout .coupon-code-wrap .ia{position: absolute;top:0;bottom: 0;}
    .vcheckout .coupon-code-wrap .ia-8{left: 50%;margin-left: -67px;}
    .vcheckout .coupon-code-wrap .ia-9{right: 50%;margin-right: -67px;}
    .vcheckout .line-through{text-decoration: line-through;}
    .vcheckout .act-btn::before{content:initial;}

    /*支付确认*/
    .vcheckout .pay-confirm-wrap{
        position: fixed;
        left:0;
        top:0;
        width:100%;
        height:100%;
        overflow:hidden;
        display: table;
    }
    .vcheckout .pay-confirm{
        display: table-cell;
        vertical-align: middle;
        overflow: hidden;
    }
    .vcheckout .pay-confirm-main{
        margin: 0 auto;
        width: 70%;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
    }
    .vcheckout .pay-confirm-mark{
        background: #000;
        opacity: .5;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .vcheckout .pay-confirm-body{
            padding: 20px 30px;
    }
    .vcheckout .pay-confirm-content{
        font-size: 15px;
        color: #101010;
    }
    .vcheckout .pay-confirm-comment{
        font-size: 13px;
        margin-top: 15px;
        color: #A4A4A4;
    }
    .vcheckout .pay-confirm-foot{
           height: 50px;
           border-top: 1px solid #EAEAEA;
           font-size: 14px;
    }
    .vcheckout .pay-confirm-foot-cancel,
    .vcheckout .pay-confirm-foot-confirm{
        display: inline-block;
        width: 50%;
        line-height: 50px;
        text-align: center;
    }
    .vcheckout .pay-confirm-foot-cancel{
        background-color: #F4F4F4;
        color: #9C9C9C;
    }
   .vcheckout .pay-confirm-foot-confirm{
        background-color: #F7CF15;
        color: #614F00;
    }
    .vcheckout .checkout .car .name .car-color{
        font-size:14px;
        line-height: 22px;
        color:#333;
    }
    .vcheckout .checkout .car .name .car-color span{
        padding: 0;
        margin: 0;
        width: 16px;
        height: 16px;
        display: block;
        float: left;
    }
    .vcheckout .checkout .car .name .car-color span.sec{
        margin-top: -16px;
        margin-left: 8px;
    }
    .vcheckout .checkout .car .name .car-color i{
        margin: 0 5px;
        display: inline-block;
        vertical-align: -3px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        overflow: hidden;
        border:1px solid #ccc;
    }
</style>