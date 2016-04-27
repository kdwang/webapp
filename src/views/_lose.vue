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
                                    <a ubt="smsgetCode" @click="getValidateCode" v-show="smsgetCode" id="smsgetCode"><span>发送验证码</span></a>
                                    <span class="tipReget" v-show="tipReget"><span v-text="tipReget"></span></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="prompt" :class="{'anmi':tips}">
                    <div class="bd">
                        <label>温馨提示：</label>
                        <label class="txtPrompt">{{tips}}</label>
                    </div>
                </div>

                <div class="action flex_box btnPanel">
                    <a ubt="subBtn" class="btn_red btn_login flex_item" :class="{'btn_able':regAble}" @click.stop.prevent="findBtn"   id="txtlogin">下一步</a>
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
            smsgetCode : true,
            tipReget   : '',
            num        : 0,
            phone      : '',
            code       : '',
            tips       : '',
            regAble    : false, //启用按钮
            regsting   : false
		}
	},
	route:{
		data:function(transition){
            // router.app.$emit('showVirtualLoading');
            router.app.$emit('vShowVirtualLoad');
			transition.next();
		},
        canDeactivate:function(transition){
            this.num = 0;
            this.smsgetCode = true;
            this.tips = '';
            this.phone='';
            this.code = '';
            this.regAble = false;
            this.regsting = false;
            transition.next()
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
			            url: "UserAccount/UserRePassword/GetCode",
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


			        function countdown() {
			            var txt = "s"
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
		findBtn:function(){
			var _this = this;
			//检查格式
			if(_this.checkAll() ==  false){
				return;
			}
			if(this.checkRegAble() == false){
				return;
			}

			if(_this.regsting){
				return;
			}
			_this.regsting = true;

            var data = {
                Mobile : _this.phone,
                Code : _this.code
            }

            YMC.ajax({
                url: "Content/MessageValidate/IsSuccessMobileValidateBySendCode",
                data: data,
                success: function (res) {
                    if(res.success){
                        if(!res.result.result){
                            VUI.alert(res.result.message, 1500);
                        }else{
                            VUI.alert('身份验证成功，请重设密码', 1500, function() {
                                router.go({name:'_reset',query:{subTel:_this.phone,subCode:_this.code}} );
                            });
                        }
                    }else{
                        VUI.alert(res.error.message, 1500);
                    }
                },
                error: function(res){
                    VUI.alert("网络连接失败，请稍后再试。", 1500);
                },
                complete:function(){
                    _this.checkRegAble();
                    _this.regsting = false;
                }
            });
		}
	}
};
</script>
<style src="../css/login.css"></style>
