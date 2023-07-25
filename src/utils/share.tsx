function share() {
  function shareKakao(title: string, id: number) {
    window.Kakao.Share.sendCustom({
      templateId: 94915,
      templateArgs: {
        send_user: 'TOOIT',
        vote_title: title,
        vote_id: id,
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

  return {
    shareKakao,
    shareTwitter,
    shareURL,
  };
}

export default share;
