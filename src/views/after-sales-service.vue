<template>
<div id="after-service" class="after-service">
    <div class="img">
     <img src="../imgs/aus.jpg" width="100%" />
    </div>
    <div class="article1">
        <h2>车辆商品售后服务说明：</h2>
        <dl>
            <dt>
                1.汽车三包：
            </dt>
            <dd>
                <p>依据《家用汽车产品修理、更换、退货责任规定》 （2013 年 10 月 1 日施行）（也称 “汽车三包规定”），汽车三包指销售者因汽车产品质量问题，依法对消费者承担汽车产品修 理、更换、退货的责任。销售者依照规定承担三包责任后，属于生产者的责任或者属于其他 经营者的责任的，销售者有权向生产者、其他经营者追偿。具体车型的三包责任条款由生产 者向国家质检总局备案。</p>
                <p>消费者的三包权益受上述规定保护，“要买车”平台上所售车辆全部是国内外正规汽车 制造厂商生产的经检验合格的新车（包含国产车和汽车厂商在中国大陆境内直接经销的合 法进口车），拥有可溯源的唯一车辆识别代号（VIN），消费者可凭“三包凭证”和购车发票 等依法享受同等的“三包”权益。 </p>
                <p> 更换、退货受理点：要买车全国各个城市的交付中心门店。具体分布<a v-link="{name:'turnCenter'}">请点击查看</a>；</p>
                <p>维修受理点：要买车特约服务网点及其它同品牌 4S 店；</p>
                <p>车辆三包细则：以随车交付资料中《三包凭证》的说明内容为准。您也可访问“中国汽 车三包网”，按如下操作查询生产商对每一款车的三包备案信息：</p>
                <p>a．访问“中国汽车三包网”，网址是 <a v-link="{name: 'third-party', query:{target:'http://www.qcsanbao.cn/',txt:'中国汽车三包网'}}">http://www.qcsanbao.cn/</a>;</p>
                <p>b.在下图红色填充框内输入您关注的车辆型号名称，如“奥迪、Q5、40 TFSI 舒适型”， 并执行“查询”动作；</p>
                <span><img src="../imgs/pic_1.jpg" /></span>
                <p>c.在弹出的查询结果页面中，点击结果记录行对象，访问车辆三包详情页面：</p>
                <span><img src="../imgs/pic_2.jpg" /></span>
                <p>d．在弹出的车辆三包详情页面，详细浏览阅读：</p>
                <span><img src="../imgs/pic_3.jpg" /></span>
            </dd>
        </dl>
        <dl>
            <dt>
                2. 保养、维修：
            </dt>
            <dd>
                <p>与汽车产品质量问题无关的日常保养或维修，消费者可前往任何一家同品牌 4S 店（无 地域限制）或任意拥有合法资质的其它维修保养机构。如前往同品牌 4S 店进行日常保养或 维修，只需出具行驶证和保养手册（无需提供购车发票等其他证明文件）。</p>
                <p>具体每一个品牌 4S 店网点的最新详细分布情况，请访问对应品牌官网查看。<a v-link="{name:'car-brand-site'}">品牌官网</a></p>
            </dd>
        </dl>
        <dl>
            <dt>
                3. 30天无理由退车：
            </dt>
            <dd>
                <p>用户在要买车购车 30 日内（自提车之日起，含 30 日），在确保车辆完好的情况下，可无理由退车。</p>
                <p>
                 具体操作细则请详见《<a v-link="{name:'refund-notice'}">要买车 30 天无理由退车服务说明</a>》
                </p>
                <p>备注：三包凭证、维修保养手册、购车发票由我司于新车交付时提交给消费者。</p>
            </dd>
        </dl>
        <h2 class="afs-pd">精品商品售后服务说明</h2>
        <p>要买车销售的所有精品商品，均享受国家规定的三包服务承诺。</p>
   </div>
</div>
</template>

<script>
module.exports = {
    ready: function() {
        Vue.nextTick(function() {
            // 如果在车达人APP内隐藏头部
            var elc = document.getElementsByClassName('hd')[0],
                eli = document.getElementById('aboutUs');
            if (Prius.isCarMaster) {
                elc.style.display = "none";
                eli.style.paddingTop = 0;

            } else {
                elc.style.display = "block";
            }
        });
    }
}
</script>

<style>
.after-service {
    padding: 0 0 20px;
    color:#585959;
    background-color: #ffffff;
}
.after-service .img{padding-top: 50px;}
.after-service h2 {
    color: #000;
    font-size: 0.8rem;
    font-weight: normal;
    line-height: 30px;
    background-color:rgb(217,217,217);
    padding: 0 10px;
}

.after-service h2.afs-pd{
    margin-bottom: 10px;
}
.after-service p,
.after-service span{
    font-size: 0.8rem;
}
.after-service p  a{
    color: #000;
    text-decoration: underline;
}
.after-service p{
    text-indent: 2em;
    line-height: 20px;
    padding: 0 0 4px;
}
.after-service dl{
    padding: 5px 0 0;
}
.after-service dt{
    line-height: 30px;
    font-weight: bold;
    font-size: 0.8rem;
}
.after-service span img{
    padding: 5px 0 0;
    width: 100%;
}
</style>