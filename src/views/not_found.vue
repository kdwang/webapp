<style>
.page_nfound {
	height: 100%;
	background-color: #fff;
	padding-top: 100px;
}
.page_nfound img {
	max-width: 100%;
}
</style>

<template>
	<div class="page_nfound">
		<img src="../imgs/404.jpg" alt="" />
	</div>
</template>

<script>
module.exports = {
	data: function() {
		return {
			title:'404'
		}
	},
	route: {
		activate: function(transition) {
			
			transition.next();
		}
	}
};
</script>