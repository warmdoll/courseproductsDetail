// 在科目的选择的情况下  处理比较多 代码可能较长  拆分为单js处理科目选择相关
function SubjectClass() { }

SubjectClass.prototype = {
    //选择器的主入口---subject_init.js
    opreatefn: function (o, isclass) { sub_Init.call(this, o, isclass); },

    //全选---被选中--情况处理-----subject_SelectedAllCourse.js
    SelectedAllCourse: function (o, isclass) { console.log("点击班级"); sub_SelectedAllCourse.call(this, o, isclass); },

    //全科被选中and全是公共课----sub_SelectedAllCourse_Pub.js
    All_Selected_DataType1: function (o) { sub_SelectedAllCourse_Pub.call(this, o); },

    //点击全科，取消全科选中状态-----subject_CanelAllCourse.js
    CanelAllCourse: function (o) { sub_CanelAllCourse.call(this, o); },

    //全科未选中状态
    NotAllCourseSelect: function (o, isclass) {
        //得到当前选择的班，并且判断是否选中
        var class_selected = o.closest("[data-select-group]").find("[data-event-type='class'].select");
        if (class_selected.length === 1) {
            //已经选择了一个班次的相关处理逻辑
            this.SelectedOneClass(o, isclass);
        }
        //没选择任何班次
        else {
            this.SelectedNoClass(o);
        }
    },

    //全科未选中状态----班次选择一个----subject_NotAllCourse_OneClass.js
    SelectedOneClass: function (o, isclass) {
        sub_NotAllCourse_OneClass.call(this, o, isclass);
    },

    //全科未选中状态----没选择任何班次-------subject_NotAllCourse_NoClass.js
    SelectedNoClass: function (o) { sub_NotAllCourse_NoClass.call(this, o); }
}