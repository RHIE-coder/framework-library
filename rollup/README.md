```json
{
  "devDependencies": {
    "@babel/core": "^7.20.2",
    "@babel/preset-env": "^7.20.2",
    "@rollup/plugin-babel": "^6.0.2",
    "@rollup/plugin-commonjs": "^23.0.2",
    "jest": "^29.3.1",
    "rollup": "^3.3.0"
  }
}

```

```js
import commonjs from '@rollup/plugin-commonjs'
import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';

export default {
    input: './src/index.js',
    output: [
        {
            file: './build/bundle.es5.js',
            format: 'es',
        }
    ],
    plugins: [
        commonjs(),
        getBabelOutputPlugin({ presets: ['@babel/preset-env'] }),
    ]
}
```