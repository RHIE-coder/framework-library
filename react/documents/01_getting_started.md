# Env Setting

## React

```sh
npm install react react-dom 
```

## Babel

```sh
npm install -D @babel/cli @babel/core @babel/preset-env @babel/preset-react
```
 - `@babel/preset-env` : for compiling ES2015+ syntax


## Webpack

```sh
npm install -D webpack webpack-cli babel-loader
```
 - `babel-loader` : ES6 --> ES5

## hello world

### JSX 방식

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, world!</h1>);
```

### 자바스크립트 방식

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<h1>Hello, world!</h1);
root.render(React.createElement('h1', null, 'Hello World'))
```

## File 기반보다 Server 기반으로 작업하는 것을 추천

```npm
npm i -D http-server
```
 - 기본값으로 `public` 디렉토리를 바라본다.