import { getCookie } from '../utils/cookie';
import { client, noAuthClient } from './client';

export async function getUserInfo() {
  // const refreshToken = getCookie('refresh_token');
  const { data } = await client.post('userInfo', { refreshToken: undefined });
  return data;
}

export async function changeNickname(nickname: string) {
  const { data } = await client.put('nickname', { nickname });
  return data;
}

export async function getRefreshToken() {
  const refreshToken = getCookie('refresh_token');
  const { data } = await noAuthClient.post('token', { refreshToken });
  const { accessToken } = data ?? {};
  localStorage.setItem('token', accessToken);
  return accessToken;
}
