/* global rootDir */
import 'babel-polyfill'
import fs from 'fs'
import { resolve } from 'path'
import Koa from 'koa'
import Router from 'koa-router'
import mount from 'koa-mount'
import serve from 'koa-static'
import logger from 'koa-logger'
import convert from 'koa-convert'
import { promisify } from 'bluebird'

let read = promisify(fs.readFile)
let app = new Koa()
let router = new Router()

// koa v2 app.use migration
// https://github.com/koajs/convert#migration
let _use = app.use
app.use = x => _use.call(app, convert(x))

router.get('/', async (ctx) => {
  ctx.type = 'html'
  ctx.body = await read(resolve(rootDir, 'src/web/index.html'))
})

app.use(logger())
app.use(router.routes())
app.use(mount('/web', serve(resolve(rootDir, 'dist/web'))))

let port = 9774
app.listen(port, (err) => {
  if (err) throw err
  console.log(`markppt server started on ${port}`)
})

export default app
