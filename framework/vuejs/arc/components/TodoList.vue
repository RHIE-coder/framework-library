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