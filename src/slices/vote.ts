import { createSlice } from '@reduxjs/toolkit';

export interface VoteState {
  voteItem: VoteItemType | null;
  sticker: VoteStickerType | null;
}

export interface VoteItemType {
  name: string;
  id: number;
  index: number;
}

export interface VoteStickerType {
  stickerId: number;
  src: string;
  itemId: number;
  x?: number;
  y?: number;
  nickname?: string;
  comment?: string;
  file?: any;
}

const initialState: VoteState = {
  voteItem: null,
  sticker: null,
};

export const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    selectSticker: (state, { payload }) => {
      state.sticker = payload;
    },
    unSelectSticker: (state) => {
      state.sticker = null;
    },
    locateSticker: (state, { payload }) => {
      const { selectItem, x, y, nickname, comment } = payload;
      state.voteItem = selectItem;
      state.sticker = state.sticker && {
        ...state.sticker,
        x,
        y,
        nickname,
        comment,
        itemId: selectItem.id,
      };
    },
    inputStickerData: (state, { payload }) => {
      if (state.sticker) {
        const { nickname, comment } = payload;
        state.sticker = { ...state.sticker, nickname, comment };
      }
    },
    cancelVote: (state) => {
      state.sticker = null;
      state.voteItem = null;
    },
  },
});

export const {
  selectSticker,
  unSelectSticker,
  locateSticker,
  inputStickerData,
  cancelVote,
} = voteSlice.actions;
export default voteSlice.reducer;
