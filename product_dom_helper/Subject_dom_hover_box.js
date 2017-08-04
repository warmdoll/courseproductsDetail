//鼠标移入到已买科目和可买科目时的弹出层
var showAddHtml_Ioc = (function () {

    function showAddHtml() { };

    showAddHtml.prototype.AddHavebuyBoxHtml = function (o) {
        var that = this;
        var addHtml = '<div class="append-box">\
                                <div class="up-deraction"></div>\
                                    <div class="add-products-detailbox">\
                                        <div class="add-products-detail">\
                                            <div class="products-detail-top">\
                                                <div class="add-coursetitle-box">\
                                                    <i class="add-smallfont">您已报名</i> <span class="add-course-title">' + that.retArrObjfn(o).ProductsTitle + '</span>\
                                                </div>\
                                            </div>\
                                            <div class="products-detail-bottom">\
                                                <p class="tc have-buy-freestudy">' + that.hbuyfree(o) + '</p>\
                                            </div>\
                                        </div>\
                                    </div>\
                                </div>';
        return addHtml;
    };
    showAddHtml.prototype.AddCanBuyBoxHtml = function (o) {
        var o_group_val = o.closest("[data-select-group]").attr("data-select-group");
        var retObj = Sub_Helper.getInstance().GetProductsObj(o_group_val);
        var that = this;
        if (retObj.length > 0) {
            var dataId = o.attr("data-id");
            var currObj = retObj.filter(function (item) {
                return item.SysClassId == dataId;
            });
            var retArrObj = currObj[0];
            //全是公共课&&全科选中---确定是全科商品 获取全科的json数据
            if (globle.g_subject_type == 1 && o.is(".select[data-type='-1']")) {
                currObj = JSON.parse(o.attr("data-customize2"));
                retArrObj = currObj;
            }
            //确定一个商品时
            var confPruducts = currObj.length > 0 && retArrObj.BuyType == 3;
            //全是公共课 确定一个全科商品
            var allcourse = currObj && currObj.BuyType == 3;
            var add_ProductIntro="";
            if (confPruducts || allcourse) {
                   if(retArrObj.ProductIntro==""){
                        add_ProductIntro='<div class="margin10 add-smallfont">\
                                                <div class="left add-productsdec"></div>\
                                          </div>';
                    } else {                                
                        add_ProductIntro='<div class="margin10 add-smallfont">\
                                                <i class=" left">商品描述：</i>\
                                                <div class="left add-productsdec"><div class="mask-layer js-mask-layer"></div>\
                                                <div class="js-height-productsdec">'+ retArrObj.ProductIntro +'</div>\
                                          </div>';
                      }
                var addHtml = '<div class="canbuyappend-box">\
                            <div class="up-deraction"></div>\
                                        <div class="add-products-detailbox">\
                                            <div class="add-products-detail">\
                                                <div class="products-detail-top">\
                                                    <div class="add-coursetitle-box">\
                                                        <span class="add-course-title">' + retArrObj.ProductsTitle + '</span>' + that.freeClassHours(retArrObj) + '\
                                                        <div class="clear">\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                                <div class="products-detail-bottom">\
                                                    <div class="add-price-box margin10">\
                                                        <span class="font-color">原价<i class="course-old-price">' + retArrObj.Price + '</i></span> <span class="nowfont-color">\
                                                            现价<i class="course-now-price">' + retArrObj.CurrentPrice + '</i></span>\
                                                    </div>' + that.AddincreasesPrice(retArrObj)
                                                    + G_Ioc.getInstance().SingleFn().productsnumdate().opreatefn(o, retArrObj)
                                                    + new Seckill().opreatefn(o, retArrObj)
                                                    + G_Ioc.getInstance().SingleFn().gifts().opreatefn(o, retArrObj)
                                                    +add_ProductIntro+'<div class="clear"></div>\
                                                        <div class="show-more js-show-more"></div>\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                    </div>\
                                  </div>';
            } else {
                addHtml = "";
            }


        } else {
            addHtml = "";
        }
        return addHtml;
    };
    
    //商品描述高度处理
    showAddHtml.prototype.heightJudgment = function (o) {
        var heightProductsdec = o.find(".js-height-productsdec").height();
        var maxProductsdec = o.find(".add-productsdec");
        if (heightProductsdec > 150) {
            o.find(".js-mask-layer,.js-show-more").show();
            o.find(".add-productsdec").addClass("max-productsdec");
        }
        $(".js-show-more").on("click", function () {
            if (maxProductsdec.is(".max-productsdec")) {
                o.find(".js-mask-layer").hide();
                o.find(".add-productsdec").removeClass("max-productsdec");
            } else {
                o.find(".js-mask-layer").show();
                o.find(".add-productsdec").addClass("max-productsdec");
            }

        });
    }
    //涨价策略
    showAddHtml.prototype.AddincreasesPrice = function (retArrObj) {
        //涨价策略
        var increasesPrice = "";
        if (retArrObj.IncreasedPricesTips.length == 0 || retArrObj.IncreasedPricesTips == null) {
            increasesPrice = "";
        } else {
            increasesPrice = ' <div class="margin10">\
                                     <span class="add-time-box">' + retArrObj.IncreasedPricesTips + '</span>\
                                  </div>';
        }
        return increasesPrice;
    };
    //免费试听
    showAddHtml.prototype.freeClassHours = function (retArrObj) {
        var freeClassHoursId = retArrObj.freeClassHoursId, freeClassHtml = '';
        if (retArrObj.freeClassHoursId.length == 0 || retArrObj.freeClassHoursId == null) {
            freeClassHtml = ' <a href="javascript:;" style="display:none;" class="add-freestudy rt">暂无试听课</a>';
        } else {
            freeClassHtml = '<a href="http://users.wangxiao.cn/player/Index.aspx?Id=' + freeClassHoursId + '" target="_blank" class="add-freestudy rt">免费试学</a>';
        }
        return freeClassHtml;
    };
    //获取已买商品的json对象
    showAddHtml.prototype.retArrObjfn = function (o) {
        var retArrObj, freeClassHtml = "";

        if (o.siblings("[data-type='-1']").is(".select")) {
            retArrObj = JSON.parse(o.attr("data-customize2"));
        } else {
            //只有公共课
            if (globle.g_subject_type == 1 && o.is(".have-buy[data-type='-1']")) {
                retArrObj = JSON.parse(o.attr("data-customize2"));
            } else {
                retArrObj = JSON.parse(o.attr("data-customize1"));
            }

        }


        return retArrObj;
    };
    //添加已买商品下的免费试听
    showAddHtml.prototype.hbuyfree = function (o) {
        var that = this;
        var retArrObj = that.retArrObjfn(o);
        var freeClassHoursId = retArrObj.freeClassHoursId, freeClassHtml = '';
        if (retArrObj.freeClassHoursId.length == 0 || retArrObj.freeClassHoursId == null) {
            freeClassHtml = ' <a href="javascript:;" style="background-color:#ccc;" class="add-freestudy rt">暂无试听课</a>';
        } else {
            freeClassHtml = '<a href="http://users.wangxiao.cn/player/Index.aspx?Id=' + freeClassHoursId + '" target="_blank" class="add-freestudy rt">免费试学</a>';
        }
        return freeClassHtml;
    };
    // 单例
    var instance;
    var _static = {
        getInstance: function () {
            if (instance === undefined) {
                instance = new showAddHtml();
            }
            return instance;
        }
    };
    return _static;
})();
