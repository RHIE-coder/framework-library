# 1. 접근성
 - 웹 접근성(`a11y`)
 - WAI-ARIA(`aria-*`)

## # 시맨틱 HTML

`<div>`는 HTML 의미를 깨트리곤 함

`<Fragment>`를 쓰자

```js
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';

function ListItem({ item }) {
    return (
        // <Fragment key={item.id}>
        <Fragment>
            <dt>{item.term}</dt>
            <dt>{item.description}</dt>
        </Fragment>
    )
}

function Glossary(props) {
    return (
        <dl>
            {props.item.map(item=> (
                <ListItem item={item} key={item.id} />
            ))}
        </dl>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Glossary item={[
        { id: 1, term: "a", description: "AAA" },
        { id: 2, term: "b", description: "BBB" },
        { id: 2, term: "c", description: "CCC" },
        { id: 4, term: "d", description: "DDD" },
]} />);
```

 - 라벨링

`for` --> `htmlFor`

```js
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```

보조과학기술에 의해 사용자들이 이러한 섹션으로 빠르게 이동할 수 있도록, `<main>`과 `<aside>` 같이 대표성을 띠는 랜드마크 엘리먼트와 역할들을 사용해 페이지 영역을 나누어야 합니다.

<hr><br><br><br>

# 2. 코드 분할

번들링은 훌륭하지만 앱이 커지면 로드 시간이 길어진다.

## # 지연 로딩하기

### - `import()`

```js
import("./math").then(math => {
    console.log(math.add(10, 20));
})
```

### - React.lazy

```js
// Before
import OtherComponent from './otherComponent';

// After
const OtherComponent = React.lazy(() => import('./OtherCompnent'));
```

이 함수는 React 컴포넌트를 default export로 가진 모듈 객체가 이행되는 Promise를 반환해야 합니다.

lazy 컴포넌트는 Suspense 컴포넌트 하위에서 렌더링되어야 하며, Suspense는 lazy 컴포넌트가 로드되길 기다리는 동안 로딩 화면과 같은 예비 컨텐츠를 보여줄 수 있게 해줍니다.

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
    return (
        <Flagment>
            <Suspense fallback={<div>Loading...</div>}>
                <OtherComponent />
            </Suspense>
        </Flagment>
    )
}
```

fallback prop은 컴포넌트가 로드될 때까지 기다리는 동안 렌더링하려는 React 엘리먼트를 받아들입니다.

Suspense 컴포넌트는 lazy 컴포넌트를 감쌉니다. 하나의 Suspense 컴포넌트로 여러 lazy 컴포넌트를 감쌀 수도 있습니다.

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

<hr><br><br><br>

# 3. Context

context의 주된 용도는 다양한 레벨에 네스팅된 많은 컴포넌트에게 데이터를 전달하는 것입니다. context를 사용하면 컴포넌트를 재사용하기가 어려워지므로 꼭 필요할 때만 쓰세요.

context보다 컴포넌트 합성이 더 간단한 해결책일 수도 있다.

```js
???
```

<hr><br><br><br>

# 4. Error Boundary

UI의 일부분에 존재하는 자바스크립트 에러가 전체 애플리케이션을 중단시켜서는 안 됩니다. React 사용자들이 겪는 이 문제를 해결하기 위해 React 16에서는 에러 경계(“error boundary”)라는 새로운 개념이 도입되었습니다.

생명주기 메서드인 `static getDerivedStateFromError()` 와 `componentDidCatch()` 중 하나 (혹은 둘 다)를 정의하면 클래스 컴포넌트 자체가 에러 경계가 됩니다

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

이벤트 핸들러는 try~catch문 사용


<hr><br><br><br>

# 5. Ref 전달하기

React.forwardRef를 사용하여 전달된 ref를 얻고, 그것을 렌더링 되는 DOM button으로 전달합니다.

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 이제 DOM 버튼으로 ref를 작접 받을 수 있습니다.
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

<hr><br><br><br>

# 6. Fragment

```js
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

key는 Fragment에 전달할 수 있는 유일한 어트리뷰트입니다. 추후 이벤트 핸들러와 같은 추가적인 어트리뷰트를 지원할 수도 있습니다.

<hr><br><br><br>

# 7. 고차 컴포넌트(HOC, Higher Order Component)

고차 컴포넌트는 컴포넌트를 가져와 새 컴포넌트를 반환하는 함수입니다.

mixin을 더 이상 권장하지 않음

고차 컴포넌트는 사이드 이펙트가 전혀 없는 순수 함수

```js
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }
    render() {
      // 들어온 component를 변경하지 않는 container입니다. 좋아요!
      return <WrappedComponent {...this.props} />;
    }
  }
}

const EnhancedComponent = logProps(InputComponent);
```

<hr><br><br><br>

# 8. 다른 라이브러리와 통합하기

<hr><br><br><br>

# 9. JSX 이해하기

근본적으로, JSX는 `React.createElement(component, props, ...children)` 함수에 대한 문법적 설탕을 제공할 뿐입니다.

```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
// same
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

JSX 내에서도 점 표기법을 사용하여 React 컴포넌트를 참조할 수 있습니다.

```js
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

Prop에 어떤 값도 넘기지 않을 경우, 기본값은 true입니다.

```js
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

<hr><br><br><br>

# 10. 성능 최적화

## # 프로덕션 빌드를 활용하세요

기본적으로 React에는 유용한 경고가 많이 포함되어 있습니다. 이 경고들은 개발하는데 있어 매우 유용합니다. 그러나 그 경고는 React를 더 크고 느리게 만들기 때문에 앱을 배포할 때 프로덕션 버전을 사용해야합니다.

### - Brunch

가장 효율적인 Brunch 프로덕션 빌드를 위해 terser-brunch를 설치하세요.

```
npm install --save-dev terser-brunch
```

다음 프로덕션 빌드를 생성하기 위해 build 명령어에 -p 플래그를 추가합니다.
```
brunch build -p
```

### - Browserify, Rollup, Webpack

## # DevTools Profiler로 컴포넌트 프로파일링

## # 긴 목록 가상화하세요

## # 재조정을 피하세요

<hr><br><br><br>

# 11. Portal

Portal은 부모 컴포넌트의 DOM 계층 구조 바깥에 있는 DOM 노드로 자식을 렌더링하는 최고의 방법을 제공합니다.

```js
ReactDOM.createPortal(child, container)
```

첫 번째 인자(child)는 엘리먼트, 문자열, 혹은 fragment와 같은 어떤 종류이든 렌더링할 수 있는 React 자식입니다. 두 번째 인자(container)는 DOM 엘리먼트입니다.


<hr><br><br><br>

# 12. Profiler API

Profiler는 React 트리 내에 어디에나 추가될 수 있으며 트리의 특정 부분의 렌더링 비용을 계산해줍니다. 이는 두 가지 props를 요구합니다: id (문자열) 와 onRender 콜백 (함수)이며 React 트리 내 컴포넌트에 업데이트가 “커밋”되면 호출됩니다.

```js
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Profiler id="Main" onRender={callback}>
      <Main {...props} />
    </Profiler>
  </App>
);
```

<hr><br><br><br>

# 13. ES6 없이 사용하는 React (안쓸꺼임...)

 - 컴포넌트 정의

```js
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

///////////

var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```

 - Props

```js
class Greeting extends React.Component {
  // ...
}

Greeting.defaultProps = {
  name: 'Mary'
};
```

<hr><br><br><br>

# 14. JSX 없이 사용하는 React(그냥 JSX 써... 가독성 쉣)

```js
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hello toWhat="World" />);

///////////

class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Hello, {toWhat: 'World'}, null));
```

<hr><br><br><br>

# 15. 재조정(Reconciliation)

React의 “비교 (diffing)” 알고리즘

비교 알고리즘 덕분에 컴포넌트의 갱신이 예측 가능해지면서도 고성능 앱이라고 불러도 손색없을 만큼 충분히 빠른 앱을 만들 수 있습니다.

두 개의 트리를 비교할 때, React는 두 엘리먼트의 루트(root) 엘리먼트부터 비교합니다. 이후의 동작은 루트 엘리먼트의 타입에 따라 달라집니다.

## # 엘리먼트의 타입이 다른 경우

두 루트 엘리먼트의 타입이 다르면, React는 이전 트리를 버리고 완전히 새로운 트리를 구축합니다.

 - `componentWillUnmount()`

 새로운 트리가 만들어질 때, 새로운 DOM 노드들이 DOM에 삽입

 - `componentDidMount()`가 이어서 실행. 이전 트리와 연관된 모든 state는 사라집니다.

## # DOM 엘리먼트의 타입이 같은 경우

React는 두 엘리먼트의 속성을 확인하여, 동일한 내역은 유지하고 변경된 속성들만 갱신

컴포넌트가 갱신되면 인스턴스는 동일하게 유지되어 렌더링 간 state가 유지

React는 새로운 엘리먼트의 내용을 반영하기 위해 현재 컴포넌트 인스턴스의 props를 갱신

 - `componentDidUpdate()`



<hr><br><br><br>

# 16. Ref와 DOM

createRef API

<hr><br><br><br>

# 17. Render Props

```js
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```

render prop은 무엇을 렌더링할지 컴포넌트에 알려주는 함수

<hr><br><br><br>

# 18. 정적 타입 검사

큰 코드 베이스에서는 PropTypes를 사용하는 대신 Flow 혹은 TypeScript를 사용하는 것을 추천

rescript

<hr><br><br><br>

# 19. Strict Mode

```js
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```
Header와 Footer 컴포넌트는 Strict 모드 검사가 이루어지지 않습니다. 하지만, ComponentOne과 ComponentTwo는 각각의 자손까지 검사가 이루어집니다.

 - 안전하지 않은 생명주기를 사용하는 컴포넌트 발견
 - 레거시 문자열 ref 사용에 대한 경고
 - 권장되지 않는 findDOMNode 사용에 대한 경고
 - 예상치 못한 부작용 검사
 - 레거시 context API 검사
 - Ensuring reusable state

<hr><br><br><br>

# 20. PropTypes를 사용한 타입 검사

React.PropTypes는 React v15.5부터 다른 패키지로 이동하였습니다. 대신 prop-types 라이브러리를 사용하시길 바랍니다.

 Flow 또는 TypeScript와 같은 JavaScript 도구(Extensions)를 사용할 수 있습니다. 이러한 것들을 사용하지 않더라도 React는 내장된 타입 검사 기능들을 가지고 있습니다

```js
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // prop가 특정 JS 형식임을 선언할 수 있습니다.
  // 이것들은 기본적으로 모두 선택 사항입니다.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 렌더링 될 수 있는 것들은 다음과 같습니다.
  // 숫자(numbers), 문자(strings), 엘리먼트(elements), 또는 이러한 타입들(types)을 포함하고 있는 배열(array) (혹은 배열의 fragment)
  optionalNode: PropTypes.node,

  // React 엘리먼트.
  optionalElement: PropTypes.element,

  // React 엘리먼트 타입 (ie. MyComponent)
  optionalElementType: PropTypes.elementType,

  // prop가 클래스의 인스턴스임을 선언할 수 있습니다.
  // 이 경우 JavaScript의 instanceof 연산자를 사용합니다.
  optionalMessage: PropTypes.instanceOf(Message),

  // 열거형(enum)으로 처리하여 prop가 특정 값들로 제한되도록 할 수 있습니다.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 여러 종류중 하나의 종류가 될 수 있는 객체
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 특정 타입의 행렬
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 특정 타입의 프로퍼티 값들을 갖는 객체
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 특정 형태를 갖는 객체
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 추가 프로퍼티에 대한 경고가 있는 객체
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),

  // 위에 있는 것 모두 `isRequired`와 연결하여 prop가 제공되지 않았을 때
  // 경고가 보이도록 할 수 있습니다.
  requiredFunc: PropTypes.func.isRequired,

  // 모든 데이터 타입이 가능한 필수값
  requiredAny: PropTypes.any.isRequired,

  // 사용자 정의 유효성 검사기를 지정할 수도 있습니다.
  // 검사 실패 시에는 에러(Error) 객체를 반환해야 합니다.
  // `oneOfType`안에서는 작동하지 않으므로 `console.warn` 혹은 throw 하지 마세요.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // `arrayOf` 와 `objectOf 에 사용자 정의 유효성 검사기를 적용할 수 있습니다.
  // 검사 실패 시에는 에러(Error) 객체를 반환해야 합니다.
  // 유효성 검사기는 배열(array) 혹은 객체의 각 키(key)에 대하여 호출될 것입니다.
  // 유효성 검사기의 첫 두 개의 변수는 배열 혹은 객체 자신과 현재 아이템의 키입니다.

  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

<hr><br><br><br>

# 21. 비제어 컴포넌트

`대부분 경우에 폼을 구현하는데 제어 컴포넌트를 사용하는 것이 좋습니다.`

모든 state 업데이트에 대한 이벤트 핸들러를 작성하는 대신 비제어 컴포넌트를 만들려면 ref를 사용하여 DOM에서 폼 값을 가져올 수 있습니다.

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

<hr><br><br><br>

# 22. 웹 컴포넌트

```
개인적으로 웹 컴포넌트를 사용할거면 그냥 리엑트를 안 쓰는게 좋을 듯.
즉, 웹 커스텀 컴포넌트를 중심으로 할 것인가, 리엑트 컴포넌트 중심으로 할 것인가 선택하자.
```

React와 웹 컴포넌트는 서로 다른 문제를 해결하기 위해 만들어졌습니다. 웹 컴포넌트는 재사용할 수 있는 컴포넌트에 강한 캡슐화를 제공하는 반면, React는 데이터와 DOM을 동기화하는 선언적 라이브러리를 제공합니다.

두 목표는 상호보완적입니다. React에서 웹 컴포넌트를 사용할지, 웹 컴포넌트에서 React를 사용할지, 둘 다 사용할지는 자유롭게 정하실 수 있습니다.


```js
class HelloMessage extends React.Component {
  render() {
    return <div>Hello <x-search>{this.props.name}</x-search>!</div>;
  }
}
```