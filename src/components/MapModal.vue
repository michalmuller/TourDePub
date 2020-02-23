<template>
  <div class="fixed bg-black z-50 top-0" style="width: 100vw; height: 100vh">
    <div class="ml-3 mt-5 pl-1 relative z-50" @click="closeModal">
      <img src="../../public/img/icons/close.svg" class="h-8" />
    </div>
    <div class="absolute top-0" style="height: 100%; width:100%">
      <div class="h-full w-full flex items-center justify-center">
        <GmapMap
          ref="mapRef"
          :center="center"
          :options="{options}"
          :zoom="15"
          style="width: 100%; height: 100%"
        >
          <GmapMarker
            v-for="(pub, index) in pubs"
            :key="index"
            :position.sync="pub.position"
            :clickable="true"
            :label="{ text: pub.text, color: '#34477B', fontSize: '16px', fontWeight: 'bold'}"
            :icon="{ url: require('../../public/img/icons/marker.svg'), labelOrigin: {x: 18, y: -3}}"
            @click="openPub(pub)"
          />
        </GmapMap>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/firebaseInit";
import { mapState, mapMutations } from "vuex";
import gmapstyle from "../gmap.json";
export default {
  name: "Map",
  props: ["pubs"],
  data() {
    return {
      center: {
        lat: 57.04714531523552,
        lng: 9.922921502137255
      },
      options: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        styles: gmapstyle,
        gestureHandling: "greedy"
      }
    };
  },
  methods: {
    panTo(pos) {
      this.$refs.mapRef.$mapPromise.then(map => {
        map.panTo(pos);
      });
    },
    openPub(pub) {
      this.$parent.mapModal = false;
      this.$parent.getPub(pub);
    },
    closeModal() {
      this.$store.commit("state/CLOSE_MAP");
      this.$parent.mapModal = false;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
