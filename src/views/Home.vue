<template>
  <div class="home container text-white md:pt-18">
    <!-- Header -->
    <div class="header flex mb-16">
      <div class="left flex flex-col flex-1">
        <h2 class="text-2xl font-bold">Albums</h2>
        <span class="text-md">There are 3 total albums</span>
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
        <div @click="newAlbum" class="button flex items-center bg-l_purple">
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
    <!-- Invoices -->
    <!-- <div v-if="invoiceData.length > 0">
      <Invoice
        v-for="(invoice, index) in filteredData"
        :invoice="invoice"
        :key="index"
      />
    </div>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/illustration-empty.svg" alt="" />
      <h3>There is nothing here</h3>
      <p>
        Create a new invoice by clicking the New Invoice button and get started
      </p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      filterMenu: null,
    };
  },
  components: {},
  methods: {
    newAlbum() {},
    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },
  },
};
</script>