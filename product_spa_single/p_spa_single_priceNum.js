function PriceNum() {
    this.opreatefn = function (o_group_val) {
        //
        var cur_price = $("#cur-price"), buy_num = $("#buy-number");
        var retArrObj = Sub_Helper.getInstance().GetProductsObj(o_group_val);
       
        if (retArrObj.length < 1) {
            G_Ioc.getInstance().GlobalFn().recoverPriceNum();
        }
        else {
            if (retArrObj.length === 1) {
                var retArrObj1 = retArrObj[0];
                cur_price.html(retArrObj1.ActivityStatus === 1 || retArrObj1.ActivityStatus === 2 ? retArrObj1.ActivityPrice : retArrObj1.CurrentPrice);
                buy_num.html(retArrObj1.pBuy);
            }
            else {
                var AllPrice = 0, AllNumber = 0;
                for (var i = 0, len = retArrObj.length; i < len; i++) {
                    var ArrI = retArrObj[i];
                    AllPrice += ArrI.ActivityStatus === 1 || ArrI.ActivityStatus === 2 ? ArrI.ActivityPrice : ArrI.CurrentPrice;
                    AllNumber += ArrI.pBuy;
                }
                cur_price.html(AllPrice);
                buy_num.html(AllNumber);
            }
        }

    };
};
