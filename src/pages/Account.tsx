import React, { useState } from 'react';
import '../styles/account.scss';
import { Link } from 'react-router-dom';

function Account() {
  const [nickname, setNickname] = useState<string>('');
  return (
    <main className="account">
      <h1 className="account__title">내 정보 수정</h1>
      <section className="account__box">
        <button type="button" className="account__profile">
          {/* <div className="account__profile-none">
            <img alt="img-search" src="image_search_white.png" />
            <div>이미지 추가</div>
          </div> */}
          <div className="account__profile-has">
            <button type="button">재등록</button>
            <button type="button">이미지 삭제</button>
            <img alt="profile" />
          </div>
        </button>
        <form className="account__nickname">
          <label htmlFor="nickname">닉네임</label>
          <div>
            <input
              value={nickname}
              id="nickname"
              onChange={(e) => setNickname(e.target.value)}
              maxLength={15}
            />
            <div className="account__nickname-count">{nickname.length}/15</div>
          </div>
        </form>
      </section>

      <div className="account__message-box">
        <div className="account__save-message">
          번경된 내용을 저장중 입니다.
        </div>
        <Link to="/my" className="account__my-button">
          마이페이지로 이동
        </Link>
      </div>
    </main>
  );
}

export default Account;
