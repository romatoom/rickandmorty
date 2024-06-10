import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api";

const API = {
  getCharactersByPage: async ({ page = 1, filter = {} } = {}) => {
    const params = new URLSearchParams(filter);

    const response = await axios.get(
      `${API_URL}/character?page=${page}&${params.toString()}`
    );

    return response.data;
  },

  fetchByURL: async (url) => {
    const response = await axios.get(url);
    return response.data;
  },
};

export default API;
