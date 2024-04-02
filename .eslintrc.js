module.exports = {
  root: true,
  extends: ['@react-native', 'prettier/prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 0,
    curly: 'off',
    'no-fallthrough': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
};
