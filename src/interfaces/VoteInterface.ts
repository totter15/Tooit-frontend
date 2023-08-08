import { MouseEvent } from 'react';

export interface VoteListType {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  createDate: string;
  userId: number;
  nickname: string;
  items: VoteItemType[];
  dday: number;
}

export interface VoteItemType {
  id: number;
  image: string;
  stickerCount: number;
  name: string;
  content: string;
  voteId: number;
}

export interface VotedStickerType {
  id: number | null;
  x: string;
  y: string;
  img?: string;
  nickname?: string;
  comment?: string;
  voteItemId?: number;
}

export type VotedStickersType = VotedStickerType[] | [];

export interface StickerBoxProps {
  stickerVoteHandler: (id: number, url: string) => void;
  revoteHandler: () => void;
  selectedSticker: { id: number; url: string } | null;
  myVote: VotedStickerType | null;
}

export interface VoteListProps {
  items: VoteItemType[];
  stickerLocateHandler: (e: any, id: number) => void;
  votedStickers: VotedStickersType;
}

export interface VoteListItemProps {
  index: number;
  stickerLocateHandler: (e: any, id: number) => void;
  votedStickers: VotedStickerType[];
  item: VoteItemType;
}

export interface StickerProps {
  sticker: VotedStickerType;
  isFocused: boolean;
  stickerFocusHandler: (sticker: VotedStickerType | null) => void;
  stickerSize: string;
}
