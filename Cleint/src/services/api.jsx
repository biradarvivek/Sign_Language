import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const wordAPI = {
  getAllWords: () => api.get("/words"),
  searchWords: (query) => api.get(`/words/search/${query}`),
  addWord: (wordData) => api.post("/words", wordData),
  updateWord: (id, wordData) => api.put(`/words/${id}`, wordData),
  deleteWord: (id) => api.delete(`/words/${id}`),
};
