<template>
    <div class="vcar mainautow mainhd mainbtm ">
        <div class="main_cnt service">
            <div class="item clearfix" :class="{'item_arr-down':showServiceFee==false,'item_arr-up':showServiceFee==true}" @click="showServiceFee=!showServiceFee">
                <div class="item_left"><span id="ymcs">{{serviceName}}</span></div>
                <div class="item_right"><span id="serviceFee" class="txt1"> &yen;{{serviceFee}}</span></div>
            </div>
            <div class="serv_intro" v-show="showServiceFee">
                <p class="serv_info">是否担心买车过程的验车上牌缴税等太麻烦？</p>
                <p class="serv_info"><strong>不怕，要买车帮你搞定！</strong></p>
                <p class="serv_info">要买车提供专业级的检车验车上牌缴税等一条龙服务，包括但不限于</p>
                <div class="option_wrap service_wrap clearfix">
                    <div class="option option_col4">
                        <i class="iserv"></i>
                        <p class="tc">PDI检测</p>
                    </div>
                    <div class="option option_col4">
                        <i class="iserv iserv2"></i>
                        <p class="tc">360度验车</p>
                    </div>
                    <div class="option option_col4">
                        <i class="iserv iserv3"></i>
                        <p class="tc">购置税代缴</p>
                    </div>
                    <div class="option option_col4">
                        <i class="iserv iserv4"></i>
                        <p class="tc">交车关怀</p>
                    </div>
                    <div class="option option_col4">
                        <i class="iserv iserv5"></i>
                        <p class="tc">一对一专人<br>上牌陪同</p>
                    </div>
                    <div class="option option_col4">
                        <i class="iserv iserv6"></i>
                        <p class="tc">精品施工<br>进出库检验</p>
                    </div>
                    <div class="option option_col4">
                        <i class="iserv iserv7"></i>
                        <p class="tc">购车全场<br>资料托管</p>
                    </div>
                    <div class="option option_col4">
                        <i class="iserv iserv8"></i>
                        <p class="tc">车牌号<br>六选一</p>
                    </div>
                </div>
            </div>
            <div class="item   clearfix" :class="{'item_arr-down':showRegFee==false,'item_arr-up':showRegFee==true}" @click="showRegFee=!showRegFee">
                <div class="item_left">机动车登记费</div>
                <div class="item_right"><span id="regFee" class="txt1"><!-- &yen;215 -->&yen;{{regFee}}</span></div>
            </div>
            <div id="regFeeWrap" v-show="showRegFee">
                <div class="item item2 clearfix lisenceamount" v-show="showSwitchBox">
                    <div class="item_left">已有正式牌照额度</div>
                    <div class="item_right">
                        <div ubt="switchBox" class="switch_box" @click="clickSwitchBoxOn" :class="{'switch_box-on':switchBoxOn}">
                            <div class="switch_scroll"></div>
                        </div>
                    </div>
                </div>
                <div class="item item2 clearfix" v-if="switchBoxOn">
                    <div class="item_left formalreg"><i ubt="formalreg" @click="clickFormalReg" :class="{'ico_checkbox2-on':formalRegPriceIsDefault,'ico_checkbox2-disabled':formalRegForced}" class="ico_checkbox2 formalreg"></i><span id="zspz">{{formalRegName}}</span></div>
                    <div class="item_right"><span id="formalRegFee" class="txt1"><!-- &yen;120 -->&yen;{{formalRegPrice}}</span></div>
                </div>
                <div class="item item2 clearfix linshipaizhao">
                    <div class="item_left tempreg"><i ubt="tempreg"  :class="{'ico_checkbox2-on':tempRegPriceIsDefault}" class="ico_checkbox2 tempreg ico_checkbox2-disabled"></i><span id="lspz">{{tempRegName}}</span></div>
                    <div class="item_right">
                        <span  v-show="tempRegPriceIsDefault" class="ui_adjust">
                            <!--如果最大次数是1，那么不显示加减符号-->
                            <span v-show="tempRegPriceMaxNum!=1" ubt="adjust" @click="minus" :class="{'disabled':tempRegTimes==1}" class="ui_adjust_minus"></span>
                            <span v-show="tempRegPriceMaxNum!=1" class="ui_adjust_view">申办{{tempRegTimes}}次</span>
                            <span v-show="tempRegPriceMaxNum!=1" ubt="adjust" @click="plus" :class="{'disabled':tempRegTimes==tempRegPriceMaxNum}" class="ui_adjust_plus"></span>
                        </span>
                        <span id="tempRegFee" class="txt1"><!-- &yen;12 -->&yen;{{tempRegFee}}</span>
                    </div>
                </div>
                <div id="suzhoudengjifei" v-show="findSuzhoudengjifei" class="item item2 clearfix">
                    <div class="item_left formalreg"><span id="suzhouTitle">{{suzhouName}}</span></div>
                    <div class="item_right"><span id="suzhouPri" ><!-- &yen;120 -->&yen;{{suzhouFee}}</span></div>
                </div>
            </div>
            <div>

                <div class="item_detail">
                    <h3>注意事项</h3>
                    <p v-show="switchBoxOn" style="display:none;"  v-text="formalRegPriceDescription"></p>
                    <p>购车者需要符合当地车管所要求临牌或正式牌照办理条件，如缺少所需资料证件，平台将收取额外资料办理费用。</p>
                    <ul>
                        <li>要买车服务费是要买车为每位购车者的验车、提车过程及前后提供的一系列专业服务，如果因购车者自身资质额度限制缘故导致的部分服务项无法享受，要买车会竭尽全力协助客户，但服务金额不变。</li>
                        <li>如果购车者已有正式牌照上牌额度，则任选一项或多项皆可；如果购车者还没有正式牌照上牌额度，则必选一次临时牌照的申办；</li>
                        <li>临时牌照每位购车者单次购车最多申办一次。</li>
                        <li>若因客观原因无法代办上牌服务，牌照登记注册费将全额退还。</li>
                        <li>因车管所办理流程的限制，购置税缴纳代办服务需与上正式牌照组合进行。</li>
                        <li>抵押登记费：因贷款购车需办理机动车抵押登记，由车管所向抵押人收取的机动车抵押登记手续费。</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="fixbtm abs_size clearfix" style="z-index:5;" v-if="btmEnable">
            <div ubt="submitService" class="btn_save" @click.stop="submitAjax">确认尊享服务方案</div>
            <p class="accessory_sum accessory_sum-left">小计<span id="totalFee" class="price cor_red">&yen;{{totalFee|price}}</span></p>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data:function(){
            return {
                formalRegPriceDescription:'',
                showServiceFee:true,
                showRegFee:true,
                ajaxUrl                 : 'Products/ShoppingCart/GetNobleServiceList',
                submitUrl               : 'Products/ShoppingCart/UpdateService',
                id                      : '',    //购物车id
                serviceName             : '',    //服务费名称
                serviceFee              : 0,     //要买车服务费
                findformalRegPrice      : false, //是否有正式牌照注册登记费
                licenceEnabled          : false,
                licenceAmount           : false,
                showSwitchBox           : true,
                vip9000004              : false, //正式牌照注册登记费
                vip9000003              : false, //临时牌照注册登记费
                vip9000006              : false, //【区域(城市名)】机动车抵押登记费
                switchBoxOn             : false, //已有正式牌照额度是否勾选
                //正式牌照
                formalRegName           : '',    //正式牌照注册登记费用的名称
                formalRegPrice          : 0,     //正式牌照注册登记费
                formalRegPriceIsDefault : false, //正式牌照注册登记费是否勾选
                formalRegForced         : false, //正式牌照注册登记费是否必选
                //临时牌照
                tempRegName             : '',    //临时牌照注册登记费用名称
                tempRegPrice            : 0,     //临时牌照注册登记费
                tempRegPriceIsDefault   : false, //临时牌照注册登记费是否勾选
                tempRegPriceMaxNum      : 0,     //最大值
                tempRegTimes            : 1,     //使用次数

                findSuzhoudengjifei     :false,  //是否有（区域）登记费
                suzhouFee               : 0 ,    //（区域） 机动车抵押登记费
                suzhouName              : '',     //区域名称
                btmEnable               : false
            }
        },
        computed:{
            totalFee:function(){
                return this.regFee + this.serviceFee ;
            },
            //机动车登记费
            regFee:function(){
                var n = 0;

                //正式牌照注册登记费
                if(this.formalRegPriceIsDefault){
                    n += this.formalRegPrice;
                }
                //临时牌照注册登记费
                if(this.tempRegPriceIsDefault){
                    n += this.tempRegFee;
                }
                //区域注册登记费
                n += this.suzhouFee;

                return n;
            },
            //临时牌照注册登记费
            tempRegFee:function(){
                return this.tempRegPrice * this.tempRegTimes;
            }
        },
        methods:{
            clickSwitchBoxOn:function(){
                this.switchBoxOn = this.formalRegPriceIsDefault = !this.switchBoxOn;
            },
            clickFormalReg:function(){
                if(this.formalRegForced){
                    //如果是必选
                    return;
                }
                this.formalRegPriceIsDefault =!this.formalRegPriceIsDefault;
            },
            plus:function(){

                if(this.tempRegTimes == this.tempRegPriceMaxNum){
                    return;
                }
                this.tempRegTimes++;
            },
            minus:function(){
                if(this.tempRegTimes == 1){
                    return;
                }
                this.tempRegTimes--;
            },
            submitAjax:function(){
                var _this = this;
                var d = {};
                d.shoppingCartId = _this.id;
                d.itemDetails = [];

                //正式牌照注册登记费
                if(this.formalRegPriceIsDefault){
                    d.itemDetails.push({vipCode:"vip9000004","name":"正式牌照注册登记费","value":1,"price":_this.formalRegFee});
                }

                //临时牌照注册登记费
                if(this.tempRegPriceIsDefault){
                    d.itemDetails.push({vipCode:"vip9000003","name":"临时牌照注册登记费","value":_this.tempRegTimes,"price":_this.tempRegFee});
                }

                //区域注册登记费
                if(this.suzhouFee){
                    d.itemDetails.push({vipCode:"vip9000006","name":"","value":1,"price":_this.suzhouFee});
                }

                d.itemDetails.push({vipCode:"vip9000002","name":"交验车服务费","value":1,"price":_this.serviceFee});
                // YMC.log(JSON.stringify(d.itemDetails));

                //提交
                YMC.ajax({
                    url: _this.submitUrl,
                    data: d,
                    showLoading:true,
                    success: function(res){
                        //成功后跳转
                        if(res.success){
                            router.go({name:'myBuyCar'});
                        } else {
                            VUI.alert(res.error.message);
                        }
                    },
                    error: function(){
                        VUI.alert("提交失败，请稍后再试", 1500);
                    }
                });

            },
            //渲染
            render:function(res){
                var _this = this;
                var result = res.result;
                var serviceList = result.serviceList;
                var ymcServiceO,//要买车服务费对象
                    registerAmount = []; //机动车登记费
                _this.licenceEnabled = res.result.licenceEnabled;
                _this.licenceAmount = res.result.licenceAmount;
                for (var i = 0; i < serviceList.length; i++) {
                    if(serviceList[i].vipCode == 'vip9000002'){
                        //找到要买车服务费对象
                        ymcServiceO = serviceList[i];
                        _this.serviceFee = ymcServiceO.price * 1;
                        _this.serviceName= ymcServiceO.name;

                    } else {
                        registerAmount.push(serviceList[i]);
                    }
                };

                //机动车登记费
                // _this.findformalRegPrice
                for (var i = 0; i < registerAmount.length; i++) {
                    switch(registerAmount[i].vipCode){
                        //正式牌照注册登记费
                        case 'vip9000004':
                            _this.formalRegName = registerAmount[i].name;//名称
                            _this.formalRegPrice = registerAmount[i].price;//正式牌照注册登记费
                            _this.formalRegPriceIsDefault = registerAmount[i].isDefault;//是否勾选
                            _this.formalRegPriceDescription = registerAmount[i].description;//正式牌照注册登记费描述
                            if(_this.formalRegPriceIsDefault){
                                _this.switchBoxOn = true;
                            }
                            //找到了正式牌照注册登记费
                            _this.findformalRegPrice = true;
                        break;
                        //临时牌照注册登记费
                        case 'vip9000003':
                        _this.tempRegName = registerAmount[i].name;
                        _this.tempRegPrice = registerAmount[i].unitPrice//临时牌照注册登记费
                        _this.tempRegPriceIsDefault = registerAmount[i].isDefault;//是否勾选
                        _this.tempRegPriceMaxNum = registerAmount[i].maxNum;//最大值
                        _this.tempRegTimes = registerAmount[i].value * 1;
                        break;
                        //【区域】机动车抵押登记费
                        case 'vip9000006':
                            _this.findSuzhoudengjifei = true;
                            var regItem = registerAmount[i];
                            _this.suzhouFee = regItem.unitPrice;
                            _this.suzhouName = regItem.name;
                            //隐藏switchBox
                            _this.showSwitchBox = false;
                            //正式牌照注册登记费必选
                            _this.formalRegForced = true;
                            _this.switchBoxOn = _this.formalRegPriceIsDefault = true;
                        break;
                    }
                };
            },
            reset:function(){
            this.formalRegPriceDescription='',
            this.showServiceFee=true,
            this.showRegFee=true,
            this.id                      = '',    //购物车id
            this.serviceName             = '',    //服务费名称
            this.serviceFee              = 0,     //要买车服务费
            this.findformalRegPrice      = false, //是否有正式牌照注册登记费
            this.licenceEnabled          = false,
            this.licenceAmount           = false,
            this.showSwitchBox           = true,
            this.vip9000004              = false, //正式牌照注册登记费
            this.vip9000003              = false, //临时牌照注册登记费
            this.vip9000006              = false, //【区域(城市名)】机动车抵押登记费
            this.switchBoxOn             = false, //已有正式牌照额度是否勾选
            //正式牌照
            this.formalRegName           = '',    //正式牌照注册登记费用的名称
            this.formalRegPrice          = 0,     //正式牌照注册登记费
            this.formalRegPriceIsDefault = false, //正式牌照注册登记费是否勾选
            this.formalRegForced         = false, //正式牌照注册登记费是否必选
            //临时牌照
            this.tempRegName             = '',    //临时牌照注册登记费用名称
            this.tempRegPrice            = 0,     //临时牌照注册登记费
            this.tempRegPriceIsDefault   = false, //临时牌照注册登记费是否勾选
            this.tempRegPriceMaxNum      = 0,     //最大值
            this.tempRegTimes            = 1,     //使用次数

            this.findSuzhoudengjifei     =false,  //是否有（区域）登记费
            this.suzhouFee               = 0 ,    //（区域） 机动车抵押登记费
            this.suzhouName              = '';     //区域名称
            this.btmEnable               = '';     //底部显示

        },
        },
        route:{
            data: function(transition) {
                var _this = this;
                _this.reset();
                _this.id = _this.$route.query.id;

                if(!_this.id){
                    VUI.alert('订单编号获取失败');
                    router.go({ name: 'home'});
                    return false;
                }

                //业务代码
                YMC.ajax({
                    url:  _this.ajaxUrl,
                    data:  {
                        shoppingCartId:_this.id
                    },
                    showLoading:true,
                    success: function(res){
                        if(res.success){
                            _this.render(res);
                            setTimeout(function(){
                                _this.btmEnable = true
                            }, 1000);
                        } else {
                            VUI.alert(res.error.message,1500);
                        }
                    }
                });

                transition.next();
            }
        }
    }
</script>
<style src="../css/car.css"></style>