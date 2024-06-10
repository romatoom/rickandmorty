<template>
  <div
    v-if="items.length > 0"
    class="list"
    :style="{
      'grid-template-columns': `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
    }"
  >
    <div v-for="item in items" :key="item.id" class="list__item">
      <slot :item="item" />
    </div>
  </div>

  <span v-else>No results</span>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },

  minWidth: {
    type: Number,
    default: 250,
  },
});
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  display: grid;
  gap: 20px;
  grid-auto-rows: auto;
}
</style>
