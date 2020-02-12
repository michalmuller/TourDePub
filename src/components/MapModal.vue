<template>
  <div class="fixed bg-black z-50 top-0" style="width: 100vw; height: 100vh">
    <div class="ml-3 mt-4  pl-1 relative z-50" @click="closeModal">
      <img src="../../public/img/icons/close.svg" class="h-10" />
    </div>
    <div class="absolute top-0" style="height: 100%; width:100%">
      <div class="h-full w-full flex items-center justify-center">
        <GmapMap
          ref="mapRef"
          :center="center"
          :options="{options}"
          :zoom="14"
          style="width: 100%; height: 100%"
        >
          <GmapMarker
            v-for="(m, index) in markers"
            :key="index"
            :position.sync="m.position"
            :clickable="true"
            :label="{ text: m.text, color: '#34477B', fontSize: '16px', fontWeight: 'bold'}"
            :icon="{ url: require('../../public/img/icons/marker.svg'), labelOrigin: {x: 18, y: -3}}"
            @click="panTo(m.position)"
          />
        </GmapMap>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import gmapstyle from "../gmap.json";
export default {
  name: "Map",
  data() {
    return {
      label: {
        text: "s",
        color: "#34477B",
        fontSize: "16px",
        fontWeight: "bold"
      },
      center: {
        lat: 57.04724531523552,
        lng: 9.923821502137255
      },
      markers: [
        {
          text: "Victorka",
          position: {
            lat: 57.0509527,
            lng: 9.918176
          }
        }
      ],
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
    closeModal() {
      this.$parent.mapModal = false;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
