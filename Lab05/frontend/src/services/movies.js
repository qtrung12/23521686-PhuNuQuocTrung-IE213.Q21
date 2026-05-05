import axios from "axios";

const API_BASE = "http://localhost:80/api/v1/movies";

class MovieDataService {
  getAll(page = 0) {
    return axios.get(`${API_BASE}?page=${page}`);
  }

  get(id) {
    return axios.get(`${API_BASE}/id/${id}`);
  }

  find(query, by = "title", page = 0) {
    return axios.get(`${API_BASE}?${by}=${query}&page=${page}`);
  }

  createReview(data) {
    return axios.post(`${API_BASE}/review`, data);
  }

  updateReview(data) {
    return axios.put(`${API_BASE}/review`, data);
  }

  deleteReview(id, userId) {
    return axios.delete(`${API_BASE}/review`, {
      data: {
        review_id: id,
        user_id: userId,
      },
    });
  }

  getRatings() {
    return axios.get(`${API_BASE}/ratings`);
  }
}

export default new MovieDataService();
