import useUploadSticker from '../../hooks/useUploadSticker';
import { StickerBoxProps } from '../../interfaces/VoteInterface';
import stickers from '../../statics/stickers.json';
import Sticker from './Sticker';
import { useEffect } from 'react';
import Icon from '../common/Icon';
import useVoteSticker from '../../hooks/useVoteSticker';

function StickerBox({ revoteHandler, myVote }: any) {
  const windowWidth: number = window.innerWidth;
  const stickerWidth: number = (55 / 1920) * windowWidth;

  // TODO : myVote useQuery로 가져오기
  const { selectStickerHandler } = useVoteSticker();
  const {
    fileRef,
    uploadSticker,
    fileHandler,
    handleChange,
    deleteUploadSticker,
  } = useUploadSticker();
  const { index, name, content } = myVote ?? {};
  const { sticker: selectedSticker } = useVoteSticker();

  useEffect(() => {
    uploadSticker &&
      selectStickerHandler({
        stickerId: 11,
        src: uploadSticker.imagePreviewUrl,
        file: uploadSticker.file,
      });
  }, [uploadSticker]);

  useEffect(() => {
    if (!selectedSticker) {
      deleteUploadSticker();
    }
  }, [selectedSticker]);

  return (
    <section className="sticker-box">
      <h3 className="sub-title">{!!myVote ? '내 투표' : '스티커'}</h3>
      {!!myVote ? (
        <section className="voted-sticker-info">
          <img alt="voted-sticker" src={myVote?.image} />
          <div className="voted-sticker-info__info">
            <div className="voted-sticker-info__info-title">
              <div>{index}</div>
              <span>{name}</span>
            </div>
            <p>{content}</p>
          </div>
        </section>
      ) : (
        <div className="sticker-list">
          {stickers.map((item) => (
            <Sticker
              key={item.id}
              sticker={item}
              size={stickerWidth}
              selectHandler={() =>
                selectStickerHandler({
                  stickerId: item.id,
                  src: item.src,
                  file: null,
                })
              }
              isSelected={selectedSticker?.stickerId === item.id}
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
