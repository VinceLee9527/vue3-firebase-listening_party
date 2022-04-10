<template>
  <div class="flex z-50 fixed justify-center items-center h-screen w-full">
    <div class="rounded-3xl py-12 px-8 max-w-md bg-blue text-white">
      <p class="text-center">
        Are you sure you want to exit? Your changes will not be saved?
      </p>
      <div class="flex mt-6">
        <button @click="closeModal" class="button bg-l_purple flex-1 font-bold">
          Return
        </button>
        <button @click="closeAlbum" class="button bg-red flex-1 font-bold">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "modal",
  setup() {
    const store = useStore();

    const closeAlbum = () => {
      store.commit("TOGGLE_ALBUM");
      store.commit("TOGGLE_MODAL");
    };

    return {
      closeAlbum,
      closeModal: () => store.commit("TOGGLE_MODAL"),
      albumEdit: computed(() => store.state.albumEdit),
    };
  },

  // methods: {
  //   closeInvoice() {
  //     this.TOGGLE_MODAL();
  //     this.TOGGLE_INVOICE();
  //     if (this.editInvoice) {
  //       this.TOGGLE_EDIT_INVOICE();
  //     }
  //   },
  // },
};
</script>
