import axios from 'axios';

const baseURL = '/tooit/';

export const client = axios.create({
  baseURL,
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0b29pdEB0b29pdC5jb20iLCJpYXQiOjE2OTMyMjkwMTksImV4cCI6MTY5MzMxNTQxOSwic3ViIjoiY2ppbmFjaGV1bkBnbWFpbC5jb20iLCJpZCI6MX0.Rlzm9Whr9i07kxHYM0pHbtag0IBn162CdrQudOQ5q-s',
  },
});
