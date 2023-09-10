import React, { ChangeEvent, useEffect, useState } from 'react';
import '../styles/account.scss';
import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper';
import { useQuery, useQueryClient } from 'react-query';
import useDebounce from '../hooks/useDebounce';
import { changeNickname, getUserInfo } from '../apis/user';

function Account() {
  const queryClient = useQueryClient();
  const { data } = useQuery(['userData'], getUserInfo);
  const { nickname: nickanme_init } = data ?? {};

  const [nickname, setNickname] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    setNickname(nickanme_init || '');
  }, []);

  useDebounce(
    async () => {
      if (nickname && nickname !== nickanme_init) {
        setIsSaving(true);
        const data = await changeNickname(nickname);
        data && queryClient.invalidateQueries('userData');
        data && setTimeout(() => setIsSaving(false), 1000);
      }
    },
    500,
    nickname,
  );

  function onChangeNickname(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setNickname(value);
  }

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
                defaultValue={nickanme_init}
                id="nickname"
                onChange={onChangeNickname}
                maxLength={15}
                className="nickname__input"
              />
              <div className="nickname__count">{nickname.length}/15</div>
            </div>
          </form>
        </section>

        <div className="account__message-box">
          <div className={`account__save-message ${isSaving ? 'show' : ''}`}>
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
