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
      bg-black
      z-[101]
      border-4
    "
  >
    <span
      class="
        block
        w-16
        h-16
        my-0
        mx-auto
        rounded-full
        animate-spin
        spin
        absolute
      "
    ></span>
  </div>
</template>

<script>
export default {
  name: "loading",
};
</script>
