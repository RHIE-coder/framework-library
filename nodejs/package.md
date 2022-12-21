# `package.json` 다루기

## # local package 

```js
{
    "dependencies": {
        "@do-something": "file:local-packages/lib"
    }
}
```

```sh
npm link local-packages/lib
###
npm install local-package/lib
```

# `예시`

```json
{
  "name": "@flagtail/type-flow",
  "version": "0.0.2",
  "description": "A validation library that makes your code safe and readable",
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "browser": "dist/type-flow.js",
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "rollup -c --bundleConfigAsCjs",
    "test": "jest"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/flagtail/flagtail-tools.git"
  },
  "keywords": [
    "flagtail",
    "validate",
    "type-handler"
  ],
  "author": {
    "name": "rhie-coder",
    "url": "https://github.com/rhie-coder"
  },
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/flagtail/flagtail-tools/issues"
  },
  "homepage": "https://github.com/flagtail/flagtail-tools/tree/main/packages/type-flow#readme",
  "devDependencies": {
    "@babel/core": "^7.20.2",
    "@babel/preset-env": "^7.20.2",
    "@rollup/plugin-babel": "^6.0.2",
    "@rollup/plugin-commonjs": "^23.0.2",
    "@rollup/plugin-node-resolve": "^15.0.1",
    "jest": "^29.3.1",
    "rollup": "^3.3.0"
  } 
}
```