import React, { useState, useEffect } from 'react';
import { VotedSticker } from '../../pages/Vote';

interface StickerProps {
  sticker: VotedSticker;
  isFocused: boolean;
  stickerFocusHandler: (sticker: VotedSticker | null) => void;
  stickerSize: string;
}

function Sticker({
  sticker,
  isFocused,
  stickerFocusHandler,
  stickerSize,
}: StickerProps) {
  const { x, y, nickname, comment, img } = sticker;

  const [descriptionHeight, setDescriptionHeight] = useState<
    number | undefined
  >(0); // description 높이(vh)

  const HEIGHT = window.innerHeight;
  const ITEM_SIZE = 80; //  투표 아이템 사이즈(vh)
  const DESCRIPTION_WIDTH = 300; //  설명창 길이(px)
  const MIN_DISTANCE = 4; //  아이템 벽에서 설명창이 떨어져야할 최소한의 거리(vh)
  const STICKER_SIZE = parseInt(stickerSize, 10); // 스티커 사이즈(vh)
  const STICKER_X = parseInt(x, 10); //  스티커 x좌표(%)
  const STICKER_Y = parseInt(y, 10); //  스티커 y좌표(%)
  const STICKER_X_WIDTH = (STICKER_X * ITEM_SIZE) / 100; //  스티커 x좌표를 vh로 환산(vh)
  const STICKER_Y_WIDTH = (STICKER_Y * ITEM_SIZE) / 100; //  스티커 y좌표를 vh로 환산(vh)

  useEffect(() => {
    if (isFocused) {
      const height = document.querySelector(
        '.vote-list__item-sticker-description',
      )?.clientHeight;
      const heightIntoVh = height && (height / HEIGHT) * 100;
      setDescriptionHeight(heightIntoVh);
    }
  }, [isFocused]);

  const DESCRIPTION_MIN_DISTANCE =
    (DESCRIPTION_WIDTH / 2 / HEIGHT) * 100 + MIN_DISTANCE; //  설명창이 투표 아이템내부 벽에서 떨어져야할 최소 거리(vh)

  //  설명창의 거리(%)가 DESCRIPTION_MIN_PERCENT보다 작을 경우 이동할 %(이동은 sticker 사이즈를 기준)
  const DISTANCE_PERCENT_LEFT =
    ((MIN_DISTANCE - (STICKER_X_WIDTH - STICKER_SIZE / 2)) / STICKER_SIZE) *
    100;
  const DISTANCE_PERCENT_RIGHT =
    ((MIN_DISTANCE - (ITEM_SIZE - STICKER_X_WIDTH - STICKER_SIZE / 2)) /
      STICKER_SIZE) *
    100;

  const left =
    comment &&
    (STICKER_X_WIDTH < DESCRIPTION_MIN_DISTANCE
      ? `${DISTANCE_PERCENT_LEFT}%`
      : 'auto');

  const right =
    comment &&
    (ITEM_SIZE - STICKER_X_WIDTH < DESCRIPTION_MIN_DISTANCE
      ? `${DISTANCE_PERCENT_RIGHT}%`
      : 'auto');

  const top =
    descriptionHeight &&
    STICKER_SIZE * 0.7 + descriptionHeight + MIN_DISTANCE <
      ITEM_SIZE - STICKER_Y_WIDTH
      ? '120%'
      : 'auto';

  const bottom =
    descriptionHeight &&
    STICKER_SIZE * 0.7 + descriptionHeight + MIN_DISTANCE >
      ITEM_SIZE - STICKER_Y_WIDTH
      ? '120%'
      : 'auto';

  return (
    <button
      type="button"
      style={{
        position: 'absolute',
        top: y,
        left: x,
        width: stickerSize,
        height: stickerSize,
        zIndex: isFocused ? 10 : 'auto',
      }}
      className="vote-list__item-sticker"
      onBlur={() => stickerFocusHandler(null)}
      onFocus={() => stickerFocusHandler(sticker)}
      onClick={(e) => e.stopPropagation()}
    >
      <img alt="sticker" src={img} />
      {sticker.id}
      {isFocused && (
        <div
          style={{ left, right, top, bottom }}
          className={`vote-list__item-sticker-description ${
            !comment && 'no-comment'
          }`}
        >
          <div className={`vote-list__item-sticker-comment `}>{comment}</div>
          <div className="vote-list__item-sticker-nickname">
            by <div>{nickname}</div>
          </div>
        </div>
      )}
    </button>
  );
}

export default Sticker;
