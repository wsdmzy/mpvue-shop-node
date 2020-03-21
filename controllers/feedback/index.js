const { mysql } = require('../../model/mysql')

async function submitAction(ctx) {
  // console.log('22222')
  const {openId, name, content, phone } = ctx.request.body
  // console.log(content)
  var date =  + new Date()
  // console.log(date)
  const data = await mysql('nideshop_feedback').insert({
    'user_id': openId,
    'user_name': name,
    'msg_content': content,
    'connect': phone,
    'msg_time': date
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


module.exports = {
  submitAction
}