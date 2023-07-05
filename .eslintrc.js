module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  // prettier는 꼭 배열의 맨 마지막이여야 모든 중복 규칙을 비활성화 시킬 수 있습니다.
  extends: ['airbnb', 'prettier'],
  plugins: ['only-warn', 'prettier'],
  // eslint 제외 폴더 설정
  ignorePatterns: ['node_modules/', 'build/'],
  rules: {
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': 0,
    'prettier/prettier': 'warn',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', 'tsx', '.ts'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        '': 'never',
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelAttributes: ['htmlFor'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
};
