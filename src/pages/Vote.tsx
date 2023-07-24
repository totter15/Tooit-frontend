import React, { useCallback, useRef, useState } from 'react';
import '../styles/vote.scss';
import VoteModal from '../components/vote/VoteModal';
import VoteListItem from '../components/vote/VoteListItem';
import ReVoteModal from '../components/vote/ReVoteModal';
import VoteDeleteModal from '../components/vote/VoteDeleteModal';
import VoteEditModal from '../components/VoteEditModal';
import Wrapper from '../components/Wrapper';
import useResponsive from '../hooks/useResponsive';
import { Link } from 'react-router-dom';
import dateFormat from '../utils/dateFormat';
import VoteList from '../components/vote/VoteList';
import { VotedStickersType } from '../interfaces/VoteInterface';
import VoteGraph from '../components/vote/VoteGraph';
import MobileVoteGraph from '../components/vote/MobileVoteGraph';

function Vote() {
  const { isTablet } = useResponsive();
  const fileRef = useRef<HTMLInputElement>(null);
  const windowWidth: number = window.innerWidth;
  const windowHeight: number = window.innerHeight;
  const voteItemWidth: number = isTablet ? windowWidth : windowHeight * 0.7;
  const stickerWidth: number = (55 / 1920) * windowWidth;

  const stickers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [voteModalVisible, setVoteModalVisible] = useState<boolean>(false);
  const [revoteModalVisible, setRevoteModalVisible] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [isVoted, setIsVoted] = useState<boolean>(false);

  const [selectedSticker, setSelectedSticker] = useState<number | null>(null);
  const [votedStickers, setVotedStickers] = useState<VotedStickersType>([]);

  const [uploadSticker, setUploadSticker] = useState<{
    file: File;
    imagePreviewUrl: string;
  } | null>(null);

  function shareToKaKaotalk() {
    window.Kakao.Share.sendCustom({
      templateId: 94915,
      templateArgs: {
        send_user: 'TOOIT',
        vote_title: '오늘 머먹지?',
        vote_id: 10,
      },
    });
  }

  const mock = {
    id: 16,
    title: '제일 귀여운 춘식이 짤 투표',
    content: '여기서 제일 귀여운 춘식이 골라줘 프사할거임',
    startDate: '2023-07-17 10:22',
    endDate: '2023-07-20 22:11',
    createDate: '2023-07-17 10:55',
    userId: 2,
    nickname: 'aff3411b25',
    items: [
      {
        id: 46,
        image:
          'https://tooit.s3.ap-northeast-2.amazonaws.com/voteImage/e7eecfd8-65ab-4226-b564-8d403049cc68_%E1%84%8E%E1%85%AE%E1%86%AB%E1%84%89%E1%85%B5%E1%86%A81.png',
        stickerCount: 0,
        name: 'itemNameTest',
        content: '춘식1',
        voteId: 16,
      },
      {
        id: 47,
        image:
          'https://tooit.s3.ap-northeast-2.amazonaws.com/voteImage/f1d24f40-7ca5-44a9-8468-4e85b673d513_%E1%84%8E%E1%85%AE%E1%86%AB%E1%84%89%E1%85%B5%E1%86%A82.jpeg',
        stickerCount: 0,
        name: 'itemNameTest',
        content: '춘식2',
        voteId: 16,
      },
      {
        id: 48,
        image:
          'https://tooit.s3.ap-northeast-2.amazonaws.com/voteImage/e3a603ad-0bfe-4dbf-9643-ab2ba2e74682_%E1%84%8E%E1%85%AE%E1%86%AB%E1%84%89%E1%85%B5%E1%86%A83.jpeg',
        stickerCount: 0,
        name: 'itemNameTest',
        content: '춘식3',
        voteId: 16,
      },
    ],
    dday: 3,
  };

  const { title, content, startDate, endDate, nickname, items, dday } = mock;
  const startDateFormat = dateFormat(startDate);
  const endDateFormat = dateFormat(endDate);

  function stickerVoteHandler(id: number) {
    setSelectedSticker(id);
  }

  const stickerLocateHandler = useCallback(
    (e: any) => {
      if (!selectedSticker && !uploadSticker) return;

      setVotedStickers([
        ...votedStickers,
        {
          id: selectedSticker,
          x: `${(e.nativeEvent.offsetX / voteItemWidth) * 100}%`,
          y: `${(e.nativeEvent.offsetY / voteItemWidth) * 100}%`,
          img: uploadSticker ? uploadSticker?.imagePreviewUrl : '',
          nickname: '익명',
        },
      ]);
      setVoteModalVisible(true);
      setUploadSticker(null);
      setIsVoted(true);
    },
    [votedStickers, selectedSticker, uploadSticker],
  );

  const stickerMessageHandler = useCallback(
    (nickname: string, comment: string) => {
      setVotedStickers(
        votedStickers.map((sticker) =>
          sticker.id === selectedSticker
            ? { ...sticker, nickname, comment }
            : sticker,
        ),
      );

      setVoteModalVisible(false);
      setSelectedSticker(null);
      setUploadSticker(null);
    },
    [votedStickers],
  );

  const stickerHandler = useCallback(() => {
    setVoteModalVisible(false);
    setSelectedSticker(null);
  }, []);

  const revoteCancelHandler = useCallback(() => {
    setRevoteModalVisible(false);
  }, []);

  const revoteHandler = useCallback(() => {
    // TODO : revote
    setIsVoted(false);
    setRevoteModalVisible(false);
  }, []);

  const deleteHandler = useCallback(() => {
    // TODO : delete vote
    setDeleteModalVisible(false);
  }, []);

  const deleteCancelHandler = useCallback(() => {
    setDeleteModalVisible(false);
  }, []);

  const editHandler = useCallback(() => {
    setEditModalVisible(false);
  }, []);

  const editCancelHandler = useCallback(() => {
    setEditModalVisible(false);
  }, []);

  const voteCancelHandler = useCallback(() => {
    setVoteModalVisible(false);
    setVotedStickers(
      votedStickers.filter((sticker) => sticker.id === selectedSticker),
    );
    setSelectedSticker(null);
  }, []);

  const fileHandler = () => {
    if (fileRef) {
      setSelectedSticker(null);
      fileRef.current?.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imagePreviewUrl: string = reader.result as string;
        setUploadSticker({ file, imagePreviewUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const otherOneTouch = () => {
    (document.activeElement as HTMLElement).blur(); // 현재 활성화된 element의 blur 이벤트 호출
  };

  return (
    <>
      <Wrapper>
        <main className="vote">
          <section className="vote-info">
            <section className="vote-header">
              <Link to={'/home'} className="vote-header__back">
                <img src="arrow_back.png" alt="back" />
              </Link>
              <button
                type="button"
                className="vote-header__more"
                onClick={() => setMenuVisible(true)}
                onBlur={() => setMenuVisible(false)}
              >
                <img src="menu.png" alt="menu" />
                <div
                  className={`vote-header__menu-box ${
                    menuVisible && 'visible'
                  }`}
                >
                  <button
                    type="button"
                    onMouseDown={() => setDeleteModalVisible(true)}
                  >
                    삭제
                  </button>
                  <div />
                  <button
                    type="button"
                    onMouseDown={() => setEditModalVisible(true)}
                  >
                    수정
                  </button>
                </div>
              </button>
            </section>

            {/* VOTE-DESCRIPTION */}
            <div className="vote-description" onClick={otherOneTouch}>
              <h1 className="vote-description__title">{title}</h1>
              <span className="vote-description__subInfo">
                <h3 className="vote-description__writer">by {nickname}</h3>
                <h4 className="vote-description__date">{startDateFormat}</h4>
              </span>
              <p className="vote-description__description">{content}</p>
            </div>

            {/* DEADLINE */}
            <div className="deadline-share">
              <section className="deadline">
                <div>
                  <h3 className="sub-title">마감일</h3>
                  <div className="deadline__date">{endDateFormat}</div>
                </div>
                <div className="deadline__dday">D-{dday}</div>
              </section>
              <button
                className="share-btn"
                type="button"
                onClick={shareToKaKaotalk}
              >
                <img src="share.png" alt="share" />
              </button>
            </div>

            {/* STICKERS */}
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
                      onClick={() => stickerVoteHandler(item)}
                      type="button"
                      className={`sticker-list__sticker ${
                        selectedSticker === item && 'selected'
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
                  onClick={() => setRevoteModalVisible(true)}
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
                    onClick={() => setUploadSticker(null)}
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

            <VoteGraph />
          </section>

          {/* VOTE-LIST */}
          <VoteList
            items={items}
            stickerLocateHandler={stickerLocateHandler}
            votedStickers={votedStickers}
          />

          {/* MOBILE */}
          <MobileVoteGraph />

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
                <button
                  type="button"
                  onClick={() => setRevoteModalVisible(true)}
                >
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
                  onClick={() => setUploadSticker(null)}
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
                    onClick={() => stickerVoteHandler(sticker)}
                    type="button"
                    className={`sticker-box-mobile__sticker ${
                      selectedSticker === sticker && 'selected'
                    }`}
                  >
                    {sticker}
                  </button>
                ))}
              </ul>
            )}
          </section>
        </main>
      </Wrapper>

      <VoteModal
        visible={voteModalVisible}
        stickerMessageHandler={stickerMessageHandler}
        stickerHandler={stickerHandler}
        backHandler={voteCancelHandler}
      />
      <ReVoteModal
        visible={revoteModalVisible}
        revoteCancelHandler={revoteCancelHandler}
        revoteHandler={revoteHandler}
      />
      <VoteDeleteModal
        visible={deleteModalVisible}
        deleteHandler={deleteHandler}
        cancelHandler={deleteCancelHandler}
      />
      <VoteEditModal
        visible={editModalVisible}
        editHandler={editHandler}
        cancelHandler={editCancelHandler}
      />
    </>
  );
}

export default Vote;
