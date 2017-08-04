//全科未选中状态并且班次选择一个
function sub_NotAllCourse_OneClass(o,isclass) {
    var o_parent = o.parent(),
            PublicSub = o_parent.find(">[data-type=0]"),
            PublicSubSelect = o_parent.find(">[data-type=0].select"),
            PublicSubSelectLength = PublicSubSelect.length,
            SelectedPro = o_parent.find(">[data-type=1].select"),
            o_allCourse = o_parent.find(">[data-type='-1']:first");
    //循环判断公共课或专业课，带角标的科目
    if (isclass) {
        //this.ForNotAllCourseIco(o);
        Sub_Helper.getInstance().ForNotAllCourseIco.call(this, o);
    }

    //全是公共课
    if (globle.g_subject_type == 1) {
        //处理当前选择的状态
        if (!Sub_Helper.getInstance().CurSelectedState.call(this, o)) { return false; };

        if (PublicSubSelectLength === PublicSub.length) {
            var o_all_data = o_allCourse.attr("data-customize2");
            if (o_all_data) {
                var o_all_data_val = JSON.parse(o_all_data);
                //if (!this.BuyTypeHandler(o_allCourse, o_all_data2_val.BuyType)) { return false; }
                if (!Sub_Helper.getInstance().BuyTypeHandler.call(this, o_allCourse, o_all_data_val.BuyType)) { return false; }
                else {
                    //全科能买
                    Sub_Helper.getInstance().GoToAllCourse.call(this, PublicSub, o_allCourse);
                    //公共课去除角标
                    o_parent.find(">[data-type=0]").removeClass("no-products stop-sold have-buy nodatagrey");
                }
            }
            else {
                o_all_data = o.attr("data-customize1");
                var o_all_data_val = JSON.parse(o_all_data);
                if (!Sub_Helper.getInstance().BuyTypeHandler.call(this, o, o_all_data_val.BuyType)) { return false; }
            }
            
        }
    }
    else {
        //
        if (PublicSubSelectLength === PublicSub.length && SelectedPro.length == 1) {
            var selected_pro_data2 = SelectedPro.attr("data-customize2");
            if (selected_pro_data2) {
                //只要此专业课有全科，就先跳转，再判断此专业课的全科状态
                Sub_Helper.getInstance().GoToAllCourse.call(this,PublicSub, o_allCourse);
                //公共课去除角标
                o_parent.find(">[data-type=0]").removeClass("no-products stop-sold have-buy nodatagrey");
                //shn专业课去除角标
                o_parent.find(">[data-type=1].select").removeClass("no-products stop-sold have-buy nodatagrey");
                var o_pro_data2_val = JSON.parse(selected_pro_data2);
                //if (!this.BuyTypeHandler(SelectedPro, o_pro_data2_val.BuyType)) { return false; }
                if (!Sub_Helper.getInstance().BuyTypeHandler.call(this, SelectedPro, o_pro_data2_val.BuyType)) { return false; }
            }
            else {
                Sub_Helper.getInstance().CurSelectedState.call(this, o);
            }
        }
        else {
            //处理当前选择的状态
            Sub_Helper.getInstance().CurSelectedState.call(this, o);
        }
    }
    if (isclass) {
        //this.ForAllPubSub(o, true); 
        Sub_Helper.getInstance().ForAllPubSub.call(this, o, true);
    }
}