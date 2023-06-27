import React, { useState } from 'react';
import { VotedStickers, VotedSticker } from '../../pages/Vote';

interface VoteListItemProps {
  stickerLocateHandler: (e: any) => void;
  votedStickers: VotedStickers;
}

function VoteListItem({
  stickerLocateHandler,
  votedStickers,
}: VoteListItemProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [focusSticker, setFocusSticker] = useState<VotedSticker | null>(null);

  function saveHandler() {
    // TODO : 투표 이미지 저장 기능
  }

  return (
    <li className="vote-list__item">
      <div onFocus={(e) => console.log(e)} className="vote-list__item-header">
        <div className="vote-list__item-title">
          <div className="vote-list__item-number">1</div>새우 껍질 주새우
        </div>
        <button type="button" onClick={saveHandler}>
          <img src="save.png" alt="save" />
        </button>
      </div>
      <button
        style={{ position: 'relative' }}
        type="button"
        onClick={stickerLocateHandler}
        className="vote-list__item-img"
      >
        {votedStickers.map((sticker) => (
          <button
            type="button"
            style={{
              position: 'absolute',
              top: sticker.y,
              left: sticker.x,
            }}
            className="vote-list__item-sticker"
            onBlur={() => setFocusSticker(null)}
            onFocus={() => setFocusSticker(sticker)}
          >
            {sticker.id}
            {/* TODO : comment가 잘리지 않게 잘릴것 같으면 position조정 */}
            {focusSticker?.id === sticker.id && (
              <div
                style={{
                  left: parseInt(sticker.x, 10) < 25 ? 0 : 'auto',
                  right: parseInt(sticker.y, 10) > 75 ? 0 : 'auto',
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
        ))}
        <button
          onBlur={() => setIsHover(!isHover)}
          onClick={() => setIsHover(true)}
          type="button"
          className="vote-list__item-info-button"
        >
          <img alt="info" />
        </button>
        <div
          className={`vote-list__item-description-background ${
            isHover && 'visible'
          }`}
        >
          <div className="vote-list__item-description">
            일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십
          </div>
        </div>
        .
      </button>
    </li>
  );
}

export default VoteListItem;
