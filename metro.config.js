const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Example: Ignore web-based CSS imports (fixes Mapbox issue)
config.resolver.blockList = [/node_modules\/mapbox-gl\/.*/];

module.exports = config;