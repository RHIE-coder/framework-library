# Vue

## [API](https://v2.vuejs.org/v2/api)

### - Global



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


