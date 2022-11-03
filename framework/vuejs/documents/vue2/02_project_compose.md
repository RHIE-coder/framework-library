# Vue 2 Project Set Up

## [Create Project]

```bash
npm i vue vue-router
npm i -D @vue/cli-service vue-template-compiler
```
###### ISSUE: `vue-template-compiler`는 내부적으로 필요할 것 같은데 필수적으로 불러와야 하는지는 모름

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

 - `vue.config.js`

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
```

### - running test

```
npm run serve
```

<br><br><br><br><br>

## [Project Step 01]

```sh
cmd$ tree -I "node_modules"
.
├── babel.config.js
├── jsconfig.json
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── src
│   ├── App.vue
│   ├── components
│   │   ├── TodoFooter.vue
│   │   ├── TodoHeader.vue
│   │   ├── TodoInput.vue
│   │   └── TodoList.vue
│   └── main.js
└── vue.config.js
```

### - `public/`

#### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    <title>VUE PROJECT COMPOSE</title>
</head>
<body>
   <div id="app"></div> 
</body>
</html>
```

### - `src/`

#### `App.vue`

```vue
<template>
    <div id="app">
        <TodoHeader></TodoHeader>
        <TodoInput></TodoInput>
        <TodoList></TodoList>
        <TodoFooter></TodoFooter>
    </div>
</template>

<script>
import TodoHeader from "@/components/TodoHeader.vue"
import TodoFooter from "@/components/TodoFooter.vue"
import TodoInput from "@/components/TodoInput.vue"
import TodoList from "@/components/TodoList.vue"

export default {
    name: "Application",
    components: {
        TodoHeader,
        TodoFooter,
        TodoInput,
        TodoList,
    }
}
</script>

<style>
    body {
        text-align: center;
        background-color: #f6f6f8;
    }

    input {
        border-style: groove;
        width: 200px;
    }

    button {
        border-style: groove;
    }

    .shadow {
        box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
    }
</style>
```
#### `main.js`

```js
import Vue from 'vue'
import Application from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Application),
}).$mount('#app')
```
### - `src/components`

#### `TodoFooter.vue`

```vue
<template>
    <div class="clearAllContainer">
        <span class="clearAllBtn" @click="clearTodo">Clear All</span>
    </div>
</template>

<script>
export default {
    methods: {
        clearTodo(){
            localStorage.clear();
        }
    }
}
</script>

<style scoped>
    .clearAllContainer {
        width: 8.5rem;
        height: 50px;
        line-height: 50px;
        background-color: white;
        border-radius: 5px;
        margin: 0 auto;
    }

    .clearAllBtn {
        color: #e20303;
    }

</style>
```
#### `TodoHeader.vue`

```vue
<template>
    <header>
        <h1>TODO it!</h1>
    </header>
</template>

<script>
  
</script>

<style>
    h1 {
        color: #2f3b52;
        font-weight: 900;
        margin: 2.5rem 0 1.5rem;
    }
</style>
```
#### `TodoInput.vue`

```vue
<template>
    <div class="inputBox">
        <input type="text" placehoder="type here" v-model="newTodoItem"  v-on:keyup.enter="addTodo">
        <i class="material-symbols-outlined addBtn" v-on:click="addTodo">Add</i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newTodoItem: ''
        }
    },
    methods: {
        addTodo() {
            if(this.newTodoItem !== ""){
                const value = this.newTodoItem && this.newTodoItem.trim();
                localStorage.setItem(value, value);
                this.clearInput();
            }
        },
        clearInput() {
            this.newTodoItem='';
        }
    }
}
</script>

<style>
    .addBtn {
        vertical-align: middle;
        cursor:pointer;
    }

    .addBtn:hover {
        background: black;
        color:white;
    }
</style>
```
#### `TodoList.vue`

```vue
<template>
    <section>
        <ul>
            <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem" class="shadow">
                <i class="material-symbols-outlined checkBtn" @click="renderTest(index)">Done</i>
                {{ todoItem }}
                <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
                    <i class="material-symbols-outlined">Delete</i>
                </span>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    data() {
        return {
            todoItems: [],
            sampleData: "",
        }
    },

    created() {
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                this.todoItems.push(localStorage.key(i));
            }
        }
    },

    updated() {
        /*  
           Vue 데이터 속성인 todoItems의 배열 요소를 제거하자마자 Vue에서 자동으로 화면을 갱신
           todoItems는 DOM에 연결되어 있음
           데이터 속성이 변하면 화면에 즉시 반영하는 뷰의 반응성 때문임
           화면 데이터와 상관없는 renderTest 함수를 실행하면 updated가 호출되지 않는 것을 볼 수 있음 
        */
        console.log("updated!!!");
    },

    methods: {
        removeTodo(todoItem, index) {
            localStorage.removeItem(todoItem);
            this.todoItems.splice(index, 1);
        },
        renderTest(index) {
            const randNum = Math.random(); 
            console.log(randNum + " : " + index);
            this.sampleData = randNum; 
        }
    },
}
</script>


<style scoped>
ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
}

li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
}

.checkBtn {
    line-height: 50px;
    color: #62acde;
    margin-right: 5px;
}

.removeBtn {
    display: flex;
    align-items: center;
    margin-left: auto;
    color: #de4343;
}
</style>
```

### - 문제점

Step 01의 문제는 `TodoInput`, `TodoFooter` 컴포넌트들의 Vue 데이터가 바뀌었을 때 `TodoList` 컴포넌트에서 re-render가 되지않는 점이다. 이유는 컴포넌트들이 분리되어 처리결과를 감지하지 못했기 때문

그렇다고 한 컴포넌트로 다 합치는 건 바람직하지 않다.

<br><br><br><br><br>

## [Project Step 02] : 구조 개선
각 컴포넌트에서만 사용할 수 있는 뷰 데이터 속성(`newTodoItem`, `todoItems`)과 로컬 스토리지의 `todoItems`모두 같은 `To do`라는 성격을 가진 데이터

최상위(root) 컴포넌트인 App 컴포넌트에 todoItems라는 데이터를 정의하고 하위 컴포넌트 TodoList에 props전달하기 

### - `src/`

 - `App.vue`

```vue
<template>
    <div id="app">
        <!-- 수정됨 -->
        <TodoHeader></TodoHeader>
        <TodoInput v-on:dataSync="addTodo"></TodoInput>
        <TodoList v-bind:propsData="todoItems" @removeItem="removeTodo"></TodoList>
        <TodoFooter @removeAll="clearAll"></TodoFooter>
    </div>
</template>

<script>
import TodoHeader from "@/components/TodoHeader.vue"
import TodoFooter from "@/components/TodoFooter.vue"
import TodoInput from "@/components/TodoInput.vue"
import TodoList from "@/components/TodoList.vue"

export default {
    name: "Application",
    components: {
        TodoHeader,
        TodoFooter,
        TodoInput,
        TodoList,
    },

    /* 추가됨 */
    data() {
        return {
            todoItems: []
        }
    },

    created() {
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                this.todoItems.push(localStorage.key(i));
            }
        }
    },

    methods: {
        addTodo(todoItem) {
            localStorage.setItem(todoItem, todoItem);
            this.todoItems.push(todoItem);
        },
        clearAll(){
            localStorage.clear();
            this.todoItems = [];
        },
        removeTodo(todoItem, index){

        }
    }
    /*********/
}
</script>

<style>
    body {
        text-align: center;
        background-color: #f6f6f8;
    }

    input {
        border-style: groove;
        width: 200px;
    }

    button {
        border-style: groove;
    }

    .shadow {
        box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
    }
</style>
```

### - `src/components/`

 - `TodoInput.vue`

```vue
<template>
    <div class="inputBox">
        <input type="text" placehoder="type here" v-model="newTodoItem"  v-on:keyup.enter="addTodo">
        <i class="material-symbols-outlined addBtn" v-on:click="addTodo">Add</i>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newTodoItem: ''
        }
    },
    methods: {
        addTodo() {
            if(this.newTodoItem !== ""){
                const value = this.newTodoItem && this.newTodoItem.trim();
                /* 수정됨 */
                // localStorage.setItem(value, value);
                this.$emit("dataSync", value);
                /*********/
                this.clearInput();
            }
        },
        clearInput() {
            this.newTodoItem='';
        }
    },

}
</script>

<style>
    .addBtn {
        vertical-align: middle;
        cursor:pointer;
    }

    .addBtn:hover {
        background: black;
        color:white;
    }
</style>
```

 - `TodoList.vue`

```vue
<template>
    <section>
        <ul>
            <!-- todoItems => propsdata -->
            <li v-for="(todoItem, index) in propsData" v-bind:key="todoItem" class="shadow">
                <i class="material-symbols-outlined checkBtn" @click="renderTest(index)">Done</i>
                {{ todoItem }}
                <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
                    <i class="material-symbols-outlined">Delete</i>
                </span>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    data() {
        return {
            // todoItems: [], <-- remove
            sampleData: "",
        }
    },

    // created() {
    //     if (localStorage.length > 0) {
    //         for (let i = 0; i < localStorage.length; i++) {
    //             this.todoItems.push(localStorage.key(i));
    //         }
    //     }
    // }, --> App.vue

    updated() {
        /*  
           Vue 데이터 속성인 todoItems의 배열 요소를 제거하자마자 Vue에서 자동으로 화면을 갱신
           todoItems는 DOM에 연결되어 있음
           데이터 속성이 변하면 화면에 즉시 반영하는 뷰의 반응성 때문임
           화면 데이터와 상관없는 renderTest 함수를 실행하면 updated가 호출되지 않는 것을 볼 수 있음 
        */
        console.log("updated!!!");
    },

    methods: {
        removeTodo(todoItem, index) {
            // localStorage.removeItem(todoItem); <-- remove
            // this.todoItems.splice(index, 1); <-- remove
            this.$emit("removeItem", todoItem, index);
        },
        renderTest(index) {
            const randNum = Math.random(); 
            console.log(randNum + " : " + index);
            this.sampleData = randNum; 
        }
    },

    /* 추가됨 */
    props: ['propsData']
    /*********/
}
</script>


<style scoped>
ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
}

li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
}

.checkBtn {
    line-height: 50px;
    color: #62acde;
    margin-right: 5px;
}

.removeBtn {
    display: flex;
    align-items: center;
    margin-left: auto;
    color: #de4343;
}
</style>
```

 - `TodoFooter.vue`

```vue
<template>
    <div class="clearAllContainer">
        <span class="clearAllBtn" @click="clearTodo">Clear All</span>
    </div>
</template>

<script>
export default {
    methods: {
        clearTodo(){
            // localStorage.clear(); <-- remove
            this.$emit("removeAll");
        }
    }
}
</script>

<style scoped>
    .clearAllContainer {
        width: 8.5rem;
        height: 50px;
        line-height: 50px;
        background-color: white;
        border-radius: 5px;
        margin: 0 auto;
    }

    .clearAllBtn {
        color: #e20303;
    }

</style>
```