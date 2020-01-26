<template>
  <div class="camera-modal">
    <video
      ref="video"
      class="camera-stream"
      autoplay
      loop
      playsinline
      crossorigin
    />
    <div
      @click="capture"
      class="camera-modal-container h-16 w-16 bg-black rounded-full"
    ></div>
    <button
      class="bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      @click="canvasPicture"
    >
      make a canvas snapshot
    </button>
    <canvas class="border" ref="canvas"></canvas>
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
    canvasPicture() {
      const video = this.$refs.video;
      const canvas = (window.canvas = this.$refs.canvas);
      canvas.width = video.videoWidth / 3;
      canvas.height = video.videoHeight / 3;
      canvas
        .getContext('2d')
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      console.log(canvas);
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
