<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Albums</h1>
        <span>There are 3 total albums</span>
      </div>
      <div class="right flex">
        <div @click="toggleFilterMenu" class="filter flex">
          <span
            >Filter by status
            <!-- <span v-if="filteredInvoice">: {{ filteredInvoice }}</span> -->
          </span>
          <img src="@/assets/images/icon-arrow-down.svg" alt="" />
          <ul v-show="filterMenu" class="filter-menu">
            <li @click="filteredAlbums">Draft</li>
            <li @click="filteredAlbums">Pending</li>
            <li @click="filteredAlbums">Listened</li>
            <li @click="filteredAlbums">Clear Filter</li>
          </ul>
        </div>
        <div @click="newAlbum" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/images/icon-plus.svg" alt="" />
          </div>
          <span>New Albums</span>
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