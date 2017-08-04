//赠品显示
function Gifts() {
    this.opreatefn = function (o, jsonObj) {
        var that = this, seckilladdHtml,
            giftsarr = jsonObj.Gifts, giftsHtml = "";
        //没有赠品时giftsarr==null
        if (!giftsarr) {
            return '';
        }
        //添加赠品
        else {
            //循环数组中的赠品个数 
            for (var i = 0; i < giftsarr.length; i++) {
                giftsHtml += '<p class="give-products">\
                                  <a href="' + GetGiftUrl(giftsarr[i]) + '" class="products-name" target="_blank">' + giftsarr[i].Title + '</a>\
                                  <i class="add-end-time">X1</i>\
                                </p>'
            }
            var addHtml = '<div class="margin10 js-gifts-box">\
                            <i class="add-smallfont left">赠：</i>\
                            <div class="left js-gifts">' + giftsHtml + ' \
                            </div>\
                           <div class="clear"></div>\
                       </div>';
            return addHtml;
        }
    };
}

function GetGiftUrl(model) {
    var url = "";
    switch (model.ProductsType) {
        case 6: //课程套餐
            url = "http://k.wangxiao.cn/item/" + model.Num +".html";
            break;
        case 3: //图书
            url = "http://book.wangxiao.cn/Info/" + model.Num + ".html";
            break;
        case 5: //图书套餐
            url = "http://book.wangxiao.cn/Info2/" + model.Num + ".html";
            break;
        case 9: //章节课
            url = "http://wap.wangxiao.cn/ZhangJieKe/Index/?ClassHoursId=" + model.Id + "&subjectId=" + model.SysClassId;
            break;
        case 8: //直播课程
            url = "http://live.wangxiao.cn/LiveCourse/?Id=" + model.Id + "&sysClassId=" + model.SysClassId;
            break;
        default:
            url = "javascript:void(0);"
            break;

    }
    return url;
}
