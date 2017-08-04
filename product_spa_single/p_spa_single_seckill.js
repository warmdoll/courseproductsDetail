//秒杀倒计时处理 ActivityStatus==0是没有秒杀活动 ==1是距离秒杀活动还有XX天 ==2距离秒杀结束还剩XX天
function Seckill() {
    this.seckillText = '';
    this.hourTime=0;
    this.minuteTime=0;
    this.secondTime = 0;
    this.IntervalId = -1;
    this.opreatefn = function (o, jsonObj) {
        var that = this, /*jsonObj = JSON.parse(o.attr("data-customize1")),*/seckilladdHtml = "";
        //以下是活动开始时间和结束时间
        var activityStoptime = jsonObj.ActivityStopTime;
        var activityStarttime = jsonObj.ActivityStartTime;

        if (jsonObj.ActivityStatus == 0) {
            seckilladdHtml = "";
            return seckilladdHtml;
        }
        else if (jsonObj.ActivityStatus == 1 || jsonObj.ActivityStatus == 2) {
            that.DealCountDown(activityStarttime, activityStoptime);
        }
        else if (jsonObj.ActivityStatus == 3) {
            seckilladdHtml = '<div class="margin10 ">\
                               <span class="add-end-time">活动已结束</span>\
                          </div>';
            return seckilladdHtml;
        }
        seckilladdHtml = '<div class="margin10 ">\
                               <span class="add-end-time js-add-end-time' + this.IntervalId + '"><em  id="seckill-text-' + this.IntervalId + '">' + that.seckillText + '</em>:\
                                    <em class="end-time-box" id="seckill-hourse-' + this.IntervalId + '">' + that.hourTime + '</em>:\
                                    <em class="end-time-box" id="seckill-minute-' + this.IntervalId + '">' + that.minuteTime + '</em>:\
                                    <em class="end-time-box" id="seckill-second-' + this.IntervalId + '">' + that.secondTime + '</em>\
                                </span>\
                          </div>';
        return seckilladdHtml;
    };

    //以下是倒计时 参数starttime,stoptime单位是毫秒数
    this.DealCountDown = function (starttime, stoptime) {
        
        var that = this;
        that.IntervalId = setInterval(function () { that.ShowCountDown(starttime, stoptime); }, 1000);
    };
    //倒计时相关的dom添加信息
    this.ShowCountDown = function (starttime, stoptime) {
        var currTime = new Date().getTime();
        var that = this;
        var _t = stoptime - currTime;
        //距离开始时间的 时、分、秒
        if (starttime >= currTime) {
            that.hourms(_t);
            $("#seckill-text-" + this.IntervalId).text("秒杀距离开始");
        }
        //距离结束时间 的 时、分、秒
        else if (starttime < currTime && currTime <= stoptime) {
            that.hourms(_t);
            $("#seckill-text-" + this.IntervalId).text("秒杀距离结束");

        }
        $("#seckill-hourse-" + this.IntervalId).html(that.hourTime);
        $("#seckill-minute-" + this.IntervalId).html(that.minuteTime);
        $("#seckill-second-" + this.IntervalId).html(that.secondTime);
    };
    //倒计时的时分秒计算
    this.hourms = function (_t) {
        var that = this;
        if (_t >= 1000 * 60 * 60) {
            that.hourTime = parseInt(_t / (1000 * 60 * 60)) == 0 ? 00 : parseInt(_t / (1000 * 60 * 60));
            _t = _t % (1000 * 60 * 60);
        }
        if (_t >= 1000 * 60) {
            that.minuteTime = parseInt(_t / (1000 * 60)) == 0 ? 00 : parseInt(_t / (1000 * 60));
            _t = _t % (1000 * 60);
        }
        that.secondTime = parseInt(_t / 1000) == 0 ? 00 : parseInt(_t / 1000);
    };
}
