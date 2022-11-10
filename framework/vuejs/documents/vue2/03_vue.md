# Vue

## [API](https://v2.vuejs.org/v2/api)

### - Global

#### `Vue.nextTick()` || `$nextTick()`

data가 업데이트 되고나서 UI Rendering --> Vue가 DOM을 못찾음(비동기 문제)

그래서 Promise 기반(?)인 `nextTick()`을 사용

```js
created() {
    this.$nextTick(function() { ... })
}

---
---
---

methods: {
    async doSomething() {
        await this.$nextTick();
        //UI Rendering완료 후 실행
    }
}
```

#### `Vue.set()`

#### `Vue.delete()`

#### `Vue.directive()`

##### Hook Functions

 - bind
 - inserted
 - update
 - componentUpdated
 - unbind

#### `Vue.filter()`

```vue
<template>
    <div>
        <p> { msg | capitalize }
    </div>
</template>
```
capitalize는 filter함수임

아래 둘 중 하나를 사용해서 적용

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

OR

```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

#### `Vue.component()`

#### `Vue.use(Plugin)`

##### Plugin

A Vue.js plugin should expose an `install` method. The method will be called with the Vue constructor as the first argument, along with possible options:

 -`/plugin/MyPlugin.js`
```js
class MyPlugin {
    install(Vue, options) {
        Vue.prototype.$someAttr = options.someOption.reduce((v1,v2)=>v1+v2);
    }
}

export default MyPlugin;
```

 - `/src/main.js`
```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import MyPlugin from "@/plugins/MyPlugin";
Vue.use(new MyPlugin(), {someOption: [1, 2, 3, 4, 5]})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#aaa')
```

final usage

```vue
<template>
    <h1>Plugins</h1>
</template>

<script>
export default {
    mounted(){
        console.log(this.$someAttr);
    },
}
</script>
```

#### `Vue.mixin()`

Mixins are a flexible way to distribute reusable functionalities for Vue components. A mixin object can contain any component options. When a component uses a mixin, all options in the mixin will be “mixed” into the component’s own options.



#### `Vue.compile()`

#### `Vue.version`

### - Options/Data

#### `data`

 - type: Object | Function ( recommend use function )

Restriction: Only accepts Function when used in a component definition.

Once observed, you can no longer add reactive properties to the root data object. It is therefore recommended to declare all root-level reactive properties upfront, before creating the instance.

After the instance is created, the original data object can be accessed as vm.$data. The Vue instance also proxies all the properties found on the data object, so vm.a will be equivalent to vm.$data.a.

#### `props`

 - type: String, Number, Boolean, Array, Object, Date, Function, Symbol, any CUSTOM
 - default: any
 - required: Boolean
 - validator: Function

#### `computed` and `watch`

 - `computed` - type: { [key: string]: Function | { get: Function, set: Function } }
 - `watch` - type: { [key: string]: string | Function | Object | Array}

 watch는 기존 `$data` 모니터링. computed는 중복 불가.

### - Options/DOM

#### `el`
#### `template`
#### `render`
#### `renderError`

### - Options/Lifecycle Hooks

#### `beforeCreate`
#### `created`
#### `beforeMount`
#### `mounted`
#### `beforeUpdate`
#### `updated`
#### `activated`
#### `deactivated`
#### `beforeDestroy`
#### `destroyed`
#### `errorCaptured`

### - Options/Assets

각 속성을 따라서 커스텀 가능

 - `Vue.directive`
 - `Vue.filter`
 - `Vue.component`


<br><br><br><br><br><hr>









## [Learning](https://v2.vuejs.org/v2/cookbook/index.html)

### - Adding Instance Properties

Global Scope를 오염시키지 않으면서 사용하기

```js
// config/globalVar.js
import Vue from "vue";

Vue.prototype.$appName = "My App" // 범용적으로 쓰이는 axios가 될 수도 있다.


// main.js
import "@/config/globalVar";

// SFC
export default {
    beforeCreate() {
        console.log(this.$appName);
    }
}
```


