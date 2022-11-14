# Vuex

## [Essential Concept]

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
})
```

### - state

루트 인스턴스에 store 옵션을 제공함으로써 저장소는 루트의 모든 하위 컴포넌트에 주입되고 `this.$store`로 사용할 수 있습니다. 즉, state는 컴포넌트 간에 공유할 data 속성

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1,
    height: 20,
    width: 20,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
})
```

```vue
<template>
    <div>
        <slot name="nft"></slot>
        <h1>{{ localValue }}</h1>
        <h1>{{ stateValue }}</h1>
        <h1>{{ widthValue }}</h1>
        <button @click="inc">{{ width }}</button>
    </div>
</template>

<script>
import {
    mapState
} from "vuex";

export default {
    data(){
        return {
            a: 10,
        }
    },
    computed: {
        localValue() {
            return this.a
        },
        ...mapState({
            stateValue: state=>state.count,
            widthValue: state=>state.width + 10,
        }),
        ...mapState([
            "width",
        ]),
    },
    methods: {
        inc(){
            console.log(this.$store.state.width++);
        },
    }
}
</script>
```

### - getters

`문제점 : ` 각 컴포넌트 별로 vuex의 state를 활용할 때 코드 로직이 중복이 될 수도 있다.

#### Bad Examples Below

```js
// A.vue
methods: {
  increase() {
    return this.$store.state.count++;
  }
}

// B.vue
methods: {
  increase() {
    return this.$store.state.count++;
  }
}
```

그래서 state 변경을 vuex에서 수행하도록 만들자는 것이다.

```js
getters: {
  getIncreasedCount(state) {
    return state.count++;
  }
}

// A.vue
methods: {
  increase() {
    return this.$store.getters.getIncreasedCount
  }
}

// B.vue
methods: {
  increase() {
    return this.$store.getters.getIncreasedCount
  }
}
```

#### 공식 샘플

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
   state: {
       todos: [
           { id: 1, text: '...', done: true },
           { id: 2, text: '...', done: false },
       ]
   },
   getters: {
       doneTodos: state => {
           return state.todos.filter(todo => todo.done);
       },
       doneTodosCount: (state, getters) => {
           return getters.doneTodos.length
       },
       getTodoById: (state) => (id) => {
           return state.todos.find(todo => todo.id === id)
       }
   }
});

import { mapGetters } from 'vuex';

new Vue({ 
    el: '#app',
    store,
    data: {
    },
    computed: mapGetters([
        'doneTodos', 'doneTodosCount', 'getTodoById'
    ])
});
```

### - mutations

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        },
        incrementBy (state, payload) {
            state.count += payload.amount
        }
    }
});

import { mapState, mapMutations } from 'vuex';

new Vue({ 
    el: '#app',
    store,
    data: {
    },
    computed: mapState([
        'count'
    ]),
    methods: mapMutations([
        'increment',
        'incrementBy'
    ])
});

// store.commit({
//     type: 'incrementBy',
//     amount: 40
// })
// store.commit('incrementBy', { amount: 29 });
// console.log(store.state.count);

// Vue.set(obj, 'new prop', 123)
// state.obj = { ...state.obj, newProp: 123 }
```

#### 연습

```vue
  mutations: {
    plusByNum(state, num) {
      state.count += num;
      return 100;
    }
  },

<template>
      <div>
          {{ count }}
          <button @click='plusByNum(50)'>+</button>
          <button @click='plus(10)'>+</button>
      </div>
</template>

<script>
import {
  mapMutations,
  mapState,
} from "vuex";
export default {
  computed: {
    ...mapState([
      "count",
    ]),
  },
  methods: {
    plus(num) {
      this.$store.commit("plusByNum", num);
    },
    ...mapMutations([
      "plusByNum"
    ]),
  }
}
</script>
```

### - actions

 - mutations : 무조건 sync
 - actions: async or sync

#### Simple

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

#### 공식 샘플

```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        },
        decrement (state) {
            state.count--
        }
    },
    actions: {
        incrementAsync ({ commit }) {
            setTimeout(() => {
                commit('increment')
            }, 1000)
        },
        actionA ({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('someMutation')
                    resolve()
                }, 1000)
            })
        },
        actionB ({ dispatch, commit }) {
            return dispatch('actionA').then(() => {
                commit('someOtherMutation')
            })
        },
        async actionC ({ commit }) {
            commit('gotData', await getData())
        },
        async actionD ({ dispatch, commit} ) {
            await dispatch('actionC')
            commit('gotOtherData', await getOtherData())
        }
    }
})

import { mapState, mapMutations } from 'vuex';

new Vue({ 
    el: '#app',
    store,
    data: {
    },
    computed: mapState([ 'count' ]),
    methods: {
        increment () {
            this.$store.dispatch('incrementAsync');
        },
        decrement () {
            this.$store.commit('decrement');
        },
        testAction () {
            this.$store.dispatch('actionA').then(() => {
                
            })
        }
    }
});

```

### - modules

```js

```