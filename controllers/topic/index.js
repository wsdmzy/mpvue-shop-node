const { mysql } = require('../../model/mysql')

// 获取专题列表数据
async function listaction(ctx) {
  let page = ctx.query.page || 1;
  const size = 5
  // 分页处理
  const data = await mysql('nideshop_topic').column('id','title','price_info','subtitle','scene_pic_url').limit(size).offset((page-1)*size)
  const data1 = await mysql('nideshop_topic').column('id','title','price_info','subtitle','scene_pic_url').select()
  const total = parseInt(data1.length / 5)
  // console.log(total)
  ctx.body = {
    'page': page,
    'totla': total,
    'data': data
  }
}

// 专题详情
async function detailaction(ctx) {
  const id = ctx.query.id
  let data = []
  if (id) {
    data = await mysql('nideshop_topic').where({
      'id': id
    }).select()

    const recommendList = await mysql('nideshop_topic').column('id','title','price_info','subtitle','scene_pic_url').limit(4).select()
    ctx.body = {
      'data': data[0],
      'recommendList': recommendList
    }
  }
}


module.exports = {
  listaction,
  detailaction
}
