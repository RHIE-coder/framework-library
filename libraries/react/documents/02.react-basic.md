# React 다루기

## Element 중첩

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

const h1 = React.createElement('h1', null, 'Hello World!!')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    React.createElement('div', null, h1, h1, h1, h1)
)
```

## React Component Class

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

const h1 = React.createElement('h1', null, 'Hello World!!')

class HelloWorld extends React.Component {
    render() { // Element 하나를 반환하는 메서드
        return React.createElement('div', null, h1, h1, h1)
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    React.createElement(HelloWorld, null)
)
```

- 아 그렇구나

```
ES6 문법
{ render() }

이전 문법
{ render: function(){} }
```

### 여러 컴포넌트를 재사용하는 법

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

const h1 = React.createElement('h1', null, 'Hello World!!')

class HelloWorld extends React.Component {
    render() { // Element 하나를 반환하는 메서드
        return React.createElement('div', null, h1)
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    React.createElement(
        "div",
        null,
        React.createElement(HelloWorld),
        React.createElement(HelloWorld),
        React.createElement(HelloWorld),
    )
)
```

### 속성을 사용하여 각기 다른 컴포넌트 만들기

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

class HelloWorld extends React.Component {
    render() {
        if(this.props.heading) return <h1>HELLO</h1>
        else return <h1>WORLD</h1>
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    React.createElement(
        "div",
        null,
        React.createElement(HelloWorld),
        React.createElement(HelloWorld,{heading:true}),
        React.createElement(HelloWorld),
    )
)
```

속성은 엘리먼트 내에 변경할 수 없는 값

 - 방식

```js
<TAG_NAME PROPERTY_NAME=VALUE />
```
여기서 `PROPERTY_NAME`은 HTML 표준 속성이며 원래 표준 속성이 아니면 렌더링하지 않았다. 그러나 16버전 이후부터는 표준이 아닌 HTML 속성도 렌더링하도록 변경되었다.

표준 속성이 아닌 값은 `this.props` 객체에서 접근할 수 있다. `this.props.PROPERTY_NAME`

내부적으로 `Object.freeze()`를 통해 `this.props`를 immutable하게 바꾼다.

`Object.isFrozon()`을 통해 `Object.freeze()` 적용여부를 확인할 수 있다.

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

class HelloWorld extends React.Component {
    render() {
        return React.createElement(
            'h1', 
            this.props, 
            `hello ${this.props.mainFrame} world`)
    }
}

const properties = [
    {id:"java", mainFrame:"spring", title:"java is good"},
    {id:"javascript", mainFrame:"node.js", title:"javscript is good"},
    {id:"python", mainFrame:"fastapi", title:"python is good"},
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    React.createElement(
        "div",
        null,
        React.createElement(HelloWorld,properties[0]),
        React.createElement(HelloWorld,properties[1]),
        React.createElement(HelloWorld,properties[2]),
    )
)
```

## JSX

