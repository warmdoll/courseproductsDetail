//加入购物车和立即购买的处理----(立即购买需要跳转到购物车) 
function AddCart() {
    this.opreatefn = function (o) {
        var PruductsArr = Sub_Helper.getInstance().GetProductsObj(1);
        var productsId = "", that = this;
        //判断是已确定商品还是需要选择的商品
        if (globle.g_productsflag == 1) {
            //已确定商品的页面商品id
            productsId = globle.g_productsid;
        } else {
            //通过选择确定商品id
            PruductsArr.forEach(function (val, idx, arr) {
                productsId = productsId == "" ? productsId + val.ProductsId : productsId + "," + val.ProductsId;
            });
        }
        //判断商品id是否存在
        if (productsId == "") {
            //商品id为空----点击加入购物车 立即购买 确认时提示对应的选择
            if (o.is("#first-addCart") || o.is(".buy#first-nowapply") || o.is(".js-add-freestudy")) {
                that.promptSelected(o);
            }
            else if (o.is("#second-addCart") || o.is(".buy#second-nowapply")) {
                //点击导航条上的按钮时----弹出选班和科目的弹出框
                that.selectedBox(o);
            }
        } else {
            //商品id存在---加入购物车
            that.addCartFn(productsId, o);
        }

        //点击弹出框中按钮----处理函数
        that.clickFn();
    };
    //点击导航条上的加入购物车、立即购买
    this.selectedBox = function (o) {
        G_Ioc.getInstance().GlobalFn().noticeSelect(1);
        if (o.is("#second-addCart")) {
            $(".js-addcart-reselected,.add-selectedcourse").show();
            G_Ioc.getInstance().GlobalFn().noticeSelect(3);
        }
        else if (o.is(".buy#second-nowapply")) {
            $(".js-buy-reselected,.add-selectedcourse").show();
            G_Ioc.getInstance().GlobalFn().noticeSelect(2);
        }
    };
   //点击加入购物车前判断是否选中班级和科目
    this.promptSelected = function (o) {
        var selectedObj = o.parents(".selected-siblings").siblings(".js-findsibling");
        var classSelected = selectedObj.find(".selected-class-btn.select").length;
        var subjectSelected;
        subjectSelected = selectedObj.find(".selected-course-btn.select:not('.have-buy,.stop-sold,.no-products,.grey')").length;
       
        if (classSelected == 0) {
            G_Ioc.getInstance().DomFn().AddpromptText("请选择班型");
        }
        else if (subjectSelected == 1 && selectedObj.find(".selected-course-btn[data-type='-1']").is(".select")) {
           G_Ioc.getInstance().DomFn().AddpromptText("请选择专业课");
        } else {
            G_Ioc.getInstance().DomFn().AddpromptText("请选择科目");
        }
    };
    //加入购物车
    this.addCartFn = function (parmId, o) {
        var that = this;
        var has = false;
        //从接口获取 已经在购物车 
        $.getJSON("http://k.wangxiao.cn/Course/ProductsCarts?productsId=" + parmId + "&flag=1&callback=?", function (result) {
            if (result.ResultCode == 0) {
                //跳转到购物车
                var confirmJump = o.parents(".js-buy-reselected").find(".js-findsibling").attr("data-select-group") == 3;
                if (result.Data.dealStatus == -1) {
                    //第一次加入购物车
                    //加入购物车 商品飞入购物车
                    if (o.is("#first-addCart")) {
                        that.productsFly();
                    }
                    setTimeout(function () { that.AddCompleteFn() }, 1000);
                 
                    if (o.is(".buy#first-nowapply") || o.is(".buy#second-nowapply") || confirmJump) {
                        window.location.href = "http://order.wangxiao.cn/cart.aspx?url=" + encodeURIComponent(window.location.href);
                    }
                    $("#ShowCartCount").html(result.Data.Count);

                } else if (result.Data.dealStatus == 1) {
                    //商品已经在购物车----弹出框 商品已经存在购物车
                    that.AlreadyExistFn();
                    $(".img-append").remove();
                    //跳转到购物车
                    if (o.is(".buy#first-nowapply") || o.is(".buy#second-nowapply") || confirmJump) {
                        window.location.href = "http://order.wangxiao.cn/cart.aspx?url=" + encodeURIComponent(window.location.href);
                    }
                    //显示购物车数量
                    $("#ShowCartCount").html(result.Data.Count);
                }
            }
        })
    };
    //零元报课
    this.baomingFn = function (o) {

        $.getJSON("http://wap.wangxiao.cn/course/buyproducts?productsid=" + $(o).data("id") + "&callback=?", function (resp) {
                if (resp) {
                    if (resp.ResultCode == "0") {
                        G_Ioc.getInstance().DomFn().AddpromptText("报名成功！");
                        window.location.reload();
                    }
                    else {
                        if (!resp.IsLogin) {
                            $(".top_login_btn_1:first").trigger("click");
                            return;
                        }
                        else {
                            G_Ioc.getInstance().DomFn().AddpromptText("报名失败");
                        }
                    }
                }
            })
      
    };
    //飞入购物车效果
    this.productsFly = function () {
        if ($(".shoppingcart").length == 1) {
            var startOffset;
            var endOffset = $(".shoppingcart").offset();
            var changeImg;
            if ($(".big_pic").length == 1) {
                //详情页
                changeImg = $(".big_pic img").attr("src");
                startOffset = $(".big_pic img").offset();
                $("body").append("<img class='img-append' style='width:502px;height:285px;top: " + startOffset.top + "px;left:" + startOffset.left + "px;position:absolute;'src=" + changeImg + " />");
                //添加商品图片的坐标
            } else if ($(".asdlkfjsad").length > 1) {
                startOffset = topDiv.find(".asdlkfjsad img").offset();
                changeImg = topDiv.find(".asdlkfjsad img").attr("src");
                $("body").append("<img class='img-append' style='top: " + startOffset.top + "px;left:" + startOffset.left + "px;position:absolute;' src=" + changeImg + " />");
            }
            //列表页
            $(".img-append").stop(true, true).animate({
                top: endOffset.top - 30 + "px",
                left: endOffset.left + 80 + "px",
                width: "0%",
                height: "0%"
            }, 1000);
        }
    };
    //加入成功提示框
    this.AddCompleteFn = function () {
        if ($(".js-remove").length > 0) { $(".js-remove").remove(); }
          var dom = '<div class="shadow js-remove">\
			<div class="buynow_box">\
				<div class="close_window">\
				X\
				</div>\
				<p class="buynow_box_tip">温馨提示</p>\
				<div class="dialog-content">\
					<p>已成功加入购物车</p>\
				</div>\
				<div class="dialog-console">\
					<a href="javascript:void(0)" id="goFinishMoney" class="console-btn-confirm">去结算</a>\
					<a href="javascript:void(0)" id="continueBuy" class="console-btn-cancel">继续购物</a>\
				</div>\
			</div>\
		</div>';
        $("body").append($(dom));
        $(".js-remove").show();
        $(".img-append").remove();
     };
    //已存在
     this.AlreadyExistFn = function () {
         if ($(".js-haveshadow").length > 0) { $(".js-haveshadow").remove(); }
         var dom = '<div class="shadow js-haveshadow">\
			<div class="nobuy_box">\
            <div class="close_window">\
				X\
				</div>\
				<P class="nobuy_box_text">购物车已经包含此课程，不能重复添加</P>\
			</div>\
		</div>';
         $("body").append($(dom));
         $(".js-haveshadow").show();
         //window.location.href = "http://order.wangxiao.cn/cart.aspx?url=" + encodeURIComponent(window.location.href);
     };
     //提示框处理函数
     this.clickFn = function () {
         //去结算
         $(document).on('click', "#goFinishMoney", function () {
             window.open("http://order.wangxiao.cn/cart.aspx?url=" + encodeURIComponent(window.location.href));
             $(".shadow").hide();
         })
         //继续购物
        .on('click', "#continueBuy", function () {
            $(".shadow").hide();
        })
        .on('click', ".close-sallbox", function () {
            $(".shadow-sall").hide();
        })
        .on('click', ".shadow", function () {
            G_Ioc.getInstance().DomFn($(this)).ClickShadow();
            if ($(this).is(".js-addcart-reselected")) {
                G_Ioc.getInstance().GlobalFn().noticeSelect(2);
            }
            else if ($(this).is(".js-buy-reselected")) {
                G_Ioc.getInstance().GlobalFn().noticeSelect(3);
            }
        })
        .on('click', ".buynow_box,.nobuy_box", function (event) {
            event.stopPropagation();
        });
     }
}
