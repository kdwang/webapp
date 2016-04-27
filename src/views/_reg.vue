<template>
<div class="main mainhd vlogin">
	<div class="mainPanel">
		<div class="regBox">
            <div class="formInput">
                <div class="tb1">
                    <table>
                        <tbody>
                            <tr>
                                <th class="label_log">手机号码：</th>
                                <td colspan="2">
                                    <input type="tel" @keyup="checkRegAble" v-model="phone | phone" class="intxt" maxlength="11" id="txtCustomerID" required="required" placeholder="请输入您的手机号" v-el:phone-format>
                                </td>
                            </tr>
                            <tr>
                                <th class="label_log bor_t">验&nbsp;&nbsp;证&nbsp;&nbsp;码：</th>
                                <td class="bor_t short_msg">
                                    <input type="tel" @keyup="checkRegAble"  v-model="code" class="intxt" maxlength="6" id="txtValidatedCode" required="required" placeholder="短信中6位数字" />
                                </td>
                                <td id="td1" class="send_btn bor_t">
                                    <a ubt="getCode" @click="getValidateCode" v-show="getCode" id="getCode"><span>发送验证码</span></a>
                                    <span class="tipReget" v-show="tipReget" ><span v-text="tipReget"></span></span>
                                </td>
                            </tr>

                            <tr>
                                <th class="label_log bor_t">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</th>
                                <td colspan="2" class="bor_t">
                                    <input v-model="password" @keyup="checkRegAble" type="password" class="intxt" maxlength="32" id="txtPassword" required="required" placeholder="6-32位字符" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="secCheckbox secCheckTermsOfUse">
                    <label class="label_for">
                        <span ubt="agree" class="checkbox_wrap" :class="{'checkbox_checked':agree}" id="Agreement" @click="agree=!agree"></span>
                        <a ubt="agreement" v-link="{name:'agreement'}"><span>我已阅读并同意&nbsp;<em class="">《要买车使用条款》</em></span></a>
                    </label>
                </div>
                <div class="prompt" :class="{'anmi':tips}">
                    <div class="bd">
                        <label>温馨提示：</label>
                        <label class="txtPrompt">{{tips}}</label>
                    </div>
                </div>

                <div class="btnPanel" id="Registered">
                    <a  ubt="btnSubmit" class="btn_regst btn_Submit" :class="{'btn_able':regAble}" @click.stop.prevent="regBtn" id="txtRegister" gsq="注册">注册</a>
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
            getCode:true,
            tipReget:'',
			phone:'',
			code:'',
			password:'',
			agree:true, //默认选中条款
			tips:'',
			regAble:false, //启用注册按钮
			regsting:false,
            smsCtdTimer:0,
            num:60
		}
	},
	route:{
		data:function(transition){
            var _this = this;
            router.app.customTop.log = true;
            // router.app.$emit('showVirtualLoading');
            router.app.$emit('vShowVirtualLoad');
			transition.next();
		},
        canDeactivate:function(transition){
            var _this      = this;
            _this.num      = 60;
            _this.tips     = '';
            _this.getCode  = true;
            _this.tipReget = '';
            _this.phone    = '';
            _this.code     = '';
            _this.password = '';
            clearInterval(_this.smsCtdTimer);
            transition.next();
        }
	},
	methods:{
		getValidateCode:function(){
			var _this = this;
			var CustomerID = this.phone.replace(/\s/g, "");
			var phoneReg = /(^1\d{10}$)/;
			var result = phoneReg.test(CustomerID);
			if (result == false) {
			    _this.tips = '无效的手机号码';
			}
			else {
				_this.tips='';
			    if(_this.phone) {
			        var data = {
			            Mobile: _this.phone
			        };
			        YMC.ajax({
			            url: "UserAccount/UserRegister/GetCode",
			            data: data,
			            success: function (res) {
			                if(res.success){

			                }else{
			                    VUI.alert(res.error.message, 1000);
			                }
			            },
			            error: function(res){
			                VUI.alert("网络连接失败，请稍后再试。", 1500);
			            }
			        });

			        _this.num = 60;
			        function countdown() {
			            if (_this.num == 0) {
			            	clearInterval(_this.smsCtdTimer);
			                _this.getCode = true;
			                _this.tipReget = '';
			                _this.num = 60;
			            } else {
			                _this.tipReget = _this.num + "s";
			                _this.getCode = false;
			                _this.num--;
			            }
			        }
			        _this.smsCtdTimer = setInterval(countdown, 1000);
			    }
			}
		},
		checkRegAble:function(){
			this.tips = '';
			if(this.phone.length == 11 && this.code.length == 6 && this.password.length > 5 && this.agree) {
			    this.regAble = true;
			} else {
			    this.regAble = false;
			}
			return this.regAble;
		},
		checkAll:function(){
			this.regAble = false;
			if(this.phone.length < 11) {
				this.tips = '手机号码不足11位';
			    return false;
			}
			if(this.code.length < 6) {
			    this.tips='验证码错误';
			    return false;
			}
			if(this.password.length < 6 && this.password.length > 0) {
			    this.tips='密码长度过短';
			    return false;
			}
			if(this.password.length == 0) {
			    this.tips='请输入密码';
			    return false;
			}
			this.regAble = true;
			return true;
		},
		//注册
		regBtn:function(){
			var _this = this;
			//检查格式
			if(_this.checkAll() ==  false){
				return;
			}
			if(this.checkRegAble() == false){
				return;
			}
			var data = {
			    "mobile" : _this.phone,
			    "verificationCode" : _this.code,
			    "password" : _this.password
			}


			//正在注册直接返回
			if(_this.regsting){
				return;
			}
			_this.regsting = true;
			YMC.ajax({
			    url: "UserAccount/UserRegister/RegisterByAccount",
			    data: data,
			    success: function (res) {
			        if(res.success){
			            YMC.register.setYMCToken(res.result, _this.phone);
                        router.app.userState = YMC.register.loginStatus();
			            // 注册统计 start
			            window._adwq && _adwq.push([
			                '_setAction',
			                '8fzz03',
			                _this.phone
			            ]);
			            // 注册统计 end

			            VUI.alert("注册成功！", 1500, function() {
			                router.go({name:'home'});
			            });
			        }else{
			            VUI.alert(res.error.message, 1500, function(){
			                this.regAble = false;
			            });
			        }
			    },
			    error: function(res){
			        VUI.alert("网络连接失败，请稍后再试。", 1500);
			    },
			    complete:function(){
			    	_this.regsting = false;
			    	_this.checkRegAble();
			    }
			});
		}
	},
	detached: function(){
		clearInterval(this.smsCtdTimer);
	}
};
</script>
<style src="../css/login.css"></style>
