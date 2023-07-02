import React from 'react';
import '../../styles/voteDeleteModal.scss';

interface VoteDeleteModalProps {
  visible: boolean;
  deleteHandler: () => void;
  cancelHandler: () => void;
}

function VoteDeleteModal({
  visible,
  deleteHandler,
  cancelHandler,
}: VoteDeleteModalProps) {
  return (
    <div className={`delete-modal ${visible && 'visible'}`}>
      <div className="delete-modal__background" />
      <div className="delete-modal__box">
        <div className="delete-modal__box-text">
          선택한 투표글을 삭제하시겠습니까?
        </div>
        <div className="delete-modal__button-box">
          <button type="button" onClick={cancelHandler}>
            취소
          </button>
          <button type="button" onClick={deleteHandler}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoteDeleteModal;
