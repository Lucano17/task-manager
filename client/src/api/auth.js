import axios from "./axios.js";

export const registerRequest = async (user) => axios.post(`/register`, user);

export const loginRequest = async (user) => axios.post(`/login`, user);

export const verifyTokenRequest = async () => axios.get(`/verify`);

export const updateUserRequest = async (user) => {
    try {
      return await axios.put('/profile', user);
    } catch (error) {
      console.error("Update request error:", error);
      throw error;
    }
  };

  export const getUserTasksCountRequest = async () => {
    return await axios.get('/tasks-count');
  };

  export const deleteUserRequest = async (userId) => {
    try {
      return await axios.delete(`/profile/${userId}`);
    } catch (error) {
      console.error("Delete request error:", error);
      throw error;
    }
  };