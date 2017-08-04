//全科被选中and全是公共课
function sub_SelectedAllCourse_Pub(o) {
    var o_parent = o.parent();
    var o_allCourse = o_parent.find(">[data-type='-1']:first");
    var PublicSub = o_parent.find(">[data-type=0]");
    var that = this;
    //全是公共课---判断全科上的data-customize2属性

    //shn 判断全科上的data-customize2属性是否存在
    if (!!$("[data-type='-1']:first").attr("data-customize2")) {
        var o_all_data2_val = JSON.parse(o_allCourse.attr("data-customize2"));


        //if (!this.BuyTypeHandler(o_allCourse, o_all_data2_val.BuyType)) {
        if (!Sub_Helper.getInstance().BuyTypeHandler.call(this, o_allCourse, o_all_data2_val.BuyType)) {
            //去掉全科select样式
            G_Ioc.getInstance().DomFn(o_allCourse).removeRed();
            //如果全科在此班次下不能正常购买，则循环所有的公共课，告诉他公共课的情况
            PublicSub.each(function (i, v) {
                var pub_selected_val = $(v).attr("data-customize1");
                if (pub_selected_val) {
                    var o_pub_data1_val = JSON.parse(pub_selected_val);
                    //if (that.BuyTypeHandler($(v), o_pub_data1_val.BuyType)) {
                    if (Sub_Helper.getInstance().BuyTypeHandler.call(that, $(v), o_pub_data1_val.BuyType)) {
                        G_Ioc.getInstance().DomFn($(v)).removeGrey().addRed();
                    }
                }
            });
            return false;
        }
        else {
            o_allCourse.removeClass("no-products stop-sold have-buy");
            o_parent.find(">[data-type=0]").removeClass("no-products stop-sold have-buy");
        }
    }
}