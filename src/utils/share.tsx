function share() {
  function shareKakao(
    title: string,
    content: string,
    id: number,
    thumbnail: string,
  ) {
    window.Kakao.Share.sendCustom({
      templateId: 94915,
      templateArgs: {
        send_user: 'TOOIT',
        vote_title: title,
        vote_content: content,
        vote_id: id,
        thumbnail: thumbnail,
      },
    });
  }

  function shareTwitter(title: string, url: string) {
    window.open(
      'https://twitter.com/intent/tweet?text=' + title + '&url=' + url,
    );
  }

  function shareURL(url: string) {
    window.navigator.clipboard.writeText(url).then(() => {
      alert('복사 완료!');
    });
  }

  function shareWeb({
    title,
    text,
    url,
    fallBackFn,
  }: {
    title: string;
    text: string;
    url: string;
    fallBackFn: () => void;
  }) {
    if (navigator.share) {
      navigator
        .share({
          title,
          text,
          url,
        })
        .catch(console.error);
    } else {
      fallBackFn();
    }
  }

  return {
    shareKakao,
    shareTwitter,
    shareURL,
    shareWeb,
  };
}

export default share;
