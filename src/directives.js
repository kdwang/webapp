

//针对图片写在style里面的情况
//使用 <div v-sturl="item.url"></div>
//生成 <div style="background-image: url(http://www.test.com//upload/img/1.jpg);">/upload/img/1.jpg</div>
function sturl(value) {
  if(!value){return;}
  var url = '';
  if(value.match(/http:\/\//)){
      url = value;
  } else if(window.abp) {
    //全站统一配置
    url = window.abp.imageDomain + value;
  }
  this.el.style.backgroundImage="url(" + url + ")";
}

// 左滑右滑


touch = {
  acceptStatement : true,//要加上此字段，才能认出来
    bind: function () {
      // console.log('demo bound!')
    },
    update: function (fn) {
      var _this = this;
      var position = {
        oldX: 0,
        oldY: 0,
        newX: 0,
        newY: 0,
        jx: navigator.userAgent.toLowerCase()
      };
      this.el.addEventListener("touchstart", function(event){
        // alert(position.jx);
        // event.preventDefault();
        if (!event.touches.length) return;
        var touch = event.touches[0];
        position.oldX = touch.clientX;
        position.oldY = touch.clientY;
      }, false);

      this.el.addEventListener("touchmove", function(event){
        // event.preventDefault();
        if (!event.touches.length) return;
        var touch = event.touches[0];
        position.newX = touch.clientX;
        position.newY = touch.clientY;

        // 解决特定设备左滑bug
        var isSpecial = false;
        YMC.noTriggerTouchEnd.forEach(function(val, key, arr){
          if(position.jx.indexOf(val) !=-1){
            isSpecial = true;
            return false;
          }
        });
        if(isSpecial){
          touchEndfn();
        }

        // alert(position.newX);
      },false);

      this.el.addEventListener("touchend", touchEndfn, false);

      function touchEndfn(){
        // event.preventDefault();
        var diffX = position.newX - position.oldX;
        var diffY = position.newY - position.oldY;
        switch(_this.arg){
          case "swiperleft":
            diffY = Math.abs(diffY);
            if(diffX < -10 && Math.abs(diffX) > diffY && diffY < 50){
              // 左滑动
              fn.call(this);
            }
          break;
          case "swiperright":
            diffY = Math.abs(diffY);
            if(diffX > 10 && diffX > diffY && diffY < 50){
              // 右滑动
              fn.call(this);
            }
          break;
        }
      }
    }
  };



exports.sturl = sturl;
exports.touch = touch;

