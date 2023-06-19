import React, { useEffect } from 'react';
import '../styles/messageModal.scss';

interface MessageModalProps {
  message: string;
  buttonText: string;
  buttonColor: string;
  visible: boolean;
  cancelHandler: () => void;
  buttonHandler: () => void;
}

function MessageModal({
  message,
  buttonText,
  buttonColor,
  visible,
  cancelHandler,
  buttonHandler,
}: MessageModalProps) {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [visible]);

  return (
    <div className={`messageModal ${visible && 'visible'}`}>
      <div
        role="presentation"
        className="messageModal__background"
        onKeyDown={cancelHandler}
        onClick={cancelHandler}
      />
      <section className="messageModal__box">
        <div className="messageModal__message">{message}</div>
        <div className="messageModal__button-box">
          <button onClick={cancelHandler} type="button">
            취소
          </button>
          <button
            onClick={buttonHandler}
            style={{ backgroundColor: buttonColor }}
            type="button"
          >
            {buttonText}
          </button>
        </div>
      </section>
    </div>
  );
}

export default MessageModal;
