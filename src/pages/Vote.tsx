import React from 'react';
import '../styles/vote.scss';

function Vote() {
  const stickers: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ];

  const graph: number[] = [8, 19, 9, 4];
  const graphTotal: number = graph.reduce((arr, cur) => arr + cur, 0);

  return (
    <>
      <header>header</header>
      <main className="vote">
        <div className="vote__wrapper">
          <section className="vote-info">
            <section className="vote-header">
              <div className="vote-header__back">back</div>
              <div className="vote-header__more">more</div>
            </section>

            {/* VOTE-DESCRIPTION */}
            <div className="vote-description">
              <h1 className="vote-description__title">안녕하세요</h1>
              <span className="vote-description__subInfo">
                <h3 className="vote-description__writer">by 익명</h3>
                <h4 className="vote-description__date">2023.05.17</h4>
              </span>
              <p className="vote-description__description">
                일이삼사오육칠팔구십 어쩌구저쩌구 두줄이고 세줄이 될 수도 있고
              </p>
            </div>

            {/* DEADLINE */}
            <section className="deadline">
              <div>
                <h3 className="sub-title">마감일</h3>
                <div className="deadline__date">2023.05.20</div>
              </div>
              <div className="deadline__dday">D-6</div>
            </section>

            {/* STICKERS */}
            <section className="sticker-box">
              <h3 className="sub-title">스티커</h3>
              <div className="sticker-list">
                {stickers.map(() => (
                  <div className="sticker-list__sticker">.</div>
                ))}
              </div>
              <div className="sticker-box__button">
                <div className="sticker-box__button-icon">+</div>
                <div className="sticker-box__button-text">
                  PNG 스티커 만들기
                </div>
              </div>
            </section>

            {/* VOTE-RESULT */}
            <section className="vote-result">
              <div className="sub-title">투표 현황</div>
              <ul className="vote-result__graph">
                {graph.map((item) => (
                  <li
                    style={{ width: `${(item / graphTotal) * 100}%` }}
                    className="vote-result__graph-item"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* BUTTON */}
            <section className="button-box">
              <div className="button-box__share-button">공유하기</div>
              <div className="button-box__revote-button">다시투표</div>
            </section>
          </section>

          {/* VOTE-LIST */}
          <ul className="vote-list">
            <li className="vote-list__item">
              <div className="vote-list__item-header">
                <div className="vote-list__item-title">
                  <div className="vote-list__item-number">1</div>새우 껍질
                  주새우
                </div>
                <div>save</div>
              </div>
              <div className="vote-list__item-img">.</div>
            </li>
            <li className="vote-list__item">
              <div className="vote-list__item-header">
                <div className="vote-list__item-title">
                  <div className="vote-list__item-number">1</div>새우 껍질
                  주새우
                </div>
                <div>save</div>
              </div>
              <div className="vote-list__item-img">.</div>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}

export default Vote;
