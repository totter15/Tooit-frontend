import useUploadSticker from '../../hooks/useUploadSticker';
import { StickerBoxProps } from '../../interfaces/VoteInterface';

function MobileStickerBox({
  isVoted,
  stickerVoteHandler,
  revoteHandler,
  selectedSticker,
}: StickerBoxProps) {
  const stickers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const {
    fileRef,
    uploadSticker,
    fileHandler,
    handleChange,
    deleteUploadSticker,
  } = useUploadSticker();

  return (
    <section className="sticker-box-mobile">
      {isVoted ? (
        <section className="voted-sticker-info">
          <img alt="voted-sticker" />
          <div className="voted-sticker-info__info">
            <div className="voted-sticker-info__info-title">
              <div>1</div>
              <span>아이템 adsfadsf adsfadskfndksnadfkls</span>
            </div>
            <p>
              일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십
            </p>
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
              onClick={() => stickerVoteHandler(sticker, 'url')}
              type="button"
              className={`sticker-box-mobile__sticker ${
                selectedSticker?.id === sticker && 'selected'
              }`}
            >
              {sticker}
            </button>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MobileStickerBox;
