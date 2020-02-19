const { mysql } = require('../../model/mysql')

// 商品详情页
async function detailAction(ctx) {
  const goodsId = ctx.query.id;
  const openId = ctx.query.openId;
  // 商品信息
  const info = await mysql('nideshop_goods').where({
    'id': goodsId
  }).select()
  // 图片信息
  const gallery = await mysql('nideshop_goods_gallery').where({
    'goods_id': goodsId
  }).select();
  // 商品参数
  // 关联查询俩张表
  const attribute = await mysql('nideshop_goods_attribute')
                            .column('nideshop_goods_attribute.value', 'nideshop_attribute.name')
                            .leftJoin('nideshop_attribute', 'nideshop_goods_attribute.attribute_id', 'nideshop_attribute.id')
                            .where({
                              'nideshop_goods_attribute.goods_id': goodsId
                            }).select()
  // 常见问题
  const issue = await mysql('nideshop_goods_issue').select(); 

  // 大家都在看
  const productList = await mysql('nideshop_goods').where({
    'category_id': info[0].category_id
  }).select()
  
  // 判断是否收藏
  const iscollect = await mysql('nideshop_collect').where({
    'user_id': openId,
    'value_id': goodsId
  }).select()
  let collected = false
  if (iscollect.length > 0) {
    collected = true
  }

  ctx.body = {
    'info': info[0] || [],
    gallery,
    attribute,
    issue,
    productList,
    collected
  }

}




module.exports = {
  detailAction
}