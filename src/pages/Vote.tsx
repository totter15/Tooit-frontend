import React, { useCallback, useState } from 'react';
import '../styles/vote.scss';
import VoteModal from '../components/vote/VoteModal';
import ReVoteModal from '../components/vote/ReVoteModal';
import VoteDeleteModal from '../components/vote/VoteDeleteModal';
import VoteEditModal from '../components/vote/VoteEditModal';
import Wrapper from '../components/Wrapper';
import VoteList from '../components/vote/VoteList';
import VoteGraph from '../components/vote/VoteGraph';
import MobileVoteGraph from '../components/vote/MobileVoteGraph';
import StickerBox from '../components/vote/StickerBox';
import MobileStickerBox from '../components/vote/MobileStickerBox';
import VoteInfoHeader from '../components/vote/VoteInfoHeader';
import VoteDescription from '../components/vote/VoteDescription';
import DeadlineShare from '../components/vote/DeadlineShare';
import { useQuery, useQueryClient } from 'react-query';
import { getVote, putsticker } from '../apis/vote';
import { useParams } from 'react-router-dom';
import useVoteSticker from '../hooks/useVoteSticker';
import { cancelVote } from '../slices/vote';
import { getUserInfo } from '../apis/user';

function Vote() {
  const queryClient = useQueryClient();
  const { voteId } = useParams();
  const { data: voteData } = useQuery(
    ['voteData', voteId],
    () => voteId && getVote(+voteId),
  );

  const {
    locateStickerHandler,
    inputStickerDataHandler,
    sticker: voteSticker,
  } = useVoteSticker();
  const { data } = useQuery(['userData'], getUserInfo);

  const [voteModalVisible, setVoteModalVisible] = useState<boolean>(false);
  const [revoteModalVisible, setRevoteModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  const { items } = voteData ?? {};
  const stickerList = items?.flatMap((item: any) => item.stickerList);
  const mySticker = stickerList?.find(
    (sticker: any) => sticker.userId === data?.id,
  );

  // TODO : 모달을 전역으로 관리하게 되면 VoteListItem으로 옮겨주기
  const stickerLocateHandler = useCallback(
    ({
      x,
      y,
      name,
      id,
      index,
    }: {
      x: number;
      y: number;
      name: string;
      id: number;
      index: number;
    }) => {
      if (mySticker) return;
      if (voteSticker) {
        const nickname = '익명';
        const comment = '';
        locateStickerHandler({
          selectItem: { name, id, index },
          x,
          y,
          nickname,
          comment,
        });
        setVoteModalVisible(true);
      }
    },
    [voteSticker],
  );

  const inputStickerData = (nickname: string, comment: string) => {
    inputStickerDataHandler({ nickname, comment });
    voteHandler({ nickname, comment });
  };

  const voteHandler = async (input?: { nickname: string; comment: string }) => {
    // TODO : 로컬스토리지에 토큰이 없을경우 getIp한 값을 넣어준다.
    try {
      const { x, y, src, itemId, nickname, comment, file } = voteSticker ?? {};
      const data = await putsticker({
        x,
        y,
        content: input ? input.comment : comment,
        nickname: input ? input.nickname : nickname,
        voteItemId: itemId,
        voteId,
        image: src,
        file,
      });

      if (data) {
        setVoteModalVisible(false);
        cancelVote();
        // votePage update
        queryClient.invalidateQueries(['voteData', voteId]);
      }
    } catch (e: any) {
      if (e.toJSON().status === 400) {
        setVoteModalVisible(false);
        cancelVote();
        alert('이미 투표를 했습니다.');
      }
    }
  };

  async function getIp() {
    const ipData = await fetch('https://geolocation-db.com/json/');
    const locationIp = await ipData.json();
    return locationIp.IPv4;
  }

  const voteCancelHandler = useCallback(() => {
    cancelVote();
    setVoteModalVisible(false);
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
              revoteHandler={() => setRevoteModalVisible(true)}
              myVote={mySticker}
            />
            <VoteGraph />
          </section>

          <VoteList items={items} stickerLocateHandler={stickerLocateHandler} />

          {/* MOBILE */}
          <MobileVoteGraph />
          <MobileStickerBox
            revoteHandler={() => setRevoteModalVisible(true)}
            myVote={mySticker}
          />
        </main>
      </Wrapper>

      <VoteModal
        visible={voteModalVisible}
        stickerMessageHandler={inputStickerData}
        stickerHandler={voteHandler}
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
