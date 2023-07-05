import React, { useState } from 'react';
import SimpleSlider from '../components/Carousel';
import '../styles/home.scss';
import { Link } from 'react-router-dom';

function Home() {
  const [category, setCategory] = useState<'new' | 'famous'>('new');

  const newBtnHandler = () => {
    setCategory('new');
    // TODO: 최신순 정렬
  };

  const famousBtnHandler = () => {
    setCategory('famous');
    // TODO: 인기순 정렬
  };

  return (
    <div>
      {SimpleSlider()}
      <div className="vote_container">
        <div className="vote_btn_container">
          <button
            type="button"
            className={`${category === 'new' && 'select'} new`}
            onClick={newBtnHandler}
          >
            최신순
          </button>
          <button
            type="button"
            className={`${category === 'famous' && 'select'} famous`}
            onClick={famousBtnHandler}
          >
            인기순
          </button>
        </div>

        <div className="vote_rows">
          <div className="cards_row">
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="cards_row">
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
            <div className="vote_card">
              <Link to="/vote">
                <div className="vote_header">
                  <div className="vote_image">
                    <img src="img\sampleImage1.png" />
                  </div>
                  <div className="vote_remain">D-day</div>
                </div>
                <div className="vote_title">저녁메뉴추천받아요</div>
                <div className="vote_description">오늘저녁뭐먹지</div>
                <div className="vote_footer">
                  <div className="vote_due">마감일 2023.05.14 13:00</div>
                  <div className="vote_number">
                    <img src="too_it_icon\png\Vote.png" />
                    23
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
