import React, { useEffect } from 'react';
import '../styles/start.scss';

function Start() {
  return (
    <div className="start_container">
      <div className="start_elements">
        <div className="start_title">Too it!</div>
        <div className="start_text_medium">투잇 시작하기</div>
        <div className="start_text_regular">
          아래 SNS연동을 통해 회원가입을 진행해주세요
        </div>
        <div className="start_snsBtns">
          <button
            onClick={() =>
              window.open('http://localhost:8080/oauth2/authorization/naver')
            }
          >
            <img
              alt="twitter"
              src="https://tooit-icon.s3.ap-northeast-2.amazonaws.com/twitter.png"
            />
          </button>
          <button
            onClick={() =>
              window.open('http://localhost:8080/oauth2/authorization/kakao')
            }
          >
            <img
              alt="kakaotalk"
              src="https://tooit-icon.s3.ap-northeast-2.amazonaws.com/kakao.png"
            />
          </button>
          <button
            onClick={() =>
              window.open('http://localhost:8080/oauth2/authorization/google')
            }
          >
            <img
              alt="google"
              src="https://tooit-icon.s3.ap-northeast-2.amazonaws.com/google.png"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Start;
