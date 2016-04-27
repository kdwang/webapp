<template>
  <div class="vcar mainautow mainhd mainbtm">
    <div class="main_cnt">
      <template v-for="(index, prodGroup) in data_productTypeList">
        <div class="item item_arr-up clearfix">
          <div class="item_left">{{prodGroup.typeName}}</div>
          <div class="item_right">&nbsp;</div>
        </div>
        <div class="pak_info">
          <ul class="pak_prod">
            <li v-for="(index, prod) in prodGroup.productList" class="prod_item" data-price="{{prod.ymcPrice}}" data-iselect="{{ prod.isSelect === true ? 'true' : 'false'}}" data-gid="{{prod.groupId === null ? '00000000-0000-0000-0000-000000000000' : prod.code }}">
              <a ubt="detail_{{prod.id}}" class="prod_item-main item_arr-right" v-link="{name: 'selected_package-detail'}">
                <h2 class="prod_name ellips">{{prod.name}}</h2>
                <p class="prod_desc ellips_line2">{{prod.description}}</p>
                <p class="prod_price">&yen;{{prod.ymcPrice}}</p>
                <div ubt="chk_{{prod.groupId}}" class="prod_pic">
                  <img v-bind:src="'http://img.yaomaiche.com'+ prod.picUrl">
                  <i class="ico_checkbox2" v-bind:class="{'ico_checkbox2-on':prod.isSelect}"></i>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </template>
    </div>
    <div class="fixbtm abs_size clearfix" style="z-index:5;">
      <div ubt="btnSave" class="btn_save">确认自选方案</div>
      <p class="accessory_sum accessory_sum-left">小计<span id="totalPrice" data-price="0" class="price cor_red">¥0</span></p>
    </div>
  </div>
</template>
<script>
// Vue.config.debug = true
  module.exports = {
    //props: ['父组建传的值'],
    data:function(){
      // console.log('1-1这里是组建的data,在route的 canActivate之后调用');
      return {
        data_productTypeList: [{
          description: ''
        }]
      }
    },
    //这里才是route的生存周期
    route:{
      //waitForData: true, //数据加载完毕后再切换试图，也就是 点击之后先没反应，然后数据加载完，再出发过渡效果
      canActivate:function(transition){
        //console.log('canActivate阶段，可以做一些用户验证的事情');
        //return authenticationService.isLoggedIn()
        // console.log('1-canActivate');
        //debugger;
        return true;
      },
      activate:function(transition){
        //console.log('active');
        // console.log('2-activate');
        transition.next();
        //此方法结束后，api会调用afterActivate 方法
        //在aftefActivate中 会给组件添加  属性 并设置为true
      },
      data: function(transition) {
        var _this = this;
        // console.log('3-data--在 data 中获取数据比在 activate 中更加合理 见http://vuejs.github.io/vue-router/zh-cn/pipeline/data.html');
          //setTimeout(function(){
            //在 transition.next({a:1}) 之前
            //这里 _this. 是 true  因为此时获取
            //transition.next(); //这里必须要设置一个值 不能是 transition.next();
            //这里 _this. 就是false了。  vue-router.js :2250 左右
          //},3000);

        //测试
        router.app.loadingShow = true
        setTimeout(function(){

          var isdata = {
              "success": true,
              "result": {
                  "totalPrice": 4149.00,
                  "productTypeList": [{
                      "typeName": "安全出行",
                      "productList": [{
                          "description": "(辣椒红，适合9个月-12岁) 国际一流品质，正品保证，内置ISOFIX接口",
                          "isSelect": false,
                          "groupId": null,
                          "id": "3fcd6265-300e-4752-8eca-1e17448bec48",
                          "code": null,
                          "name": "英国宝得适Britax 百变骑士(辣椒红)",
                          "picUrl": "/upload/image/original/carGoods/3d97eebc-5979-4d3f-99dd-f9fc5b1a5cb4.jpg",
                          "ymcPrice": 3280.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 4280.00
                      }, {
                          "description": "价格已包含安装费",
                          "isSelect": false,
                          "groupId": null,
                          "id": "fc97a128-3276-4ff5-86e2-291a394ffeb4",
                          "code": "",
                          "name": "铁将军倒车雷达 八探头(方形)",
                          "picUrl": "/upload/image/original/carGoods/e4211718-540f-444f-86db-496609e30972.jpg",
                          "ymcPrice": 798.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 798.00
                      }, {
                          "description": "外置胎压，即插即用，实时检测，一屏同显",
                          "isSelect": false,
                          "groupId": null,
                          "id": "0e48f222-6cb1-4a90-bf6d-33385e3ec7f0",
                          "code": null,
                          "name": "好帮手丰诺胎压监测(外置)",
                          "picUrl": "/upload/image/original/201511/021452233651.jpg",
                          "ymcPrice": 798.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 998.00
                      }, {
                          "description": "(限量版公主粉，适合9个月-12岁) 德国原装进口，儿童座椅创始者，可接ISOFIX接口",
                          "isSelect": false,
                          "groupId": null,
                          "id": "46bcd19f-e4e4-42d6-8e2f-37544518c63a",
                          "code": null,
                          "name": "德国斯迪姆STM 变形金刚(限量版公主粉)",
                          "picUrl": "/upload/image/original/carGoods/2a438052-d243-4cc8-b294-72dc163a52a2.jpg",
                          "ymcPrice": 2280.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 2980.00
                      }, {
                          "description": "(限量版王子蓝，适合9个月-12岁)德国原装进口，儿童座椅创始者，可接ISOFIX接口",
                          "isSelect": false,
                          "groupId": null,
                          "id": "29c9726a-2574-4c66-b46d-38b079e924e2",
                          "code": null,
                          "name": "德国斯迪姆STM 变形金刚(限量版王子蓝)",
                          "picUrl": "/upload/image/original/carGoods/a41ac422-c53f-4601-bef1-8ae5e2854df9.jpg",
                          "ymcPrice": 2280.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 2980.00
                      }, {
                          "description": "价格已包含安装费",
                          "isSelect": false,
                          "groupId": null,
                          "id": "e4482013-4561-4345-8560-4edbc20163dc",
                          "code": "",
                          "name": "铁将军倒车雷达 四探头(长条形)",
                          "picUrl": "/upload/image/original/carGoods/9b8536a2-5ccd-4766-b1a4-81851bade488.jpg",
                          "ymcPrice": 428.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 499.00
                      }, {
                          "description": "(祈福苹果，适合9个月-12岁) 安全承诺品牌，专注儿童座椅12年，内置ISOFIX接口",
                          "isSelect": false,
                          "groupId": null,
                          "id": "72a4d726-8965-4754-af1e-886542c46882",
                          "code": null,
                          "name": "惠尔顿Welldon 酷睿宝(祈福苹果)",
                          "picUrl": "/upload/image/original/carGoods/904d842c-665f-49db-bf87-33e82f9dce8e.jpg",
                          "ymcPrice": 998.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 1298.00
                      }, {
                          "description": "价格已包含安装费",
                          "isSelect": false,
                          "groupId": null,
                          "id": "b7a3113f-9b22-4897-a619-a6ce1e4aaefc",
                          "code": "",
                          "name": "铁将军倒车雷达 四探头{方形)",
                          "picUrl": "/upload/image/original/carGoods/a2307ef1-7070-4158-9831-facc383aae74.jpg",
                          "ymcPrice": 498.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 538.00
                      }, {
                          "description": "(蒂凡尼蓝，适合9个月-12岁) 安全承诺品牌，专注儿童座椅12年，内置ISOFIX接口",
                          "isSelect": false,
                          "groupId": null,
                          "id": "b5ef8ed5-6617-4dac-959c-b06802f2fe3f",
                          "code": null,
                          "name": "惠尔顿Welldon 酷睿宝(蒂凡尼蓝)",
                          "picUrl": "/upload/image/original/carGoods/a42d43b5-8df9-41aa-bd3f-e0e56cb50f65.jpg",
                          "ymcPrice": 998.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 1298.00
                      }, {
                          "description": "(斑马色，适合9个月-12岁) 国际一流品质，正品保证，内置ISOFIX接口",
                          "isSelect": false,
                          "groupId": null,
                          "id": "8f8a557a-b535-4d1b-a7ba-c00e81703b20",
                          "code": null,
                          "name": "英国宝得适Britax 百变骑士(斑马色)",
                          "picUrl": "/upload/image/original/carGoods/92dcf7c4-c67e-4155-819b-49dcd9c5e955.jpg",
                          "ymcPrice": 3280.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 4280.00
                      }]
                  }, {
                      "typeName": "车内生活",
                      "productList": [{
                          "description": "(咖啡色) 冬季专用，高密度短毛绒，舒适保暖，健康环保",
                          "isSelect": false,
                          "groupId": null,
                          "id": "1ebb06d4-d6c1-4d43-b490-32653f5e25f9",
                          "code": null,
                          "name": "冬季坐垫(咖啡色)",
                          "picUrl": "/upload/image/original/carGoods/39139d23-d172-4ccb-a374-70714a4b0079.jpg",
                          "ymcPrice": 298.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 398.00
                      }, {
                          "description": "(6L) 全国知名品牌，制冷制热效果好，时尚便捷，车旅生活必备",
                          "isSelect": false,
                          "groupId": null,
                          "id": "4fcbc5ef-03ff-4f03-8224-48a01133b3c1",
                          "code": null,
                          "name": "NFA纽福克斯车载冷暖箱(6L)",
                          "picUrl": "/upload/image/original/carGoods/a6c6367f-efc7-4874-ad52-0db4d0b8f2cd.jpg",
                          "ymcPrice": 229.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 309.00
                      }, {
                          "description": "(黑色) 英国品质，正品保证，智能加热，安全环保",
                          "isSelect": false,
                          "groupId": null,
                          "id": "8856f384-c7f4-443e-a47a-71621a8d6643",
                          "code": null,
                          "name": "TOMIC车载保温杯(黑色)",
                          "picUrl": "/upload/image/original/carGoods/c3fa9aa1-710d-45ef-a7c1-e9ff944dcb52.jpg",
                          "ymcPrice": 298.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 398.00
                      }, {
                          "description": "(金色) 英国品质，正品保证，智能加热，安全环保",
                          "isSelect": false,
                          "groupId": null,
                          "id": "5d0321d0-58d0-419c-a1dd-79c37a635870",
                          "code": null,
                          "name": "TOMIC车载保温杯(金色)",
                          "picUrl": "/upload/image/original/carGoods/ab82e870-5d22-4758-839d-b40405adf6da.jpg",
                          "ymcPrice": 298.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 398.00
                      }, {
                          "description": "(12L) 全国知名品牌，制冷制热效果好，时尚便捷，车旅生活必备",
                          "isSelect": false,
                          "groupId": null,
                          "id": "183616bd-3bb1-4690-bb40-b653ed8f0611",
                          "code": null,
                          "name": "NFA纽福克斯车载冷暖箱(12L)",
                          "picUrl": "/upload/image/original/carGoods/7d61d3f8-e512-40e7-833a-4a955ff5ca5e.jpg",
                          "ymcPrice": 329.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 429.00
                      }, {
                          "description": "颜色随机发货",
                          "isSelect": false,
                          "groupId": null,
                          "id": "2719e041-926c-4aa1-bf4f-bd52e244a6cf",
                          "code": "",
                          "name": "香片",
                          "picUrl": "/upload/image/original/carGoods/571b8960-742c-42b4-86a1-79964c53a898.jpg",
                          "ymcPrice": 58.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 96.00
                      }, {
                          "description": "(米黄色) 冬季专用，高密度短毛绒，舒适保暖，健康环保",
                          "isSelect": false,
                          "groupId": null,
                          "id": "6214dbd1-b221-4609-9fa6-c3806fb050b1",
                          "code": null,
                          "name": "冬季坐垫(米黄色)",
                          "picUrl": "/upload/image/original/carGoods/92966fa8-5e94-4e14-96a2-efdff170c5bb.jpg",
                          "ymcPrice": 298.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 398.00
                      }, {
                          "description": "(灰色) 冬季专用，高密度短毛绒，舒适保暖，健康环保",
                          "isSelect": false,
                          "groupId": null,
                          "id": "8d1e941b-175f-4656-964e-e7eea612267a",
                          "code": null,
                          "name": "冬季坐垫(灰色)",
                          "picUrl": "/upload/image/original/carGoods/d8b729ee-ebfd-4c6d-ba08-e25725964231.jpg",
                          "ymcPrice": 298.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 398.00
                      }, {
                          "description": "车载后备一箱搞定，超强抗压，PP环保材质，出游必备",
                          "isSelect": false,
                          "groupId": null,
                          "id": "7d6f6932-1080-404a-90b8-f6d120b73e12",
                          "code": null,
                          "name": "禧天龙车用整理箱(45L)",
                          "picUrl": "/upload/image/original/201511/021549367312.jpg",
                          "ymcPrice": 115.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 215.00
                      }]
                  }, {
                      "typeName": "配置升级",
                      "productList": [{
                          "description": "卡仕达专用外置胎压监测，价格已包含安装费",
                          "isSelect": false,
                          "groupId": null,
                          "id": "fa92168a-9c82-4cde-b299-4e2b4d3cddf4",
                          "code": "",
                          "name": "卡仕达导航专用外置胎压监测(含安装费)",
                          "picUrl": "/upload/image/original/carGoods/b010e545-7388-486a-891a-b014a480f480.jpg",
                          "ymcPrice": 798.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 880.00
                      }, {
                          "description": "4S店专供系列，领先科技，全时护航，质保三年",
                          "isSelect": false,
                          "groupId": null,
                          "id": "6e528f62-a4a3-40b6-945c-599e41a9b3d8",
                          "code": null,
                          "name": "卡仕达WINCE导航",
                          "picUrl": "/upload/image/original/201511/051317026678.jpg",
                          "ymcPrice": 2280.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 3080.00
                      }, {
                          "description": "卡仕达导航专用行车记录仪-飞畅(送8G卡)",
                          "isSelect": false,
                          "groupId": null,
                          "id": "4f018b75-c877-41cc-af09-f815902f8268",
                          "code": "",
                          "name": "卡仕达导航专用行车记录仪-飞畅(送8G卡)",
                          "picUrl": "/upload/image/original/carGoods/427e5088-1071-4f20-be15-5798795590c5.jpg",
                          "ymcPrice": 380.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 530.00
                      }]
                  }, {
                      "typeName": "新车必备",
                      "productList": [{
                          "description": "已包含施工费",
                          "isSelect": true,
                          "groupId": null,
                          "id": "85aa77cd-bdb9-4d01-b397-199c82816c7c",
                          "code": "",
                          "name": "3M太阳膜组合-晶锐90+晶锐40(适用SUV或MPV)",
                          "picUrl": "/upload/image/original/carGoods/b0736b62-c7a3-4341-90c6-2a18caf7d42d.jpg",
                          "ymcPrice": 3351.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 4650.00
                      }, {
                          "description": "已包含施工费",
                          "isSelect": false,
                          "groupId": null,
                          "id": "9a63030a-5dc3-41aa-808f-2fce51509f5b",
                          "code": "",
                          "name": "3M太阳膜-璀璨风光+蓝色魔力(适用SUV或MPV)",
                          "picUrl": "/upload/image/original/carGoods/861f1162-9c7f-48f3-8e63-03106ce4859b.jpg",
                          "ymcPrice": 1440.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 2230.00
                      }, {
                          "description": "高清夜视，极致轻薄，170广角，1080镜头，含移动侦测和停车监控",
                          "isSelect": false,
                          "groupId": null,
                          "id": "8560f964-4fef-462e-acbb-33357a0a28a5",
                          "code": null,
                          "name": "第一现场  行车记录仪D-162",
                          "picUrl": "/upload/image/original/201511/101845174711.jpg",
                          "ymcPrice": 284.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 442.00
                      }, {
                          "description": "行车记录仪第一品牌中最经典的明星产品，1080P真高清真广角，夜视再增强",
                          "isSelect": true,
                          "groupId": null,
                          "id": "3dee2c9d-0a73-462c-8dac-43d709d5e3b4",
                          "code": "",
                          "name": "PAPAGO New P1W行车记录仪(送8G卡)",
                          "picUrl": "/upload/image/original/carGoods/597cf3f3-0d3b-4c14-9056-83c8f74329a0.jpg",
                          "ymcPrice": 499.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 699.00
                      }, {
                          "description": "大厂出品，国际品质，安霸A7顶级芯片带来1296P超高清画质",
                          "isSelect": false,
                          "groupId": null,
                          "id": "0da975d4-0807-44d7-8df0-594ea552afac",
                          "code": "",
                          "name": "惠普HP F520G行车记录仪(送8G卡)",
                          "picUrl": "/upload/image/original/carGoods/1ac56998-426a-4287-b672-5c881af847ec.jpg",
                          "ymcPrice": 899.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 1099.00
                      }, {
                          "description": "(黑色和红色随机)单手操作，使用方便，兼容绝大部分手机",
                          "isSelect": false,
                          "groupId": null,
                          "id": "79b43e49-5be5-4c46-9eaa-5e9e9f9d8bba",
                          "code": "",
                          "name": "知路手机支架(出风口式)",
                          "picUrl": "/upload/image/original/carGoods/315ccb51-0e07-4ba5-92d1-3b04a7b4380d.jpg",
                          "ymcPrice": 29.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 49.00
                      }, {
                          "description": "专车专用，舒适脚感，环保无异味，6色可选",
                          "isSelect": false,
                          "groupId": null,
                          "id": "09b428f0-0cc7-47cf-a7d9-5f5f30d19f72",
                          "code": null,
                          "name": "北京大象 超弹丝包围全覆盖脚垫(适用非7座)",
                          "picUrl": "/upload/image/original/201510/231518094752.jpg",
                          "ymcPrice": 599.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 799.00
                      }, {
                          "description": "国际品质，杯形便携，双点烟器，双USB充电器，LED指示灯",
                          "isSelect": false,
                          "groupId": null,
                          "id": "103366d1-093e-41f2-a62d-7d5d20254e94",
                          "code": null,
                          "name": "米其林一拖二点烟器",
                          "picUrl": "/upload/image/original/carGoods/ba966363-fca9-4ca7-8507-7546c11f843d.jpg",
                          "ymcPrice": 89.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 119.00
                      }, {
                          "description": "专车专用，环保无异味，4色可选",
                          "isSelect": false,
                          "groupId": null,
                          "id": "d2654772-32a1-4770-a893-7dcf4ac332f2",
                          "code": null,
                          "name": "北京大象 超弹丝后备箱垫",
                          "picUrl": "/upload/image/original/201510/231518398231.jpg",
                          "ymcPrice": 259.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 399.00
                      }, {
                          "description": "专车专用，可拆卸易清理，环保无异味，12色组合可选",
                          "isSelect": false,
                          "groupId": null,
                          "id": "80fdbbc6-f3bf-4c95-815e-96bffd527726",
                          "code": null,
                          "name": "北京大象 皮革包围+超弹丝二合一脚垫",
                          "picUrl": "/upload/image/original/201510/231519017429.jpg",
                          "ymcPrice": 499.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 699.00
                      }, {
                          "description": "专车专用，材质环保，易清洁打理。",
                          "isSelect": false,
                          "groupId": null,
                          "id": "f0ff43c1-23af-456f-b975-a8713ab851b3",
                          "code": "",
                          "name": "轩利 专车专用杭绣后备箱垫",
                          "picUrl": "/upload/image/original/201511/021353405828.jpg",
                          "ymcPrice": 119.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 168.00
                      }, {
                          "description": "大厂出品，国际品质，安霸A7芯片+顶级蓝镜给您全新驾驶体验",
                          "isSelect": false,
                          "groupId": null,
                          "id": "b921e538-029c-4213-8f95-a9f5e8fe5f7f",
                          "code": "",
                          "name": "惠普HP F710行车记录仪(送8G卡)",
                          "picUrl": "/upload/image/original/carGoods/423e863c-acd9-4eda-9648-589a40b2abe8.jpg",
                          "ymcPrice": 699.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 899.00
                      }, {
                          "description": "国际品质，杯形便携，双点烟器，双USB充电器，LED指示灯",
                          "isSelect": false,
                          "groupId": null,
                          "id": "c1b6bbfa-07c1-4641-b6fb-b774b846b610",
                          "code": null,
                          "name": "米其林车载USB充电器",
                          "picUrl": "/upload/image/original/carGoods/31c02136-0d05-46ee-96c3-ecefcec9c891.jpg",
                          "ymcPrice": 62.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 92.00
                      }, {
                          "description": "行车记录仪第一品牌中性价比最高的产品，使用安霸A7芯片，小身材高性能",
                          "isSelect": false,
                          "groupId": null,
                          "id": "15898a7c-3f60-473a-9297-bf307aaceb34",
                          "code": "",
                          "name": "PAPAGO 115行车记录仪(送8G卡)",
                          "picUrl": "/upload/image/original/carGoods/df7adc73-1634-4353-89b8-3eab23efee1d.jpg",
                          "ymcPrice": 399.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 599.00
                      }, {
                          "description": "(黑色和红色随机)单手操作，使用方便，兼容绝大部分手机",
                          "isSelect": false,
                          "groupId": null,
                          "id": "69acb697-2467-49a7-8441-bf4a726d3b2d",
                          "code": "",
                          "name": "知路手机支架(吸盘式)",
                          "picUrl": "/upload/image/original/carGoods/701e95ed-790e-44e6-9871-5f0b7da37fcb.jpg",
                          "ymcPrice": 29.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 49.00
                      }, {
                          "description": "前后双录，高清1080P，170度广角，5英寸大屏，含移动侦测和停车监控",
                          "isSelect": false,
                          "groupId": null,
                          "id": "a9b66321-c213-49bb-bcdb-cc71c943f169",
                          "code": null,
                          "name": "第一现场  行车记录仪D-192",
                          "picUrl": "/upload/image/original/201511/101845045458.jpg",
                          "ymcPrice": 642.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 2376.00
                      }, {
                          "description": "德盾环保无味丝圈脚垫",
                          "isSelect": true,
                          "groupId": null,
                          "id": "6ed31f67-e9f8-4dce-bc6f-cd7ba67fb820",
                          "code": "",
                          "name": "环保无味丝圈脚垫",
                          "picUrl": "/upload/image/original/carGoods/a7a06e07-e9f2-442d-beb6-42cb5a9454f6.jpg",
                          "ymcPrice": 299.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 329.00
                      }, {
                          "description": "专车专用，环保无异味，6色可选",
                          "isSelect": false,
                          "groupId": null,
                          "id": "c6d16931-bbe0-4415-a2bd-e90cf1212968",
                          "code": null,
                          "name": "北京大象 皮革后备箱垫",
                          "picUrl": "/upload/image/original/201510/231519406443.jpg",
                          "ymcPrice": 199.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 299.00
                      }, {
                          "description": "3M太阳膜组合——田园风光+瑞丽冰酷(适用SUV或MPV)",
                          "isSelect": false,
                          "groupId": null,
                          "id": "981dc022-f41a-40a9-bfa6-eb057d8d3d36",
                          "code": "",
                          "name": "3M太阳膜组合-田园风光+瑞丽冰酷(适用SUV或MPV)",
                          "picUrl": "/upload/image/original/carGoods/5bc016bc-a62e-4e19-8f03-d83600fe991d.jpg",
                          "ymcPrice": 2640.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 3150.00
                      }, {
                          "description": "世界知名品牌-美国威力特，畅销20多个国家和地区",
                          "isSelect": false,
                          "groupId": null,
                          "id": "750c91a5-26ff-4ca1-be85-ff241b7689dc",
                          "code": "",
                          "name": "车内除甲醛空气净",
                          "picUrl": "/upload/image/original/carGoods/86b27b72-64a5-47df-9fa4-cd70af3ddda3.jpg",
                          "ymcPrice": 158.00,
                          "officialPrice": 0.0,
                          "marketlPrice": 198.00
                      }]
                  }]
              },
              "error": null,
              "unAuthorizedRequest": false
          };
          _this.data_productTypeList = isdata.result.productTypeList;
          router.app.loadingShow = false;

        },500);

        //测试-end

        transition.next()

      },
      deactivate: function (transition) {
        // console.log('4');
        // console.log('Bar 销毁!')
        transition.next()
      }
    },
    methods: {
      //方法
    },
    ready: function(){

      var _this = this;



      // load the content
      /*YMC.ajax({
        url: 'Products/ShoppingCart/GetProductList',
        showLoading: true,
        data: {shoppingCartID : _this.shoppingCartID},
        success: function (res) {

          _this.data_productTypeList = res.result.productTypeList;

          Vue.nextTick(function () {
            //
          });
        },
        error: function(e){
            // UI.alert("网络连接失败，请稍后再试", 1500, function(){
            //     //$(".uiload").hide();
            // });
        }
      });
      */


      // Vue.nextTick(function () {});
    }
  }
</script>
<style src="../css/car.css"></style>