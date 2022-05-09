---
title: 1.8.x to v1.9.x
description: ''
position: 15
category: Migration
---

## Module Option `webpack` removed

The moduel option `webpack` has been removed and replaced by the function `webpackExtend` in the Entry Options.

[Learn more about `webpackExtend`](/options#entry)

**Before:**
```javascript
{
  webpack: {
    publicPathInject: () => global.externalPublicPath,
    output: { 
      publicPath: './'
    },
    optimization: { … },
    plugins: [ … ]
  },
  entries: [
    {
      name: 'Element',
      tags: […]
    }
  ]
}
```

**After:**
```javascript
{
  entries: [
    {
      name: 'Element',
      webpackExtend(config => {
        config.output.publicPath = './';
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          ...optimizationSplitChunksOverride
        };
        config.plugins.push(new WebpackDynamicPublicPathPlugin({
          externalPublicPath: 'window.externalPublicPath'
        }));
        return config;
      }),
      tags: […]
    }
  ]
}
```
