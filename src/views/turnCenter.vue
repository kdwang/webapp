<template>
<div class="mainautow mainhd">
  <div id="turnCenter" class="turnCenter mainhd" >
      <div class="markImg"><img src="../imgs/ymcico.png" v-el:getsrc></div>

      <p class="firstText">线下交付中心不接受线下购车，仅提供线上订单交付后产生的各项服务。</p>
      <div class="title">
           要买车线下交付中心为广大车主朋友提供线上线下一站式服务。截止目前，已有多家交付中心在全国{{num}}个一二线城市安家落户，我们将日夜兼程为您买车护航，交付中心很快会遍布全国各地，敬请关注。
      </div>
      <div class="tips" >
          <i class="icon-arrow-down"></i>
          点击下图查看门店地址和要买车联系方式
      </div>
      <div class="lineAdd">

          <div id="container"></div>
      </div>
      <ul class="clearfix">
          <li><img src="../imgs/turn_03.jpg" width="100%"/><p>交付中心</p></li>
          <li><img src="../imgs/turn_05.jpg" width="100%"/><p>休息室</p></li>
          <li><img src="../imgs/turn_10.jpg" width="100%"/><p>关爱提示</p></li>
          <li><img src="../imgs/turn_09.jpg" width="100%"/><p>服务指南</p></li>
      </ul>
  </div>
</div>
</template>
<script>
module.exports = {
    data: function(){
        return {
            ajaxUrl         : 'Products/Store/GetAllStoreList',
            num             : 0,//已开通交互中心总个数
            map             : {},//map对象
            marker          : {},//地图标注点
            markImg         : '',
            curCity         : '',//当前定位城市
            infoWindow      : {},
            mapLoad         : false,
            newMap          : {}
        }
    },
    computed:{

    },
    route: {
        data: function(transition){
            if(!YMC.local('amapApi')){
               YMC.local('amapApi',true);
              window.location.reload();

            }else{
              this.loadScript();
            }

            //this.loadScript();

        },
        canDeactivate:function(transition){
          this.newMap =  this.map;
          YMC.local('amapApi',null);
          this.mapLoad = true;
          transition.next();
        }
    },
    methods:{
        loadScript:function(){
          var _this = this;
           window.MapReadyDone = function() {
               _this.mapLoad = true;
               if (MapReady.readyList) {
                   for (var i = 0; i < MapReady.readyList.length; i++) {
                       MapReady.readyList[i] && MapReady.readyList[i]();
                   }
               }
           }

           window.MapReady = function(fn) {
               if (_this.mapLoad) {
                fn && fn();
               } else {
                   MapReady.readyList = MapReady.readyList || [];
                   fn && MapReady.readyList.push(fn);
                   if (!_this.mapLoad) {
                       MapReady.load = true;
                       var script = document.createElement('script');
                       script.type = 'text/javascript';
                       script.async = true;
                       script.src = 'http://webapi.amap.com/maps?v=1.3&key=684c10ff05d461d66da941bfe22f96d1&callback=MapReadyDone&plugin=AMap.CitySearch,AMap.Scale,AMap.OverView,AMap.ToolBar';
                       document.body.appendChild(script);
                   }
               }
           }

           window.MapReady(function() {
              _this.map = new AMap.Map("container",{
                   zoom:7
               });
            toolBar = new AMap.ToolBar({
                visible: false
            });
            _this.map.addControl(toolBar);
            toolBar.show();
              // if(_this.newMap){
              //   _this.map = _this.newMap;
              // }else{
              //   _this.map = new AMap.Map("container",{
              //        zoom:5
              //    });
              // }
              //
             _this.markImg = _this.$els['getsrc'].src;

                var useCity = JSON.parse(YMC.local('userCity'));
                //在app中关闭定位后,userCity会为null
                  _this.curCity = useCity ? useCity.storeName || '上海博大店' : '上海博大店';
                _this.renderPage();

           });
        },
        addMarker:function(obj){
            var obj = obj;
            var _this = this;
           _this.marker = new AMap.Marker({
                icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                position: [obj.longitude,obj.latitude]
            });



             // 自定义点标记内容
             var markerContent = document.createElement("div");


             // 点标记中的图标
             var markerImg = document.createElement("img");
             markerImg.className = "markerlnglat";
             markerImg.src = _this.markImg;
             markerContent.appendChild(markerImg);
             _this.marker.setContent(markerContent); //更新点标记内容


             //鼠标点击marker弹出自定义的信息窗体,并将选择的交互中心设置为中心点
             AMap.event.addListener(_this.marker, 'click', function() {
               // _this.closeInfoWindow();
               _this.setMapCenter(obj.longitude, obj.latitude);
               //_this.map.setZoom(22);
                setTimeout(function(){
                  _this.infoWindowRefresh(obj);
                },500)

             });

              _this.marker.setMap(_this.map);
        },
        infoWindowRefresh:function(obj){
            var _this = this;

            _this.infoWindow = new AMap.InfoWindow({
                isCustom: true, // 使用自定义窗体
                autoMove: true, // 自动调整窗体到视野内
                content: _this.createInfoWindow(obj),
                offset: new AMap.Pixel(2, -42)
            });
            _this.infoWindow.open(_this.map, new AMap.LngLat(obj.longitude, obj.latitude));
        },
        createInfoWindow:function(obj){
             var info = document.createElement("div");
             info.className = "info";
             var adderss2;
             // 定义顶部标题
             var top = document.createElement("div");
             top.className = "info-top";
             var titleD = document.createElement("div");

             top.ontouchstart = top.onclick = function(){
                setTimeout(function(){
                  router.go({'name':'contactUs',query:{sysId:obj.sysId}});
                },20)

            }

             titleD.innerHTML = obj.fullName;

             var closeX = document.createElement("div");
            closeX.className = "closeMap";
            closeX.ontouchstart = closeX.onclick = this.closeInfoWindow;

            top.appendChild(titleD);
            info.appendChild(closeX);
            info.appendChild(top);

             // 定义中部内容
            //  var middle = document.createElement("div");
            //  middle.className = "info-middle";
            // // middle.innerHTML = obj.address;
            //  info.appendChild(middle);

             // 定义底部内容
             var bottom = document.createElement("div");
             bottom.className = "info-bottom";

             info.appendChild(bottom);
             return info;
         },
         closeInfoWindow:function(e){
            event.preventDefault();
            this.map.clearInfoWindow();
         },
         setMapCenter:function(lng,lat){
            this.map.setCenter(new AMap.LngLat(lng, lat));
         },
         renderPage:function(){

            var _this = this;
            YMC.ajax({
                url: 'Products/Store/GetAllStoreList',
                showLoading:true,
                success:function(res){
                    if(!res.success){
                        VUI.alert(res.error.message);
                        return;
                    }
                    var act = res.result.actionList;
                    for(var i in act){
                      _this.num += res.result.actionList[i].storeList.length;
                       for(var j=0;j<act[i].storeList.length;j++){
                            _this.addMarker(act[i].storeList[j]);
                            if(act[i].storeList[j].fullName == _this.curCity){
                                _this.infoWindowRefresh(act[i].storeList[j]);
                               _this.setMapCenter(act[i].storeList[j].longitude, act[i].storeList[j].latitude);
                            }
                       }
                    }
                }
            })
         }
    }
}

</script>

<style>
.turnCenter {
    padding: 0 0 40px;
    color: #585959;
}
.turnCenter img{
    vertical-align: middle;
}
.markImg{
  display: none;
}
.turnCenter .firstText{
    background:#fff8c6;
    color:#a68101;
    padding:15px 10px 15px 50px;
    position: relative;
}
.turnCenter .firstText:before{
    position: absolute;
    content: "";
    display: block;
    width: 41px;
    height: 36px;
    left:5px;
    top:50%;
    margin-top: -18px;
    background:url("../imgs/helpCenter.png") no-repeat 0 -134px;
    background-size:175px 209px;
}
.turnCenter .title,
.turnCenter .lineAdd,
.turnCenter ul{
    padding:0 10px;
}
.turnCenter .title{
    margin:15px 0;
    color:#222;
}
.turnCenter .tips {
    position: relative;
    margin-bottom: 10px;
    padding: 0 10px 0 40px;
    font-style: italic;
    color: #78462f;
}
.turnCenter .tips .icon-arrow-down {
    position: absolute;
    left: 20px;
    top: 3px;
    border:solid #c45b20;
    border-width: 12px 8px;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
}
.turnCenter ul{
    margin-top: 15px;
}
.turnCenter ul li{
    float: left;
    width: 46%;
    text-align: center;
    color:#252525;
    position: relative;
    color:#252525;
    font-size: 14px;
}
.turnCenter ul li img{
    width: 100%;
}
.turnCenter ul li p{
    margin:10px 0;
}
.turnCenter ul li:nth-child(-n+2){
    padding-top: 10px;
}
.turnCenter ul li:nth-child(2n+1){
    padding-right: 4%;
}
.turnCenter ul li:nth-child(2n){
    padding-left: 4%;
}
.turnCenter ul li:nth-child(n+3){
    padding-top:20px;
}
.turnCenter ul li:before{
    position: absolute;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    left:-1px;
    top:-1px;
    border-bottom: 1px solid #ececec;
    border-right:1px solid #ececec;
}
.turnCenter ul li:nth-child(2n):before{
    border-right: 0 none;
}

/*接入api*/
.amap-logo,.amap-copyright {
   display: none !important;
}
#container{
 width: 100%;
  height: 300px;
  display: block;
}
.amap-info{
   width: 180px;
}
.marker{
  display: block;
  padding: 0 10px;
  width: 100px;
  position: absolute;
  top: 10px;
  left: 10px;
  color: #333;
  font-size: 12px;
  font-family: "microsoft yahei";
  font-weight: bold;
}
.info{
   background-color: #ffffff;
   box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
   border-radius: 5px;
   position: relative;
}
.info-top{
  padding: 10px;
}
.info-bottom{
  width: 12px;
  height: 12px;
  position: absolute;

  border-left: 1px solid #fff;
  border-top: 1px solid #fff;
  background-color: #fff;

  -webkit-transform:rotate(-135deg);
  -moz-transform:rotate(-135deg);
  transform:rotate(-135deg);
  bottom: -5px;
  left: 50%;
  margin-left: -6px;
}
.closeMap{
  width: 22px;
  height: 22px;
  text-align: center;
  position: absolute;
  right: -11px;
  top: -11px;
  background: url("../imgs/ico_close.png") center top no-repeat;
  background-size: 22px  44px;
  background-position: 0 0px;
}
.closeMap:active{
  background-position: 0 -22px;
}
</style>