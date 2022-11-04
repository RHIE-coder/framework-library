<template>
  <div>
    <video 
      ref="videoPlayer" 
      class="video-js vjs-big-play-button"
      width="640"
      height="360"
      controls="true"
      poster="https://www.kia.com/content/dam/kwp/kr/ko/vehicles/carnival/22my/carnival_feature_bg_pc.jpg"
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
</style>