<template>
    <div class="mainautow mainhd">
        <div class="note_tit" v-if="noteTit.length>0">{{noteTit}}</div>
        <div class="purchaseNote" v-for="item in purchaseFlows">
            <div v-if="item.content" v-html="item.content"> </div>
        </div>
    </div>
</template>
<script>
    module.exports = {
        data: function(){
            return {
                id:'',
                purchaseFlows:[],
                noteTit:'',
                ajaxUrl: ''
            }
        },
        route:{
            data: function(transition) {
                var _this  = this;
                _this.id = _this.$route.query.id;

                _this.ajaxUrl = 'Content/PurchaseNote/GetPurchaseNote?id=' + _this.id

                YMC.ajax({
                    data: {},
                    url: _this.ajaxUrl,
                    success: function(res){
                        if(res.success&&res.result){
                            if(res.result.purchaseNote && res.result.purchaseNote.title){
                                //router.app.$dispatch('updateTitle',res.result.purchaseNote.title);
                                _this.noteTit = res.result.purchaseNote.title;
                            }
                            _this.purchaseFlows = res.result.purchaseFlows;
                        } else {
                            VUI.alert(res.error.message);
                        }
                    }
                });
                transition.next();
            }
        }
    }
</script>
<style>
.purchaseNote img{ display: block; width: 100%;}
.purchaseNote br{ display: none;}
.note_tit{ width: 100%; line-height: 40px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: center; font-size: 16px; font-weight: bold;}
</style>