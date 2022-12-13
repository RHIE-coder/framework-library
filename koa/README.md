# Koa Framework

## # Installation

```js
npm i koa
npm i koa-router
```

## # Getting Started

### - [Core](https://koajs.com/)

#### Example 1

```js
const Koa = require('koa');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  console.log('111');
  await next();
  console.log('222');
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  console.log('333');
  await next();
  console.log('444');
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```
 - OUTPUT

```
111
333
444
222
GET / - 6ms
```

Koa invoke "downstream", then control flows back "upstream"

#### Example 2

```js
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(111)
    await next()
    console.log(222)
});

app.use(async (ctx, next) => {
    console.log(333)
    await next()
    console.log(444)
});

app.use(async (ctx, next) => {
    console.log(555)
    await next()
    console.log(666)
});

app.use(async ctx => {
  console.log(777)
  ctx.body = 'Hello World';
  console.log(888)
});

app.listen(3000);
```
 - OUTPUT

```
111
333
555
777
888
666
444
222
```
`Downstream` --> `Upstreasm`

### - [Koa Router](https://github.com/koajs/router/blob/master/API.md)

#### Basic Usage

```js
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');

const router = new Router();

router.get('/', ctx=>{
    ctx.body = { message: "hello world" };
})

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
/*  
    GET /
    {"message":"hello world"}
*/
```
