//全科未选中状态并且班次选择一个
function sub_NotAllCourse_NoClass(o) {
    var o_parent = o.parent(),
            PublicSub = o_parent.find(">[data-type=0]"),
            PublicSubSelect = o_parent.find(">[data-type=0].select"),
            PublicSubSelectLength = PublicSubSelect.length,
            SelectedPro = o_parent.find(">[data-type=1].select"),
            o_allCourse = o_parent.find(">[data-type='-1']:first");
    //全是公共课
    if (globle.g_subject_type == 1) {
        if (PublicSubSelectLength === PublicSub.length && PublicSub.length != 1) {
            Sub_Helper.getInstance().GoToAllCourse.call(this, PublicSub, o_allCourse);
        }
        else {
            var pub_selected_val = o.attr("data-customize1");
            if (pub_selected_val) {
                var o_pro_data1_val = JSON.parse(pub_selected_val);
                if (!Sub_Helper.getInstance().BuyTypeHandler.call(this, o, pub_selected_val.BuyType)) { return false; }
            }
        }
    }
    else {
        //
        if (PublicSubSelectLength === PublicSub.length && SelectedPro.length == 1) {
            Sub_Helper.getInstance().GoToAllCourse.call(this,PublicSub, o_allCourse);
        }
    }
}