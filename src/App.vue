<template>
  <div class="">
    <div
      v-if="!mobile"
      class="app bg-black flex flex-col min-h-screen md:flex-row"
    >
      <Navbar />
      <div class="app-content flex flex-col flex-1 relative">
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
      <h2>Sorry, this app is not supported on Mobile :(</h2>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Nav.vue";

export default {
  data() {
    return {
      mobile: null,
    };
  },
  components: {
    Navbar,
  },
  created() {
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
  methods: {
    checkScreen() {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
    },
  },
};
</script>