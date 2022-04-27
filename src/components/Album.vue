<template>
  <router-link
    :to="{ name: 'album', params: { albumId: album.albumId } }"
    @click="getCurrentAlbum"
  >
    <div
      class="
        no-underline
        cursor-pointer
        mb-4
        text-white
        rounded-md
        px-8
        py-7
        bg-d_purple
        items-center
        grid
        gap-4
        grid-cols-7
      "
    >
      <span class="col-start-1 col-end-4 w-72">{{ album.albumName }}</span>
      <span class="col-start-5 w-32">{{ album.artistName }}</span>
      <span class="col-start-7">{{ album.genre }}</span>
      <span class="col-start-8 mr-4">{{ album.ratingTotal }} &#11088;</span>
      <div
        class="status-button flex col-start-9"
        :class="{
          listened: album.albumDone,
          draft: album.albumDraft,
          pending: album.albumPending,
        }"
      >
        <span v-if="album.albumDone">Listened</span>
        <span v-if="album.albumDraft">Draft</span>
        <span v-if="album.albumPending">Pending</span>
      </div>
      <img
        class="col-start-10"
        src="@/assets/images/icon-arrow-right.svg"
        alt=""
      />
    </div>
  </router-link>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "album",
  props: ["album"],
  setup(props) {
    const store = useStore();

    const getCurrentAlbum = () => {
      console.log("clicked");
      return store.commit("SET_CURRENT_ALBUM", props.album.albumId);
    };
    return {
      getCurrentAlbum,
    };
  },
};
</script>

