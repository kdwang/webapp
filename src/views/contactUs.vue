<template>
<div  class="mainautow mainhd">
    <div id="contactUs" class="contactUs">
        <h2>要买车客服热线</h2>
        <ul class="s1">
            <li class="num"><a href="tel:4009289099">400-928-9099</a></li>
        </ul>
        <h2>要买车总部</h2>
        <ul class="s1">
            <li class="add">上海市普陀区云岭东路599弄11号楼15-16层</li>
            <!-- <li class="num"><a href="tel:021-52559255">021-52559255</a></li> -->
            <li class="mail"><span>200062</span></li>
        </ul>
        <div class="addImg">
            <img src="../imgs/cMap_03.jpg" width="100%" alt="公司位置地图坐标" />
            <img src="../imgs/cMap_05.jpg" width="100%" alt="公司位置地图坐标" />
            <img src="../imgs/cMap_06.jpg" width="100%" alt="公司位置地图坐标" />
        </div>
        <h2>要买车交付中心分布</h2>
        <ul class="s2" v-el:stores>
            <!--         <li class="first"><span>1</span>上海博大店</li>
            <li class="add">上海浦东新区国展路189号A-8(博大汽车公园)</li>
            <li class="num"><a href="tel:021-68380372">(021)68380372</a></li>
            <li class="first"><span>2</span>苏州石路店</li>
            <li class="add">苏州市姑苏区广济南路288号10008室（石路金座）</li>
            <li class="num"><a href="tel:021-52559255,6112">(021)52559255-6112</a></li>
            <li class="first"><span>3</span>杭州兴业店</li>
            <li class="add">杭州市下城区华中南路668号兴业财富大厦416室</li>
            <li class="num"><a href="tel:021-52559255,6151">(021)52559255-6151</a></li>
            <li class="first"><span>4</span>扬州广陵店</li>
            <li class="add">扬州市广陵区江苏信息产业基地二期11号A栋5楼</li>
            <li class="num"><a href="tel:021-52559255,6131">(021)52559255-6131</a><a class="ml10" href="tel:021-52559255,6132">(021)52559255-6132</a></li>
            <li class="first"><span>5</span>无锡崇安店</li>
            <li class="add">无锡市崇安区广益路287号801室</li>
            <li class="num"><a href="tel:021-52559255,6122">(021)52559255-6122</a></li>
            <li class="first"><span>6</span>南京江宁店</li>
            <li class="add">南京市江宁区东山街道竹山路68号万达广场E座1003,1004室</li>
            <li class="num"><a href="tel:021-52559255,6171">(021)52559255-6171</a><a class="ml10" href="tel:021-52559255,6172">(021)52559255-6172</a></li>
            <li class="first"><span>7</span>宁波鄞州店</li>
            <li class="add">宁波市鄞州区首南街道泰康中路666号迪趣大厦21楼2106室</li>
            <li class="num"><a href="tel:021-52559255,6161">(021)52559255-6162</a><a class="ml10" href="tel:021-52559255,6162">(021)52559255-6162</a></li>
            <li class="first"><span>8</span>盐城盐都店</li>
            <li class="add">盐城巿盐都区新都西路29号紫金大厦408室</li>
            <li class="num"><a href="tel:021-52559255,6191">(021)52559255-6191</a><a class="ml10" href="tel:021-52559255,6192">(021)52559255-6192</a></li>
            <li class="first"><span>9</span>徐州云龙店</li>
            <li class="add">徐州市云龙区绿地城市广场绿地瀛海写字楼A603室</li>
            <li class="num"><a href="tel:021-52559255,6181">(021)52559255-6181</a><a class="ml10" href="tel:021-52559255,6182">(021)52559255-6182</a></li>
            <li class="first"><span>10</span>合肥蜀山店</li>
            <li class="add">合肥市蜀山区望江西路69号西湖国际广场B座614-615</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>11</span>南昌高新店</li>
            <li class="add">南南昌市高新区紫阳大道2999号紫阳明珠C栋908室</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>12</span>北京石景山店</li>
            <li class="add">北京市石景山区古城西路94号首特钢创业大厦(A座）918、932室</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>13</span>济南高新店</li>
            <li class="add">济济南市高新区龙奥北街龙奥天街3号楼1507室</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>14</span>青岛市北店</li>
            <li class="add">青岛市市北区昆山路17号1006室</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>15</span>郑州郑东店</li>
            <li class="add">郑州巿郑东新区永平路北、康平路东2号楼404室</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>16</span>武汉武昌店</li>
            <li class="add">武汉市武昌区和平大道三角路水岸国际7号楼1114室</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>17</span>太原迎泽店</li>
            <li class="add">太原巿迎泽区双塔西街38号金广大厦606室</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>18</span>福州马尾店</li>
            <li class="add">福州市马尾区东江滨大道68号蓝波湾2号楼2319单元</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>19</span>广州天河店</li>
            <li class="add">广州市天河区长兴路5号B栋303室（天河客运站斜对面）</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>20</span>西安经开店</li>
            <li class="add">西安市经开区明光路72号旭弘光合中心910室（凤城六路以北）</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>21</span>成都武侯店</li>
            <li class="add">成都市武侯区聚龙路16号摩尔国际汽配广场2栋负1楼163号（农业银行楼下）</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>22</span>重庆南岸店</li>
            <li class="add">重庆巿南岸区学府大道路58 号互信星座32层4号</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>23</span>长沙星沙店</li>
            <li class="add">长沙市长沙县星沙开元路88号星隆国际广场16楼1611室（天华路交汇处）</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>24</span>沈阳浑南店</li>
            <li class="add">沈阳市浑南新区天成街路6号嘉龙中心B座1103室</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li>
            <li class="first"><span>25</span>石家庄新华店</li>
            <li class="add">石家庄市新华区西三庄大街256号格澜商务518室</li>
            <li class="first"><span>26</span>天津空港店</li>
            <li class="add">天津市空港经济区中环西路82号丽港大厦3-601</li>
            <li class="first"><span>27</span>深圳布吉店</li>
            <li class="add">深圳市龙岗区布吉街道布龙路28号德勤创大厦1606</li>
            <li class="first"><span>28</span>昆明盘龙店</li>
            <li class="add">昆明市盘龙区北京路1079号欣都龙城3幢12层12室（北辰大道交汇处）</li>
            <li class="first"><span>29</span>厦门集美店</li>
            <li class="add">厦门巿集美区中宛路13号金铸创意产业园602 室</li>
            <li class="first"><span>30</span>贵阳观山湖店</li>
            <li class="add">贵阳市观山湖区诚信北路8号绿地联盛国际4号楼1908室</li>
            <li class="first"><span>31</span>南宁青秀店</li>
            <li class="add">南宁市青秀区民族大道166号上东国际T2栋2516室</li>
            <li class="first"><span>32</span>保定高开店</li>
            <li class="add">保定市高开区天鹅西路333号世纪大厦1301室</li>

            <li class="first"><span>33</span>济宁任城区</li>
            <li class="add">山东省济宁市任城区金宇路红星国际1号SOHO东单元1216号房</li>

            <li class="first"><span>34</span>临汾国贸店</li>
            <li class="add">山西省临汾市开发区河汾路国贸写字楼B座701室(坂下路口交汇处)</li>

            <li class="first"><span>35</span>洛阳洛龙店</li>
            <li class="add">洛阳市洛龙区开元大道与长厦门街西侧863创智广场2号楼414室</li>

            <li class="first"><span>36</span>襄阳高新店</li>
            <li class="add">湖北省襄阳市高新区东风汽车大道路特1号锦绣soho1号楼1单元904室</li>

            <li class="first"><span>37</span>宜昌高新店</li>
            <li class="add">湖北省宜昌市高新技术开发区发展大道57－6号三峡云计算大厦产业楼1205室</li>

            <li class="first"><span>38</span>烟台开发区店</li>
            <li class="add">山东省烟台市开发区长江路11-7号中信大厦2315室</li>


            <li class="first"><span>39</span>邯郸高开店</li>
            <li class="add">邯郸市高开区世纪大街1号双子座大厦B座905</li>
            <li class="num"><a href="tel:400-928-9099">400-928-9099</a></li> -->
            <template v-for="item in storeName">
                <template v-for="item1 in item.storeList">
                    <li class="first" sysId = "{{item1.sysId}}"><span>{{item.firstLetter}}</span>{{item1.name}}</li>
                    <li class="add">{{item1.address}}</li>
                </template>
            </template>
        </ul>
    </div>
</div>
</template>

<script>
module.exports = {
    data: function(){
        return {
            ajaxUrl: 'Products/Store/GetAllStoreList',
            storeName : [],
            scrollTop : 0,
            curIndex  :0,
            scrollFn  :function(){}
        }
    },
    computed:{

    },
    route: {
        data: function(){
            var _this = this;
            var sysId = _this.$route.query.sysId;
            _this.scrollTop = 0;
            YMC.ajax({
                url: _this.ajaxUrl,
                showLoading:false,
                success: function(res) {
                    if(!res.success){
                        VUI.alert(res.error.message);
                        return;
                    }

                    _this.storeName = res.result.actionList;

                    var act = _this.storeName;
                    var find = false;
                    _this.$nextTick(function(){
                        for(var i in act){
                           for(var j=0;j<act[i].storeList.length;j++){
                                if(find){
                                    break;
                                }
                                _this.curIndex++;
                                if(act[i].storeList[j].sysId == sysId){
                                       setTimeout(function(){
                                            var el  = $(_this.$els['stores']).find('li.first').eq(_this.curIndex-1);
                                            if(Prius.isCarmaster){
                                                _this.scrollTop = el.offset().top-51;
                                            }else{
                                                _this.scrollTop = el.offset().top;
                                            }
                                            $(window).scrollTop(_this.scrollTop);
                                       },900);
                                       find = true;
                                    break;
                                }
                           }
                        }
                    });

                },
                complete: function(){}
            });
        },
        canDeactivate:function(transition){
        $(window).scrollTop(0);
          transition.next();
        }
    }
}
</script>

<style>
.contactUs{
    padding:0 0 60px;
    color:#727272;
    position: relative;
    background: #fff;
}
.contactUs a{
    color:#727272;
}
.contactUs h2{
    padding:10px 0 10px 4%;
    border-bottom:1px solid #eaeaea;
    border-left: 3px solid #c9152f;
    font-size:14px;
    line-height: 25px;
    min-height: 25px;
    font-weight:normal;
    color:#000;
}
.contactUs .addImg,
.contactUs .s1,
.contactUs .s2{
    padding:0 3%;
}
.contactUs .addImg{
    margin:10px 0 0;
    padding:0 3% 10px;
    border-bottom: 10px solid #f4f4f4;
}
.contactUs .addImg img{
    vertical-align: middle;
}
.contactUs ul li{
    line-height: 22px;
    min-height: 22px;
    padding:15px 0 15px 32px;
    border-bottom:1px solid #ebebeb;
    position: relative;
    color:#666;
}
.contactUs ul li.add:before,
.contactUs ul li.num:before,
.contactUs ul li.mail:before{
    content:"";
    display:block;
    height:24px;
    width:24px;
    background:url("../imgs/helpCenter.png") no-repeat 0 0;
    background-size:175px 209px;
    position:absolute;
    left: 2px;
    top: 15px;
}

.contactUs ul li.add:before{
    background-position:-41px  -24px;
}
.contactUs ul li.num:before{
    background-position:-41px  -59px;
}
.contactUs ul li.mail:before{
    background-position:-41px  -96px;
}

.contactUs .first{
    position: relative;
    color:#ffc12b;
}
.contactUs ul.s2 li:last-child{
    border:0 none;
}
.contactUs .first span{
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    left:0;
    top:50%;
    margin-top: -10px;
    border-radius: 50%;
    background: #ffc12b;
    color:#fff;
    text-align:center;
}
</style>