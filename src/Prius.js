'use strict';

///Prius JS

/**
 * 加解密操作
 */
;if (!window._base64) {
  var _base64 = (function() {

    var base64 = {};

    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var lookup = null;

    base64.encode = function (s) {
      var buffer = base64.toUtf8(s),
        position = -1,
        result,
        len = buffer.length,
        nan0, nan1, nan2, enc = [, , ,];

      result = '';
      while (++position < len) {
        nan0 = buffer[position];
        nan1 = buffer[++position];
        enc[0] = nan0 >> 2;
        enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
        if (isNaN(nan1))
          enc[2] = enc[3] = 64;
        else {
          nan2 = buffer[++position];
          enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
          enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
        }
        result += alphabet[enc[0]] + alphabet[enc[1]] + alphabet[enc[2]] + alphabet[enc[3]];
      }
      return result;
    };

    base64.toUtf8 = function (s) {
      var position = -1,
        len = s.length,
        chr, buffer = [];

      if (/^[\x00-\x7f]*$/.test(s)) {
        while (++position < len) {
          buffer.push(s.charCodeAt(position));
        }
      } else {
        while (++position < len) {
          chr = s.charCodeAt(position);
          if (chr < 128)
            buffer.push(chr);
          else if (chr < 2048)
            buffer.push((chr >> 6) | 192, (chr & 63) | 128);
          else
            buffer.push((chr >> 12) | 224, ((chr >> 6) & 63) | 128, (chr & 63) | 128);
        }
      }
      return buffer;
    };

    base64.decode = function (s) {
      s = s.replace(/\s/g, '');
      if (s.length % 4) {
        throw new Error('InvalidLengthError: decode failed: The string to be decoded is not the correct length for a base64 encoded string.');
      }

      if(/[^A-Za-z0-9+\/=\s]/g.test(s)) {
        throw new Error('InvalidCharacterError: decode failed: The string contains characters invalid in a base64 encoded string.');
      }

      var buffer = base64.fromUtf8(s),
        position = 0,
        result,
        len = buffer.length;

      result = '';
      while (position < len) {
        if (buffer[position] < 128) {
          result += String.fromCharCode(buffer[position++]);
        } else if (buffer[position] > 191 && buffer[position] < 224) {
          result += String.fromCharCode(((buffer[position++] & 31) << 6) | (buffer[position++] & 63));
        } else {
          result += String.fromCharCode(((buffer[position++] & 15) << 12) | ((buffer[position++] & 63) << 6) | (buffer[position++] & 63));
        }
      }
      return result;
    };

    base64.fromUtf8 = function (s) {
      var position = -1,
        len, buffer = [],
        enc = [, , ,];

      if (!lookup) {
        len = alphabet.length;
        lookup = {};
        while (++position < len) {
          lookup[alphabet.charAt(position)] = position;
        }
        position = -1;
      }

      len = s.length;
      while (++position < len) {
        enc[0] = lookup[s.charAt(position)];
        enc[1] = lookup[s.charAt(++position)];
        buffer.push((enc[0] << 2) | (enc[1] >> 4));
        enc[2] = lookup[s.charAt(++position)];
        if (enc[2] === 64) {
          break;
        }
        buffer.push(((enc[1] & 15) << 4) | (enc[2] >> 2));
        enc[3] = lookup[s.charAt(++position)];
        if (enc[3] === 64) {
          break;
        }
        buffer.push(((enc[2] & 3) << 6) | enc[3]);
      }
      return buffer;
    };

    return base64;
  }());
}


if (!window.Prius) {
  var Prius = (function() {

    var prius = {};
    prius.scheme = "ymcar://";

    prius.isInsideApp = false; // 判断是否在APP应用内
    prius.isYaomaiche = false; // 是否在要买车应用内
    prius.isCarMaster = false; // 是否在车达人应用内
    prius.clientVersion = null; // 获得当前终端的版本号

    if (window.navigator.userAgent) {
      var ua = window.navigator.userAgent.toLocaleLowerCase();
      prius.isInsideApp = ua.indexOf("yuntubrowser", 0) != -1;
      prius.isYaomaiche = ua.indexOf("yaomaiche", 0) != -1;
      prius.isCarMaster = ua.indexOf("carmaster", 0) != -1;
      prius.isAndroid = ua.indexOf("yuntuandroid", 0) != -1;
      prius.isIOS = ua.indexOf("yuntuios", 0) != -1;

      if (prius.isInsideApp) {
        var versionReg = /([\s\S]*)yuntubrowser-(\S*)\/(\S*)(nettype[\S\s]*)/;
        var version = ua.replace(versionReg, "$3");
        if (version !== '#') {
          prius.clientVersion = version;
        }

        if (ua.indexOf("deviceid", 0) != -1 && ua.indexOf("pushtoken", 0) != -1) {
          var reg = /([\s\S]*)yuntubrowser-(\S*)\/(\S*)nettype\/(\S*)deviceid\/(\S*)pushtoken\/(\S*)(yuntu[\S\s]*)/;
          var nettype = ua.replace(reg, "$4");
          if (version !== '#') {
            prius.netType = nettype;
          }
          var deviceid = ua.replace(reg, "$5");
          if (version !== '#') {
            prius.deviceID = deviceid;
          }
          var pushtoken = ua.replace(reg, "$6");
          if (version !== '#') {
            prius.pushToken = pushtoken;
          }
        }
      }
    }

    /**
     * 全局事件监听listener
     * event structure
     * {
     *  eventId: "事件名称，字符串",
     *  listener: "事件回调"
     * }
     * listener structure
     * {
     *  onGlobalEvent(data) //其中的data需要做base64加密
     * }
     */
    var globalListener = {};

    /**
     * 触发全局监控事件
     * @param eventId eventId
     * @param data data
     * data的数据结构为 （其中的data需要做base64加密）
     * {
     *  token: "xxxx"
     *  other: "xxxx"
     * }
     */
    prius.fireGlobalEvent = function(eventId, data) {
      if (globalListener && eventId && globalListener[eventId]) {
        globalListener[eventId].onGlobalEvent(data ? JSON.parse(data) : "");
      }
    };

    /**
     * native执行全局事件
     * @param encodeEvent encodeEvent
     * @param encodeData encodeData
     */
    prius.nativeFireGlobalEvent = function(encodeEvent, encodeData) {
      if (encodeEvent) {
        var event = encodeEvent ? _base64.decode(encodeEvent) : "";
        var data = encodeData ? _base64.decode(encodeData) : "";
        prius.fireGlobalEvent(event, data);
      }
    };

    /**
     * 添加全局监听事件
     * @param eventId eventId
     * @param listener listener
     * @returns {boolean} 是否添加成功
     * listener的数据结构
     * {
     *  onGlobalEvent(data)
     * }
     */
    prius.addGlobalEventListener = function(eventId, listener) {
      if (eventId && listener) {
        if (globalListener[eventId]) {
          return true;
        }
        globalListener[eventId] = listener;
        return true;
      }
      return false;
    };

    /**
     * 删除全局监控事件
     * @param eventId eventId
     * @returns {boolean} 是否删除成功
     */
    prius.removeGlobalEventListener = function(eventId) {
      if (eventId) {
        if (globalListener[eventId]) {
          delete globalListener[eventId];
          return true;
        }
      }
      return false;
    };

    /**
     * 执行访问native的url
     */
    prius.nativeExecute = function(actionUrl) {
      var iframe = document.createElement("IFRAME");
      iframe.setAttribute("src", actionUrl);
      document.documentElement.appendChild(iframe);
      iframe.parentNode.removeChild(iframe);
      iframe = null;
    };


    /**
     * 将请求体Json数据加密后处理成scheme格式
     * @param path path
     * @param params params
     */
    prius.executeActionUrl = function(path, params) {
      var actionUrl = prius.scheme + path;
      if (params) {
        actionUrl += "?param=" + _base64.encode(
            "string" === typeof params ? params : JSON.stringify(params));
      }
      prius.nativeExecute(actionUrl);
    };


    /**
     * 通用操作PATH列表
     */
    var PATH_LIST = prius.PATH_LIST = {
      SHOW_TOAST: "show/toast",   // 弹一个提示Toast
      LOCATION_CITY: "location/city",   // 获取定位城市
      LOCATION_ADDRESS: "location/address",   // 获取定位地址
      LOCATION_COORDINATES: "location/coordinates", // 获取经纬度
      SHARE_INFO: "share/info",   // 内容分享
      SHARE_APP: "share/app",   // 分享APP
      PAY_WEIXIN: "pay/weixin",   // 微信支付订单
      PAY_ALIPAY: "pay/alipay",   // 支付宝支付订单
      OPEN_NEW_PAGE: "open/newpage", // 打开新页面
      APP_TELEPHONE: "app/telephone", // 拨打电话
      APP_STATISTIC: "app/statistic", // UBT统计
      ADD_SHARE_MENU: "add/sharemenu", // 添加Menu
      USER_LOGIN_IN: "user/loginin", // 用户登录后回调
      USER_LOGIN_OUT: "user/loginout", // 用户退出后回调
      USER_LOGIN: "user/login", //获取用户信息
      PAGE_MAIN: "page/main", //打开首页
      PAGE_MYINFO: "page/myinfo", //打开我的个人信息页面
      PAGE_LOGIN: "page/login", //打开用户登录页面
      PAGE_REGISTER: "page/register", //打开用户注册页面
      PAGE_URL_OVERRIDE: "page/urloverride", //是否控制当前链接
      PAGE_END: "page/end", //page end
    };

    /**
     * callback 数据结构
     * {
     *    callId: "XXX",
     *    onSuccess: "xxxx",
     *    onFail: "xxxx",
     *    onCancel: "xxxxx",
     * }
     * 保存所有的callback回调
     */
    var callbackList = {};

    /**
     * 添加一个交互回调
     * @param callback callback
     * @return {boolean} 是否添加回调成功
     */
    prius.addCallback = function (callback) {
      if (callback && callback.callId && callbackList) {
        callbackList[callback.callId] = callback;
        return true;
      }
      return false;
    };


    /**
     * 移除一个交互回调
     * @param callback callback
     * @return {boolean} 是否删除回调成功
     */
    prius.removeClientCall = function (callback) {
      if (callback && callback.callId && callbackList && callbackList[callback.callId]) {
        delete callbackList[callback.callId];
        return true;
      }
      return false;
    };


    /**
     * 回调成功事例，json数据格式为以下
     * {
     *    callId: "xxxx/xxxx",
     *    data: {
     *    }
     *  }
     */
    prius.onCallbackDone = function (origin) {
      if (origin) {
        var result = JSON.parse(_base64.decode(origin));
        if (result && result.callId) {
          var callback = callbackList[result.callId];

          if (callback && callback.onSuccess) {
            console.log("Wowwwwww: " + JSON.stringify(result));
            var params = result.data || "";
            callback.onSuccess(params);
            prius.removeClientCall(callback);
            return;
          } else {
            console.log("Callbackdone is null or CallbackDone.onSuccess is null!");
          }
        } else {
          console.log("CallbackDone.callId is null!");
        }
      }
      console.log("Fail onCallbackDone, something wrong can't callback!");
    };


    /**
     * 回调失败
     * @param origin 原始数据
     * {
     *   scheme: "xxxx/xxxx",
     *   callId: "xxxx/xxxx",
     *   data: {
     *     msg: "一般为用户取消的原因"
     *   }
     * }
     */
    prius.onCallbackFail = function (origin) {
      if (origin) {
        var result = JSON.parse(_base64.decode(origin));
        if (result && result.callId) {
          var callback = callbackList[result.callId];
          if (callback && callback.onFail) {
            callback.onFail(result.data || "");
            return;
          } else {
            console.log("CallbackFail is null or CallbackDone.onFail is null!");
          }
        } else {
          console.log("CallbackFail.callId is null!");
        }
      }
      console.log("Fail onCallbackFail, something wrong can't callback!");
    };


    /**
     * 取消执行
     * @param origin 原始数据
     * {
     *   scheme: "xxxx/xxxx",
     *   callId: "xxxx/xxxx",
     *   data: {
     *     msg: "一般为用户操作失败原因"
     *   }
     * }
     */
    prius.onCallbackCancel = function (origin) {
      if (origin) {
        var result = JSON.parse(_base64.decode(origin));
        if (result && result.callId) {
          var callback = callbackList[result.callId];
          if (callback && callback.onCancel) {
            callback.onCancel(result.data || "");
            return;
          } else {
            console.log("CallbackCancel is null or CallbackDone.onCancel is null!");
          }
        } else {
          console.log("CallbackCancel.callId is null!");
        }
      }
      console.log("Fail onCallbackCancel, something wrong can't callback!");
    };

    /**
     * 弹Toast
     * @param phoneNumber phoneNumber
     */
    prius.dialPhone = function(phoneNumber) {
      if (phoneNumber) {
        var param = {
          callId: PATH_LIST.APP_TELEPHONE,
          data: {
            tel: phoneNumber || ""
          }
        };
        prius.executeActionUrl(PATH_LIST.APP_TELEPHONE, param);
      }
    };


    /**
     * 弹Toast
     * @param message message
     */
    prius.showToast = function(message) {
      if (message) {
        var param = {
          callId: PATH_LIST.SHOW_TOAST,
          data: {
            content: message || ""
          }
        };
        prius.executeActionUrl(PATH_LIST.SHOW_TOAST, param);
      }
    };


    /**
     * 获取定位城市
     * @param listener listener
     */
    prius.getLocationCity = function(listener) {
      listener = listener || {};
      var callback = {
        callId: PATH_LIST.LOCATION_CITY,
        onSuccess: listener.onSuccess,
        onCancel: listener.onCancel,
        onFail: listener.onFail
      };
      prius.addCallback(callback);
      var params = {
        callId: PATH_LIST.LOCATION_CITY
      };
      prius.executeActionUrl(PATH_LIST.LOCATION_CITY, params);
    };


    /**
     * 获取定位地址信息
     * @param listener listener
     */
    prius.getLocationAddress = function(listener) {
      listener = listener || {};
      var callback = {
        callId: PATH_LIST.LOCATION_ADDRESS,
        onSuccess: listener.onSuccess,
        onCancel: listener.onCancel,
        onFail: listener.onFail
      };
      prius.addCallback(callback);
      var params = {
        callId: PATH_LIST.LOCATION_ADDRESS
      };
      prius.executeActionUrl(PATH_LIST.LOCATION_ADDRESS, params);
    };

    /**
     * 获取经纬度信息
     * @param listener listener
     */
    prius.getCoordinates = function(listener) {
      listener = listener || {};
      var callback = {
        callId: PATH_LIST.LOCATION_COORDINATES,
        onSuccess: listener.onSuccess,
        onCancel: listener.onCancel,
        onFail: listener.onFail
      };
      prius.addCallback(callback);
      var params = {
        callId: PATH_LIST.LOCATION_COORDINATES
      };
      prius.executeActionUrl(PATH_LIST.LOCATION_COORDINATES, params);
    };

    /**
     * 启动分享
     * @param listener listener
     * @param title 分享标题
     * @param content 分享内容
     * @param link 分享链接
     */
    prius.shareInfo = function(title, content, link, listener) {
      listener = listener || {};
      var callback = {
        callId: PATH_LIST.SHARE_INFO,
        onSuccess: listener.onSuccess,
        onCancel: listener.onCancel,
        onFail: listener.onFail
      };
      prius.addCallback(callback);
      var params = {
        callId: PATH_LIST.SHARE_INFO,
        data: {
          title: title || "",
          content: content || "",
          link: link || ""
        }
      };
      prius.executeActionUrl(PATH_LIST.SHARE_INFO, params);
    };

    /**
     * 启动分享
     * @param listener listener
     * @param title 分享标题
     * @param content 分享内容
     * @param link 分享链接
     * @param imgLink 分享的图片地址
     */
    prius.shareInfoWithImg = function(title, imgLink, content, link, listener) {
      listener = listener || {};
      var callback = {
        callId: PATH_LIST.SHARE_INFO,
        onSuccess: listener.onSuccess,
        onCancel: listener.onCancel,
        onFail: listener.onFail
      };
      prius.addCallback(callback);
      var params = {
        callId: PATH_LIST.SHARE_INFO,
        data: {
          title: title || "",
          content: content || "",
          link: link || "",
          imgLink: imgLink || ""
        }
      };
      prius.executeActionUrl(PATH_LIST.SHARE_INFO, params);
    };

    /**
     * 微信支付
     * @param originData 微信支付的参数加上订单号
     * @param listener 回调
     */
    prius.wechatPay = function(originData, listener) {
      listener = listener || {};
      var callback = {
        callId: PATH_LIST.PAY_WEIXIN,
        onSuccess: listener.onSuccess,
        onCancel: listener.onCancel,
        onFail: listener.onFail
      };
      prius.addCallback(callback);
      var params = {
        callId: PATH_LIST.PAY_WEIXIN,
        data: originData || {}
      };
      prius.executeActionUrl(PATH_LIST.PAY_WEIXIN, params);
    };

    /**
     * 支付宝支付
     * @param originData 支付宝支付参数加上订单号
     * @param listener 回调
     */
    prius.aliPay = function(originData, listener) {
      listener = listener || {};
      var callback = {
        callId: PATH_LIST.PAY_ALIPAY,
        onSuccess: listener.onSuccess,
        onCancel: listener.onCancel,
        onFail: listener.onFail
      };
      prius.addCallback(callback);
      var params = {
        callId: PATH_LIST.PAY_ALIPAY,
        data: originData || {}
      };
      prius.executeActionUrl(PATH_LIST.PAY_ALIPAY, params);
    };

    /**
     * 外链打开新的页面加载，并且是带返回按钮
     * @param linkUrl 需要打开的网页链接
     */
    var lastOpenTime = 0;
    prius.openNewPage = function(title, linkUrl) {
      var curTime = new Date().getTime();
      if (curTime - lastOpenTime < 500) {
        return;
      }
      lastOpenTime = curTime;
      var params = {
        callId: PATH_LIST.OPEN_NEW_PAGE,
        data: {
          title: title || "",
          link: linkUrl || ""
        }
      };
      prius.executeActionUrl(PATH_LIST.OPEN_NEW_PAGE, params);
    };

    /**
     * UBT统计传给本地去上传
     * @param ubtData ubtData
     */
    prius.uploadUBTStatistic = function(ubtData) {
      var params = {
        callId: PATH_LIST.APP_STATISTIC,
        data: {
          ubtData: ubtData || ""
        }
      };
      prius.executeActionUrl(PATH_LIST.APP_STATISTIC, params);
    };

    /**
     * 用户登录通知native端
     * @param token 用户token
     * @param userId 用户userId
     * @param userName 用户
     */
    prius.appLoginIn = function(token, userId, userName) {
      var params = {
        callId: PATH_LIST.USER_LOGIN_IN,
        data: {
          token: token || "",
          userId: userId || "",
          userName: userName || ""
        }
      };
      prius.executeActionUrl(PATH_LIST.USER_LOGIN_IN, params);
    };

    /**
     * 用户退出通知native端
     * 退出登录不需要传参数
     */
    prius.appLoginOut = function() {
      var params = {
        callId: PATH_LIST.USER_LOGIN_OUT
      };
      prius.executeActionUrl(PATH_LIST.USER_LOGIN_OUT, params);
    };


    /**
     * 调取原生的接口，登录
     * @param listener 回调
     */
    prius.login = function(listener) {
      listener = listener || {};
      var callback = {
        callId: PATH_LIST.USER_LOGIN,
        onSuccess: listener.onSuccess,
        onCancel: listener.onCancel,
        onFail: listener.onFail
      };
      prius.addCallback(callback);
      var params = {
        callId: PATH_LIST.USER_LOGIN
      };
      prius.executeActionUrl(PATH_LIST.USER_LOGIN, params);
    };

    /**
     * 是否拦截跳转链接
     * @param toUrl 下一个跳转链接
     * @param to 跳转的路由
     * @param from 来自的路由
     * @param listener 回调函数
     */
    prius.shouleOverrideUrl = function(toUrl, to, from, fromQuery, toQuery, listener) {

      var callbackFlag = PATH_LIST.PAGE_URL_OVERRIDE + (new Date().getTime());

      prius.addCallback({
        callId: callbackFlag,
        onSuccess: function(data) {
          console.log("shouleOverideUrl onSuccess: " + toUrl);
          listener(true, data);
        },
        onCancel: function(data) {
          console.log("shouleOverideUrl onCancel: " + toUrl);
          listener(false, data);
        },
        onFail: function(data) {
          console.log("shouleOverideUrl onFail: " + toUrl);
          listener(false, data);
        }
      });

      try {
        prius.executeActionUrl(PATH_LIST.PAGE_URL_OVERRIDE, {
          callId: callbackFlag,
          data: {
            toUrl: toUrl,
            to: to,
            from: from,
            toQuery: toQuery,
            fromQuery: fromQuery
          }
        });
      } catch(err) {
        console.log("catch onFail: " + url);
        listener(false);
      }

    };

    /**
     * 页面结束
     */
    prius.pageEnd = function() {
      var params = {
        callId: PATH_LIST.PAGE_END
      };
      prius.executeActionUrl(PATH_LIST.PAGE_END, params);
    };

    /**
     * 判断版本是否小于2.0.0
     * @returns {boolean}
     */
    prius.isVersionLessV2 = function(){
      var appVer = Prius.clientVersion;
      if(appVer){
        if( ( +appVer.slice(0,1) ) >= 2){
          //app2.0 之后的版本隐藏底部
          return false;
        }
        //之前的不隐藏
        return true;
      }
      //不在app中，正常逻辑
      return true;
    };


    return prius;

  }());
}

window.Prius = Prius;