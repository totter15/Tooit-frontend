import React, { useState } from 'react';
import '../styles/makeVote.scss';

function MakeVote() {
  const [voteTitle, setVoteTitle] = useState<string>('');
  const [voteDescription, setVoteDescription] = useState<string>('');
  const [target, setTarget] = useState<'all' | 'link'>('all');

  const addBtnHandler = () => {
    // TODO: 선택지 추가
  };

  return (
    <div>
      <div className="makeVote_container">
        <div className="titleText">투표 만들기</div>
        <div className="simpleText">오늘은 어떤 투표를 만들어볼까요?</div>
        <form id="vote" className="voteInputs">
          <div className="title">
            <label className="voteText" htmlFor="vote_title">
              투표 제목
            </label>
            <div className="vote_input">
              <input
                id="vote_title"
                className="titleInput inputText"
                onChange={(e) => setVoteTitle(e.target.value)}
                type="text"
                placeholder="투표 제목을 입력해주세요"
                maxLength={30}
              />
              <div className="counter">
                <span className="counterText">{voteTitle.length}/30</span>
              </div>
            </div>
          </div>
          <div className="description">
            <label className="voteText" htmlFor="vote_description">
              투표 설명
            </label>
            <div className="vote_input">
              <input
                id="vote_description"
                className="descriptionInput inputText"
                onChange={(e) => setVoteDescription(e.target.value)}
                type="text"
                placeholder="투표 설명을 입력해주세요"
                maxLength={50}
              />
              <div className="counter">
                <span className="counterText">{voteDescription.length}/50</span>
              </div>
            </div>
          </div>
          <div className="voteList">
            <div className="voteText">선택지 등록</div>
            <div className="vote_ele">
              <div className="eleText">
                <span>1번</span>
              </div>
              <div className="vote_ele_inputs">
                <div className="vote_input_file">
                  <label htmlFor="vote_ele_1_pic">
                    <div>
                      <img
                        alt="Search"
                        src="too_it_icon/png/Image Search_gray.png"
                      />
                    </div>
                    <div>썸네일 추가</div>
                  </label>
                  <input type="file" id="vote_ele_1_pic" accept=".jpg, .png" />
                </div>
                <div className="vote_input_text">
                  <div className="vote_input_50">
                    <input
                      className="inputText"
                      type="text"
                      id="vote_ele_1_title"
                      placeholder="선택지 제목을 입력해주세요"
                      maxLength={30}
                    />
                    <div className="counter">
                      <span className="counterText">12/30</span>
                    </div>
                  </div>
                  <div className="vote_input_150">
                    <textarea
                      className="inputText"
                      id="vote_ele_1_description"
                      placeholder="선택지 설명을 입력해주세요"
                      maxLength={50}
                    />
                    <div className="counter">
                      <span className="counterText">34/50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="vote_ele">
              <div className="eleText">
                <span>1번</span>
              </div>
              <div className="vote_ele_inputs">
                <div className="vote_input_file">
                  <label htmlFor="vote_ele_1_pic">
                    <div>
                      <img
                        alt="Search"
                        src="too_it_icon/png/Image Search_gray.png"
                      />
                    </div>
                    <div>썸네일 추가</div>
                  </label>
                  <input type="file" id="vote_ele_1_pic" accept=".jpg, .png" />
                </div>
                <div className="vote_input_text">
                  <div className="vote_input_50">
                    <input
                      className="inputText"
                      type="text"
                      id="vote_ele_1_title"
                      placeholder="선택지 제목을 입력해주세요"
                      maxLength={30}
                    />
                    <div className="counter">
                      <span className="counterText">12/30</span>
                    </div>
                  </div>
                  <div className="vote_input_150">
                    <textarea
                      className="inputText"
                      id="vote_ele_1_description"
                      placeholder="선택지 설명을 입력해주세요"
                      maxLength={50}
                    />
                    <div className="counter">
                      <span className="counterText">34/50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="add_ele">
              <button type="button" onClick={addBtnHandler}>
                선택지 추가
              </button>
            </div>
          </div>
          <hr></hr>
          <div className="voteText">투표 기간</div>
          <div>
            <label className="timeText" htmlFor="startTime">
              시작 일시
            </label>
            <div>
              <input type="datetime-local" id="startTime" />
              <input type="checkbox" id="startnow" />
              <label htmlFor="startnow" className="subtitle16">
                지금부터
              </label>
            </div>
          </div>
          <div>
            <label className="timeText" htmlFor="endTime">
              종료 일시
            </label>
            <div>
              <input type="datetime-local" id="endTime" />
            </div>
          </div>
          <div className="voteText">투표 대상</div>
          <div className="voteTargetButtons">
            <button
              type="button"
              className={`${target === 'all' && 'select'} allBtn`}
              onClick={() => setTarget('all')}
            >
              모든 사용자
            </button>
            <button
              type="button"
              className={`${target === 'link' && 'select'} linkBtn`}
              onClick={() => setTarget('link')}
            >
              링크를 가지고 있는 사용자
            </button>
          </div>
          <div className="warnText">
            *링크를 갖고 있는 사용자를 대상으로 지정할 경우, 홈화면에서 노출되지
            않습니다.
          </div>
        </form>
        <div>
          <button className="submitBtn" type="submit" form="vote">
            submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakeVote;
