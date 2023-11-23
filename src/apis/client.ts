import axios from 'axios';
import { getRefreshToken } from './user';

const baseURL = '/tooit/';

export const client = axios.create({
  baseURL,
  // headers: {
  //   Authorization:
  //     'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0b29pdEB0b29pdC5jb20iLCJpYXQiOjE2OTY4NDkwMTYsImV4cCI6MTY5NjkzNTQxNiwic3ViIjoidG90dGVyMTVAbmF2ZXIuY29tIiwiaWQiOjJ9.MqxMT2yqqko7-uzn83bFhIwiIPpn-6IlywVonUUZFRs',
  // },
});

export const noAuthClient = axios.create({
  baseURL,
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const accessToken = await getRefreshToken();
    if (accessToken) {
      client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      const originalResponse = await client.request(error.config); // 원래 api 요청하기
      return originalResponse; // 원래 api 요청의 response return
    }
  },
);
