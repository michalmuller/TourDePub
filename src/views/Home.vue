<template>
  <div id="home">
    <div
      id="header"
      class="h-32 w-full bg-gradient-primary z-10 top-0 fixed shadow-md"
    >
      <img
        src="../../public/img/circle_overlay.png"
        class="absolute"
        style="width:45%"
      />
      <h1
        v-show="!pub"
        class="pt-12 relative px-6 text-2xl font-bold text-white"
      >
        JBC Tour De Pub
      </h1>
    </div>

    <!----------- Home Screen ------------>
    <div v-show="!pub" class="px-3" style="padding-top: 132px">
      <div v-show="loading">loading ...</div>
      <div v-if="!loading" class="my-3">
        <div
          v-for="(pub, index) in pubs"
          :key="index"
          @click="getPub(pub)"
          class="bg-white rounded shadow-md w-full mb-3 flex relative"
        >
          <img :src="pub.img" :alt="pub.name" class="rounded-l h-20 w-20" />
          <div class="pl-3 truncate w-full">
            <h1
              class="text-lg font-bold text-gray-800 pt-3 truncate"
              style="max-width:88%"
            >
              {{ pub.name }}
            </h1>
            <p class="text-sm pt-2 text-gray-600">{{ pub[user.uid] }} drinks</p>
          </div>
          <div class="absolute h-full flex items-center" style="right:12px">
            <img src="../../public/img/icons/arrow_card.png" />
          </div>
        </div>
      </div>
    </div>

    <!----------- One Pub Screen ------------>
    <div v-if="pub" class="w-full fixed z-20">
      <div class="progress-container">
        <progress :value="percentage" max="100">{{ percentage }}%</progress>
      </div>
      <div class="px-6 py-3 mt-1 w-full z-30 flex justify-between">
        <div @click="removePub" class="w-16 ">
          <img src="../../public/img/icons/arow_back.svg" class="w-8 h-8" alt />
        </div>
        <div class="w-12">
          <input
            type="file"
            name="file"
            id="file"
            style="display:none"
            @change="uploadImage($event.target.files[0])"
          />
          <label id="choose-file" for="file"
            ><img src="../../public/img/icons/camera.svg" class="ml-3 w-8 h-8"
          /></label>
        </div>
      </div>
      <div
        v-if="!loading"
        class="bg-white mx-3 mt-1 relative rounded-t-large"
        style="min-height: calc(100vh - 200px)"
      >
        <div
          class="py-4 flex text-lg font-bold text-gray-800 justify-center items-center"
        >
          <img class="h-8 w-8 rounded-full mr-3" :src="pub.img" />
          <span @click="getAllBeers">{{ pub.name }}</span>
        </div>
        <div
          class="overflow-scroll pb-4"
          style="height: calc(100vh - 200px) !important"
        >
          <div class="px-3 mt-5">
            <p class="text-gray-600 mb-2">Amount of alcohol</p>
            <div class="rounded flex w-full h-12 bg-light-blue justify-between">
              <div
                @click="beerUpdate(-1)"
                class="bg-blue rounded-l flex justify-center items-center w-12 h-12"
              >
                <img src="../../public/img/icons/minus.svg" />
              </div>
              <div class="flex justify-center items-center">
                <img src="../../public/img/icons/beer_color.svg" />
                <span v-if="user" class="text-lg font-bold text-gray-800 ml-4"
                  >{{ pub[user.uid] }} drinks</span
                >
              </div>
              <div
                @click="beerUpdate(1)"
                class="bg-blue rounded-r flex justify-center items-center w-12 h-12"
              >
                <img src="../../public/img/icons/plus.svg" />
              </div>
            </div>
          </div>
          <div class="px-3 mt-5">
            <p class="text-gray-600 mb-2">Total amount of drinks</p>
            <span class="text-lg font-bold text-gray-800"
              >{{ beerCount }} drinks</span
            >
          </div>
          <div class="px-3 mt-5">
            <p class="text-gray-600 mb-2">Gallery</p>
            <div
              class="flex flex-wrap"
              v-if="pub.images && pub.images.length > 0"
            >
              <div
                v-for="(img, index) in pub.images"
                :key="index"
                class="border-2  border-white w-1/2 "
              >
                <img class="object-cover h-40 w-full" :src="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from '../store';
import { mapState, mapMutations } from 'vuex';
import state from '../modules/state';
import firebase from 'firebase';
import db from '@/firebase/firebaseInit';

export default {
  name: 'home',
  data() {
    return {
      beerCount: 0,
      uploaded: true,
      percentage: 0,
    };
  },
  methods: {
    refresh() {},
    uploadImage(file) {
      console.log(file);
      this.uploaded = false;
      let storageRef = firebase
        .storage()
        .ref(
          `images/${this.pub.id.toString()}/${
            file.name
          }-${new Date().getTime()} `,
        );
      let task = storageRef.put(file);

      task.on(
        'state_changed',
        snapshot => {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.percentage = percentage;
        },
        err => {
          console.log(err);
        },
        complete => {
          this.uploaded = true;
          this.percentage = 0;
          storageRef.getDownloadURL().then(url => {
            console.log(url);
            db.collection('pubs')
              .doc(this.pub.id.toString())
              .update({
                images: firebase.firestore.FieldValue.arrayUnion(url),
              })
              .then(() => {
                this.refresh();
              })
              .catch(function(error) {
                console.error('Error adding document: ', error);
              });
          });
        },
      );
    },
    getPub(pub) {
      let parsedPub = JSON.parse(JSON.stringify(pub));
      this.$store.commit('state/UPDATE_PUB', parsedPub);
      setTimeout(() => {
        this.getAllBeers();
      }, 640);
    },
    removePub() {
      this.$store.commit('state/REMOVE_PUB');
    },
    beerUpdate(val) {
      this.$store.commit('state/UPDATE_BEER', val);
      const increment = firebase.firestore.FieldValue.increment(val);
      const dbRef = db.collection('pubs').doc(this.pub.id.toString());
      dbRef.update({ [this.user.uid]: increment });
      setTimeout(() => {
        this.getAllBeers();
      }, 640);
    },

    getAllBeers() {
      let beerCount = 0;
      const dbRef = db.collection('pubs').doc(this.pub.id.toString());
      dbRef
        .get()
        .then(function(doc) {
          let json = doc.data();
          Object.keys(json).forEach(name => {
            if (name.length > 20) {
              beerCount += json[name];
            }
          });
        })
        .then(() => {
          this.beerCount = beerCount;
        })
        .catch(function(error) {
          console.log('Error getting document:', error);
        });
    },
  },
  computed: {
    ...mapState({
      user: state => state.state.user,
      pubs: state => state.state.pubs,
      pub: state => state.state.pub,
      loading: state => state.state.loading,
    }),
  },
};
</script>

<style lang="scss" scoped>
.progress-container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

progress {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  width: 100%;
}

.opac {
  opacity: 0.1;
}

progress[value]::-webkit-progress-bar {
  background-color: transparent;

  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15) inset;
}

progress[value]::-webkit-progress-value {
  background-color: #71e769;
}
</style>
