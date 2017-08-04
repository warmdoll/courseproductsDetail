//商品限售数量、可售数量、停售时间显示
function productsNumDate() {
    this.opreatefn = function (o, jsonObj) {
        var that = this,
            activityStatus = jsonObj.ActivityStatus,
            stopSaleDate = jsonObj.StopSaleDate, //停售时间
            limitSaleCount = jsonObj.LimitSaleCount, //限售数量
            canSaleCount = jsonObj.CanSaleCount, //剩余数量
            productsHtml = "", limitHtml = '', stopDate = '';
        //为0时显示商品数量及停售时间
        if (activityStatus == 0) {
            if (limitSaleCount > 0) {
                limitHtml = '<span class="limit-html">限售\
                                    <em class="limit-number">' + limitSaleCount + '</em>席\
                                     剩余<em class="remain-number">' + canSaleCount + '</em>席</span>';
            } else {
                limitHtml = "";
            }
            //停售时间为null时 不显示
            if (!stopSaleDate) {
                stopDate = '';
            } else {
                stopDate = '<i class="rt">' + this.getDate(stopSaleDate) + '</i>';
                //当没有限售时 时间居左显示
                if (limitHtml=="") {
                   stopDate = '<i>' + this.getDate(stopSaleDate) + '</i>';
                }
            }
            productsHtml = '<p class="margin10 js-commodity-number font-color">' + limitHtml + stopDate + '</p>';

        } else {
            productsHtml = '';
            return;
        }
        return productsHtml;
    };
    this.getDate=function(str){
         var that=this;
         var oDate = new Date(str),  
            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),  
            oHour = oDate.getHours(),  
            oMin = oDate.getMinutes(),  
            oSen = oDate.getSeconds(),
            oTime = oYear + '年' + that.addNum(oMonth) + '月' + that.addNum(oDay) + '日 '
            //+ that.addNum(oHour) +':'+ that.addNum(oMin) +':'+that.addNum(oSen);//最后拼接时间  
           return oTime;
    };
    //补零
    this.addNum = function (num) {
        if(parseInt(num) < 10){  
                num = '0'+num;  
            }  
         return num;  
    };
    
}