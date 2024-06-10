<template>
  <div class="pagination">
    <label for="page-select">Current page: </label>
    <select
      class="pagination__select"
      id="page-select"
      :value="currentPage"
      @change="handleChangePage($event)"
    >
      <option v-for="index in pagesCount" :value="index" :key="index">
        Page {{ index }}
      </option>
    </select>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },

  pagesCount: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits({
  "change-page": (value) => typeof value === "number" && value >= 1,
});

function handleChangePage(e) {
  emits("change-page", Number(e.target.value));
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 5px;

  &__select {
    padding: 3px;
  }
}
</style>
