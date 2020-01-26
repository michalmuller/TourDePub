<template>
  <div class="camera-modal">
    <video ref="video" class="camera-stream" autoplay loop playsinline />
    <div
      @click="capture"
      class="camera-modal-container h-16 w-16 bg-black rounded-full"
    ></div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'CameraView',
  data() {
    return {
      mediaStream: null,
    };
  },
  methods: {
    capture() {
      const storageRef = firebase.storage().ref();
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
      const imageCapture = new window.ImageCapture(mediaStreamTrack);
      return imageCapture.takePhoto().then(blob => {
        storageRef
          .child(`images/picture-${new Date().getTime()}`)
          .put(blob)
          .then(res => {
            console.log(res);
          });
        this.$router.go(-1);
      });
    },
  },
  mounted() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(mediaStream => {
        this.mediaStream = mediaStream;
        this.$refs.video.srcObject = mediaStream;
        this.$refs.video.play();
      })
      .catch(error => console.error('getUserMedia() error:', error));
  },
  destroyed() {
    const tracks = this.mediaStream.getTracks();
    tracks.map(track => track.stop());
  },
};
</script>

<style scoped>
.camera-modal {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: white;
  z-index: 10;
}
.camera-stream {
  width: 100%;
  max-height: 100%;
}

.camera-modal-container {
  position: absolute;
  bottom: 100px;
  width: 100%;
  align-items: center;
  margin-bottom: 24px;
}
.take-picture-button {
  display: flex;
}
</style>
