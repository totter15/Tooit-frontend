import React, { useState, useEffect } from 'react';
import useResponsive from '../../hooks/useResponsive';
import { StickerProps } from '../../interfaces/VoteInterface';

function VotedSticker({
  sticker,
  isFocused,
  stickerFocusHandler,
  stickerSize,
}: StickerProps) {
  const { isTablet } = useResponsive();
  const { x, y, nickname, comment, img } = sticker;

  const [descriptionHeight, setDescriptionHeight] = useState<
    number | undefined
  >(0); // description 높이(vh)

  const HEIGHT = window.innerHeight;
  const WIDTH = window.innerWidth;
  const standard = isTablet ? WIDTH : HEIGHT;
  const ITEM_SIZE = isTablet ? 100 : 70; //  투표 아이템 사이즈(vh)
  const DESCRIPTION_WIDTH = isTablet ? WIDTH * 0.8 : 300; //  설명창 길이(px)
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
      const heightIntoVh = height && (height / standard) * 100;
      setDescriptionHeight(heightIntoVh);
    }
  }, [isFocused]);

  const DESCRIPTION_MIN_DISTANCE =
    (DESCRIPTION_WIDTH / 2 / HEIGHT) * 100 + MIN_DISTANCE; //  설명창이 투표 아이템내부 벽에서 떨어져야할 최소 거리(vh)

  const left =
    STICKER_X_WIDTH < DESCRIPTION_MIN_DISTANCE
      ? (DESCRIPTION_MIN_DISTANCE * HEIGHT) / 100
      : ITEM_SIZE - STICKER_X_WIDTH < DESCRIPTION_MIN_DISTANCE
      ? ((ITEM_SIZE - DESCRIPTION_MIN_DISTANCE) * HEIGHT) / 100
      : x;

  const top =
    descriptionHeight &&
    (STICKER_SIZE * 0.7 + descriptionHeight + MIN_DISTANCE <
    ITEM_SIZE - STICKER_Y_WIDTH
      ? (standard * (STICKER_Y_WIDTH + STICKER_SIZE * 0.7)) / 100
      : (standard *
          (STICKER_Y_WIDTH - STICKER_SIZE * 0.7 - descriptionHeight)) /
        100);

  const mobileLeft = comment ? '50%' : x;

  return (
    <>
      <button
        type="button"
        style={{
          top: y,
          left: x,
          width: stickerSize,
          height: stickerSize,
          zIndex: isFocused ? 10 : 'auto',
        }}
        className="vote-list__item-sticker"
        onBlur={() => stickerFocusHandler(null)}
        onFocus={() => stickerFocusHandler(sticker)}
        onClick={(e) => {
          e.stopPropagation();
          stickerFocusHandler(sticker);
        }}
      >
        <img alt="sticker" src={img} />
      </button>

      {isFocused && (
        <div
          style={{
            top:
              isTablet && comment && comment?.length > 40 && STICKER_Y > 50
                ? '4%'
                : isTablet &&
                  descriptionHeight &&
                  comment &&
                  comment?.length > 40 &&
                  STICKER_Y <= 50
                ? `${96 - descriptionHeight}%`
                : top,
            left: isTablet ? mobileLeft : left,
          }}
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
    </>
  );
}

export default VotedSticker;
