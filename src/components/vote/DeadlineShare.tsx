import { useState } from 'react';
import dateFormat from '../../utils/dateFormat';
import ShareModal from './ShareModal';
import share from '../../utils/share';
import useResponsive from '../../hooks/useResponsive';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import Icon from '../common/Icon';

function DeadlineShare() {
  const { voteId } = useParams();
  const queryClient = useQueryClient();
  const voteData: any = queryClient.getQueryData(['voteData', voteId]);
  const { title, content, endDate, dday, id, thumbnail } = voteData ?? {};
  const endDateFormat = endDate && dateFormat(endDate);

  const [shareModalVisible, setShareModalVisible] = useState<boolean>(false);
  const { shareWeb } = share();
  const { isTablet } = useResponsive();

  const shareHandler = () => {
    if (isTablet) {
      shareWeb({
        title: title || '',
        text: content || '',
        url: 'url',
        fallBackFn: () => setShareModalVisible((prev) => !prev),
      });
      return;
    }
    setShareModalVisible((prev) => !prev);
  };

  return (
    <>
      <div className="deadline-share">
        <section className="deadline">
          <div>
            <h3 className="sub-title">마감일</h3>
            <div className="deadline__date">{endDateFormat}</div>
          </div>
          <div className="deadline__dday">D-{dday}</div>
        </section>
        <button className="share-btn" type="button" onClick={shareHandler}>
          <Icon name="share" alt="share" />
        </button>
      </div>
      <ShareModal
        modalVisible={shareModalVisible}
        title={title || ''}
        content={content || ''}
        id={id}
        thumbnail={thumbnail}
      />
    </>
  );
}

export default DeadlineShare;
