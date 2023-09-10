import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon';

function VoteInfoHeader({
  editModalHandler,
  deleteModalHandler,
}: {
  editModalHandler: () => void;
  deleteModalHandler: () => void;
}) {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  return (
    <section className="vote-header">
      <Link to={'/home'} className="vote-header__back">
        <Icon name="arrow_back" alt="back" />
      </Link>

      <button
        type="button"
        className="vote-header__more"
        onClick={() => setMenuVisible(true)}
        onBlur={() => setMenuVisible(false)}
      >
        <Icon name="menu" alt="menu" />
      </button>

      <div className={`vote-header__menu-box ${menuVisible && 'visible'}`}>
        <button type="button" onMouseDown={deleteModalHandler}>
          삭제
        </button>
        <div />
        <button type="button" onMouseDown={editModalHandler}>
          수정
        </button>
      </div>
    </section>
  );
}

export default VoteInfoHeader;
