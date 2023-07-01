import React from 'react';
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
  return (
    <button
      type="button"
      style={{
        position: 'absolute',
        top: sticker.y,
        left: sticker.x,
        width: stickerSize,
        height: stickerSize,
      }}
      className="vote-list__item-sticker"
      onBlur={() => stickerFocusHandler(null)}
      onFocus={() => stickerFocusHandler(sticker)}
    >
      {sticker.id}
      {/* TODO : comment가 잘리지 않게 잘릴것 같으면 position조정 */}
      {isFocused && (
        <div
          style={{
            zIndex: isFocused ? 10 : 'auto',
            left: sticker.comment && parseInt(sticker.x, 10) < 25 ? 0 : 'auto',
            right: sticker.comment && parseInt(sticker.y, 10) > 75 ? 0 : 'auto',
            top: `${parseInt(stickerSize, 10) * 1.2}vh`,
          }}
          className={`vote-list__item-sticker-description ${
            !sticker.nickname && 'no-comment'
          }`}
        >
          <div className={`vote-list__item-sticker-comment `}>
            {sticker.comment}
          </div>
          <div className="vote-list__item-sticker-nickname">
            by <div>{sticker.nickname}</div>
          </div>
        </div>
      )}
    </button>
  );
}

export default Sticker;
