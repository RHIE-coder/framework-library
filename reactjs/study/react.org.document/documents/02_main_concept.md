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

이벤트 핸들러에 인자 전달(feat. `this`)

```js
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

# 07. 조건부 렌더링

 - 컴포넌트의 render 메서드로부터 null을 반환하는 것은 생명주기 메서드 호출에 영향을 주지 않음. 계속 호출되는 componentDidUpdate가 그 증거!

```js
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  componentDidUpdate() {
    console.log("componentDidUpdate")
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<Page />);
```

# 08. 리스트와 Key

`key`는 엘리먼트 리스트를 만들 때 포함해야 하는 특수한 문자열 어트리뷰트

 - Key는 React가 어떤 항목을 변경, 추가 또는 삭제할지 식별하는 것을 돕습니다. key는 엘리먼트에 안정적인 고유성을 부여하기 위해 배열 내부의 엘리먼트에 지정해야 합니다.
 - Key를 선택하는 가장 좋은 방법은 리스트의 다른 항목들 사이에서 해당 항목을 고유하게 식별할 수 있는 문자열을 사용
 - 렌더링 한 항목에 대한 안정적인 ID가 없다면 최후의 수단으로 항목의 인덱스를 key로 사용

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NumberList numbers={numbers} />);
```

올바른 Key 사용법

```js
function ListItem(props) {
  // 틀렸습니다! 여기에는 key를 지정할 필요가 없습니다.
  // <li key={value.toString()}>
  //     {value}
  // </li>
  // 맞습니다! 여기에는 key를 지정할 필요가 없습니다.
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 틀렸습니다! 여기에 key를 지정해야 합니다.
    // <ListItem value={number} />
    // 맞습니다! 배열 안에 key를 지정해야 합니다.
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

Key는 형제 사이에서만 고유한 값이어야 한다.

 - Key는 배열 안에서 형제 사이에서 고유해야 하고 전체 범위에서 고유할 필요는 없습니다. 두 개의 다른 배열을 만들 때 동일한 key를 사용할 수 있습니다.

```js
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Blog posts={posts} />);
```

`map()`을 이용한 엘리먼트 리스팅

```js
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

// OR

function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

# 09. 폼

Controlled Components

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NameForm />);
```

textarea 태그

```js
<textarea>
  Hello there, this is some text in a text area
</textarea>
```

```js
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

select 태그

```js
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

```js
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

file input 태그

 - HTML에서 `<input type="file">`는 사용자가 하나 이상의 파일을 자신의 장치 저장소에서 서버로 업로드하거나 File API를 통해 JavaScript로 조작할 수 있습니다. 값이 읽기 전용이기 때문에 React에서는 비제어 컴포넌트입니다.

```js
<input type="file" />
```

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

class Reservation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isGoing: true,
            numberOfGuests: 2,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })
    }

    render() {
        return (
            <form>
                <label>
                    Is going:
                    <input 
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    Number of guests:
                    <input 
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} 
                    />
                </label>
            </form>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Reservation />)
```

# 10. State 끌어올리기

```js
import React from 'react';
import ReactDOM from 'react-dom/client';

function BoilingVerdict(props) {
    if(props.celsius >= 100) {
        return <p>The water would boil.</p>;
    }

    return <p>The water would not boil.</p>
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this); 
        this.state = {temperature: ''};
    }

    handleChange(e) {
        this.setState({temperature: e.target.value});
    }

    render() {
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>Enter temperature in Celisius</legend>
                <input
                    value={temperature}
                    onChange={this.handleChange}
                />
                <BoilingVerdict
                    celsius={parseFloat(temperature)}
                />
            </fieldset>
        )
    }
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit',
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature: ''};
    }

    handleChange(e) {
        // this.setState({temperature: e.target.value});
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        // const temperature = this.state.temperature;
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input 
                    value={temperature}
                    onChange={this.handleChange}
                />
            </fieldset>
        )
    }
}

class Calculator2 extends React.Component {
    
    render() {
        return (
            <div>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
            </div>
        )
    }
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class Calculator3 extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);       
        this.state = {temperature:'', scale:'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange} />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange} />
                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Calculator3 />)
```

# 11. Composition vs Inheritance

```
Facebook에서는 수천 개의 React 컴포넌트를 사용하지만, 
컴포넌트를 상속 계층 구조로 작성을 권장할만한 사례를 아직 찾지 못했습니다.
```

어떤 형태의 자식 컴포넌트가 올 지 예상하기 힘들 때 비워놓기
 - props에 컴포넌트를 전달받아 처리할 수 있다는 점을 이용


```js
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

# 12. React로 생각하기

 - 핵심: 최소 단위를 찾아내라