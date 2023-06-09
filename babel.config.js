module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["transform-inline-environment-variables"],
      ["@babel/plugin-proposal-export-namespace-from"],
      ["react-native-reanimated/plugin"],
      ["module-resolver", {
        "alias": {
          "@assets": "./assets",
          "@books": "./assets/books",
          "@images": "./assets/images",
          "@audio": "./assets/audio"
        }
      }],
    ]
  };
};
