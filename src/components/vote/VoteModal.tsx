import React, { useState } from 'react';
import '../../styles/voteModal.scss';

interface ModalProps {
  visible: boolean;
  stickerMessageHandler: (nickname: string, comment: string) => void;
  stickerHandler: () => void;
}

interface InputProps {
  nickname: string;
  comment: string;
}

function VoteModal({
  visible,
  stickerMessageHandler,
  stickerHandler,
}: ModalProps) {
  const [input, setInput] = useState<InputProps>({ nickname: '', comment: '' });

  function voteHandler() {
    stickerHandler();
  }

  function voteMessageHandler() {
    const { nickname, comment } = input ?? {};
    stickerMessageHandler(nickname, comment);
    setInput({ nickname: '', comment: '' });
  }

  function onChangeInputHandler(e: any) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  return (
    <div className={`vote-modal ${visible && 'visible'}`}>
      <div className="vote-modal__background" />
      <div className="vote-input-box">
        <form className="vote-input-box__form">
          <button className="vote-input-box__back-btn" type="button">
            back
          </button>
          <div className="vote-input-box__title-box">
            <div className="vote-input-box__number">1</div>
            <div className="vote-input-box__vote-title">새우 껍질 주새우</div>
            <div className="vote-input-box__select">선택</div>
          </div>
          <input
            name="nickname"
            value={input.nickname}
            onChange={onChangeInputHandler}
            className="vote-input-box__nickname"
            placeholder="닉네임을 입력해 주세요."
          />
          <textarea
            name="comment"
            value={input.comment}
            onChange={onChangeInputHandler}
            className="vote-input-box__comment"
            placeholder="투표에 대한 코멘트를 써주세요."
          />
        </form>

        <div className="vote-input-box__button-box">
          <button
            onClick={voteHandler}
            type="button"
            className="vote-input-box__vote-btn"
          >
            그냥 투표하기
          </button>
          <button
            onClick={voteMessageHandler}
            type="button"
            className="vote-input-box__vote-btn"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoteModal;
