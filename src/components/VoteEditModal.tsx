import React from 'react';
import '../styles/voteEditModal.scss';

interface VoteEditModalProps {
  visible: boolean;
  cancelHandler: () => void;
  editHandler: () => void;
}

function VoteEditModal({
  visible,
  cancelHandler,
  editHandler,
}: VoteEditModalProps) {
  return (
    <div className={`edit-modal ${visible && 'visible'}`}>
      <div className="edit-modal__background" />
      <div className="edit-modal__box">
        <form className="edit-modal__input-box">
          <div>
            <label htmlFor="description">
              투표 설명
              <input
                id="description"
                placeholder="투표 설명을 입력해 주세요."
              />
            </label>
          </div>
          <div>
            <label htmlFor="date">
              투표 기간<div>종료 일시</div>
              <input id="date" />월 <input id="date" />일 <input id="date" />
            </label>
          </div>
        </form>
        <div className="edit-modal__button-box">
          <button type="button" onClick={cancelHandler}>
            취소
          </button>
          <button type="button" onClick={editHandler}>
            수정
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoteEditModal;
