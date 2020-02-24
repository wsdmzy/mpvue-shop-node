const { mysql } = require('.././../model/mysql')

// 分类列表 导航栏
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

// 分类页面
async function indexAction(ctx) {
  const {id: categoryId} = ctx.query
  // const categoryId = ctx.query.id
  const data = await mysql('nideshop_category').where({
    'parent_id': 0
  }).select()
  console.log(data)
  const currentCategory = []
  if (categoryId) {
    currentCategory = await mysql('nideshop_category').where({
      'parent_id': categoryId
    }).select()
  }
  
  ctx.body = {
    data
  }

}

// 获取对应的分类
async function currentAction(ctx) {
  const categoryId = ctx.query.id

  const data = {}
  const currentOne = await mysql('nideshop_category').where({
    'id': categoryId
  }).select()
  const subList = await mysql('nideshop_category').where({
    'parent_id': currentOne[0].id
  }).select()
  // console.log(subList)
  data.currentOne = currentOne[0]
  data.currentOne.subList = subList

  ctx.body = {
    data
  }

}

module.exports = {
  categoryNav,
  indexAction,
  currentAction
}