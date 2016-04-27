<template>
  <div class="vcar insurance">
    <div class="mainautow mainhd mainbtm" id="sp-page" style="position:absolute;max-width:540px;" v-show="logic.isShowSp" transition="sp">
      <div class="main_cnt">
        <div v-if="data_productGroupList!==null">
          <div v-for="(indexg, prodGroup) in data_productGroupList">

            <div v-if="prodGroup.productList.length > 0" class="item clearfix" v-bind:class="{'item_arr-up': prodGroup.self_isshowGroup, 'item_arr-down': !prodGroup.self_isshowGroup}" data-iselect="{{ prodGroup.isSelect ? 'true' : 'false'}}" data-price="{{prodGroup.totalPrice}}" data-id="{{prodGroup.id}}">
                <div ubt="chk_{{prodGroup.id}}" gsq="chk_{{prodGroup.id}}" gsqName="精品套餐_{{prodGroup.name}}" class="item_left" v-on:click="choseGroup(indexg)"><i class="ico_checkbox" v-bind:class="{'ico_checkbox-on': prodGroup.isSelect}"></i>{{prodGroup.name}}</div>
                <div class="item_right" v-on:click=" prodGroup.self_isshowGroup = !prodGroup.self_isshowGroup "><span class="txt1">&yen;{{prodGroup.totalPrice}}</span></div>
            </div>


            <div class="pak_info" v-show="prodGroup.self_isshowGroup===true"  v-if="prodGroup.productList.length > 0">
              <div v-if="prodGroup.summary">
                <p class="pak_slogan">{{prodGroup.summary}}</p>
              </div>

              <ul class="pak_prod" v-bind:class="{'selfPro': prodGroup.id==='00000000-0000-0000-0000-000000000000'}">
                <li v-for="(index, prod) in prodGroup.productList" ubt="detail_{{prod.id}}" gsq="detail_{{prod.id}}" gsqName="detail_{{prod.name}}" class="prod_item" data-price="{{prod.ymcPrice}}" data-id="{{prod.id}}" data-code="{{prod.code}}" data-iselect="{{prod.isSelect ? 'true' : 'false'}}">

                    <div class="ico_del" v-if="prodGroup.id==='00000000-0000-0000-0000-000000000000'" v-on:click.stop="itemDelete(index, prodGroup.productList, prodGroup)"></div>
                    <div class="prod_item-main item_arr-right" v-on:click="itemDetail(prod, 'sp', prodGroup)" :class="{'prod_item-main-left': prod.active && prodGroup.isChoseSelf}" v-touch:swiperleft="swiperLeftFn(prod)"  v-touch:swiperright="swiperRightFn(prod)">
                      <div ubt="chk_{{prod.groupId}}" gsq="chk_{{prod.groupId}}" gsq="chk_{{prod.name}}" class="prod_pic" v-on:click="groupItemChose($event, index, indexg)">
                        <img v-bind:src="'http://img.yaomaiche.com'+prod.picUrl">
                        <i class="ico_checkbox2" v-if="prodGroup.id!=='00000000-0000-0000-0000-000000000000'" v-bind:class="{'ico_checkbox2-on': prod.isSelect}"></i>
                      </div>
                      <h2 class="prod_name ellips">{{prod.name}}</h2>
                      <p class="prod_desc ellips_line2">{{prod.summary}}</p>
                      <p class="prod_price">&yen;{{prod.ymcPrice}}</p>
                    </div>

                </li>
              </ul>

            </div>

          </div>
        </div>

        <div v-show="logic.loaded">
          <a ubt="addCustomize" gsq="{{shoppingCartID}}" gsqName="添加自选精品" data-id="{{logic.shoppingCartID}}" target="_self" class="addCustomize" v-on:click="addBoutique">
            <i class="ico_add"></i>更多精品 点击进入
          </a>
          <p class="ico_txt"></p>
        </div>

      </div>

      <div class="fixbtm abs_size clearfix" style="z-index:5;" v-show="logic.btmEnable">
        <div ubt="btn_save" gsq="{{shoppingCartID}}" gsqName="精品保存" class="btn_save" v-on:click.prevent="savefn">保存</div>
        <p class="accessory_sum accessory_sum-left">小计<span id="totalPrice" data-price="0" class="price cor_red">&yen;{{totalPrice}}</span></p>
      </div>
    </div>


    <div class="mainautow mainhd mainbtm" id="sp-list" style="position:absolute;max-width:540px;display:none;" v-show="logic.isShowSpList" transition="sp">
      <div class="main_cnt">
        <div v-for="(index, prodGroup) in data_productTypeList">
          <div class="item clearfix" v-bind:class="{'item_arr-up':prodGroup.isListShow, 'item_arr-down':!prodGroup.isListShow }" v-on:click="prodGroup.isListShow = !prodGroup.isListShow">
            <div class="item_left">{{prodGroup.typeName}}</div>
            <div class="item_right">&nbsp;</div>
          </div>
          <div class="pak_info" v-show="prodGroup.isListShow">
            <ul class="pak_prod">
              <li v-for="(index, prod) in prodGroup.productList" class="prod_item" data-price="{{prod.ymcPrice}}" data-iselect="{{ prod.isSelect === true ? 'true' : 'false'}}" data-gid="{{prod.groupId === null ? '00000000-0000-0000-0000-000000000000' : prod.code }}">
                <div ubt="detail_{{prod.id}}" gsq="detail_{{prod.id}}" class="prod_item-main item_arr-right"  v-on:click="itemDetail(prod, 'sp-list')">
                  <h2 class="prod_name ellips">{{prod.name}}</h2>
                  <p class="prod_desc ellips_line2">{{prod.description}}</p>
                  <p class="prod_price">&yen;{{prod.ymcPrice}}</p>
                  <div ubt="chk_{{prod.groupId}}" gsq="chk_{{prod.id}}" class="prod_pic" v-on:click.stop="listItemChose(index, prodGroup.productList)">
                    <img v-bind:src="'http://img.yaomaiche.com'+ prod.picUrl">
                    <i class="ico_checkbox2" v-bind:class="{'ico_checkbox2-on':prod.isSelect&&!prod.isNoTool, 'ico_checkbox2-disabled': prod.isNoTool}"></i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="fixbtm abs_size clearfix" style="z-index:5;">
        <div ubt="btnSave" gsq="{{shoppingCartID}}" gsqName="确认自选方案" class="btn_save" v-on:click.prevent="listSave">确认自选方案</div>
        <p class="accessory_sum accessory_sum-left">小计<span id="totalPrice" data-price="0" class="price cor_red">¥{{selfTotalPrice}}</span></p>
      </div>
    </div>


    <div class="mainautow mainhd" id="sp-detail" style="position:absolute;max-width:540px;display:none;" v-show="logic.isShowSpDetail" transition="sp">
      <div class="main_cnt" data-id="{{detil.id}}">
        <div class="img_wrap"><img v-bind:src="'http://img.yaomaiche.com'+ detil.picUrl" /></div>
        <div class="item clearfix">
          <div class="item_left">商品价格</div>
          <div class="item_right"><span class="txt1">&yen;{{detil.ymcPrice}}</span></div>
        </div>
        <div class="item clearfix"><div class="item_left">商品详情</div><div class="item_right">&nbsp;</div></div>
        <div class="item_detail1">
          <h3 class="item_detail1-title">商品展示</h3>
          <div v-if="detil.description">{{{detil.description}}}</div>
          <div v-else='!detil.description'>暂无描述</div>
        </div>
      </div>
      <div v-if="logic.isChose === true && logic.detailProId == detil.id && logic.detailChange" class="fixbtm abs_size clearfix" style="z-index:5;"><div class="btn_save btn_save-1" v-on:click="proDeselect">&nbsp;取&emsp;消&nbsp;</div></div>
      <div v-if="logic.isChose === false && logic.detailProId == detil.id && logic.detailChange" class="fixbtm abs_size clearfix" style="z-index:5;"><div ubt="addBtn" gsq="添加到自选精品" class="btn_save" v-on:click="proSelect">添加到自选精品</div></div>
    </div>

    <a class="ico1 ico_arrow-left sp-back" v-show="!logic.isShowSp && !isCarmaster" v-on:click="spback"></a>

  </div>
</template>

<script>
module.exports = {
  //props: ['父组建传的值'],
  data:function(){
    return {
      header: '精品',
      shoppingCartID: '',
      data_totalPrice: '',
      data_productMinPrice: '',
      data_productGroupList: [],

      // 自定义属性
      logic:{
        isLoadSp: true,
        shoppingCartID: "",
        isShowSp: false,
        isShowSpList: false,
        isShowSpDetail: false,
        backPageName: 'sp',
        // 套餐中选中的产品
        sp_productTypeList: [],
        // 自选精品中选中的产品
        sp_productSelfList: [],
        // 是否已经点击提交，如果点击了提交，则禁止重复提交
        isCommit: false,
        loaded: false,

        // 列表页自定义属性
        isLoadList: true,

        // 详情页
        // 用于判断详情页显示取消还是选择
        isChose : '',
        // 用于匹配详情页产品id
        detailProId : '',
        // 用于判断详情页是否显示底部操作
        detailChange: false,
        // 底部显示
        btmEnable: false,
        isCarmaster : false//是否在车达人app中
      },

      // selected_package-list
      data_productTypeList:[
        {
          productList: []
        }
      ],

      // selected_package-detail
      detil: {
        description: ''
      }
    }
  },
  //这里才是route的生存周期
  route:{

    data: function(transition) {
      var _this = this;
      _this.isCarmaster = router.isCarmaster;
      // debugger;
      // 执行完后不再重复执行
      // _this.logic.shoppingCartID = YMC.gup(location.href)["id"] || "";
      _this.logic.shoppingCartID = _this.$route.query.id || "";

      if(!_this.logic.shoppingCartID){
        VUI.alert('订单编号获取失败', 1500, function(){
          // window.location.href="../index.html";
          router.go({name:'home'});
        });
        return false;
      }

      // 进入页面重置页面数据
      _this.shoppingCartID = '';
      _this.data_totalPrice = '';
      _this.data_productMinPrice = '';
      _this.data_productGroupList = [];
      _this.logic = {
        isLoadSp: true,
        shoppingCartID: "",
        isShowSp: false,
        isShowSpList: false,
        isShowSpDetail: false,
        backPageName: 'sp',
        // 套餐中选中的产品
        sp_productTypeList: [],
        // 自选精品中选中的产品
        sp_productSelfList: [],
        // 是否已经点击提交，如果点击了提交，则禁止重复提交
        isCommit: false,
        loaded: false,

        // 列表页自定义属性
        isLoadList: true,

        // 详情页
        // 用于判断详情页显示取消还是选择
        isChose : '',
        // 用于匹配详情页产品id
        detailProId : '',
        // 用于判断详情页是否显示底部操作
        detailChange: false,
        // 底部显示
        btmEnable: false

      };
      _this.data_productTypeList = [
        {
          productList: []
        }
      ];

      // 判断页面是否为第一次加载，如果是回退到该页面，则不获取数据
      if(_this.logic.isLoadSp){
        this.spPageLoad(transition);
      }


      // 根据url参数决定传入参数。
      // cntLoad('Products/ShoppingCart/GetProductGroupList', true, "productGroupList");

      // 将transition.next()放入spPageLoad函数内执行
      // transition.next()
    }
  },
  // 计算属性
  computed: {
    // 套餐页面选择套餐+自选精品总额
    totalPrice: function(){
      // 设置套餐选择价格和自选产品价格
      var price = chosePrice = 0;

      this.data_productGroupList.forEach(function(val, key, arr){
        if(val.id !== '00000000-0000-0000-0000-000000000000'){
          // 获取非自选套餐的总价
          // 如果当前组被选择，则获取该组价格，否则获取该组内选中的产品的总价格
          if(val.isSelect){
            price = val.totalPrice;
          }else{
            val.productList.forEach(function(subval, subkey, subarr){
              if(subval.isSelect){
                price += subval.ymcPrice;
              }
            });
          }
        }else if(val.id === '00000000-0000-0000-0000-000000000000'){
          if(val.isSelect){
            // 获取自选总价
            val.productList.forEach(function(subval, subkey, subarr){
              chosePrice += subval.ymcPrice;
            });
          }
        }
      });

      // 返回总价
      return price + chosePrice;
    },

    // 获取套餐页面自选精品总额
    selfProdTotal: function(){
      var price = 0;
      this.data_productGroupList.forEach(function(val, key, arr){
        if(val.id === '00000000-0000-0000-0000-000000000000'){
          if(val.isSelect){
            // 获取自选总价
            val.productList.forEach(function(subval, subkey, subarr){
              price += subval.ymcPrice;
            });
          }
        }
      });
      return price;
    },

    // 精品列表页自选精品总额
    selfTotalPrice: function(){
      var price = 0;
      this.data_productTypeList.forEach(function(val, key, arr){
        val.productList.forEach(function(subval, subkey, subarr){
          if(subval.isSelect){
            price += subval.ymcPrice;
          }
        });
      });
      return price;
    }
  },
  methods: {
    swiperLeftFn: function(obj){
      var _this = this;
      obj.active = true;
    },
    swiperRightFn: function(obj){
      var _this = this;
      obj.active = false;
    },
    listswiperleftFn: function(index){
      var _this = this;
      for (var i = 0; i < _this.items.length; i++) {
        _this.items[i].active = false;
      };
      _this.items[index].active = true;
    },
    // 提交数据函数
    saveProd: function(urlFragment, data, fn){
      var _this = this;

      YMC.ajax({
        url: urlFragment,
        data: data,
        success: function (e) {
          ga = true;
          if(e.success){
            fn();
          }else{
            // 如果提交失败，则可以再提交一次
            _this.logic.isCommit = false;

            VUI.alert(e.error.message, 1500);
          }
        },
        error: function(e){
          // 如果提交失败，则可以再提交一次
          _this.logic.isCommit = false;

          VUI.alert("网络连接失败，请稍后再试", 1500);
        },
        showLoading: true
      });
    },
    // 套餐页面保存
    savefn: function(){
      var _this = this;

      // 如果已经提交，则禁止再次提交
      if(_this.logic.isCommit){
        return false;
      }

      // 点击保持按钮，获取需要保持的数据
      var changedCart = {
          "shoppingCartID": this.logic.shoppingCartID,
          "productSelectedList": []
        };
      // 取出数据中选择的产品
      _this.data_productGroupList.forEach(function(val, key, arr){
        var obj = {
          "productGroupId": val.id,
          "productIdList": []
        }

        // 判断某个套餐是否全部选中，如果全部选中，则获取该组内全部产品id，否则只获取选中的产品id
        if(val.isSelect){
          obj.isSelect = true;
          val.productList.forEach(function(subval, subkey, subarr){
            obj['productIdList'].push(subval.id);
          });
          changedCart['productSelectedList'].push(obj);
        }else{
          if(val.id !== '00000000-0000-0000-0000-000000000000'){
            obj.isSelect = false;
            val.productList.forEach(function(subval, subkey, subarr){
              if(subval.isSelect){
                obj['productIdList'].push(subval.id);
              }
            });

            if(obj['productIdList'].length){
              changedCart['productSelectedList'].push(obj);
            }
          }
        }
      });

      // 提交数据
      _this.saveProd("Products/ShoppingCart/UpdateProducts", changedCart, function(){
        // window.location.href = "myBuyCar.html";

        // 保存成功过后会跳转到别的页面，重置本页的一些默认设置
        // 套餐页重新获取数据
        _this.logic.isLoadSp = true;
        // 自选列表页重新获取数据
        _this.logic.isLoadList = true;
        // 将在自选列表页和详情页的回退页面设置为套餐页面
        _this.logic.backPageName = 'sp';
        // 是否可以提交
        _this.logic.isCommit = false;

        router.app.header = siteMap['myBuyCar'];
        router.go({name:'myBuyCar'});
      });

      // 将提交设置为已经提交过了状态
      _this.logic.isCommit = true;

    },
    spPageLoad: function(transition){
      var _this = this;


      // 进入页面对默认值进行重置
      // _this.logic.shoppingCartID = YMC.gup(location.href)["id"] || "";
      _this.logic.shoppingCartID = _this.$route.query.id || "";

      // load the selected_package page content
      YMC.ajax({
        // url: 'http://localhost/git/webapp/src/json/GetProductGroupList.json',
        // url: 'http://localhost:8080/src/json/GetProductGroupList.json',
        url: 'Products/ShoppingCart/GetProductGroupList',
        showLoading: true,
        data: {'shoppingCartID' : _this.logic.shoppingCartID},
        success: function (e) {
          if(e.success&&e.result){
            var res = e.result;

            _this.logic.loaded = true;

            setTimeout(function(){
              // console.log('...');
              _this.logic.btmEnable = true
            }, 1000);

            res.productGroupList.forEach(function(val, key, arr){
              // 设置精品套餐每个组默认显示还是隐藏
              val.self_isshowGroup = val.isSelect;
              if(val.id === '00000000-0000-0000-0000-000000000000'){
                val.isChoseSelf = true;
                val.productList.forEach(function(subval, subkey, subarr){
                  subval.active = false;
                });
              }else{
                val.isChoseSelf = false;
              }
            });
            _this.data_productGroupList = res.productGroupList;
            _this.shoppingCartID = res.shoppingCartID;
            _this.data_totalPrice = res.totalPrice;
            _this.data_productMinPrice = res.productMinPrice;

// YMC.log('selected_package数据获取成功');

            // 未刷新回退到该页面是否请求数据
            _this.logic.isLoadSp = false;
            // 显示当前页面，隐藏其他页面
            _this.logic.isShowSp = true;
            _this.logic.isShowSpList = _this.logic.isShowSpDetail = false;

            Vue.nextTick(function () {
              YMC.waitDomInsert(function(){
                if($(".selfPro").length > 0){
                  _this.proSwipe();
                  return true;
                }
              });

            });

            transition.next();
          }
        },
        error: function(e){
          VUI.alert("网络连接失败，请稍后再试", 1500, function(){
              //$(".uiload").hide();
          });
        }
      });
    },
    proSwipe: function(){
      /*$(".selfPro").off("swipeLeft").off("swipeRight").on("swipeLeft",'.prod_item',function(){
          if($(this).find(".ico_del").length){
            $(this).find(".prod_item-main").css({
              "-webkit-transform": "translate(-44px,0)",
              "-moz-transform": "translate(-44px,0)",
              "-ms-transform": "translate(-44px,0)",
              "transform": "translate(-44px,0)"
            });
          }
        }).on("swipeRight",'.prod_item',function(){
          if($(this).find(".ico_del").length){
            $(this).find(".prod_item-main").css({
              "-webkit-transform": "none",
              "-moz-transform": "none",
              "-ms-transform": "none",
              "transform": "none"
            });
          }
        });*/
    },
    choseGroup: function(index){
      // 判断是否为自选，如果不是自选则取消其他非自选元素的选中状态
      if(this.data_productGroupList[index].id !== '00000000-0000-0000-0000-000000000000'){
        this.data_productGroupList.forEach(function(val, key, arr){
          // 判断点击的是否为当前元素
          if(key == index){
            val.isSelect = !val.isSelect;

            // 如果当前组标题为点击后不选，则组内元素也不选
            if(val.isSelect){
              // self_isshowGroup 属性用于判断当前组内元素是否显示
              val.self_isshowGroup = true;
              val.productList.forEach(function(subval, subkey, subarr){
                subval.isSelect = true;
              });
            }else{
              val.self_isshowGroup = false;
              val.productList.forEach(function(subval, subkey, subarr){
                subval.isSelect = false;
              });
            }

          }else{
            if(val.id !== '00000000-0000-0000-0000-000000000000'){
              val.isSelect = val.self_isshowGroup = false;
              // 去除其他套餐内的选中状态
              val.productList.forEach(function(subval, subkey, subarr){
                subval.isSelect = false;
              });
            }
          }
        });
      }else{
        this.data_productGroupList[index].isSelect = !this.data_productGroupList[index].isSelect;
        this.data_productGroupList[index].self_isshowGroup = !this.data_productGroupList[index].self_isshowGroup;
      }
    },
    itemDetail: function(obj, page, prodG){
      var _this = this;
      // 点击跳转到单个模块页面
      // router.go({name:'selected_package-detail', query:{id: obj.id} });

      // 当前点击的是已选还是未选，用于详情页取消或添加产品
      if(page == 'sp'){ //判断是否在套餐页面
        if(prodG.id === '00000000-0000-0000-0000-000000000000'){ // 判断是否在自选列表，非自选列表不操作
          this.logic.isChose = true;
          this.logic.detailProId = obj.id;
          this.logic.detailChange = true;
        }else{
          this.logic.detailChange = false;
        }
      }else{
        this.logic.isChose = obj.isSelect;
        this.logic.detailProId = obj.id;
        if(!obj.isNoTool){
          this.logic.detailChange = true;
        }else{
          this.logic.detailChange = false;
        }
      }


      // 请求单一模块的数据进行渲染页面
      this.spDetailLoad(obj.id);

      this.logic.backPageName = page;
    },
    groupItemChose: function(ev, index, indexg){
      if($(ev.target).closest('.pak_info').prev('.item').data('id') !== '00000000-0000-0000-0000-000000000000'){
        ev.stopPropagation();
      }

      // 将非自选且不是当前组的元素取消选中
      this.data_productGroupList.forEach(function(val, key, arr){
        if(val.id !== '00000000-0000-0000-0000-000000000000' && key != indexg){
          // 取消非当前套餐组的选择
          val.isSelect = false;
          val.self_isshowGroup = false;
          // 取消非当前套餐组内的元素的选择
          val.productList.forEach(function(subval, subkey, subarr){
            subval.isSelect = false;
          });
        }
      });

      // 将当前点击元素选中
      this.data_productGroupList[indexg].productList[index].isSelect = !this.data_productGroupList[indexg].productList[index].isSelect;

      // 判断当前组内元素是否都选中，如果选中，则把标题选中，否则标题不选中
      var isAllChose = true;
      this.data_productGroupList[indexg].productList.forEach(function(vals, keys, arrs){
        if(!vals.isSelect){
          isAllChose = false;
        }
      });
      if(isAllChose){
        this.data_productGroupList[indexg].isSelect = true;
      }else{
        this.data_productGroupList[indexg].isSelect = false;
      }

    },
    itemDelete: function(index, arr, group){
      var _this = this;
      // 获取要删除的商品的id
      // var id = arr[index].id;
      // 自选商品删除
      arr.splice(index, 1);
      // 套餐页面自选总价联动展示
      group.totalPrice = _this.selfProdTotal;

      // 将列表页当前自选商品的取消选择
      // _this.data_productTypeList.forEach(function(val, key, arr){
      //   val.productList.forEach(function(subval, subkey, subarr){
      //     if(subval.id === arr[index].id){console.log(12);
      //       subval.isSelect = false;
      //     }
      //   });
      // });

      // 在精品页面将删除的精品取消选择
      //

      // 删除供列表页使用的自选数组中产品的id
      // _this.logic.sp_productTypeList.forEach(function(val, key, arr){
      //   if(id === val){
      //     _this.logic.sp_productTypeList.splice(key, 1);
      //   }
      // });

    },
    addBoutique: function(){
      var _this = this;
      // if(!_this.logic.shoppingCartID){
      //   VUI.alert('自选套餐编号获取失败', 1500, function(){
      //     window.location.href="../index.html";
      //   });
      //   return false;
      // }

      // 点击跳转到精品列表页面
      // router.go({name:'selected_package-list'});

      // 获取当前页面选中产品，供列表页使用
      var selfarrs = [], prodarrs = [];
      _this.data_productGroupList.forEach(function(val, key, arr){
        // 将精品套餐页面自选精品的内容存储取来，供列表页使用
        // if(val.id ==='00000000-0000-0000-0000-000000000000'){
        //   var selfarrs = [];
        //   val.productList.forEach(function(subval, subkey, subarr){
        //     // console.log(val.productList[0].id)
        //     selfarrs.push(subval);
        //   });
        //   _this.logic.sp_productTypeList = selfarrs;
        // }

        // 将精品套餐页面所有选中的内容存储取来，供列表页使用
        val.productList.forEach(function(subval, subkey, subarr){
          // 将自套餐选中的产品存储起来，供列表页使用
          if(val.id !== '00000000-0000-0000-0000-000000000000'){
            if(subval.isSelect && $.inArray(subval.id, prodarrs)==-1){
              prodarrs.push(subval.id);
            }
          }else{
            // 将自选精品中的产品存储起来，供列表页使用
            if(subarr.length > 0){
              // 判断产品id不在自选产品数组里面，且产品id不在已选套餐产品数组里面
              if($.inArray(subval.id, selfarrs)==-1 && $.inArray(subval.id, prodarrs)==-1){
                selfarrs.push(subval.id);
              }
            }
          }
        });



      });
      _this.logic.sp_productTypeList = prodarrs;
      _this.logic.sp_productSelfList = selfarrs;
      // console.log(JSON.stringify(_this.logic.sp_productTypeList))
      // console.log(JSON.stringify(_this.logic.sp_productSelfList))


      // 请求精品列表的数据进行渲染页面
      this.spListLoad();
    },



    //  list page
    spListLoad: function(){
      var _this = this;

      this.logic.backPageName = 'sp';
      router.app.$dispatch('updateTitle','精品商品库');

      // load the selected_package-list page content

      // 如果页面是刷新后第一次进来则请求数据,否则只显示当前页面，隐藏其他页面
      if(_this.logic.isLoadList){
        YMC.ajax({
          url: 'Products/ShoppingCart/GetProductList',
          showLoading: true,
          data: {shoppingCartID : _this.logic.shoppingCartID},
          success: function (res) {
            if(res.success && res.result){
              $(".uiload").hide();
              if(res.result.productTypeList){
                // 设置自选精品里面的每个组默认都是显示的
                res.result.productTypeList.forEach(function(val, key, arr){
                  val.isListShow = true;
                });

                _this.data_productTypeList = res.result.productTypeList;

// YMC.log('selected_package_list数据获取成功');

                // 将loading设置为false，页面未刷新进来则不重新获取数据
                _this.logic.isLoadList = false;

                Vue.nextTick(function () {
                  // 显示当前页面，隐藏其他页面
                  _this.logic.isShowSpList = true;
                  _this.logic.isShowSpDetail = _this.logic.isShowSp = false;



                  // 将套餐页面选择的产品在该页面标注为选中，否则不选中
                  _this.initItemChose();


                });
              }else{
                $(".main_cnt").html('<div class="orderTrack"><p>暂无数据，请点击重试！</p><p class="btn_panel"><a href="javascript:;" class="btn">点击重试</a></p></div>')
                $(".orderTrack .btn").on("click", function(e){
                    e.preventDefault();
                    $(".uiload").show();
                    _this.spListLoad();
                });

                $("#totalPrice").html("¥0");
                $("#totalPrice").data("price", 0);
              }

            }

          },
          error: function(e){
              VUI.alert("网络连接失败，请稍后再试", 1500, function(){
                  $(".uiload").hide();
              });
          }
        });
      }else{
        // 显示当前页面，隐藏其他页面
        _this.logic.isShowSpList = true;
        _this.logic.isShowSpDetail = _this.logic.isShowSp = false;

        // console.log( JSON.stringify(_this.logic.sp_productTypeList))

        // 将套餐页面选择的产品在该页面标注为选中，否则不选中
        _this.initItemChose();

      }

      // 获取精品页面的自选精品
      // _this.data_productGroupList.forEach(function(val, key, arr){
      //   if(val.id === '00000000-0000-0000-0000-000000000000'){
      //     var selfarrs = [];
      //     val.productList.forEach(function(subval, subkey, subarr){
      //       // console.log(val.productList[0].id)
      //       selfarrs.push(subval);
      //     });
      //     _this.logic.sp_productTypeList = selfarrs;
      //   }
      // });

    },
    // 进入列表页对页面，根据套餐页面选择的产品，进行初始化展示
    initItemChose: function(){
      var _this = this;
      // console.log(JSON.stringify(_this.logic.sp_productTypeList));
      // console.log(JSON.stringify(_this.logic.sp_productSelfList));

      // 将套餐页面选择的产品在该页面标注为选中，否则不选中
      _this.data_productTypeList.forEach(function(val, key, arr){
        val.productList.forEach(function(subval, subkey, subarr){
          // 判断是否在套餐中选中
          if(_this.logic.sp_productTypeList.length>0 && $.inArray(subval.id, _this.logic.sp_productTypeList) !=-1 ){
            subval.isSelect = true;
            // subval.isNoTool = true;
            Vue.set(subval, 'isNoTool', true);
          }else if(_this.logic.sp_productSelfList.length > 0 && $.inArray(subval.id, _this.logic.sp_productSelfList) !=-1){
            // 判断是否在自选中选中
            subval.isSelect = true;
            // subval.isNoTool = false;
            Vue.set(subval, 'isNoTool', false);
          }else{
            subval.isSelect = false;
            Vue.set(subval, 'isNoTool', false);
          }
        });
      });
    },

    listItemChose: function(index, arr){
      // 如果该产品在套餐中，则禁止取消
      // console.log(typeof arr[index].isNoTool);
      if(!arr[index].isNoTool){
        arr[index].isSelect = !arr[index].isSelect;
      }
    },

    // 自选精品列表页面保存
    listSave: function(){
      var _this = this;

      // 获取列表页选中且可操作的产品
      var aListChose = [], aListChoseId = [];
      _this.data_productTypeList.forEach(function(val, key, arr){
        val.productList.forEach(function(subval, subkey, subarr){
          Vue.set(subval, 'active', false)
          if(subval.isSelect && !subval.isNoTool){
            aListChose.push(subval);
            aListChoseId.push(subval.id);
          }
        });
      });

      // 获取已选中的精品,然后将他们添加到套餐页面的自选精品下面
      // 判断套餐页面是否已经存在自选列表，如果没有则添加，否则只添加里面的数据
      var isSelfProdNoEmpty = false,selfProd,proSelfProd = [];
      _this.data_productGroupList.forEach(function(val, key, arr){
        if(val.id === '00000000-0000-0000-0000-000000000000'){
          isSelfProdNoEmpty = true;
          val.isChoseSelf = true;
          selfProd = val;
          // 获取套餐页面自选精品_this.data_productGroupList.push(selfProd);
          val.productList.forEach(function(subval, subkey, subarr){
            proSelfProd.push(subval.id);

            // 将自选列表中未选中的产品重套餐列表页面自选组里面删除
            if($.inArray(subval.id, aListChoseId) == -1){
              val.productList.splice(subkey, 1);
            }

          });
        }
      });

      // 如果原套餐页面如果没有自选产品，则创建一个对象，后面添加到 _this.data_productGroupList 里
      if(!isSelfProdNoEmpty){
        selfProd = {}
        selfProd.id = "00000000-0000-0000-0000-000000000000";
        selfProd.name = "自选";
        selfProd.summary = "";
        selfProd.isSelect = true;
        selfProd.totalPrice = _this.selfTotalPrice;
        selfProd.productList = [];
        selfProd.self_isshowGroup = true;
        selfProd.isChoseSelf = true;

      }else if(!selfProd.hasOwnProperty('self_isshowGroup')){ // 判断该属性是否存在
        Vue.set(selfProd, 'self_isshowGroup', true);
        // console.log(JSON.stringify(selfProd))
      }
      selfProd.isSelect = true;
      selfProd.isChoseSelf = true;
      selfProd.totalPrice = _this.selfTotalPrice;

      // 循环列表页数据
      // _this.data_productTypeList.forEach(function(val, key, arr){
      //   val.productList.forEach(function(subval, subkey, subarr){
      //     // 判断选中且是可操作的产品
      //     if(subval.isSelect && !subval.isNoTool && $.inArray(subval.id, proSelfProd) == -1){
      //       selfProd.productList.push(subval);
      //     }
      //   });
      // });

      // console.log(JSON.stringify(selfProd));
      // 将自选列表选择的数据添加到套餐页面自选组里面去
      aListChose.forEach(function(val, key, arr){
        if($.inArray(val.id, proSelfProd) == -1){
          // val.active = false;
          Vue.set(val, 'active', false);
          selfProd.productList.push(val);
          // Vue.set(selfProd, val)
        }
      });


      // 判断套餐页面没有自选列表，添加一个自选列表
      if(!isSelfProdNoEmpty){
        _this.data_productGroupList.push(selfProd);
        YMC.waitDomInsert(function(){
          if($(".selfPro").length > 0){
            _this.proSwipe();
            return true;
          }
        });
      }


      // 显示套餐页面，隐藏列表页和详情页面
      _this.logic.isShowSp = true;
      _this.logic.isShowSpDetail = _this.logic.isShowSpList = false;

    },

    // 自选精品列表页面保存
    /*listSave: function(){
      var _this = this;

      // 初始化要提交的数据
      var changedCart = {
        "shoppingCartID": _this.logic.shoppingCartID,
        "productSelectedList": []
      };

      // 获取已选中的精品提交到服务器
      var groupList = {};
      this.data_productTypeList.forEach(function(val, key, arr){
        val.productList.forEach(function(subval, subkey, subarr){
          if(subval.isSelect && !subval.isNoTool){
            var gid = subval.groupId || '00000000-0000-0000-0000-000000000000';
            if(!groupList.hasOwnProperty(gid)){
              groupList[gid] = [];
            }
            groupList[gid].push(subval.id);
          }
        });

      });

      for (var ind in groupList){
        var tempObj = {
          "productGroupId": ind,
          "productIdList": groupList[ind]
        };
        changedCart["productSelectedList"].push(tempObj);
      }
      groupList = {};

      console.log(JSON.stringify(changedCart));
      // return false;

      // 提交数据
      YMC.ajax({
        url: "Products/ShoppingCart/GetProductGroupList",
        data: changedCart,
        success: function (e) {
          if(e.success){console.log(1234);
            // YMC.local("detailChosen",null);
            // window.location.href = "selected_package.html?id=" + _this.logic.shoppingCartID;
            // 重新加载 selected_package 页面
            _this.logic.isLoadSp = true;
            _this.logic.isLoadList = true;
            // router.go({name:'selected_package', query:{'id': _this.logic.shoppingCartID} });
            _this.spPageLoad();
          }
        },
        error: function(e){
          VUI.alert("网络连接失败，请稍后再试", 1500);
        }
      });

    },*/



    // detail page
    spDetailLoad: function(proId){

      var _this = this;

      // load the selected_package-detail page content
      YMC.ajax({
        url: 'Products/ShoppingCart/GetProductInfo',
        showLoading: true,
        data: {'id' : proId},
        success: function (res) {
          // console.log(res);
          _this.detil = res.result;

          // 修改title
          var headerTxt = _this.detil.name;
          if(_this.detil.name.length > 12){
            headerTxt = headerTxt.substr(0, 10) + '...';
          }
          router.app.$dispatch('updateTitle',headerTxt);

          // if(_this.logic.detailProId && _this.logic.detailProId === YMC.gup(window.location.href)["id"]){
          //   if(_this.logic.isChosen){}
          // }

          Vue.nextTick(function () {
            // 显示当前页面，隐藏其他页面
            _this.logic.isShowSpDetail = true;
            _this.logic.isShowSpList = _this.logic.isShowSp = false;

          });
        },
        error: function(e){
            VUI.alert("网络连接失败，请稍后再试", 1500, function(){
                //$(".uiload").hide();
            });
        }
        // showLoading:true
      });

    },
    proSelect: function(){
      // 添加商品
      var _this = this;

      // 选中自选列表页面的该产品
      var curProd = null;
      _this.data_productTypeList.forEach(function(val, key, arr){
        val.productList.forEach(function(subval, subkey, subarr){
          if(subval.id === _this.logic.detailProId && !subval.isNoTool){
            subval.isSelect = true;
            // subval.active = false;
            curProd = subval;
          }
        })
      });


      // 套餐页面自选列表里添加当前产品
      this.data_productGroupList.forEach(function(val, key, arr){
        if(val.id === '00000000-0000-0000-0000-000000000000' && curProd){
          val.productList.push(curProd);
        }
      });


      _this.spback();
    },
    proDeselect: function(){
      // 取消商品
      var _this = this;

      // 取消自选列表页面的选择
      _this.data_productTypeList.forEach(function(val, key, arr){
        val.productList.forEach(function(subval, subkey, subarr){
          if(subval.id === _this.logic.detailProId && !subval.isNoTool){
            // console.log(subval.isNoTool);
            subval.isSelect = false;
          }
        })
      });

      // 删除套餐页面自选列表里的当前产品
      this.data_productGroupList.forEach(function(val, key, arr){
        if(val.id === '00000000-0000-0000-0000-000000000000'){
          val.productList.forEach(function(subval, subkey, subarr){
            if(subval.id === _this.logic.detailProId){
              subarr.splice(subkey, 1);
            }
          });
        }
      });

      _this.spback();
    },
    spback: function(){ // 返回套餐页面
      var _this = this;

      // back时重置用于判断详情页显示按钮的属性
      _this.logic.isChosen = '';
      _this.logic.detailProId = '';


      // 判断返回我的套餐还是精品列表页
      if(_this.logic.backPageName == 'sp'){
        // 显示当前页面，隐藏其他页面
        _this.logic.isShowSp = true;
        router.app.$dispatch('updateTitle','我的精选套餐方案');
        _this.logic.isShowSpList = _this.logic.isShowSpDetail = false;
      }else if(_this.logic.backPageName == 'sp-list'){
        _this.logic.backPageName = 'sp';
        router.app.$dispatch('updateTitle','精品商品库');
        // 显示当前页面，隐藏其他页面
        _this.logic.isShowSpList = true;
        _this.logic.isShowSp = _this.logic.isShowSpDetail = false;
      }
    }
  },
  ready: function(){
    // debugger;
    // 执行完后不再重复执行
    // var _this = this;

    // if(!_this.logic.shoppingCartID){
    //   VUI.alert('订单编号获取失败', 1500, function(){
    //     window.location.href="../index.html";
    //   });
    //   return false;
    // }

    // // 判断页面是否为第一次加载，如果是回退到该页面，则不获取数据
    // if(_this.logic.isLoadSp){
    //   this.spPageLoad();
    // }


    // 根据url参数决定传入参数。
    // cntLoad('Products/ShoppingCart/GetProductGroupList', true, "productGroupList");
  }
}
</script>

<style src="../css/car.css"></style>