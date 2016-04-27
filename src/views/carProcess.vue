<template>
    <div class="car-proc">
        <div class="text-box">
            <div class="fax" style="padding-top:15px;">
                <ol class="step-list">
                    <li islinkage=true id="step1">
                    <img src="../imgs/m1.jpg" alt="">
                    <div class="describe">
                    <span class="num">1</span>
                    <p class="txt">进入要买车手机端首页，选择爱车的交付城市，即为提车地。</p>
                    <span class="arrow"><img src="../imgs/bottom_arrow.png" alt=""></span>
                    </li>

                    <li>
                    <img src="../imgs/m2.jpg" alt="">
                    <div class="describe">
                    <span class="num">2</span>
                    <p class="txt">找到您想要购买的车款并进行购车试算。</p>
                    <span class="arrow"><img src="../imgs/bottom_arrow.png" alt=""></span>
                    </li>

                    <li>
                    <img src="../imgs/m3.jpg" alt="">
                    <div class="describe">
                    <span class="num">3</span>
                    <p class="txt">分别选择适合您的贷款方案（全款购车不需要选），车险，精品和牌证服务后即可支付定金。</p>
                    <span class="arrow"><img src="../imgs/bottom_arrow.png" alt=""></span>
                    </li>

                    <li>
                    <img src="../imgs/m4.jpg" alt="">
                    <div class="describe">
                    <span class="num">4</span>
                    <p class="txt">提供您的姓名和手机号，以便要买车为您提供线下服务。若您拥有且使用了优惠券，会在购车总额中直接扣除。支付定金后即为订单提交成功。</p>
                    <span class="arrow"><img src="../imgs/bottom_arrow.png" alt=""></span>
                    </li>

                    <li>
                    <img src="../imgs/m5.jpg" alt="">
                    <div class="describe">
                    <span class="num">5</span>
                    <p class="txt">客服经理会在您下单后2小时内与您联系并确认订单信息(非  工作日内或工作日16:00后下单，则顺延至下一个工作日），同时跟您预约到线下交付中心的时间。</p>
                    <span class="arrow"><img src="../imgs/bottom_arrow.png" alt=""></span>
                    </li>

                    <li>
                    <img src="../imgs/m6.jpg" alt="">
                    <div class="describe">
                    <span class="num">6</span>
                    <p class="txt">我们的交付中心会有融保专员为您提供车贷服务。</p>
                    <span class="arrow"><img src="../imgs/bottom_arrow.png" alt=""></span>
                    </li>

                    <li id="step2" islinkage=true  id="step2">
                    <img src="../imgs/m7.jpg" alt="">
                    <div class="describe">
                    <span class="num">7</span>
                    <p class="txt">您的爱车到店后即可验车，客服经理将在现场对车况为您作详尽解说。</p>
                    <span class="arrow"><img src="../imgs/bottom_arrow.png" alt=""></span>
                    </li>

                    <li>
                    <img src="../imgs/m8.jpg" alt="">
                    <div class="describe">
                    <span class="num">8</span>
                    <p class="txt">我们为您提供车险、精品和牌证服务。</p>
                    <span class="arrow"><img src="../imgs/bottom_arrow.png" alt=""></span>
                    </li>

                    <li  style="margin-bottom:0;" class="com step" islinkage=true  id="step3">
                    <img src="../imgs/m9.jpg" alt="">
                    <div class="describe">
                    <span class="num">9</span>
                    <p class="txt">交车啦，终于可以把爱车开回家了</p>
                    <!--<span class="arrow"><img src="../imgs/bottom_arrow.png" alt=""></span>-->
                    </li>
                </ol>
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
                msg:'这里返回数据'
            }
        },
        //这里才是route的生存周期
        route:{

            data: function(transition) {
                var _this = this;

                /*YMC.waitDomInsert(function(){
                    if($(".fax").length>0){
                        var $navlist = $('#tag-step .item'),
                            steps = $('[islinkage=true]');
                        $arr = $(_this.linkagefn());
                        _this.tagScroll($navlist, steps, $arr);
                        _this.linkageMovefn($(window).scrollTop()+1, $arr, $navlist);
                        return true;
                    }
                });*/

                transition.next()
            }
        }
    }
</script>
<style type="text/css">
.car-proc{
    background: #f8f8f8;
}
.car-proc .text-box{
    padding-top: 50px;
}
.car-proc .text{
    border-bottom: 1px solid #e4e4e4;
}
.car-proc .text div{
    float: left;
    width: 33.33%;
    text-align: center;
    padding: 15px 0;
    box-sizing: border-box;
    border-left:1px solid #e4e4e4;
    font-size: 14px;
    color:#999999;
}
.car-proc .text div:first-child{
    border-left:0;
}
.car-proc .text-box .m1{
    background-color:#ffd200;
    color: #725d00;
}
.car-proc .fax{
    text-align: center;
    padding-top:55px;
}
.car-proc .fax img{
    max-width:100%;
}
.car-proc .arrow img{
    position:absolute;
    position: absolute;
    top: 14px;
    left: 14px;
}
.car-proc #tag-step{position:fixed;z-index:9;top:50px;width:100%;left:0;height:44px;}
.car-proc .step-list li{
    position:relative;
    margin-bottom:36px;
}
.car-proc .step-list .describe{
    position:absolute;
    z-index:2;
    width:100%;
    left:0;
    bottom:26px;
    color:#fff;
    text-align:center;
}
.car-proc .step-list .describe .num{
    display:inline-block;
    height:34px;
    font-size:16px;
    min-width:24px;
    line-height:38px;
    border:1px solid #fff;
    color:#fff;
    width:19px;
}
.car-proc .step-list .describe .txt{
    font-size:12px;
    line-height:22px;
    /*max-height:52px;*/
    margin:5px auto;
    overflow:hidden;
    padding: 0 10px;
}
.car-proc .step-list .describe .arrow{
    position:absolute;
    left:50%;
    bottom:-42px;
    margin-left:-19px;
    width:38px;
    height:38px;
    line-height:70px;
    background:#fff;
    border-radius:50px;
    box-shadow:0 0 15px 0 rgba(0,0,0,.2);
}
.car-proc .step-list .describe .arrow-down{
    display:inline-block;
    vertical-align:middle;
    width:10px;
    height:8px;
    /*background:url(../Images/usserver_sprites.png) no-repeat -10px 0;*/
}
.car-proc .step-list .describe .com{
    margin-bottom: 0;
}
</style>