<template>
	<div id="main" class="mainautow vArg mainhd">
		<div class="carArgument">
			<h2>{{carInfo.title}}</h2>
			<table>
                                    <tbody v-for="item in carInfo.content">
                                        <tr>
                                            <th colspan="2">
                                                <h3>{{item.name}}</h3>
                                            </th>
                                        </tr>
                                        <tr v-for="item1 in item.items">
                                            <td>{{item1.name}}</td>
                                            <td>{{item1.value}}</td>
                                        </tr>
                                    </tbody>
			</table>
		</div>
	</div>
</template>
<script>
module.exports = {
	data: function(){
		return {
			ajaxUrl: 'Products/CarGoods/GetCarModelDetailParameter',
			dataC: {
				"Id":''
			},
			carInfo : {
				content: [],
				title: ''
			}
		}
	},
	computed:{

	},
	route: {
		data: function(){
			var _this = this;
                                _this.dataC.id = this.$route.query.id;
                                _this.carInfo.content = [];
                                _this.carInfo.title = '';
			YMC.ajax({
		                url: _this.ajaxUrl,
		                data:_this.dataC,
		                showLoading:true,
		                success: function(res) {
		                    if(!res.success){
		                        VUI.alert(res.error.message);
		                        return;
		                    }

				 _this.carInfo.content = res.result.carModelParameterList;
				 _this.carInfo.title = res.result.title;

		                },
		                complete: function(){}
		            });

                            router.app.$dispatch('updateTitle','参数配置');

		}
	}
}
</script>
<style>
.vArg .carArgument table {
    background-color: #f9f9f9;
    width: 100%;
    color:#595959;
    font-size: 12px;
}
.vArg .carArgument table th,
.vArg .carArgument table td{
    padding:0 0 0 10px;
}
.vArg .carArgument table tr {
    height: 40px;
    border-bottom: 1px solid #f1f1f1;
}

.vArg .carArgument table th {
    text-align: left;
    color: #828282;
    background: #f7f7f7;
    font-weight: bold;
    border-left: 3px solid #f8c623;
}

.vArg .carArgument table td {
    background: #fff;
}

.vArg .carArgument h2 {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #000;
    background: #f1f1f1;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    font-weight: normal;
}
.vArg .carArgument table h3{
    font-weight: normal;
}
</style>