import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async () => {
  const { data } = await api.get('/products');
  return data;
};

export const getProductBySlug = async (slug, variantId = null) => {
  const params = variantId ? { variantId } : {};
  const { data } = await api.get(`/products/${slug}`, { params });
  return data;
};

export const getEmiPlans = async (slug, variantId) => {
  const { data } = await api.get(`/products/${slug}/emi-plans`, {
    params: { variantId },
  });
  return data;
};

export default api;
