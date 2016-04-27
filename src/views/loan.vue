<template>
    <div class="mainautow mainhd" style="background:#fff;">
       <div class="step1" v-show="step1">
    <div class="content">
        <div ubt="allPay" gsq="全款" class="price-box" @click="onePay = true">
            <i class="icon" :class="{'i1':!onePay,'i2':onePay}"></i>
            <p>全款<span>（裸车价）</span></p>
            <span class="text1">元</span>
            <span class="text1" v-text="carPrice | priceInt"></span>
            <span class="text1">¥</span>
        </div>
        <!-- <div class="price-box" style="display:none" v-show="isFinancialLeasing">
            <div class="jiaxin"> 车价抄底，提车时额外返现2500元。上“嘉信” 公司车牌，6个月后过户至客户名下。</div>
        </div> -->
        <div ubt="loan" class="price-box" gsq="贷款" v-show="showDK" @click="onePay = false">
            <i class="icon" :class="{'i1':onePay,'i2':!onePay}"></i>
            <p>贷款</p>
        </div>
    <div v-show="onePay">
        <div class="co" v-show="!isFinancialLeasing">
            <div class="co-inner">
                <div class="div">
                    <p>亲，50%以上客户贷款购车，余额理财，收益大于利息。此时不贷，更待何时？</p>
                </div>
                <div class="braed">
                    <table  cellpadding="0" cellspacing="0" width="100%">
                      <thead>
                        <tr>
                            <th>&nbsp;</th>
                            <th width="35%">贷款</th>
                            <th width="35%">主流理财</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td>金额</td>
                            <td>10万</td>
                            <td class="last">10万</td>
                        </tr>
                        <tr>
                            <td>期限</td>
                            <td>3年</td>
                            <td class="last">3年</td>
                        </tr>
                        <tr>
                           <td>年化费率</td>
                           <td>4%</td>
                           <td class="last">5%</td>
                        </tr>
                        <tr>
                           <td>费用/收益</td>
                           <td>1.2万</td>
                           <td class="last">1.5万</td>
                        </tr>
                      </tbody>
                    </table>

                   <!--  <table v-show="isFinancialLeasing" cellpadding="0" border="1" cellspacing="0" width="100%" style="border:1px solid #e4e4e4;">
                      <thead>
                        <tr>
                            <th class="matn">共享惠</th>
                            <th width="35%">全款</th>
                            <th width="35%" colspan="2">贷款</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                            <td>付款方式</td>
                            <td>一次付清</td>
                            <td>6期</td>
                            <td>12期</td>
                        </tr>
                        <tr>
                            <td>购车价格</td>
                            <td>额外返现2500</td>
                            <td>免息</td>
                            <td>4%费率</td>
                        </tr>
                        <tr>
                           <td>上牌服务</td>
                           <td colspan="3">上融资租凭公司车牌</td>
                        </tr>
                        <tr>
                           <td>过户手续</td>
                           <td colspan="3">6个月后过户至各户名下</td>
                        </tr>
                      </tbody>
                    </table> -->
                </div>
                <div class="fax" v-show="!isFinancialLeasing">
                    <p>例如：<span v-text="carName"></span></p>
                    <p>主流金融机构分期购车方案：</p>
                    <p>首付：<span class="mt" v-text="downPayment"></span>元，分期：<span class="mt1" v-text="minDownPaymentProduct.loanTerm"></span>期，月供：<span class="mt2" v-text="minDownPaymentProduct.monthlyPayment | priceInt"></span>元</p>
                    <p>我为爱车&nbsp;&nbsp;"贷"&nbsp;&nbsp;颜！</p>
               </div>
            </div>
        </div>
        <div class="loan-financial" v-show="isFinancialLeasing">
            <p>全款：须上“要买车”战略合作的<span style="color:red">融资租赁公司车牌</span>，6个月后过户至客户名下。</p>
            <p>贷款：须上“要买车”战略合作的<span style="color:red">融资租赁公司车牌</span>，贷款期结束后后过户至客户名下。</p>
        </div>
    </div>
        <ul v-show="!onePay" style="display:none;">
            <li class="test clearfix" v-for="item in codeMsg" @click="chooseBank(item.companyName)" ubt="{{item.companyName}}" gsq="{{item.companyName}}">
                <img :src="item.logoUrl" alt="">
                <div class="men">
                    <h2>{{item.companyName}}</h2>
                    <span>首付最低<span v-html="item | getFormatD"></span></span>
                    <p class="p1">  <span v-for="iitem in item.tagList" v-text="iitem"></span></p>
                </div>
                <i class="icon i3"></i>
            </li>
        </ul>
        <p class="p2" v-show="!onePay">注：受金融机构及政策波动等客观因素部分数据会即时更新</p>
        </div>
</div>

<div class="step2 loan-steps" style="display:none" v-show="step2">
    <div class="content">
        <div class="change-bank" @click="step2Back">更换银行</div>
        <div class="price-box">
            <h2>首付比例</h2>
            <span>  {{defaultBili}}%首付款 ¥{{ (carPrice*defaultBili/100) | priceInt }}</span>
        </div>
        <ul class="itm clearfix">
            <li class="clearfix" v-for="item in biliList" @click="payMent=item"  ubt="payMent_{{item}}" gsq="payMent_{{item}}" data-type="payMent" data-value="{{item}}">
                <div class="ctn" :class="{'mat':defaultBili==item}">
                    <div class="div1">{{item}}%</div>
                    <p>¥{{ (carPrice*item/100) | priceInt }}</p>
                </div>
            </li>
        </ul>
        <div class="price-box pr">
            <h2>还款周期</h2>
        </div>
        <ul>
            <li class="ist" v-for="item in anjieList" @click="chooseAnjie(item)" ubt="mortgage_{{item.productDescription}}" gsq="mortgage_{{item.productDescription}}" data-type="mortgage" data-is-def="{{item.isDefault}}" data-value="{{item.stringify}}">
                <i class="icon " :class="{'i7': financeProductSysNo==item.financeProductSysNo,'i8': financeProductSysNo!=item.financeProductSysNo }"></i>
                <div class="tem clearfix">
                    <p>{{item.productDescription}}<!-- 车辆价格 - 首付款 *  利率   interest -->
                        <!-- <span class="span1">(¥{{ ((carPrice - (carPrice*defaultBili/100))*item.interestRate) | priceInt}})<!-- 总价 * item.interestRate -->
                        <span class="span1">(¥{{item.interest | priceInt}})</span><!--直接使用接口字段-->
                        <span>
                    </p>
                    <span class="tem-info">
                        月供¥{{item.monthlyPayment | priceInt}}，总还款¥{{item.totalRepayment | priceInt}}
                    </span>
                </div>
            </li>
            <p class="p2" v-text="interestRateType">


            </p>
        </ul>
        <div class="price clearfix">
            <p>金融服务费</p>
            <span :class="{'xian':isFree}">¥{{serviceFee | priceInt}}</span>
        </div>
        <div class="price clearfix">
            <p>保险要求</p>
            <span>{{regulationText}}</span>
        </div>
        <div class="price ments clearfix">
            <h2 style="font-size: 17px;font-weight: normal;">银行介绍</h2>
            <div v-html="currentBank.description"></div>
        </div>
        <div class="price ments clearfix">
        <p>备注：</p>
        <p>1、上述金融机构，若资产/收入不足，可提供亲属的收入或房产证明补充。</p>
        <p>2、申请所需基础资料包括身份证、结婚证、户口本、房产证（如需）、收入证明/工资流水等。</p>
        <p>3、车险须按照银行等金融机构各自的要求进行承保，详见各贷款金融机构介绍。</p>
        </div>
    </div>
</div>

<!-- <div class="step3 step1" style="display:none" v-show="showBankInfo">
    <div class="hd">
        <div class="page">
            <h1>{{currentBank.companyName}}</h1>
            <a class="arrow-left" @click="hideBackDes"></a>
        </div>
    </div>
    <div style="padding: 60px 5px;">
        {{{currentBank.description}}}
    </div>
</div> -->

<div style="display:none;" v-show="showBottom" class="step tail" ><span class="span1">{{payInfo}}</span><span class="span2" :class="{'disable':disableSubmit}" @click="loanSubmit" gsq="确认购车方式">确认购车方式</span></div>

    </div>
</template>

<script>
    module.exports = {
        //props: ['父组建传的值'],
        data:function(){
            return {
                showBottom:false,         //显示底部菜单,解决在ios下专场后偏移问题
                isFinancialLeasing :false,//是否显示超级贷相应内容
                isFree:false,
                //isFinancialLeasing :false,//是否显示超级贷相应内容
                interestRateType:'',  //0：首期一次性支付  1：利息支付方式：按月支付(月供含利息)
                downPayment:0,//贷款上面的浮层，首付
                carName:'',
                minDownPaymentProduct:{},//贷款浮层
                carPrice                 : 0,    //裸车价
                step1                    : true,
                step2                    : false,
                showBankInfo             : false,//显示银行详情
                id                       : '',
                biliVal                  : 0,    //首付比例的值，数字 如:30
                biliStr                  : '',   //首付比例 用于显示 如:30%
                anJieTxt                 : '',   //按揭标题的文字
                codeMsg                  : [],   //第一次ajax请求回来的数据 由于循环银行以及图标
                currentBank              : {},   //当前选择的银行对象
                carPirce                 : 0,    //第一次ajax请求回来的数据
                onePay                   : true, //是否是全款  控制最上面的付款方式
                financeProductSysNo      : 0,    //最后选择的按揭编号
                showDK                   : true, //显示贷款
                bankDesc                 : '',   //银行介绍
                formatD                  : {},   //格式化后的数据
                payType                  : '',   //付款方式
                bankName                 : '',   //选择的银行
                payMent                  : -1,   //首付比例
                serviceFee               : '',   //金融服务费
                regulationText           : '',   //保险要求
                chooseProductDescription : '',//当前选择按揭，用于底部左下显示详情
                apiUrl                   : 'Products/ShoppingCart/GetFinanceCompanysByShoppingCartId',//数据请求url
                subAjaxUrl               : 'Products/ShoppingCart/UpdateSchemeLoan',//提交url
                btmEnable                : false //底部显示
            }
        },
        filters:{
            bankImgUrl:function(value){
                for(var i = 0;i< this.codeMsg.length;i++){
                    if(this.codeMsg[i].companyName==this.bankName){
                        return this.codeMsg[i].logoUrl
                    }
                    // YMC.log(this.codeMsg[i].logoUrl);
                    // YMC.log(this.codeMsg[i].companyName);
                }
                return '';
            },
            getFormatD:function(item){
                try{
                    if(!item){
                        return '';
                    }
                    var downPaymentRate = 0;
                    if(item.products && item.products.length){
                        downPaymentRate = item.products[0].downPaymentRate ;
                    }
                    // this.formatD[index]
                    // <em> 30%，</em><em>26400元</em>
                    return '<em> '+ (downPaymentRate * 100) +'%，</em><em>¥'+ (((downPaymentRate * 10 * this.carPrice)/10)|0) +'元</em>';
                }catch(e){
                    return 0;
                }
            }
        },
        computed:{
            disableSubmit:function(){
                //如果是默认全款，然后点击了贷款，此时按钮灰掉。
                return !this.onePay && !this.bankName;
            },
            payStr:function(){
                return this.onePay? '全款' : '贷款';
            },
            //获取首付比例
            biliList:function(){
                var bkO = this.formatD[this.bankName];
                if(bkO){
                    for(var i = 0;i< this.codeMsg.length;i++){
                        if(this.codeMsg[i].companyName==this.bankName){
                           this.currentBank =  this.codeMsg[i];
                        }
                    }
                    //console.log(bkO['首付比例']);
                    this.bankDesc = bkO.description; //这里更新银行介绍
                    return bkO['首付比例'];
                }
                return [];
            },
            defaultBili:function(){
                if(this.payMent!==-1){
                    return this.payMent;
                }
                var bkO = this.formatD[this.bankName];

                if(bkO && bkO.defaultProduct){
                    //console.log('defaultBili:' + (bkO.defaultProduct.downPaymentRate * 100) );
                    return bkO.defaultProduct.downPaymentRate * 100
                }
                return 0;
            },
            //当前按揭列表
            anjieList:function(){
                try{
                    var bkO = this.formatD[this.bankName],arr,O,payMent,arrO;
                    if(bkO && bkO['按揭']){
                        payMent = (this.payMent==-1) ? this.defaultBili : this.payMent;
                        arrO = bkO['按揭'][payMent];
                        if(arrO && arrO.ajArr){

                        } else {
                            //之前选择的比例，在这里不存在
                            //比如先选 银行A  10%
                            //再切换到银行B   此时银行B没有 10%的首付比例
                            payMent = bkO['首付比例'][0];
                            this.payMent = payMent;
                            arrO = bkO['按揭'][payMent];
                        }
                            this.serviceFee = arrO.serviceFee;

                            this.regulationText = bkO.regulationText; //要求
                            this.payMent = payMent;
                            arr = arrO.ajArr;
                            O = arr[0];
                            for (var i = 0; i < arr.length; i++) {
                                if(arr[i].isDefault){
                                    O = arr[i];
                                }
                            };
                            this.anJieTxt = O.productDescription;
                            this.chooseProductDescription = O.productDescription;
                            this.financeProductSysNo = O.financeProductSysNo || O.productSysId;
                            //0：利息支付方式：首期一次性支付  1：利息支付方式：按月支付(月供含利息)
                            this.interestRateType =  O.interestRateType==0?'利息支付方式：首期一次性支付':'利息支付方式：按月支付(月供含利息)';
                            return arr;
                    }
                }catch(e){
                    YMC.log('anjieList----error'+e);
                    return [];
                }
                return [];
            },
            payInfo:function(){
                if( !this.onePay && !this.bankName){
                    return '贷款';
                }
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

                //重置
                _this.isFree = false;
                _this.carPrice     = 0;     //裸车价
                _this.step1        = true;
                _this.step2        = false;
                _this.showBankInfo = false; // 显示银行详情

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
                    error:function(){
                        VUI.alert('网络连接失败,请稍后再试!');
                    },
                    success: function(res){
                        //测试
                        //var res = {"success":true,"result":{"carPirce":181800.00,"list":[{"companyName":"南京银行","financeCompanySysNo":4,"displayOrder":1,"isDefault":true,"products":[{"financeProductSysNo":1675,"productSysId":1675,"downPaymentRate":0.0000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":true},{"financeProductSysNo":1676,"productSysId":1676,"downPaymentRate":0.0000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1677,"productSysId":1677,"downPaymentRate":0.0000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1678,"productSysId":1678,"downPaymentRate":0.0000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1679,"productSysId":1679,"downPaymentRate":0.1000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1680,"productSysId":1680,"downPaymentRate":0.1000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1681,"productSysId":1681,"downPaymentRate":0.1000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1682,"productSysId":1682,"downPaymentRate":0.1000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1683,"productSysId":1683,"downPaymentRate":0.2000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1684,"productSysId":1684,"downPaymentRate":0.2000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1685,"productSysId":1685,"downPaymentRate":0.2000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1686,"productSysId":1686,"downPaymentRate":0.2000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1687,"productSysId":1687,"downPaymentRate":0.3000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1688,"productSysId":1688,"downPaymentRate":0.3000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1689,"productSysId":1689,"downPaymentRate":0.3000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1690,"productSysId":1690,"downPaymentRate":0.3000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1691,"productSysId":1691,"downPaymentRate":0.4000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1692,"productSysId":1692,"downPaymentRate":0.4000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1693,"productSysId":1693,"downPaymentRate":0.4000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1694,"productSysId":1694,"downPaymentRate":0.4000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1695,"productSysId":1695,"downPaymentRate":0.5000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1696,"productSysId":1696,"downPaymentRate":0.5000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1697,"productSysId":1697,"downPaymentRate":0.5000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1698,"productSysId":1698,"downPaymentRate":0.5000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1699,"productSysId":1699,"downPaymentRate":0.6000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1700,"productSysId":1700,"downPaymentRate":0.6000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1701,"productSysId":1701,"downPaymentRate":0.6000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1702,"productSysId":1702,"downPaymentRate":0.6000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1703,"productSysId":1703,"downPaymentRate":0.7000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1704,"productSysId":1704,"downPaymentRate":0.7000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1705,"productSysId":1705,"downPaymentRate":0.7000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1706,"productSysId":1706,"downPaymentRate":0.7000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false},{"financeProductSysNo":1707,"productSysId":1707,"downPaymentRate":0.8000,"loanTerm":12,"interestRate":0.0450,"productDescription":"一年4.5%","isDefault":false},{"financeProductSysNo":1708,"productSysId":1708,"downPaymentRate":0.8000,"loanTerm":24,"interestRate":0.0980,"productDescription":"两年9.8%","isDefault":false},{"financeProductSysNo":1709,"productSysId":1709,"downPaymentRate":0.8000,"loanTerm":36,"interestRate":0.1470,"productDescription":"三年14.7%","isDefault":false},{"financeProductSysNo":1710,"productSysId":1710,"downPaymentRate":0.8000,"loanTerm":48,"interestRate":0.1980,"productDescription":"四年19.8%","isDefault":false}],"description":"<div class=\"bankinfo\">\n<p>1、年龄18至60周岁之间（包括贷款年限在内），在本市有固定住所，稳定、合法的职业和收入来源的客户。</p>\n<p>2、在本市常住，有稳定工作，税后月收入达4000元，社保满1年，即可准入。</p>\n<p>3、私营业主，营业执照需满3年，在本市有房产且已婚。</p>\n<p>4、零首付，额度高，最高额度可达30万，最长可分48期还款。</p>\n<p>5、一年费用收取的百分比如上所示，且该费用为分期收取；另上面展示的费用百分比为最优百分比，具体费用根据客户实际情况确定。</p>\n<p>6、具有良好的信用记录和还款意愿，负债低。</p>\n<p>7、无抵押、无担保，不限车牌，不强制保险。</p>\n</div>","logoUrl":"http://image.yaomaiche.com/mkt/Original/2015/0717/0752ef09-3481-4311-93bd-d328af223328.jpg","logoPath":"http://image.yaomaiche.com/mkt/Original/2015/0717/0752ef09-3481-4311-93bd-d328af223328.jpg"},{"companyName":"浦发银行","financeCompanySysNo":7,"displayOrder":2,"isDefault":false,"products":[{"financeProductSysNo":949,"productSysId":949,"downPaymentRate":0.3000,"loanTerm":12,"interestRate":0.0550,"productDescription":"1年5.5%","isDefault":false},{"financeProductSysNo":950,"productSysId":950,"downPaymentRate":0.3000,"loanTerm":24,"interestRate":0.1100,"productDescription":"2年11%","isDefault":false},{"financeProductSysNo":951,"productSysId":951,"downPaymentRate":0.3000,"loanTerm":36,"interestRate":0.1650,"productDescription":"3年16.5%","isDefault":false},{"financeProductSysNo":952,"productSysId":952,"downPaymentRate":0.4000,"loanTerm":12,"interestRate":0.0550,"productDescription":"1年5.5%","isDefault":false},{"financeProductSysNo":953,"productSysId":953,"downPaymentRate":0.4000,"loanTerm":24,"interestRate":0.1100,"productDescription":"2年11%","isDefault":false},{"financeProductSysNo":954,"productSysId":954,"downPaymentRate":0.4000,"loanTerm":36,"interestRate":0.1650,"productDescription":"3年16.5%","isDefault":false},{"financeProductSysNo":955,"productSysId":955,"downPaymentRate":0.5000,"loanTerm":12,"interestRate":0.0550,"productDescription":"1年5.5%","isDefault":false},{"financeProductSysNo":956,"productSysId":956,"downPaymentRate":0.5000,"loanTerm":24,"interestRate":0.1100,"productDescription":"2年11%","isDefault":false},{"financeProductSysNo":957,"productSysId":957,"downPaymentRate":0.5000,"loanTerm":36,"interestRate":0.1650,"productDescription":"3年16.5%","isDefault":false},{"financeProductSysNo":958,"productSysId":958,"downPaymentRate":0.6000,"loanTerm":12,"interestRate":0.0550,"productDescription":"1年5.5%","isDefault":false},{"financeProductSysNo":959,"productSysId":959,"downPaymentRate":0.6000,"loanTerm":24,"interestRate":0.1100,"productDescription":"2年11%","isDefault":false},{"financeProductSysNo":960,"productSysId":960,"downPaymentRate":0.6000,"loanTerm":36,"interestRate":0.1650,"productDescription":"3年16.5%","isDefault":false},{"financeProductSysNo":961,"productSysId":961,"downPaymentRate":0.7000,"loanTerm":12,"interestRate":0.0550,"productDescription":"1年5.5%","isDefault":false},{"financeProductSysNo":962,"productSysId":962,"downPaymentRate":0.7000,"loanTerm":24,"interestRate":0.1100,"productDescription":"2年11%","isDefault":false},{"financeProductSysNo":963,"productSysId":963,"downPaymentRate":0.7000,"loanTerm":36,"interestRate":0.1650,"productDescription":"3年16.5%","isDefault":false},{"financeProductSysNo":964,"productSysId":964,"downPaymentRate":0.8000,"loanTerm":12,"interestRate":0.0550,"productDescription":"1年5.5%","isDefault":false},{"financeProductSysNo":965,"productSysId":965,"downPaymentRate":0.8000,"loanTerm":24,"interestRate":0.1100,"productDescription":"2年11%","isDefault":false},{"financeProductSysNo":966,"productSysId":966,"downPaymentRate":0.8000,"loanTerm":36,"interestRate":0.1650,"productDescription":"3年16.5%","isDefault":false}],"description":"<div class=\"bankinfo\">\n<p>1、年龄18至60周岁之间，具有中国国籍的自然人，具有良好的信用记录和还款意愿。</p>\n<p>2、在本市拥有本人名下房产，或有合法稳定的收入、银行工资流水税后4500元以上、连续缴纳社保两年以上且有按期还款的能力。</p>\n<p>3、首付比例20%起，购车分期信用额度最高可达34.9万，最长分36期还款。贷款金额35万及以上的，需办理抵押，贷款比例最高达70%。</p>\n<p>4、手续费分期收取，高效便捷。</p>\n<p>5、提供关系证明，可以上直系亲属的牌照。</p>\n<p>6、银行要求客户首年购买交通强制险、盗抢险、车损险、第三者责任险（至少20万），保险受益人为浦发银行北京分行。</p>\n</div>","logoUrl":"http://image.yaomaiche.com/mkt/Original/2015/0810/78db197a-4bc3-432c-bc0f-1eee012ea29d.png","logoPath":"http://image.yaomaiche.com/mkt/Original/2015/0810/78db197a-4bc3-432c-bc0f-1eee012ea29d.png"}]},"error":null,"unAuthorizedRequest":false};
                        if( res.success == false ){
                            VUI.alert( res.error.message );
                            return;
                        }
                        _this.isFinancialLeasing = res.result.isFinancialLeasing || false; // 是否超级贷
                        _this.codeMsg = res.result.list;
                        _this.carPrice = res.result.carPirce;
                        _this.minDownPaymentProduct = res.result.minDownPaymentProduct || {};
                        _this.carName = res.result.carName;
                        _this.downPayment = res.result.downPayment;
                        _this.isFree = res.result.isFree;
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
                        setTimeout(function(){
                            _this.showBottom = true;
                        },1000);
                        transition.next();
                        setTimeout(function(){
                            _this.btmEnable = true;
                        },1000);
                    }
                });
            },
            deactivate:function(transition){
                this.showBottom = false;
                transition.next();
            }
        },
        methods:{
            hideBackDes:function(){
                this.step1 = false;
                this.step2 = true;
                this.showBankInfo = false;
            },
            showBankDes:function(){
                this.step1 = this.step2 = false;
                this.showBankInfo = true;
            },
            step2Back:function(){
                this.step1 = true;
                this.step2 = false;
            },
            chooseBank:function(companyName){
                this.step2 = true;
                this.step1 = false;
                this.bankName = companyName;
                //修改头部
                router.app.$dispatch('updateTitle',companyName);
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
                        LOAN[bkName].regulationText = arr[i].regulationText;
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
                        products[j].txt = ( products[j].loanTerm )+ '期' + ( Math.round(products[j].interestRate * 100) )+'%';
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
                            aj[sfVal].serviceFee = products[j].serviceFeeAmt;//carPrice * (1 - (sfVal / 100)) * (2 / 100);
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
                //如果是默认全款，然后点击了贷款，此时按钮灰掉。
                if(_this.disableSubmit){
                    return;
                }
                var loanInfo = {
                        "bank" : this.bankName,
                        "payType": this.onePay ? "全款":"贷款购买" ,
                        "financeProductSysNo": this.financeProductSysNo,
                        "shoppingCartID": this.id
                    };

                //router.go({name:'myBuyCar'});
                YMC.ajax({
                    url: _this.subAjaxUrl,
                    data:loanInfo,
                    showLoading:true,
                    success:function(res){
                        res.success = true;
                        if( res.success ){
                            router.go({name:'myBuyCar'});
                        } else {
                            VUI.alert('提交失败，请稍后重试！');
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
            log:function(o){
                if(YMC.debug){
                    console.log(JSON.parse(JSON.stringify(o)));
                }
            }
        }
    }
</script>
<style>
.step1,
.step2{
    padding-bottom: 50px;
    background:#fff;
    position:relative;
}
.step2{

}
.step1 .hd{
    width:100%;
    background:#2a2d33;
    font-size:14px;
    color:#393939;
    border-bottom: 1px solid #d0d0d0;
}
.step1 .hd .page{
    position: relative;
    height: 50px;
    line-height: 50px;
    font-weight: normal;
    font-size: 18px;
    text-align: center;
    }
.step1 .hd  .page h1{
    display: block;
    margin: 0 50px;
    white-space: nowrap;       /*不换行*/
    text-overflow:ellipsis;    /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    overflow: hidden;        /*当内容超出宽度时自动隐藏*/
    font-weight: 400;
    font-size: 18px;
    color:#ffffff;
    }
.step1 .arrow-left{
    display: block;
    width: 50px;
    height: 100%;
    position: absolute;
    text-align: center;
    left: 0;
    top: 0;
}

.step1 .arrow-left:before {
    display: block;
    width: 14px;
    height: 14px;
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    position: absolute;
    top: 18px;
    left: 20px;
    content:' ';
    transform: rotateZ(-45deg);
    -webkit-transform: rotateZ(-45deg);
}
/*.step1 .arrow-left:after {
    content: "";
    position: absolute;
    border: 1px solid #fff;
    width: 13px;
    height: 11px;
    top: 19px;
    left: 24px;
    border-left: 0;
    z-index: -1;
}*/
.step1 .icon{
    display: inline-block;
    background:url("../imgs/pres.png") no-repeat;
    background-size: 200px auto;
}
.step1 .i1{
    width:22px;
    height:22px;
    background-position: 0 -19px;
    position:absolute;
    top:50%;
    left:12px;
    margin-top:-11px;
}
.step1 .price-box p{
    float: left;
    font-size: 16px;
}
.step1 .price-box span{
    float: right;
    font-size: 12px;
}
.step1 .price-box .text1{
    font-size: 15px;
    color:#fe8504;
}
.step1 .price-box{
    position:relative;
    padding:14px 12px 12px 45px;
    line-height:22px;
    border-bottom:1px solid #e4e4e4;
}
.step1 .price-box:after{
    content:"";
    display:table;
    height:0;
    clear:both;
}
.step1 .i2{
    width:22px;
    height:22px;
    background-position:0 -42px;
    position:absolute;
    top:50%;
    left:12px;
    margin-top:-11px;
}
.step1 .content{
    box-sizing:border-box;
    background-color:#fff;
    width:100%;
}
.step1 .test img{
    float: left;
    margin-left: 10px;
    width: 60px;
    height: 60px;
}
.step1 .men{
    float: left;
    padding-left: 20px;
    line-height: 20px;
}
.step1 .men h2{
    font-size: 14px;
}
.step1 .men span{
    font-size: 11px;
}
.step1 .men em{
    color:#d83950;
}
.step1 .test{
    padding-top: 17px;
    position: relative;
    border-bottom:1px solid #e4e4e4;
    padding-bottom: 15px;
}
.step1 .test .p1 span{
    border:1px solid #ccc;
    margin-right: 10px;
    line-height: 35px;
    padding:4px 11px;
    border-radius: 3px;
    color:#666;
    font-size: 10px;
}
.step1 .i3{
    width:10px;
    height:17px;
    background-position: 0 -65px;
    position: absolute;
    top: 50%;
    right: 14px;
}
.step1 .p2{
    font-size: 12px;
    color:#feaf75;
    padding-top: 23px;
    padding: 7px;
}
.step1 .co{
    position:relative;
    margin:5px 14px;
    background:#f4f4f4;
    font-size: 14px;
    color:#999;
    border-radius:3px;
}
.step1 .co:before{
    content:"";
    position:absolute;
    left:50px;
    top:0;
    margin-top:-16px;
    width:0;
    height:0;
    overflow:hidden;
    border-width:8px 12px;
    border-style:solid;
    border-color:transparent transparent #f4f4f4 #f4f4f4;
}
.step1 .co-inner{
    padding:8.5%;
}
.step1 .braed th{
    padding:10px 5px;
    background:#e4e4e4;
    font-weight:normal;
}
.step1 .braed{
    padding-top: 15px;
}
.step1 .braed td{
    background-color: #ffffff;
    text-align:center;
    padding:10px 5px;
}
.step1 .braed td.last{
    border-right:0 none;
}
.step1 .fax{
    padding-top: 15px;
}
.step1 .fax p{
    text-align: left;
}
.step1 .fax .mt{
    color:#d83950;
}
.step1 .fax .mt1,.fax .mt2{
    color:#fe8504;
}
.step1 .jiaxin{
    color:#fdc400;
    font-size: 15px;
}
.step1 .braed .matn{
    background: #f7cf15;
}
.step1 .loan-financial p {
    padding-left:10px;
    margin:5px 0;
}

.step2 .icon{
    display: inline-block;
    background:url("../imgs/pres.png") no-repeat;
    background-size: 200px auto;
}
.step2 .price-box h2{
    float: left;
    font-size: 17px;
    font-weight: normal;
}
.step2 .price-box span{
    float: right;
    font-size: 17px;
    color:#d83950;
}
.step2 .price-box{
    position:relative;
    padding:12px 12px 12px 13px;
    line-height:22px;
    background-color:#f4f4f4;
}
.step2 .price-box.price-box-1{
    padding-top: 92px;
}
.step2 .price-box:after{
    content:"";
    display:table;
    height:0;
    clear:both;
}
.step2 .content{
    box-sizing:border-box;
    background-color:#fff;
    width:100%;
}
.step.tail{
    /*position: absolute;*/
    position: fixed;
    z-index:1000;
    left: 0;
    right: 0;
    background-color: #e4e4e4;
    bottom: 0;
    width: 100%;
}
.step.tail .span1{
    font-size: 16px;
    color:#fe8504;
    background-color:#e4e4e4;
    text-align: center;
    height: 50px;
    line-height: 50px;
    padding-left: 8px;
}
.step.tail .span2.disable{
    background-color: #D0D0D0;
    color: rgb(95, 95, 95);
}
.step.tail .span2{
    font-size: 16px;
    float: right;
    color: #725d00;
    background-color: #f7cf15;
    width: 35%;
    height: 50px;
    line-height: 50px;
    text-align: center;
}
.step2 .ctn.mat .div1{
    font-size: 22px;
    border-bottom: 1px dashed #fff;
    color: #fff;
}

.step2 .itm li{
    float:left;
    width:33.3%;
    margin-top:26px;
}
.step2 .ctn{
    background-color:#fff;
    padding-left: 10px;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-right: 10px;
    text-align: center;
    width:55px;
    height:43px;
    border: 1px solid #ff8400;
    margin: 0 auto;
    border-radius: 3px;
}
.step2 .ctn p{
    font-size: 10px;
    color:#fe8504;
}
.step2 .div1{
    border-bottom:1px dotted #ff8400;
    font-size: 22px;
    line-height: 24px;
    color:#999999;
}
.step2 .i7{
    width: 22px;
    height: 22px;
    background-position: 0 -42px;
    position: absolute;
    left: 12px;
    top: 50%;
    margin-top: -11px;
}
.step2 .i8{
    width: 22px;
    height: 22px;
    background-position: 0 -19px;
    position: absolute;
    top: 50%;
    left: 12px;
    margin-top: -11px;
}
.step2 .mat{
    background-color:#fe8504;
    border: 1px solid #fe8504;
}
.step2 .mat p{
    color:#fff;
}
.step2 .pr{
    margin-top: 25px;
}
.step2 .ist{
    position: relative;
    line-height: 22px;
}
.step2 .tem{
    padding: 15px 15px 15px 0;
    /*padding: 12px 12px 12px 0;*/
    margin-left: 50px;
    border-bottom: 1px solid #e4e4e4;
}
.step2 .tem p{
    font-size: 14px;
    color:#333333;
}
.step2 .tem span{
    font-size: 13px;
    color:#999999;
}
.step2 .tem .span1{
    font-size: 10px;
}

.step2 .tem .tem-info{
    position: absolute;
    right: 10px;
    top: 16px;
    width:180px;
}
.step2 .p2{
    font-size: 12px;
    color:#999999;
    text-align: right;
    padding-top: 15px;
    padding-right: 13px;
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 15px;
}
.step2 .price{
    padding: 15px 12px 15px 13px;
    line-height: 22px;
    border-bottom: 1px solid #e4e4e4;
}
.step2 .price p{
    float: left;
    font-size: 14px;
}
.step2 .price span{
    float: right;
    font-size: 14px;
    color:#999999;
}
.step2 .ments{
    border:0 none;
}
.step2 .xian{
    text-decoration:line-through;
}
.step2 .char{
    text-align: left;
    line-height: 23px;
    padding:13px 13px 50px 13px;
}
.step2 .char li{
    font-size: 14px;
    color:#999999;
}


.step2 .test img{
    float: left;
    width: 60px;
    height: 60px;
}
.step2 .men{
    float: left;
    padding-left: 15px;
    line-height: 20px
}
.step2 .men h2{
    font-size: 14px;
    color: #ffffff;
}
.step2 .men span{
    font-size: 11px;
    color:#999999;
}
.step2 .men em{
    color:#d83950;
}
.step2 .test{
   margin-left: 50px;
   position: relative;
   text-align: left;
}
.step2 .test .p1 span{
    border: 1px solid #ccc;
    margin-right: 10px;
    padding-left: 6px;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-right: 6px;
    border-radius: 3px;
}
.loan-steps.step2 .mas{
    z-index: 999;
    position: fixed;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #2a2d33;
}
.step2 .mas .test{
    text-align: center;
    margin-left:0;
}

.step2 .mas{
    height:50px;
    color:#fff;
    line-height: 50px;
    font-size: 18px;
    font-weight:normal;
    background-color: #2a2d33;
    position: relative;
}

.step2 .mas .page{

    position: relative;
    height: 50px;
    font-weight: normal;
    }
.step2 .arrow-left{
    display: block;
    width: 50px;
    height: 100%;
    position: absolute;
    text-align: center;
    left: 0;
    top: 0;
}

.step2 .arrow-left:before {
    display: block;
    width: 14px;
    height: 14px;
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    position: absolute;
    top: 50%;
    left: 20px;
    content:' ';
    transform: rotateZ(-45deg);
    -webkit-transform: rotateZ(-45deg);
    margin-top: -7px;
}
.step2 .i10{
    width: 20px;
    height: 21px;
    background-position: 0 -98px;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -10px;
    padding-right: 13px;
}
.step2 .cof{
    line-height: 20px;
}
.step2 .small{
    width: 50px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
}

.step2 .bankinfo p{
    float: none;
}
.step2 .bankinfo span{
    float:none;
}

.step2 .change-bank{
    color: #EACD45;
    font-size: 15px;
    position: fixed;
    right: 0px;
    padding-right: 10px;
    top: 0px;
    z-index: 999;
    height: 50px;
    line-height: 50px;
}

@media screen and (max-width: 374px){
    .step2 .tem .span1{
        display:block;
    }
    .step1 .p2{
        padding-right:0px;
    }
    .step2 .test img{
        width:55px;
        height:55px;
    }
    .step2 .tem span{
        font-size:12px;
    }
    .step.tail .span1{
        font-size:14px;
    }
    .step1 .men{
        padding-left:5px;
    }
    .step.tail .span2{
        font-size:15px;
        width: 33%;
    }
}

</style>