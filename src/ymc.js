
//如果这里没有 abp全局对象，那么自定义一个，用于调试
// if(!window.abp){
//     var abp=abp||{};
//     abp.webapiDomain='http://116.236.162.242:8020';
//     abp.msiteDomain='http://116.236.162.242:8010';
//     abp.payDomain='http://pay.shgqc.yaomaiche.com';
//     abp.imageDomain='http://116.236.162.242:8030';
//     abp.resourceUploadUrl='http://resource.shgqc.ymc.com/Uploader';
//     window.abp = abp;
// }

var YMC = {
    /*微信分享配置
    YMC.wxShareCon({
        wxTitle: "标题",
        wxDesc: "描述",
        wxLink: "链接",
        wxImgUrl: "图片"
    })
    */
    wxShareCon:function (data){
       if(YMC.isWeiXin == false){
            //不在微信环境
            return ;
        }

        var curpage_url = data.wxLink,share_link = '';

        if (curpage_url.indexOf('?') == -1) {
            share_link = curpage_url + '?' + 'others=1';
        } else {
            share_link = curpage_url + '&' + 'others=1';
        }

        var url = 'http://ecmob.yaomaiche.com/api/services/Marketing/Share/GetJsApi';
        var dataS = {
            "CurrentUrl": curpage_url
        };

        //添加微信分享js
        if(!document.getElementById('wxScript')){
            var _script1 = document.createElement('script');
            _script1.src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js';
            _script1.onload = function(){
                loadedWxScript();
            };
            document.body.appendChild(_script1);
        } else {
            loadedWxScript();
        }

        function loadedWxScript(){
            YMC.ajax({
                url:url,
                data:dataS,
                success: function(res){
                    var rwx = res.result;
                    wx.config({
                        debug: false,
                        appId: rwx.appId,
                        timestamp: rwx.timestamp,
                        nonceStr: rwx.noncestr,
                        signature: rwx.signature,
                        jsApiList: [
                            'onMenuShareAppMessage',
                            'onMenuShareTimeline'
                        ]
                    });

                    wx.ready(function () {
                        // 分享给朋友
                        wx.onMenuShareAppMessage({
                            title: data.wxTitle,
                            desc: data.wxDesc,
                            link: share_link,
                            imgUrl: data.wxImgUrl,
                            type: '', // music video link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        // 分享到朋友圈
                        wx.onMenuShareTimeline({
                            title: data.wxTitle,
                            link: share_link,
                            imgUrl: data.wxImgUrl,
                        });

                    });
                    wx.error(function(res) {
                       // alert('wx.error: '+JSON.stringify(res));
                    });
                },
                error: function(){},
                beforeSend : function(){},
                complete: function(){},
                showLoading: false //是否显示loading效果
            });
        }

    },
    wxShareConCallback:function (data){
        // if(YMC.isWeiXin == false){
        //     //不在微信环境
        //     return ;
        // }
        if(data.wxLink){
            if (data.wxLink.indexOf('?') == -1) {
                data.wxLink += '?' + 'others=1';
            } else {
                data.wxLink += '&' + 'others=1';
            }
        }
        var url = 'http://ecmob.yaomaiche.com/api/services/Marketing/Share/GetJsApi';
        dataS = {
            "ApplicationId": "",
            "CurrentUrl": window.location.href
        };

        /**
         * weijing
         * 2015年11月27日20:40:38
         * 分享类型
         */
        var local = window.location.href;
        var shareType = "";
        if(YMC.gup(local).type=='MNYS'){
            shareType = "MnysShare";
        }else{
            shareType = "DtyxShare";
        }


        YMC.ajax({
            url:url,
            data:dataS,
            success: function(res){
                var rwx = res.result;
                wx.config({
                    debug: false,
                    appId: rwx.appId,
                    timestamp: rwx.timestamp,
                    nonceStr: rwx.noncestr,
                    signature: rwx.signature,
                    jsApiList: [
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline'
                    ]
                });
                wx.ready(function () {
                    // 分享给朋友
                    wx.onMenuShareAppMessage({
                        title: data.wxTitle,
                        desc: data.wxDesc,
                        link: data.wxLink,
                        imgUrl: data.wxImgUrl,
                        type: '', // music video link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            YMC.ajax({
                                url: 'http://ecmob.yaomaiche.com/api/services/Marketing/BasicStatistics/CreateBasicStatistics',
                                data: {
                                    "StatisticsType": shareType,
                                    "Param1": data.codeId
                                },
                                success:function(res){
                                    //不作处理
                                }
                            })
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    // 分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: data.wxTitle,
                        link: data.wxLink,
                        imgUrl: data.wxImgUrl,
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            YMC.ajax({
                                url: 'http://ecmob.yaomaiche.com/api/services/Marketing/BasicStatistics/CreateBasicStatistics',
                                data: {
                                    "StatisticsType": "DtyxShare",
                                    "Param1": data.codeId
                                },
                                success:function(res){
                                    //不作处理
                                }
                            })
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });
            },
            error: function(){},
            beforeSend : function(){},
            complete: function(){},
            showLoading: false //是否显示loading效果
        });
    },
    //localStorage相关
    // YMC.local("key","value") //存
    // YMC.local("key")         //取
    // YMC.local("key",null)    //删
    local:function(){
        var prefix = "";//前缀不能随便加，等到全部切换到vue的时候在加，否则页面跳转到page/xx.html的时候获取不到local
        var args = Array.prototype.slice.call( arguments );
        var key,value;
        key = prefix + args[0];
        if(args.length == 1){
            return window.localStorage.getItem(key);
        }
        if(args.length == 2){

            value = args[1];

            if($.type(value)=='null'){
                return window.localStorage.removeItem(key);
            }

            if($.type(value) === 'object'  ){
                value = JSON.stringify(value);
            }

            try{
                return window.localStorage.setItem(key, value);
            }catch(e){
                alert('您开启了秘密浏览或无痕浏览模式，请关闭');
            }
        }

    },
    isWeiXin: function (){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }else{
            return false;
        }
    }(),
    gup: function gup(url) {
        // get url's parameters
        // return an object
        // input: http://m.yaomaiche.com?id=ex1&id2=ex2
        // output: { "id": "ex1", "id2": "ex2" }
        var obj = {};
        var paraArr, strArr, urlArr, paraStr;
        if (url.indexOf("?") > -1) {
            urlArr = url.split("?");
            paraStr = urlArr[1]
        } else {
            paraStr = url
        }
        if (paraStr.indexOf("&") > -1) {
            paraArr = paraStr.split("&")
        } else {
            paraArr = new Array(paraStr)
        }

        for (var ind = 0; ind < paraArr.length; ind++) {
            try {
                paraArr[ind] = paraArr[ind].indexOf("=") > -1 ? paraArr[ind] : paraArr[ind] + "=";
                strArr = paraArr[ind].split("=");
                obj[strArr[0]] = decodeURIComponent(strArr[1].replace(/\+/g, " "))
            } catch (by) {}
        }
        return obj
    },
    sup: function sup(url, obj){
        // set url's parameters
        // return a url
        // input: http://m.yaomaiche.com, {"id": "ex1", "id2": "ex2"}
        // output: http://m.yaomaiche.com?id=ex1&id2=ex2
        var urlArr, paraStr, paraArr;

        if(url.indexOf("?") === -1){
            url += "?";
        }
        urlArr = url.split("?");
        paraStr = urlArr[1];

        if (paraStr.indexOf("&") > -1) {
            paraArr = paraStr.split("&")
        } else {
            if(paraStr){
                paraArr = new Array(paraStr)
            }else{
                paraArr = []
            }
        }

        if(Object.prototype.toString.call(obj).toLowerCase() === "[object object]"){
            for (var item in obj){
                if(obj.hasOwnProperty(item)){
                    paraArr.push(encodeURIComponent(item) + "=" + encodeURIComponent(obj[item]));
                }
            }
        }

        return urlArr[0] + "?" + paraArr.join("&");
    },
    urlJmp: function(targUrl, isUrlPara){
        var url = window.location.href,
            urlArr = url.split(/\//g),
            urlArrLen = urlArr.length,
            paraStr = "";

        if (url.indexOf("?") > -1) {
            paraStr = url.split("?")[1];
            if(paraStr.indexOf("source=") > -1){
                paraStr = paraStr.split("source=")[1];
            }
        }

        if(isUrlPara){
            return targUrl + "?source=" + paraStr;
        }else{
            return targUrl + "?source=" + encodeURIComponent(urlArr[urlArrLen-1]);
        }
    },
    isLocal: window.location.href.match(/http(s)?:\/\/(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/),//通过本地localhost 或者 通过本机ip地址
    isTest: window.location.href.match(/test\.(?:yaomaiche\.)?com/),//通过后端接口
    getAjaxUrl:function(url){

        //如果后端准备好了统一配置的脚本文件
        if(window.abp){
            return window.abp.webapiDomain+'/api/services/' + url;
        }

        var status = 'online';

        if(this.isLocal){
            status = 'local';
        }

        if(this.isTest){
            status = 'test';
        }

        var Mode = {
            online: 'http://ecmob.yaomaiche.com/api/services/',
            // test: 'http://ecmobile.test.yaomaiche.com/api/services/',
            test: 'http://ecmobile.shgqc.ymc.com/api/services/',
            local:'http://ecmobile.shgqc.ymc.com/api/services/'
            // local:'./'
        }
        return Mode[status] + (url || '');
        // return 'http://ecmob.yaomaiche.com/api/services/' + (url || '');
    },
    //获取图片地址，如果地址带有 http://那么就认为是绝对地址，然后直接返回
    getResourceUrl:function(url){
        if(url.match(/http:\/\//)){
            return url;
        }

        //全站统一配置
        if(window.abp){
            return window.abp.imageDomain + url;
        }

        var testUrl  = 'http://img.yaomaiche.com';  //此url到时候走配置

        if(this.isTest){
            testUrl = 'http://img.test.yaomaiche.com';
        }

        return testUrl + url;
    },
    log: function(logType , msg ){
        if(!this.debug || !window.console){
            return;
        }
        try{
            //存在打印类型就输出到控制台
            if(window.console[logType]){
                window.console[logType](JSON.parse(JSON.stringify(msg)));
            }else{
                //不存在打印类型(形参个数>1，提示logType写错；形参个数===1，直接输出到控制台)
                if(arguments.length>1){
                    window.console.log('logType undefined -→ '+'%c'+arguments[0],'color:red');
                }else if(arguments.length === 1){
                    window.console.log(JSON.parse(JSON.stringify(arguments[0])));
                }
            }
        }catch(ex){}
    },
    debug : false,
    /*
    {
        url     : '后端给的api地址'
        data    : {} 对象形式
        success : function
        error   : function
        使用：
        YMC.ajax({
            url        : ''
            data       : {},
            success    : function(res){},
            error      : function(){},
            beforeSend : function(){},
            complete   : function(){},
            showLoading: true //是否显示loading效果
        })
    }
     */
    ajax:function(opt){
        var url = YMC.getAjaxUrl(opt.url);
        if(opt.url.match(/http:\/\//)){ //如果传的url含有 http://说明是个绝对路径，就不用拼了
            url = opt.url;
        }
        $.ajax({
            type: "POST",
            dataType: "json",
            contentType: 'application/json',
            url: url,
            data: JSON.stringify(opt.data || {}),
            timeout: 20000,
            success: function(res){
                $.type(opt.success) === 'function' && opt.success(res);
            },
            error: function(xhr,error){
                if(error=='timeout' && opt.showLoading){
                    VUI.alert('<a href="javascript:void(0);" style="text-decoration: underline;" onclick="window.location.reload();">亲~网络不给力。点此刷新重试</a>',60000);
                }
                $.type(opt.error) === 'function' && opt.error();
            },
            beforeSend: function(xhr){
                var loginStatus = YMC.register.loginStatus();
                var userKey = YMC.getUserKey();

                if(loginStatus){
                    xhr.setRequestHeader("Authorization", "Bearer " + loginStatus);
                }

                if(userKey){
                    xhr.setRequestHeader("__UserKey", userKey );
                }
                // opt.showLoading && (router.app.$emit('showLoading'));
                opt.showLoading && (router.app.$emit('vShowLoad'));
                $.type(opt.beforeSend) === 'function' && opt.beforeSend(xhr);
            },
            complete: function(){
                setTimeout(function(){
                    // opt.showLoading && (router.app.$emit('hideLoading'));
                    opt.showLoading && (router.app.$emit('vHideLoad'));
                }, 400);
                $.type(opt.complete) === 'function' && opt.complete();
            }
        });
    },
    //获取用户vid，当用户未登陆时，如果选择车辆，会为用户分配一个vid，进入到购车方案中才会有对应的数据
    getUserKey:function(){
        var userKey = '';
        try{
            userKey = YMC.local("__UserKey") || '';
        }catch(e){
            return '';
        }
        return userKey;
    },
    // 不支持touchend的机型
    noTriggerTouchEnd: ['samsung sm-n9002', 'huawei sc-ul10', 'samsung-sm-n9109', 'samsung-gt-n7108','sm-n9109', 'mi 3w'],
    // 国双统计
    wdStatistic: function(){
        if(window.location.href.match('http(s)?:\/\/m.yaomaiche.com')){
        // 判断是否是生产
            var url = location.href;
            var host = location.host;
            // var hash = location.hash;
            var str = url.substring(url.indexOf(host)+host.length);
            var end = str.indexOf('?');
            if(end == -1){
                end = str.length;
            }
            var strHash=str,strAll='';
            YMC.log(strHash);
            if(str.indexOf("#") !=-1){
                // 不带参数
                strHash = str.substring(str.indexOf("#")+1, end);
                // 带参数
                if(str.indexOf('?') !=-1){
                    strAll = str.substring(str.indexOf("#")+1);
                }
            }
            YMC.log(strHash+'-----'+strAll);
            if (window._gsTracker) {
                _gsTracker.track ('/targetpage'+strHash);
                if(strAll){
                    _gsTracker.track ('/targetpage'+strAll);
                }
            }
        }
    },
    // 国双统计日志
    wdLog: function(user,orderNum,str){
        user = user || "";
        orderNum = orderNum || "";
        str = str || "";
        var imglog = new Image();
        if(window.location.href.match('http(s)?:\/\/m.yaomaiche.com')){
        // 判断是否是生产
            var rnd_id = "_img_" + Math.random();
            window[rnd_id] = imglog; // 全局变量引用
            imglog.onload = imglog.onerror = function () {
                window[rnd_id] = null; // 删除全局变量引用
            }

            imglog.src = "http://120.26.64.136:9001/api/gs/ClientLog?logstring=userKey:"+user+";orderId:"+orderNum+";state:"+str+";rd:"+Math.random();
        }
    }

};


YMC.debug = YMC.isLocal || YMC.isTest;
//支付地址
window.alipayUrl = 'http://pay.yaomaiche.com/ThirdPay/AliPay/Wap?tradeNo='; //PC淘宝提交地址
window.weixinPayUrl = 'http://pay.yaomaiche.com/ThirdPay/WeiPay/Index?tradeNo=';   //微信提交地址
window.weixinPicUrl = 'http://pay.yaomaiche.com/ThirdPay/WeiPay/Native?tradeNo=';  //微信二维码地址


//有全局配置的时候优先
if(window.abp){
    window.alipayUrl = window.abp.payDomain+'/ThirdPay/AliPay/Wap?tradeNo=';      //PC淘宝提交地址
    window.weixinPayUrl = window.abp.payDomain+'/ThirdPay/WeiPay/Index?tradeNo='; //微信提交地址
    window.weixinPicUrl = window.abp.payDomain+'/ThirdPay/WeiPay/Native?tradeNo=';//微信二维码地址
    window.appAlipayUrl = window.abp.payDomain+ '/ThirdPay/AliPay/App?tradeNo=';  //app里面使用支付宝支付的时候
    window.appWeiXinUrl = window.abp.payDomain+ '/ThirdPay/WeiPay/App?tradeNo=';  //app里面使用微信支付的时候
    window.appWeiXinChk = window.abp.payDomain+ '/ThirdPay/WeiPay/OrderIsSuccess?tradeNo=';  //app里面微信支付之后，检查是否支付成功
}

//注册相关
YMC.register = {
    registerNum : 60,
    //获取手机验证码
    getCode:function(mobile,errorfn){
        var data = {
            mobile: $.trim(mobile).replace(/\s/g,''),
        };

        YMC.ajax({
            url: 'Content/MessageValidate/CreateMobileValidateCodeSendMobile',
            data: data,
            success: function(res){
                var result = res.result;

            },
            error: function(){
                alert("获取验证码失败，请稍后再试", 1500, function(){
                    errorfn && errorfn();
                });
            }
        });
    },
    //电话
    validateMobile:function(mobile){
        mobile = $.trim(mobile).replace(/\s/g,'');
        if (!(/^(13[0-9]|15[012356789]|17[0123456789]|18[0-9]|14[57])[0-9]{8}$/.test($.trim(mobile)))) {
                return false;
        }else{
            return true;
        }
    },
    //验证身份证
    validateIdNumber:function(idNumber){
        idNumber = idNumber.replace(/\s+/g,"");
        var reg=/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
        if (reg.test(idNumber)) {
            return true;
        }else{
            return false;
        }
    },
    //倒计时
    coutDown:function(btn,ele){
            var txt = "s";
            var _this=this;
            if (this.registerNum == 0) {
                btn.show();
                ele.hide();
                this.registerNum = 60;
            } else {
                txt = this.registerNum + "s";
                ele.text(txt).show();
                btn.hide();
                this.registerNum--;
                setTimeout(function(){_this.coutDown(btn,ele)}, 1000);
            }
    },
    //验证手机验证码
    checkCode:function(Mobile,Code,succFn,url){
        var data = {
            Mobile: $.trim(Mobile).replace(/\s/g,''),
            Code: $.trim(Code)
        };
        YMC.ajax({
            url: url || "Content/MessageValidate/IsSuccessMobileValidateBySendCode",
            data: data,
            success: function(res){
                var result = res.result;
                if(res.success && res.result.result){
                    succFn.call();
                }else{
                    alert(res.result.message, 1500);
                }
            },
            error: function(){
                alert("验证码错误", 1500);
            }
        });
    },
    //登录状态，有字符串表示登录成功，字符串为token值；false未登录。
    loginStatus: function(){
        var date = (new Date()).getTime(),
            ymcToken = YMC.local("ymcToken") || "";

        if(ymcToken){
            ymcToken = JSON.parse(ymcToken);
            if(ymcToken.id&&(ymcToken.expireTime-date)>0){
                return ymcToken.id;
            }
            YMC.local("ymcToken", null);
        }

        return '';
    },
    //设置用户token {token:'',expiresMinutes:'分钟数'}
    setYMCToken: function(data, uid){
        var expireTime = (new Date()).getTime() + data.expiresMinutes*60*1000,
            ymcToken = {
                "id": data.token,
                "expireTime": expireTime,
                "userid": uid || ""
            };

        if(data.ymC_Token){
            $.fn.cookie('ymc_userkey',data.ymC_Token,{ expires: 3650});
        }
        YMC.local("ymcToken", JSON.stringify(ymcToken));
    },
    //app用户登陆
    setYMCAPPToken:function(data){

        // if(YMC.register.loginStatus() == data.token){
        //     //在app中每次都会调用，避免重复设置localstorage
        //     return;
        // }
        var ymcToken = {
            "id": data.token || '',
            "expireTime": data.expiredTime || 0,
            "userid":data.userID || ''
        };

        YMC.local("ymcToken", JSON.stringify(ymcToken));
        if(ymcToken.id==''){
            //没有token,说明已经登出，删除cookie
            $.fn.cookie('ymc_userkey','',{ expires: -1});
            return;
        }
        if(data.userUniqueCode){
            $.fn.cookie('ymc_userkey',data.userUniqueCode,{ expires: 3650});
        } else {
            //ios中没有  data.userUniqueCode 字段时
            YMC.register.convertToken(
                function(ymc_userkey){
                    $.fn.cookie('ymc_userkey',ymc_userkey,{ expires: 3650});
                }
            );
        }
    },
    //将token转换为ymc_userkey
    convertToken:function(cb){
        YMC.ajax({
            url: "UserAccount/UserLogin/GetUserKey",
            success: function (res) {
                if(res.success){
                    cb(res.result);
                } else {
                    //未登录
                }
            }
        });
    },
    //提供登出方法，提供以后使用
    loginOutWeb:function(){
        YMC.local("ymcToken", null);
        $.fn.cookie('ymc_userkey','',{ expires: -1 });
    }
}

// 支付相关
// 微信支付 YMC.pay.weixin('订单号');
// 支付宝支付 YMC.pay.alipay('订单号');
YMC.pay = {
    isPaying:false,
    weixin:function(orderNum){
        var _this = this;

        //上报订单号，潜客id
        window._track && _track.setD({orderId:orderNum});

        // 国双统计(支付页面和第三方页面中间虚拟一个中间页用于统计)-start
        if (window._gsTracker) {
            _gsTracker.track ("/targetpage/paying");
            YMC.wdLog('', orderNum, "/targetpage/paying-上报页面");
            // new Image().src="http://120.26.64.136:9001/api/gs/ClientLog?logstring=orderId:"+orderNum+";state:/targetpage/paying-上报页面";
        }
        // 国双统计-end

        //正在支付
        if(this.isPaying){
            return;
        }

        this.isPaying = true;
        setTimeout(function(){
            _this.isPaying = false;
        },1500);
        //app环境
        if(window.Prius && Prius.isInsideApp){
            this.appWeixin(orderNum);
            return;
        }
        //web环境
        this.webWeixin(orderNum);
    },
    webWeixin:function(orderNum){
        var _this = this;
            if(YMC.isWeiXin){
                //VUI.alert('前往支付。。。');
                _this.isPaying = false;
                window.location.href = window.weixinPayUrl+orderNum;
                return false;
            } else {
                if(!document.getElementById('weixin')){
                    var d = document.createElement('div');
                    d.innerHTML = ''+
                        '<div id="weixin-Confirm" style="display:none">'+
                        '    <div id="weixin" class="weixin">'+
                        '        <p style="text-align:center; ">'+
                        '            <img id="weixinimg" title="二维码" height="120" width="120" src="" style="margin:auto">'+
                        '        </p>'+
                        '        <p class="mt5">1.请用手机的屏幕截图功能将包含上方二维码区域的屏幕保存到手机本地图片相册。</p>'+
                        '        <p class="mt5">2.然后打开微信APP，在“扫一扫”功能中使用图片扫码功能完成支付。</p>'+
                        '        <p class="mt5">3.微信端提示支付成功后，请主动返回此页面，点击“支付已完成”按键</p>'+
                        '    </div>'+
                        '</div>';
                    document.body.appendChild(d);
                }


                //浏览器环境
                //修改图片url
                $('#weixinimg').attr('src', window.weixinPicUrl + orderNum);
                    VUI.confirm($('#weixin').html(), "微信二维码扫码支付 ", [function (e) {
                    _this.isPaying = false;
                    e.stopPropagation();
                    //this.hide();
                    //document.location.reload(true);
                }, function (e) {
                    _this.isPaying = false;
                    //如果是浏览器环境
                    // 如果是闪购报名，以Q开头
                    if(orderNum.slice(0,1) == "Q"){
                        if(YMC.local('rushEnrId')){
                            router.go({
                                name: 'rushEnrSuccess',
                                query: {
                                    orderNo: orderNum,
                                    enrollingId: YMC.local('rushEnrId')
                                }
                            });
                        }
                        return false;
                    }else{
                        YMC.ajax({
                            url: 'products/order/getPayOrderInfo?orderNum=' + orderNum,
                            success: function(res){
                                _this.isPaying = false;
                                var result = res.result;
                                if(res.success){
                                    //请求成功
                                    if(result.orderStatus == 20){
                                        //支付成功
                                        //跳转支付成功页面
                                        if(orderNum.slice(0,1) == 'G'){
                                            window.location.href="./grouppaysuccess.html?orderNo=" + orderNum;
                                            return false;
                                        }
                                        router.go({name:'paySuccess'});
                                    } else {
                                        VUI.alert("订单正在处理中，请稍等，可到订单跟踪页查看。", 2000);
                                    }

                                } else {
                                    //支付请求失败
                                    VUI.alert(res.error.message);
                                }
                            }
                        });
                    }

                    //为了能埋点，而且能让用户点击返回最大
                }], 1000000, "<div ubt='weixinProblem'>支付遇到问题</div>", "<div ubt='paySuccess'>支付成功</div>");
            };
    },
    appWeixin:function(orderNum){
        var _this = this;
        this.appAjax({
            url : window.appWeiXinUrl + orderNum,
            //url : "http://eliya0628.vicp.cc/ThirdPay/WeiPay/App",
            success:function(res){

            var wechatData = res.result;
                //原生支付
                var payData = {
                    tradeNo      : orderNum,                //订单ID，必须传
                    appId        : wechatData.appId,          //微信支付参数
                    partnerId    : wechatData.partnerId,  //微信支付参数
                    prepayId     : wechatData.prepayId,    //微信支付参数
                    nonceStr     : wechatData.nonceStr,    //微信支付参数
                    timeStamp    : wechatData.timeStamp,  //微信支付参数
                    paySign      : wechatData.paySign,
                    signType     : wechatData.signType     //微信支付参数
                };
                var listener = {
                    onSuccess:function(){
                        _this.isPaying = false;
                        _this.weixinPayCallback(orderNum);
                        //支付成功
                        //window.location.href="./paySuccess.html";
                    },
                    onFail: function(reason) {
                        _this.isPaying = false;
                        setTimeout(function(){
                            VUI.alert('支付失败，请稍后再试');
                        },100);
                        //支付失败
                        //window.location.href="../index.html";
                    },
                    onCancel: function(reason) {
                        _this.isPaying = false;
                        // setTimeout(function(){
                        //     VUI.alert('支付失败，请稍后再试');
                        // },100);
                        //支付取消
                        //window.location.href="../index.html";
                    }
                };
                Prius.wechatPay( payData, listener );

            }
        });
    },
    weixinPayCallback:function(orderNum){
        var _this = this;
        this.appAjax({
            url : window.appWeiXinChk + orderNum,
            showLoading:true,
            success:function(res){
                _this.isPaying = false;
                if(res.success){
                    if(orderNum.slice(0,1) == 'G'){
                        router.go({name:'grouppaysuccess',query:{orderNo:orderNum}});
                        return false;
                    }
                    router.go({name:'paySuccess'});
                }else {
                    //支付失败
                    VUI.alert('微信支付失败');
                }
            }
        });
    },
    alipay:function(orderNum){
        var _this = this;
        //上报订单号，潜客id
        window._track && _track.setD({orderId:orderNum});

        // 国双统计(支付页面和第三方页面中间虚拟一个中间页用于统计)-start
        if (window._gsTracker) {
            _gsTracker.track ("/targetpage/paying");
            YMC.wdLog('', orderNum, "/targetpage/paying-上报页面");
            // new Image().src="http://120.26.64.136:9001/api/gs/ClientLog?logstring=orderId:"+orderNum+";state:/targetpage/paying-上报页面";
        }
        // 国双统计-end

        //正在支付
        if(this.isPaying){
            return;
        }

        this.isPaying = true;
        setTimeout(function(){
            _this.isPaying = false;
        },1500);
        //app环境
        if(window.Prius && Prius.isInsideApp){
            this.appAliPay(orderNum);
            return;
        }
        //web环境
        this.webAliPay(orderNum);
    },
    webAliPay:function(orderNum){
        var _this = this;
        this.isPaying = false;
        window.location.href = window.alipayUrl + orderNum;
    },
    appAliPay:function(orderNum){
        var _this = this;
        _this.appAjax({
            url : window.appAlipayUrl + orderNum,
            //url : 'http://eliya0628.vicp.cc/ThirdPay/AliPay/App',
            //data:{tradeNo:orderNum },
            success:function(res){
                var result = res.result;

                // var alipayData = data.result;
                // Prius.aliPay({
                //     tradeNo: tradeNo,             //订单ID，必须传
                //     orderInfo: alipayData.sign    //支付宝支付参数
                // }, callback);

                //原生支付
                var payData = {
                    tradeNo:orderNum,
                    orderInfo:result.payInfo //支付宝支付参数
                };

                var listener = {
                    onSuccess:function(){
                        _this.isPaying = false;
                        //支付成功
                        if((orderNum + '').slice(0,1) == 'G'){
                            router.go({name:'grouppaysuccess',query:{orderNo:orderNum}});
                            return false;
                        }
                        router.go({name:'paySuccess'});
                        return false;
                    },
                    onFail: function(reason) {
                        _this.isPaying = false;
                        VUI.alert('支付失败，请稍后再试');
                        //支付失败
                        //window.location.href="../index.html";
                    },
                    onCancel: function(reason) {
                        _this.isPaying = false;
                        VUI.alert('支付失败，请稍后再试');
                        //支付取消
                        //window.location.href="../index.html";
                    }
                };
                Prius.aliPay( payData, listener );
            }
        });
    },
    appAjax:function(opt){
        var _this = this;
        $.ajax({
            type: "GET",
            url: opt.url+'&rnd='+ (+new Date()+''),
            data: (opt.data || {}),
            timeout: 60000,
            success: function(res){
                 $.type(opt.success) === 'function' && opt.success(res);
            },
            beforeSend: function(xhr){
                var loginStatus = YMC.register.loginStatus();
                var userKey = YMC.getUserKey();
                if(loginStatus){
                    xhr.setRequestHeader("Authorization", "Bearer " + loginStatus);
                }
                if(userKey){
                    xhr.setRequestHeader("__UserKey", userKey );
                }
                // opt.showLoading && (router.app.$emit('showLoading'));
                opt.showLoading && (router.app.$emit('vShowLoad'));
            },
            error:function(xhr,type){
                VUI.alert('服务器异常请稍后再试。');
            },
            complete: function(){
                // opt.showLoading && (router.app.$emit('hideLoading'));
                opt.showLoading && (router.app.$emit('vHideLoad'));
                $.type(opt.complete) === 'function' && opt.complete();
            }
        });
    }

}

//IScroll5+在ios、android点击（click）事件不兼容解决方法，iscroll5android,参考http://www.cnphp6.com/archives/58106
YMC.iScrollClick= function(){
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
    if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
    if (/Silk/i.test(navigator.userAgent)) return false;
    if (/Android/i.test(navigator.userAgent)) {
       var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
       return parseFloat(s[0]+s[3]) < 44 ? false : true
    }
}();


/*
针对有时候过场动画没有完成，下一页还未切入进来
此时操作dom失败。
尝试十次。
使用：
    YMC.waitDomInsert(function(){
        console.log('waitDomInsert...');
        if($('#insurance_step2 .ins-title').length){
            _this.fixedNavTop = $('#insurance_step2 .ins-title').eq(_this.navIndex).offset().top;
            //满足条件后要return true
            return true;
        }
    });
 */
YMC.waitDomInsert=function(fn){
    var n = 0;
    (function _time(){
        ++n;
        if(n>10){
            YMC.log('尝试10次失败');
            return;
        }
        if(fn()){
            YMC.log('try'+n);
            return;
        }
        setTimeout(function(){_time()},150);
    })();
}


window.VUI = {
    alert:function(msg,timer,fn){
        router.app.$emit('alert',msg,timer,fn);
    },
    confirm:function(content,title,fnArr,timer,confirmTxt,cancelTxt){
        router.app.$emit('confirm',content,title,fnArr,timer,confirmTxt,cancelTxt);
    },
    //分享
    //手动调用时直接触发分享
    share:function(opt){
        // opt:{
        //     title:'',
        //     content:'',
        //     imgUrl:'',
        //     url:''
        // }
        router.app.$emit('share',opt);
    }


}

// 国双统计
function gstrack(obj){
    var k = {
        id: '',
        name: ''
    };
    if(window.location.href.match('http(s)?:\/\/m.yaomaiche.com')){
    // 判断是否为线上
        k.id = obj.attr('gsq');
        if(obj.attr('gsqName')){
            k.name = obj.attr('gsqName');
            _gsTracker.trackEvent("click",k.name,k.id);
        }else{
            _gsTracker.trackEvent("click",k.id);
        }
    }
    // var k = JSON.parse($(this).attr('gsq'));
    window.YMC && YMC.log(k);
}
setTimeout(function(){
    var eventType = "ontouchstart" in window || "ontouchend" in window.document;
    //监听页面上所有带 upt 属性的字段
    eventType = eventType ? 'touchstart':'mousedown';
    var moved = false;
    $(document.body).on(eventType,'[gsq]',function(e){

        //左键 0 中键 1 右键 2
        var btnNum = e.button;
        //如果是在pc上，而且点击的不是左键，那么不记录
        if ( eventType=="mousedown" && btnNum!=0){
            return;
        }
        if(window._gsTracker){
            //移动端处理
            if(eventType == 'touchstart'){
                moved = false;
                $(this).one('touchmove',function(){
                    moved = true;
                }).one('touchend',function(){
                    //没有移动过
                    if(moved==false){
                        gstrack($(this));
                    }
                });
                return;
            }else{
                gstrack($(this));
            }
        }

    });


    //有登录状态，没有ymc_userkey的时候去取一下
    if(!$.fn.cookie('ymc_userkey') && YMC.register.loginStatus() ){
        YMC.register.convertToken(
            function(ymc_userkey){
                $.fn.cookie('ymc_userkey',ymc_userkey,{ expires: 3650});
            }
        );
    }

}, 100);


module.exports = YMC;