

function timeago(time) {
  time = new Date(time);
  var delta = parseInt((new Date() - time) / 1000, 10);
  if (delta <= 0) return 'just now';

  var minutes = delta / 60;
  if (minutes < 1) return 'less than a minute ago';
  if (minutes < 2) return 'about a minute ago';

  var hours = minutes / 60;
  if (hours < 1) return parseInt(minutes, 10) + ' minutes ago';
  if (hours < 1.5) return 'about an hour ago';

  var days = hours / 24;
  if (days < 1) return Math.round(hours) + ' hours ago';
  if (days < 7) return parseInt(days, 10) + ' days ago';

  var month = time.getMonth();
  if (month < 10) month = '0' + month;
  var date = time.getDate();
  if (date < 10) date = '0' + date;
  return [time.getFullYear(), month, date].join('-');
}


function urlize(text) {
  if (!text) return '';
  var pattern = /https?:\/\/[^\s<]+[^<.,:;"')\]\s]/g;
  return text.replace(pattern, function(u) {
    var t = u.replace('http://', '');
    return '<a href="' + u + '">' + t + '</a>';
  });
}
//获取图片地址，如果地址带有 http://那么就认为是绝对地址，然后直接返回
function imgUrl(url){
    if(!url){
      //1X1px 透明图片
      // return 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
      // 要买车logo 114*114
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAMAAAC4A3VPAAACuFBMVEX///9NTU1ZWVmZmZmmpqaMjIxzc3NAQED4xiNmZmbn5+fZ2dnz8/NBQUG/v7/+/v5HR0dCQkKAgIBWVlZKSkrd3d3S0tL///74+PhERETv7+/4xyZbW1v//vz+9dizs7PT09PGxsb39/dcXFz9/f3++uqurq7Q0NBSUlLp6emVlZVDQ0N6enr7+/u6urr4xiT//fitra2JiYlQUFDt7e329vZLS0u8vLzc3Nyenp7Ozs7FxcXh4eFubm6xsbGgoKBMTEzCwsK7u7uSkpL//vv4yCj4yCz601L98s/4yjH85Jf//PP74IdISEhoaGhhYWF0dHSOjo65ubmhoaHMzMz09PSYmJikpKT5yjP++OX61Vt8fHxiYmJra2uqqqrk5OSDg4Obm5vo6Oji4uKKioqRkZG1tbXX19dOTk7+9Nb98MP73Xv86ar4yCr85Zv5zkL98sz//fn4yS373n/74pH61mD85p7/+/L+9+D62GllZWWioqK3t7fBwcGPj4/8/PxwcHB9fX13d3f5+fl/f3/6+vrLy8uCgoLW1tbf39+Ghob97bn74Y3++OT845H5yzX+9tz/+/D+9NP85Jb86KX50Uz//PX5zT7///398cn74o75z0bU1NT62WvY2NhqampfX1/u7u6oqKinp6elpaW+vr7++uz86q385Zz97Lf5zDj734L//ff85qD+++7967L73Hj74Yv845T50k/5zDr62nH98MV2dnZycnL97r2Hh4fAwMCFhYXHx8fIyMjr6+vl5eVnZ2dFRUXNzc2wsLBUVFSdnZ1jY2P62Gb97LX734T989D+89D61Fj86q/856P62W7Kysr601X97r7734WQkJDx8fH62W397r/++ej856H73Hn50Emvr69lXEH+9t2Xl5dlYVHIxLeEhIT446H723X59uz4xiVvfBbbAAAIgklEQVR4AezSS2tcdQCG8Weh5NkoRQtHGCaLYnGlk1pRQZeTTDIzS5XJrF2Y+6VJzCzEC7jQXJJJ2iZpcBvbNG1qkxaC7lwo0lapBR0RBPHyNfzPnIWCyaZn4kLO7ws88PKSSqVSqVQqlUql/scaxeJP93r5L+QHy4XKFmTX1J48DMyVOFaNisFnwKjBONwxMz18rNV5g8k61EfU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';
    }
    if(url.match(/http:\/\//)){
        return url;
    }
    // if(window.location.href.indexOf('localhost')>-1) {
    //   return 'http://img.shgqc.ymc.com' + url;
    // }

    //全站统一配置，页面首先会引用
    if(window.abp){
        return window.abp.imageDomain + url;
    }

    var testUrl  = 'http://img.yaomaiche.com';  //此url到时候走配置

    if(this.isTest){
        testUrl = 'http://img.test.yaomaiche.com';
    }
    return testUrl + url;
}


//显示价格
function price(value,currency){
var digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '';
  var stringified = Math.abs(value).toFixed(2)
  var _int = stringified.slice(0, -3)
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = stringified.slice(-3)
  var sign = value < 0 ? '-' : ''
  return currency + sign + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}

//显示价格不要小数点
function priceInt(value,currency){
    return price(value,currency).slice(0,-3);
}

//除以10000
function priceW(value,currency){
  value = isNaN(value) ? 0 : (value/10000).toFixed(2) ;
  return value+'';
}

// 价格带万字
function priceFormatWan(v){
  v = v.toString();
  return (v.indexOf("万")>-1&&v.length>4)?v:(Math.abs(v/10000).toFixed(2)+"万");
}

// 倒计时格式化。
function countdown(v, tpl){
  function timeFormat(time){
    return time.toString().length>1?time:"0"+time;
  }
  var time = v-0,
    day = parseInt(time/3600/24),
    hour = parseInt(time/3600 - day*24),
    minute = parseInt(time/60 - day*24*60 - hour*60),
    second = time - day*24*3600 - hour*3600 - minute*60;

  var numTpl = [
    'dd天hh:mm:ss',
    'hh:mm:ss',
    '<i>dd</i>天<i>hh</i>:<i>mm</i>:<i>ss</i>',
    '<i>hh</i>:<i>mm</i>:<i>ss</i>',
    'dd天hh时mm分ss秒',
    'hh时mm分ss秒',
    '<i>dd</i>天<i>hh</i>时<i>mm</i>分<i>ss</i>秒',
    '<i>hh</i>时<i>mm</i>分<i>ss</i>秒'
  ]

  tpl = tpl?tpl:0;
  if(day>0){
    return numTpl[tpl]
        .replace(/dd/g,timeFormat(day))
        .replace(/hh/g,timeFormat(hour))
        .replace(/mm/g,timeFormat(minute))
        .replace(/ss/g,timeFormat(second));
  }else{
    return numTpl[tpl+1]
        .replace(/hh/g,timeFormat(hour))
        .replace(/mm/g,timeFormat(minute))
        .replace(/ss/g,timeFormat(second));
  }
}

//针对电话的格式化
//使用
//<input type="text" v-model="电话号码字段 | phone">
//输入完后，input失去焦点的时候会用空格来格式化
var phone = {
  read: function(val) {
    var _o = val;
    //_o.value = _o.value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (_o != "") {
        _o = _o.replace(" ", "").replace(" ", "");
        var l = _o.length;
        if (l > 3 && l < 8) {
            _o = _o.substr(0, 3) + " " + _o.substr(3, l - 3);
        } else if (l > 7) {
            _o = _o.substr(0, 3) + " " + _o.substr(3, 4) + " " + _o.substr(7, l - 7);
        }
    }
    return _o;
  },
  write: function(val, oldVal) {
    if(this.$els.phoneFormat){
      var arr = val.split(' ');
      if(arr.length==3){
        this.$els.phoneFormat.setAttribute('maxlength', 13);
      }else if(arr.length==2){
        this.$els.phoneFormat.setAttribute('maxlength', 12);
      }else{
        this.$els.phoneFormat.setAttribute('maxlength', 11);
      }
    }
    var phone = val.replace(/[^\d.]/g, '');
    return phone;
  }
};

exports.phone = phone;
exports.imgUrl = imgUrl;
exports.price = price;
exports.priceInt = priceInt;
exports.priceW = priceW;
exports.priceFormatWan = priceFormatWan;
exports.countdown = countdown;
exports.timeago = timeago;
exports.urlize = urlize;
