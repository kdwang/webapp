<template>
<div  class="main mainhd vlogin">
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
                                <th class="label_log bor_t">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</th>
                                <td col span="2" class="bor_t">
                                    <input v-model="password" @keyup="checkRegAble" type="password" class="intxt" maxlength="32" id="txtPassword" required="required" placeholder="6-32位字符" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="logindiv" class="login_txline">
                    <a v-link="{name:'_smslogin',query:{source:$route.query.source||''}}" ubt="smslogin" gsq="验证码快速登录" id="smslog">验证码快速登录</a>
                    <a class="forget" ubt="forget" v-link="{name:'_lose'}">忘记密码</a>
                </div>
                <div class="prompt" :class="{'anmi':tips}">
                    <div class="bd">
                        <label>温馨提示：</label>
                        <label class="txtPrompt">{{tips}}</label>
                    </div>
                </div>
                <div class="action flex_box btnPanel">
                    <a class="btn_red btn_login flex_item" :class="{'btn_able':regAble}" @click.stop.prevent="subBtn" ubt="subBtn" id="txtlogin" gsq="登录">登录</a>
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
            phone    : '',
            code     : '',
            password : '',
            agree    : true, //默认选中条款
            tips     : '',
            regAble  : false, //启用注册按钮
            regsting : false
        }
    },
    route:{
        data:function(transition){
            //在topbar上面显示
            router.app.customTop.reg = true;
            // router.app.$emit('showVirtualLoading');
            router.app.$emit('vShowVirtualLoad');
            this.phone = '';
            this.code = '';
            this.password = '';
            transition.next();
        },
        canDeactivate:function(transition){
            this.phone = '';
            this.code = '';
            this.password = '';
            this.tips = '';
            transition.next();
        }
    },
    methods:{
        checkRegAble:function(){
            this.tips = '';
            if(this.phone.length == 11 && this.password.length > 5 ) {
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
        subBtn:function(){
            var _this = this;
            //检查格式
            if(_this.checkAll() ==  false){
                return;
            }
            if(this.checkRegAble() == false){
                return;
            }
            var data = {
                "mobile"   : _this.phone,
                "password" : _this.password
            }

            //正在登陆
            if(_this.regsting){
                return;
            }
            _this.regsting = true;
            YMC.ajax({
                url: "UserAccount/UserLogin/LoginByPhoneAndPassWord",
                data: data,
                success: function (res) {
                    if(res.success){

                        //如果在app里面登陆的时候
                        if(Prius.isInsideApp){
                            Prius.appLoginIn(res.result.token,_this.phone);
                        }
                        YMC.register.setYMCToken(res.result, _this.phone);
                        router.app.userState  =  YMC.register.loginStatus();
                        VUI.alert('登录成功！', 1000, function() {
                            if(_this.$route.query.source && (_this.$route.query.source.indexOf('.html')==-1)){
                                var rt = {name:_this.$route.query.source};
                                if(_this.$route.query.id){
                                    rt.query = {id:_this.$route.query.id}
                                } else if(_this.$route.query.query){
                                    //还原query
                                    try{
                                       rt.query=JSON.parse(_this.$route.query.query);
                                    }catch(e){}
                                }

                                router.replace(rt);
                            }else if(_this.$route.query.source && _this.$route.query.source.indexOf('.html')>-1){
                                window.location.href = '../Page/'+_this.$route.query.source;
                            }else{
                                router.replace({name:'home'});
                            }
                        });
                    }else{
                        VUI.alert(res.error.message, 1000);
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
    }
};
</script>
<style src="../css/login.css"></style>
