# 01. Hello World

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, world!</h1>);
```

# 02. JSX 소개

JSX란

```js
const element = <h1>Hello, world!</h1>
```

표현식 포함하기

```js
const name = "rhie-coder"
const element = <h1>Hello, {name}</h1>

// 속성에도 표현식을 넣을 수 있음
const attributeElement = <img src={user.avatarUrl}></img>;
const attributeElement = <img src={user.avatarUrl} />; // 태그가 비면 />를 이용해 닫아야 함
```

활용하기

```js
function getGreeting(user) {
    if(user) [
        return <h1>Hello, {user.name}!</h1>;
    ]
    return <h1>Hello, Stranger.</h1>;
}
```

자식 포함 가능

```js
const element = (
    <div>
        <h1>Hello!</h1>
        <h2>Good to see you here.</h2>
    </div>
)
```

JSX와 React Element의 차이

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello~~'
)

// OR

const element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello~~'
    }
}
```

# 03. 엘리먼트 렌더링

랜더링 된 엘리먼트 업데이트

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}</h2>
        </div>
    )
    root.render(element);
}

setInterval(tick, 1000);
/*  
React DOM은 해당 엘리먼트와 그 자식 엘리먼트를 이전의 엘리먼트와 비교하고 DOM을 원하는 상태로 만드는데 필요한 경우에만 DOM을 업데이트합니다.
*/
```

# 04. Components와 Props

컴포넌트 정의 방법

```js
// 함수 컴포넌트
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

// 클래스 컴포넌트
class Welcome extends React.component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}

// USE~!
const element = <Welcome name="rhie-coder" />;
```

컴포넌트 합성

```js
const multiGreeting = (
    <div>
        <Welcome name="Alice" />
        <Welcome name="Bob" />
        <Welcome name="Charlie" />
    </div>
)
```

 - props는 읽기 전용!! 함수 컴포넌트, 클래스 컴포넌트 모두 자체 props를 수정하면 안된다.

# 05. State와 생명주기

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

class Clock extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {date: new Date()}
    }

    tick() {
        this.setState({date: new Date()})
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>{this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}

root.render(<Clock />)
```

state 올바르게 사용하기 `this.state`

```js
// this.state 코드는 다시 렌더링 되지 않으며 contructor에 유일하게 지정됨
this.state.comment = 'hello'; // 대신 this.setState를 사용하자
```

state 올바르게 사용하기 `비동기적인 업데이트`

 - `setState()`함수를 한꺼번에 처리하게 되면 `this.props`와 `this.state`가 비동기적으로 업데이트 될 수도 있음

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

state 올바르게 사용하기 `병합`

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

class Greeting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "rhie-coder",
            comment: "Hello~"
        }
    }

    changeComment() {
        this.setState({
            comment: "Bye~"
        })
    }

    componentDidMount() {
        setTimeout(this.changeComment.bind(this), 1500);
    }

    render() {
        return (
            <h1>{this.state.comment} {this.state.name}</h1>
        )
    }

}

root.render(<Greeting />)
```

state 올바르게 사용하기 `Downstream data`

 - state가 소유하고 설정한 컴포넌트 이외에는 어떠한 컴포넌트에도 접근 불가
 - 특정 컴포넌트에 속한 state를 넘겨주려면 props를 이용하면 됨

# 06. 이벤트 처리하기

```js
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```