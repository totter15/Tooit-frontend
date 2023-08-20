import { client } from './client';

export async function getVote(voteId: number) {
  const { data } = await client.get(`vote/${voteId}`);
  return data;
}
