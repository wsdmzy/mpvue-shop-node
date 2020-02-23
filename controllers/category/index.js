const { mysql } = require('.././../model/mysql')

// 分类列表
async function categoryNav(ctx) {
  const categoryId = ctx.query.id;
  //获取当前类
  const currentNav = await mysql('nideshop_category').where({
    'id': categoryId
  }).select();
  //获取同类
  const navData = await mysql('nideshop_category').where({
    'parent_id': 0
  }).select();

  ctx.body = {
    navData,
    currentNav: currentNav[0]
  }
}

module.exports = {
  categoryNav
}