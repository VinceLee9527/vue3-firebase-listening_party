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
      right-0
      h-full
      w-full
      bg-d_purple
      opacity-100
      z-[101]
    "
  >
    <span
      class="block w-8 h-8 my-0 mx-auto rounded-full animate-spin absolute spin"
    ></span>
  </div>
</template>

<script>
export default {
  name: "loading",
};
</script>
