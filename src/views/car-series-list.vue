<template>
<div id="main" class="" style="margin-top:51px;">
	<div class="brandList">
		<h2 class="cartitle">
	        <span class="type" id="title"><img :src="'http://img.yaomaiche.com'+data_CarSeriesList.logoUrl">{{data_CarSeriesList.carBrandName}}</span>
	    </h2>

	    <div class="specificar">
			<dl v-for="car in data_CarSeriesList.carManufacturerSeriesList">
				<dt>{{car.carManufacturerName}}</dt>
				<dd v-for="item in car.carSeriesList">
					<a ubt="" data-value="" v-link="{name:'car-model-list',query:{carSeriesId: item.id, isAll: false}}">
						<img data-value="" :src="'http://img.yaomaiche.com'+item.picUrl">
						<span>{{item.name}}</span>
					</a>
				</dd>
			</dl>
	    </div>

	</div>
</div>
</template>

<script>
	module.exports = {
		//props: ['父组建传的值'],
		data:function(){

			return {
				header:'现车品牌',
				data_CarSeriesList : '' // 品牌列表
			}
		},
		//这里才是route的生存周期
		route:{

			data: function(transition) {
				var _this = this;
				var local = window.location.href;
				var gup = YMC.gup(local);
				var obj = {
					Id:gup.carBrandId,
					IsAll:gup.isAll
				}
				YMC.ajax({
					url: 'http://ecmobile.shgqc.ymc.com/api/services/Products/CarSeries/GetCarSeriesList',
					data: obj,
					showLoading:true,
					success:function(res){
						_this.data_CarSeriesList = res.result;
					}
				})
				transition.next()
			}
		}
	}
</script>

<style>


</style>