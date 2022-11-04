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