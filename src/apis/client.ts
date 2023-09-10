import axios from 'axios';

const baseURL = '/tooit/';

export const client = axios.create({
  baseURL,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0b29pdEB0b29pdC5jb20iLCJpYXQiOjE2OTM4Mjg2MDIsImV4cCI6MTY5MzkxNTAwMiwic3ViIjoidG90dGVyMTVAbmF2ZXIuY29tIiwiaWQiOjJ9.Sn9cQ-ExWYznsbXzcX3UuzifjCvloS5Ehu_j0nuBmcg',
  },
});
