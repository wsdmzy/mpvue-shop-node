const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const config = require('./model/config')

const app = new Koa();

// 解析post请求体
app.use(bodyParser())

const router = require('./routes/index')

app.use(router.routes())

app.listen(config.port,() => {
  console.log(`服务在${config.port}端口启动成功`)
})
