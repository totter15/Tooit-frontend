import React, { RefObject, useEffect, useRef, useState } from 'react';
import VotedSticker from './VotedSticker';
import useResponsive from '../../hooks/useResponsive';
import {
  VotedStickerType,
  VoteListItemProps,
} from '../../interfaces/VoteInterface';
import html2canvas from 'html2canvas';
import { url } from 'inspector';

function VoteListItem({
  index,
  stickerLocateHandler,
  votedStickers,
  item,
}: VoteListItemProps) {
  const imgItemRef = useRef<any>(null);
  const { isTablet } = useResponsive();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [focusSticker, setFocusSticker] = useState<VotedStickerType | null>(
    null,
  );
  const [stickerSize, setStickerSize] = useState<string>('10.4vh');
  const { image, stickerCount, name, content } = item;

  function saveHandler() {
    //  TODO : CORS 에러 해결
    html2canvas(imgItemRef?.current, {
      useCORS: true,
      allowTaint: true,
      ignoreElements: (element) =>
        element.className === 'vote-list__item-info-button',
    }).then((canvas) => {
      let link = document.createElement('a');
      document.body.appendChild(link);

      link.href = canvas.toDataURL('image/jpg');
      link.download = name + '.jpg';
      link.click();

      document.body.removeChild(link);
    });
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
      <div className="vote-list__item-header">
        <div className="vote-list__item-title">
          <div className="vote-list__item-number">{index}</div>
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

      <div
        ref={imgItemRef}
        style={{
          position: 'relative',
        }}
        onClick={(e) => stickerLocateHandler(e, index)}
        className="vote-list__item-img"
      >
        <img
          src={image}
          alt="votedImage"
          className="vote-list__item-img__img"
        />
        {votedStickers.map((sticker) => {
          if (sticker.voteItemId === index) {
            return (
              <VotedSticker
                sticker={sticker}
                isFocused={sticker.id === focusSticker?.id}
                stickerFocusHandler={(focus) => setFocusSticker(focus)}
                stickerSize={stickerSize}
              />
            );
          }
        })}

        <div
          className={`vote-list__item-description-background ${
            isHover && 'visible'
          }`}
        >
          <div className="vote-list__item-description">{content}</div>
        </div>
        <button
          onBlur={() => setIsHover(!isHover)}
          onClick={() => setIsHover(!isHover)}
          type="button"
          className="vote-list__item-info-button"
        >
          <img alt="info" src="vote_item_info.png" />
        </button>
      </div>
    </li>
  );
}

export default VoteListItem;
