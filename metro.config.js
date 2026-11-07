const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// react-native-maps is native only: bundle a stub on web so `npm run web` works.
const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web' && moduleName === 'react-native-maps') {
    return {
      type: 'sourceFile',
      filePath: path.resolve(__dirname, 'src/web/react-native-maps.tsx'),
    };
  }
  // zustand's ESM build uses import.meta, which breaks the classic-script web bundle: force its CJS build.
  if (platform === 'web' && /^zustand(\/|$)/.test(moduleName)) {
    return { type: 'sourceFile', filePath: require.resolve(moduleName) };
  }
  return (defaultResolveRequest ?? context.resolveRequest)(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' });
