import { client } from './client';

export async function getVote(voteId: number) {
  const { data } = await client.get(`vote/${voteId}`);
  return data;
}

export const MY_VOTE_SIZE = 10;
export async function getMyVote(lastVoteId: number = 0) {
  const { data } = await client.get(
    `myPage/vote?size=${MY_VOTE_SIZE}&lastVoteId=${lastVoteId}`,
  );
  return data;
}

export async function getMyVoting(lastVoteId: number) {
  const { data } = await client.get(
    `myPage/voting?size=${MY_VOTE_SIZE}&lastVoteId=${lastVoteId}`,
  );
  return data;
}

export async function putsticker({
  x,
  y,
  nickname,
  content,
  voteItemId,
  voteId,
  src,
  ip = null,
  file,
}: any) {
  const formData = new FormData();
  const sticker = {
    locationX: x,
    locationY: y,
    nickname,
    content,
    voteItemId,
    voteId,
  };

  const stickerData = new Blob(
    [JSON.stringify(ip ? { ...sticker, nonUser: { ip } } : sticker)],
    { type: 'application/json' },
  );

  formData.append('sticker', stickerData);
  formData.append('image', file);

  const { data } = await client.post('sticker', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteVote(id: number[]) {
  const { data } = await client.delete('vote/', { data: { id } });
  return data;
}

export async function deadlineVote(id: number[]) {
  const { data } = await client.put('vote/deadline', { id });
  return data;
}

export async function reviewVote({
  content,
  voteId,
}: {
  content: string;
  voteId: number;
}) {
  const { data } = await client.post('myPage/review', { content, voteId });
  return data;
}
