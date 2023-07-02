import React, { useState } from 'react';
import '../../styles/commentModal.scss';

interface CommentModalProps {
  visible: boolean;
  cancelHandler: () => void;
  submitHandler: () => void;
}

function CommentModal({
  visible,
  cancelHandler,
  submitHandler,
}: CommentModalProps) {
  const [comment, setComment] = useState<string>('');

  function onChangeHandler(e: any) {
    setComment(e.target.value);
  }

  return (
    <div className={`comment-modal ${visible && 'visible'}`}>
      <div className="comment-modal__background" />
      <section className="comment-modal__box">
        <div className="comment-modal__box-content">
          <h1>소감 작성하기</h1>
          <textarea
            value={comment}
            onChange={onChangeHandler}
            placeholder="투표에 대한 코멘트를 써주세요."
            maxLength={50}
          />
          <div
            style={{ color: comment.length === 50 ? '#8089D9' : '#BBBBBB' }}
            className="comment-modal__comment-length"
          >
            {comment.length}/50
          </div>
        </div>

        <div className="comment-modal__button-box">
          <button type="button" onClick={cancelHandler}>
            취소
          </button>
          <button type="button" onClick={submitHandler}>
            작성
          </button>
        </div>
      </section>
    </div>
  );
}

export default CommentModal;
