# Vue 2 시작하기

 - [VUE 2](https://v2.vuejs.org/)

## [ Vue.js 특징 ]

### - UI 화면단 라이브러리

UI 화면 개발 방법 중 하나인  MVVM 패턴의 ViewModel에 해당하는 화면단 라이브러리 

MVVM : Model - View - ViewModel

```
                 ViewModel
|      |  ---- DOM Listner ---->   |       |
| View |                           | Model |
|      |  <---- Data Binding ----  |       |
```

 - View : 사용자에게 보이는 화면
 - DOM : HTML 문서에 들어가는 요소의 정보를 담고 있는 데이터 트리
 - DOM Listener : DOM의 변경 내역에 대해 즉각적으로 반응하여 특정 로직을 수행
 - Model : 데이터를 담는 용기, 서버에서 가져온 데이터를 자바스크립트 객체 형태로 저장
 - Data Binding : View에 표시되는 내용과 모델의 데이터를 동기화
 - ViewModel : View와 Model의 중간 영역, Dom Listener와 Data Binding을 제공하는 영역

#### MVVM 패턴이란?

마크업 언어나 GUI 코드를 비즈니스 로직 또는 백엔드 로직과 분리하여 개발하는 소프트웨어 디자인 패턴

### - 컴포넌트 기반 프레임워크 

컴포넌트를 조합하여 화면을 구성할 수 있음

### - React와 Angular의 조합

#### 데이터 바인딩

Angular의 Two-way Data Binding과 React의 One-way Data Flow를 모두 결합

 - Two-way Data Binding: 화면에 표시되는 값과 프레임워크의 모델 데이터 값이 동기화 되어 한쪽이 변경되면 다른 한쪽도 자동으로 변경되는 것
 - One-way Data Flow: 컴포넌트의 단방향 통신. 컴포넌트 간에 데이터를 전달할 때 항상 상위 컴포넌트에서 하위 컴포넌트 방향으로만 전달하게끔 프레임워크가 구조화 되어있음

그리고 Virtual DOM Rendering 방식을 적용함 


## [ Hello World ]

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
</head>

<body>
    <div id="app"> {{ message }} </div>
    <script>
        // Vue Instance
        new Vue({
            el: "#app", // el 속성: Vue 인스턴스가 그려질 위치 지정
            data: {
                message: "Hello Vue.js" // data 속성: 화면의 {{ message }} 에 연결
            }
        })
    </script>
</body>

</html>
```
### - Vue Instance Option Attributes ( el, data 외 )
 - `template`: 화면에 표시할 HTML, CSS 등의 마크업 요소를 정의하는 속성. Vue의 데이터 및 기타 속성들도 함께 화면에 그릴 수 있음
 - `methods`: 화면의 로직 제어와 관계된 메서드를 정의하는 속성. 마우스 클릭 이벤트 처리와 같이 화면의 전반적인 이벤트 화면 동작과 관련된 로직을 추가할 수 있음
 - `Life Cycle Attributes`: Vue Instance가 생성되자마자 실행할 로직을 정의할 수 있는 속성

### - Life Cycle 

#### After 인스턴스 생성 : new Vue()

 - 이벤트 및 라이프 사이클 초기화
    - `beforeCreate` : data 속성과 methods 속성이 아직 인스턴스에 정의되어 있지 않고 DOM 같은 화면 요소에도 접근할 수 없음
 - 화면에 반응성 주입
    - `created` : data 속성과 methods 속성이 정의되었음. 아직 인스턴스가 화면 요소에 부착되기 전이기 때문에 template 속성에 정의된 DOM 요소로 접근할 수 없음. data 속성과 methods 속성에 접근할 수 있는 가장 첫 라이플 사이클 단계이자 컴포넌트가 생성되고 나서 실행되는 단계이기 때문에 서버에 데이터를 요청하여 받아오는 로직을 수행하기가 좋음
 - el, template 속성 확인
 - template 속성 내용을 render()로 변환
    - `beforeMount` : template 속성에 지정한 마크업 속성을 render() 함수로 변환 후 el 속성에 지정한 화면 요소(DOM)에 인스턴스를 부착하기 전에 호출되는 단계. render() 함수가 호출되기 직전의 로직을 추가하기 좋음
 - $el 생성 후 el 속성 값을 대입
    - `mounted` : el 속성에서 지정한 화면 요소에 인스턴스가 부착되고 나면 호출되는 단계. template 속성에 정의한 DOM에 접근 가능. 화면 요소를 제어하는 로직을 수행하기 좋은 단계. !!! DOM에 인스턴스가 부착되자마자 바로 호출되기에 하위 컴포넌트나 외부 라이브러리에 의해 추가된 화면 요소들이 최종 HTML 코드로 변환되는 시점과 다를 수 있음

#### After 인스턴스를 화면에 부착

(): 데이터가 변경되는 경우에만 거침

 - (인스턴스의 데이터 변경)
    - (`beforeUpdate`) : el 속성에서 지정한 화면 요소에 인스턴스가 부착되고 나면 인스턴스에 정의한 속성들이 화면에 치환됨. 치환된 값은 뷰의 반응성(Reactivity, 코드의 변화에 따라 화면이 반사적으로 반응하여 빠르게 화면을 갱신하는 것을 의미)를 제공하기 위해 $watch 속성으로 감시(데이터 관찰). 관찰하고 있는 데이터가 변경되면 Virtual DOM으로 화면을 다시 그리기 전에 호출되는 단계. 변경 예정인 새 데이터에 접근할 수 있어 변경 예정 데이터의 값과 관련도니 로직을 미리 넣을 수 있음. 이곳에 값을 변경하는 로직을 넣더라도 화면이 다시 그려지지는 않음.
 - (화면 재 렌더링 및 데이터 갱신)
    - (`updated`) : 데이터가 변경되고 나서 Virtual DOM으로 다시 화면을 그리고 나면 실행되는 단계. 데이터 변경으로 인한 화면 요소 변경까지 완료된 시점이므로, 데이터 변경 후 화면 요소 제어와 관련된 로직을 추가히가 좋은 단계. 이 단계에서 데이터를 변경하면 무한 루프에 빠질 수 있어서 computed, watch와 같은 속성을 사용하여야 함. 데이터 값 갱신 로직은 `beforeUpdate`에 추가하고 이곳에서는 변경 데이터의 DOM과 관련된 로직을 추가하는 것이 좋음

#### After 인스턴스 내용 갱신

 - 인스턴스 접근 가능
    - `beforeDestroy` : Vue Instance가 파괴되기 직전에 호출되는 단계. 아직 인스턴스에 접근할 수 있어 Vue Instance의 데이터를 삭제하기 좋은 단계.
 - 컴포넌트, 인스턴스, 디렉티브 등 모두 해제
    - `destroyed`: Vue Insatnce가 파괴되고 나서 호출되는 단계. Vue Instance에 정의한 모든 속성이 제거되고 하위에 선언한 인스턴스들 또한 모두 파괴됨

#### Before 인스턴스 소멸

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
</head>

<body>
    <div id="app"> {{ message }} </div>
    <script>
        new Vue({
            el: "#app",
            data: {
                message: "Hello Vue.js"
            },
            beforeCreate: function() {
                console.log("beforeCreate");
                console.log(this.message);
            },
            created: function() {
                console.log("created");
                console.log(this.message);
            },
            mounted: function() {
                console.log("mounted");
                this.message = "Hello RHIE";
            },
            updated: function() {
                console.log("update")
                console.log(this.message);
            }
        })
    </script>
</body>

</html>
```

## [ Component ]

화면을 구성할 수 있는 블록(화면의 특정 영역)

### - Global Component

```js
Vue.component("component name", {
    // ...
})
```

컴포넌트 이름은 template 속성에서 사용할 HTML Custom tag 이름을 의미함.
인스턴스 부착후 내용 변환됨

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
</head>

<body>
    <div id="app">
        <button>컴포넌트 등록</button>
        <my-component></my-component>
    </div>
    <script>
        Vue.component("my-component", {
            template: `<div>전역 컴포넌트가 등록되었습니다<div>`
        })

        new Vue({
            el: "#app",
        })
    </script>
</body>

</html>
```

### - Local Component

```js
new Vue({
    component: {
        "component name": content,
    }
})
```
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
</head>

<body>
    <div id="app">
        <button>컴포넌트 등록</button>
        <my-local-component></my-local-component>
    </div>
    <script>
        const cmp = {
            template: `<div>지역 컴포넌트입니다.</div>`,
        };

        new Vue({
            el: "#app",

            components: {
                "my-local-component": cmp,
            }
        })
    </script>
</body>

</html>
```

### - Vue Component 통신

컴포넌트마다 자체적으로 고유한 유효 범위(scope)를 갖는다. 즉, 각 컴포넌트의 유효 범위가 독립적이다. 직접 다른 컴포넌트의 값을 참조할 수 없다.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
</head>

<body>
    <div id="app">
        <my-cmp1></my-cmp1>
        <my-cmp2></my-cmp2>
    </div>
    <script>
        const cmp1 = {
            template: `<div> first component : {{cmp1Data}} </div>`,
            data: function() { return { cmp1Data : 100 }},
        }

        const cmp2 = {
            template: `<div> second component : {{cmp2Data}} </div>`,
            data : function() { return { cmp2Data : cmp1.data().cmp1Data }},
        }

        console.log(cmp1.data().cmp1Data)

        new Vue({
            el: "#app",

            components : {
                "my-cmp1": cmp1,
                "my-cmp2": cmp2,
            }
        })
    </script>
</body>

</html>
```

#### 상위-하위 컴포넌트 관계

 - 상위 --> 하위 : `props` 전달


> #### `props 속성`
> ```js
> Vue.component("child-component", {
>     props:["props 속성 이름"],
> })
> ```
> ```html
> <child-component v-bind:props 속성이름="상위 컴포넌트 data"></child-component>
> ```
>  - 활용
> ```html
> <!DOCTYPE html>
> <html lang="en">
> 
> <head>
>     <meta charset="UTF-8">
>     <meta http-equiv="X-UA-Compatible" content="IE=edge">
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
>     <title>Hello Vue.js</title>
>     <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
> </head>
> 
> <body>
>     <div id="app">
>         <child-component v-bind:propsdata="msg"></child-component>
>     </div>
>     <script>
>         // 상위 컴포넌트 Vue Instance(Root Component), 하위 컴포넌트 child-component
>         new Vue({
>             el:"#app",
>             data: function(){
>                 return {
>                     msg: "안녕하세요 child component",
>                 }
>             },
>             components: {
>                 "child-component": {
>                     props: ["propsdata"],
>                     template: `<h3> {{ propsdata }} </h3>`,
>                 }
>             },
>         })
>     </script>
> </body>
> 
> </html>
> ```

 - 하위 --> 상위 : 이벤트 발생

> #### 이벤트 발생과 수신 형식
> ```html
> <!DOCTYPE html>
> <html lang="en">
> 
> <head>
>     <meta charset="UTF-8">
>     <meta http-equiv="X-UA-Compatible" content="IE=edge">
>     <meta name="viewport" content="width=device-width, initial-scale=1.0">
>     <title>Hello Vue.js</title>
>     <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
> </head>
> 
> <body>
>     <div id="app">
>         <child-component v-on:show-log="printText"></child-component>
>     </div>
>     <script>
> 
>         const cmp = {
>             "child-component": {
>                 template: `<button v-on:click="showLog">show</button>`,
>                 methods: {
>                     showLog(){
>                         this.$emit("show-log");
>                     }
>                 } 
>             }
>         }
> 
>         new Vue({
>             el: "#app",
>             methods: {
>                 printText() {
>                     console.log("received an event");
>                 }
>             },
>             components : cmp,
>         })
>     </script>
> </body>
> 
> </html>
> ```

#### 이벤트 버스

어플리케이션 로직을 담는 인스턴스와의 별개로 새로운 인스턴스를 1개 더 생성하고 새 인스턴스를 이용하여 이벤트를 보내고 받는다.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
</head>

<body>
    <div id="app">
        <child-component></child-component>
    </div>
    <script>
        const eventBus = new Vue();

        new Vue({
            el: "#app",
            created: function () {
                eventBus.$on("triggerEventBus", function (value) {
                    console.log("received event data : " + value)
                })
            },
            components: {
                "child-component": {
                    methods: {
                        showLog() {
                            eventBus.$emit("triggerEventBus", Math.floor(Math.random()*100));
                        }
                    },
                    template: `<div>하위 컴포넌트 영역입니다.<button v-on:click="showLog">show</button></div>`,
                },
            },
        })

    </script>
</body>

</html>
```

## [ Vue Router ]

라우팅 기능을 구현할 수 있도록 지원하는 공식 라이브러리

```html
<router-link to="URL Value"> // 페이지 이동 태그. 화면에서는 <a>로 표시됨
<router-view> // 페이지 표시 태그. 변경되는 URL에 따라 해당 컴포넌트를 뿌려주는 영역
```

 - 활용

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://unpkg.com/vue@2/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router@3/dist/vue-router.js"></script>    
</head>

<body>
    <div id="app">
        <p>
            <router-link to="/main">MAIN COMPONENT</router-link>
            <router-link to="/login">LOGIN COMPONENT</router-link>
        </p>
        <router-view></router-view>
    </div>
    <script>
        const Main = { template : `<div>main</div>`}
        const Login = { template : `<div>login</div>`}

        const routes = [
            { path: "/main", component: Main },
            { path: "/login", component: Login},
        ];

        const router = new VueRouter({routes})

        const app = new Vue({
            router,
        }).$mount("#app");
    </script>
</body>

</html>
```

`$mount()` API는 `el` 속성과 동일하게 인스턴스를 화면에 붙이는 역할을 함.

인스턴스를 생성할 때 `el` 속성을 넣지 않았더라도 생성하고 나서 $mount()를 이용하면 강제로 인스턴스를 화면에 붙일 수 있음

Vue Router의 공식 문서에는 모두 인스턴스 안에 el을 지정하지 않고 라우터만 지정하여 생성한 다음 생성된 인스턴스를 $mount()를 이용해 붙이는 식으로 안내하는 중

해시 값(#)을 없애고 싶다면?

```js
const router = new VueRouter({
    mode: "history",
    routes,
})
```

### - Nested Router

최소 2개 이상의 컴포넌트를 화면에 나타낼 수 있음

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.js"></script>
</head>

<body>
    <div id="app">
        <router-link to="/user">USER</router-link>
        <router-view></router-view>
    </div>
    <script>
        //Componet 내용 정의
        const User = {
            template: `
            <div> 
                User Component 
                <p>
                    <router-link to="/user/posts">posts</router-link>
                    <router-link to="/user/profile">profile</router-link>
                </p>
                <router-view></router-view> <!-- 하위 컴포넌트가 뿌려질 영역 -->
            </div>
            `
        }; //컴포넌트 내용 정의

        const UserPost = { template: `<p>User Post Component</p>` }
        const UserProfile = { template: `<p>User Profile Component</p>` }

        //네스티드 라우팅 정의
        const routes = [
            {
                path: "/user",
                component: User,
                children: [
                    { path: "posts", component: UserPost },
                    { path: "profile", component: UserProfile },
                ]
            },
        ]

        //뷰 라우터 정의
        const router = new VueRouter({
            // mode: "history",
            routes,
        });

        //뷰 인스턴스에 라우터 추가
        const app = new Vue({
            router
        }).$mount("#app");


    </script>
</body>

</html>
```

### - Named View

네스티드 라우터는 화면을 구성하는 컴포넌트의 수가 적을 때는 유용하지만 한 번에 많은 컴포넌트를 표시하는 데는 한계가 존재.

네임드 뷰는 특정 페이지로 이동했을 때 여러 개의 컴포넌트를 동시에 표시하는 라우팅 방식.

네스티드 라우터는 상위 컴포넌트가 하위 컴포넌트를 포함하는 형식이지만 네임드 뷰는 같은 레벨에서 여러 개의 컴포넌트를 한번에 표시.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.js"></script>
</head>

<body>
    <div id="app">
        <router-view name="header"></router-view>
        <router-view></router-view> <!-- name이 없을 경우 Default -->
        <router-view name="footer"></router-view>
    </div>
    <script>
        const Body = { template : `<div>This is Body</div>` }
        const Header = { template : `<div>This is Header</div>` }
        const Footer = { template : `<div>This is Footer</div>` }

        const router = new VueRouter({
            routes: [
                {
                    path: "/",
                    components: {
                        default: Body,
                        header: Header,
                        footer: Footer,
                    }
                }
            ]
        });

        const app = new Vue({
            router
        }).$mount("#app");
    </script>
</body>

</html>
```

## [ HTTP Request ]

 - About `vue-resource`

뷰 리소스는 초기에 코어 팀에서 공식적을 권하는 라이브러리였으나 2016년 말에 에반이 공식적인 지원을 중단하기로 결정하면서 다시 기존에 관리했던 PageKit 팀의 라이브러리로 돌아갔음.(라우팅, 상태 관리와 달리 필수적인 기능이 아니라고 판단)

 - `axios` 추천


## [ Vue Template ]

HTML, CSS 등의 마크업 속성과 뷰 인스턴스에서 정의한 데이터 및 로직들을 연결하여 사용자가 브라우저에서 볼 수 있는 형태의 HTML로 변환해 주는 속성

라이브러리 내부적으로 template 속성에서 정의한 마크업 + 뷰 데이터를 가상 돔 기반의 render() 함수로 변환. 변환된 render() 함수는 최종적으로 사용자가 볼 수 있게 화면을 그리는 역할.

 - template 속성을 사용하지 않은 경우

```html
<div id="app">
    <h3>{{ message }}</h3>
</div>

<script>
    new Vue({
        el: "#app",
        data: {
            message: "Hello Vue.js",
        }
    })
</script>
```

 - template 속성을 사용한 경우

```html
<div id="app"></div>

<script>
    new Vue({
        el: "#app",
        data: {
            message: "Hello Vue.js",
        },
        template: `<h3>{{ message }}</h3>`,
    })
</script>
```

### - Data Binding

#### `{{ }} - 콧수염 괄호`

뷰 인스턴스의 데이터를 HTML 테그에 연결하는 텍스트 삽입 방식

자바스크립트 표현식도 사용 가능

```html
<p>{{ message.split('').reverse().join('') }}</p>
```

 - `v-bind` : 데이터 바인딩. (`v-bind:id`는 `:id`로 간추릴 수 있음, Not Recommended).
 - `v-once` : 뷰 데이터가 변경되어도 값을 바꾸고 싶지 않을 때 사용.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.js"></script>
</head>

<body>
    <div id="app">
        <p v-bind:id="idA">id binding</p>
        <p v-bind:class="classA">class binding</p>
        <p v-bind:style="styleA">style binding</p>
    </div>
    <script>
        new Vue({
            el: "#app",
            data: {
                idA: 10,
                classA: "container",
                styleA: "color: blue",
            }
        })
    </script>
</body>

</html>
```
 - 활용

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.js"></script>
</head>

<body>
    <div id="app">
        <div> {{ message }} </div>
        <div> {{ reversedMessage }} </div>
    </div>
    <script>
        new Vue({
            data: function(){
                return {
                    message: "Hello Vue.js",
                }
            },
            computed: { // 데이터 속성을 자동으로 계산해주는 속성
                reversedMessage: function(){ 
                    return this.message.split('').reverse().join('');
                }
            }
        }).$mount("#app");
    </script>
</body>

</html>
```
### - Vue Directive

HTML 태그 안에 v- 접두사를 가지는 모든 속성을 의미

```html
<a v-if="flag">Vue.js</a> <!-- flag 값이 참이면 보이고 거짓이면 안보임 -->
```

| name | role |
|:---:|:---:|
|`v-if`|지정한 뷰 데이터 값의 참, 거짓 여부에 따라 해당 HTML 태그를 화면에 표시하거나 표하지 않음|
|`v-for`|지정한 뷰 데이터의 개수만큼 해당 HTML 태그의 반복을 출력|
|`v-show`| `v-if`와 같지만, 태그를 없애는 것이 아니라 `display:none`으로 바꾸는 것|
|`v-bind`| HTML 태그의 기본 속성과 뷰 데이터 속성을 연결 |
|`v-on`| 화면 요소의 이벤트를 감지하여 처리할 때 사용 |
|`v-model`| form에서 주로 사용되는 속성. 폼에 입력한 값을 뷰 인스턴스의 데이터와 즉시 동기화. 화면에 입력된 값을 저장하여 서버에 보내거나 watch와 같은 고급 속성을 이용하여 추가 로직을 수행할 수 있음. `<input>`, `<select>`, `<textarea>` 태그에만 사용 가능|

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.js"></script>
</head>

<body>
    <div id="app">
        <a v-if="flag">Vue.js</a>
        <ul>
            <li v-for="system in systems">{{ system }}</li>
        </ul>
        <p v-show="flag">Vue.js showing</p>
        <h5 v-bind:id="uid">뷰 입문서</h5>
        <button v-on:click="popupAlert">경고 창 버튼</button>
    </div>
    <script>
        new Vue({
            data: function() {
                return {
                    flag: true,
                    systems: ["android", "ios", "window"],
                    uid: 10,
                }
            },
            methods: {
                popupAlert() {
                    alert("경고창 표시");
                    this.flag = !this.flag;
                }
            }
        }).$mount("#app");
    </script>
</body>

</html>
```

#### 이벤트 처리

 - 기본 사용법 

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.js"></script>
</head>

<body>
    <div id="app">
        <button v-on:click="clickBtn">클릭</button>
    </div>
    <script>
        new Vue({
            methods: {
                clickBtn() {
                    alert("clicked")
                }
            }
        }).$mount("#app");
    </script>
</body>

</html>
```

 - 인자 넘겨주는 법

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.js"></script>
</head>

<body>
    <div id="app">
        <button v-on:click="clickBtn(100)">클릭</button>
    </div>
    <script>
        new Vue({
            methods: {
                clickBtn(number) {
                    console.log(number);
                }
            }
        }).$mount("#app")
    </script>
</body>

</html>
```

 - 이벤트 객체 받는법

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.js"></script>
</head>

<body>
    <div id="app">
        <button v-on:click="clickBtn">클릭</button>
    </div>
    <script>
        new Vue({
            methods: {
                clickBtn(event) {
                    console.log(event);
                }
            }
        }).$mount("#app")
    </script>
</body>

</html>
```

 - 인자와 이벤트 둘 다 넘기는 방법

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.js"></script>
</head>

<body>
    <div id="app">
        <button v-on:click="clickBtn(100, $event)">클릭</button>
    </div>
    <script>
        new Vue({
            methods: {
                clickBtn(num, evt) {
                    console.log(num, evt);
                }
            }
        }).$mount("#app")
    </script>
</body>

</html>
```

### - 고급 템플릿 기법

#### `computed` 속성

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.js"></script>
</head>

<body>
    <div id="app">
        <div>{{ reversedMessage }}</div>
    </div>
    <script>
        new Vue({
            data: function(){
                return {
                    message: "Hello Vue.js",
                }
            },
            computed: {
                reversedMessage(){
                    return this.message.split('').reverse().join('');
                }
            },
        }).$mount("#app")
    </script>
</body>

</html>
```

`computed 장점`: data 속성 값의 변화에 따라 자동으로 다시 연산(computed 속성에서 사용하고 있는 data 속성 값이 변경되면 전체 값을 다시 한번 계산) + 캐싱. 동일한 연산을 반복해서 하지 않기 위해 연산의 결과 값을 미리 저장하고 있다가 필요할 때 불러옴.


#### `methods` 속성

computed 속성과의 큰 차이점으로 methods 속성은 호출할 때만 해당 로직이 수행되고, computed 속성은 대상 데이터의 값이 변경되면 자동적으로 수행됨.

수동적으로 데이터를 갱신하느냐, 능동적으로 갱신하느냐의 차이

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.js"></script>
</head>

<body>
    <div id="app">
       <p>{{ message }}</p> 
       <button v-on:click="reverseMsg">문자열 역순</button>
    </div>
    <script>
        new Vue({
            data: function(){
                return {
                    message: "Hello Vue.js",
                }
            },
            methods: {
                reverseMsg() {
                    this.message = this.message.split('').reverse().join('')
                    return this.message;
                }
            },
        }).$mount("#app");
    </script>
</body>

</html>
```

methods 속성은 수행할 때마다 연산을 하기 때문에 별도로 캐싱하지 않음

복잡한 연산을 반복 수행해서 화면에 나타내야 하면 computed 속성을 이용하는 것이 methods 속성을 이용하는 것보다 성능 면에서 효율 

#### `watch` 속성

watch 속성은 데이터 변화를 감지하여 자동으로 특정 로직을 수행함. computed 속성과 유사, but computed가 내장 API를 활용한 간단한 연산 정도로 적합한 반면, watch 속성은 데이터 호출과 같이 시간이 상대적으로 많이 소모되는 비동기 처리에 적합.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello Vue.js</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.5.3/dist/vue-router.js"></script>
</head>

<body>
    <div id="app">
        <input v-model="message">
    </div>
    <script>
        new Vue({
            data: function() {
                return {
                    message: "Hello Vue.js",
                }
            },
            watch: {
                message: function(data){
                    console.log(`message value: ${data}`);
                }
            },
        }).$mount("#app")
    </script>
</body>

</html>
```

#### watch와 computed의 차이점

computed : 선언형 프로그래밍(?) 계산된 값을 출력하는 용도

watch : 명령형 프로그래밍(?) 어떤 조건이 되었을 때 함수를 실행하는 트리거


## [ Single File Components ]

`.vue` 파일로 프로젝트 구조를 구성하는 방식

```vue
<template>
    <!-- 화면에 표시할 요소들을 정의하는 영역 -->
    <!-- HTML, Vue Data Binding... -->
</tempalte>

<script>
export default {
    // 자바스크립트 내용
    // Vue Component 내용을 정의하는 영역
    // template, data, methods 등
}
</script>

<style>
/* <style scoped> Child Component 영향 줄임. 해당 컴포넌트에만 적용하겠음 */
    /* CSS 스타일 내용 */
</style>
```

## [Create Project Sample]

```bash
npm i vue@2.X.X vue-router@3.X.X vuex@3.X.X
npm i -D @vue/cli-service vue-template-compiler
```
###### ISSUE: `vue-template-compiler`는 내부적으로 필요할 것 같은데 필수적으로 불러와야 하는지는 모름

 - `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VUE PROJECT COMPOSE</title>
</head>
<body>
   <div id="app"></div> 
</body>
</html>
```

 - `src/App.vue`

```vue
<template>
    <div id="app">
        <h1>HELLO WORLD</h1>
        <h1>{{ message }}</h1>
    </div>
</template>

<script>
export default {
    name: "Application",
    data: function(){
        return {
            message: "Hello World",
        }
    }
}
</script>
```

 - `src/main.js`

```js
import Vue from 'vue'
import Application from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(Application),
}).$mount('#app')
```

 - `babel.config.js`

```js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
```

 - `jsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "node",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  }
}
```

 - `package.json` 내용 추가

```json
...
...
...
  "scripts": {
    "serve": "vue-cli-service serve --port 5501",
    "build": "vue-cli-service build"
  },
...
...
...
```

 - `vue.config.js`

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
```

### - running test

```
npm run serve
```


<br><br><br><br><br>