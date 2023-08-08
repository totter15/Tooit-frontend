import React, { useState } from 'react';
import '../../styles/voteEditModal.scss';

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
  const [description, setDescription] = useState('');
  const [date, setDate] = useState({ month: 4, date: 10, time: '20:30' });

  const month = Array(12)
    .fill(0)
    .map((_, i) => i + 1);

  const day = Array(31)
    .fill(0)
    .map((_, i) => i + 1);

  return (
    <div className={`edit-modal ${visible && 'visible'}`}>
      <div className="edit-modal__background" />
      <div className="edit-modal__box">
        <form className="edit-modal__input-box">
          <div className="edit-modal__input">
            <label htmlFor="description" className="edit-modal__input-label">
              투표 설명
            </label>
            <div className="edit-modal__description-input-box">
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="edit-modal__description-input"
                id="description"
                placeholder="투표 설명을 입력해 주세요."
                maxLength={50}
              />
              <span className="edit-modal__description-input-count">
                {description.length}/50
              </span>
            </div>
          </div>
          <div className="edit-modal__input">
            <label htmlFor="date" className="edit-modal__input-label">
              투표 기간
            </label>
            <div className="edit-modal__end-date-label">종료 일시</div>
            <div className="edit-modal__end-date-input-box">
              <div>
                <button type="button" className="edit-modal__end-date-input">
                  {date.month}
                </button>
                {/* <ul className="edit-modal__end-date-li">
                  {month.map((m) => (
                    <li>
                      <button
                        className={`edit-modal__end-date-li-item ${
                          m === date.month && 'select'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setDate({ ...date, month: m });
                        }}
                      >
                        {m}
                      </button>
                    </li>
                  ))}
                </ul> */}
                월
              </div>
              <div>
                <button type="button" className="edit-modal__end-date-input">
                  10
                </button>
                일
              </div>
              <button type="button" className="edit-modal__end-time-input">
                20:30
              </button>
            </div>
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
