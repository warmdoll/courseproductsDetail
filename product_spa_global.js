function GlobalModule(){}

GlobalModule.prototype = {
    //绑定与班型、科目相关的DOM选择事件，只能调用一次，不然重用   或  先关闭
    init: function () {
        //如果传过来参数是确定了一个专业课的情况/全是专业课
        if (globle.g_subject_type == 2) {
            var o_group_pro = $("[data-select-group=1]").find("[data-type=1]");
            o_group_pro.after("<div data-event=\"g_select_click\" data-event-type=\"subject\" data-type=\"0\" class=\"selected-course-btn selected-btnstyle statusafter\" data-id=\"\" style=\"display:none\">temp</div>");
        }

        var that = this;
        var tempb;

        $("[data-select-group]").on("click", "[data-event='g_select_click']", function (e) {
            var othis = $(this), data_event = othis.attr("data-event-type");
            tempb = true;
            //如果灰色，提示全科已经包含
            if (othis.is(".grey")) { G_Ioc.getInstance().DomFn().AddpromptText("全科已经包含此公共课"); return; }
            //0 已购买 1 已售罄 2 已停售----点击没反映
            if (othis.is(".nodatagrey,.have-buy,.no-products,.stop-sold")) { return; }

            switch (data_event) {
                case "class":
                    if (!that.classHandler(othis)) { tempb = false; };
                    break;
                case "subject":
                    that.subjectHandler(othis);
                    break;
                default:
            }
            //调用signle的pricenum
            if (tempb) {
                var o_group_val = othis.closest("[data-select-group]").attr("data-select-group");
                G_Ioc.getInstance().SingleFn().price_num().opreatefn(o_group_val);
            }
        });
        //显示科目弹出框
        $("[data-select-group]").on("mouseover", "[data-event='g_select_click'] .jsadd-html", function () {
            var othis = $(this).parents("[data-event='g_select_click']");
            if (tempb) {
                //可买商品 鼠标悬停弹出框显示
                if (globle.g_subject_type == 1 && othis.is(".select[data-type='-1']")) {
                    if (othis.is(".select.selected-course-btn[data-type='-1']") && !othis.is(".select.have-buy")) {
                        G_Ioc.getInstance().DomFn(othis).AddCanBuyBox();
                    }
                } else {
                    if (othis.is(".select.selected-course-btn") && !othis.is(".select.have-buy,.nodatagrey")) {
                        G_Ioc.getInstance().DomFn(othis).AddCanBuyBox();
                    }
                }
            } else {
                G_Ioc.getInstance().DomFn(othis).AddCanBuyBox();
            }


            //已买商品 鼠标悬停弹出框显示

            if (othis.is(".have-buy[data-event-type='subject']")) {
                G_Ioc.getInstance().DomFn(othis).AddHavebuyBox();
            }

        });
        $(".add-products-detail").on('click', function (event) {
            event.stopPropagation();
        });
        //初始化的一些操作--全局变量等
        this.dom_init();
        //点击商品描述的下拉箭头----显示更多内容
        showAddHtml_Ioc.getInstance().heightJudgment($(".js-confirm-products"));
    },



    // 点击班型相关处理事件
    classHandler: function (o) {
        // 首先循环赋值科目data-customize=JSON.stringify({"Price": 3500,"CurrentPrice": 1580,"ProductsTitle": "[VIP套餐](一建)水利水电工程管理与实务(单科)"})
        // 调用结果处理方法
        // 并且通知----价格----已选（秒杀）----加入购物车是否变灰--------------------从IOC窗口取方法
        var class_select = new ClassSelect();
        return class_select.opreatefn(o);
    },
    // 点击科目相关处理事件
    subjectHandler: function (o, isfromclass) {
        // 公共课选择逻辑---专业课选择的逻辑---是否跳转全科---点击全科（是否有专业课、是否已买）
        var subject_class = new SubjectClass();
        subject_class.opreatefn(o, isfromclass);
        //取消科目时清空----商品浮动层的内容
        o.find(".jsadddetail-html").html("");
    },
    //通知其它的选择区域，形参来自哪个group
    noticeSelect: function (fromval) {
        Notice_Select.call(this, fromval);
    },
    //公用方法，filter  json对象，返回过滤后的js对象，type:1为根据sysclassid==val，2:直接获取唯一全科（全是公共课）
    filterArr: function (val, arr, type) {
        if (!arr || arr.length < 1) { return []; }
        return arr.filter(function (item) {
            if (type == 1) {
                return item.SysClassId == val;
            }
            else if (type == 2) {
                return item.SubjectType == 2;
            }
        });
    },
    isJson: function (jsonval) {
        try {
            JSON.stringify(jsonval);
            return true;
        } catch (err) {
            return false;
        }
    },
    recoverPriceNum: function () {
        $("#cur-price").html(window.cur_price_html);
        $("#buy-number").html(window.cur_buy_num);
    },
    dom_init: function () {
        //商品状态  1 单个商品 2、 选中班型 3、选中科目 0没选择任何 也就是从考试入口进入的
        switch (globle.g_productsflag) {
            case 2:
                $("[data-select-group=1]").find("[data-event-type='class']:first").trigger('click');
                break;
            case 3:
                G_Ioc.getInstance().DomFn($("[data-select-group=1]").find("[data-event-type='subject'][data-type!='-1']:first")).addRed();
                break;
        }

        //全局变量获取初始价格区间
        window.cur_price_html = $("#cur-price").html();
        window.cur_buy_num = $("#buy-number").html();
        //存储用户名
        var loginUsername;
        $.getJSON("http://users.wangxiao.cn/Passport/GetLoginInfo.ashx?callback=?", function (data) {
            if (data != null) {
                loginUsername = data.Username2;
            } else {
                loginUsername = " ";
            }
            //加载页面时如果没有存用户名 则写入
            if (!sessionStorage.getItem("userNameFlag")) {
                sessionStorage.setItem("userNameFlag", loginUsername);
            } else {
                //如果有则改变session中的用户名
                var sessionName = sessionStorage.getItem("userNameFlag");
                if (sessionName == loginUsername) {
                    //用户名不变时不改变
                    return;
                } else {
                    //用户名改变时 清空session中的数据 重新获取新用户下的商品信息
                    sessionStorage.clear();
                    //更换用户名后重新获取确定班型的数据
                    if (globle.g_productsflag==2) {
                        $("[data-select-group=1]").find("[data-event-type='class']:first").removeClass("select");
                        $("[data-select-group=1]").find("[data-event-type='class']:first").trigger('click');
                    }
                    sessionStorage.setItem("userNameFlag", loginUsername);
                }
            }


        });

        //关闭clickFn
        $(document).on('click', ".close_window", function () {
            $(this).parents(".shadow").hide();
        })
        .on('click', ".shadow,.buynow_box,.nobuy_box", function (event) {
            event.stopPropagation();
        });
        //商品信息弹出框点击--阻止冒泡
        $(".jsadddetail-html").on('click', function (event) {
            event.stopPropagation();
        });
        //点击关闭弹出框 通知1
        $(".js-addcart-reselected .close_classwindow").click(function (event) {
            $(".shadow,.add-selectedcourse,.js-small-box").hide();
            G_Ioc.getInstance().GlobalFn().noticeSelect(2);
        });
        //点击立即购买弹出框----关闭弹出框
        $(".js-buy-reselected .close_classwindow").click(function (event) {
            $(".shadow,.add-selectedcourse,.js-small-box").hide();
            G_Ioc.getInstance().GlobalFn().noticeSelect(3);
        });
        //点击确认按钮
        $(".js-add-freestudy").on("click", function () {
            var othis = $(this);
            if ($(this).parents(".js-addcart-reselected").length == 1) {
                G_Ioc.getInstance().GlobalFn().noticeSelect(2);
                G_Ioc.getInstance().SingleFn().addCart().opreatefn(othis);
            } else if ($(this).parents(".js-buy-reselected").length == 1) {
                G_Ioc.getInstance().GlobalFn().noticeSelect(3);
                G_Ioc.getInstance().SingleFn().addCart().opreatefn(othis);
            }
        });

        //点击第一个加入购物车的处理函数
        $(".now_buy.addCart,.buy#first-nowapply,.buy#second-nowapply").on('click', function () {
            var othis = $(this);
            G_Ioc.getInstance().SingleFn().addCart().opreatefn(othis);

        });
        $(".baoming").on("click", function () {
            G_Ioc.getInstance().SingleFn().addCart().baomingFn($(this));
        });
        //点击第二个加入购物车的处理函数

        //删除数组中某一个元素
        Array.prototype.removeByValue = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) {
                    this.splice(i, 1);
                    break;
                }
            }
        }
    }
}




