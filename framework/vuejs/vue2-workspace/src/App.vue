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
import TodoList from "@/components/TodoFooter.vue"

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