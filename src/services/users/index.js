import axios from '../axios';

export const usersDataApi = async (page) => {
  const { data } = await axios.get(`/users?page=${page}`);
  return data;
};
