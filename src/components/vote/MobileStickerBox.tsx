import useUploadSticker from '../../hooks/useUploadSticker';
import { StickerBoxProps } from '../../interfaces/VoteInterface';
import stickers from '../../statics/stickers.json';
import { useEffect } from 'react';
import Icon from '../common/Icon';
import useVoteSticker from '../../hooks/useVoteSticker';

function MobileStickerBox({ revoteHandler, myVote }: StickerBoxProps) {
  const { selectStickerHandler, sticker: selectedSticker } = useVoteSticker();
  const {
    fileRef,
    uploadSticker,
    fileHandler,
    handleChange,
    deleteUploadSticker,
  } = useUploadSticker();

  function stickerVoteHandler(stickerId: number, src: string, file: any) {
    selectStickerHandler({ stickerId, src, file });
  }

  useEffect(() => {
    uploadSticker &&
      stickerVoteHandler(11, uploadSticker.imagePreviewUrl, uploadSticker.file);
  }, [uploadSticker]);

  useEffect(() => {
    if (!selectedSticker) {
      deleteUploadSticker();
    }
  }, [selectedSticker]);

  const { voteItem, sticker } = myVote ?? {};

  return (
    <section className="sticker-box-mobile">
      {!!myVote ? (
        <section className="voted-sticker-info">
          <img alt="voted-sticker" src={sticker?.src} />
          <div className="voted-sticker-info__info">
            <div className="voted-sticker-info__info-title">
              <div>{voteItem?.index}</div>
              <span>아이템 adsfadsf adsfadskfndksnadfkls</span>
            </div>
            <p>{sticker?.comment}</p>
          </div>
          <button type="button" onClick={revoteHandler}>
            다시 투표
          </button>
        </section>
      ) : uploadSticker ? (
        <section className="sticker-box-mobile__upload-sticker-box">
          <img
            className="sticker-box-mobile__upload-sticker"
            alt="upload-sticker"
            src={uploadSticker?.imagePreviewUrl}
          />
          <span className="sticker-box-mobile__sticker-name">
            {uploadSticker?.file.name}
          </span>
          <button
            onClick={deleteUploadSticker}
            type="button"
            className="sticker-box-mobile__delete-button"
          >
            <Icon alt="close" name="delete_sticker" />
          </button>
        </section>
      ) : (
        <ul className="sticker-box-mobile__sticker-list">
          <button
            type="button"
            className="sticker-box-mobile__add-button"
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
            <Icon name="add_sticker_mobile" alt="add_sticker" />
          </button>
          {stickers.map((sticker) => (
            <button
              key={sticker.id}
              onClick={() => stickerVoteHandler(sticker.id, sticker.src, null)}
              type="button"
              className={`sticker-box-mobile__sticker`}
            >
              {selectedSticker?.stickerId === sticker.id && (
                <div className="sticker-box-mobile__sticker-select" />
              )}
              <img
                className="sticker-box-mobile__sticker-img"
                alt="sticker"
                src={sticker.src}
              />
            </button>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MobileStickerBox;
