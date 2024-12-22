import axios from "./axios.js";

export const registerRequest = async (user) => axios.post(`/api/register`, user);

export const loginRequest = async (user) => axios.post(`/api/login`, user);

export const verifyTokenRequest = async () => axios.get(`/api/verify`);

export const updateUserRequest = async (user) => {
  try {
    return await axios.put(`/api/profile`, user);
  } catch (error) {
    console.error("Update request error:", error);
    throw error;
  }
};

export const getUserTasksCountRequest = async () => {
  return await axios.get(`/api/tasks-count`);
};

export const deleteUserRequest = async (userId) => {
  try {
    return await axios.delete(`/api/profile/${userId}`);
  } catch (error) {
    console.error("Delete request error:", error);
    throw error;
  }
};
