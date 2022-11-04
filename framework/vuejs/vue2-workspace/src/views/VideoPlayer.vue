<template>
  <div class="video-container">
    <video 
      ref="videoPlayer" 
      class="video-js"
      width="640"
      height="360"
      controls
      preload="auto"
    ></video>
  </div>
</template>

<script>
import videojs from 'video.js';

export default {
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.log('onPlayerReady', this);
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}
</script>

<style scoped>
.video-container {
  display:flex;
  justify-content: center;
}

</style>