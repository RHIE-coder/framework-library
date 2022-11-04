<template>
    <div id="app">
        <!-- 수정됨 -->
        <TodoHeader></TodoHeader>
        <TodoInput v-on:dataSync="addTodo"></TodoInput>
        <TodoList v-bind:propsData="todoItems" @removeItem="removeTodo"></TodoList>
        <TodoFooter @removeAll="clearAll"></TodoFooter>
        <video-player :options="videoOptions" />
    </div>
</template>

<script>
import TodoHeader from "@/components/TodoHeader.vue"
import TodoFooter from "@/components/TodoFooter.vue"
import TodoInput from "@/components/TodoInput.vue"
import TodoList from "@/components/TodoList.vue"
import VideoPlayer from "@/components/VideoPlayer.vue"

export default {
    name: "Application",
    components: {
        TodoHeader,
        TodoFooter,
        TodoInput,
        TodoList,
        VideoPlayer,
    },
    //https://www.kia.com/content/dam/kwp/kr/ko/vehicles/carnival/22my/carnival_feature_bg_pc.jpg
    /* 추가됨 */
    data() {
        return {
            todoItems: [],
            videoOptions: {
                autoplay: true,
                loop: true,
                sources: [
                    {
                        src: 'https://cdn.publishinc.kr/orange.mp4',
                        type: 'video/mp4'
                    }
                ]
            }
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
        clearAll() {
            localStorage.clear();
            this.todoItems = [];
        },
        removeTodo(todoItem, index) {
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