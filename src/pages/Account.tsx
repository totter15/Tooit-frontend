import React, { useState } from 'react';
import '../styles/account.scss';
import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';

function Account() {
  const [nickname, setNickname] = useState<string>('');

  return (
    <Wrapper>
      <main className="account">
        <h1 className="account__title">내 정보 수정</h1>
        <section className="account__box">
          <form className="nickname">
            <label htmlFor="nickname">닉네임</label>
            <div className="nickname__input-box">
              <input
                value={nickname}
                id="nickname"
                onChange={(e) => setNickname(e.target.value)}
                maxLength={15}
                className="nickname__input"
              />
              <div className="nickname__count">{nickname.length}/15</div>
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
    </Wrapper>
  );
}

export default Account;
