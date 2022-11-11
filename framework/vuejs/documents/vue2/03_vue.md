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

Apply a mixin globally, which affects every Vue instance created afterwards. This can be used by plugin authors to inject custom behavior into components. Not recommended in application code.

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const myMixin = {
  data() {
    return {
      a: 10,
      b: 20,
    }
  },
  created() {
    this.hello()
  },
  methods: {
    hello(){
      console.log("hello from mixin!");
    },
  },
}

Vue.mixin(myMixin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#aaa')
```

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

### - Options/Composition

#### parent
#### mixins
#### extends
#### provide-inject

Note: the provide and inject bindings are NOT reactive. This is intentional. However, if you pass down an observed object, properties on that object do remain reactive.

 - parent
```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


new Vue({
  
  provide: {
    age : 100,
  },

  router,
  store,
  render: h => h(App)
}).$mount('#aaa')
```
 - child
```js
export default {
    inject:['age'],
    mounted(){
        console.log(this.age); //100
    },
}
```

### - Options/Misc

#### `name`

컴포넌트에 이름을 부여. unnamed components will show up as `<AnonymousComponent>`

#### `delimiters`

```js
new Vue({
    delimiters: ['[[', ']]']
})

<div id="app">
    <h1>[[ message ]]</h1>
</div>
```

#### `functional`



#### `model`


#### `inheritAttrs`


#### `comments`

### - Instance Properties

#### `vm.$data`

#### `vm.$props`

#### `vm.$el` - readonly

#### `vm.$options` - readonly

#### `vm.$parent` - readonly

#### `vm.$root` - readonly

#### `vm.$children` - readonly

#### `vm.$slots` - readonly

#### `vm.$scopedSlots` - readonly

#### `vm.$refs` - readonly

#### `vm.$isServer` - readonly

#### `vm.$attrs` - readonly

`$attrs` 속성은 현재 컴포넌트에 주어진 HTML 속성 중 props 데이터로 인식되지 않는 속성들을 의미한다.

#### `vm.$lisnters`

### - Instance Methods / Data

#### `vm.$watch`
#### `vm.$set`
#### `vm.$delete`

### -  Instance Methods / Events

#### `vm.$on`
#### `vm.$once`
#### `vm.$off`
#### `vm.$emit`

### - Instance Methods / Lifecycle

#### `vm.$mount`
#### `vm.$forceUpdate`
#### `vm.$nextTick`
#### `vm.$destroy`

### - Directives : `v-ooo`

#### `text`

```html
<span v-text="msg"></span>
<!-- same as -->
<span>{{msg}}</span>
```

#### `html`


#### `show`


#### `if`


#### `else`


#### `else-if`


#### `for`

When used together with v-if, v-for has a higher priority than v-if. See the list rendering guide for details.

#### `on` @


#### `bind` :


#### `model`

```html
<input>
<select>
<textarea>
components
```

##### Modifiers

v-model.lazy - listen to change events instead of input
v-model.number - cast valid input string to numbers
v-model.trim - trim input


#### `slot` #

The v-slot directive was introduced in Vue 2.6.0, offering an improved, alternative API to the still-supported slot and slot-scope attributes. The full rationale for introducing v-slot is described in this RFC. The slot and slot-scope attributes will continue to be supported in all future 2.x releases, but are officially deprecated and will eventually be removed in Vue 3.

 - 자식

```vue
<template>
    <div>
        <slot name="nft"></slot>
        <h1>Child</h1>
    </div>
</template>
```

 - 부모

```vue
<template>
    <div>
        <h1>NFT</h1>
        <Child>
            <template #nft>
                <h1>PIC</h1>
            </template>
        </Child>
    </div>
</template>

<script>
import Child from "@/components/Child.vue";

export default {
    components: {
        Child,
    },
}
</script>
```


#### `pre`

```html
<span v-pre>{{ this will not be compiled }}</span>
```

#### `cloak`


#### `once`

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


