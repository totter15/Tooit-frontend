import dateFormat from '../../utils/dateFormat';

function VoteDescription() {
  // TODO : react query getQueryData로 캐싱된 데이터 가져오기
  const mock = {
    id: 16,
    title: '제일 귀여운 춘식이 짤 투표',
    content: '여기서 제일 귀여운 춘식이 골라줘 프사할거임',
    startDate: '2023-07-17 10:22',
    endDate: '2023-07-20 22:11',
    createDate: '2023-07-17 10:55',
    userId: 2,
    nickname: 'aff3411b25',
    items: [
      {
        id: 46,
        image:
          'https://tooit.s3.ap-northeast-2.amazonaws.com/voteImage/e7eecfd8-65ab-4226-b564-8d403049cc68_%E1%84%8E%E1%85%AE%E1%86%AB%E1%84%89%E1%85%B5%E1%86%A81.png',
        stickerCount: 0,
        name: 'itemNameTest',
        content: '춘식1',
        voteId: 16,
      },
      {
        id: 47,
        image:
          'https://tooit.s3.ap-northeast-2.amazonaws.com/voteImage/f1d24f40-7ca5-44a9-8468-4e85b673d513_%E1%84%8E%E1%85%AE%E1%86%AB%E1%84%89%E1%85%B5%E1%86%A82.jpeg',
        stickerCount: 0,
        name: 'itemNameTest',
        content: '춘식2',
        voteId: 16,
      },
      {
        id: 48,
        image:
          'https://tooit.s3.ap-northeast-2.amazonaws.com/voteImage/e3a603ad-0bfe-4dbf-9643-ab2ba2e74682_%E1%84%8E%E1%85%AE%E1%86%AB%E1%84%89%E1%85%B5%E1%86%A83.jpeg',
        stickerCount: 0,
        name: 'itemNameTest',
        content: '춘식3',
        voteId: 16,
      },
    ],
    dday: 3,
  };

  const { title, content, startDate, nickname } = mock;
  const startDateFormat = dateFormat(startDate);

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
