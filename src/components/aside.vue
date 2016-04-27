<template>
    <div class="aside_components_mask" v-if="show" transition="modal" @touchmove.stop.prevent @click.stop="show=false"></div>
    <div class="aside"
    :class="placement"
    v-if="show"
    v-bind:transition="slideTransition" style="overflow-y: auto;">

        <div class="left_menu_home">
          <ul v-on:click="close" style="background-color: #4a4d52;">
              <li style="padding: 12px">
                <span class="loginN" v-if="!islogin">
                    <a style="display: inline" ubt="login" v-link="{name:'_login'}">登录</a>
                     / <a style="display: inline" ubt="reg" v-link="{name:'_reg'}">注册</a>
                </span>
                <span class="loginY" v-if="islogin">你好<img src="../imgs/icon_smile.png" style="width:30px;vertical-align:middle;"/></span>
              </li>
              <li><a v-link="{ 'name': 'home' }" ubt="index" class="leftico_btn home_btn active">首页</a></li>
              <li><a v-link="{ 'name': 'myBuyCar' }" ubt="sliderBuyCar" class="leftico_btn plan_btn" gsq="我的购车方案">购车方案</a></li>
              <li><a v-link="{ 'name': 'orderTrack' }" ubt="sliderOrderTrack" class="leftico_btn order_btn">订单跟踪</a></li>
              <li><a v-link="{'name': 'rushUsrCenter' }" ubt="rush" class="leftico_btn act-btn" gsq="我的闪购">我的闪购</a></li>
              <li><a href="page/user-info.html" ubt="userInfo" class="leftico_btn customer_btn">个人中心</a></li>
              <li><a v-link="{ name: 'helpIndex'}" ubt="userHelp" class="leftico_btn help_btn">用户帮助</a></li>
              <li v-if="islogin" class="changeR" v-on:click="changeUser"><a ubt="logout" href="javascript:;">更换账号</a></li>
          </ul>
        </div>
    </div>
</template>

<script>
    module.exports = {
        // data: function() {
        //   return {
        //     isLogin : ''
        //   }
        // },
        props: {
            show: {
                type: Boolean,
                require: true
            },
            placement: {
                type:String
            },
            width: {
                type:Number
            },
            islogin: {
                type: String,
                require: true
            }
        },
        computed:{
          slideTransition:function(){
            //console.log('slide' + this.placement);
            return 'slide' + this.placement;
          }
        },
        methods:{
            close:function(e){
                if(e.target.tagName == 'A')
                this.show = false
            },
            changeUser: function() {
                YMC.local('ymcToken', null);
                $.fn.cookie('ymc_userkey','',{ expires: -1 });
                this.islogin = '';
            }
        },
        events: {

        },
        ready:function(){
            // 登录状态
            //this.isLogin = router.app.appLoginStatus ? 1 : 0;
            //document.body.addEventListener('click',this.hideWrap,false);
        }
    }
</script>

<style>
  .aside_components_mask{
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,.5);
    -webkit-transition: opacity .3s ease;
    transition: opacity .3s ease;
  }
  .aside-open {
    transition: transform 0.3s;
  }
  .aside-open.has-push-right {
    transform: translateX(-300px);
  }
  .aside {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1049;
    overflow: auto;
    background: #fff;
  }
  .aside.left {
    left: 0;
    right: auto;
  }
  .aside.right {
    left: auto;
    right: 0;
  }
  .aside.top{
    top:0;
    bottom:auto;
  }
  .aside.bottom{
    bottom:0;
    top:auto;
  }
  .slideleft-enter {
    -webkit-animation:slideleft-in .3s;
    animation:slideleft-in .3s;
  }
  .slideleft-leave {
    -webkit-animation:slideleft-out .3s;
    animation:slideleft-out .3s;
  }

  @keyframes slideleft-in {
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideleft-out {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-100%);
      opacity: 0;
    }
  }

  @-webkit-keyframes slideleft-in {
    0% {
      -webkit-transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      opacity: 1;
    }
  }

  @-webkit-keyframes slideleft-out {
    0% {
      -webkit-transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(-100%);
      opacity: 0;
    }
  }

  .slideright-enter {
    animation:slideright-in .3s;
  }
  .slideright-leave {
    animation:slideright-out .3s;
  }

  @keyframes slideright-in {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideright-out {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .slidetop-enter {
    animation:slidetop-in .3s;
  }

  .slidetop-leave {
    animation:slidetop-out .3s;
  }

  @keyframes slidetop-in {
    0% {
      transform: translateY(-100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slidetop-out {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  .slidebottom-enter {
    animation:slidebottom-in .3s;
  }
  .slidebottom-leave {
    animation:slidebottom-out .3s;
  }

  @keyframes slidebottom-in {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slidebottom-out {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  .aside:focus {
      outline: 0
  }
  .aside .aside-dialog .aside-header {
      border-bottom: 1px solid #e5e5e5;
      min-height: 16.43px;
      padding: 6px 15px;
      background: #337ab7;
      color: #fff
  }

  .aside .aside-dialog .aside-header .close {
      margin-right: -8px;
      padding: 4px 8px;
      color: #fff;
      font-size: 25px;
      opacity: .8
  }

  .aside .aside-dialog .aside-body {
      position: relative;
      padding: 15px
  }

  .aside .aside-dialog .aside-footer {
      padding: 15px;
      text-align: right;
      border-top: 1px solid #e5e5e5
  }

  .aside .aside-dialog .aside-footer .btn+.btn {
      margin-left: 5px;
      margin-bottom: 0
  }

  .aside .aside-dialog .aside-footer .btn-group .btn+.btn {
      margin-left: -1px
  }

  .aside .aside-dialog .aside-footer .btn-block+.btn-block {
      margin-left: 0
  }

  .aside-backdrop {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1040;
      opacity: 0;
      transition: opacity .3s ease;
      background-color: #000
  }


  .aside-backdrop.in {
      opacity: .5;
      filter: alpha(opacity=50)
  }


</style>