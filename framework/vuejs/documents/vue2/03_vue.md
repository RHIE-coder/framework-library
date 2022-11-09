# Vue

## [API](https://v2.vuejs.org/v2/api)

### - Global

#### `Vue.nextTick()` || `$nextTick()`

data가 업데이트 되고나서 UI Rendering --> Vue가 DOM을 못찾음(비동기 문제)

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

#### `Vue.filter()`

#### `Vue.component()`

#### `Vue.use()`

#### `Vue.mixin()`

#### `Vue.compile()`

#### `Vue.version`



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


