import React from 'react';
import '../styles/start.scss';

function Start() {
  const snsBtn1Handler = () => {
    // TODO : 카카오톡 연동
  };

  const snsBtn2Handler = () => {
    // TODO : 구글 연동
  };

  const snsBtn3Handler = () => {
    // TODO : 페이스북?
  };

  return (
    <div className="start_container">
      <div className="start_elements">
        <div className="start_title">Too it!</div>
        <div className="start_text_medium">투잇 시작하기</div>
        <div className="start_text_regular">
          아래 SNS연동을 통해 회원가입을 진행해주세요
        </div>
        <div className="start_snsBtns">
          <button onClick={snsBtn1Handler}>1</button>
          <button onClick={snsBtn2Handler}>1</button>
          <button onClick={snsBtn3Handler}>1</button>
        </div>
      </div>
    </div>
  );
}

export default Start;
