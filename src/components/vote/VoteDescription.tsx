import { useQueryClient } from 'react-query';
import dateFormat from '../../utils/dateFormat';
import { useParams } from 'react-router-dom';
import { VoteListType } from '../../interfaces/VoteInterface';

function VoteDescription() {
  const { voteId } = useParams();
  const queryClient = useQueryClient();
  const voteData: VoteListType | undefined = queryClient.getQueryData([
    'voteData',
    voteId,
  ]);

  const { title, content, startDate, nickname } = voteData ?? {};
  const startDateFormat = startDate && dateFormat(startDate);

  return (
    <div className="vote-description">
      <h1 className="vote-description__title">{title}</h1>
      <span className="vote-description__subInfo">
        <h3 className="vote-description__writer">by {nickname}</h3>
        <h4 className="vote-description__date">{startDateFormat}</h4>
      </span>
      <p className="vote-description__description">{content}</p>
    </div>
  );
}

export default VoteDescription;
