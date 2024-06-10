<template>
  <c-pagination
    :currentPage="currentPage"
    :pagesCount="pagesCount"
    @change-page="handleChangePage"
    class="mb-20"
  />

  <c-filter :filter="filter" @set-filter="setFilter" />

  <c-list :items="charactersItems">
    <template v-slot="{ item }">
      <c-card-character :item="item" />
    </template>
  </c-list>

  <the-page-loader :loading="loading" />
</template>

<script setup>
import { onMounted, ref, reactive, watch } from "vue";
import useCharacters from "./composables/useCharacters.js";

import CPagination from "./components/CPagination.vue";
import CFilter from "./components/CFilter.vue";
import CList from "./components/CList.vue";
import CCardCharacter from "./components/CCardCharacter.vue";
import ThePageLoader from "./components/ThePageLoader.vue";

const { getCharacters, loading } = useCharacters();

const charactersItems = ref([]);
const pagesCount = ref(0);

const filter = reactive({
  name: "",
  status: "",
});

async function fetchCharacters() {
  try {
    const charactersData = await getCharacters({
      page: currentPage.value,
      filter,
    });

    charactersItems.value = charactersData.results;
    pagesCount.value = charactersData.info.pages;
  } catch (err) {
    charactersItems.value = [];
    pagesCount.value = 1;
  }
}

const currentPage = ref(1);

function handleChangePage(page) {
  currentPage.value = page;
}

function setFilter(filterForAssign) {
  currentPage.value = 1;
  Object.assign(filter, filterForAssign);
}

const dataUsingForFetch = reactive({
  currentPage,
  filter,
});

watch(dataUsingForFetch, () => {
  fetchCharacters();
});

onMounted(() => {
  fetchCharacters();
});
</script>
