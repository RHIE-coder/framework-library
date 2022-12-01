
```bash
npm i pm2
```

```js
module.exports = {
  apps: [{
  name: 'app',
  script: './app.js',
  instances: 0,
  exec_mode: ‘cluster’
  }]
}
```

```bash
npx pm2 start server.config.js
```