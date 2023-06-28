module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  // prettier는 꼭 배열의 맨 마지막이여야 모든 중복 규칙을 비활성화 시킬 수 있습니다.
  extends: ['airbnb', 'prettier'],
  // 경고 대신 에러가 나오게끔 하려면 only-warn 삭제
  plugins: ['only-warn', 'prettier'],
  // eslint 제외 폴더 설정
  ignorePatterns: ['node_modules/', 'build/'],
  rules: {
    'prettier/prettier': 'warn',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
