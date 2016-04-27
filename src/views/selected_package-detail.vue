<template>
<div class="vcar mainautow mainhd">
  <div class="main_cnt" data-id="{{res.id}}">
    <div class="img_wrap"><img v-bind:src="'http://img.yaomaiche.com'+ res.picUrl" /></div>
    <div class="item clearfix">
      <div class="item_left">商品价格</div>
      <div class="item_right"><span class="txt1">&yen;{{res.ymcPrice}}</span></div>
    </div>
    <div class="item clearfix"><div class="item_left">商品详情</div><div class="item_right">&nbsp;</div></div>
    <div class="item_detail1">
      <h3 class="item_detail1-title">商品展示</h3>
      <div v-if="res.description">{{{res.description}}}</div>
      <div v-else='!res.description'>暂无描述</div>
    </div>
  </div>
</div>
</template>
<script>
  module.exports = {
    //props: ['父组建传的值'],
    data:function(){
      // console.log('1-1这里是组建的data,在route的 canActivate之后调用');
      return {
        res: {}
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
        //测试
        router.app.loadingShow = true
        setTimeout(function(){

          var isdata = {
              "success": true,
              "result": {
                  "description": "<p>\n    <img style=\"float:none;width:600px;height:246px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/c2a8a63c-7980-4965-9fe7-990bb550a0da.png\" title=\"c2a8a63c-7980-4965-9fe7-990bb550a0da.png\" height=\"246\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n    <img style=\"float:none;width:600px;height:216px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/5d9df15c-c0c7-488a-a6bf-d93fcb90e115.png\" title=\"5d9df15c-c0c7-488a-a6bf-d93fcb90e115.png\" height=\"216\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     \n</p>\n<p>\n    <img style=\"float:none;width:600px;height:202px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/1e355b32-4ce3-4d7f-8f8b-ba3c9182928c.png\" title=\"1e355b32-4ce3-4d7f-8f8b-ba3c9182928c.png\" height=\"202\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     \n</p>\n<p>\n    <img style=\"float:none;width:600px;height:253px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/3fbde883-fcdf-4977-8e78-bb847431f3bc.png\" title=\"3fbde883-fcdf-4977-8e78-bb847431f3bc.png\" height=\"253\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     \n</p>\n<p>\n    <img style=\"float:none;width:600px;height:476px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/cd4fc1c9-60a5-4125-ab1d-bf8c64b6324f.png\" title=\"cd4fc1c9-60a5-4125-ab1d-bf8c64b6324f.png\" height=\"476\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     \n</p>\n<p>\n    <img style=\"float:none;width:600px;height:341px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/6681f6be-d10b-4c39-8ce8-6bebb98c8570.png\" title=\"6681f6be-d10b-4c39-8ce8-6bebb98c8570.png\" height=\"341\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n    <img style=\"float:none;width:600px;height:283px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/0f10596b-4d72-41a3-b98d-c94caea9cf05.png\" title=\"0f10596b-4d72-41a3-b98d-c94caea9cf05.png\" height=\"283\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n    <img style=\"float:none;width:600px;height:337px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/f4d10330-314d-49d9-ab60-315a1f8d3d81.png\" title=\"f4d10330-314d-49d9-ab60-315a1f8d3d81.png\" height=\"337\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     <img style=\"float:left;width:600px;height:531px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/0aebbf4a-cb9a-471a-862a-0d69190909c9.png\" title=\"0aebbf4a-cb9a-471a-862a-0d69190909c9.png\" height=\"531\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" /> \n</p>\n<p>\n    <img style=\"float:none;width:600px;height:556px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/51d8e9d0-b866-4287-af4b-49941819e0fa.png\" title=\"51d8e9d0-b866-4287-af4b-49941819e0fa.png\" height=\"556\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     \n</p>\n<p>\n    <img style=\"float:none;width:600px;height:550px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/ec663914-869f-41bd-867a-c02ab749e0d4.png\" title=\"ec663914-869f-41bd-867a-c02ab749e0d4.png\" height=\"550\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     \n</p>\n<p>\n    <img style=\"float:none;width:600px;height:347px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/65c79bc7-643a-454a-8c06-8e1ae1788c03.png\" title=\"65c79bc7-643a-454a-8c06-8e1ae1788c03.png\" height=\"347\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     \n</p>\n<p>\n    <img style=\"float:none;width:600px;height:706px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/de76287b-9ff6-4027-bbb3-1897b62b00d6.png\" title=\"de76287b-9ff6-4027-bbb3-1897b62b00d6.png\" height=\"706\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     \n</p>\n<p>\n    <img style=\"float:none;width:600px;height:550px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/145bcb25-4216-4737-81d9-be4aa966b0f0.png\" title=\"145bcb25-4216-4737-81d9-be4aa966b0f0.png\" height=\"550\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     \n</p>\n<p>\n    <img style=\"float:none;width:600px;height:638px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/e67baa20-8806-4ad9-941f-7443b1442eb2.png\" title=\"e67baa20-8806-4ad9-941f-7443b1442eb2.png\" height=\"638\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     \n</p>\n<p>\n    <img style=\"float:none;width:600px;height:556px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/9bb08228-9954-4db7-bc61-52478d7f5b68.png\" title=\"9bb08228-9954-4db7-bc61-52478d7f5b68.png\" height=\"556\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     \n</p>\n<p>\n    <img style=\"float:none;width:600px;height:135px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/fe3491f2-ef69-420f-9c46-feb9316971fa.png\" title=\"fe3491f2-ef69-420f-9c46-feb9316971fa.png\" height=\"135\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     \n</p>\n<p>\n     \n</p>\n<p>\n    <img style=\"float:none;width:600px;height:652px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/db5d798c-563a-4082-8cee-3e0efbcea87c.png\" title=\"db5d798c-563a-4082-8cee-3e0efbcea87c.png\" height=\"652\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     \n</p>\n<p>\n     \n</p>\n<p>\n    <img style=\"float:none;width:600px;height:513px;\" src=\"http://image.yaomaiche.com/ueditor_upload_files/Original/2015/0914/d4232c11-d4aa-4be9-b2df-fabd85ef5ba0.png\" title=\"d4232c11-d4aa-4be9-b2df-fabd85ef5ba0.png\" height=\"513\" hspace=\"0\" border=\"0\" vspace=\"0\" width=\"600\" />\n</p>\n<p>\n     \n</p>\n<p>\n    <br />\n</p><p>\n    <br/>\n</p>",
                  "id": "0da975d4-0807-44d7-8df0-594ea552afac",
                  "code": "P16_1",
                  "name": "惠普HP F520G行车记录仪(送8G卡)",
                  "picUrl": "/upload/image/original/carGoods/1ac56998-426a-4287-b672-5c881af847ec.jpg",
                  "ymcPrice": 899.00,
                  "officialPrice": 0.00,
                  "marketlPrice": 1099.00
              },
              "error": null,
              "unAuthorizedRequest": false
          }
          _this.res = isdata.result;
          router.app.loadingShow = false;

        },500);

        //测试-end
      },
      deactivate: function (transition) {
        // console.log('4');
        // console.log('Bar 销毁!')
        transition.next()
      }
    },
    methods: {
      //
    },
    ready: function(){
      var _this = this;







      // load the content
      /*YMC.ajax({
        url: 'Products/ShoppingCart/GetProductInfo',
        showLoading: true,
        data: {shoppingCartID : _this.shoppingCartID},
        success: function (res) {
          // console.log(res);

          _this.res = res.result;

          Vue.nextTick(function () {
            //
          });
        },
        error: function(e){
            UI.alert("网络连接失败，请稍后再试", 1500, function(){
                //$(".uiload").hide();
            });
        }
        // showLoading:true
      });*/


    }
  }
</script>
<style src="../css/car.css"></style>