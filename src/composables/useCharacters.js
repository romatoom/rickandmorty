import API from "../api/index.js";
import { ref } from "vue";

export default function useCharacters() {
  const loading = ref(false);

  async function getCharacters({ page, filter }) {
    try {
      loading.value = true;

      const characters = await API.getCharactersByPage({ page, filter });

      const uniqEpisodesURLs = [
        ...new Set(characters.results.map((c) => c.episode[0])),
      ];

      const promisesEpisodes = uniqEpisodesURLs.map((episodeURL) =>
        API.fetchByURL(episodeURL)
      );

      const episodes = await Promise.all(promisesEpisodes);


      const episodesHash = {};
      for (const episodeItem of episodes) {
        episodesHash[episodeItem.url] ??= episodeItem.name;
      }

      for (const characterItem of characters.results) {
        characterItem.firstSeenIn = episodesHash[characterItem.episode[0]];
      }

      return characters;
    } finally {
      loading.value = false;
    }
  }

  return {
    getCharacters,
    loading,
  };
}
