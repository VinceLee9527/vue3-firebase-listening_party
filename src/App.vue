<template>
  <div class="">
    <div
      v-if="!mobile"
      class="app bg-black flex flex-col min-h-screen md:flex-row"
    >
      <Navbar />
      <div class="app-content flex flex-col flex-1 relative">
        <Modal v-if="modalActive" />
        <transition name="album">
          <AlbumModal v-if="albumModal" />
        </transition>
        <router-view />
      </div>
    </div>
    <div
      v-else
      class="
        mobile-message
        flex flex-col
        text-white
        justify-center
        items-center
        text-center
        h-screen
      "
    >
      <h2 class="text-2xl text-black">
        Sorry, this app is not supported on Mobile :(
      </h2>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Nav.vue";
import AlbumModal from "./components/AlbumModal.vue";
import Modal from "../src/components/Modal.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

// import albumsColRef from "../src/firebase/firebaseInit";
// import { getDocs } from "firebase/firestore";

export default {
  setup() {
    const store = useStore();
    const mobile = ref(false);

    const checkScreen = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 750) {
        mobile.value = true;
        return;
      }
      mobile.value = false;
    };

    onMounted(() => {
      window.addEventListener("resize", checkScreen);
    });

    store.dispatch("GET_ALBUMS");

    return {
      albumModal: computed(() => store.state.albumModal),
      modalActive: computed(() => store.state.modalActive),
      mobile,
    };
  },
  components: {
    Navbar,
    AlbumModal,
    Modal,
  },
};
</script>

<style >
.album-enter-active,
.album-leave-active {
  transition: 0.5s ease all;
}

.album-enter-from,
.album-leave-to {
  transform: translateX(-700px);
}
</style>