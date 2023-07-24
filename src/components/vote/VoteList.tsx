import { VoteItemType } from '../../interfaces/VoteInterface';
import { VotedStickers } from '../../pages/Vote';
import VoteListItem from './VoteListItem';

function VoteList({
  items,
  stickerLocateHandler,
  votedStickers,
}: {
  items: VoteItemType[];
  stickerLocateHandler: (e: React.MouseEvent) => void;
  votedStickers: VotedStickers;
}) {
  return (
    <ul className="vote-list">
      {items.map((item) => (
        <VoteListItem
          item={item}
          stickerLocateHandler={stickerLocateHandler}
          votedStickers={votedStickers}
        />
      ))}
    </ul>
  );
}

export default VoteList;
