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

* (): 데이터가 변경되는 경우에만 거침

 - (인스턴스의 데이터 변경)
    - (`beforeUpdate`) : el 속성에서 지정한 화면 요소에 인스턴스가 부착되고 나면 인스턴스에 정의한 속성들이 화면에 치환됨. 치환된 값은 뷰의 반응성(Reactivity, 코드의 변화에 따라 화면이 반사적으로 반응하여 빠르게 화면을 갱신하는 것을 의미)를 제공하기 위해 $watch 속성으로 감시(데이터 관찰). 관찰하고 있는 데이터가 변경되면 Virtual DOM으로 화면을 다시 그리기 전에 호출되는 단계. 변경 예정인 새 데이터에 접근할 수 있어 변경 예정 데이터의 값과 관련도니 로직을 미리 넣을 수 있음. 이곳에 값을 변경하는 로직을 넣더라도 화면이 다시 그려지지는 않음.
 - (화면 재 렌더링 및 데이터 갱신)
    - (`updated`) : 데이터가 변경되고 나서 Virtual DOM으로 다시 화면을 그리고 나면 실행되는 단계. 데이터 변경으로 인한 화면 요소 변경까지 완료된 시점이므로, 데이터 변경 후 호마녀 요소 제어와 관련된 로직을 추가히가 좋은 단계. 이 단계에서 데이터를 변경하면 무한 루프에 빠질 수 있어서 computed, watch와 같은 속성을 사용하여야 함. 데이터 값 갱신 로직은 `beforeUpdate`에 추가하고 이곳에서는 변경 데이터의 DOM과 관련된 로직을 추가하는 것이 좋음

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
<!-- ### - Build Project

```
npm install vue
npm i -D @vue/cli-service
npm i -D @babel/core @vue/cli-plugin-babel 

``` -->
