<template>
	<div class="vcar mainautow mainhd " style="padding-bottom: 44px;">
		<header v-show="showInsDesc" class="hd">
			<h1 class="pagetitle">
				<span class="ellips lg-txt">{{fullName}}</span>
				<a  @click="showInsDesc=''" class="ico1 ico_arrow-left nav-left" href="javascript:void(0);"></a>
			</h1>
		</header>
		<div class="insurance">
			<div v-show="!showInsDesc" class="main_cnt">
				<div class="item_wrap">
					<div @click.stop="showComp=!showComp" :class="{'item_arr-up':showComp,'item_arr-down':!showComp}" class="item item_col1 clearfix showHide">
						<div class="item_left">保险公司</div>
						<div class="item_right"><span id="supplierName" class="txt1"><!--中国平安保险-->{{companyName}}</span></div>
					</div>
					<div id="supplier" class="ins_list">

						<!--保险公司-->
						<div v-show="showComp" v-for="item in ajaxRes" class="item item3 item_arr-right clearfix">
							<div ubt="companySysNo_{{item.insuranceCompanySysNo}}" insurance-company-sys-no="{{item.insuranceCompanySysNo}}" :class="{'option-on':chooseInsuranceCompanySysNo==item.insuranceCompanySysNo}" class="item_left" data-txt="{{item.briefName}}">
								<i class="iins" @click="render(item)" >
									<img :src="item.logoPath" />
								</i>
								<label class="tag-txt" v-if="item.isOffsitePurchase">跨区特惠</label>
							</div>
							<div ubt="companyDetail_{{item.insuranceCompanySysNo}}" @click="showDes(item.fullName,item.description)" class="item_right data-detail" insurance-company-sys-no="{{item.insuranceCompanySysNo}}"><p class="txt1 ellips_line2"> {{item.memo}} </p></div>
						</div>

					</div>
				</div>
				<div class="item_wrap">
					<div @click.stop="showIns=!showIns" :class="{'item_arr-up':showIns,'item_arr-down':!showIns}" class="item item_col1 clearfix showHide">
						<div class="item_left">保险方案</div>
						<div class="item_right"><span id="insurProdName" class="txt1">{{packageName}}<!-- 大众智选 --></span></div>
					</div>
					<div v-show="showIns" class="item_detail_wrap">
						<ul class="ui_tab-wrap clearfix">
						<li v-for="item in navList" :class="{'ui_tab-on':$index==navIndex}" @click="chooseTab($index)" data-txt="{{item.name}}" class="">{{item.name}}</li>
						<!--	<li class="ui_tab-on" data-txt="大众智选">大众智选</li>
							<li data-txt="全车无忧">全车无忧</li>
							<li data-txt="个性主张">个性主张</li> -->
						</ul>
						<div id="package_list">
							<div v-for="item in renderInsData" v-show="$index==navIndex" class="package_dtl">
								<div class="item_detail">
									<p>{{item.des}}</p>
								</div>
								<div v-if="$index == renderInsData.length-1" class="item_detail">
									<p>已选按揭银行要求部分险种为必选</p>
								</div>
								<div class="item item4 clearfix" >
									<div class="item_left">
									<p>商业险<span v-show="!(zhekouVal==0||zhekouVal==10)" class="zhekou" style="color:red">({{zhekouVal}}折)</span></p></div>
									<div class="item_right"><span class="txt1 sy-total" >¥{{item.total | price}}</span>  </div>
								</div>
								<template v-for="iitem in item.data">

									<!--单个保险详情-->
									<div @click.stop="iitemClick(iitem)" isbuysdew="{{iitem.isBuySDEW}}" sysno="{{iitem.sysNo}}" isdefault="{{iitem.isDefault}}" class="item item_multi item_col2 item_arr-right clearfix vueitem">
									   <div class="item_left item_left-ico">
											<p>{{iitem.fullName}} <br v-if="iitem.purchasePeriod>1" /><small>{{iitem.levelDes || iitem.level}}</small>
											</p>
											<p class="vcl200" v-if="iitem.howManyPeopleSelect">{{iitem.howManyPeopleSelect}}</p>
											<!--sdewAmount amount 不计免赔 选中-->
											<!--amount 不计免赔 不选中-->
											<div v-show="iitem.vueSdewAmount" ubt="switch_2" class="switch_box switch_box-txt" :class="{'switch_box-on':!iitem.itemDisable && iitem.isBuySDEW,'switch_box-on1':iitem.itemDisable}" @click.stop="iitemSwitchClick(iitem)">
												<div class="switch_scroll"></div>不计免赔
											</div>
											<i ubt="chk_2" v-show="iitem.showRadio" isforced="{{iitem.isForced}}" class="ico_checkbox2 " :class="{'ico_checkbox2-on':!iitem.isForced && iitem.isDefault,'ico_checkbox2-disabled':iitem.isForced && iitem.isDefault}" @click.stop="iitemRadioClick(iitem)" ></i>
										</div>
										<div class="item_right">
											<span class="txt1" style="display: inline-block; " :class="{'vcl200':!iitem.isDefault}">¥{{iitem.vueAmount | price}}</span>
											<br>
											<!--不计免赔勾选-->
											<span v-show="iitem.vueSdewAmount" class="txt11" style="display: inline-block;  " :class="{'vcl200':!iitem.isBuySDEW}">¥{{iitem.vueSdewAmount | price}}</span>

										</div>

										<div class="item_area-click" ubt="detail_2" @click.stop="iitemAreaClick(iitem)"></div>
									</div>
									<div class="item_unfold" v-show="iitem.vueShowItemInfo">

										<template v-if="iitem.premiumInfo && iitem.premiumInfo.premium && iitem.premiumInfo.premium.length > 0 && iitem.premiumInfo.premium[0].description">

											<h3 v-if="iitem.typeID!=6" class="item_unfold-title">额度：</h3>
											<ul class="option_list">
											<!--iitem 是列表对象-->
											<!--iiitem 是循环的 optioin-->
												<li  v-for="iiitem in iitem.premiumInfo.premium" @click="iiitemClick(iitem,iiitem)" :class="{'option-on':iitem.level==iiitem.level || iitem.level==iiitem.description,'vcl200':iitem.itemDisable  && (iitem.level!=iiitem.level && iitem.level!=iiitem.description)}" default-level="{{iitem.level}}" sdewamount="{{iiitem.sdewAmount}}" amount="{{iiitem.amount}}"  >{{iiitem.description || iiitem.level}}</li>
											</ul>

										</template>

									</div>


								</template>
								<!--不是最后一个的时候才显示修改方案-->
								<div @click="change(iitem)" v-if="$index !== renderInsData.length-1" class="item_title btn_item1 none-bdtop"> <i class="ico_add"></i>&nbsp;修改方案 </div>
							</div>
						</div>
						<div class="item_wrap">
							<div class="item item4 clearfix" id="jqx">
								<div class="item_left">交强险</div>
								<div class="item_right"><span class="txt1">&yen;{{jqx | price}}</span></div>
							</div>
						</div>
						<div class="item_wrap">
							<div class="item item4 clearfix" id="ccx">
								<div class="item_left">车船税</div>
								<div class="item_right"><span class="txt1">&yen;{{ccs | price}}</span></div>
							</div>
						</div>
					</div>
					<div class="item_detail">
						<h3>注意事项</h3>
						<ul style="margin-left:2em;">
							<li>此保费为按照费率表预估，最终保费已保单为准。</li>
							<li> 车险保单是办理按揭车贷、上牌的必要材料。为避免让您的购车过程变得劳心费神，“要买车”建议您与新车一起购买车险套餐产品。</li>
							<li>车贷用户如因金融机构要求需增加车辆商业保险期限，可在线下交付中心办理时追加购买。</li>
							<li>为确保客户可以在交付完成后顺利提车，至少随车购买基本商业险（车损险+三者险）和交强险（含车船税）。</li>
						</ul>
					</div>
				</div>
			</div>
				<div v-show="!showInsDesc" class="fixbtm abs_size clearfix" style="z-index:5;">
					<div ubt="submitIns" @click="submitAjax" class="btn_save">确认保险方案</div>
					<p class="accessory_sum accessory_sum-left">总计<span id="allTotal" class="price cor_red">&yen;{{totalPrice | price}}</span></p>
				</div>

				<div id="insurance-detail" v-show="showInsDesc" style="margin-top:10px;">{{{showInsDesc}}}</div>
		</div>

		<!--弹出层详情-->
		<div class="markdiv" v-if="alertInfoHead" @click.stop="alertInfoHead=alertInfoBody=''"></div>
		<div class="car-popup" v-if="alertInfoHead" style="width: 80%; height: 300px;transform: translateX(-50%) translateY(-50%);">
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
			ajaxUrl						: 'Products/ShoppingCart/GetAvailableInsuranceCompanyList', // 数据请求地址
			submitUrl					: 'Products/ShoppingCart/UpdateInsurance',				 // 页面提交地址
			id							: '', // shoppingCarId		  ---------提交用到
			packageName					: '', // 保险方案 右侧显示	  ---------提交用到
			chooseInsuranceCompanySysNo : 0,  // 当前选择的保险公司的id  ---------提交用到
			details						: [], // 当前选的保险列表状态	---------提交用到
			jqx							: 0,  // 交强险
			ccs							: 0,  // 车船税
			companyName					: '', // 保险公司名字 右侧显示
			ajaxRes						: {}, // ajax请求后的数据
			bankSysNo					: '', // 银行，提交的时候需要
			showInsDesc					: '', // 保险公司的介绍  ---------用于点击保险公司右侧显示详情
			fullName					: '', // 保险公司全称	---------用于点击保险公司右侧显示详情的头部显示
			insuranceTypeList			: [], // 个性主张 所有方案的列表
			zhekouVal					: '', // 商业险后面要显示折扣
			packageList					: {}, // 保险的方案 比如 大众智选 全车无忧
			navList						: [], // 保险套餐tab头
			navIndex					: -1, // 选中那个保险套餐

			renderInsData				: [], // 渲染各个保险方案
			alertInfoHead				: '', // 弹出层头部
			alertInfoBody				: '', // 弹出层详情
			showComp					: true,// 保险公司展开，收起
			showIns						: true,// 保险方案展开收起
			totalPrice					: 0,   // 最后支付总价
			//原来页面所需的数据
			bankSysNo					: -1, // 银行id
			clifmva						: 0,  // 交强险
			vavt						: 0,  // 车船税
			insuranceSysNo				: -1  // 当前选择的 保险公司的id
		}
	},
	route:{
		data:function(transition){
			var _this = this;
			_this.id = _this.$route.query.id;

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
						//var res = {"success":true,"result":[{"sysId":3,"insuranceCompanySysNo":3,"fullName":"中国人民财产保险股份有限公司","briefName":"人保","isOffsitePurchase":false,"logoPath":"http://image.yaomaiche.com/mkt/Original/2015/0702/9ddd4e1f-c226-4145-bc21-d365651735ba.jpg","priority":1,"description":"<div class=\"text\">\r\n\t\t\t\t<p style=\"text-indent: 2em;\">中国人民财产保险股份有限公司（PICC P&C，简称“中国人保”，下同）是经国务院同意、中国保监会批准，于2003年7月由中国人民保险集团公司发起设立的、亚洲最大的财产保险公司，注册资本122.5598亿元。其前身是1949年10月20日经中国人民银行报政务院财经委员会批准成立的中国人民保险公司。世界500强企业。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">中国人保财险是中国人民保险集团公司（PICC）旗下标志性主业，在国内外同业市场享有卓著声誉。2003年11月6日，公司在香港联交所成功挂牌上市，成为中国内地大型国有金融企业海外上市“第一股”。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">凭借综合实力，中国人保财险相继成为北京2008年奥运会、2010年上海世博会保险合作伙伴，为北京奥运会、上海世博会提供全面的保险保障服务。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">客服电话：95518</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">勘察时效：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">7*24小时全国通赔、专享电子查勘理赔。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">定损时效：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">估损金额在人民币3000元（含）以下的，在接到报案后1个工作日内定损。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">估损金额超过人民币3000元以上的，3个工作日内定损。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">赔付时效：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">人民币1万元以下，1个工作日。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">人民币1万-3万元，3个工作日。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">人民币3万-10万元，5个工作日。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">增值服务：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">免费救援 - 不限次数</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">免费拖车（50KM）</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">故障车充电、更换轮胎、充气</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">代办车辆年检</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">酒后代驾 - 一个险期一次</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">机场贵宾服务（持有龙腾卡客户）</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">最终解释权归保险公司所有。</p>\r\n\t\t\t</div>\r\n","memo":"老牌车险，更有驾乘意外保障服务赠送（价值100）！","insuranceFullInfo":{"head":{"company":{"sysNo":"3","provider":"3","agent":"3"},"finance":{"bankSysNo":null,"loanPeriod":12,"beneficiary":"上海全款"},"areaSysNo":"00000000-0000-0000-0000-000000000000","beneficiary":null,"vehicleCoverage":"139900"},"body":{"packageList":{"package":[{"sysNo":7,"name":"大众智选","insuranceType":[{"sysNo":1,"level":"","enabledSDEW":1},{"sysNo":2,"level":"100万","enabledSDEW":1}],"displayOrder":1,"description":"中低度保障，对自己的爱车有保障，大部分的交通事故赔偿无忧。 \n适用人群：老司机、神车手、路况良好享有者","isDefault":true},{"sysNo":11,"name":"品质优选","insuranceType":[{"sysNo":1,"level":"","enabledSDEW":1},{"sysNo":2,"level":"100万","enabledSDEW":1},{"sysNo":4,"level":"2000","enabledSDEW":1},{"sysNo":6,"level":"50000","enabledSDEW":1},{"sysNo":7,"level":"50000","enabledSDEW":1}],"displayOrder":2,"description":"中高度保障，增加对车主和乘客的保障，具备严重交通意外的赔付能力（100万）。适用人群：保障要求高，交通环境复杂人群","isDefault":false}]},"insuranceTypeList":{"insuranceType":[{"sysNo":1,"level":null,"enabledSDEW":0,"isForced":true,"isBuySDEW":true,"purchasePeriod":1,"fullName":"机动车车辆损失险","briefName":"车损险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":null,"description":null,"sdewAmount":344.17,"rate":null,"amount":2294.4695}]},"discountRatio":"0.855","preInsuranceList":"","typeID":0,"isBasicInsurance":1,"isDefault":true,"howManyPeopleSelect":"(95%的人会选择)","description":"<h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>车辆损失险是指保险车辆遭受保险责任范围内的自然灾害(不包括地震)或意外事故，造成保险车辆本身损失，保险人依据保险合同的规定给予赔偿，发生保险事故时，补偿您自己车辆的损失。</p>\r\n            <p>例如发生以下事故，保险公司可以按照条款赔偿您的车辆维修费用：</p>\r\n            <p>\r\n                &bull;车子撞到护栏、柱子等，或被外界物体倒塌/坠落砸坏；<br />\r\n                &bull;您不小心撞了别人车辆，自己的车子受损；<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>95%的用户会购买。该险种性价比高，目前车价10万左右车辆，一两个配件的维修费用可能超过千元。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":2,"level":"100万","enabledSDEW":0,"isForced":true,"isBuySDEW":true,"purchasePeriod":1,"fullName":"第三者责任险","briefName":"三责险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"100万","description":"100万","sdewAmount":234.06,"rate":null,"amount":1560.375},{"level":"50万","description":"50万","sdewAmount":179.81,"rate":null,"amount":1198.71}]},"discountRatio":"0.855","preInsuranceList":"","typeID":2,"isBasicInsurance":1,"isDefault":true,"howManyPeopleSelect":"(99%的人会选择)","description":" <h2 style='border-top:0px solid #cccccc'>保险范畴:</h2>\r\n            <p>发生保险事故，保险公司按条款赔偿您对第三方（人或物）造成的损失。</p>\r\n            <p>例如：发生以下事故，如果您负有责任，保险公司按照条款赔偿。</p>\r\n            <p>\r\n                &bull;您不小心撞坏了别人的车<br />\r\n                &bull;您不小心撞到别人造成伤亡<br />\r\n                &bull;交强险最多赔12.2万，显然是杯水车薪。投保了商业第三方责任险，交强险赔付不足的部分，由保险公司赔偿。<br />\r\n                &bull;保障越高越好，建议至少选择50-100万的保障额度。<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>99%的用户会购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":3,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"全车盗抢险","briefName":"盗抢险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.2","premium":[{"level":null,"description":null,"sdewAmount":112.45,"rate":null,"amount":562.2737}]},"discountRatio":"0.855","preInsuranceList":"","typeID":3,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":null,"description":"\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>如果整车发生被偷被盗，保险公司将按条款进行赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>35%的用户会购买。</p>\r\n            <p>若存在以下任一情况，建议购买：</p>\r\n            <p>无固定车库，一般停在露天停车场；</p>\r\n            <p>经常开车出差，无固定停车地点；</p>\r\n            <p>车辆属于被易被盗车险；</p>\r\n            <p>车辆保管和行驶环境治安很差；</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":6,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"司机座位责任险","briefName":"司机责任险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"50000","description":"5万","sdewAmount":25.65,"rate":null,"amount":171.0},{"level":"40000","description":"4万","sdewAmount":20.52,"rate":null,"amount":136.8},{"level":"30000","description":"3万","sdewAmount":15.39,"rate":null,"amount":102.6},{"level":"20000","description":"2万","sdewAmount":10.26,"rate":null,"amount":68.4},{"level":"10000","description":"1万","sdewAmount":5.13,"rate":null,"amount":34.2}]},"discountRatio":"0.855","preInsuranceList":"","typeID":1,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":null,"description":" <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>发生意外事故，造成本车司机的人身伤亡，如果本车负有责任，保险公司将按条款规定进行赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>63%的用户会购买经常开车带家人或朋友，需要保障家人朋友的人身安全，建议购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":7,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"乘客座位责任险","briefName":"乘客责任险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"50000","description":"5万","sdewAmount":100.04,"rate":null,"amount":666.9},{"level":"40000","description":"4万","sdewAmount":80.03,"rate":null,"amount":533.52},{"level":"30000","description":"3万","sdewAmount":60.02,"rate":null,"amount":400.14},{"level":"20000","description":"2万","sdewAmount":40.01,"rate":null,"amount":266.76},{"level":"10000","description":"1万","sdewAmount":20.01,"rate":null,"amount":133.38}]},"discountRatio":"0.855","preInsuranceList":"","typeID":5,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":null,"description":"<h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":4,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"车身划痕损失险","briefName":"划痕险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"20000","description":"2万","sdewAmount":146.21,"rate":null,"amount":974.7},{"level":"10000","description":"1万","sdewAmount":97.47,"rate":null,"amount":649.8},{"level":"5000","description":"5千","sdewAmount":73.1,"rate":null,"amount":487.35},{"level":"2000","description":"2千","sdewAmount":51.3,"rate":null,"amount":342.0}]},"discountRatio":"0.855","preInsuranceList":"1","typeID":4,"isBasicInsurance":0,"isDefault":false,"howManyPeopleSelect":null,"description":"\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>无明显碰撞痕迹的车身表面油漆单独划伤，保险公司将负责赔偿。</p>\r\n            <p>·比如您的车停放期间，被人用钥匙、石头划伤了，保险公司按条款负责赔偿您的维修费用。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>8%的用户会购买，适用于新车及新手</p>\r\n            <p>在使用过程中，被他人剐划(无明显碰撞痕迹)需要修复的费用，这类维修费用不在车损险理赔涵盖范围内，一般新车、新手买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":5,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"玻璃单独破碎险","briefName":"玻璃破碎险","premiumInfo":{"hasSDEW":0,"sdewRatio":"0","premium":[{"level":"进口玻璃","description":"进口玻璃","sdewAmount":0.0,"rate":"0.0031","amount":370.805},{"level":"国产玻璃","description":"国产玻璃","sdewAmount":0.0,"rate":"0.0019","amount":227.2676}]},"discountRatio":"0.855","preInsuranceList":"1","typeID":6,"isBasicInsurance":0,"isDefault":false,"howManyPeopleSelect":null,"description":"<h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>如果发生车窗、挡风玻璃的单独破碎，保险公司按实际损失赔偿。比如：</p>\r\n            <p>\r\n                &bull;高速路上行驶被飞石击碎车窗、挡风玻璃；<br />\r\n                &bull;车辆停放被高空坠物砸坏车窗、挡风玻璃。<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>35%的用户会购买若存在以下任一情况，建议购买：</p>\r\n            <p>\r\n                &bull;车辆经常停在露天停车场；<br />\r\n                &bull;车辆停放区域治安不好。<br />\r\n            </p>\r\n            <p>单独玻璃破碎，不属于车辆损失险范围</p>"},{"sysNo":8,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"车辆自燃损失险","briefName":"自燃险","premiumInfo":{"hasSDEW":0,"sdewRatio":"0.15","premium":[{"level":null,"description":null,"sdewAmount":26.91,"rate":null,"amount":179.4218}]},"discountRatio":"0.855","preInsuranceList":"1","typeID":7,"isBasicInsurance":0,"isDefault":false,"howManyPeopleSelect":null,"description":"\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>因本车电器、线路、油路、供油系统、供气系统、车载货物自身发生问题，机动车运转摩擦起火引起火灾，造成车辆自身的损失，保险公司按条款规定赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>10%的用户会购买。</p>\r\n            <p>若存在以下任一情况，自燃风险较高，建议购买： </p>\r\n            <p>车辆使用超过两年，油路和电路都有所老化；</p>\r\n            <p>年行驶里程超过三万公里；</p>\r\n            <p>公司或单位车子，驾驶员不固定，行驶区域不固定；</p>\r\n            <p>新上市的车型，有可能存在设计缺陷容易自燃。</p>"}]},"clifmva":{"sysNo":0,"name":"交强险","amount":1100.0},"vavt":{"sysNo":0,"name":"车船税","amount":37.5}}},"isDefault":true,"isPromotion":1},{"sysId":1,"insuranceCompanySysNo":1,"fullName":"中国太平洋保险（集团）股份有限公司","briefName":"太平洋","isOffsitePurchase":false,"logoPath":"http://image.yaomaiche.com/mkt/Original/2015/0702/0a1ea6ed-513c-4f27-97f8-1a037ed321f1.jpg","priority":2,"description":"<div class=\"text\">\r\n\t\t\t\t<p style=\"text-indent: 2em;\">中国太平洋保险（A股：601601、H股：02601），又称太平洋保险，简称中国太保或太保，前身是中国太平洋保险公司，成立于1991年5月13日，是经中国人民银行批准设立的全国性股份制商业保险公司。2001年，根据中国国务院和中国保监会分业经营机构体制改革的批复，原中国太平洋保险公司更名为“中国太平洋保险（集团）股份有限公司”。太保是中国大陆第二大财产保险公司，仅次于中国财险，也是第三大人寿保险公司，仅次于中国人寿和中国平安。它本身经营多元化保险服务，包括人寿保险、财产保险、再保险等。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">客服电话：95500</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">勘察时效：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">本地出险：查勘人员15分钟内与报案人取得联系。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">异地出险：查勘人员30分钟内与报案人取得联系。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">定损时效：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">1万元以下：定损 1 个工作日内完成。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">5万元以下：定损 3 个工作日内完成。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">赔付时效：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">损失在5000元（含）以下的事故，索赔单证齐全，1天内支付。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">损失在1万元（含）以下的事故，3个工作日内支付。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">损失在1-5万元之间的事故，5个工作日之内通知支付。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">增值服务：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">免费道路救援（不限次数），路边快修、派送燃料、电瓶搭电、更换轮胎、加防冻液、紧急拖车、困境救助、在线故障排除指导、紧急信息传递、驾车医疗救援。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">最终解释权归保险公司所有。</p>\r\n\t\t\t</div>\r\n","memo":"理赔便捷灵活，十项免费增值服务，最懂你的车险","insuranceFullInfo":{"head":{"company":{"sysNo":"1","provider":"1","agent":"6"},"finance":{"bankSysNo":null,"loanPeriod":12,"beneficiary":"上海全款"},"areaSysNo":"00000000-0000-0000-0000-000000000000","beneficiary":null,"vehicleCoverage":"139900"},"body":{"packageList":{"package":[{"sysNo":5,"name":"大众智选","insuranceType":[{"sysNo":1,"level":"","enabledSDEW":1},{"sysNo":2,"level":"100万","enabledSDEW":1}],"displayOrder":1,"description":"中低度保障，对自己的爱车有保障，大部分的交通事故赔偿无忧。 \n适用人群：老司机、神车手、路况良好享有者","isDefault":true},{"sysNo":9,"name":"品质优选","insuranceType":[{"sysNo":1,"level":"","enabledSDEW":1},{"sysNo":2,"level":"100万","enabledSDEW":1},{"sysNo":4,"level":"2000","enabledSDEW":1},{"sysNo":6,"level":"50000","enabledSDEW":1},{"sysNo":7,"level":"50000","enabledSDEW":1}],"displayOrder":2,"description":"中高度保障，增加对车主和乘客的保障，具备严重交通意外的赔付能力（100万）。适用人群：保障要求高，交通环境复杂人群","isDefault":false}]},"insuranceTypeList":{"insuranceType":[{"sysNo":1,"level":"","enabledSDEW":0,"isForced":true,"isBuySDEW":true,"purchasePeriod":1,"fullName":"机动车车辆损失险","briefName":"车损险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":null,"description":null,"sdewAmount":344.17,"rate":null,"amount":2294.4695}]},"discountRatio":"0.855","preInsuranceList":"","typeID":0,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":"(95%的人会选择)","description":"<h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>车辆损失险是指保险车辆遭受保险责任范围内的自然灾害(不包括地震)或意外事故，造成保险车辆本身损失，保险人依据保险合同的规定给予赔偿，发生保险事故时，补偿您自己车辆的损失。</p>\r\n            <p>例如发生以下事故，保险公司可以按照条款赔偿您的车辆维修费用：</p>\r\n            <p>\r\n                &bull;车子撞到护栏、柱子等，或被外界物体倒塌/坠落砸坏；<br />\r\n                &bull;您不小心撞了别人车辆，自己的车子受损；<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>95%的用户会购买。该险种性价比高，目前车价10万左右车辆，一两个配件的维修费用可能超过千元。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":2,"level":"50万","enabledSDEW":0,"isForced":true,"isBuySDEW":true,"purchasePeriod":1,"fullName":"第三者责任险","briefName":"三责险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"100万","description":"100万","sdewAmount":234.31,"rate":null,"amount":1562.085},{"level":"50万","description":"50万","sdewAmount":179.93,"rate":null,"amount":1199.565}]},"discountRatio":"0.855","preInsuranceList":"","typeID":2,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":"(99%的人会选择)","description":" <h2 style='border-top:0px solid #cccccc'>保险范畴:</h2>\r\n            <p>发生保险事故，保险公司按条款赔偿您对第三方（人或物）造成的损失。</p>\r\n            <p>例如：发生以下事故，如果您负有责任，保险公司按照条款赔偿。</p>\r\n            <p>\r\n                &bull;您不小心撞坏了别人的车<br />\r\n                &bull;您不小心撞到别人造成伤亡<br />\r\n                &bull;交强险最多赔12.2万，显然是杯水车薪。投保了商业第三方责任险，交强险赔付不足的部分，由保险公司赔偿。<br />\r\n                &bull;保障越高越好，建议至少选择50-100万的保障额度。<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>99%的用户会购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":3,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"全车盗抢险","briefName":"盗抢险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.2","premium":[{"level":null,"description":null,"sdewAmount":112.45,"rate":null,"amount":562.2737}]},"discountRatio":"0.855","preInsuranceList":"","typeID":3,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":null,"description":"\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>如果整车发生被偷被盗，保险公司将按条款进行赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>35%的用户会购买。</p>\r\n            <p>若存在以下任一情况，建议购买：</p>\r\n            <p>无固定车库，一般停在露天停车场；</p>\r\n            <p>经常开车出差，无固定停车地点；</p>\r\n            <p>车辆属于被易被盗车险；</p>\r\n            <p>车辆保管和行驶环境治安很差；</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":6,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"司机座位责任险","briefName":"司机责任险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"50000","description":"5万","sdewAmount":25.65,"rate":null,"amount":171.0},{"level":"40000","description":"4万","sdewAmount":20.52,"rate":null,"amount":136.8},{"level":"30000","description":"3万","sdewAmount":15.39,"rate":null,"amount":102.6},{"level":"20000","description":"2万","sdewAmount":10.26,"rate":null,"amount":68.4},{"level":"10000","description":"1万","sdewAmount":5.13,"rate":null,"amount":34.2}]},"discountRatio":"0.855","preInsuranceList":"","typeID":1,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":null,"description":" <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>发生意外事故，造成本车司机的人身伤亡，如果本车负有责任，保险公司将按条款规定进行赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>63%的用户会购买经常开车带家人或朋友，需要保障家人朋友的人身安全，建议购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":7,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"乘客座位责任险","briefName":"乘客责任险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"50000","description":"5万","sdewAmount":100.04,"rate":null,"amount":666.9},{"level":"40000","description":"4万","sdewAmount":80.03,"rate":null,"amount":533.52},{"level":"30000","description":"3万","sdewAmount":60.02,"rate":null,"amount":400.14},{"level":"20000","description":"2万","sdewAmount":40.01,"rate":null,"amount":266.76},{"level":"10000","description":"1万","sdewAmount":20.01,"rate":null,"amount":133.38}]},"discountRatio":"0.855","preInsuranceList":"","typeID":5,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":null,"description":"<h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":4,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"车身划痕损失险","briefName":"划痕险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"20000","description":"2万","sdewAmount":146.21,"rate":null,"amount":974.7},{"level":"10000","description":"1万","sdewAmount":97.47,"rate":null,"amount":649.8},{"level":"5000","description":"5千","sdewAmount":73.1,"rate":null,"amount":487.35},{"level":"2000","description":"2千","sdewAmount":51.3,"rate":null,"amount":342.0}]},"discountRatio":"0.855","preInsuranceList":"1","typeID":4,"isBasicInsurance":0,"isDefault":false,"howManyPeopleSelect":null,"description":"\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>无明显碰撞痕迹的车身表面油漆单独划伤，保险公司将负责赔偿。</p>\r\n            <p>·比如您的车停放期间，被人用钥匙、石头划伤了，保险公司按条款负责赔偿您的维修费用。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>8%的用户会购买，适用于新车及新手</p>\r\n            <p>在使用过程中，被他人剐划(无明显碰撞痕迹)需要修复的费用，这类维修费用不在车损险理赔涵盖范围内，一般新车、新手买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":5,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"玻璃单独破碎险","briefName":"玻璃破碎险","premiumInfo":{"hasSDEW":0,"sdewRatio":"0","premium":[{"level":"进口玻璃","description":"进口玻璃","sdewAmount":0.0,"rate":"0.0031","amount":370.805},{"level":"国产玻璃","description":"国产玻璃","sdewAmount":0.0,"rate":"0.0019","amount":227.2676}]},"discountRatio":"0.855","preInsuranceList":"1","typeID":6,"isBasicInsurance":0,"isDefault":false,"howManyPeopleSelect":null,"description":"<h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>如果发生车窗、挡风玻璃的单独破碎，保险公司按实际损失赔偿。比如：</p>\r\n            <p>\r\n                &bull;高速路上行驶被飞石击碎车窗、挡风玻璃；<br />\r\n                &bull;车辆停放被高空坠物砸坏车窗、挡风玻璃。<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>35%的用户会购买若存在以下任一情况，建议购买：</p>\r\n            <p>\r\n                &bull;车辆经常停在露天停车场；<br />\r\n                &bull;车辆停放区域治安不好。<br />\r\n            </p>\r\n            <p>单独玻璃破碎，不属于车辆损失险范围</p>"},{"sysNo":8,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"车辆自燃损失险","briefName":"自燃险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":null,"description":null,"sdewAmount":21.53,"rate":null,"amount":143.5374}]},"discountRatio":"0.855","preInsuranceList":"1","typeID":7,"isBasicInsurance":0,"isDefault":false,"howManyPeopleSelect":null,"description":"\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>因本车电器、线路、油路、供油系统、供气系统、车载货物自身发生问题，机动车运转摩擦起火引起火灾，造成车辆自身的损失，保险公司按条款规定赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>10%的用户会购买。</p>\r\n            <p>若存在以下任一情况，自燃风险较高，建议购买： </p>\r\n            <p>车辆使用超过两年，油路和电路都有所老化；</p>\r\n            <p>年行驶里程超过三万公里；</p>\r\n            <p>公司或单位车子，驾驶员不固定，行驶区域不固定；</p>\r\n            <p>新上市的车型，有可能存在设计缺陷容易自燃。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"}]},"clifmva":{"sysNo":0,"name":"交强险","amount":1100.0},"vavt":{"sysNo":0,"name":"车船税","amount":37.5}}},"isDefault":false,"isPromotion":0},{"sysId":2,"insuranceCompanySysNo":2,"fullName":"中国平安保险（集团）股份有限公司","briefName":"平安","isOffsitePurchase":false,"logoPath":"http://image.yaomaiche.com/mkt/Original/2015/0702/79293b18-bf54-43a1-8100-57b0a84ff0a2.png","priority":3,"description":"<div class=\"text\">\r\n\t\t\t\t<p style=\"text-indent: 2em;\">中国平安保险（集团）股份有限公司（以下简称“中国平安”，“公司”，“集团”）于1988年诞生于深圳蛇口，是中国第一家股份制保险企业，至今已经发展成为融保险、银行、投资等金融业务为一体的整合、紧密、多元的综合金融服务集团。投资保险企业；监督管理控股投资企业的各种国内、国际业务；开展保险资金运用业务；经批准开展国内、国际保险业务；经中国保险监督管理委员会及国家有关部门批准的其他业务。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">客服电话：95511转5</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">勘察时效：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">本地出险：查勘人员10分钟内与报案人取得联系。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">异地出险：查勘人员15分钟内与报案人取得联系。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">定损时效：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">1万元以下：定损 1 个工作日内完成。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">5万元以下：定损 3 个工作日内完成。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">赔付时效：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">1万元以下(不含人伤和物损）：1个工作日内通知赔付。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">5万元以下：双方事故，3个工作日内通知赔付。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">增值服务：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">1.免费道路救援：接电服务、紧急加水、更换轮胎、现场抢修、拖车牵引（100KM）、吊装救援（100KM）。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">2.代步车：（价值3000元）返厂维修，全年享受15天！享受条件： 新车承保；旧车转或续保上年0次出险。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">3.酒后安心：（价值200元）全年享受1次！享受条件：新车承保；旧车转或续保上年0-1次出险。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">4.浦东机场免费停车：（价值200元）全年享受1次，4天！享受件：旧车转保上年0次出险或续保0-1次出险。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">最终解释权归保险公司所有。</p>\r\n\t\t\t</div>\r\n","memo":"快、易、免，服务多，三年获“顾客最满意保险公司”","insuranceFullInfo":{"head":{"company":{"sysNo":"2","provider":"2","agent":"2"},"finance":{"bankSysNo":null,"loanPeriod":12,"beneficiary":"上海全款"},"areaSysNo":"00000000-0000-0000-0000-000000000000","beneficiary":null,"vehicleCoverage":"139900"},"body":{"packageList":{"package":[{"sysNo":6,"name":"大众智选","insuranceType":[{"sysNo":1,"level":"","enabledSDEW":1},{"sysNo":2,"level":"100万","enabledSDEW":1}],"displayOrder":1,"description":"中低度保障，对自己的爱车有保障，大部分的交通事故赔偿无忧。 \n适用人群：老司机、神车手、路况良好享有者","isDefault":true},{"sysNo":10,"name":"品质优选","insuranceType":[{"sysNo":1,"level":"","enabledSDEW":1},{"sysNo":2,"level":"100万","enabledSDEW":1},{"sysNo":4,"level":"2000","enabledSDEW":1},{"sysNo":6,"level":"50000","enabledSDEW":1},{"sysNo":7,"level":"50000","enabledSDEW":1}],"displayOrder":2,"description":"中高度保障，增加对车主和乘客的保障，具备严重交通意外的赔付能力（100万）。适用人群：保障要求高，交通环境复杂人群","isDefault":false}]},"insuranceTypeList":{"insuranceType":[{"sysNo":1,"level":"","enabledSDEW":0,"isForced":true,"isBuySDEW":true,"purchasePeriod":1,"fullName":"机动车车辆损失险","briefName":"车损险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":null,"description":null,"sdewAmount":344.17,"rate":null,"amount":2294.4695}]},"discountRatio":"0.855","preInsuranceList":"","typeID":0,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":"(95%的人会选择)","description":"<h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>车辆损失险是指保险车辆遭受保险责任范围内的自然灾害(不包括地震)或意外事故，造成保险车辆本身损失，保险人依据保险合同的规定给予赔偿，发生保险事故时，补偿您自己车辆的损失。</p>\r\n            <p>例如发生以下事故，保险公司可以按照条款赔偿您的车辆维修费用：</p>\r\n            <p>\r\n                &bull;车子撞到护栏、柱子等，或被外界物体倒塌/坠落砸坏；<br />\r\n                &bull;您不小心撞了别人车辆，自己的车子受损；<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>95%的用户会购买。该险种性价比高，目前车价10万左右车辆，一两个配件的维修费用可能超过千元。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":2,"level":"50万","enabledSDEW":0,"isForced":true,"isBuySDEW":true,"purchasePeriod":1,"fullName":"第三者责任险","briefName":"三责险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"100万","description":"100万","sdewAmount":234.06,"rate":null,"amount":1560.375},{"level":"50万","description":"50万","sdewAmount":179.81,"rate":null,"amount":1198.71}]},"discountRatio":"0.855","preInsuranceList":"","typeID":2,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":"(99%的人会选择)","description":" <h2 style='border-top:0px solid #cccccc'>保险范畴:</h2>\r\n            <p>发生保险事故，保险公司按条款赔偿您对第三方（人或物）造成的损失。</p>\r\n            <p>例如：发生以下事故，如果您负有责任，保险公司按照条款赔偿。</p>\r\n            <p>\r\n                &bull;您不小心撞坏了别人的车<br />\r\n                &bull;您不小心撞到别人造成伤亡<br />\r\n                &bull;交强险最多赔12.2万，显然是杯水车薪。投保了商业第三方责任险，交强险赔付不足的部分，由保险公司赔偿。<br />\r\n                &bull;保障越高越好，建议至少选择50-100万的保障额度。<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>99%的用户会购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":3,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"全车盗抢险","briefName":"盗抢险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.2","premium":[{"level":null,"description":null,"sdewAmount":112.45,"rate":null,"amount":562.2737}]},"discountRatio":"0.855","preInsuranceList":"","typeID":3,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":null,"description":"\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>如果整车发生被偷被盗，保险公司将按条款进行赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>35%的用户会购买。</p>\r\n            <p>若存在以下任一情况，建议购买：</p>\r\n            <p>无固定车库，一般停在露天停车场；</p>\r\n            <p>经常开车出差，无固定停车地点；</p>\r\n            <p>车辆属于被易被盗车险；</p>\r\n            <p>车辆保管和行驶环境治安很差；</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":6,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"司机座位责任险","briefName":"司机责任险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"50000","description":"5万","sdewAmount":25.65,"rate":null,"amount":171.0},{"level":"40000","description":"4万","sdewAmount":20.52,"rate":null,"amount":136.8},{"level":"30000","description":"3万","sdewAmount":15.39,"rate":null,"amount":102.6},{"level":"20000","description":"2万","sdewAmount":10.26,"rate":null,"amount":68.4},{"level":"10000","description":"1万","sdewAmount":5.13,"rate":null,"amount":34.2}]},"discountRatio":"0.855","preInsuranceList":"","typeID":1,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":null,"description":" <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>发生意外事故，造成本车司机的人身伤亡，如果本车负有责任，保险公司将按条款规定进行赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>63%的用户会购买经常开车带家人或朋友，需要保障家人朋友的人身安全，建议购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":7,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"乘客座位责任险","briefName":"乘客责任险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"50000","description":"5万","sdewAmount":100.04,"rate":null,"amount":666.9},{"level":"40000","description":"4万","sdewAmount":80.03,"rate":null,"amount":533.52},{"level":"30000","description":"3万","sdewAmount":60.02,"rate":null,"amount":400.14},{"level":"20000","description":"2万","sdewAmount":40.01,"rate":null,"amount":266.76},{"level":"10000","description":"1万","sdewAmount":20.01,"rate":null,"amount":133.38}]},"discountRatio":"0.855","preInsuranceList":"","typeID":5,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":null,"description":"<h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":4,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"车身划痕损失险","briefName":"划痕险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"20000","description":"2万","sdewAmount":146.21,"rate":null,"amount":974.7},{"level":"10000","description":"1万","sdewAmount":97.47,"rate":null,"amount":649.8},{"level":"5000","description":"5千","sdewAmount":73.1,"rate":null,"amount":487.35},{"level":"2000","description":"2千","sdewAmount":51.3,"rate":null,"amount":342.0}]},"discountRatio":"0.855","preInsuranceList":"1","typeID":4,"isBasicInsurance":0,"isDefault":false,"howManyPeopleSelect":null,"description":"\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>无明显碰撞痕迹的车身表面油漆单独划伤，保险公司将负责赔偿。</p>\r\n            <p>·比如您的车停放期间，被人用钥匙、石头划伤了，保险公司按条款负责赔偿您的维修费用。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>8%的用户会购买，适用于新车及新手</p>\r\n            <p>在使用过程中，被他人剐划(无明显碰撞痕迹)需要修复的费用，这类维修费用不在车损险理赔涵盖范围内，一般新车、新手买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":5,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"玻璃单独破碎险","briefName":"玻璃破碎险","premiumInfo":{"hasSDEW":0,"sdewRatio":"0","premium":[{"level":"进口玻璃","description":"进口玻璃","sdewAmount":0.0,"rate":"0.0031","amount":370.805},{"level":"国产玻璃","description":"国产玻璃","sdewAmount":0.0,"rate":"0.0019","amount":227.2676}]},"discountRatio":"0.855","preInsuranceList":"1","typeID":6,"isBasicInsurance":0,"isDefault":false,"howManyPeopleSelect":null,"description":"<h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>如果发生车窗、挡风玻璃的单独破碎，保险公司按实际损失赔偿。比如：</p>\r\n            <p>\r\n                &bull;高速路上行驶被飞石击碎车窗、挡风玻璃；<br />\r\n                &bull;车辆停放被高空坠物砸坏车窗、挡风玻璃。<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>35%的用户会购买若存在以下任一情况，建议购买：</p>\r\n            <p>\r\n                &bull;车辆经常停在露天停车场；<br />\r\n                &bull;车辆停放区域治安不好。<br />\r\n            </p>\r\n            <p>单独玻璃破碎，不属于车辆损失险范围</p>"},{"sysNo":8,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"车辆自燃损失险","briefName":"自燃险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":null,"description":null,"sdewAmount":21.53,"rate":null,"amount":143.5374}]},"discountRatio":"0.855","preInsuranceList":"1","typeID":7,"isBasicInsurance":0,"isDefault":false,"howManyPeopleSelect":null,"description":"\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>因本车电器、线路、油路、供油系统、供气系统、车载货物自身发生问题，机动车运转摩擦起火引起火灾，造成车辆自身的损失，保险公司按条款规定赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>10%的用户会购买。</p>\r\n            <p>若存在以下任一情况，自燃风险较高，建议购买： </p>\r\n            <p>车辆使用超过两年，油路和电路都有所老化；</p>\r\n            <p>年行驶里程超过三万公里；</p>\r\n            <p>公司或单位车子，驾驶员不固定，行驶区域不固定；</p>\r\n            <p>新上市的车型，有可能存在设计缺陷容易自燃。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"}]},"clifmva":{"sysNo":0,"name":"交强险","amount":1100.0},"vavt":{"sysNo":0,"name":"车船税","amount":37.5}}},"isDefault":false,"isPromotion":0},{"sysId":4,"insuranceCompanySysNo":4,"fullName":"中国大地财产保险股份有限公司","briefName":"大地","isOffsitePurchase":false,"logoPath":"http://image.yaomaiche.com/mkt/Original/2015/0702/7d926295-0d59-41e9-879e-81ffb5722ba1.jpg","priority":4,"description":"<div class=\"text\">\r\n\t\t\t\t<p style=\"text-indent: 2em;\">中国大地财产保险股份有限公司渊源于1949年10月成立的原中国人民保险公司，是经中国保监会批准成立，由中国再保险（集团）公司以投资人和主发起人的身份控股设立的全国性财产保险公司。公司成立于2003年10月20日，注册资本金10亿元人民币，总部设在上海。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">作为中再集团公司旗下唯一的直保财险公司，中国大地保险九年创业实现了跨越式发展，创造了令业界刮目相看的“大地现象”。公司已设立分公司34家、营业部1家，5个层级的机构总数超过1700家，其中苏州，安徽淮北，亳州员工人数首超5000人，全国性服务网络已经形成。美国纽约代表处顺利设立。2007年保费规模即突破100亿元。2011年，公司继续保持了良好发展势头，全年实现保费超过160亿元，市场排位居行业第六位。2012年，公司进入中国财产保险公司排行榜前五名。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">客服电话：400-966-6666</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">勘察时效：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">我司接到客户报案后查勘人员于第一时间内与报案人取得联系。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">现场查勘时效：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">市区范围内的事故：30分钟内到达现场。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">郊区范围内的事故：60分钟内到达现场。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">定损时效：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">5,000元（含）的事故：不涉及隐损的当场出具定损单，涉及隐损的1个工作日内出定损单。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">5,000元-3万元（含）的事故：损失确认后3个工作日内出具定损单。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">3万-10万元（含）的事故：损失确认后5个工作日内出具定损单。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">赔付时效：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">损失在1万元以下的事故，1个工作日内结案并通知赔付。</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">损失在1万-10万元(含)之间的事故，3个工作日内结案并通知赔付。</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">增值服务：</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">人伤免费救助</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">无限次免费全国非事故道路救援（50KM）</p>\r\n\t\t\t\t<p style=\"text-indent: 4em;\">免费上门理赔</p>\r\n\t\t\t\t<p style=\"text-indent: 2em;\">最终解释权归保险公司所有。</p>\r\n\t\t\t</div>","memo":"省心、开心、贴心、放心、安心、顺心，理想车险服务","insuranceFullInfo":{"head":{"company":{"sysNo":"4","provider":"4","agent":"4"},"finance":{"bankSysNo":null,"loanPeriod":12,"beneficiary":"上海全款"},"areaSysNo":"00000000-0000-0000-0000-000000000000","beneficiary":null,"vehicleCoverage":"139900"},"body":{"packageList":{"package":[{"sysNo":8,"name":"大众智选","insuranceType":[{"sysNo":1,"level":"","enabledSDEW":1},{"sysNo":2,"level":"100万","enabledSDEW":1}],"displayOrder":1,"description":"中低度保障，对自己的爱车有保障，大部分的交通事故赔偿无忧。 \n适用人群：老司机、神车手、路况良好享有者","isDefault":true},{"sysNo":12,"name":"品质优选","insuranceType":[{"sysNo":1,"level":"","enabledSDEW":1},{"sysNo":2,"level":"100万","enabledSDEW":1},{"sysNo":4,"level":"2000","enabledSDEW":1},{"sysNo":6,"level":"50000","enabledSDEW":1},{"sysNo":7,"level":"50000","enabledSDEW":1}],"displayOrder":2,"description":"中高度保障，增加对车主和乘客的保障，具备严重交通意外的赔付能力（100万）。适用人群：保障要求高，交通环境复杂人群","isDefault":false}]},"insuranceTypeList":{"insuranceType":[{"sysNo":1,"level":"","enabledSDEW":0,"isForced":true,"isBuySDEW":true,"purchasePeriod":1,"fullName":"机动车车辆损失险","briefName":"车损险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":null,"description":null,"sdewAmount":344.17,"rate":null,"amount":2294.4695}]},"discountRatio":"0.855","preInsuranceList":"","typeID":0,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":"(95%的人会选择)","description":"<h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>车辆损失险是指保险车辆遭受保险责任范围内的自然灾害(不包括地震)或意外事故，造成保险车辆本身损失，保险人依据保险合同的规定给予赔偿，发生保险事故时，补偿您自己车辆的损失。</p>\r\n            <p>例如发生以下事故，保险公司可以按照条款赔偿您的车辆维修费用：</p>\r\n            <p>\r\n                &bull;车子撞到护栏、柱子等，或被外界物体倒塌/坠落砸坏；<br />\r\n                &bull;您不小心撞了别人车辆，自己的车子受损；<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>95%的用户会购买。该险种性价比高，目前车价10万左右车辆，一两个配件的维修费用可能超过千元。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":2,"level":"50万","enabledSDEW":0,"isForced":true,"isBuySDEW":true,"purchasePeriod":1,"fullName":"第三者责任险","briefName":"三责险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"100万","description":"100万","sdewAmount":234.06,"rate":null,"amount":1560.375},{"level":"50万","description":"50万","sdewAmount":179.81,"rate":null,"amount":1198.71}]},"discountRatio":"0.855","preInsuranceList":"","typeID":2,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":"(99%的人会选择)","description":" <h2 style='border-top:0px solid #cccccc'>保险范畴:</h2>\r\n            <p>发生保险事故，保险公司按条款赔偿您对第三方（人或物）造成的损失。</p>\r\n            <p>例如：发生以下事故，如果您负有责任，保险公司按照条款赔偿。</p>\r\n            <p>\r\n                &bull;您不小心撞坏了别人的车<br />\r\n                &bull;您不小心撞到别人造成伤亡<br />\r\n                &bull;交强险最多赔12.2万，显然是杯水车薪。投保了商业第三方责任险，交强险赔付不足的部分，由保险公司赔偿。<br />\r\n                &bull;保障越高越好，建议至少选择50-100万的保障额度。<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>99%的用户会购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":3,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"全车盗抢险","briefName":"盗抢险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.2","premium":[{"level":null,"description":null,"sdewAmount":112.45,"rate":null,"amount":562.2737}]},"discountRatio":"0.855","preInsuranceList":"","typeID":3,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":null,"description":"\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>如果整车发生被偷被盗，保险公司将按条款进行赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>35%的用户会购买。</p>\r\n            <p>若存在以下任一情况，建议购买：</p>\r\n            <p>无固定车库，一般停在露天停车场；</p>\r\n            <p>经常开车出差，无固定停车地点；</p>\r\n            <p>车辆属于被易被盗车险；</p>\r\n            <p>车辆保管和行驶环境治安很差；</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":6,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"司机座位责任险","briefName":"司机责任险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"50000","description":"5万","sdewAmount":25.65,"rate":null,"amount":171.0},{"level":"40000","description":"4万","sdewAmount":20.52,"rate":null,"amount":136.8},{"level":"30000","description":"3万","sdewAmount":15.39,"rate":null,"amount":102.6},{"level":"20000","description":"2万","sdewAmount":10.26,"rate":null,"amount":68.4},{"level":"10000","description":"1万","sdewAmount":5.13,"rate":null,"amount":34.2}]},"discountRatio":"0.855","preInsuranceList":"","typeID":1,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":null,"description":" <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>发生意外事故，造成本车司机的人身伤亡，如果本车负有责任，保险公司将按条款规定进行赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>63%的用户会购买经常开车带家人或朋友，需要保障家人朋友的人身安全，建议购买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":7,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"乘客座位责任险","briefName":"乘客责任险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"50000","description":"5万","sdewAmount":100.04,"rate":null,"amount":666.9},{"level":"40000","description":"4万","sdewAmount":80.03,"rate":null,"amount":533.52},{"level":"30000","description":"3万","sdewAmount":60.02,"rate":null,"amount":400.14},{"level":"20000","description":"2万","sdewAmount":40.01,"rate":null,"amount":266.76},{"level":"10000","description":"1万","sdewAmount":20.01,"rate":null,"amount":133.38}]},"discountRatio":"0.855","preInsuranceList":"","typeID":5,"isBasicInsurance":1,"isDefault":false,"howManyPeopleSelect":null,"description":"<h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":4,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"车身划痕损失险","briefName":"划痕险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":"20000","description":"2万","sdewAmount":146.21,"rate":null,"amount":974.7},{"level":"10000","description":"1万","sdewAmount":97.47,"rate":null,"amount":649.8},{"level":"5000","description":"5千","sdewAmount":73.1,"rate":null,"amount":487.35},{"level":"2000","description":"2千","sdewAmount":51.3,"rate":null,"amount":342.0}]},"discountRatio":"0.855","preInsuranceList":"1","typeID":4,"isBasicInsurance":0,"isDefault":false,"howManyPeopleSelect":null,"description":"\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>无明显碰撞痕迹的车身表面油漆单独划伤，保险公司将负责赔偿。</p>\r\n            <p>·比如您的车停放期间，被人用钥匙、石头划伤了，保险公司按条款负责赔偿您的维修费用。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>8%的用户会购买，适用于新车及新手</p>\r\n            <p>在使用过程中，被他人剐划(无明显碰撞痕迹)需要修复的费用，这类维修费用不在车损险理赔涵盖范围内，一般新车、新手买。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"},{"sysNo":5,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"玻璃单独破碎险","briefName":"玻璃破碎险","premiumInfo":{"hasSDEW":0,"sdewRatio":"0","premium":[{"level":"进口玻璃","description":"进口玻璃","sdewAmount":0.0,"rate":"0.0031","amount":370.805},{"level":"国产玻璃","description":"国产玻璃","sdewAmount":0.0,"rate":"0.0019","amount":227.2676}]},"discountRatio":"0.855","preInsuranceList":"1","typeID":6,"isBasicInsurance":0,"isDefault":false,"howManyPeopleSelect":null,"description":"<h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>如果发生车窗、挡风玻璃的单独破碎，保险公司按实际损失赔偿。比如：</p>\r\n            <p>\r\n                &bull;高速路上行驶被飞石击碎车窗、挡风玻璃；<br />\r\n                &bull;车辆停放被高空坠物砸坏车窗、挡风玻璃。<br />\r\n            </p>\r\n            <h2>购买指数:</h2>\r\n            <p>35%的用户会购买若存在以下任一情况，建议购买：</p>\r\n            <p>\r\n                &bull;车辆经常停在露天停车场；<br />\r\n                &bull;车辆停放区域治安不好。<br />\r\n            </p>\r\n            <p>单独玻璃破碎，不属于车辆损失险范围</p>"},{"sysNo":8,"level":"","enabledSDEW":0,"isForced":false,"isBuySDEW":false,"purchasePeriod":1,"fullName":"车辆自燃损失险","briefName":"自燃险","premiumInfo":{"hasSDEW":1,"sdewRatio":"0.15","premium":[{"level":null,"description":null,"sdewAmount":26.91,"rate":null,"amount":179.4218}]},"discountRatio":"0.855","preInsuranceList":"1","typeID":7,"isBasicInsurance":0,"isDefault":false,"howManyPeopleSelect":null,"description":"\r\n            <h2 style=\"border-top:0px solid #cccccc\">保险范畴:</h2>\r\n            <p>因本车电器、线路、油路、供油系统、供气系统、车载货物自身发生问题，机动车运转摩擦起火引起火灾，造成车辆自身的损失，保险公司按条款规定赔偿。</p>\r\n            <h2>购买指数:</h2>\r\n            <p>10%的用户会购买。</p>\r\n            <p>若存在以下任一情况，自燃风险较高，建议购买： </p>\r\n            <p>车辆使用超过两年，油路和电路都有所老化；</p>\r\n            <p>年行驶里程超过三万公里；</p>\r\n            <p>公司或单位车子，驾驶员不固定，行驶区域不固定；</p>\r\n            <p>新上市的车型，有可能存在设计缺陷容易自燃。</p><h2>不计免赔:</h2>\r\n                <p>投保后，按保险条款计算出来本应由投保人自行承担的免赔金额（比例）也由保险公司承担。</p>"}]},"clifmva":{"sysNo":0,"name":"交强险","amount":1100.0},"vavt":{"sysNo":0,"name":"车船税","amount":37.5}}},"isDefault":false,"isPromotion":0}],"error":null,"unAuthorizedRequest":false};
						_this.ajaxRes = res.result;

						for(var i = 0, len = _this.ajaxRes.length; i < len; i++ ){
							if(_this.ajaxRes[i].isDefault){
						  		defaultO = _this.ajaxRes[i];
							}
						}
						_this.render(defaultO);
					} else {
						VUI.alert(res.error.message, 1500);
					}
				},
				error: function(){
					VUI.alert("数据请求错误，请稍后再试", 1500);
				}
			});
			transition.next();
		}
	},
	methods:{
		render:function(O){
			var _this = this;
			if(O.insuranceCompanySysNo == _this.chooseInsuranceCompanySysNo){

				return;
			}
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
			  _this.zhekouVal = _this.insuranceTypeList[0].discountRatio * 10;
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
			if(_this.navList.length){
				_this.navList.push({name:'个性主张'});
				//如果没有默认的，那么就默认最后一个为选中，也就是个性主张
				if(_this.navIndex == -1){
					_this.navIndex = _this.navList.length - 1;
				}
				//保险方案右侧文字
				_this.packageName =_this.navList[_this.navIndex]['name'];
			}

			_this.renderInsData = []; //保险套餐重置
			var packItem = {},formatList;

			//大众智选，菜鸟装备
			for(var i = 0, len = _this.packageList.length; i < len; i++){
				packItem = _this.packageList[i];
				formatList = _this.findItemFromTypeList(packItem.insuranceType);
				_this.renderInsData.push({
					des  : packItem.description,
					data : formatList,
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


		},
		showDes:function(fullName,des){
			this.fullName = fullName;
			this.showInsDesc = des;
		},
		chooseTab:function(index){
			this.navIndex = index;
			this.packageName =this.navList[this.navIndex]['name'];
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

			iitem.vueShowItemInfo = !iitem.vueShowItemInfo;

			if(iitem.itemDisable){
				//被禁用时候
				return;
			}

			if(iitem.vueShowItemInfo){
				iitem.isDefault = iitem.isBuySDEW = true;

				if(iitem.premiumInfo && iitem.premiumInfo.premium && iitem.premiumInfo.premium.length){
					if(iitem.level==''){
						iitem.level = iitem.premiumInfo.premium[0]['level'];
					}
				}
			}
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
					shoppingCartId		: _this.id,
					details		        : _this.details,
					packageName		    : _this.packageName,
					insuranceCompanySysNo : _this.chooseInsuranceCompanySysNo
				}

				//router.go({name:'myBuyCar'});
				YMC.ajax({
				    url: _this.submitUrl,
				    data: data,
				    success: function(res){
						if(res.success){
							router.go({name:'myBuyCar'});
						} else {
						    VUI.alert(res.error.message);
						    //window.location.href = "http://m.yaomaiche.com/";
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
	.vcar .vcl200{
		color:rgb(200,200,200);
	}

</style>