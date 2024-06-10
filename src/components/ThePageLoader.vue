<template>
  <div v-if="loading" class="loader-wrapper">
    <div class="loader">Loading...</div>
  </div>
</template>

<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.loader-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(1px);
}

.loader {
  font-weight: 600;
}
</style>
