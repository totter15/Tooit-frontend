import React, { useCallback, useState } from 'react';
import '../styles/vote.scss';
import VoteModal from '../components/vote/VoteModal';
import ReVoteModal from '../components/vote/ReVoteModal';
import VoteDeleteModal from '../components/vote/VoteDeleteModal';
import VoteEditModal from '../components/vote/VoteEditModal';
import Wrapper from '../components/Wrapper';
import useResponsive from '../hooks/useResponsive';
import VoteList from '../components/vote/VoteList';
import {
  VotedStickerType,
  VotedStickersType,
} from '../interfaces/VoteInterface';
import VoteGraph from '../components/vote/VoteGraph';
import MobileVoteGraph from '../components/vote/MobileVoteGraph';
import StickerBox from '../components/vote/StickerBox';
import MobileStickerBox from '../components/vote/MobileStickerBox';
import VoteInfoHeader from '../components/vote/VoteInfoHeader';
import VoteDescription from '../components/vote/VoteDescription';
import DeadlineShare from '../components/vote/DeadlineShare';
import { useQuery } from 'react-query';
import { getVote } from '../apis/vote';
import { useParams } from 'react-router-dom';

function Vote() {
  const { voteId } = useParams();
  const { data: voteData } = useQuery(
    ['voteData', voteId],
    () => voteId && getVote(+voteId),
  );
  console.log(voteId, voteData);

  const { isTablet } = useResponsive();
  const windowWidth: number = window.innerWidth;
  const windowHeight: number = window.innerHeight;
  const voteItemWidth: number = isTablet ? windowWidth : windowHeight * 0.7;

  const [voteModalVisible, setVoteModalVisible] = useState<boolean>(false);
  const [revoteModalVisible, setRevoteModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  const [myVote, setMyVote] = useState<VotedStickerType | null>(null);

  const [selectedSticker, setSelectedSticker] = useState<{
    id: number;
    url: string;
  } | null>(null);
  const [votedStickers, setVotedStickers] = useState<VotedStickersType>([]);
  const [uploadSticker, setUploadSticker] = useState<{
    file: File;
    imagePreviewUrl: string;
  } | null>(null);

  const { items } = voteData ?? {};

  function stickerVoteHandler(id: number, url: string) {
    setSelectedSticker({ id, url });
  }

  const stickerLocateHandler = useCallback(
    (e: any, voteItemId: number) => {
      if (selectedSticker) {
        setMyVote({
          voteItemId,
          id: selectedSticker.id,
          x: `${(e.nativeEvent.offsetX / voteItemWidth) * 100}%`,
          y: `${(e.nativeEvent.offsetY / voteItemWidth) * 100}%`,
          img: selectedSticker.url,
          nickname: '익명',
        });
        setVoteModalVisible(true);
        setUploadSticker(null);
      }
    },
    [votedStickers, selectedSticker, uploadSticker],
  );

  const stickerMessageHandler = useCallback(
    (nickname: string, comment: string) => {
      if (myVote) {
        const votedSticker = { ...myVote, nickname, comment };
        setMyVote(votedSticker);

        setVotedStickers([...votedStickers, votedSticker]);
      }

      setVoteModalVisible(false);
      setSelectedSticker(null);
      setUploadSticker(null);
    },
    [myVote],
  );

  const stickerHandler = useCallback(() => {
    setVoteModalVisible(false);
    setSelectedSticker(null);
    myVote && setVotedStickers([...votedStickers, myVote]);
  }, [myVote]);

  const revoteCancelHandler = useCallback(() => {
    setRevoteModalVisible(false);
  }, []);

  const revoteHandler = useCallback(() => {
    // TODO : revote
    setMyVote(null);
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

  if (!voteData) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Wrapper>
        <main className="vote">
          <section className="vote-info">
            <VoteInfoHeader
              editModalHandler={() => setEditModalVisible(true)}
              deleteModalHandler={() => setDeleteModalVisible(true)}
            />
            <VoteDescription />
            <DeadlineShare />
            <StickerBox
              stickerVoteHandler={stickerVoteHandler}
              selectedSticker={selectedSticker}
              revoteHandler={() => setRevoteModalVisible(true)}
              myVote={myVote}
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
            stickerVoteHandler={stickerVoteHandler}
            selectedSticker={selectedSticker}
            revoteHandler={() => setRevoteModalVisible(true)}
            myVote={myVote}
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
