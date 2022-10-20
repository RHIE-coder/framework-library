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

