var ACT = {
    timer : null,
    qg : function() {
        var that = this;

        function Cdtime(opt, fn) {
            this.fn = fn;
            this.setOptions(opt);
            this.eleP = this.options.el.find('p');
            this.eleSpan = this.options.el.find('span');
            this.init();
        }
        Cdtime.prototype = {
            setOptions: function(opt) {
                this.options = {
                    'day' : 0,
                    'hour' : 0,
                    'minute' : 0,
                    'second' : 0,
                    'timeClient': 0, //时间
                    'timer' : null,
                    'picurl' : '',
                    'timeText' : false, //true 显示倒计时
                    'el' : '', //目标元素
                    'step' : '0'
                };
                $.extend(this.options, opt || {});
            },
            init: function() {
                var _this = this;
                this.options.timeClient -=1;
                if(this.options.timeClient >= 0){
                    this.options.el.show();
                    this.options.day = this.twonum(Math.floor(this.options.timeClient/86400));
                    this.options.hour = this.twonum(Math.floor(this.options.timeClient%86400/3600)+this.options.day*24);
                    this.options.minute = this.twonum(Math.floor(this.options.timeClient%86400%3600/60));
                    this.options.second = this.twonum(this.options.timeClient%60);

                    if(this.options.timeText){
                        $(this.eleP).show();
                        $(this.eleSpan[0]).text(this.options.hour);
                        $(this.eleSpan[1]).text(this.options.minute);
                        $(this.eleSpan[2]).text(this.options.second)
                    }else{
                        $(this.eleP).hide();
                    }

                }else{
                    if(this.options.step){
                        //this.options.el.find('img').attr('src','imgs/'+this.options.picurl);
                        this.options.el.find('img').eq(this.options.step).addClass('on').siblings().removeClass('on');
                    }
                    if(this.fn){
                        this.fn();
                    };
                     return;
                }
                clearTimeout(that.timer);
                that.timer = setTimeout(function(){
                    _this.init();
                },1000);

            },
            twonum : function(str){
                if(str<10){
                    return "0"+str;
                }else{
                    return str;
                }
            }
        }

        // banner1
        // 倒计时banner--1/11 0:00-1/13 9:59
        // 闪购开始banner--1/13 10:00-1/13 22:00

        // banner2
        // 倒计时banner--1/18 0:00-1/20 9:59
        // 闪购开始banner--1/20 10:00-1/20 22:00

        // banner4
        // 倒计时banner-- 01-26 00:00:00  01-28 09:59:59
        // 闪购开始banner-- 01-28 10:00:00  01-28 22:00:00

        var ct = $('#ct4');console.log(new Date());

        new Cdtime({
            'el' : ct,
            'timeClient' : Math.ceil(1453737600 - new Date().getTime()/1000),   //1453737600 01-26 00:00:00
            'picurl' : 'act4_step_b.jpg',
            'step' : 1
        }, function() {
            new Cdtime({
                'el' : ct,
                'timeClient' : Math.ceil(1453946400 - new Date().getTime()/1000), //1453946400 01-28 10:00:00
                'picurl' : 'act4_step_c.jpg',
                'timeText' : true,
                'step' : 2
            }, function() {
                new Cdtime({
                    'el' : ct,
                    'timeClient' : Math.ceil(1453989600 - new Date().getTime()/1000), //1453989600 01-28 22:00:00
                    'step' : 3
                }, function() {
                    this.options.el.remove();
                });
            });
        });

        //$('#ct2').show();

        // var iNow = new Date().getTime();
        // var iNew = +new Date("2016/01/04 10:00:00");
        // var ddd = Math.floor((iNew - iNow)/1000);

        // if(ddd < 0){
        //     new Cdtime({
        //         'el' : $('#ct3'),
        //         'timeClient' : 1
        //     },function(){}
        //     );
        // }

    }

};


module.exports = ACT;