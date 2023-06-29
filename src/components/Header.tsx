import React, { useState } from 'react';
import '../styles/header.scss';

function Header() {
  const logoutBtnHandler = () => {
    // 누르면 로그아웃 처리
    window.location.href = '/';
  };

  const makeVoteBtnHandler = () => {
    window.location.href = '/makeVote';
  };

  const loginUserBtnHandler = () => {
    window.location.href = '/my';
  };

  return (
    <header>
      <div className="header_title">Too it!</div>
      <div className="buttons">
        <button className="btnLogout" onClick={logoutBtnHandler}>
          로그아웃
        </button>
        <button className="btnMakeVote" onClick={makeVoteBtnHandler}>
          투표 만들기
        </button>
        <button className="loginUser" onClick={loginUserBtnHandler}>
          <img alt="Person" src="too_it_icon/png/Person.png" />
        </button>
      </div>
    </header>
  );
}
export default Header;
