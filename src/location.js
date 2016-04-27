var userCity = JSON.parse(YMC.local('userCity')) || {};
var YMCMap = {
    Location: function(options) {
        options = options || {};
        _this = this;
        _this.ipIsChanged(options); //IP定位获取城市
    },
    ipIsChanged: function(options) {

        if(Prius.isInsideApp){
            //YMC.local('cardCity',"");
            var appLocal= {};
            if(userCity.localCity && userCity.AppLocation && userCity.cardCity ){
                if (options.notReLocation) {
                    options.notReLocation.call(window, userCity);
                }
                return false;
            }else{
                 Prius.getLocationCity({
                     onSuccess:function(res){
                        var lnglat= [];
                        if(res.coordinates){
                            lnglat=res.coordinates.split(",");
                        }else{
                           _this.MapCenter(options);//低版本走H5定位
                        }
                        var cityName,cityId,lat,lng;
                        var appLocal = {};
                       cityName = res.cityName.substr(0,2);
                       lat = lnglat[0];
                       lng = lnglat[1];
                       var province = res.province;
                       if(province.split("市").length>1){
                         province = province.split("市")[0];
                       }
                       //将定位成功后的信息存入缓存中
                       userCity.AppLocation = true;
                       userCity.province  = province;
                       userCity.cardCity = cityName;
                       userCity.localCity = cityName;
                       userCity.lat = lat;
                       userCity.lng = lng;

                       //App定位成功后,走H5定位成功逻辑
                       YMC.ajax({
                           url: 'Core/OpenCity/GetOpenCityIdByName',
                           data:{cityName:appLocal.city},
                           success: function(res){
                              if(res.success){
                                   userCity.cityId = res.result;
                              }
                           },
                           complete:function(){

                              YMC.local('userCity',JSON.stringify(userCity));
                               if (options.success) {
                                   options.success.call(window, userCity);
                               }
                           }
                       })
                       //埋点
                       _track.data.lat = userCity.lat || '';
                       _track.data.lng = userCity.lng || '';
                       _track.data.cityId = userCity.cityId;
                     },
                     onFail:function(e){
                         //可能用户没有开gps
                         if(options.error && userCity.cardCity == null){
                             options.error.call(window,e);
                         }
                     }
                })
            }
        }else{
            _this.MapCenter(options);
        }
    },
    MapCenter:function(options){
      window.AMapReadyDone = function() {
          AMapReady.ready = true;
          if (AMapReady.readyList) {
              for (var i = 0; i < AMapReady.readyList.length; i++) {
                  AMapReady.readyList[i] && AMapReady.readyList[i]();
              }
          }
      }

      window.AMapReady = function(fn) {
          if (AMapReady.ready) {
              fn && fn();
          } else {
              AMapReady.readyList = AMapReady.readyList || [];
              fn && AMapReady.readyList.push(fn);
              if (!AMapReady.load) {
                  AMapReady.load = true;
                  var script = document.createElement('script');
                  script.type = 'text/javascript';
                  script.async = true;
                  script.src = 'http://webapi.amap.com/maps?v=1.3&key=684c10ff05d461d66da941bfe22f96d1&callback=AMapReadyDone';
                  document.body.appendChild(script);
              }
          }
      }
      /*
             **首先判断localStorage有没有cityId和cityTxt,
             **如果有并且本次ip与上次ip一致,就不需要定位
         */
      window.AMapReady(function() {
          //获取用户所在城市信息
          AMap.service(["AMap.CitySearch"],
          function() {
              //实例化城市查询类
              var citysearch = new AMap.CitySearch();
              var getCityByIp = "";
              //自动获取用户IP，返回当前城市
              citysearch.getLocalCity(function(status, result) {
                  if (status === 'complete' && result.info === 'OK') {
                      if (result && result.city && result.bounds) {
                          var cityinfo = result.city;
                          var citybounds = result.bounds;
                          cityIp = cityinfo.substring(0, cityinfo.length - 1);


                          var ipcityName = userCity.cityIp;

                          ipCity = ipcityName;

                         // ipCity = ipcityName ? ipcityName :cityIp;
                          /**
                              * 当前IP与上次IP不一致,说明位置已经改变,需要重新定位
                              * 如果没有改变,就以上次用户选择的地址为准
                              */
                          var city = userCity.localCity;
                          var cityId = userCity.cityId;
                          var cardCity = userCity.cardCity;
                          var storeName = userCity.storeName;
                          if (ipCity && ipCity == cityIp && cardCity) {
                              if (options.notReLocation) {

                                  options.notReLocation.call(window,userCity);
                              }
                          } else {
                              _this.Amap(options);
                              userCity.cityIp = cityIp;
                              YMC.local('userCity',JSON.stringify(userCity));

                          }
                      }
                  }
              });
          });
      });
    },
    Amap: function(options) {
        var amap;
        if (!document.getElementById('Amap')) {
            amap = document.createElement('div');
            amap.id = 'iCenter';
            amap.style.display = 'none';
            document.body.appendChild(amap);
        }
        mapObj = new AMap.Map("iCenter");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(pos) {
                _this.localComplete(pos, options);
            },
            function(e) {
                if (options.error && userCity.cardCity == null) {
                    options.error.call(window,e);
                }
            },
            {
                // 指示浏览器获取高精度的位置，默认为false
                enableHighAcuracy: true,
                // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
                timeout: 5000,
                // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
                maximumAge: 3000
            });
        } else {
            if (options.error && userCity.cardCity == null) {
                options.error.call();
            }
        }
    },
    localComplete: function(pos, options) {
        /*定位成功,将经纬度转为地址*/
        var _lng = pos.coords.longitude;
        var _lat = pos.coords.latitude;
        var lnglatXY = new AMap.LngLat(_lng, _lat);
        var MGeocoder;

        //将经纬度转为实际地址
        //加载地理编码插件
        mapObj.plugin(["AMap.Geocoder"],
        function() {
            MGeocoder = new AMap.Geocoder({
                enableHighAccuracy: true,
                //是否使用高精度定位，默认:true
                extensions: "all",
                showMarker: false,
                //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: false,
                //定位成功后用圆圈表示定位精度范围，默认：true
                zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            //返回地理编码结果
            AMap.event.addListener(MGeocoder, "complete",
            function(data) {
                _this.geocoder_CallBack(data, options);
            });
            //逆地理编码
            MGeocoder.getAddress(lnglatXY);
        });
        userCity.lng = _lng;
        userCity.lat = _lat;
        userCity.selectCity = false;
    },
    geocoder_CallBack: function(data, options) {
        var comp = data.regeocode.addressComponent;
        var province = "";
        var city = "";
        if(data.info == 'NO_DATA'){

          if (options.error && userCity.cardCity == null) {
             options.error.call(window,'');
             return false;
          }
        }else{
          province = comp.province;
          if(province.split("市").length>1){
            province = province.split("市")[0];
          }
          city = !comp.city ? comp.province: comp.city;
        }


        //将定位城市的latlng存入localStrage中
        if(city.split("市").length>1){
          userCity.localCity = city.substring(0, city.length - 1);
          userCity.cardCity = city.substring(0, city.length - 1);
        }else{
          userCity.localCity = city;
          userCity.cardCity = city;
        }

        userCity.province = province;

        _track.data.lat = userCity.lat || '';
        _track.data.lng = userCity.lng || '';

        YMC.ajax({
            url: 'Products/Store/GetNearestStore',
            data:{cityName:userCity.city},
            data:{latitude:userCity.lat,longitude:userCity.lng},
            success: function(res){
               if(res.success){
                    if(res.result.length>=1){
                        var result = res.result[0];
                        userCity.cityId = result.areaId;
                        userCity.storeName  = result.fullName;
                        userCity.storeAddress  = result.address;
                    }else{
                      userCity.cityId = '7d04e3a1-ee87-431c-9aa7-ac245014c51a';
                      userCity.storeName  = '上海博大店';
                      userCity.storeAddress  = '上海浦东新区国展路189号A-8(博大汽车公园)';
                    }

                    YMC.local('userCity',JSON.stringify(userCity));
               }
            },
            complete:function(){
                if (options.success) {
                    options.success.call(window, userCity);
                }
            }
        })
    }
}
module.exports = YMCMap;