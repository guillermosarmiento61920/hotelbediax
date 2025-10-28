// funciones para llamar al bakc

import axios from "axios";
import qs from "query-string";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:5227/api",
  timeout: 30000,
});

export const fetchDestinations = async ({
  page = 1,
  pageSize = 50,
  search = "",
  sort = "",
}) => {
  const q = qs.stringify({ page, pageSize, search, sort });
  const res = await api.get(`/destinations?${q}`);
  return res.data;
};

export const createDestination = (payload) =>
  api.post("/destinations", payload);
export const updateDestination = (id, payload) =>
  api.put(`/destinations/${id}`, payload);
export const deleteDestination = (id) => api.delete(`/destinations/${id}`);
export default api;
