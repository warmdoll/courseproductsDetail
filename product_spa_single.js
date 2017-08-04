function SingleModule(){}
SingleModule.prototype={
  // 价格和人数处理
    price_num: function () {
      var s_priceNum = new PriceNum();
    return s_priceNum;
  },
  // 秒杀相关
  seckill:function(){
    var s_seckill=new Seckill();
    return s_seckill;
  },
 //赠品相关
  gifts: function () {
      var s_gifts = new Gifts();
      return s_gifts;
  },
  //商品剩余、限售、停售时间相关
  productsnumdate: function () {
      var s_productsnumdate = new productsNumDate();
      return s_productsnumdate;
  },
  // 加入购物车  type=0?飞的效果:1立即报名-跳转
  addCart:function(type){
    var s_addcart=new AddCart();
    return s_addcart;
  },
  // 无限级收缩菜单
  tree:function(){
    var s_tree=new Tree();
    return s_tree;
  },
  // 试听
  listen:function(){
    var s_listen=new Listen();    
    return s_listen;
  }
}
