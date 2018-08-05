# sm-webpack-config

The sub-module for webpack config for SPA app.

## The Sub-module path

Add this repo as the sub-module of your repo with the module path is **configs\webpack**

## Config files

### 1. common.js

The common config that will be applied for all dev.js, prod.js and analysis.js

### 2. dev.js

The configuration to build and run SPA in dev mode

```javascript
scripts:{
  "build-dev": "webpack-dev-server --config=configs/webpack/dev",
  "start": "npm run build-dev",
}
```

### 3. prod.js

The configuration to build the SPA to dist folder (Ready for Production)

```javascript
scripts:{
  "build-prod": "webpack -p --progress --config=configs/webpack/prod",
  "prod-sv": "node sm-react-node-express/express.js",
  "start-prod": "npm run build-prod && npm run prod-sv",
}
```

### 4. analysis.js

The configuration to build and run The Webpack Bundle Analyzer.

```javascript
scripts:{
  "build-analysis": "webpack -p --progress --config=configs/webpack/analyzer.js",
  "start-analysis": "npm run build-analysis",
}
```

The Webpack Bundle Analyzer is started at http://127.0.0.1:8888
