import React from 'react';
import Wrapper from '../components/vote/Wrapper';

function My() {
  return (
    <Wrapper>
      <main>
        <section>profile</section>
        <section>
          <div>
            <button type="button">내가 만들 투표</button>
            <button type="button">내가 만들 투표</button>
          </div>
          <div>
            <input type="checkbox" />
            <div>
              <button type="button">투표 마감</button>
              <button type="button">투표 삭제</button>
            </div>
          </div>
          <ul>
            <label>
              <input type="checkbox" />
              <img alt="vote-thumbnail" />
              <div>
                <h2>저녁 메뉴를 골라줘</h2>
                <p>일주일 동안 고생한 나, 저녁 메뉴를 골라줘!</p>
                <div>
                  <div>000명 참여</div>
                  <div>최다 득표 선택자: 마라탕</div>
                </div>
              </div>
              <div>D-day</div>
              {/* <div>소감 작성 완료</div>
                <button>소감 작성</button> */}
            </label>
          </ul>
        </section>
      </main>
    </Wrapper>
  );
}

export default My;
