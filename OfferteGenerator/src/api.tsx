import axios from 'axios';

const API_URL = 'http://localhost:8000'; // TODO: vervangen met de URL van de API

export const getConversation = async (conversation: number) => {
  try {
    const response = await axios.get(`${API_URL}/`, { params: { conversation } });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const saveConersation = async (name: string, description?: string) => {
  try {
    const response = await axios.post(`${API_URL}/conversations/`, { name, description });
    return response.data;
  } catch (error) {
    console.error('Error saving conversation:', error);
    throw error;
  }
};
