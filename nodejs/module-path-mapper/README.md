# Module Path Mapper

## # Usage

### - Installation

```sh
npm i module-path-mapper
```

<br><br>

### - `jsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonJS",
    "target": "ES2015",
    "baseUrl": "./",
    "paths": {
      "@/*": [
          "src/*"
      ]
    }
  },
  "exclude": [
    "dist",
    "node_modules",
    "build",
    ".vscode",
    "coverage",
    ".npm",
    ".yarn"
  ]
}
```

the important key is `paths`

```json
...
...
...
    "paths": {
      "@/*": [
          "src/*"
      ]
    }
...
...
...
```

`baseURL` is irrelevant with this module

`jsconfig.json` just indicates that directory is the root of a JavaScript Project to VS Code Editor.

#### * Reference

 - [jsconfig.json](https://code.visualstudio.com/docs/languages/jsconfig)
 - [VS Code Editor](https://code.visualstudio.com/)

<br><br>

### - `app.js`

```js
require('module-path-mapper')({
    rootPath: path.join(__dirname, '..'),
})

const myModule = require('@/utils/something');
```

<hr><br><br><br><br><br>

## # Using Jest

Unfortunately, `module-path-mapper` itself would not work from Jest due to a custom behavior of Jest's require. But you can use it's own aliasing mechanism instead. The configuration can be defined either in `package.json` or `jest.config.js`:

### - `package.json`

```json
"jest": {
  "moduleNameMapper": {
    "@/(.*)": "<rootDir>/mock/$1",
  },
}
```

### - `jest.config.js`

```js
module.exports = {
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/mock/$1",
  },
}
```

#### * Reference

[Jest Configuration](https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring)

<hr><br><br><br><br><br>

## # License

[MIT](./LICENSE)