<template>
<div class="vlogin main mainhd">
	<div class="mainPanel">
        <div class="regBox">
            <div class="formInput">
                <div class="tb1">
                    <table id="table1">
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
                                    <a ubt="smsgetCode" @click="getValidateCode" id="smsgetCode" v-show="smsgetCode"><span>发送验证码</span></a>
                                    <span class="tipReget" v-show="tipReget"><span v-text="tipReget"></span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div id="logindiv" class="login_txline">
                    <a v-link="{name:'_login'}" ubt="byPassword" id="pwdlog">密码登录</a>
                </div>

                <div class="prompt" :class="{'anmi':tips}">
                    <div class="bd">
                        <label>温馨提示：</label>
                        <label class="txtPrompt">{{tips}}</label>
                    </div>
                </div>

                <div class="action flex_box btnPanel">
                    <a ubt="subBtn" class="btn_red btn_login flex_item" :class="{'btn_able':regAble}" @click.stop.prevent="smsBtn"   id="txtlogin">登录</a>
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
            num:60,
            smsgetCode:true,
            tipReget:'',
			phone:'',
			code:'',
			tips:'',
			regAble:false, //启用按钮
			regsting:false
		}
	},
	route:{
		data:function(transition){
            // router.app.$emit('showVirtualLoading');
            router.app.$emit('vShowVirtualLoad');
			transition.next();
		},
        canDeactivate:function(transition){
            this.smsgetCode = true;
            this.tipReget = '';
            this.num = 60;
            this.tips = '';
            this.phone = '';
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
			            url: "UserAccount/UserLogin/GetCode",
			            data: data,
			            success: function (res) {

			                if(res.success){

			                }else{
			                    VUI.alert(res.error.message, 1000);
			                }
			            },
			            error: function(){

			                VUI.alert("网络连接失败，请稍后再试。", 1500);
			            }
			        });


			        function countdown() {
			            if (_this.num == 0) {
			            	clearInterval(_this.smsCtdTimer);
			                _this.smsgetCode = true;
			                _this.tipReget = '';
			                _this.num = 60;
			            } else {
			                _this.smsgetCode = false;
			                _this.tipReget = _this.num + "s";
			                _this.num--;
			            }
			        }
			        // countdown();
			        _this.smsCtdTimer = setInterval(countdown, 1000);
			    }
			}
		},
		checkRegAble:function(){
			this.tips = '';
			if(this.phone.length == 11 && this.code.length == 6 ) {
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

			this.regAble = true;
			return true;
		},
		//验证码登录
		smsBtn:function(){
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


			//正在登陆中直接返回
			if(_this.regsting){
				return;
			}
			_this.regsting = true;
			var data = {
			    mobile : _this.phone,
			    verificationCode : _this.code
			}
			YMC.ajax({
			    url : 'UserAccount/UserLogin/Login',
			    data : data,
			    success : function(res) {

			        if(res.success){
			            //如果在app里面登陆的时候
			            if(Prius.isInsideApp){
			                Prius.appLoginIn(res.result.token,_this.phone);
			            }
			            YMC.register.setYMCToken(res.result, _this.phone);
                        router.app.userState  =  YMC.register.loginStatus();
			            VUI.alert('登录成功！', 1000, function() {
			                if(_this.$route.query.source){
			                    router.replace({name:_this.$route.query.source});
			                } else {
                                router.replace({name:'home'});
                            }
			            });
			        }else{
			            VUI.alert(res.error.message, 1000);
			        }
			    },
			    error: function(res){
			        VUI.alert('网络连接失败，请稍后再试。', 1500);
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
