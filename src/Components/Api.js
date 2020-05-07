
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "a1bde62d7e58d4c83c895e1b72946188",
    language: "en-US"
  }
});

// api.get("tv/popular");
// api.get("/tv/popular"); << absolute path

export default api;