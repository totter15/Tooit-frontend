function VoteItem({
  item,
  isSelected,
  selectHandler,
  commentModalVisible,
}: {
  item: any;
  isSelected: boolean;
  selectHandler: (id: number) => void;
  commentModalVisible: () => void;
}) {
  const {
    title,
    content,
    dday,
    numberPersons,
    reviewFlag,
    thumbnail,
    topItem,
  } = item ?? {};

  var regex = /[^0-9]/g;
  const is_end = dday.replace(regex, '') * 1 < 0;
  const not_review = is_end && !reviewFlag;

  return (
    <div className={`vote-control-box__list-item ${isSelected && 'select'}`}>
      <input
        type="checkbox"
        onChange={() => selectHandler(item.id)}
        checked={isSelected}
      />
      <button type="button" className="item-detail__thumbnail">
        <img alt="vote-thumbnail" src={thumbnail} />
      </button>
      <div className="item-detail">
        <button type="button">
          <h2 className="item-detail__title">{title}</h2>
        </button>

        <p className="item-detail__description">{content}</p>
        <div className="item-detail__result">
          <div>{numberPersons}</div>
          <div>최다 득표 선택자: {topItem}</div>
        </div>
      </div>
      <div className="item-detail__type-box">
        {!is_end ? (
          <div className="d-day">D-30</div>
        ) : not_review ? (
          <button
            type="button"
            className="review"
            onClick={commentModalVisible}
          >
            소감 작성
          </button>
        ) : (
          <div className="review-done">소감 작성 완료</div>
        )}
      </div>
      <div className="item-detail__line" />
    </div>
  );
}

export default VoteItem;
