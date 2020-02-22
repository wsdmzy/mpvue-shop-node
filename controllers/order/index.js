const { mysql } = require('../../model/mysql')

async function submitAction(ctx) {
  const { openId, goodsId, allPrice } = ctx.request.body
  // console.log(goodsId)
  // 是否存在订单
  const isOrder = await mysql('nideshop_order').where({
    'user_id': openId
  }).select();
  if (isOrder.length > 0) {
    const data = await mysql('nideshop_order').where({
      'user_id': openId
    }).update({
      goods_id: goodsId,
      allPrice: allPrice
    })
    if (data) {
      ctx.body = {
        data: true
      }
    } else {
      ctx.body = {
        data: false
      }
    }
  } else {
    const data = await mysql('nideshop_order').insert({
      user_id: openId,
      goods_id: goodsId,
      allPrice: allPrice
    })
    if (data) {
      ctx.body = {
        data: true
      }
    } else {
      ctx.body = {
        data: false
      }
    }
  }
  
}

async function detailAction(ctx) {
  const openId = ctx.query.openId
  const addressId = ctx.query.addressId || ''
  const orderDetail = await mysql('nideshop_order').where({
    'user_id': openId
  }).select()
  var goodsIds = orderDetail[0].goods_id.split(',')
  console.log(goodsIds)

  const list = await mysql('nideshop_cart').andWhere({
    'user_id': openId
  }).whereIn('goods_id', goodsIds).select();

  // console.log(list)
  // 收货地址
  var addressList;
  if (addressId) {
    addressList = await mysql('nideshop_address').where({
      'user_id': openId,
      'id': addressId
    }).orderBy('is_default', 'desc').select()
  } else {
    addressList = await mysql('nideshop_address').where({
      'user_id': openId,
      // 'id': addressId
    }).orderBy('is_default', 'desc').select()
  }

  // let price = 0
  // price = orderDetail.forEach(item => {

  // })
  // console.log(list)
  // let price = list.reduce((v,i) => {return v + i.retail_price * i.number},0)
  // console.log(price)

  ctx.body = {
    price: list.reduce((v,i) => {return v + i.retail_price * i.number},0),
    goodsList: list,
    address: addressList[0] || {}
  }

}


module.exports = {
  submitAction,
  detailAction
}