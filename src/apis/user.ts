import { getCookie } from '../utils/cookie';
import { client } from './client';

export async function getUserInfo() {
  const refreshToken = getCookie('refresh_token');
  const { data } = await client.post('userInfo', { refreshToken });
  return data;
}

export async function changeNickname(nickname: string) {
  const { data } = await client.put('nickname', { nickname });
  return data;
}
