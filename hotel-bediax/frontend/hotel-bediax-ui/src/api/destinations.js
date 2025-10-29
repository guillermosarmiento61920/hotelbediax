// funciones para llamar al bakc

import axios from "axios";
import qs from "query-string";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:5227/api",
  timeout: 30000,
});

//let nextId = 11; //para generar otros ids

export const fetchDestinations = async ({
  page = 1,
  pageSize = 10,
  search = "",
  name = "",
  city = "",
  country = "",
  minPrice = 0,
  maxPrice = 99999,
  type = "",
  sort = "",
} = {}) => {
  const q = qs.stringify({
    page,
    pageSize,
    search,
    name,
    city,
    country,
    minPrice,
    maxPrice,
    type,
    sort,
  });
  const res = await api.get(`/destinations?${q}`);
  return res.data;
};

export const fetchCities = async () => {
  const res = await api.get("/destinations/cities");
  return res.data;
};

export const fetchCountries = async () => {
  const res = await api.get("/destinations/countries");
  return res.data;
};

export const fetchTypes = async () => {
  const res = await api.get("/destinations/types");
  return res.data;
};

export const createDestination = async (payload) => {
  const res = await api.post("/destinations", payload);
  return res.data;
};

export const updateDestination = async (id, payload) => {
  await api.put(`/destinations/${id}`, payload);
};

export const deleteDestination = async (id) => {
  await api.delete(`/destinations/${id}`);
  return { success: true };
};

export default api;
