const Koa = require('koa')
const config = require('./model/config')
const app = new Koa();

const router = require('./routes/index')

app.use(router.routes())

app.listen(config.port,() => {
  console.log(`服务在${config.port}端口启动成功`)
})
