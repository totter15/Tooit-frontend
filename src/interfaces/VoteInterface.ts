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
}

export type VotedStickersType = VotedStickerType[] | [];

export interface VoteListProps {
  items: VoteItemType[];
  stickerLocateHandler: React.MouseEventHandler<HTMLButtonElement>;
  votedStickers: VotedStickersType;
}

export interface VoteListItemProps {
  stickerLocateHandler: React.MouseEventHandler<HTMLButtonElement>;
  votedStickers: VotedStickerType[];
  item: VoteItemType;
}

export interface StickerProps {
  sticker: VotedStickerType;
  isFocused: boolean;
  stickerFocusHandler: (sticker: VotedStickerType | null) => void;
  stickerSize: string;
}
