<template>
  <div class="home container text-white md:pt-18">
    <!-- Header -->
    <div class="header flex mb-16">
      <div class="left flex flex-col flex-1">
        <h2 class="text-2xl font-bold">Albums</h2>
        <span class="text-md"
          >There are {{ albumData.length }} total albums</span
        >
      </div>
      <div class="right flex flex-1 justify-end items-center">
        <div
          @click="toggleFilterMenu"
          class="filter flex items-center relative mr-10 cursor-pointer"
        >
          <span class="text-sm"
            >Filter by status
            <!-- <span v-if="filteredInvoice">: {{ filteredInvoice }}</span> -->
          </span>
          <img
            class="ml-3 w-2 h-2"
            src="@/assets/images/icon-arrow-down.svg"
            alt=""
          />
          <ul
            v-show="filterMenu"
            class="filter-menu w-32 absolute top-5 list-none shadow-md"
          >
            <li
              class="
                cursor-pointer
                text-sm
                py-2.5
                px-5
                hover:bg-white hover:text-d_purple
              "
              @click="filteredAlbums"
            >
              Draft
            </li>
            <li
              class="
                cursor-pointer
                text-sm
                py-2.5
                px-5
                hover:bg-white hover:text-d_purple
              "
              @click="filteredAlbums"
            >
              Pending
            </li>
            <li
              class="
                cursor-pointer
                text-sm
                py-2.5
                px-5
                hover:bg-white hover:text-d_purple
              "
              @click="filteredAlbums"
            >
              Listened
            </li>
            <li
              class="
                cursor-pointer
                text-sm
                py-2.5
                px-5
                hover:bg-white hover:text-d_purple
              "
              @click="filteredAlbums"
            >
              Clear Filter
            </li>
          </ul>
        </div>
        <div
          @click="newAlbum"
          class="button flex items-center bg-l_purple cursor-pointer"
        >
          <div
            class="
              inner-button
              flex
              mr-2
              rounded-full
              p-2
              items-center
              justify-center
              bg-white
            "
          >
            <img
              class="w-2.5 h-2.5"
              src="@/assets/images/icon-plus.svg"
              alt=""
            />
          </div>
          <span class="text-sm">New Albums</span>
        </div>
      </div>
    </div>
    <!-- Albums -->
    <div v-if="albumData.length > 0">
      <Album
        v-for="(album, index) in filteredData"
        :album="album"
        :key="index"
      />
    </div>
    <div v-else class="flex flex-col">
      <img
        class="h-3/12 w-3/12 mx-auto my-12"
        src="@/assets/images/illustration-empty.svg"
        alt=""
      />
      <h3 class="text-2xl font-bold mx-auto my-8">There is nothing here</h3>
      <p class="text-xl mx-auto">
        Create a new album entry by clicking the New Album button and get
        started
      </p>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import Album from "../components/Album.vue";

export default {
  name: "Home",
  components: {
    Album,
  },
  setup() {
    // const loading = ref(false);
    const filterMenu = ref(null);
    const filteredAlbum = ref(null);
    const store = useStore();
    const albumData = computed(() => store.getters.albumData);
    // const albumData = reactive({ albumDataRef });

    const filteredAlbums = (e) => {
      if (e.target.innerText === "Clear Filter") {
        filteredAlbum.value = null;
        return;
      }
      filteredAlbum.value = e.target.innerText;
    };

    const filteredData = computed(() => {
      return albumData.value.filter((album) => {
        if (filteredAlbum.value === "Draft") {
          return album.albumDraft === true;
        }
        if (filteredAlbum.value === "Pending") {
          return album.albumPending === true;
        }
        if (filteredAlbum.value === "Listened") {
          return album.albumDone === true;
        }
        return album;
      });
    });

    return {
      filterMenu,
      filteredAlbum,
      filteredAlbums,
      filteredData,
      newAlbum: () => store.commit("TOGGLE_ALBUM"),
      albumData,
      toggleFilterMenu: () => (filterMenu.value = !filterMenu.value),
    };
  },
};
</script>