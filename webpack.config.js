const path = require("path");
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: [
          path.resolve(__dirname, 'node_modules/@rneui/base'),
          path.resolve(__dirname, 'node_modules/@rneui/themed'),
          path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
          path.resolve(__dirname, 'node_modules/react-native-ratings'),
          path.resolve(__dirname, 'src'),
        ],
      },
    },
    argv
  );
  // Customize the config before returning it.
  config.resolve.alias['react-native$'] = 'react-native-web'
  return config;
};

