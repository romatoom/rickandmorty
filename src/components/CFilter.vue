<template>
  <div class="filter mb-20">
    Filter options:
    <div class="filter__item">
      <label for="name">Name</label>
      <input v-model="modifiedFilter.name" id="name" />
    </div>

    <div class="filter__item mb-20">
      <label for="status">Status</label>

      <select v-model="modifiedFilter.status" id="status">
        <option v-for="status in STATUSES" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
    </div>

    <div
      class="filter__apply-btn"
      :class="{ disabled: !filterUpdated }"
      @click="setFilter"
    >
      Apply
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";

const STATUSES = ["Any", "Unknown", "Alive", "Dead"];

const props = defineProps({
  filter: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits({
  "set-filter": (filter) => typeof filter === "object",
});

const modifiedFilter = reactive({
  name: "",
  status: "Any",
});

function setFilter() {
  const filter = { ...modifiedFilter };

  if (filter.status === "Any") {
    filter.status = "";
  }

  emits("set-filter", filter);
}

const filterUpdated = computed(() => {
  const modifiedFilterNormalize = { ...modifiedFilter };

  modifiedFilterNormalize.status =
    modifiedFilterNormalize.status === "Any"
      ? ""
      : modifiedFilterNormalize.status;

  return (
    JSON.stringify(modifiedFilterNormalize) !== JSON.stringify(props.filter)
  );
});
</script>

<style lang="scss" scoped>
.filter {
  padding: 15px;
  border: 1px solid var(--border);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  width: max-content;

  &__item {
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;

    & label {
      font-size: 14px;
      color: var(--card-label);
    }

    & select {
      width: 100px;
      padding: 3px;
    }

    & input {
      padding: 3px;
    }
  }

  &__apply-btn {
    padding: 6px 12px;
    border-radius: 6px;
    background-color: var(--primary);
    color: white;
    cursor: pointer;

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
