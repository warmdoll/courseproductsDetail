//所有选择判断的主入口
var Sub_Helper = (function () {
    function sub_Helper() { }

    //班+科目（非全科）==当前科目的状态
    sub_Helper.prototype.CurSelectedState = function (o) {
        var data_cus1 = o.attr("data-customize1");
        if (!data_cus1) { return; }
        var o_val = JSON.parse(data_cus1);
        //if (!this.BuyTypeHandler(o, o_val.BuyType)) { return false; }
        if (!Sub_Helper.getInstance().BuyTypeHandler.call(this, o, o_val.BuyType)) { return false; }
        return true;
    }
    //移除掉专业课（非最后选择的那一个）的所有样式
    sub_Helper.prototype.ClearProNotLastState = function (o) {
        var o_parent = o.parent();
        o_parent.find(">[data-type=1]:not('.select')").removeClass("no-products stop-sold have-buy");
    }
    //移除掉专业课（最后选择的那一个）的所有样式
    sub_Helper.prototype.ClearProLastState = function (o) {
        var o_parent = o.parent();
        o_parent.find(">[data-type=1].select").removeClass("no-products stop-sold have-buy");
    }
    //循环判断公共课或专业课，带角标的科目
    sub_Helper.prototype.ForNotAllCourseIco = function (o) {
        var that = this;
        var o_parent = o.parent();
        var o_allCourse = o_parent.find(">[data-type='-1']:first");
        var Pub_Pro_Sub = o_parent.find("[data-event-type='subject']:not('[data-type=-1]')");
        Pub_Pro_Sub.each(function (i, v) {
            var v = $(v);
            var tempbool = v.is(".no-products,.stop-sold,.have-buy,.nodatagrey");
            if (tempbool) {
                //判断全科是否选中（1.选中--判断带角标的全科状态data2，2.未选中--判断带角标的单科状态data1）
                if (o_allCourse.is(".select") && v.is("[data-type=1]")) {
                    var pro_selected_data2 = v.attr("data-customize2");
                    if (pro_selected_data2) {
                        var o_pro_data2_val = JSON.parse(pro_selected_data2);
                        //if (that.BuyTypeHandler(v, o_pro_data2_val.BuyType)) {
                        if (Sub_Helper.getInstance().BuyTypeHandler.call(that, v, o_pro_data2_val.BuyType)) {
                            v.removeClass("no-products stop-sold have-buy nodatagrey");
                        }
                    }
                }
                else if (o_allCourse.is(":not('.select')")) {
                    var pro_selected_data1 = v.attr("data-customize1");
                    if (pro_selected_data1) {
                        var o_pro_data1_val = JSON.parse(pro_selected_data1);
                        //if (that.BuyTypeHandler(v, o_pro_data1_val.BuyType)) {
                        if (Sub_Helper.getInstance().BuyTypeHandler.call(that, v, o_pro_data1_val.BuyType)) {
                            v.removeClass("no-products stop-sold have-buy nodatagrey");
                        }
                    }
                }
            }
        });
    }
    //循环判断公共课的状态
    sub_Helper.prototype.ForAllPubSub = function (o, isselect) {
        var isselect = isselect || false;
        var that = this;
        var o_parent = o.parent();
        var Pub_Sub = o_parent.find("[data-type=0]");
        //如果只循环选中的
        if (isselect) {
            Pub_Sub = o_parent.find("[data-type=0].select,[data-type=1].select");
        }
        Pub_Sub.each(function (i, v) {
            v = $(v);
            var pub_selected_data1 = v.attr("data-customize1");
            if (pub_selected_data1) {
                var o_pub_data1_val = JSON.parse(pub_selected_data1);
                //if (that.BuyTypeHandler(v, o_pub_data1_val.BuyType)) {
                if (Sub_Helper.getInstance().BuyTypeHandler.call(that, v, o_pub_data1_val.BuyType)) {
                    v.removeClass("no-products stop-sold have-buy nodatagrey");
                }
            }
        });
    }
    //返回确定商品的数组，由data1或data2{},{}组成
    sub_Helper.prototype.GetProductsObj = function (o_group_val) {
        console.log("aa")
        var retArr = [];
        var o_group = $("[data-select-group=" + o_group_val + "]");
        var event_class_select = o_group.find("[data-event-type='class'].select");
        var event_subject_select = o_group.find("[data-event-type='subject'].select");
        //
        if (event_class_select.length > 0 && event_subject_select.length > 0) {
            var o_All_Course = o_group.find("[data-event-type='subject'][data-type=-1].select");
            //如果选中了全科
            if (o_All_Course.length > 0) {
                //判断是否全部公共课，是从data-2读取
                if (globle.g_subject_type == 1) {
                    var o_all_data = o_All_Course.attr("data-customize2");
                    if (o_all_data) {
                        o_all_data = JSON.parse(o_all_data);
                        if (o_all_data.BuyType === 3) { retArr.push(o_all_data); }
                    }
                }
                //否则从专业课的data2

                else {
                    
                    var pro_selected = o_group.find("[data-event-type='subject'][data-type=1].select:first");
                    if (pro_selected.length === 1) {
                        var o_pro_data = pro_selected.attr("data-customize2");
                        if (o_pro_data) { o_pro_data = JSON.parse(o_pro_data); }
                        if (o_pro_data.BuyType === 3) { retArr.push(o_pro_data); }
                    }
                }
            }
            else {
                //循环所有公共课，找出可买的加到arr
                event_subject_select.each(function (i, v) {
                    var o_sub_data = $(v).attr("data-customize1");
                    if (o_sub_data) {
                        o_sub_data = JSON.parse(o_sub_data);
                        if (o_sub_data.BuyType === 3) { retArr.push(o_sub_data); }
                    }
                    
                });
            }

        }
        return retArr;
    }


    //配合主函数的辅助方法---------0 已购买 1 已售罄 2 已停售 3 可买
    sub_Helper.prototype.BuyTypeHandler = function (o, BuyType) {
        var returnbool = false;
        switch (BuyType) {
            case 0:
                G_Ioc.getInstance().DomFn(o).addHaveBuy();
                break;
            case 1:
                G_Ioc.getInstance().DomFn(o).addNoProducts();
                break;
            case 2:
                G_Ioc.getInstance().DomFn(o).addStopSold();
                break;
            case 3:
                returnbool = true;
                break;
            default:
                break;
        }
        return returnbool;
    }

    //跳转至全科
    sub_Helper.prototype.GoToAllCourse = function (pub, all) {
        G_Ioc.getInstance().DomFn(pub).addGrey();
        G_Ioc.getInstance().DomFn(all).addRed();
    }



















































    // 单例
    var instance;
    var _static = {
        getInstance: function () {
            if (instance === undefined) {
                instance = new sub_Helper();
            }
            return instance;
        }
    };
    return _static;
})();

