<template>
  <div class="bg-bc flex flex-col min-h-screen md:flex-row">
    <div v-if="!mobile" class="app flex flex-col">
      <Navbar />
      <div class="app-content flex flex-col">
        <router-view />
      </div>
    </div>
    <div v-else class="mobile-message flex flex-col">
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