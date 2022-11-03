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