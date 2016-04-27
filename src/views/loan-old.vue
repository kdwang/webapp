<template>
    <div class="mainautow mainhd mainbtm vcar">
        <div class="main_cnt">
            <input id="price" type="hidden" value="236300">
            <div class="item item_arr-up clearfix" @click.stop="item_click" >
                <div class="item_left">付款方式</div>
                <div class="item_right"><span class="txt1" v-text="payStr"></span></div>
            </div>
            <div id="payOption" class="option_wrap clearfix">
                <div ubt="allPay" @click = "onePay = true" :class="{'option-on':onePay}" class="option option_col2">
                    <span>全款</span>
                </div>
                <div ubt="loan" v-show="showDK" @click = "onePay = false" :class="{'option-on':!onePay}"   class="option option_col2">
                    <span>贷款</span>
                </div>
            </div>
            <div id="loanInfoWrap" v-show="!onePay">
                <div class="item item_arr-up clearfix" @click="item_click">
                    <div class="item_left">银行选择</div>
                    <div class="item_right"><span class="txt1">{{bankName}}</span></div>
                </div>
                <div id="bankOption" class="option_wrap option_wrap1 clearfix">
                    <div v-for="item in codeMsg" @click="chooseBank(item.companyName)" ubt="{{item.companyName}}" :class="{'option-on':bankName==item.companyName}" class="option option_col2"  title="{{item.companyName}}">
                        <img :src="item.logoUrl" class="logo_bank" />
                    </div>
                </div>
                <div class="item item_arr-up clearfix" @click="item_click">
                    <div class="item_left">首付比例</div>
                    <div class="item_right"><span class="txt1" v-text="defaultBili+'%'"></span></div>
                </div>
                <div id="payRatioOption" class="option_wrap clearfix">
                    <div v-for="item in biliList" @click="payMent=item" :class="{'option-on':defaultBili==item}" ubt="payMent_{{item}}" data-type="payMent" data-value="{{item}}" class="option option_col3">
                    <span>{{item}}%</span>
                    </div>
                    <!-- <div class="option option_col3 option-on"> -->
                   <!--  <div class="option option_col3">
                        <span>30%</span>
                    </div>
                    <div class="option option_col3">
                        <span>40%</span>
                    </div>
                    <div class="option option_col3">
                        <span>50%</span>
                    </div>
                    <div class="option option_col3">
                        <span>60%</span>
                    </div>
                    <div class="option option_col3">
                        <span>70%</span>
                    </div>
                    <div class="option option_col3">
                        <span>80%</span>
                    </div> -->
                </div>
                <div class="item item_arr-up clearfix" @click="item_click">
                    <div class="item_left">按揭期限及利率</div>
                    <div class="item_right"><span class="txt1">{{anJieTxt}}</span></div>
                </div>
                <div id="interestOption" class="option_wrap clearfix">

                    <div v-for="item in anjieList" @click="chooseAnjie(item)" ubt="mortgage_{{item.productDescription}}" data-type="mortgage" data-is-def="{{item.isDefault}}" data-value="{{item.stringify}}" :class="{'option-on': financeProductSysNo==item.financeProductSysNo }" class="option option_col3">
                        <span>{{item.productDescription}}</span>
                    </div>
                    <!-- <div class="option option_col3 option-on"> -->
                   <!--  <div class="option option_col3">
                        <span>12期4%</span>
                    </div>
                    <div class="option option_col3">
                        <span>24期8%</span>
                    </div>
                    <div class="option option_col3">
                        <span>36期12%</span>
                    </div> -->
                </div>
                <div class="item item_arr-up clearfix" @click="item_click">
                    <div class="item_left">金融服务费</div>
                    <div class="item_right"><span class="txt1 fs14">(限时免费)<del>&yen;</del><del id="serviceFee">{{serviceFee | price}}</del></span></div>
                </div>
                <div id="serviceFeeDesc" class="item_detail">贷款业务暂免收取金融服务费，为贷款金额的2%。</div>
                <div class="item item_arr-up clearfix" @click="item_click">
                    <div class="item_left">贷款银行介绍</div>
                    <div class="item_right"><span id="bkdesc"></span></div>
                </div>
                <div id="bankDesc" class="item_detail">
                    {{{bankDesc}}}
                </div>
                <div class="item_detail">
                    <h3>备注：</h3>
                    <ul>
                        <li>上述金融机构，若资产/收入不足，可提供亲属的收入房产证明补充。</li>
                        <li>申请所需基础资料包括身份证、结婚证、户口本、房产证（如需）、收入证明/工资流水等。</li>
                        <li>车险须按照银行等金融机构各自的要求进行承保，详见各贷款银行介绍。</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="fixbtm abs_size clearfix" style="z-index:5;">
            <div ubt="submitLoan" @click="loanSubmit" class="btn_save">确认购车方式</div>
            <p class="accessory_sum accessory_sum-left">{{payInfo}}</p>
        </div>

    </div>
</template>

<script>
    module.exports = {
        //props: ['父组建传的值'],
        data:function(){
            return {
                id                  : '',
                biliVal             : 0,  //首付比例的值，数字 如:30
                biliStr             : '', //首付比例 用于显示 如:30%
                anJieTxt            : '', //按揭标题的文字
                codeMsg             : [], // 第一次ajax请求回来的数据 由于循环银行以及图标
                carPirce            : 0,  // 第一次ajax请求回来的数据
                onePay              : true, //是否是全款  控制最上面的付款方式
                financeProductSysNo : 0,    //最后选择的按揭编号
                showDK              : true, //显示贷款
                bankDesc            : '',   //银行介绍
                formatD             : {},   //格式化后的数据
                payType             : '',   //付款方式
                bankName            : '',   //选择的银行
                payMent             : 0,    //首付比例
                serviceFee          : '',   //金融服务费
                chooseProductDescription:'',//当前选择按揭，用于底部左下显示详情
                apiUrl              : 'Products/ShoppingCart/GetFinanceCompanysByShoppingCartId',//数据请求url
                subAjaxUrl          : 'Products/ShoppingCart/UpdateSchemeLoan'//提交url
            }
        },
        computed:{
            payStr:function(){
                return this.onePay? '全款' : '贷款';
            },
            //获取首付比例
            biliList:function(){
                var bkO = this.formatD[this.bankName];
                if(bkO){
                    this.bankDesc = bkO.description; //这里更新银行介绍
                    return bkO['首付比例'];
                }
                return [];
            },
            defaultBili:function(){
                if(this.payMent){

                    return this.payMent;
                }
                var bkO = this.formatD[this.bankName];

                if(bkO && bkO.defaultProduct){
                    YMC.log('defaultBili:' + (bkO.defaultProduct.downPaymentRate * 100) );
                    return bkO.defaultProduct.downPaymentRate * 100
                }
                return 0;
            },
            //当前按揭列表
            anjieList:function(){
                try{
                    var bkO = this.formatD[this.bankName],arr;
                    if(bkO && bkO['按揭'] && bkO['按揭'][this.payMent || this.defaultBili].ajArr){
                        this.serviceFee = bkO['按揭'][this.payMent || this.defaultBili].serviceFee;
                        this.payMent = this.payMent || this.defaultBili;
                        arr = bkO['按揭'][this.payMent || this.defaultBili].ajArr;
                        this.anJieTxt = arr[0].productDescription;
                        this.chooseProductDescription = arr[0].productDescription;
                        this.financeProductSysNo = arr[0].financeProductSysNo || arr[0].productSysId;
                        return arr;
                    }
                }catch(e){
                    YMC.log('anjieList----error'+e);
                    return [];
                }

                return [];
            },
            payInfo:function(){
                if(this.onePay){
                    return '全款';
                }
                return this.bankName + ': ' + this.payMent + '% ' + this.chooseProductDescription;
            }
        },
        //这里才是route的生存周期
        route:{
            //waitForData: true, //数据加载完毕后再切换试图，也就是 点击之后先没反应，然后数据加载完，再出发过渡效果
            data: function(transition) {
                var _this = this;
                this.id = this.$route.query.id;
                if(!_this.id){
                    VUI.alert('编号获取失败',1000,function(){
                        router.go({ name: 'home'});
                    });
                    return false;
                }
                YMC.ajax({
                    url         : _this.apiUrl,
                    showLoading : true,
                    data: {
                        shoppingCartID: _this.id
                    },
                    success: function(res){
                        //测试
                        //var res = {"success":true,"result":{"carPirce":181800.00,"list":[{"companyName":"南京银行","financeCompanySysNo":4,"displayOrder":1,"isDefault":true,"products":[{"financeProductSysNo":1675,"productSysId":1675,"downPaymentRate":0.0000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":true},{"financeProductSysNo":1676,"productSysId":1676,"downPaymentRate":0.0000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1677,"productSysId":1677,"downPaymentRate":0.0000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1678,"productSysId":1678,"downPaymentRate":0.0000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1679,"productSysId":1679,"downPaymentRate":0.1000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1680,"productSysId":1680,"downPaymentRate":0.1000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1681,"productSysId":1681,"downPaymentRate":0.1000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1682,"productSysId":1682,"downPaymentRate":0.1000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1683,"productSysId":1683,"downPaymentRate":0.2000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1684,"productSysId":1684,"downPaymentRate":0.2000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1685,"productSysId":1685,"downPaymentRate":0.2000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1686,"productSysId":1686,"downPaymentRate":0.2000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1687,"productSysId":1687,"downPaymentRate":0.3000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1688,"productSysId":1688,"downPaymentRate":0.3000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1689,"productSysId":1689,"downPaymentRate":0.3000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1690,"productSysId":1690,"downPaymentRate":0.3000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1691,"productSysId":1691,"downPaymentRate":0.4000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1692,"productSysId":1692,"downPaymentRate":0.4000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1693,"productSysId":1693,"downPaymentRate":0.4000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1694,"productSysId":1694,"downPaymentRate":0.4000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1695,"productSysId":1695,"downPaymentRate":0.5000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1696,"productSysId":1696,"downPaymentRate":0.5000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1697,"productSysId":1697,"downPaymentRate":0.5000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1698,"productSysId":1698,"downPaymentRate":0.5000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1699,"productSysId":1699,"downPaymentRate":0.6000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1700,"productSysId":1700,"downPaymentRate":0.6000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1701,"productSysId":1701,"downPaymentRate":0.6000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1702,"productSysId":1702,"downPaymentRate":0.6000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1703,"productSysId":1703,"downPaymentRate":0.7000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1704,"productSysId":1704,"downPaymentRate":0.7000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1705,"productSysId":1705,"downPaymentRate":0.7000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1706,"productSysId":1706,"downPaymentRate":0.7000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1707,"productSysId":1707,"downPaymentRate":0.8000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1708,"productSysId":1708,"downPaymentRate":0.8000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1709,"productSysId":1709,"downPaymentRate":0.8000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1710,"productSysId":1710,"downPaymentRate":0.8000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false}],"description":"<div class=\"bankinfo\">\n<p>1、年龄18至60周岁之间（包括贷款年限在内），在本市有固定住所，稳定、合法的职业和收入来源的客户。</p>\n<p>2、在本市常住，有稳定工作，税后月收入达4000元，社保满1年，即可准入。</p>\n<p>3、私营业主，营业执照需满3年，在本市有房产且已婚。</p>\n<p>4、零首付，额度高，最高额度可达30万，最长可分48期还款。</p>\n<p>5、一年费用收取的百分比如上所示，且该费用为分期收取；另上面展示的费用百分比为最优百分比，具体费用根据客户实际情况确定。</p>\n<p>6、具有良好的信用记录和还款意愿，负债低。</p>\n<p>7、无抵押、无担保，不限车牌，不强制保险。</p>\n</div>","logoUrl":"http://image.yaomaiche.com/mkt/Original/2015/0717/0752ef09-3481-4311-93bd-d328af223328.jpg","logoPath":"http://image.yaomaiche.com/mkt/Original/2015/0717/0752ef09-3481-4311-93bd-d328af223328.jpg"},{"companyName":"浦发银行","financeCompanySysNo":7,"displayOrder":2,"isDefault":false,"products":[{"financeProductSysNo":949,"productSysId":949,"downPaymentRate":0.3000,"loanTerm":12,"interestRate":0.0550,"productDescription":"1年5.5%","isDefault":false},{"financeProductSysNo":950,"productSysId":950,"downPaymentRate":0.3000,"loanTerm":24,"interestRate":0.1100,"productDescription":"2年11%","isDefault":false},{"financeProductSysNo":951,"productSysId":951,"downPaymentRate":0.3000,"loanTerm":36,"interestRate":0.1650,"productDescription":"3年16.5%","isDefault":false},{"financeProductSysNo":952,"productSysId":952,"downPaymentRate":0.4000,"loanTerm":12,"interestRate":0.0550,"productDescription":"1年5.5%","isDefault":false},{"financeProductSysNo":953,"productSysId":953,"downPaymentRate":0.4000,"loanTerm":24,"interestRate":0.1100,"productDescription":"2年11%","isDefault":false},{"financeProductSysNo":954,"productSysId":954,"downPaymentRate":0.4000,"loanTerm":36,"interestRate":0.1650,"productDescription":"3年16.5%","isDefault":false},{"financeProductSysNo":955,"productSysId":955,"downPaymentRate":0.5000,"loanTerm":12,"interestRate":0.0550,"productDescription":"1年5.5%","isDefault":false},{"financeProductSysNo":956,"productSysId":956,"downPaymentRate":0.5000,"loanTerm":24,"interestRate":0.1100,"productDescription":"2年11%","isDefault":false},{"financeProductSysNo":957,"productSysId":957,"downPaymentRate":0.5000,"loanTerm":36,"interestRate":0.1650,"productDescription":"3年16.5%","isDefault":false},{"financeProductSysNo":958,"productSysId":958,"downPaymentRate":0.6000,"loanTerm":12,"interestRate":0.0550,"productDescription":"1年5.5%","isDefault":false},{"financeProductSysNo":959,"productSysId":959,"downPaymentRate":0.6000,"loanTerm":24,"interestRate":0.1100,"productDescription":"2年11%","isDefault":false},{"financeProductSysNo":960,"productSysId":960,"downPaymentRate":0.6000,"loanTerm":36,"interestRate":0.1650,"productDescription":"3年16.5%","isDefault":false},{"financeProductSysNo":961,"productSysId":961,"downPaymentRate":0.7000,"loanTerm":12,"interestRate":0.0550,"productDescription":"1年5.5%","isDefault":false},{"financeProductSysNo":962,"productSysId":962,"downPaymentRate":0.7000,"loanTerm":24,"interestRate":0.1100,"productDescription":"2年11%","isDefault":false},{"financeProductSysNo":963,"productSysId":963,"downPaymentRate":0.7000,"loanTerm":36,"interestRate":0.1650,"productDescription":"3年16.5%","isDefault":false},{"financeProductSysNo":964,"productSysId":964,"downPaymentRate":0.8000,"loanTerm":12,"interestRate":0.0550,"productDescription":"1年5.5%","isDefault":false},{"financeProductSysNo":965,"productSysId":965,"downPaymentRate":0.8000,"loanTerm":24,"interestRate":0.1100,"productDescription":"2年11%","isDefault":false},{"financeProductSysNo":966,"productSysId":966,"downPaymentRate":0.8000,"loanTerm":36,"interestRate":0.1650,"productDescription":"3年16.5%","isDefault":false}],"description":"<div class=\"bankinfo\">\n<p>1、年龄18至60周岁之间，具有中国国籍的自然人，具有良好的信用记录和还款意愿。</p>\n<p>2、在本市拥有本人名下房产，或有合法稳定的收入、银行工资流水税后4500元以上、连续缴纳社保两年以上且有按期还款的能力。</p>\n<p>3、首付比例20%起，购车分期信用额度最高可达34.9万，最长分36期还款。贷款金额35万及以上的，需办理抵押，贷款比例最高达70%。</p>\n<p>4、手续费分期收取，高效便捷。</p>\n<p>5、提供关系证明，可以上直系亲属的牌照。</p>\n<p>6、银行要求客户首年购买交通强制险、盗抢险、车损险、第三者责任险（至少20万），保险受益人为浦发银行北京分行。</p>\n</div>","logoUrl":"http://image.yaomaiche.com/mkt/Original/2015/0810/78db197a-4bc3-432c-bc0f-1eee012ea29d.png","logoPath":"http://image.yaomaiche.com/mkt/Original/2015/0810/78db197a-4bc3-432c-bc0f-1eee012ea29d.png"}]},"error":null,"unAuthorizedRequest":false};
                        if( res.success == false ){
                            VUI.alert( res.error.message );
                            return;
                        }
                        _this.codeMsg = res.result.list;
                        _this.carPrice = res.result.carPirce;

                        //如果一个银行都没有，那么把贷款的隐藏掉,并选择全款购买
                        if( !_this.codeMsg || _this.codeMsg.length == 0 ){
                            _this.showDK = false;
                            return;
                        }

                        //如果一个银行都没选择那么就是全款
                        for ( var i = _this.codeMsg.length - 1; i >= 0; i-- ) {
                            if( _this.codeMsg[i].isDefault ){
                                _this.onePay = false;
                                _this.bankName = _this.codeMsg[i].companyName;
                            }
                        };
                        //格式化数据
                        _this.formatD = _this.formatData(_this.codeMsg,_this.carPrice);
                        transition.next();
                    }
                });
            }
        },
        methods:{
            chooseBank:function(companyName){
                this.bankName = companyName;
                YMC.log({
                    "bank" : this.bankName,
                    "payType": this.payType ? "全款":"贷款购买" ,
                    "financeProductSysNo": this.financeProductSysNo,
                    "shoppingCartID": this.id
                });
            },
            chooseAnjie:function(item){
                this.financeProductSysNo = item.financeProductSysNo || item.productSysId;
                this.anJieTxt = item.productDescription;
                this.chooseProductDescription = item.productDescription;
            },
            // 格式化，将列表数组格式化为如下模式
            // {
            //    '中国银行':{
            //        首付比例:[30,40,50],
            //        按揭:{
            //               '30' //首付比例
            //               :
            //               {
            //                  serviceFee:   // 服务费
            //                  ajArr:[{
            //                        downPaymentRate     : 0.2      //对应的首付比例
            //                        financeProductSysNo : 1        //编号
            //                        interestRate        : 0.04     //'利率'
            //                        isDefault           : true     //是不是默认的
            //                        loanTerm            : 1        //'年限'
            //                        productDescription  : null
            //                        txt                 : "12期4%" // 年限*12+利率 用于显示的文字
            //                  }]
            //               }
            //             }
            //        Description:'银行描述'
            //        defaultProduct:{}//该银行下的默认按揭产品
            //     }
            //     ...
            //     ...
            // }
            formatData : function(arr,price){
                var LOAN = {};
                var bkName = '',products;
                var carPrice = price;
                for(var i = 0, len = arr.length; i < len; i++ ){
                    bkName = arr[i].companyName;
                    if(!LOAN[bkName]){
                        LOAN[bkName]={};
                        LOAN[bkName].financeCompanySysNo = arr[i].financeCompanySysNo;
                        LOAN[bkName]['首付比例'] = [];
                        LOAN[bkName]['按揭'] = {};
                        LOAN[bkName].defaultProduct = {};
                        LOAN[bkName].description = arr[i].description;
                        LOAN[bkName].productDescription = arr[i].productDescription;
                    }
                    products = arr[i].products;
                    var sf,aj,sfVal,find=false;
                    for(var j = 0, jlen = products.length; j < jlen; j++){

                        if(products[j].isDefault){
                            LOAN[bkName].defaultProduct = products[j];
                            find = true;
                        }

                        sf = LOAN[bkName]['首付比例'];
                        aj = LOAN[bkName]['按揭'];

                        //计算一个首付比例 80
                        sfVal = (products[j].downPaymentRate) * 100;

                        //要展示的文字 如：12期4%
                        products[j].txt = ( products[j].loanTerm * 12 )+ '期' + ( Math.round(products[j].interestRate * 100) )+'%';
                        if(products[j].txt.length>15){
                           // debugger;
                        }
                        //这里用于模板渲染，点击后方便设置要提交时的数据
                        products[j].stringify = JSON.stringify(products[j]);


                        if( ~sf.indexOf( sfVal ) ){
                            aj[sfVal].ajArr.push(products[j]);
                        } else {
                            //如果 LOAN[bkName]['首付比例']数组里面没出现过此比例
                            //添加到 首付比例数组中，在按揭中声明此比例对象
                            sf.push(sfVal);
                            aj[sfVal] = {};
                            aj[sfVal].ajArr = [];
                            aj[sfVal].ajArr.push(products[j]);
                            aj[sfVal].serviceFee = carPrice * (1 - (sfVal / 100)) * (2 / 100);
                        }
                    }
                    //没找到 那么就是贷款
                    if(find === false && products.length){
                        LOAN[bkName].defaultProduct = products[0];
                    }
                }
                return LOAN;
            },
            loanSubmit:function(){
                var _this = this;
                var loanInfo = {
                        "bank" : this.bankName,
                        "payType": this.onePay ? "全款":"贷款购买" ,
                        "financeProductSysNo": this.financeProductSysNo,
                        "shoppingCartID": this.id
                    };
                YMC.log(loanInfo);
                //router.go({name:'myBuyCar'});
                YMC.ajax({
                    showLoading:true,
                    url: _this.subAjaxUrl,
                    data:loanInfo,
                    success:function(res){
                        res.success = true;
                        if( res.success ){
                            router.go({ name: 'myBuyCar'});
                        } else {
                            VUI.alert('提交失败，请稍后重试！',1500);
                        }
                    }
                });
            },
            item_click:function(event){
                var that = $(event.target).closest('.item');
                if(that.hasClass("item_arr-up")){
                    that.removeClass("item_arr-up").addClass("item_arr-down").next().hide();
                }else{
                    that.removeClass("item_arr-down").addClass("item_arr-up").next().show();
                }
            },
        }
    }
</script>
<style src="../css/car.css"></style>