
// var UA = {
//   versions: function() {
//     var u = window.navigator.userAgent;
//     var num ;
//     if(u.indexOf('AppleWebKit' && u.indexOf('Safari') > -1) > -1) {
//       if(u.indexOf('Chrome') > -1) {
//         //chrome
//         return "Chrome";
//       } else if (u.indexOf('OPR')) {
//         //webkit Opera
//         return "Opera_webkit"
//       } else {
//         //Safari
//         return "Safari";
//       }
//     } else if (u.indexOf('Mobile') > -1) {
//       if(!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
//         //ios
//         if(u.indexOf('iPhone') > -1) {
//           //iphone
//           return "iPhone" 
//         } else if (u.indexOf('iPad') > -1) {
//           //ipad
//           return "iPad"
//         }
//       } else if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
//         //android
//         num = u.substr(u.indexOf('Android') + 8, 3);
//         return { "type":"Android", "version": num };
//       } else if (u.indexOf('IEMobile')) {
//         //windows phone
//         return "Windows Phone"
//       }
//     }
//   }
// }

function UA() {
      _env = {};

      var ua = window.navigator.userAgent;
      var matched;

      if((matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))) {
          /**
           * @instance browser
           * @memberof _env
           * @property {String} name - 浏览器名称，比如UC/QQ/Firefox/Chrome/Android/Safari/iOS Webview/Chrome Webview/IE/IEMobile/unknown等
           * @property {Version} version - 浏览器版本号
           * @property {Boolean} isUC - 是否是UC浏览器
           * @property {Boolean} isQQ - 是否是QQ浏览器
           * @property {Boolean} isIE - 是否是IE浏览器
           * @property {Boolean} isIEMobile - 是否是IE移动版浏览器
           * @property {Boolean} isIELikeWebkit - 是否是IE兼容了Webkit特性的浏览器
           * @property {Boolean} isChrome - 是否是Chrome浏览器
           * @property {Boolean} isAndroid - 是否是Android的原生浏览器
           * @property {Boolean} isSafari - 是否是Safari浏览器
           * @property {Boolean} isWebview - 是否是iOS下的Webview或Android下Chrome的Webview
           */
          _env.browser = {
              name: 'UC',
              isUC: true,
              version: matched[1]
          }
      } else if((matched = ua.match(/MQQBrowser\/([\d\.]+)/))) {
          _env.browser = {
              name: 'QQ',
              isQQ: true,
              version: matched[1]
          }
      } else if ((matched = ua.match(/Firefox\/([\d\.]+)/))) {
          _env.browser = {
              name: 'Firefox',
              isFirefox: true,
              version: matched[1]
          }
      } else if ((matched = ua.match(/MSIE\s([\d\.]+)/)) ||
                      (matched = ua.match(/IEMobile\/([\d\.]+)/))) {

          _env.browser = {
              version: matched[1]
          }

          if (ua.match(/IEMobile/)) {
              _env.browser.name = 'IEMobile';
              _env.browser.isIEMobile = true;
          } else {
              _env.browser.name = 'IE';
              _env.browser.isIE = true;
          }

          if (ua.match(/Android|iPhone/)) {
              _env.browser.isIELikeWebkit = true;
          }
      } else if((matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/))) {
          _env.browser = {
              name: 'Chrome',
              isChrome: true,
              version: matched[1]
          }

          if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
              _env.browser.name = 'Chrome Webview';
              _env.browser.isWebview = true;
          }
      } else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
          _env.browser = {
              name: 'Android',
              isAndroid: true,
              version: matched[1]
          }
      } else if(ua.match(/iPhone|iPad|iPod/)) {
          if(ua.match(/Safari/)) {
              matched = ua.match(/Version\/([\d\.]+)/)
              _env.browser = {
                  name: 'Safari',
                  isSafari: true,
                  version: matched[1]
              }
          } else {
              matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);
              _env.browser = {
                  name: 'iOS Webview',
                  isWebview: true,
                  version: matched[1].replace(/\_/, '.')
              }
          }
      } else {
          _env.browser = {
              name:'unknown',
              version:'0.0.0'
          }
      }
      return _env;
  }

module.exports = UA;




