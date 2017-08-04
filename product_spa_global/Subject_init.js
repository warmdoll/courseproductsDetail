//所有选择判断的主入口
function sub_Init(o, isclass) {
    isclass = isclass || false;
    var o_parent = o.parent();
    //只根据科目选择结果去判断逻辑
    //全科 选中（1.点击的是全科） 未选中（1.点击的是全科 2.点击的不是全科）
    var o_allCourse = o_parent.find(">[data-type='-1']:first");


    if (!isclass) { o.toggleClass("select"); } else { if (o_allCourse.is(".nodatagrey")) { G_Ioc.getInstance().DomFn(o_allCourse).removeNoDataGrey(); } }

    if (isclass) { if (o_allCourse.is(":not('.select')")) { o_allCourse.removeClass("no-products stop-sold have-buy"); } }

    //如果选择的是专业课，取消其它专业的select样式
    if (o.is("[data-type=1]")) { G_Ioc.getInstance().DomFn(o.siblings("[data-type=1].select")).removeRed(); }


    if (o_allCourse.is(".select")) {
        this.SelectedAllCourse(o, isclass);
    }
    else {
        if (o.attr("data-type") == -1) {
            this.CanelAllCourse(o);
        }
        else {
            //非点击全科并且全科没被选中（1.无专业课公共课全选==跳转 2有专业课 公共课全选+1专业课==跳转 3专业课只保留最后一个select）
            this.NotAllCourseSelect(o, isclass);
        }
    }    
}