const { mysql } = require('../../model/mysql.js')

module.exports = async (ctx) => {
  // 轮播图数据
  const banner = await mysql('nideshop_ad').where({
    ad_position_id: 1
  }).select()

  // console.log(banner+ '---')

  ctx.body = {
    'banner': banner
  }
}