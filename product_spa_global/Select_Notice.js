//通知其它的选择区域，形参来自哪个group
function Notice_Select(fromval) {
    var arr_enum_global = [1, 2, 3];
    var from_group = $("[data-select-group=" + fromval + "]");
    var from_class_html = from_group.find(".notice_class:first").html();
    var from_subject_html = from_group.find(".notice_subject:first").html();
    //去除了当前
    arr_enum_global.removeByValue(fromval);
    //
    arr_enum_global.forEach(function (val, idx, arr) {
        //
        var o_this_dom = $("[data-select-group='" + val + "']");
        var this_class_html = o_this_dom.find(".notice_class:first");
        var this_subject_html = o_this_dom.find(".notice_subject:first");
        //
        this_class_html.html(from_class_html);
        this_subject_html.html(from_subject_html);
        //shnh更换tml后需要重新初始化才能点击班次 科目
        //G_Ioc.getInstance().GlobalFn().init()
    });
}