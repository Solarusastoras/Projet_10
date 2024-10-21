import axios from 'axios';

export const apiCall = async (method, url, data, token, rejectWithValue) => {
  try {
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await axios({ method, url, data, ...config });
    return response.data.body;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
};