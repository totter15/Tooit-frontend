import useUploadSticker from '../../hooks/useUploadSticker';
import { StickerBoxProps } from '../../interfaces/VoteInterface';
import ShareModal from './ShareModal';
import stickers from '../../statics/stickers.json';
import Sticker from './Sticker';
import { useEffect } from 'react';
import Icon from '../common/Icon';

function StickerBox({
  stickerVoteHandler,
  revoteHandler,
  selectedSticker,
  myVote,
}: StickerBoxProps) {
  //스티커만 선택
  //투표했는지에 따라 다른 컴포넌트 보여줌
  //재투표
  //스티커 업로드

  const windowWidth: number = window.innerWidth;
  const stickerWidth: number = (55 / 1920) * windowWidth;
  const {
    fileRef,
    uploadSticker,
    fileHandler,
    handleChange,
    deleteUploadSticker,
  } = useUploadSticker();
  const { voteItemId, img, comment } = myVote ?? {};

  useEffect(() => {
    uploadSticker && stickerVoteHandler(11, uploadSticker.imagePreviewUrl);
  }, [uploadSticker]);

  return (
    <section className="sticker-box">
      <h3 className="sub-title">{!!myVote ? '내 투표' : '스티커'}</h3>
      {!!myVote ? (
        <section className="voted-sticker-info">
          <img alt="voted-sticker" src={img} />
          <div className="voted-sticker-info__info">
            <div className="voted-sticker-info__info-title">
              <div>{voteItemId}</div>
              <span>투표한 아이템 이름</span>
            </div>
            <p>{comment}</p>
          </div>
        </section>
      ) : (
        <div className="sticker-list">
          {stickers.map((item) => (
            <Sticker
              key={item.id}
              sticker={item}
              size={stickerWidth}
              voteHandler={() => stickerVoteHandler(item.id, item.src)}
              isSelected={selectedSticker?.id === item.id}
            />
          ))}
        </div>
      )}
      {!!myVote ? (
        <button
          type="button"
          className="sticker-box__button done"
          onClick={revoteHandler}
        >
          다시 투표
        </button>
      ) : uploadSticker ? (
        <div className="sticker-box__upload-sticker-box">
          <img
            className="sticker-box__upload-sticker"
            src={uploadSticker?.imagePreviewUrl}
            alt="upload_sticker"
          />
          <span className="sticker-box__sticker-name">
            {uploadSticker?.file.name}
          </span>
          <button
            type="button"
            className="sticker-box__delete-button"
            onClick={deleteUploadSticker}
          >
            <Icon name="delete_sticker" alt="delete_sticker" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="sticker-box__button"
          onClick={fileHandler}
        >
          <input
            type="file"
            id="fileUpload"
            ref={fileRef}
            onChange={handleChange}
            accept="image/png"
            style={{ display: 'none' }}
          />
          <Icon
            name="add_plus"
            alt="plus"
            className="sticker-box__button-icon"
          />
          PNG 스티커 만들기
        </button>
      )}
    </section>
  );
}

export default StickerBox;
