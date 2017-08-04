// 首先循环赋值科目data-customize=JSON.stringify({"Price": 3500,"CurrentPrice": 1580,"ProductsTitle": "[VIP套餐](一建)水利水电工程管理与实务(单科)"})
function ClassSelect() { }

ClassSelect.prototype = {
    opreatefn: function (o) {
        var that = this, tempb = true; ;
        if (o.is(".select")) {
            //如果当前是红色，则去掉红色
            G_Ioc.getInstance().DomFn(o).removeRed();
            G_Ioc.getInstance().DomFn(o).RemoveDataJson();
            console.log("ajax")
            var allsubject = o.closest("[data-select-group]").find("[data-event-type='subject']");
            G_Ioc.getInstance().DomFn($(allsubject)).removeNoDataGrey();
            allsubject.removeClass("no-products stop-sold have-buy");
        }
        else {
            //当前点击的班次添加红色\其它红色去除
            G_Ioc.getInstance().DomFn(o).addRed();
            G_Ioc.getInstance().DomFn(o.siblings(".select")).removeRed();
            //先从sessionstore中查询，是否存在
            var sessionkey = o.attr("data-id") + "_" + globle.g_ExamId;
            console.log("ajax")
            var sessiondata = JSON.parse(that.sessionGetData(sessionkey));
             if (sessiondata) {
                    if (!that.ClassNoData(sessiondata.Data, o)) { return false; }

                    that.DealDataFn(o, sessiondata);
                }  else {
                //异步获取科目信息放置科目选择卡
                
                $.ajax({
                    url: "/Course/GetDetailProductsList?PackageTypeId=" + o.attr("data-id") + "&ClassId=" + globle.g_ExamId,
                    type: 'GET',
                    async: false,
                    dataType: 'jsonp', //here
                    success: function (data) {
                        if (!G_Ioc.getInstance().GlobalFn().isJson(data)) {
                            alert('无效的JSON格式，请检查');
                            return false;
                        }

                        that.sessionSetData(sessionkey, JSON.stringify(data));

                        if (!that.ClassNoData(data.Data, o)) { tempb = false; }
                        that.DealDataFn(o, data);

                    },
                    error: function (msg) {
                        alert(msg);
                    }
                });
            }

        }
        return tempb;
    }
};

ClassSelect.prototype.DealDataFn = function (o, data) {
    //循环给科目赋值json
    this.addValue(o, data);
    //如果全是公共课，找出subjectType=2，赋值
    this.allIsPublicValue(o, data);
    //关于选择结果相关的处理逻辑---最重要函数
   // var subHandlero = o.closest("[data-select-group]").find("[data-event-type='subject']:not('[data-type=-1]'):first");
    //shn修改
    var subHandlero = o.closest("[data-select-group]").find(".select[data-event-type='subject']:not('[data-type=-1]'):first");
   
    G_Ioc.getInstance().GlobalFn().subjectHandler(subHandlero, true);
};


//循环给科目赋值json
ClassSelect.prototype.addValue = function (o, data) {
    o.closest("[data-select-group]").find("[data-event-type='subject']").each(function (i, v) {
        var v_dataid = $(v).attr("data-id");
        if (v_dataid) {
            var thisjson = G_Ioc.getInstance().GlobalFn().filterArr(v_dataid, data.Data, 1);
            if (thisjson && thisjson.length > 0) {
                var strJSON1 = JSON.stringify(thisjson[0]), v = $(v);
                //判断是否其它科目曾经没有过数据，先恢复
                if (v.is(".nodatagrey")) { G_Ioc.getInstance().DomFn($(v)).removeNoDataGrey(); }
                //
                v.removeAttr("data-customize1 data-customize2");
                //--只有单科
                if (thisjson[0].SubjectType == 1) { v.attr("data-customize1", strJSON1); }
                else if (thisjson[0].SubjectType == 2) { v.attr("data-customize2", strJSON1); }
                //为防止再次循环，直接判断---有单科并且有全科
                if (thisjson.length > 1) {
                    var strJSON2 = JSON.stringify(thisjson[1]);
                    if (thisjson[1].SubjectType == 1) { v.attr("data-customize1", strJSON2); }
                    else if (thisjson[1].SubjectType == 2) { v.attr("data-customize2", strJSON2); }
                }

            }
            else {
                G_Ioc.getInstance().DomFn($(v)).addNoDataGrey();
            }

        }
    });

};


//如果全是公共课，找出subjectType=2，赋值
ClassSelect.prototype.allIsPublicValue = function (o, data) {
    var subject_type = globle.g_subject_type; //0 没意义 1 全是公共课 2 全是专业课 3 公共课专业课都有
    //根据隐藏域得到是否全部公共课/专业课，分别赋值
    if (subject_type === 1) {
        var PubSubAllJson = G_Ioc.getInstance().GlobalFn().filterArr("", data.Data, 2);

        if (PubSubAllJson.length != 1) { return false; }
        PubSubAllJson = JSON.stringify(PubSubAllJson[0]);
        o.closest("[data-select-group]").find("[data-event='g_select_click'][data-type=-1]").attr("data-customize2", PubSubAllJson);
    }
};


ClassSelect.prototype.sessionGetData = function (key) {
    var value = "";
    if (window.localStorage) {
        value = sessionStorage.getItem(key);
        if (!G_Ioc.getInstance().GlobalFn().isJson(value)) { value = ""; }
    }
    return value;
};

ClassSelect.prototype.sessionSetData = function (key, value) {
    sessionStorage.setItem(key, value);
};
//某个班次没有数据的时候，让下面所有的科目变灰
ClassSelect.prototype.ClassNoData = function (data, o) {
    if (data == null) {
        var allsubject = o.closest("[data-select-group]").find("[data-event-type='subject']");
        $(allsubject).removeClass("no-products stop-sold have-buy");
        G_Ioc.getInstance().DomFn($(allsubject)).addNoDataGrey();
        G_Ioc.getInstance().GlobalFn().recoverPriceNum();
        //shn当无数据的班次---清空科目中的json数据
        $("[data-event-type='subject']").removeAttr("data-customize2 data-customize1");
        return false;
    }
    return true;
};