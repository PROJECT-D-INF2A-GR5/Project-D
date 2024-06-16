import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const getConversation = async (user_id: string) => {
  try {
    const response = await axios.get(`${API_URL}/openai/${user_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const testDB = async (db_type: string) => {
    try {
      const response = await axios.get(`${API_URL}/testdb/${db_type}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

export const postMessage = async (user_id: string, userMessage: string) => {
  try {
    const response = await axios.post(`${API_URL}/openai/${user_id}`, {
      user_message: userMessage
    });
    return response.data;
  } catch (error) {
    console.error('Error posting message:', error);
    throw error;
  }
};

export const getMaxId = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/get_max_id`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const initializeUser = async (user_id : string) => {
  try {
    const response = await axios.post(`${API_URL}/user/${user_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}