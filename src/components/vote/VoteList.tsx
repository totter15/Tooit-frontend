import { VoteListProps } from '../../interfaces/VoteInterface';
import VoteListItem from './VoteListItem';

function VoteList({
  items,
  stickerLocateHandler,
  votedStickers,
}: VoteListProps) {
  return (
    <ul className="vote-list">
      {items?.map((item, i) => (
        <VoteListItem
          key={item.id}
          index={i + 1}
          item={item}
          stickerLocateHandler={stickerLocateHandler}
          votedStickers={votedStickers}
        />
      ))}
    </ul>
  );
}

export default VoteList;
