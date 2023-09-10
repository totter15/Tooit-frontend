import { VoteState, VoteStickerType } from '../slices/vote';

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
  voteItemName?: string;
}

export type VotedStickersType = VoteStickerType[] | [];

export interface StickerBoxProps {
  revoteHandler: () => void;
  myVote: VoteState | null;
}

export interface VoteListProps {
  items: VoteItemType[];
  stickerLocateHandler: ({
    x,
    y,
    name,
    id,
    index,
  }: {
    x: number;
    y: number;
    name: string;
    id: number;
    index: number;
  }) => void;
  votedStickers: VotedStickersType;
}

export interface VoteListItemProps {
  index: number;
  stickerLocateHandler: ({
    x,
    y,
    name,
    id,
    index,
  }: {
    x: number;
    y: number;
    name: string;
    id: number;
    index: number;
  }) => void;
  votedStickers: VotedStickersType;
  item: VoteItemType;
}

export interface StickerProps {
  sticker: VoteStickerType;
  isFocused: boolean;
  stickerFocusHandler: (sticker: VoteStickerType | null) => void;
  stickerSize: string;
}
