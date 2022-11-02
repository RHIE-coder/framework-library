# Vue 2 Project Set Up

## [Create Project]

```bash
npm i vue vue-router
npm i -D @vue/cli-service vue-template-compiler
```

 - `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VUE PROJECT COMPOSE</title>
</head>
<body>
   <div id="app"></div> 
</body>
</html>
```

 - `src/App.vue`

```vue
<template>
    <div id="app">
        <h1>HELLO WORLD</h1>
        <h1>{{ message }}</h1>
    </div>
</template>

<script>
export default {
    name: "Application",
    data: function(){
        return {
            message: "Hello World",
        }
    }
}
</script>
```

 - `src/main.js`

```js
import Vue from 'vue'
import Application from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Application),
}).$mount('#app')
```

 - `babel.config.js`

```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
```

 - `jsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  }
}
```

 - `package.json` 내용 추가

```json
...
...
...
  "scripts": {
    "serve": "vue-cli-service serve --port 5501",
    "build": "vue-cli-service build"
  },
...
...
...
```