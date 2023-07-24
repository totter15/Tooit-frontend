import React, { useEffect, useState } from 'react';
import { VotedStickers, VotedSticker } from '../../pages/Vote';
import Sticker from './Sticker';
import useResponsive from '../../hooks/useResponsive';
import { VoteItemType } from '../../interfaces/VoteInterface';

interface VoteListItemProps {
  stickerLocateHandler: (e: any) => void;
  votedStickers: VotedStickers;
  item: VoteItemType;
}

function VoteListItem({
  stickerLocateHandler,
  votedStickers,
  item,
}: VoteListItemProps) {
  const { isTablet } = useResponsive();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [focusSticker, setFocusSticker] = useState<VotedSticker | null>(null);
  const [stickerSize, setStickerSize] = useState<string>('10.4vh');
  const { image, stickerCount, name, content } = item;

  function saveHandler() {
    // TODO : 투표 이미지 저장 기능
  }

  function getStickerSize() {
    if (isTablet) return '16vw';

    const number = votedStickers.length;
    if (number < 20) return '10.4vh';
    if (number >= 20 && number < 50) return '8.8vh';
    if (number >= 50 && number < 100) return '7.2vh';
    if (number >= 100) return '4.8vh';
    return '10.4vh';
  }

  useEffect(() => {
    setStickerSize(getStickerSize());
  }, [votedStickers, isTablet]);

  return (
    <li className="vote-list__item">
      <div onFocus={(e) => console.log(e)} className="vote-list__item-header">
        <div className="vote-list__item-title">
          <div className="vote-list__item-number">1</div>
          {name}
          {!isTablet && (
            <span className="vote-list__item-percent">
              {stickerCount}표 (20%)
            </span>
          )}
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
        <img
          src={image}
          alt="votedImage"
          className="vote-list__item-img__img"
        />
        {votedStickers.map((sticker) => (
          <Sticker
            sticker={sticker}
            isFocused={sticker.id === focusSticker?.id}
            stickerFocusHandler={(focus) => setFocusSticker(focus)}
            stickerSize={stickerSize}
          />
        ))}
        <button
          onBlur={() => setIsHover(!isHover)}
          onClick={() => setIsHover(!isHover)}
          type="button"
          className="vote-list__item-info-button"
        >
          <img alt="info" src="vote_item_info.png" />
        </button>
        <div
          className={`vote-list__item-description-background ${
            isHover && 'visible'
          }`}
        >
          <div className="vote-list__item-description">{content}</div>
        </div>
      </button>
    </li>
  );
}

export default VoteListItem;
