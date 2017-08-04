//全选---被选中--情况处理
function sub_SelectedAllCourse(o, isclass) {
    var o_parent = o.parent();
    var o_allCourse = o_parent.find(">[data-type='-1']:first");
    var PublicSub = o_parent.find(">[data-type=0]");
    var that = this;
    //判断班次是否选择
    var class_selected = o.closest("[data-select-group]").find("[data-event-type='class'].select");
   
    if (class_selected.length === 1) {
        if (globle.g_subject_type == 1) {
            this.All_Selected_DataType1(o);
        }
        else {
            //处理所有带ico的专业课
            if (isclass) {
                //this.ForNotAllCourseIco(o); 
                Sub_Helper.getInstance().ForNotAllCourseIco.call(this, o);
            }
            //判断已选专业课的data-customize2属性
            var selected_pro = o_parent.find(">[data-type='1'].select:first");
            if (selected_pro.length === 1) {
                var pro_selected_data2 = selected_pro.attr("data-customize2");
                if (pro_selected_data2) {
                    var o_pro_data2_val = JSON.parse(pro_selected_data2);
                    //this.ClearProLastState(selected_pro);
                    Sub_Helper.getInstance().ClearProLastState.call(this, selected_pro);
                    //if (!this.BuyTypeHandler(selected_pro, o_pro_data2_val.BuyType)) {
                    if (!Sub_Helper.getInstance().BuyTypeHandler.call(this, selected_pro, o_pro_data2_val.BuyType)) {
                        G_Ioc.getInstance().DomFn(PublicSub).addGrey();
                        return false;
                    }
                }
                else {
                    o_parent.find(">[data-type='1']").removeClass("no-products stop-sold have-buy nodatagrey");
                    G_Ioc.getInstance().DomFn(o_allCourse).removeRed();
                    G_Ioc.getInstance().DomFn(PublicSub).removeGrey().addRed();
                    //处理所有公共课
                    //that.ForAllPubSub(o);
                    Sub_Helper.getInstance().ForAllPubSub.call(this, o);
                    return;
                }
            }


        }
    }
    if (o.is(o_allCourse)) {
        Sub_Helper.getInstance().ClearProNotLastState.call(this, o);
    }
    //公共课变灰
    G_Ioc.getInstance().DomFn(o_parent.find(">[data-type=0]")).addGrey();
    //公共课去除角标
    o_parent.find(">[data-type=0]").removeClass("no-products stop-sold have-buy nodatagrey");
}