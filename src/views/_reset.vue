<template>
<div   class="vlogin main mainhd">

    <div class="mainPanel">
        <div class="regBox">
            <div class="formInput">
                <div class="tb1">
                    <table>
                        <tbody>
                            <tr>
                                <th class="label_log">新&nbsp;&nbsp;密&nbsp;&nbsp;码：</th>
                                <td>
                                    <input @keyup="checkRegAble" v-model="newPassword" ubt="newPass1" class="intxt" type="password" id="txtNewPassword" maxlength="32" placeholder="请输入新密码" />
                                </td>
                            </tr>
                            <tr>
                                <th class="label_log bor_t">再次确认：</th>
                                <td class="bor_t">
                                    <input @keyup="checkRegAble" v-model="newPassword1" ubt="newPass2" class="intxt" type="password" id="txtReNewPassword" placeholder="请再次输入新密码" maxlength="32" />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div class="secCheckbox secCheckTermsOfUse">

                </div>

                <div class="prompt" :class="{'anmi':tips}">
                    <div class="bd">
                        <label>温馨提示：</label>
                        <label class="txtPrompt">{{tips}}</label>
                    </div>
                </div>

                <div class="btnPanel" id="Registered">
                    <a ubt="subBtn" href="javascript:void(0)" class="btn_regst btn_Submit" :class="{'btn_able':regAble}" @click.stop.prevent="resetBtn"  id="txtRegister">提交</a>
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
            newPassword : '',
            newPassword1 : '',
            tips     : '',
            subTel:'',
            subCode:'',
            regAble  : false, //启用注册按钮
            regsting : false
		}
	},
	route:{
		data:function(transition){
            this.subTel = this.$route.query.subTel;
            this.subCode = this.$route.query.subCode;
            // router.app.$emit('showVirtualLoading');
            router.app.$emit('vShowVirtualLoad');
			transition.next();
		}
	},
	methods:{
		checkRegAble:function(){
			this.tips = '';
			if(this.newPassword.length > 5 && this.newPassword1.length > 5 ) {
			    this.regAble = true;
			} else {
			    this.regAble = false;
			}
			return this.regAble;
		},
		checkAll:function(){
			this.regAble = false;

			if( this.newPassword !== this.newPassword1) {
				this.tips = '两次密码输入不一致';
			    return false;
			}

            if( this.newPassword.length < 6) {
                this.tips = '密码不能少于6位';
                return false;
            }

			this.regAble = true;
			return true;
		},
		//重新设置密码
		resetBtn:function(){
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
                "mobile" : _this.subTel,
                "verificationCode" : _this.subCode,
                "password" : _this.newPassword,
                "confirmPassword" : _this.newPassword1
            }

            YMC.ajax({
                url: "UserAccount/UserRePassword/RePassword",
                data: data,
                success: function (res) {
                    if(res.success){
                        VUI.alert('密码修改成功', 1500,function(){
                            router.go({name:'_login'});
                        });
                    }else{
                        if(res.error.message==="验证码已过期！"){
                            VUI.alert("验证码已过期，请重新获取", 1500, function() {
                                router.go({name:'_lose'});
                            });
                        }else{
                            VUI.alert(res.error.message, 1500);
                        }
                    }
                },
                error: function(){
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
