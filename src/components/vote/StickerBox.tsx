import useUploadSticker from '../../hooks/useUploadSticker';
import { StickerBoxProps } from '../../interfaces/VoteInterface';

function StickerBox({
  isVoted,
  stickerVoteHandler,
  revoteHandler,
  selectedSticker,
}: StickerBoxProps) {
  //스티커만 선택
  //투표했는지에 따라 다른 컴포넌트 보여줌
  //재투표
  //스티커 업로드

  const windowWidth: number = window.innerWidth;
  const stickers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const stickerWidth: number = (55 / 1920) * windowWidth;
  const {
    fileRef,
    uploadSticker,
    fileHandler,
    handleChange,
    deleteUploadSticker,
  } = useUploadSticker();

  return (
    <section className="sticker-box">
      <h3 className="sub-title">{isVoted ? '내 투표' : '스티커'}</h3>
      {isVoted ? (
        <section className="voted-sticker-info">
          <img alt="voted-sticker" />
          <div className="voted-sticker-info__info">
            <div className="voted-sticker-info__info-title">
              <div>1</div>
              <span>투표한 아이템 이름</span>
            </div>
            <p>
              일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십
            </p>
          </div>
        </section>
      ) : (
        <div className="sticker-list">
          {stickers.map((item) => (
            <button
              style={{
                width: stickerWidth,
                height: stickerWidth,
              }}
              onClick={() => stickerVoteHandler(item, '')}
              type="button"
              className={`sticker-list__sticker ${
                selectedSticker?.id === item && 'selected'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      {isVoted ? (
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
            <img alt="delete_sicker" src="delete_sticker.png" />
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
          <img
            className="sticker-box__button-icon"
            src="add_plus.png"
            alt="plus"
          />
          PNG 스티커 만들기
        </button>
      )}
    </section>
  );
}

export default StickerBox;
