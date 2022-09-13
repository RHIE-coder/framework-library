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

### 트랜스파일러?

소스 간 컴파일러(source-to-source compiler)

transcomiler OR transpiler

한 가지 프로그래밍 언어로 작성된 프로그램의 소스 코드를 가지고 다른 프로그래밍 언어로 된 동일한 소스 코드를 생성하는 컴파일러

### JSX와 앨리먼트간의 관계

 - JSX

```js
React.createElement(
    name,
    {key1: value1, key2: value2, ...},
    child1, child2, child3, ..., childN
)
```

 - Element

```jsx
<name key1=value1 key2=value2, ...>
    <child1/>
    <child2/>
    <child3/>
    ...
    <childN/>
</name>
```

### JSX Hello World

```js
import React from "react";
import ReactDOM from "react-dom/client";

class HelloWorld extends React.Component {
    render(){
        return (
            <div>
                <h1>1. Hello World 1</h1>
                <h1>2. Hello World 2</h1>
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HelloWorld/>)
```

### JSX 변수 활용 1 : 값

```js
import React from "react";
import ReactDOM from "react-dom/client";

class DateTimeNow extends React.Component {
    render() {
        let now = new Date().toLocaleString();
        return <span>Current Data/time : {now}</span>
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<DateTimeNow/>)
```

### JSX 변수 활용 2 : JSX

```js
import React from "react";
import ReactDOM from "react-dom/client";

const helloWorldJSX = <h1>Hello World</h1>

class HelloWorld extends React.Component {
    render() {
        return (
            <div id="container">
                this is {this.props.name}
                {helloWorldJSX}
                {helloWorldJSX}
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<HelloWorld name="rhie"/>)
```

### JSX 속성

```js
import React from "react";
import ReactDOM from "react-dom/client";

class PropertyUsage extends React.Component {

    render() {
        return (
            <div {...this.props}>
                Hello, world!
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<PropertyUsage data-not-standard="rhie" id="123" class="myclazz" />)
```

#### - JSX 속성 활용 시 주의할 점

DOM의 HTML 비표준 속성에 데이터를 저장하는 것을 일반적으로 안티패턴으로 여겨진다. DOM을 데이터베이스나 프론트엔드 데이터 저장소로 사용하는 것이 적절하지 않다. DOM에서 데이터를 가져오는 것은 메모리 상의 가상 저장소에서 데이터를 가져오는 것보다 느리다.


### 컴포넌트 매서드

```js
import React from "react";
import ReactDOM from "react-dom/client";

class GetDateTime extends React.Component {

    getTime() {
        return new Date().toLocaleString();
    }

    render() {
        return <div>The time is : {this.getTime()}</div>
    }
}

ReactDOM
.createRoot(
    document.getElementById("root")
)
.render(
    <GetDateTime />
)
```

### JSX 주석

```js
import React from "react";
import ReactDOM from "react-dom/client";

class Hello extends React.Component {

    render() {
        return (
            <div /*  
                이런 식으로 넣을 수 있습니다.
                아주 신기합니다.
            */>
                {/* {}을 포함하여 이렇게 주석을 넣습니다. */}
                Hello World
            </div>
        )
    }
}

ReactDOM
.createRoot(
    document.getElementById("root")
)
.render(
    <Hello />
)
```
### JSX 스타일 속성

CSS 속성은 카멜 표기법으로 작성한다.
 - `font-size` ==> `fontSize`

#### class, for

스타일을 위한 class와 `<label>`을 위한 for는 자바스크립트의 예약어이기 때문에 다른 방식으로 사용해야 한다.
 - class -> `className`
 - for -> `htmlFor`