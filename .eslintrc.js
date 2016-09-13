module.exports = {
  extends: 'guo',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      'jsx': true,
    },
  },
  plugins: [
    'react',
    'react-native'
  ],
  rules: {
    // react
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    // react native
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
  },
};
