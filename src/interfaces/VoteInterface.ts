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

export interface VoteListItemProps {
  stickerLocateHandler: (e: MouseEvent) => void;
  votedStickers: VotedSticker[];
  item: VoteItemType;
}

export interface VotedSticker {
  id: number | null;
  x: string;
  y: string;
  img?: string;
  nickname?: string;
  comment?: string;
}
