import React, { useCallback, useState } from 'react';
import '../styles/vote.scss';
import VoteModal from '../components/vote/VoteModal';
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
import StickerBox from '../components/vote/StickerBox';
import MobileStickerBox from '../components/vote/MobileStickerBox';
import ShareModal from '../components/vote/ShareModal';

function Vote() {
  const { isTablet } = useResponsive();
  const windowWidth: number = window.innerWidth;
  const windowHeight: number = window.innerHeight;
  const voteItemWidth: number = isTablet ? windowWidth : windowHeight * 0.7;

  const [voteModalVisible, setVoteModalVisible] = useState<boolean>(false);
  const [revoteModalVisible, setRevoteModalVisible] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [shareModalVisible, setShareModalVisible] = useState<boolean>(false);

  const [selectedSticker, setSelectedSticker] = useState<{
    id: number;
    url: string;
  } | null>(null);
  const [votedStickers, setVotedStickers] = useState<VotedStickersType>([]);

  const [uploadSticker, setUploadSticker] = useState<{
    file: File;
    imagePreviewUrl: string;
  } | null>(null);

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

  function stickerVoteHandler(id: number, url: string) {
    setSelectedSticker({ id, url });
  }

  const stickerLocateHandler = useCallback(
    (e: any) => {
      if (selectedSticker) {
        setVotedStickers([
          ...votedStickers,
          {
            id: selectedSticker.id,
            x: `${(e.nativeEvent.offsetX / voteItemWidth) * 100}%`,
            y: `${(e.nativeEvent.offsetY / voteItemWidth) * 100}%`,
            img: selectedSticker.url,
            nickname: '익명',
          },
        ]);
        setVoteModalVisible(true);
        setUploadSticker(null);
        setIsVoted(true);
      }
    },
    [votedStickers, selectedSticker, uploadSticker],
  );

  const stickerMessageHandler = useCallback(
    (nickname: string, comment: string) => {
      if (selectedSticker) {
        setVotedStickers(
          votedStickers.map((sticker) =>
            sticker.id === selectedSticker.id
              ? { ...sticker, nickname, comment }
              : sticker,
          ),
        );

        setVoteModalVisible(false);
        setSelectedSticker(null);
        setUploadSticker(null);
      }
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
      votedStickers.filter((sticker) => sticker.id === selectedSticker?.id),
    );
    setSelectedSticker(null);
  }, []);

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
                onClick={() => setShareModalVisible((prev) => !prev)}
              >
                <img src="share.png" alt="share" />
              </button>
            </div>
            <ShareModal modalVisible={shareModalVisible} title={title} />
            <StickerBox
              isVoted={isVoted}
              stickerVoteHandler={stickerVoteHandler}
              selectedSticker={selectedSticker}
              revoteHandler={() => setRevoteModalVisible(true)}
            />
            <VoteGraph />
          </section>

          <VoteList
            items={items}
            stickerLocateHandler={stickerLocateHandler}
            votedStickers={votedStickers}
          />

          {/* MOBILE */}
          <MobileVoteGraph />
          <MobileStickerBox
            isVoted={isVoted}
            stickerVoteHandler={stickerVoteHandler}
            selectedSticker={selectedSticker}
            revoteHandler={() => setRevoteModalVisible(true)}
          />
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
