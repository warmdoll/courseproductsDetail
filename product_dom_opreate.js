//此处封装选择相关所有DOM处理（变红、灰、加角标……）
function Dom_Select(o) {
    this.o = $(o);
}

Dom_Select.prototype = {
    //变红
    addRed: function () {
        this.o.addClass("select");
        return this;
    },
    //变灰
    addGrey: function () {
        this.o.addClass("grey");
        return this;
    },
    //变成没有数据的-灰
    addNoDataGrey: function () {
        this.o.addClass("nodatagrey");
        return this;
    },
    //移除没有数据的-灰
    removeNoDataGrey: function () {
        this.o.removeClass("nodatagrey");
        return this;
    },
    //移除红
    removeRed: function () {
        this.o.removeClass("select");
    },
    //移除灰
    removeGrey: function () {
        this.o.removeClass("grey");
        return this;
    },
    //添加已买样式
    addHaveBuy: function () {
        this.o.addClass("have-buy");
        return this;
    },
    //删除已买样式
    removeHaveBuy: function () {
        this.o.removeClass("have-buy");
        return this;
    },
    //添加无货样式
    addNoProducts: function () {
        this.o.addClass("no-products");
    },
    //删除无货样式
    removeNoProducts: function () {
        this.o.removeClass("no-products");
        return this;
    },
    //添加停售样式
    addStopSold: function () {
        this.o.addClass("stop-sold");
        return this;
    },
    //删除停售样式
    removeStopSold: function () {
        this.o.removeClass("stop-sold");
        return this;
    },
    RemoveDataJson: function () {
        $("[data-event='g_select_click'][data-event-type='subject']").each(function (i, v) {
            $(v).removeAttr("data-customize2 data-customize1");
        });
    },
    //点击已买图标---显示弹出框
    AddHavebuyBox: function () {
        var addHtml = showAddHtml_Ioc.getInstance().AddHavebuyBoxHtml(this.o);
        this.o.find(".jsadddetail-html").html(addHtml);
    },
    //点击可买的科目时显示 弹出框
    AddCanBuyBox: function () {
        var addHtml = showAddHtml_Ioc.getInstance().AddCanBuyBoxHtml(this.o);
        var classSelect = this.o.parents(".selected-products-box").find(".select[data-event-type='class']");
        if (classSelect.length > 0) {
            this.o.find(".jsadddetail-html").html(addHtml);
            //点击商品描述的下拉箭头----显示更多内容
            showAddHtml_Ioc.getInstance().heightJudgment(this.o);
        } else {
            this.o.find(".jsadddetail-html").html("");
        }

    },
    //提示信息
    AddpromptText: function (text) {
        $(".js-small-box").show();
        $("#message-text").html(text);
    },
    //点击遮罩层----隐藏
    ClickShadow: function () {
        this.o.hide();
    },
    //关闭弹出窗口
    CloseWindow: function () {
        $(".shadow").hide();
    }

}



























































