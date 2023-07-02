import React, { useCallback, useState } from 'react';
import '../styles/vote.scss';
import VoteModal from '../components/vote/VoteModal';
import VoteListItem from '../components/vote/VoteListItem';
import ReVoteModal from '../components/vote/ReVoteModal';
import VoteDeleteModal from '../components/vote/VoteDeleteModal';
import VoteEditModal from '../components/VoteEditModal';
import Wrapper from '../components/Wrapper';

export interface VotedSticker {
  id: number | null;
  x: string;
  y: string;
  nickname?: string;
  comment?: string;
}
export type VotedStickers = VotedSticker[] | [];

function Vote() {
  const windowWidth: number = window.innerWidth;
  const windowHeight: number = window.innerHeight;
  const voteItemWidth: number = windowHeight * 0.8;
  const stickerWidth: number = (55 / 1920) * windowWidth;

  const stickers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const graph: number[] = [8, 19, 9, 4];
  const graphTotal: number = graph.reduce((arr, cur) => arr + cur, 0);

  const [voteModalVisible, setVoteModalVisible] = useState<boolean>(false);
  const [revoteModalVisible, setRevoteModalVisible] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  const [selectedSticker, setSelectedSticker] = useState<number | null>(null);
  const [votedStickers, setVotedStickers] = useState<VotedStickers>([]);

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

  function stickerVoteHandler(id: number) {
    setSelectedSticker(id);
  }

  const stickerLocateHandler = useCallback(
    (e: any) => {
      if (!selectedSticker) return;

      setVotedStickers([
        ...votedStickers,
        {
          id: selectedSticker,
          x: `${(e.nativeEvent.offsetX / voteItemWidth) * 100}%`,
          y: `${(e.nativeEvent.offsetY / voteItemWidth) * 100}%`,
        },
      ]);
      setVoteModalVisible(true);
    },
    [votedStickers, selectedSticker],
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

  return (
    <>
      <Wrapper>
        <main className="vote">
          <section className="vote-info">
            <section className="vote-header">
              <div className="vote-header__back">back</div>
              <button
                type="button"
                className="vote-header__more"
                onFocus={() => setMenuVisible(true)}
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
            <div className="vote-description">
              <h1 className="vote-description__title">
                안녕하세요
                <br />
                어쩌구저쩌구
              </h1>
              <span className="vote-description__subInfo">
                <h3 className="vote-description__writer">by 익명</h3>
                <h4 className="vote-description__date">2023.05.17</h4>
              </span>
              <p className="vote-description__description">
                일이삼사오육칠팔구십 어쩌구저쩌구
                <br />
                두줄이고
              </p>
            </div>

            {/* DEADLINE */}
            <section className="deadline">
              <div>
                <h3 className="sub-title">마감일</h3>
                <div className="deadline__date">2023.05.20</div>
              </div>
              <div className="deadline__dday">D-6</div>
            </section>

            {/* STICKERS */}
            <section className="sticker-box">
              <h3 className="sub-title">스티커</h3>
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
              <div className="sticker-box__button">
                <div className="sticker-box__button-icon">
                  <img src="add_plus.png" alt="plus" />
                </div>
                <button type="button" className="sticker-box__button-text">
                  PNG 스티커 만들기
                </button>
              </div>
            </section>

            {/* VOTE-RESULT */}
            <section className="vote-result">
              <div className="sub-title">투표 현황</div>
              <ul className="vote-result__graph">
                {graph.map((item) => (
                  <li
                    style={{ width: `${(item / graphTotal) * 100}%` }}
                    className="vote-result__graph-item"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* BUTTON */}
            <section className="button-box">
              <button type="button" onClick={shareToKaKaotalk}>
                <img src="share.png" alt="share" />
              </button>
              {/* TODO : 투표한 경우 다시투표 버튼 보이게 */}
              <button type="button" onClick={() => setRevoteModalVisible(true)}>
                다시투표
              </button>
            </section>
          </section>

          {/* VOTE-LIST */}
          <ul className="vote-list">
            <VoteListItem
              stickerLocateHandler={stickerLocateHandler}
              votedStickers={votedStickers}
            />
          </ul>
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
