<template>
  <div v-if="currentAlbum" class="container">
    <router-link
      class="flex text-white text-md items-center mb-10"
      :to="{ name: 'Home' }"
    >
      <img
        class="mr-4 w-2 h-2.5"
        src="@/assets/images/icon-arrow-left.svg"
        alt=""
      />
      Go Back
    </router-link>
    <!-- Header -->
    <div class="flex bg-d_purple rounded-xl px-6 py-5">
      <div class="flex items-center">
        <span class="text-violet mr-2">Status</span>

        <div
          class="flex items-center status-button"
          :class="{
            listened: currentAlbum[0].albumDone,
            draft: currentAlbum[0].albumDraft,
            pending: currentAlbum[0].albumPending,
          }"
        >
          <span v-if="currentAlbum[0].albumDone">Listened</span>
          <span v-if="currentAlbum[0].albumDraft">Draft</span>
          <span v-if="currentAlbum[0].albumPending">Pending</span>
        </div>
      </div>
      <div class="flex flex-1 justify-end">
        <button @click="toggleEditInvoice" class="button bg-blue font-bold">
          Edit
        </button>
        <button
          @click="deleteInvoice(currentAlbum[0].docId)"
          class="button bg-red font-bold"
        >
          Delete
        </button>
        <button
          @click="updateStatusToPaid(currentAlbum[0].docId)"
          v-if="currentAlbum[0].albumPending"
          class="button bg-green font-bold"
        >
          Mark as Listened
        </button>
        <button
          v-if="currentAlbum[0].albumDraft || currentAlbum[0].albumDone"
          @click="updateStatusToPending(currentAlbum[0].docId)"
          class="orange"
        >
          Mark as Pending
        </button>
      </div>
    </div>

    <!-- Album Details -->
    <div class="flex flex-col">
      <div class="flex mt-5 bg-d_purple text-white rounded-lg">
        <div class="flex flex-col p-8">
          <img class="card-img-top" :src="currentAlbum[0].imgUrl" />
          <div class="flex items-center">
            <p class="text-lg font-bold mr-2">Artist:</p>
            <p>{{ currentAlbum[0].artistName }}</p>
          </div>
          <div class="flex items-center">
            <p class="text-lg font-bold mr-2">Artist:</p>
            <p>{{ currentAlbum[0].artistName }}</p>
          </div>
          <div class="flex items-center">
            <p class="text-lg font-bold mr-2">Artist:</p>
            <p>{{ currentAlbum[0].artistName }}</p>
          </div>
          <div class="flex items-center">
            <p class="text-lg font-bold mr-2">Artist:</p>
            <p>{{ currentAlbum[0].artistName }}</p>
          </div>
        </div>
      </div>
      <div class="bottom flex flex-column">
        <div class="billing-items">
          <div class="heading flex">
            <p>Item Name</p>
            <p>QTY</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <div
            v-for="(item, index) in currentAlbum[0].invoiceItemList"
            :key="index"
            class="item flex"
          >
            <p>{{ item.itemName }}</p>
            <p>{{ item.qty }}</p>
            <p>{{ item.price }}</p>
            <p>{{ item.total }}</p>
          </div>
        </div>
        <div class="total flex">
          <p>Amount Due</p>
          <p>{{ currentAlbum[0].invoiceTotal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "albumView",
  setup() {
    const store = useStore();
    const route = useRoute();
    const currentAlbum = ref();

    const getCurrentAlbum = async () => {
      await store.dispatch("getCurrentAlbum", route.params.albumId);
      currentAlbum.value = store.getters.currentAlbum;
    };

    watch(
      () => route.params.albumId,
      store.dispatch("getCurrentAlbum", route.params.albumId),
      getCurrentAlbum()
    );

    return {
      currentAlbum,
      getCurrentAlbum,
    };
  },
};
</script>

<style>
</style>