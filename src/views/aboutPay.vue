<template>
<div id="aboutPay" class="aboutPay" style="margin-top:51px;">
    <div class="tab clearfix" trigger="click">
        <span @click="tabIndex=0" :class="{'current':tabIndex==0}" ubt="tab0" rel="0"><a href="javascript:">购车金支付</a></span>
        <span @click="tabIndex=1" :class="{'current':tabIndex==1}" ubt="tab1" rel="1"><a href="javascript:">定金支付</a></span>
        <span @click="tabIndex=2" :class="{'current':tabIndex==2}" ubt="tab2" rel="2"><a href="javascript:">套餐支付</a></span>
    </div>
    <div class="tabCon">
        <div class="tabc" v-show="tabIndex==0">
            <div class="ta1">
                <dl>
                    <dt>● 可选择类型：</dt>
                    <dd>
                        <b>1、全款购车</b>
                        <p>在线支付购车定金后，在要买车线下交付中心完成验车后足额支付全部余款。</p>
                    </dd>
                    <dd>
                        <b>2、按揭购车</b>
                        <p>要买车提供以下几家银行提供的分期购车服务产品可供选择。</p>
                    </dd>
                </dl>
                <dl>
                    <dt>● 可选择银行：</dt>
                    <dd>
                        <b>(一)工商银行</b>
                        <p>1、中国大陆居民,年龄在22(含)—60周岁(含)之间。</p>
                        <p>2、 在本市有常住户口，并且在本市有稳定住所。非本市常住户的应在本市拥有本人名下房产或持有本市居住证。</p>
                        <p>3、在本市有正当的职业和合法稳定的收入，有按期还款的能力（收入为还贷的两倍），并能够提供工行认可的收入证明。</p>
                        <p>4、具有良好的信用记录和还款意愿，在工行及其他金融机构无不良记录。</p>
                        <p>5、申请车辆范围为一手9人座以下(含)自用车,车辆产权所有人须为申请人本人。</p>
                        <p>6、首付比例30%起，且贷款金额不超过50万。</p>
                        <p>7、手续费按月等额收取，提前还款不收取未发生的手续费。 </p>
                        <b>(二)建设银行</b>
                        <p>1、在本市有常住户口；或非本市常住户口的在本市拥有本人名下房产；或还款能力充足。</p>
                        <p>2 、有正当的职业和合法稳定的收入，月收入须为月还款额两倍（可加亲属）,能够提供建行认可的收入证明。</p>
                        <p>3、首付比例30%起,购车分期额度最高可达50万,最长分36期还款。</p>
                        <p>4、手续费一次性收取，高效便捷。 </p>
                        <p>5、具有良好的信用记录和还款意愿 。</p>
                        <b>(三)中国银行 </b>
                        <p>1、年龄18至65周岁之间，在本市有固定住所，稳定、合法的职业和收入来源的客户。 </p>
                        <p>2、在本市拥有本人名下房产，或有合法稳定的收入且有按期还款的能力(收入为月还款额的两倍) 。</p>
                        <p>3、首付比例30%起，购车分期信用额度最高可达30万，抵押额度最高可达80万，最长分36期还款。</p>
                        <p>4、申请车辆范围为一手自用非营运类车辆 。</p>
                        <p>5 、手续费一次性收取，高效便捷。</p>
                        <p>6 、具有良好的信用记录和还款意愿。</p>
                    </dd>
                </dl>
                <dl>
                    <dt>● 具体操作：</dt>
                    <dd>
                        <p>在线支付购车定金后，在要买车线下交付中心完成验车后支付车款的首付比例对应款项数额，余款通过国家允许的相关金融机构及其他有权办理相关业务的单位办理汽车消费贷款支付</p>
                    </dd>
                </dl>
                <dl>
                    <dt>● 补充说明：</dt>
                    <dd>
                        <p>车辆本身由要买车提供销售服务，发票由要买车开具。</p>
                    </dd>
                </dl>
                <dl>
                    <dt>● 付款账号：</dt>
                    <dd>
                        <p>户　名：上海运图贸易有限公司</p>
                        <p>开户行：建行宝钢宝山支行张庙支行</p>
                        <p>账　号：31001528700050024650</p>
                    </dd>
                </dl>
            </div>
        </div>
        <div class="tabc" v-show="tabIndex==1">
            <div class="ta2">
                <p>在这里选好要买的品牌型号，然后付个小额定金，后面的事请交给我们吧！专人专业服务，Duang~开启互联网时代全新的一站式购车体验！</p>
                <br/>
                <p>在线支付定金只需三步，绝不啰嗦：
                    <br/>
                    <br/><span class="step"> ① 选车 > ② 完善个人信息 > ③ 支付宝或微信在线支付</span>
                    <br/>
                    <br/><em>第一步：</em>
                    <br/>
                    <br/>选好自己的爱车：包括品牌、型号等；
                    <br/>
                    <br/><em>第二步：</em>
                    <br/>
                    <br/> 系统将自动跳入到订单/支付页面，在这里您可以看到您的爱车信息以及相关的详细购车费用说明。
                    <br/>
                    <br/>确认无误的话，请在这里填好个人信息：
                    <img src="../imgs/pay_03.jpg" width="100%" />
                    <img src="../imgs/pay_05.jpg" width="100%" />
                    <br/>
                    <br/> 即可点击进入到订单支付定金流程。
                    <img src="../imgs/pay_07.jpg" width="100%" />
                    <img src="../imgs/pay_08.jpg" width="100%" />
                    <img src="../imgs/pay_09.jpg" width="100%" />
                    <img src="../imgs/pay_10.jpg" width="100%" />
                    <img src="../imgs/pay_11.jpg" width="100%" />
                    <img src="../imgs/pay_12.jpg" width="100%" />
                    <img src="../imgs/pay_13.jpg" width="100%" />
                    <img src="../imgs/pay_14.jpg" width="100%" />
                    <img src="../imgs/pay_15.jpg" width="100%" />
                    <img src="../imgs/pay_16.jpg" width="100%" />
                </p>
                <p>
                    <em>第三步：</em>
                    <br/>
                    <br/> <span class="money">在线支付定金</span>
                    <br/>
                    <br/> 平台同时支持“支付宝”和“微信支付”两种在线支付方式，方便快捷。
                    <br/>
                    <br/> ① 选择“支付宝”支付定金的车友，页面将会自动跳转到支付宝登陆页面，在这里您只需登陆您的支付宝账号，并进行相关的付费操作即可完成定金支付交易。
                    <br/>
                    <br/>
                    <img src="../imgs/pay_18.jpg" width="100%" />
                    <img src="../imgs/pay_19.jpg" width="100%" />
                    <img src="../imgs/pay_20.jpg" width="100%" />
                    <img src="../imgs/pay_21.jpg" width="100%" />
                    <img src="../imgs/pay_22.jpg" width="100%" />
                    <br/>
                    <br/> ② 选择 “微信支付”定金的车友请注意：系统将自动生成一张二维码图片，您只需将该图片截屏保存下来，并打开微信App使用“扫一扫”功能对该图进行扫码直接进入到微信支付页面，在这里轻松输入您的微信支付密码即可完成支付。
                    <br/>
                    <br/>
                    <img src="../imgs/pay_24.jpg" width="100%" />
                    <img src="../imgs/pay_25.jpg" width="100%" />
                    <img src="../imgs/pay_26.jpg" width="100%" />
                    <img src="../imgs/pay_27.jpg" width="100%" />
                    <img src="../imgs/pay_28.jpg" width="100%" />
                    <br/>
                    <br/> 微信支付成功后，请返回到原来的“要买车”支付页面，点击支付成功完成本次微信支付定金交易。
                </p>
            </div>
        </div>
        <div class="tabc" v-show="tabIndex==2">
            <div class="ta3">
                <b>精品套餐</b>
                <p>在要买车线下交付中心完成验车后足额支付全款。</p>
                <em>补充说明：</em>
                <p>由要买车提供销售服务，发票由要买车开具。</p>
                <b>车险套餐</b>
                <p>在要买车线下交付中心完成验车后足额支付全款 。</p>
                <em>补充说明：</em>
                <p>a 车险套餐实际由经要买车认证的第三方保险公司提供，要买车提供代收代缴服务，发票由第三方保险公司开具。</p>
                <p>b 车险套餐均含车船税，由保险公司代收。</p>
                <b>尊享服务</b>
                <p>在要买车线下交付中心完成验车后足额支付全款。另外，尊享服务包含要买车服务费和牌证费两部分。</p>
                <p><span>a 要买车服务费：</span>由要买车提供服务并开具发票。</p>
                <p><span>b 牌证费：</span>由要买车代收代缴，发票由机动车管理局开具。</p>
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
				tabIndex:0
			}
		},
		//这里才是route的生存周期
		route:{
			
			data: function(transition) {
				var _this = this;
				

				transition.next()	
			}
		}
	}
</script>

<style>
.aboutPay{}
.aboutPay img{
    vertical-align: middle;
}
.aboutPay .tab{
    border-bottom: 1px solid #ccc;
}
.aboutPay .tab span{
    padding:20px 0;
    text-align: center;
    float: left;
    width: 33.333%;
    line-height: 18px;
}
.aboutPay .tab span a{
    display: block;
    width: 100%;
    border-right: 1px solid #ccc;
    color:#595959;
    line-height: 18px;
    height: 18px;
}
.aboutPay .tab span:last-child a{
    border: 0 none;
}
.aboutPay .tab span.current{
    color: #ff9845;
    border-bottom: 2px solid #ff9845;
}
.aboutPay .tab span.current a{
    color: #ff9845;
}
.aboutPay .tabCon{
    padding:15px 10px 30px;
}
.aboutPay .ta1,
.aboutPay .ta2,
.aboutPay .ta3{
    color:#595959;
    font-size: 12px;
}

.aboutPay .ta1 dl{
    color:#595959;
    margin-bottom: 25px;
}
.aboutPay .ta1 dl dt{
    color:#262626;
    font-size: 14px;
}
.aboutPay .ta1 dl dd p{
    line-height: 24px;
}
.aboutPay .ta1 dl dd b{
    color:#ff9845;
    margin-top: 5px;
    display: block;
    font-weight: normal;
}
.aboutPay .ta2 em{
    color:#000;
}
.aboutPay .ta2 span.step{
    color:#ff9843;  
    font-family:"Hiragino Sans GB","Hiragino Sans GB W3",'微软雅黑';
}
.aboutPay .ta2 span.money{
    color:#1eb295;
}

.aboutPay .ta3 b:first-child{
    margin-top: 0;
}
.aboutPay .ta3 b{
    color:#ff9843;
    font-size: 14px;
    display: block;
    margin-top: 20px;
}
.aboutPay .ta3 em,
.aboutPay .ta3 p span{
    color:#262626;
    display: block;
    margin-top: 10px;
}
</style>