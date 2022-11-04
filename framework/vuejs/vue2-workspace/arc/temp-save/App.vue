<template>
    <div id="app">
        <Header></Header>
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/video">Video</router-link>
        </nav>
        <router-view />
        <video-player :options="videoOptions" />
    </div>
</template>

<script>
import Header from "@/components/Header.vue"
import VideoPlayer from "@/components/VideoPlayer.vue"

export default {
    name: "Application",
    components: {
        VideoPlayer,
        Header,
    },
    data() {
        return {
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