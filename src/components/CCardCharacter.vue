<template>
  <div class="card">
    <img v-lazy="{ src: item.image, loading: noImageURL }" />

    <div class="card__info">
      <span class="name">{{ item.name }}</span>

      <div class="status-and-species">
        <div class="icon" :class="item.status.toLowerCase()"></div>
        <span class="status">{{ item.status }}</span> - {{ item.species }}
      </div>

      <div class="label">
        <span>Last known location:</span>
        {{ item.location.name }}
      </div>

      <div class="label">
        <span>First seen in:</span>
        {{ item.firstSeenIn }}
      </div>
    </div>
  </div>
</template>

<script setup>
const noImageURL = "/rickandmorty/no-image.jpg";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  height: 100%;

  &__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    background-color: var(--card-background);
    height: 100%;

    & .name {
      font-size: 1.5em;
      font-weight: 500;
      line-height: 1.2em;
    }

    & .status-and-species {
      display: flex;
      align-items: center;
      gap: 5px;

      & > .status {
        text-transform: capitalize;
      }

      & > .icon {
        width: 10px;
        height: 10px;
        border-radius: 5px;

        &.unknown {
          background-color: var(--status-unknown);
        }

        &.alive {
          background-color: var(--status-alive);
        }

        &.dead {
          background-color: var(--status-dead);
        }
      }
    }

    & .label {
      & > span {
        display: block;
        color: var(--card-label);
      }
    }
  }
}
</style>
