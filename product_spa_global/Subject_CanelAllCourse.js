//点击全科，取消全科选中状态
function sub_CanelAllCourse(o) {
    var o_parent = o.parent();
    //去除公共课灰色样式
    G_Ioc.getInstance().DomFn(o_parent.find(">[data-type=0].grey")).removeGrey();
    //循环判断公用课的状态
    //this.ForAllPubSub(o);
    Sub_Helper.getInstance().ForAllPubSub.call(this, o);
    //清除不是最后专业课的状态
    Sub_Helper.getInstance().ClearProNotLastState.call(this, o);
    //检查最后选择专业课的状态通过data1
    var last_pro_selected = o_parent.find(">[data-type=1].select");
    if (last_pro_selected.length === 1) {
        var pro_selected_val = last_pro_selected.attr("data-customize1");
        if (pro_selected_val) {
            var o_pro_data1_val = JSON.parse(pro_selected_val);
            //this.ClearProLastState(last_pro_selected);
            Sub_Helper.getInstance().ClearProLastState.call(this, last_pro_selected);
            //if (!this.BuyTypeHandler(last_pro_selected, o_pro_data1_val.BuyType)) { return false; }
            if (!Sub_Helper.getInstance().BuyTypeHandler.call(this, last_pro_selected, o_pro_data1_val.BuyType)) {return false;}
        }
    }
}