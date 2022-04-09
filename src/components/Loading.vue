<template>
  <div
    class="
      loading
      flex
      justify-center
      items-center
      absolute
      top-0
      left-0
      h-full
      w-full
      opacity-50
      bg-black
      z-[101]
    "
  >
    <span
      class="
        block
        w-16
        h-16
        my-0
        mx-auto
        border-t-white border-solid border-transparent border-4
        rounded-full
        animate-spin
        border-t-slate-50
      "
    ></span>
  </div>
</template>

<script>
export default {
  name: "loading",
};
</script>

<style lang="scss">
.loading {
  span {
    border: 3px solid transparent;
    border-bottom-color: #fff;
  }
}
</style>

