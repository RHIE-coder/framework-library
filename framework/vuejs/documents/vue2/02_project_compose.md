# Vue 2 Project Set Up

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
            localStorage.removeItem(todoItem);
            this.todoItems.splice(index, 1);
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
        color: #e2용303;
    }

</style>
```

### - `$emit() API`

하위 컴포넌트에서 이벤트를 발생시켜 상위 컴포넌트로 신호를 보낼 때 사용

 - 상위 컴포넌트 이벤트 : `doSomething`
 - 하위 컴포넌트에서 신호 : `this.$emit("doSomething")`

전달 받은 인자 변경하지 말기

### - `v-bind:key`

`:key` 속성은 `v-for` 디렉티브를 사용할 때 꼭 지정해 주는 것이 좋다.

Vue는 특정 아이템이 삭제되거나 추가되었을 때, Dom에서 나머지 아이템의 순서를 다시 조정하지 않고 프레임워크 내부적으로 전체 아이템의 순서를 제어함.(Dom 조작 소요 시간 최소화)

아이템이 1000개일 때 두번째를 지우면 나머지 998개를 모두 한번씩 이동됨.(Rendering 부담 증가)

`:key` 속성을 사용하면 이런 작업들을 더 효율적으로 할 수 있음.


<br><br><br><br><br>

## Advance Options For Project

### - Vuex

Application 상태를 보유하고 있는 저장소 : `store`

 1. Vuex store은 reactivity함
 2. 저장소의 상태 직접 변경 불가. 명시적인 commit만이 유일한 변이 방법이며 모든 상태에 대한 추적 가능한 기록이 남을 수 있음

#### *state*



#### *getters*


#### *mutations*


#### *actions*


#### *modules*




### - Vue Reactivity

Vue가 데이터 변화를 감지했을 때 자동으로 화면을 다시 갱신하는 특성.

#### 데이터가 변경되었을 때 어떻게 뷰에서 자동으로 화면을 갱신하나

 1. 인스턴스 생성

>인스턴스가 생성될 때 data 속성에 정의된 객체들은 특정 변환 작업을 거침.
>라이브러리에서 data에 정의된 모든 속성(객체)을 getter, setter라는 속성은 사용자가 접근할 수 있는 속성이 아님
> 다만, Vue Instance에서 정의해 놓은 data 속성에 변화가 생길 때 Vue에서 감지하기 위해 라이브러리 내부적으로 필요한 속성
> getter와 setter를 변환할 때는 JS 내장 API인 Object.defineProperty()가 사용됨

 2. watcher

> watcher 속성은 모든 컴포넌트에 존재하는 속성, 화면을 다시 그리는 역할
> 인스턴스가 화면에 올라가고 나서 특정 data 속성을 바꾸거나 접근하면 watcher에서 해당 사실 감지
> watcher에서 다시 화면을 그리라는 신호 보냄

 3. 인스턴스 data 속성에 반응성이 생기는 시점

> "인스턴스를 생성하는 시점"
> 따라서, 인스턴스를 정의할 때 data 속성에 정의하지 않고 인스턴스를 생성하고 난 후 data 속성에 객체를 추가하면 그 객체에는 반응성이 생기지 않음.
> 반응성이 없다는 의미는 해당 객체의 변화가 있든 없든 뷰에서 화면은 다시 갱신하지 않겠다는 의미
