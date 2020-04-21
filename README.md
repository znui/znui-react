# znui-react
znui react is the front-end basic framework and provide webpack common config for application, component, project etc.

[![npm](https://img.shields.io/npm/v/znui-react.svg)](https://www.npmjs.com/package/znui-react)
[![npm](https://img.shields.io/npm/dm/znui-react.svg)](https://www.npmjs.com/package/znui-react)

## Installation

```bash
npm install znui-react -s
```

## Usage UI

```javascript


var zr = require('znui-react');

```

## Usage Webpack Cli

`webpack.component.config.js`
```javascript
require('@zeanium/core');
module.exports = require('znui-react/webpack').component.development(function (config){
    return {
        externals: {
            
        }
    };
});
```

`webpack.app.config.js`
```javascript
require('@zeanium/core');
module.exports = require('znui-react/webpack').app.development(function (config){
    return {
        externals: {
            
        }
    };
});
```

`webpack.application.config.js`
```javascript
require('@zeanium/core');
module.exports = require('znui-react/webpack').application.development(function (config){
    return {
        externals: {
            
        }
    };
});
```

## License

MIT