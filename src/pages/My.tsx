import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import '../styles/my.scss';
import MessageModal from '../components/MessageModal';
import CommentModal from '../components/my/CommentModal';
import { useQuery, useQueryClient } from 'react-query';
import { getUserInfo } from '../apis/user';
import useMyVote from '../hooks/useMyVote';
import useMyVoting from '../hooks/useMyVoting';
import VoteItem from '../components/my/VoteItem';
import { deadlineVote, deleteVote, reviewVote } from '../apis/vote';

const votes = [1, 2, 3, 4, 5];

function My() {
  const queryClient = useQueryClient();
  const { data } = useQuery(['userData'], getUserInfo);
  const { email, nickname } = data ?? {};

  const { voteList } = useMyVote();
  const { votingList } = useMyVoting();

  const [category, setCategory] = useState<'made' | 'vote'>('made');
  const [selected, setSelected] = useState<number[]>([]);

  const listData = category === 'made' ? voteList : votingList;

  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [closeModalVisible, setCloseModalVisible] = useState<boolean>(false);
  const [commentModalVisible, setCommentModalVisible] =
    useState<boolean>(false);
  const [reviewItem, setReviewItem] = useState<number | null>(null);

  function selectHandler(id: number) {
    const items = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id];
    setSelected(items);
  }

  const deleteVoteHandler = useCallback(async () => {
    const data = await deleteVote(selected);
    if (data) {
      queryClient.invalidateQueries(['myVote']);
      setDeleteModalVisible(false);
      setSelected([]);
    }
  }, [selected]);

  const closeVoteHandler = useCallback(async () => {
    const data = await deadlineVote(selected);
    if (data) {
      queryClient.invalidateQueries(['myVote']);
      setCloseModalVisible(false);
      setSelected([]);
    }
  }, [selected]);

  const submitCommentHandler = useCallback(
    async (content: string) => {
      if (reviewItem) {
        const data = await reviewVote({ content, voteId: reviewItem });
        if (data) {
          setReviewItem(null);
          setCommentModalVisible(false);
        }
      }
    },
    [reviewItem],
  );

  return (
    <>
      <Wrapper>
        <main className="my">
          <section className="my__profile-box">
            <div>
              <div className="my__profile-email">{email}</div>
              <div className="my__profile-name">{nickname} 님</div>
            </div>
            <Link to="/account" className="my__profile-button">
              내 정보 관리
            </Link>
          </section>
          <section className="vote-control-box">
            <div className="vote-control-box__button-box">
              <button
                onClick={() => setCategory('made')}
                type="button"
                className={`${category === 'made' && 'select'}`}
              >
                내가 제작한 투표
              </button>
              <button
                onClick={() => setCategory('vote')}
                type="button"
                className={`${category === 'vote' && 'select'}`}
              >
                내가 참여한 투표
              </button>
            </div>

            <div className="vote-control-box__vote-control">
              <input
                type="checkbox"
                onChange={(e) =>
                  e.target.checked ? setSelected(votes) : setSelected([])
                }
              />
              <div
                className={`vote-control-box__control-button ${
                  selected.length > 0 && 'active'
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    selected.length > 0 && setCloseModalVisible(true)
                  }
                >
                  투표 마감
                </button>
                <button
                  type="button"
                  onClick={() =>
                    selected.length > 0 && setDeleteModalVisible(true)
                  }
                >
                  투표 삭제
                </button>
              </div>
            </div>

            <ul className="vote-control-box__list">
              {listData?.map((item: any) => (
                <VoteItem
                  key={item.id}
                  item={item}
                  isSelected={selected.includes(item.id)}
                  selectHandler={selectHandler}
                  commentModalVisible={() => {
                    setCommentModalVisible(true);
                    setReviewItem(item.id);
                  }}
                />
              ))}
            </ul>
          </section>
        </main>
      </Wrapper>

      <MessageModal
        message="선택한 투표글을 삭제하시겠습니까?"
        visible={deleteModalVisible}
        buttonText="삭제"
        buttonColor="#EA5400"
        cancelHandler={() => setDeleteModalVisible(false)}
        buttonHandler={deleteVoteHandler}
      />
      <MessageModal
        message="선택한 투표글을 마감하시겠습니까?"
        visible={closeModalVisible}
        buttonText="마감"
        buttonColor="#52588B"
        cancelHandler={() => setCloseModalVisible(false)}
        buttonHandler={closeVoteHandler}
      />
      <CommentModal
        visible={commentModalVisible}
        cancelHandler={() => setCommentModalVisible(false)}
        submitHandler={submitCommentHandler}
      />
    </>
  );
}

export default My;
