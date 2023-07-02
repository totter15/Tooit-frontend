import React from 'react';
import '../../styles/revoteModal.scss';

interface RevoteModalProps {
  visible: boolean;
  revoteCancelHandler: () => void;
  revoteHandler: () => void;
}

function ReVoteModal({
  visible,
  revoteCancelHandler,
  revoteHandler,
}: RevoteModalProps) {
  return (
    <div className={`revote-modal ${visible && 'visible'}`}>
      <div className="revote-modal__background" />
      <div className="revote-modal__message-box">
        <div className="revote-modal__message">
          내가 기존에 남겼던 스티커와 코멘트가 사라집니다. 다시
          투표하시겠습니까?
        </div>
        <div className="revote-modal__button-box">
          <button type="button" onClick={revoteCancelHandler}>
            취소
          </button>
          <button type="button" onClick={revoteHandler}>
            다시 투표하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReVoteModal;
