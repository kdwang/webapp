<template>
	<div class="vcar"  :class="{'vcar_fixed':step2}">
<div class="insurance_step1" style="display:none" v-show="step1">
    <div class="content">
    <!-- <div class="div">
    受金融机构及政策波动等客观因素部分数据会及时更新
    <i class="icon i1"></i>
    </div> -->
    <ul>
        <li @click="render(item)" ubt="companySysNo_{{item.insuranceCompanySysNo}}" gsq="companySysNo_{{item.insuranceCompanySysNo}}" class="test clearfix" v-for="item in ajaxRes">
            <img :src="item.logoPath" alt="{{item.fullName}}" >
            <div class="men">
                <h2 v-text="item.fullName"></h2>
                <p class="ct" v-text="item.memo"></p>
                <!-- <small>--免费拖车服务，2000元以下快速理赔</small> -->
                <p class="p1">
                    <span class="ins-label" v-if="item.isOffsitePurchase">跨区特惠</span>
                    <span class="ins-label" v-if="item.isPromotion">买就送</span>
                    <span v-for="iitem in item.tagList" v-show="iitem" v-text="iitem"></span>
                    <!-- <span>--0利率</span><span>--无保险要求</span><span>--无抵押</span> -->
                </p>
            </div>
            <i class="icon i3"></i>
        </li>
    </ul>
    </div>
</div>


<div class="insurance_step2" id="insurance_step2" style="display:none;" v-show="step2">


    <div class="hd" v-if="hdEnable">
        <h1 class="pagetitle">
            <span v-text="chooseComp.briefName"></span>
            <div class="change-ins" @click="step2Back">更换保险公司</div>
            <a ubt="goback" @click.stop.prevent="appNormalGoBack" class="ico1 ico_arrow-left nav-left">back</a>
        </h1>
        <!-- <a href="###" @click.stop.prevent = "step2Back" class="hd-multi-col hd-aside hd-aside-left"><i class=" ico-hd-1"></i></a> -->
        <!-- <div class="change-ins" @click="step2Back">更换保险公司</div> -->
        <!-- <div class="hd-main hd-multi-col"> -->
            <!-- <img :src="chooseComp.logoPath" class="hd-logo" alt="chooseComp.fullName"> -->
            <!-- <div class="hd-info"> -->
                <!-- <h2 class="ins-comp" v-text="chooseComp.fullName"></h2> -->
                <!-- 如果要简称使用 chooseComp.briefName -->
                <!-- <p class="ins-fe" v-text="chooseComp.memo"></p> -->
                <!-- 快、易、免；服务多 -->
                <!-- <p class="ins-fe">--免费拖车服务，2000元以下快速理赔</p> -->
            <!-- </div> -->
            <!-- <span class="hd-main-ins" v-text="chooseComp.briefName"></span> -->
        <!-- </div> -->
        <!-- <a href="###" @click.stop.prevent="showInsDescription" class="hd-multi-col hd-aside hd-aside-right"><i class="ico-hd ico-hd-2" gsq="保险公司详情"></i></a> -->
    </div>


    <div class="mainautow mainhd mainbtm mainhd-bg mainbtm-bg">
        <div class="main_cnt">
                                            <!--长度超过1的时候是超级贷的情况，不显示头-->
            <ul class="clearfix tab" v-if="navList.length>1">
            <!-- <li v-for="item in navList" :class="{'ui_tab-on':$index==navIndex}" @click="chooseTab($index)" data-txt="{{item.name}}" class="">{{item.name}}</li> -->

                <li v-for="item in navList" :class="{'active':$index==navIndex}" @click="chooseTab($index)" data-txt="{{item.name}}">
                    <div class="ins-name">{{item.name}}</div>
                    <div class="cfe6863">¥{{$index | countItemAmount | priceInt}}</div>
                </li>

                <!-- <li>
                    <div class="ins-name">“菜鸟”装备</div>
                    <div class="cfe6863">12345.00元</div>
                </li> -->

            </ul>

            <div class="box"  v-for="item in renderInsData" v-show="$index==navIndex">
                <div class="ins-feature">
                    <p v-text="item.des"><!-- 中低度保障，对自己的爱车有保障，大部分的交通事故赔偿无忧。 --></p>
                    <p class="txt-lab-wrap">
                        <span v-for="iitem in item.tagList" class="txt-lab" v-text="iitem"></span>
                        <!-- <span class="txt-lab">新手</span>
                        <span class="txt-lab">基础</span>
                        <span class="txt-lab">安全防护</span>
                        <span class="txt-lab">暑期必备</span> -->
                    </p>
                </div>
                <ul class="ins-title clearfix"  :class="{'fixed':fixednav}">
                    <li class="ins-title-col1">险种</li>
                    <li class="ins-title-col2">购买指数</li>
                    <li class="ins-title-col3">额度</li>
                    <li class="ins-title-col4">金额</li>
                    <li class="ins-title-col5">&nbsp;</li>
                </ul>

                <div :class="{'pt39':fixednav}" class="ins-tlt">商业险<span class="ins-disc" v-show="!(zhekouVal==0||zhekouVal==10)"  style="color:#d83950">{{zhekouVal}}折</span></div>

                <!-- radio样式 选中：.ins-item-on -->
                <ul v-for="iitem in item.data" @click.stop="iitemClick(iitem)" isbuysdew="{{iitem.isBuySDEW}}" sysno="{{iitem.sysNo}}"
                isdefault="{{iitem.isDefault}}"
                :class="{
                'ins-item-on':!iitem.isForced && iitem.isDefault ,
                'ins-item-disabled':!iitem.showRadio || iitem.isForced && iitem.isDefault}"
                class="ins-cnt ins-cnt-more clearfix">
                    <li class="ins-cnt-col0"  isforced="{{iitem.isForced}}" @click.stop="iitemRadioClick(iitem)">
                        <!-- <i @click.stop="iitemRadioClick(iitem)" v-show="iitem.showRadio" class="ico-ins ico-ins-1"></i> -->
                        <i @click.stop="iitemRadioClick(iitem)" gsq="{{iitem.fullName}}"  class="ico-ins ico-ins-1"></i>
                    </li>
                    <li class="ins-cnt-col1">
                        {{iitem.fullName}}
                        <div ubt="switch_2" gsq="不计免赔" @click.stop="iitemSwitchClick(iitem)" v-show="iitem.vueSdewAmount" :class="{'switch_box-on':!iitem.itemDisable && iitem.isBuySDEW,'switch_box-on1':iitem.isForced || iitem.itemDisable}" class="ins-cnt-opt switch_box">
                            <div class="switch_scroll"></div>不计免赔
                        </div>
                    </li>
                    <!-- ((0.75*100/5)==parseInt(0.75*100/5))?(parseInt(0.75*100/5)-1):parseInt(0.75*100/5) 14*15=210px -->
                    <li class="ins-cnt-col2"><span v-if="iitem.purchaseIndex"><i class="ico-pie" v-svgpos="iitem.purchaseIndex"></i>{{iitem.purchaseIndex*100}}%</span></li>
                    <li class="ins-cnt-col3">{{iitem.levelDes || iitem.level}}</li>
                    <li class="ins-cnt-col4"><span :class="{'cor_gray':!iitem.isDefault}" >¥{{iitem.vueAmount | priceInt}}</span><p v-show="iitem.vueSdewAmount" class="ins-cnt-opt "  :class="{'cor_gray':!iitem.isBuySDEW}"  >¥{{iitem.vueSdewAmount | priceInt}}</p></li>

                    <li class="ins-cnt-col5">
                    <!--
                    <li class="ins-cnt-col5" @click.stop="iitemAreaClick(iitem)">
                    -->
                        <i class="ico-ins ico-ins-2" :class="{'no_sdew_amount':!iitem.vueSdewAmount}"></i>
                    </li>
                    <div class="ins-pop-wrap" style="display:none" v-show="iitem.vueShowItemInfo">
                        <div class="ins-pop">
                            <div class="ins-tlt">{{iitem.fullName}}</div>
                            <ul class="tab clearfix">
                                <!-- <li class="opt-on">
                                    <div>
                                        <h4 class="ins-quota">10万</h4>
                                        <p class="ins-price">¥89,000</p>
                                    </div>
                                </li>
                                <li >
                                    <div>
                                        <h4 class="ins-quota">100万</h4>
                                        <p class="ins-price">¥1,089,000</p>
                                    </div>
                                </li> -->
                                <template v-if="iitem.premiumInfo && iitem.premiumInfo.premium && iitem.premiumInfo.premium.length > 0 && iitem.premiumInfo.premium[0].description">
                                    <li v-for="iiitem in iitem.premiumInfo.premium" @click.stop.prevent="iiitemClick(iitem,iiitem)" :class="{'opt-on' : iitem.level==iiitem.level || iitem.level==iiitem.description,'cor_gray':iitem.itemDisable  && (iitem.level!=iiitem.level && iitem.level!=iiitem.description)}">
                                        <div>

                                            <h4 class="ins-quota">{{iiitem.description || iiitem.level}}</h4>
                                            <p class="ins-price">¥
                                            <template v-if="iitem.isBuySDEW">
                                                {{ (iiitem.sdewAmount+iiitem.amount) | priceInt }}
                                            </template>
                                            <template v-else>
                                                {{ iiitem.amount | priceInt }}
                                            </template>
                                            </p>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                            <p class="ins-note">{{{iitem.description}}}</p>
                        </div>
                    </div>
                </ul>
                <div v-show="showAddins" class="ins-cnt ins-cnt-nec ins-item-on ">
                        <div class="addins" @click.stop.prevent="change" >追加险种</div>
                </div>
                <div class="ins-tlt">强制险(国家强制险种)</div>
                <ul class="ins-cnt ins-cnt-nec ins-item-on clearfix">
                    <li class="ins-cnt-col1">交强险<span class="cor_gray" v-if="item.seats">({{item.seats}}座)</span></li>
                    <li class="ins-cnt-col2">&nbsp;</li>
                    <li class="ins-cnt-col3">&nbsp;</li>
                    <li class="ins-cnt-col4">¥{{jqx | priceInt}}</li>
                    <li class="ins-cnt-col5">&nbsp;</li>
                </ul>
                <div class="ins-tlt">税费(国家税费、代收代缴)</div>
                <ul class="ins-cnt ins-cnt-nec ins-item-on clearfix">
                    <li class="ins-cnt-col1">车船税<span class="cor_gray" v-if="item.seats"><!--车船税没有座--></span></li>
                    <li class="ins-cnt-col2">&nbsp;</li>
                    <li class="ins-cnt-col3">&nbsp;</li>
                    <li class="ins-cnt-col4">¥{{ccs | priceInt}}</li>
                    <li class="ins-cnt-col5">&nbsp;</li>
                </ul>
                <div class="ins-tlt show-ins-des" @click.stop.prevent="showInsDescription">保险公司详情

                <i class="show-ins-des-icon"></i>

                </div>
                <div class="ins-note">
                    <p>1. 此保费为按照费率表预估，最终保费以保单为准。</p>
                    <p>2. 车贷用户如因金融机构要求需增加车辆商业保险期限，可在线下交付中心办理时追加购买。</p>
                    <p>3. 车船税减免政策，以当地政府公示为准。</p>
                </div>
            </div>
        </div>



        <!-- 两种模式 -->
        <!-- 选择项目模式 -->
        <template v-if="chooseType == 'detail' ">
            <div class="fixbtm abs_size clearfix" style="z-index:1001;">
                <div ubt="hideChooseTypeDetail" gsq="保险确认" class="btn_save" @click="hideChooseTypeDetail">确认</div>
                <p class="accessory_sum accessory_sum-left">金额：<span class="price">¥{{chooseTypePrice|priceInt}}</span></p>
            </div>
        </template>

        <template v-if="chooseType == 'total' ">
            <div class="fixbtm abs_size clearfix" style="z-index:1001;">
                <div ubt="submitIns" gsq="保存保险方案" class="btn_save" @click="submitAjax">保存保险方案</div>
                <p class="accessory_sum accessory_sum-left">小计：<span class="price">¥{{totalPrice|priceInt}}</span></p>
            </div>
        </template>

    </div>
</div>

<div class="insurance_step1" style="display:none;" v-show="showInsDes">
    <div class="hd">
        <div class="page">
            <h1>{{chooseComp.fullName}}</h1>
            <a class="arrow-left" @click="hideInsDescription"></a>
        </div>
    </div>
    <div style="padding: 60px 5px;">
        {{{chooseComp.description}}}
    </div>
</div>

<!--弹出层详情-->
<div class="markdiv" style="display:none;" v-if="alertInfoHead" @click.stop="alertInfoHead=alertInfoBody=''"></div>
<div class="car-popup" style="display:none;" v-if="alertInfoHead" style="width: 80%; height: 300px;transform: translateX(-50%) translateY(-50%);">
    <h2 class="popup-tlt">{{alertInfoHead}}<span @click.stop="alertInfoHead=alertInfoBody=''" class="close">关闭</span></h2>
    <div class="content-body">
        {{{alertInfoBody}}}
    </div>
</div>
<!--弹出层-->
	</div>
</template>
<script>
module.exports = {
	data:function(){
		return {
            showAddins:false,
            fixednav:false, //悬浮nav条
            fixedNavTop:0,  //悬浮nav条的滚动条高度
            id                          : '',
            step1                       : true,
            step2                       : false,
            showInsDes                  : false,
            chooseComp                  : {},//选中的保险公司
            currentIItem                : {},//选中的条目，用于点击确认的时候隐藏底部
            ajaxUrl                     : 'Products/ShoppingCart/GetAvailableInsuranceCompanyList', // 数据请求地址
            submitUrl                   : 'Products/ShoppingCart/UpdateInsurance',               // 页面提交地址
            packageName                 : '', // 保险方案 右侧显示    ---------提交用到
            chooseInsuranceCompanySysNo : 0,  // 当前选择的保险公司的id  ---------提交用到
            details                     : [], // 当前选的保险列表状态 ---------提交用到
            jqx                         : 0,  // 交强险
            ccs                         : 0,  // 车船税
            companyName                 : '', // 保险公司名字 右侧显示
            ajaxRes                     : {}, // ajax请求后的数据
            bankSysNo                   : '', // 银行，提交的时候需要
            showInsDesc                 : '', // 保险公司的介绍  ---------用于点击保险公司右侧显示详情
            fullName                    : '', // 保险公司全称 ---------用于点击保险公司右侧显示详情的头部显示
            insuranceTypeList           : [], // 个性主张 所有方案的列表
            zhekouVal                   : '', // 商业险后面要显示折扣
            packageList                 : {}, // 保险的方案 比如 大众智选 全车无忧
            navList                     : [], // 保险套餐tab头
            navIndex                    : -1, // 选中那个保险套餐

            renderInsData               : [], // 渲染各个保险方案
            alertInfoHead               : '', // 弹出层头部
            alertInfoBody               : '', // 弹出层详情
            showComp                    : true,// 保险公司展开，收起
            showIns                     : true,// 保险方案展开收起
            totalPrice                  : 0,   // 最后支付总价

            /*
                选择具体保险明细的时候
                chooseType: 'detail'
                底部内容：
                            金额：      确认
                勾选 switch 和 radio的时候
                chooseType: 'total'
                底部内容：
                            小计:       保存车险方案
                之所以弄成字符串防止以后更多其他情况
            */
            // chooseType: 'total',
            chooseType: '',
            chooseTypePrice:0,   // 用于显示点击保险之后

            //原来页面所需的数据
            bankSysNo                   : -1, // 银行id
            clifmva                     : 0,  // 交强险
            vavt                        : 0,  // 车船税
            insuranceSysNo              : -1,  // 当前选择的 保险公司的id
            hdEnable                    : false  // 头部显示

        }
	},
    computed:{
            //用于显示追加险种
            showAddins:function(){
                if(this.navIndex==this.navList.length-1){
                    return false;
                }
                return true;
            }
        },
	filters:{
		//计算指定套餐的总价，用于在一开始就计算出价格，加到navTab中
        countItemAmount:function(index){
            var _this = this;
            var total = 0,o={};
            if(_this.renderInsData.length){
                var list = _this.renderInsData[index];
                for (var i = list.data.length - 1; i >= 0; i--) {
                    o = list.data[i];
                    //计算规则
                    // 如果有选中（isDefalut==true）那么就加上 vueAmount
                    // 如果不计免赔也选中(isBuySDEW==true)就加上 vueSdewAmount
                    if(o.isForced || o.isDefault){
                        total += o.vueAmount;
                        if(o.isBuySDEW){
                            total+=o.vueSdewAmount;
                        }
                    }
                };
                //最后支付的总价
                var totalPrice = total + _this.jqx + _this.ccs;

                return totalPrice;
            }
        }
	},
	//svg饼图
	directives:{
	    //<!-- ((0.75*100/5)==parseInt(0.75*100/5))?(parseInt(0.75*100/5)-1):parseInt(0.75*100/5) 14*15=210px -->
	    svgpos:function(n){
	        if(!n){
	            return;
	        }
	        n = n * 100 | 0 ;
	        n = n / 5;
	        var b = (n==parseInt(n))?(parseInt(n)-1):parseInt(n);
	        //return b * 15; //  background-position:0 -b*15px
	        this.el.style.backgroundPosition = "0 -" + (b*15) + 'px';
	    },
	},
	route:{
		data:function(transition){
			var _this = this;
			_this.id = _this.$route.query.id;
			//重置
		    _this.step1      = true;
            _this.step2      = false;
            _this.showInsDes = false;
			if(!_this.id){
				VUI.alert('编号获取失败',1000,function(){
					router.go({ name: 'home'});
				});
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
					if(res.success == true){
                        var defaultO = {};
                        //测试 超级贷
                        //res =  {"success": true, "result": [{"sysId": 3, "insuranceCompanySysNo": 3, "fullName": "中国人民财产保险股份有限公司", "briefName": "人保", "isOffsitePurchase": true, "logoPath": "http://image.yaomaiche.com/mkt/Original/2015/0702/9ddd4e1f-c226-4145-bc21-d365651735ba.jpg", "priority": 1, "description": "<div class=\"text\"><p style=\"text-indent:2em;\">中国人民财产保险股份有限公司（PICC P&amp;amp;amp;amp;amp;amp;amp;C，简称&amp;amp;amp;amp;amp;amp;ldquo;中国人保&amp;amp;amp;amp;amp;amp;rdquo;，下同）是经国务院同意、中国保监会批准，于2003年7月由中国人民保险集团公司发起设立的、亚洲最大的财产保险公司，注册资本122.5598亿元。其前身是1949年10月20日经中国人民银行报政务院财经委员会批准成立的中国人民保险公司。世界500强企业。</p><p style=\"text-indent:2em;\">中国人保财险是中国人民保险集团公司（PICC）旗下标志性主业，在国内外同业市场享有卓著声誉。2003年11月6日，公司在香港联交所成功挂牌上市，成为中国内地大型国有金融企业海外上市&amp;amp;amp;amp;amp;amp;ldquo;第一股&amp;amp;amp;amp;amp;amp;rdquo;。</p><p style=\"text-indent:2em;\">凭借综合实力，中国人保财险相继成为北京2008年奥运会、2010年上海世博会保险合作伙伴，为北京奥运会、上海世博会提供全面的保险保障服务。</p><p style=\"text-indent:2em;\">客服电话：95518</p><p style=\"text-indent:2em;\">勘察时效：</p><p style=\"text-indent:4em;\">7*24小时全国通赔、专享电子查勘理赔。</p><p style=\"text-indent:2em;\">定损时效：</p><p style=\"text-indent:4em;\">估损金额在人民币3000元（含）以下的，在接到报案后1个工作日内定损。</p><p style=\"text-indent:4em;\">估损金额超过人民币3000元以上的，3个工作日内定损。</p><p style=\"text-indent:2em;\">赔付时效：</p><p style=\"text-indent:4em;\">人民币1万元以下，1个工作日。</p><p style=\"text-indent:4em;\">人民币1万-3万元，3个工作日。</p><p style=\"text-indent:4em;\">人民币3万-10万元，5个工作日。</p><p style=\"text-indent:2em;\">增值服务：</p><p style=\"text-indent:4em;\">免费救援 - 不限次数</p><p style=\"text-indent:4em;\">免费拖车（50KM）</p><p style=\"text-indent:4em;\">故障车充电、更换轮胎、充气</p><p style=\"text-indent:4em;\">代办车辆年检</p><p style=\"text-indent:4em;\">酒后代驾 - 一个险期一次</p><p style=\"text-indent:4em;\">机场贵宾服务（持有龙腾卡客户）</p><p style=\"text-indent:2em;\">最终解释权归保险公司所有。</p></div>", "memo": "Slogan", "insuranceFullInfo": {"head": {"company": {"sysNo": "3", "provider": "3", "agent": "3"}, "finance": {"bankSysNo": null, "loanPeriod": 12, "beneficiary": "上海全款"}, "areaSysNo": "00000000-0000-0000-0000-000000000000", "beneficiary": null, "vehicleCoverage": "135054.9"}, "body": {"packageList": {"package": [] }, "insuranceTypeList": {"insuranceType": [{"sysNo": 1, "level": null, "enabledSDEW": 0, "isForced": true, "isBuySDEW": true, "purchasePeriod": 1, "fullName": "机动车车辆损失险", "briefName": "车损险", "premiumInfo": {"hasSDEW": 0, "sdewRatio": "0.15", "premium": [{"level": null, "description": null, "sdewAmount": 320.28, "rate": null, "amount": 2135.1693 } ] }, "discountRatio": "0.855", "preInsuranceList": "", "typeID": 0, "isBasicInsurance": 1, "isDefault": true, "howManyPeopleSelect": "(95%的人会选择)", "description": "<h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>车辆损失险是指保险车辆遭受保险责任范围内的自然灾害(不包括地震)或意外事故，造成保险车辆本身损失，保险人依据保险合同的规定给予赔偿，发生保险事故时，补偿您自己车辆的损失。</p>\r\n            <p>例如发生以下事故，保险公司可以按照条款赔偿您的车辆维修费用：</p>\r\n            <p>\r\n                &bull;车子撞到护栏、柱子等，或被外界物体倒塌/坠落砸坏；<br />\r\n                &bull;您不小心撞了别人车辆，自己的车子受损；<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>95%的用户会购买。该险种性价比高，目前车价10万左右车辆，一两个配件的维修费用可能超过千元。</p>", "purchaseIndex": 1.0 }, {"sysNo": 2, "level": "100万", "enabledSDEW": 0, "isForced": true, "isBuySDEW": true, "purchasePeriod": 1, "fullName": "第三者责任险", "briefName": "三责险", "premiumInfo": {"hasSDEW": 1, "sdewRatio": "0.15", "premium": [{"level": "100万", "description": "100万", "sdewAmount": 253.42, "rate": null, "amount": 1689.48 }, {"level": "50万", "description": "50万", "sdewAmount": 194.43, "rate": null, "amount": 1296.18 } ] }, "discountRatio": "0.855", "preInsuranceList": "", "typeID": 2, "isBasicInsurance": 1, "isDefault": true, "howManyPeopleSelect": "(99%的人会选择)", "description": " <h2 style='border-top:0px solid #cccccc'>保险范畴:</h2>\r\n            <p>发生保险事故，保险公司按条款赔偿您对第三方（人或物）造成的损失。</p>\r\n            <p>例如：发生以下事故，如果您负有责任，保险公司按照条款赔偿。</p>\r\n            <p>\r\n                &bull;您不小心撞坏了别人的车<br />\r\n                &bull;您不小心撞到别人造成伤亡<br />\r\n                &bull;交强险最多赔12.2万，显然是杯水车薪。投保了商业第三方责任险，交强险赔付不足的部分，由保险公司赔偿。<br />\r\n                &bull;保障越高越好，建议至少选择50-100万的保障额度。<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>99%的用户会购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>", "purchaseIndex": 1.0 }, {"sysNo": 3, "level": "", "enabledSDEW": 0, "isForced": false, "isBuySDEW": false, "purchasePeriod": 1, "fullName": "全车盗抢险", "briefName": "盗抢险", "premiumInfo": {"hasSDEW": 1, "sdewRatio": "0.2", "premium": [{"level": null, "description": null, "sdewAmount": 115.21, "rate": null, "amount": 576.035 } ] }, "discountRatio": "0.855", "preInsuranceList": "", "typeID": 3, "isBasicInsurance": 1, "isDefault": false, "howManyPeopleSelect": null, "description": "\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>如果整车发生被偷被盗，保险公司将按条款进行赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>35%的用户会购买。</p>\r\n            <p>若存在以下任一情况，建议购买：</p>\r\n            <p>无固定车库，一般停在露天停车场；</p>\r\n            <p>经常开车出差，无固定停车地点；</p>\r\n            <p>车辆属于被易被盗车险；</p>\r\n            <p>车辆保管和行驶环境治安很差；</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>", "purchaseIndex": 0.6 }, {"sysNo": 6, "level": "", "enabledSDEW": 0, "isForced": false, "isBuySDEW": false, "purchasePeriod": 1, "fullName": "司机座位责任险", "briefName": "司机责任险", "premiumInfo": {"hasSDEW": 1, "sdewRatio": "0.15", "premium": [{"level": "50000", "description": "5万", "sdewAmount": 26.93, "rate": null, "amount": 179.55 }, {"level": "40000", "description": "4万", "sdewAmount": 21.55, "rate": null, "amount": 143.64 }, {"level": "30000", "description": "3万", "sdewAmount": 16.16, "rate": null, "amount": 107.73 }, {"level": "20000", "description": "2万", "sdewAmount": 10.77, "rate": null, "amount": 71.82 }, {"level": "10000", "description": "1万", "sdewAmount": 5.39, "rate": null, "amount": 35.91 } ] }, "discountRatio": "0.855", "preInsuranceList": "", "typeID": 1, "isBasicInsurance": 1, "isDefault": false, "howManyPeopleSelect": null, "description": " <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>发生意外事故，造成本车司机的人身伤亡，如果本车负有责任，保险公司将按条款规定进行赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>63%的用户会购买经常开车带家人或朋友，需要保障家人朋友的人身安全，建议购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>", "purchaseIndex": 0.75 }, {"sysNo": 7, "level": "", "enabledSDEW": 0, "isForced": false, "isBuySDEW": false, "purchasePeriod": 1, "fullName": "乘客座位责任险", "briefName": "乘客责任险", "premiumInfo": {"hasSDEW": 1, "sdewRatio": "0.15", "premium": [{"level": "50000", "description": "5万", "sdewAmount": 69.26, "rate": null, "amount": 461.7 }, {"level": "40000", "description": "4万", "sdewAmount": 55.4, "rate": null, "amount": 369.36 }, {"level": "30000", "description": "3万", "sdewAmount": 41.55, "rate": null, "amount": 277.02 }, {"level": "20000", "description": "2万", "sdewAmount": 27.7, "rate": null, "amount": 184.68 }, {"level": "10000", "description": "1万", "sdewAmount": 13.85, "rate": null, "amount": 92.34 } ] }, "discountRatio": "0.855", "preInsuranceList": "", "typeID": 5, "isBasicInsurance": 1, "isDefault": false, "howManyPeopleSelect": null, "description": "<h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>", "purchaseIndex": 0.65 }, {"sysNo": 4, "level": "", "enabledSDEW": 0, "isForced": false, "isBuySDEW": false, "purchasePeriod": 1, "fullName": "车身划痕损失险", "briefName": "划痕险", "premiumInfo": {"hasSDEW": 1, "sdewRatio": "0.15", "premium": [{"level": "20000", "description": "2万", "sdewAmount": 146.21, "rate": null, "amount": 974.7 }, {"level": "10000", "description": "1万", "sdewAmount": 97.47, "rate": null, "amount": 649.8 }, {"level": "5000", "description": "5千", "sdewAmount": 73.1, "rate": null, "amount": 487.35 }, {"level": "2000", "description": "2千", "sdewAmount": 51.3, "rate": null, "amount": 342.0 } ] }, "discountRatio": "0.855", "preInsuranceList": "1", "typeID": 4, "isBasicInsurance": 0, "isDefault": false, "howManyPeopleSelect": null, "description": "\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>无明显碰撞痕迹的车身表面油漆单独划伤，保险公司将负责赔偿。</p>\r\n            <p>·比如您的车停放期间，被人用钥匙、石头划伤了，保险公司按条款负责赔偿您的维修费用。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>8%的用户会购买，适用于新车及新手</p>\r\n            <p>在使用过程中，被他人剐划(无明显碰撞痕迹)需要修复的费用，这类维修费用不在车损险理赔涵盖范围内，一般新车、新手买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>", "purchaseIndex": 0.25 }, {"sysNo": 5, "level": "", "enabledSDEW": 0, "isForced": false, "isBuySDEW": false, "purchasePeriod": 1, "fullName": "玻璃单独破碎险", "briefName": "玻璃破碎险", "premiumInfo": {"hasSDEW": 0, "sdewRatio": "0", "premium": [{"level": "进口玻璃", "description": "进口玻璃", "sdewAmount": 0.0, "rate": "0.0031", "amount": 357.963 }, {"level": "国产玻璃", "description": "国产玻璃", "sdewAmount": 0.0, "rate": "0.0019", "amount": 219.3967 } ] }, "discountRatio": "0.855", "preInsuranceList": "1", "typeID": 6, "isBasicInsurance": 0, "isDefault": false, "howManyPeopleSelect": null, "description": "<h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>如果发生车窗、挡风玻璃的单独破碎，保险公司按实际损失赔偿。比如：</p>\r\n            <p>\r\n                &bull;高速路上行驶被飞石击碎车窗、挡风玻璃；<br />\r\n                &bull;车辆停放被高空坠物砸坏车窗、挡风玻璃。<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>35%的用户会购买若存在以下任一情况，建议购买：</p>\r\n            <p>\r\n                &bull;车辆经常停在露天停车场；<br />\r\n                &bull;车辆停放区域治安不好。<br />\r\n            </p>\r\n            <p>单独玻璃破碎，不属于车辆损失险范围</p>", "purchaseIndex": 0.35 }, {"sysNo": 8, "level": "", "enabledSDEW": 0, "isForced": false, "isBuySDEW": false, "purchasePeriod": 1, "fullName": "车辆自燃损失险", "briefName": "自燃险", "premiumInfo": {"hasSDEW": 0, "sdewRatio": "0.15", "premium": [{"level": null, "description": null, "sdewAmount": 25.98, "rate": null, "amount": 173.2079 } ] }, "discountRatio": "0.855", "preInsuranceList": "1", "typeID": 7, "isBasicInsurance": 0, "isDefault": false, "howManyPeopleSelect": null, "description": "\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>因本车电器、线路、油路、供油系统、供气系统、车载货物自身发生问题，机动车运转摩擦起火引起火灾，造成车辆自身的损失，保险公司按条款规定赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>10%的用户会购买。</p>\r\n            <p>若存在以下任一情况，自燃风险较高，建议购买： </p>\r\n            <p>车辆使用超过两年，油路和电路都有所老化；</p>\r\n            <p>年行驶里程超过三万公里；</p>\r\n            <p>公司或单位车子，驾驶员不固定，行驶区域不固定；</p>\r\n            <p>新上市的车型，有可能存在设计缺陷容易自燃。</p>", "purchaseIndex": 0.3 } ] }, "clifmva": {"sysNo": 0, "name": "交强险", "amount": 950.0 }, "vavt": {"sysNo": 0, "name": "车船税", "amount": 360.0 } } }, "isDefault": true, "isPromotion": 0, "tags": "测试标签 上海测试标签", "tagList": ["测试标签", "上海测试标签"], "seats": 5 } ], "error": null, "unAuthorizedRequest": false };

                        _this.ajaxRes = res.result;
                        for(var i = 0, len = _this.ajaxRes.length; i < len; i++ ){
                            if(_this.ajaxRes[i].isDefault){
                                defaultO = _this.ajaxRes[i];
                            }
                        }

                        //_this.render(defaultO,true);//第一次进来不显示
                        _this.render(defaultO);//直接显示已选
                        Vue.nextTick(function(){
                            _this.bindScroll();
                        });

                        setTimeout(function(){
                            _this.hdEnable = true;
                            _this.chooseType = 'total';
                        },1000);
					} else {
						VUI.alert(res.error.message, 1500);
					}
				},
				error: function(){
					VUI.alert("数据请求错误，请稍后再试", 1500);
				}
			});
			transition.next();
		},
        deactivate: function(){
            var _this = this;
            _this.hdEnable = false;
            _this.chooseType = '';
        }
	},
	methods:{
            appNormalGoBack:function(){
                router.app.normalGoBack();
            },
            bindScroll:function(){
                $(window).on('scroll',this.scrollHandler.bind(this));
            },
            unbindScroll:function(){
                $(window).off('scroll',this.scrollHandler.bind(this));
            },
            scrollHandler:function(e){
            	if(this.fixedNavTop==0){
            		return;
            	}
                if($(window).scrollTop() + 50 > this.fixedNavTop){
                    this.fixednav = true;
                } else {
                    this.fixednav = false;
                }

            },
            showInsDescription:function(){
                // chooseComp.fullName
                this.step1 = false;
                this.step2 = false;
                this.chooseType='total';
                this.showInsDes = true;
                window.scrollTo(0,0);
            },
            hideInsDescription:function(){
                this.showInsDes = false;
                this.chooseType='total';
                this.step2 = true;
                this.step1 = false;
                window.scrollTo(0,0);
            },
            hideChooseTypeDetail:function(){
                this.step2 = true;
                this.step1 = false;
                this.chooseType='total';
                this.currentIItem.vueShowItemInfo = false;
            },
            step2Back:function(){
                this.step1 = true;
                this.step2 = false;
                window.scrollTo(0,0);
            },
            getFixedNavTop:function(index){
            	var _this = this;
            	YMC.waitDomInsert(function(){

            		var s = $('#insurance_step2 .ins-title').eq(index);
            		if(s.length){
            			_this.fixedNavTop = s.offset().top;
            			return true;
            		}
            	});
            },
            render:function(O,firstShow){
                var _this = this;

                //是否是ajax加载完毕后的调用
                if(firstShow){
                    // todo...
                } else {
                    //通过click点击进来的
                    _this.step1 = false;
                    _this.step2 = true;
                    window.scrollTo(0,0);
                }

                //选择的保险公司对象
                _this.chooseComp = O;
                //选择的保险公司id
                _this.chooseInsuranceCompanySysNo = O.insuranceCompanySysNo;
                //右侧 保险公司缩写
                _this.companyName = O.briefName;

                var data = O.insuranceFullInfo;
                var body = data.body;

                //交强险 强制交
                _this.jqx = body.clifmva.amount;
                //车船税 强制交
                _this.ccs = body.vavt.amount;

                //当前个性主张
                _this.insuranceTypeList = body.insuranceTypeList.insuranceType;
                for (var i = _this.insuranceTypeList.length - 1; i >= 0; i--) {
                    if(_this.insuranceTypeList[i].isForced){
                      _this.insuranceTypeList[i].isDefault = true;
                    }
                };

                //商业险后面要显示折扣
                if(_this.insuranceTypeList.length){
                  _this.zhekouVal = (_this.insuranceTypeList[0].discountRatio * 10).toFixed(2);
                }

                _this.packageList = body.packageList.package;
                _this.navList = [];//保险方案nav头部
                _this.navIndex == -1;//重置一下下标
                for(var i = 0;i < _this.packageList.length;i++){
                    _this.navList.push({
                        name:_this.packageList[i]['name']
                    });
                    if(_this.packageList[i]['isDefault']){
                        _this.navIndex = i;
                    }
                }

                //if(_this.navList.length){
                    _this.navList.push({name:'个性主张'});
                    //如果没有默认的，那么就默认最后一个为选中，也就是个性主张
                    if(_this.navIndex == -1){
                        _this.navIndex = _this.navList.length - 1;
                    }
                    //保险方案右侧文字
                    _this.packageName =_this.navList[_this.navIndex]['name'];
                //}

                //保存一下高度，用于滚动nav浮层
                Vue.nextTick(function(){
                    _this.getFixedNavTop(_this.navIndex);
                });

                _this.renderInsData = []; //保险套餐重置
                var packItem = {},formatList;

                //大众智选，菜鸟装备
                for(var i = 0, len = _this.packageList.length; i < len; i++){
                    packItem = _this.packageList[i];

                    formatList = _this.findItemFromTypeList(packItem.insuranceType);

                    _this.renderInsData.push({
                        des  : packItem.description,
                        data : formatList,
                        seats: O.seats, //座位数
                        total:0 //总价，切换的时候的总价
                    });
                }

                //个性主张  将个性主张的数据拿出来，先处理一下数据，再扔到数组里面
                _this.renderInsData.push({
                    des:'独具个性的我，喜欢自己来装备我的专属车险方案。我的爱车我做主！',
                    data:_this.formatinsuranceType(_this.insuranceTypeList),
                    total:0 //总价，切换的时候的总价
                });

                //计算一次总价
                _this.countAmount();
                YMC.log(_this.renderInsData);

            },
            showDes:function(fullName,des){
                this.fullName = fullName;
                this.showInsDesc = des;
            },
            chooseTab:function(index){
                var _this = this;
                this.navIndex = index;
                this.packageName =this.navList[this.navIndex]['name'];
                _this.fixednav = false;

                //获取一下高度
                Vue.nextTick(function(){
					_this.getFixedNavTop(index);
                });
                this.countAmount();
            },
            //大众智选，菜鸟装备。从个性主张(this.insuranceTypeList)里面找到pageStatus.packageList[index]中符合要求的类别，并mix属性
            findItemFromTypeList:function (insuranceType){
                var renderData = [],currentType={};
                for(var i = 0, len = insuranceType.length; i < len; i++){

                    //在pageStatus.insuranceTypeList里面找到那一条
                    for(var j = 0,jlen = this.insuranceTypeList.length; j < jlen; j++ ){
                        if(insuranceType[i].sysNo == this.insuranceTypeList[j].sysNo ){
                            currentType = this.insuranceTypeList[j];
                        }
                    }

                    //mix属性
                    var mixObj = $.extend({},currentType,insuranceType[i]);

                    /*
                        EnabledSDEW == 1   IsBuySDEW=true
                        EnabledSDEW == 0   IsBuySDEW=false
                        因为在 this.packageList[index] 也就是 insuranceType对象 里面 "enabledSDEW": 1 代表的是购买不计免赔
                        但是在 this.insuranceTypeList  IsBuySDEW  代表的是购买不计免赔，所以mix的时候要修改一下此属性
                    */
                    if(mixObj.enabledSDEW == 1){
                        mixObj.isBuySDEW = true;
                    }
                    if(mixObj.enabledSDEW == 0){
                        mixObj.isBuySDEW = false;
                    }
                    //mix的属性肯定都是选中的
                    mixObj.isDefault = true;

                    //用vue重构时需要
                    mixObj.showRadio = false; //非个性主张时隐藏前面的选项
                    mixObj.vueShowItemInfo = false;
                    mixObj.itemDisable = true;//禁用，不能让用户勾选

                    if(mixObj.premiumInfo){
                        if(!mixObj.premiumInfo.premium){
                            mixObj.premiumInfo.premium = [{}];
                        }
                    } else{
                        mixObj.premiumInfo = {};
                        mixObj.premiumInfo.premium = [{}];
                    }

                    //设置显示的价格
                    if(mixObj.premiumInfo.premium.length>1){
                        for(var j = 0; j < mixObj.premiumInfo.premium.length; j++){
                            var dj = mixObj.premiumInfo.premium[j];
                            if(dj.level == mixObj.level || dj.description == mixObj.level){
                                Vue.set(mixObj,'levelDes',dj.description);
                                Vue.set(mixObj,'vueAmount',dj.amount);
                                Vue.set(mixObj,'vueSdewAmount',dj.sdewAmount);
                            }
                        }
                    } else {
                        Vue.set(mixObj,'levelDes',mixObj.premiumInfo.premium[0].description);
                        Vue.set(mixObj,'vueAmount',mixObj.premiumInfo.premium[0].amount);
                        Vue.set(mixObj,'vueSdewAmount',mixObj.premiumInfo.premium[0].sdewAmount);
                    }
                    renderData.push( mixObj );
                }
                return renderData;
            },
            //个性主张，将insuranceType数据格式化，用于循环
            formatinsuranceType:function (d){
                for(var i = 0,len = d.length; i < len; i++){
                    // 额度里面的 1万 2万 这些反转一下
                    if(d[i].premiumInfo && $.isArray(d[i].premiumInfo.premium) && d[i].premiumInfo.premium.length ){
                        d[i].premiumInfo.premium = d[i].premiumInfo.premium.reverse();

                        //解决问题：item初始化的值的价格计算
                        //找到默认的那个
                        //如果长度大于1,那么就要设置
                        if(d[i].premiumInfo.premium.length>1){
                            //如果有level字段，说明，是默认选中的，在remiumInfo.premium中找到那一个
                            //并设置价格


                            for(var j = 0; j < d[i].premiumInfo.premium.length; j++){
                                var dj = d[i].premiumInfo.premium[j];

                                if(d[i].level==''){
                                    d[i].level = d[i].premiumInfo.premium[0].level;
                                }
                                if(dj.level == d[i].level || dj.description == d[i].level){
                                    Vue.set(d[i],'levelDes',dj.description);
                                    Vue.set(d[i],'vueAmount',dj.amount);
                                    Vue.set(d[i],'vueSdewAmount',dj.sdewAmount);

                                }
                            }

                        } else {
                            //如果长度是一个premiumInfo.premium
                            d[i].level = d[i].premiumInfo.premium[0].level;
                            Vue.set(d[i],'levelDes',d[i].premiumInfo.premium[0].description);
                            Vue.set(d[i],'vueAmount',d[i].premiumInfo.premium[0].amount);
                            Vue.set(d[i],'vueSdewAmount',d[i].premiumInfo.premium[0].sdewAmount);
                        }
                    }

                    /*
                        vueAmount
                        vueSdewAmount
                    */

                    //新加入的属性
                    Vue.set(d[i],'vueShowItemInfo',false);
                    Vue.set(d[i],'showRadio',true);
                    Vue.set(d[i],'itemDisable',false);

                    // 无法实时响应
                    // d[i].vueShowItemInfo = false;//这个就是控制每次点击item显示下面options
                    // d[i].showRadio = true;       //个性主张的时候不隐藏
                    // d[i].itemDisable = false;    //可用，可以让用户
                    if(d[i].premiumInfo){
                        //如果有premiumInfo属性
                        //再检查是否有d[i].premiumInfo.premium
                        //如果没有则设置一个空数组
                        if(!d[i].premiumInfo.premium){
                            d[i].premiumInfo.premium = [];
                        }
                    } else{
                        //没有premiumInfo属性，直接设置空数组
                        d[i].premiumInfo = {};
                        d[i].premiumInfo.premium = [];
                    }

                }
                return d;
            },
            iitemSwitchClick:function(iitem){
                if(iitem.isForced){
                   return;
                }
                if(iitem.itemDisable){
                    return;
                }
                iitem.isBuySDEW = !iitem.isBuySDEW;
                //如果勾选了switchBox，而且此条目又不是强制选择的话，
                if(iitem.isBuySDEW && !iitem.isForced){
                    //那么勾选外面的checkbox
                    iitem.isDefault = true;
                }
                this.countAmount();
            },
            iitemRadioClick:function(iitem){
                if(!iitem.showRadio){
                    return;
                }
                if(iitem.isForced){
                    return;
                }
                iitem.isDefault = iitem.isBuySDEW = !iitem.isDefault;

                //如果是取消选中状态，那么也不展示下面的详情了
                if(iitem.isDefault == false){
                    iitem.vueShowItemInfo = false;
                }
                this.countAmount();
            },
            //整条item点击的时候
            iitemClick:function(iitem){
                var _this = this;
                //长度不为1的时候，才需要弹出浮层让用户选择
                if( iitem.premiumInfo.premium.length!==1 ){
                    iitem.vueShowItemInfo = !iitem.vueShowItemInfo;

                    //显示底部
                    if(iitem.vueShowItemInfo){
                        _this.chooseType = 'detail';
                        _this.chooseTypePrice = iitem.isBuySDEW ? (iitem.vueAmount+iitem.vueSdewAmount) : iitem.vueAmount;
                    }else{
                        _this.chooseType = 'total';
                    }
                    this.currentIItem = iitem;
                }
                //等于1的时候也要弹出浮层,底部不变
                if(iitem.premiumInfo.premium.length==1){
                    iitem.vueShowItemInfo = !iitem.vueShowItemInfo;
                    this.currentIItem = iitem;
                }
                if(iitem.itemDisable){
                    //被禁用时候
                    return;
                }

                //if(iitem.vueShowItemInfo){
                    iitem.isDefault = iitem.isBuySDEW = true;

                    if(iitem.premiumInfo && iitem.premiumInfo.premium && iitem.premiumInfo.premium.length){
                        if(iitem.level==''){
                            iitem.level = iitem.premiumInfo.premium[0]['level'];
                        }
                    }
                //}
                this.countAmount();
            },
            iitemAreaClick:function(iitem){
                this.alertInfoHead = iitem.fullName;
                this.alertInfoBody = iitem.description;
            },
            //计算总价
            countAmount:function(){
                var _this = this,total = 0,o = {};
                Vue.nextTick(function(){
                    if(_this.renderInsData.length){
                        var list = _this.renderInsData[_this.navIndex];
                        for (var i = list.data.length - 1; i >= 0; i--) {
                            o = list.data[i];
                            //计算规则
                            // 如果有选中（isDefalut==true）那么就加上 vueAmount
                            // 如果不计免赔也选中(isBuySDEW==true)就加上 vueSdewAmount
                            if(o.isForced || o.isDefault){
                                total += o.vueAmount;
                                if(o.isBuySDEW){
                                    total+=o.vueSdewAmount;
                                }
                            }
                        };
                        list.total = total;
                        //最后支付的总价
                        _this.totalPrice = total + _this.jqx + _this.ccs;
                    }
                });
            },
            iiitemClick:function(iitem,iiitem){
                //非个性主张中会禁用item
                if(iitem.itemDisable){
                    return;
                }
                iitem.level = iiitem.level;
                iitem.levelDes = iiitem.description;
                iitem.vueAmount = iiitem.amount;
                iitem.vueSdewAmount = iiitem.sdewAmount;
                //这里再计算一次
                this.chooseTypePrice = iitem.isBuySDEW ? (iitem.vueAmount+iitem.vueSdewAmount) : iitem.vueAmount;
                //计算总价
                this.countAmount();
            },
            //点击，大众智选，和菜鸟装备的修改方案
            //将方案的选项带入个性主张中并显示
            change:function(iitem){
                var _this = this;
                var list = _this.renderInsData[_this.navIndex];//当前的方案
                var typeList = _this.insuranceTypeList //当前的个性主张

                for (var i = 0; i < typeList.length; i++) {
                    //先取消所有不是默认选中的
                    if(!typeList[i].isForced){
                        typeList[i].isBuySDEW = false;
                        typeList[i].isDefault = false;
                    }
                    //再把个性方案中含有当前方案的选中
                    for (var j = 0; j < list.data.length; j++) {
                        if(typeList[i].sysNo == list.data[j].sysNo){
                            typeList[i].isBuySDEW = true;
                            typeList[i].isDefault = true;
                        }
                    };
                };
                //个性主张一般是最后一个
                _this.navIndex = _this.renderInsData.length - 1;
                _this.chooseTab(_this.navIndex);
                _this.countAmount();
            },
            //最后的提交，总算是完了。。。
            submitAjax: function(){
                var _this = this;
                        /*提交格式
                    {
                        "shoppingCartId":"88FF587A-EB4D-4EB9-A7F0-A4FE00A4AD38",//购物车ID
                        "insuranceInfo": {
                            "details": [
                            {
                            "insuranceTypeSysNo": "1",
                            "levelDescription": "",
                            "enableSDEW":true      // 不计免赔勾选
                            },
                            {
                            "insuranceTypeSysNo": "5",
                            "levelDescription": "国产玻璃"
                            },
                            {
                            "insuranceTypeSysNo": "6",
                            "levelDescription": "3万",
                            },
                            {
                            "insuranceTypeSysNo": "7",
                            "levelDescription": "4万",
                            }
                            ],
                            "packageName": "个性主张"
                        }
                    }
                    */

                    //当前选择的方案
                    var list = _this.renderInsData[_this.navIndex];
                    var itemDetail;
                    _this.details = [];
                    for (var i = 0; i < list.data.length; i++) {
                        itemDetail = {};
                        if(list.data[i].isDefault){
                            itemDetail.insuranceTypeSysNo = list.data[i].sysNo;
                            itemDetail.levelDescription = list.data[i].levelDes || '';
                            if(list.data[i].isBuySDEW){
                                itemDetail.enableSDEW = true;
                            }
                            _this.details.push(itemDetail);
                        }
                    };

                    var data = {
                        shoppingCartId      : _this.id,
                        details             : _this.details,
                        packageName         : _this.packageName,
                        insuranceCompanySysNo : _this.chooseInsuranceCompanySysNo
                    }

                    //router.go({name:'myBuyCar'});
                    YMC.ajax({
                        url: _this.submitUrl,
                        data: data,
                        showLoading:true,
                        success: function(res){
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
            }
        }
};
</script>

<style src="../css/car.css"></style>
<style>
    .vcar_fixed{
        position:relative;z-index:1000
    }
    .insurance_step2 {
        padding-top: 50px;
        position: relative;
        z-index: 1000;
    }
    .insurance_step1 .hd{
        width:100%;
        background:#2a2d33;
        font-size:14px;
        color:#393939;
        border-bottom: 1px solid #d0d0d0;
    }
    .insurance_step1 .hd .page{
        position: relative;
        height: 50px;
        line-height: 50px;
        font-weight: normal;
        font-size: 18px;
        text-align: center;
        }
    .insurance_step1 .hd  .page h1{
        display: block;
        margin: 0 50px;
        white-space: nowrap;       /*不换行*/
        text-overflow:ellipsis;    /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
        overflow: hidden;        /*当内容超出宽度时自动隐藏*/
        font-weight: 400;
        font-size: 18px;
        color:#ffffff;
        }
    .insurance_step1 .arrow-left{
        display: block;
        width: 50px;
        height: 100%;
        position: absolute;
        text-align: center;
        left: 0;
        top: 0;
    }
    .insurance_step1 .arrow-left:before {
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
/*    .insurance_step1 .arrow-left:after {
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
    .insurance_step1 .icon{
        display: inline-block;
        background:url("../imgs/pres.png") no-repeat;
        background-size: 200px auto;
    }
    .insurance_step1 .i1{
        width:18px;
        height:19px;
        background-position: 0 -118px;
        position: absolute;
        top:9px;
        left:16px;
    }
    .isCarmaster .vcar  .content,.isCarmaster .insurance_step2{
        padding-top:0;
    }
    .isCarmaster .insurance_step2 .fixed{
        top: 0;
    }
    .insurance_step1 .content{
        padding-top:51px;
        box-sizing:border-box;
        background-color:#fff;
        width:100%;
    }
    .insurance_step1 .test img{
        position: absolute;
        width: 50px;
        height: 50px;
        margin-left: -65px;
    }
    .insurance_step1 .men{
        float: left;
        line-height: 20px;
    }
    .insurance_step1 .men h2{
        font-size: 14px;
    }
    .insurance_step1 .men span{
        font-size: 11px;
    }
    .insurance_step1 .men em{
        color:#d83950;
    }
    .insurance_step1 .test{
        position: relative;
        padding-top: 17px;
        padding-left:80px;
        padding-bottom: 15px;
        border-bottom:1px solid #e4e4e4;
        min-height: 60px;
    }
    .insurance_step1 .test .p1 span{
        background-color: #EEEEEE;
        margin-right: 10px;
        border-radius: 3px 0px 0px 3px;
        line-height: 20px;
        display: inline-block;
        min-width: 60px;
        color:#666;
        text-align: center;
        position: relative;
    }
    .insurance_step1 .test .p1 span:after{
        content: '';
        display: block;
        position: absolute;
        width: 5px;
        height: 20px;
        top: 0px;
        right: -4px;
        background: url("../imgs/ins_label.png") no-repeat;
        background-size: 5px 40px;
        background-position: 0 -20px;
    }
    .insurance_step1 .test .p1 span.ins-label{
        background-color: #FDC400;
        color:#FFF;
    }
    .insurance_step1 .test .p1 span.ins-label:after{
        background-position: 0 0;
    }

    .insurance_step1 .i3{
        width:10px;
        height:17px;
        background-position: 0 -65px;
        position: absolute;
        top: 50%;
        right: 14px;
    }
    .insurance_step1 .div{
        text-align: left;
        background-color:#f7cf15;
        position:relative;
        font-size: 12px;
        padding-left: 40px;
        padding-top: 10px;
        padding-bottom:10px;
    }
    .insurance_step1 .men .ct{
        font-size: 11px;
        color:#999999;
    }
    .insurance_step1 .men small{
        color:#999999;
        font-size: 11px;
    }



.insurance_step2 .fixed{
    position:fixed;
    top:50px;
    z-index:1000;
}

.insurance_step2 .change-ins{
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

.insurance_step2 .addins{
    color: #fe8504;
    border: 1px solid #fe8504;
    border-radius: 7px;
    padding: 6px 16px;
    display: inline-block;
    margin-top: 10px;
    margin-left: 12px;
    cursor: pointer;
}
.insurance_step2 .pt39{
    padding-top: 39px;
}

.insurance_step2 .ico-hd{
    display: inline-block;
    height: 20px;
    background-image: url(../imgs/ico-hd.png);
    background-repeat: no-repeat;
    background-size: 40px 20px;
    overflow: hidden;
}
.insurance_step2 .ico-hd-1{
    position:relative;
    width: 50px;
    height: 50px;
    display: table-cell;
    vertical-align: middle;
}
.insurance_step2 .ico-hd-1:after{
    display: block;
    width: 14px;
    height: 14px;
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    position: absolute;
    top: 50%;
    left: 20px;
    content: ' ';
    transform: rotateZ(-45deg);
    -webkit-transform: rotateZ(-45deg);
    margin-top: -7px;
}

.insurance_step2 .ico-hd-2{
    width: 20px;
    background-position: -20px 0;
}
.insurance_step2 .ico-ins{
    display: block;
    background-image: url(../imgs/ico-ins.png);
    background-repeat: no-repeat;
    background-size: 83px 22px;
    overflow: hidden;
}
.insurance_step2 .ico-ins-1{
    width: 22px;
    height: 22px;
    background-position: -24px 0;
}
.insurance_step2 .ico-ins-2{
    width: 11px;
    height: 7px;
    background-position: -48px 0;
}
.insurance_step2 .hd{background-color: #2a2d33;}
.insurance_step2 .hd .hd-aside{
    display: block;
    width: 50px;
}
.insurance_step2 .hd .hd-aside:active{
    background-color: rgba(255,255,255,.7);
}
.insurance_step2 .hd-aside .ico-hd{
    display: block;
    margin: 0 auto;
}
.insurance_step2 .hd-multi{
    display: table;
    height: 50px;
    z-index:1000;
}
.insurance_step2 .hd-multi .hd-multi-col{
    display: table-cell;
    vertical-align: middle;
}
.insurance_step2 .hd-multi .hd-main{
    position: relative;
}
.insurance_step2 .hd-main .hd-main-ins{
    font-weight: normal;
    text-align: center;
    font-size: 18px;
}
.insurance_step2 .hd-main .hd-logo{
    position: absolute;
    top: 9px;
    left: 6px;
    width:57px;
    height:57px;
}
.insurance_step2 .hd-info{line-height: 1.0;color: #fff;text-align: left;}
.insurance_step2 .hd-info .ins-comp{font-size: 14px;font-weight: normal;}
.insurance_step2 .hd-info .ins-fe{margin-top: 4px;font-size: 12px;}
.insurance_step2 .hd-info .ins-comp + .ins-fe{margin-top: 6px;}

.insurance_step2 .mainhd-bg{padding-top: 0px;}
.insurance_step2 .cfe6863{color: #fe6863;}

.insurance_step2 .txt-lab{
    display: inline-block;
    height: 18px;
    padding: 0 12px;
    font-size: 12px;
    line-height: 18px;
    border-radius: 2px;
    border: 1px solid #999;
}

.insurance_step2 .tab li{
    float: left;
    width: 33.33%;
    padding: 16px 0;
    text-align: center;
    background-color:#fff;
    box-sizing:border-box;
}
.insurance_step2 .tab .ins-name{font-size: 14px;}
.insurance_step2 .tab li.active{
    background-color: #efefef;
}
.insurance_step2 .tab li + li{
    border-left:1px solid #e4e4e4;
}

.insurance_step2 .ins-feature{
    padding: 8px 12px;
    font-size: 12px;
    color: #666;
    background-color: #efefef;
}

.insurance_step2 .show-ins-des{
    position: relative;
}
.insurance_step2 .show-ins-des-icon{
    width:11px;
    height: 7px;
    right: 10px;
    top: 21px;
    position: absolute;
    background-position: -48px 0;
    display: block;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAAAsCAYAAADvo8PJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkY4REM0N0RCM0FCMTFFNThBMDc5NjY2Nzc3MDczMUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkY4REM0N0NCM0FCMTFFNThBMDc5NjY2Nzc3MDczMUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI5MDFGNUU0QUQzQjExRTVCNjY1QUQ5NkE1M0VFQkU1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI5MDFGNUU1QUQzQjExRTVCNjY1QUQ5NkE1M0VFQkU1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+9GRBGwAADc9JREFUeNrsXQlwFWUS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);
    background-repeat: no-repeat;
    background-size: 83px 22px;
    -webkit-transform: rotateZ(-90deg);
    transform: rotateZ(-90deg);
}

.insurance_step2 .ins-feature p + p{margin-top: 2px;}
.insurance_step2 .ins-feature .txt-lab-wrap{margin-top: 6px;}
.insurance_step2 .ins-title{width: 100%;max-width: 540px;height: 39px;line-height: 39px;margin:0 auto;background-color: #e4e4e4;}
.insurance_step2 .ins-cnt{position: relative;width: 100%;padding:11px 0;border-bottom: 1px solid #e4e4e4;line-height: 22px;color:#666;background-color: #fff}
.insurance_step2 .ins-cnt::before{content: "";position: absolute;left:0;right:88%;bottom: -1px;height:1px;width:12%;background-color:#fff;}
.insurance_step2 .ins-title li{float:left;font-size: 14px;box-sizing: border-box;}
.insurance_step2 .ins-cnt li{float:left;min-height:22px;font-size: 13px;box-sizing: border-box;}
.insurance_step2 .ins-title .ins-title-col1,.ins-cnt.ins-cnt-nec .ins-cnt-col1{width: 42%;padding-left: 12px;}
.insurance_step2 .ins-title .ins-title-col2,.ins-cnt .ins-cnt-col2{width: 20%;text-align: center;}
.insurance_step2 .ins-title .ins-title-col3,.ins-cnt .ins-cnt-col3{width: 14%;text-align: right;}
.insurance_step2 .ins-title .ins-title-col4,.ins-cnt .ins-cnt-col4{width: 16%;text-align: right;}
.insurance_step2 .ins-title .ins-title-col5,.ins-cnt .ins-cnt-col5{width: 8%;}
.insurance_step2 .ins-cnt .ins-cnt-col0{width:12%;padding-left: 12px;}
.insurance_step2 .ins-cnt .ins-cnt-col1{position: relative;padding-left: 48px;}
.insurance_step2 .ins-cnt .ins-cnt-col0 + .ins-cnt-col1{width:30%;padding-left:0;}
.insurance_step2 .ins-cnt .ins-cnt-col2{color: #fe8504;}
.insurance_step2 .ins-cnt .ico-ins-2{margin: 5px auto;}
.insurance_step2 .ins-cnt.ins-item-on .ins-cnt-col4{color: #333;}
.insurance_step2 .ins-cnt.ins-item-on .ico-ins-1{background-position: 0 0;}
.insurance_step2 .ins-cnt.ins-item-disabled .ico-ins-1{background-position: -61px 0;}
.insurance_step2 .ins-cnt .switch_box{width: 40px;height: 22px;border:1px solid #e4e4e4;line-height: 22px;background-color:#fff;white-space: nowrap;
text-indent: 56px;}
.insurance_step2 .ins-cnt .switch_box .switch_scroll{top:1px;left:1px;width: 20px;height: 20px;box-shadow: 1px 1px 4px rgba(0,0,0,.3);}
.insurance_step2 .ins-cnt .switch_box:before{content: initial;}
.insurance_step2 .ins-cnt .switch_box.switch_box-on{background-color:#56d780;border-color: #56d780;}
.insurance_step2 .ins-cnt .switch_box.switch_box-on .switch_scroll,.insurance_step2 .ins-cnt .switch_box.switch_box-on1 .switch_scroll{left:19px;}
.insurance_step2 .ins-cnt .switch_box.switch_box-on1{background-color:#fe8504;border-color: #fe8504;}
{left:19px;}
.insurance_step2 .ins-cnt .ins-cnt-opt{display: none;margin-top:16px;}
.insurance_step2 .ins-cnt.ins-cnt-nec{border-bottom: none;}
.insurance_step2 .ins-cnt.ins-cnt-more .ins-cnt-opt{display: block;}
.insurance_step2 .ins-cnt.ins-cnt-more .ico-ins-2{margin: 25px auto;}
.insurance_step2 .ins-cnt.ins-cnt-more .ico-ins-2.no_sdew_amount{margin: 8px auto;}

.insurance_step2 .ins-tlt{height: 44px;padding-left: 12px;font-size: 15px;line-height: 44px;color: #666;background-color: #f4f4f4;}
.insurance_step2 .ins-tlt .ins-disc{margin-left: 15px;color: #d83950;}

.insurance_step2 .box .item{font-size: 13px;}
.insurance_step2 .ins-note{padding:20px 12px;font-size: 12px;color:#999;}

.insurance_step2 .mainbtm-bg{padding-bottom: 50px;}
.insurance_step2 .mainbtm-bg .fixbtm{position:fixed;height: 50px;line-height: 50px;border-top:none;font-size: 17px;background-color:#e4e4e4;}
.insurance_step2 .mainbtm-bg .fixbtm .btn_save{top:0;right:0;bottom:0;height:50px;padding:0 16px;line-height: 50px;color: #725d00;background-color:#f7cf15;}
.insurance_step2 .mainbtm-bg .fixbtm .accessory_sum-left{height: 50px;padding-left: 12px;line-height: 50px;}
.insurance_step2 .mainbtm-bg .fixbtm .price{color: #d83950;}
.insurance_step2 .ico-pie{display: inline-block;width:15px;height:15px;background-image:url(../imgs/pie.svg);background-size: 15px 300px;vertical-align: -3px;}
.insurance_step2 .ins-cnt-col2 .ico-pie{margin-right: 6px;}

.insurance_step2 .ins-pop-wrap{z-index: 1000;position: fixed;top:0;bottom:0;left: 0;right:0;width:100%;min-width:320px;height:100%;background-color:rgba(0,0,0,.7);}
.insurance_step2 .ins-pop{position: absolute;bottom:50px;left: 0;right:0;width:100%;max-height: 70%;background: #fff;overflow: auto;}
.insurance_step2 .ins-pop .tab{padding-top:25px;background-color:#fff;color: #666;text-align: center;}
.insurance_step2 .ins-pop .tab li{padding: 0 0 25px 0;}
.insurance_step2 .ins-pop .tab li + li{border: none;}
.insurance_step2 .ins-pop .tab div{display: inline-block;padding:5px 8px;border: 1px solid #999;line-height: 1.0;border-radius:3px;}
.insurance_step2 .ins-pop .tab .opt-on div{border-color:#56d780;background-color:#56d780;color:#fff;}
.insurance_step2 .ins-pop .tab .ins-quota{padding:2px 0;border-bottom:1px dashed #666;font-size: 22px;}
.insurance_step2 .ins-pop .tab .ins-price{padding:3px 0;font-size: 12px;}
.insurance_step2 .ins-pop .tab .opt-on .ins-quota{border-bottom-color:#fff}
.insurance_step2 .ins-pop .ins-note{padding-top: 0;font-size: 13px;color:#999;background-color:#fff;}

@media screen and (max-width: 350px){
    .insurance_step2 .ins-cnt li{font-size: 12px;}
    .insurance_step2 .ins-cnt-col2 .ico-pie{margin-right: 4px;}
    .insurance_step2 .ins-title .ins-title-col2,.ins-cnt .ins-cnt-col2{width: 18%;text-align: center;}
    .insurance_step2 .ins-title .ins-title-col3,.ins-cnt .ins-cnt-col3{width: 16%;text-align: right;}
}
</style>