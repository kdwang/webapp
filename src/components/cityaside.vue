<template>
  <div class="aside_components_mask" v-show="show" transition="modal" @touchmove.stop.prevent @click.stop="show=false"></div>
  <div class="aside citylist"
    :class="placement"
    v-show="show"
    v-bind:transition="slideTransition" @touchmove.stop.prevent>

    <div class="hd">
        <h2 class="pagetitle">
            <span>选择车辆交付城市</span>
            <a class="iclick iclick3" @click.stop="show=false"></a>
        </h2>
    </div>
    <div id="listCity">
      <ul class="cityname clearfix">
        <li v-for="item in cityData" data_id={{item.id}} @click="changeCity"><span>{{item.anotherName}}</span></li>
      </ul>
    </div>

  </div>

</template>

<script>
	module.exports = {
    data: function() {
      return {
        cityData : []
      }
    },
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
      fn:{
        type:Function
      }
    },
    computed: {
      slideTransition:function(){
        //console.log('slide' + this.placement);
        return 'slide' + this.placement;
      }
    },
		methods: {
			close: function(e){
        if(e.target.tagName == 'A')
				this.show = false
			},

      changeCity: function(e) {
        var tar_city = $(e.target.parentNode);

        if(tar_city.hasClass('city-on')) {
          return false
        } else {
          router.app.cityId = tar_city.attr('data_id');
          router.app.cityTit = tar_city.text().replace(/市$/,'');
          tar_city.addClass('city-on').siblings('li').removeClass('city-on');

          this.show = false;
        }
          
      }

		},
    events: {

    },
		ready: function(){

      var _this = this;
      
      var url = 'Core/OpenCity/GetAllOpenCityList'; //http://ecmob.yaomaiche.com/api/services/
      YMC.ajax({
        url: url,
        data: {},
        success: function(res) {
          if(res.success){
            _this.cityData = res.result;
            
            Vue.nextTick(function() {
              var city_tit = $('.cName span'),
                  city_li = $('.cityname li');
              
              YMC.map.beforLoadSetCity(city_tit, city_li)

            })

          }
        }
      });



		},
    destroyed:function(){
      // document.body.removeEventListener('click',this.hideWrap,false);
      // console.log('组件销毁');
    }
	}
</script>

<style>
.aside.citylist{ left: 0; right: 0; top: 0;}

</style>