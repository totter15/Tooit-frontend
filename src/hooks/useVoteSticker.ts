import { RootState } from '../slices';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSticker,
  unSelectSticker,
  locateSticker,
  inputStickerData,
  cancelVote,
  VoteItemType,
} from '../slices/vote';

export interface SelectSticker {
  stickerId: number;
  src: string;
  file: any;
}

export interface LocateStickerType {
  selectItem: VoteItemType;
  x: number;
  y: number;
  nickname: string;
  comment?: string;
}

export interface InputStickerData {
  nickname: string;
  comment: string;
}

function useVoteSticker() {
  const voteItem = useSelector((state: RootState) => state.vote.voteItem);
  const sticker = useSelector((state: RootState) => state.vote.sticker);

  const dispatch = useDispatch();

  const selectStickerHandler = ({ stickerId, src, file }: SelectSticker) => {
    dispatch(selectSticker({ stickerId, src, file }));
  };
  const unSelectStickerHandler = () => {
    dispatch(unSelectSticker());
  };
  const locateStickerHandler = ({
    selectItem,
    x,
    y,
    nickname,
    comment,
  }: LocateStickerType) => {
    dispatch(locateSticker({ x, y, nickname, comment, selectItem }));
  };
  const inputStickerDataHandler = ({ nickname, comment }: InputStickerData) => {
    dispatch(inputStickerData({ nickname, comment }));
  };
  const cancelVoteHandler = () => {
    dispatch(cancelVote());
  };

  return {
    voteItem,
    sticker,
    selectStickerHandler,
    unSelectStickerHandler,
    locateStickerHandler,
    inputStickerDataHandler,
    cancelVoteHandler,
  };
}

export default useVoteSticker;
