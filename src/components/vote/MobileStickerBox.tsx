import useUploadSticker from '../../hooks/useUploadSticker';
import { StickerBoxProps } from '../../interfaces/VoteInterface';
import stickers from '../../statics/stickers.json';
import { useEffect } from 'react';

function MobileStickerBox({
  stickerVoteHandler,
  revoteHandler,
  selectedSticker,
  myVote,
}: StickerBoxProps) {
  const {
    fileRef,
    uploadSticker,
    fileHandler,
    handleChange,
    deleteUploadSticker,
  } = useUploadSticker();

  useEffect(() => {
    uploadSticker && stickerVoteHandler(11, uploadSticker.imagePreviewUrl);
  }, [uploadSticker]);

  const { comment, voteItemId, img } = myVote ?? {};

  return (
    <section className="sticker-box-mobile">
      {!!myVote ? (
        <section className="voted-sticker-info">
          <img alt="voted-sticker" src={img} />
          <div className="voted-sticker-info__info">
            <div className="voted-sticker-info__info-title">
              <div>{voteItemId}</div>
              <span>아이템 adsfadsf adsfadskfndksnadfkls</span>
            </div>
            <p>{comment}</p>
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
            <img alt="close" src="delete_sticker.png" />
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
            <img src="add_sticker_mobile.png" alt="add_sticker" />
          </button>
          {stickers.map((sticker) => (
            <button
              key={sticker.id}
              onClick={() => stickerVoteHandler(sticker.id, sticker.src)}
              type="button"
              className={`sticker-box-mobile__sticker`}
            >
              {selectedSticker?.id === sticker.id && (
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
