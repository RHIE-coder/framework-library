# Vue Router

## [Getting Started]

 - HTML

```html
<script src="https://unpkg.com/vue@2/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router@3/dist/vue-router.js"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- use router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- route outlet -->
  <!-- component matched by the route will render here -->
  <router-view></router-view>
</div>
```

 - JS

```js
// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  router
}).$mount('#app')

// Now the app has started!
```

## [Essentials]

### - `$route.params`

| pattern | matched path | params |
|:---:|:---:|:---:|
| `/user/:username` | /user/evan | `{ username: 'evan' }` |
| `/user/:username/post/:post_id` | /user/evan/post/123 | `{ username: 'evan', post_id: '123'}`|

### - 동적 라우트 매칭

매개 변수와 함께 라우트를 사용할 때 주의 해야할 점은 사용자가 /user/foo에서 /user/bar로 이동할 때 동일한 컴포넌트 인스턴스가 재사용된다는 것입니다. 두 라우트 모두 동일한 컴포넌트를 렌더링하므로 이전 인스턴스를 삭제 한 다음 새 인스턴스를 만드는 것보다 효율적입니다. 그러나 이는 또한 컴포넌트의 라이프 사이클 훅이 호출되지 않음을 의미합니다.

```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 경로 변경에 반응하여...
    }
  }
}
```

```js
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

#### 매칭 우선순위

동일한 URL이 여러 라우트와 일치하는 경우가 있습니다. 이 경우 일치하는 우선 순위는 라우트 정의의 순서에 따라 결정됩니다. 즉, 경로가 더 먼저 정의 될수록 우선 순위가 높아집니다.

### - 중첩된 라우트

```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // /user/:id/profile 과 일치 할 때
          // UserProfile은 User의 <router-view> 내에 렌더링 됩니다.
          path: 'profile',
          component: UserProfile
        },
        {
          // /user/:id/posts 과 일치 할 때
          // UserPosts가 User의 <router-view> 내에 렌더링 됩니다.
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

### - Programmatic Navigation

#### router.push(location, onComplete?, onAbort?)

Vue 인스턴스 내부에서 라우터 인스턴스에 $router로 액세스 할 수 있습니다. 그러므로 `this.$router.push`를 사용 할 수 있습니다.

| Declarative | Programmatic |
|:---:|:---:|
| `<router-link :to="...">` | `router.push(...)`|

```js
// 리터럴 string
router.push('home')

// object
router.push({ path: 'home' })

// 이름을 가지는 라우트
router.push({ name: 'user', params: { userId: 123 }})

// 쿼리와 함께 사용, 결과는 /register?plan=private 입니다.
router.push({ path: 'register', query: { plan: 'private' }})
```

template 내에서 `<route-link :to=”path”>` 를 통해 페이지 이동을 하면 이는 내부에서 $router.push 를 호출하는 것

History Stack에 추가됨

```
home -> list?page=1 -> list?page=2 ...
```

#### router.replace(location)

router.push와 같은 역할을 하지만 유일한 차이는 새로운 히스토리 항목에 추가하지 않고 탐색한다는 것입니다. 이름에서 알 수 있듯이 현재 항목을 대체합니다.

 - push : URL 이동. 히스토리 스택에 추가되므로 뒤로가기 버튼 동작시 이전 URL 로 이동
 - replace : URL 이동. 현재 URL 을 대체하기 때문에 히스토리 스택 쌓지 않음

단순히 현재 페이지를 전환하는 역할

#### router.go(n)

이 메소드는 window.history.go(n)와 비슷하게 히스토리 스택에서 앞으로 또는 뒤로 이동하는 단계를 나타내는 하나의 정수를 매개 변수로 사용합니다.

```js
// 한 단계 앞으로 갑니다. history.forward()와 같습니다. history.forward()와 같습니다.
router.go(1)

// 한 단계 뒤로 갑니다. history.back()와 같습니다.
router.go(-1)

// 3 단계 앞으로 갑니다.
router.go(3)

// 지정한 만큼의 기록이 없으면 자동으로 실패 합니다.
router.go(-100)
router.go(100)
```

router.push, router.replace 및 router.go는 window.history.pushState,window.history.replaceState 및 window.history.go (opens new window)와 상응합니다. 그들은 window.history API를 모방합니다.

vue-router 네비게이션 메소드(push,replace,go)는 모든 라우터 모드(history,hash 및abstract)에서 일관되게 작동합니다.

### - Named Routes

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})

<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

// 이것은 router.push()와 프로그램적으로 사용되는 것과 정확히 같은 객체입니다.
// 두 경우 모두 라우터는 /user/123 경로로 이동합니다.
router.push({ name: 'user', params: { userId: 123 }})
```

### - Named Views

```js
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>

const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

### - Redirect and Alias

```js
// "/a" --> "/b"
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
// ---- or
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
// ---- or
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 함수는 인수로 대상 라우트를 받습니다.
      // 여기서 path/location 반환합니다.
    }}
  ]
})
```

#### Alias

/a의 별칭은 /b는 사용자가 /b를 방문했을 때 URL은 /b을 유지하지만 사용자가 /a를 방문한 것처럼 매칭합니다.

```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

### - Passing Props to Route Components

컴포넌트에서 $route를 사용하면 특정 URL에서만 사용할 수 있는 컴포넌트의 유연성을 제한하는 라우트와 강한 결합을 만듭니다.

컴포넌트와 라우터 속성을 분리하려면 다음과 같이 하십시오.

```js
// 의존성이 강한 경우
const User = {
    template: '<div> User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
    routes: [
        {path: '/user/:id', component: User},
    ]
})

// 의존성 해제
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },
  ]
}) // props를 true로 설정하면 route.params가 컴포넌트 props로 설정됩니다.
```

#### Object Mode

```js
const router = new VueRouter({
  routes: [
    { path: '/promotion/from-newsletter', component: Promotion, props: { newsletterPopup: false } }
  ]
})
```

#### Function Mode

```js
const router = new VueRouter({
  routes: [
    { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
  ]
})
```

## [Advanced]

### - Navigation Guard

#### 종류

 - App 전역(Global)에서 동작하는 Global Guard
 - 특정 URL에서만 동작하는 Router Guard
 - 라우터 컴포넌트 안에 정의하는 Component Guard

#### Global Guard

 - `router.beforeEach`

라우터에 들어가기 전 실행 

```js
router.beforeEach(function(to, from, next){
  // 이동 위치 : to 라우터 객체
  // 현재 위치 : from 라우터 객체
  // to-->from : next 함수
})
```

 - `router.beforeResolve`

컴포넌트 가드가 끝난 후 실행

You can register a global guard with router.beforeResolve. This is similar to router.beforeEach, with the difference that resolve guards will be called right before the navigation is confirmed, after all in-component guards and async route components are resolved.

 - `router.afterEach`

```js
router.afterEach((to, from) => {
  // ...
})
```

라우트 이동이 해결된 후에 실행

#### Router Guard
 - Per-Route Guard
```js
var router = new VueRouter({
  routes: [
    {
      path: '/',
      component: HomeView,
      beforeEnter: function(to, from, next) {
        // ...
      }
    }
  ]
})
```

#### Component Guard(In-Component Guards)

 - `router.beforeRouteEnter`

 - `router.beforeRouteUpdate`

 - `router.beforeRouteLeave`

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {
    // called before the route that renders this component is confirmed.
    // does NOT have access to `this` component instance,
    // because it has not been created yet when this guard is called!
  },
  beforeRouteUpdate(to, from, next) {
    // called when the route that renders this component has changed.
    // This component being reused (by using an explicit `key`) in the new route or not doesn't change anything.
    // For example, for a route with dynamic params `/foo/:id`, when we
    // navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
    // will be reused (unless you provided a `key` to `<router-view>`), and this hook will be called when that happens.
    // has access to `this` component instance.
  },
  beforeRouteLeave(to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
  }
}
```



#### 종합 순서 요약

1. Navigation triggered.
1. Call beforeRouteLeave guards in deactivated components.
1. Call global beforeEach guards.
1. Call beforeRouteUpdate guards in reused components.
1. Call beforeEnter in route configs.
1. Resolve async route components.
1. Call beforeRouteEnter in activated components.
1. Call global beforeResolve guards.
1. Navigation confirmed.
1. Call global afterEach hooks.
1. DOM updates triggered.
1. Call callbacks passed to next in beforeRouteEnter guards with instantiated instances.

### - Route Meta Fields

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

 - usage

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})
```

### - 데이터 가져오기

```vue
<template>
  <div class="post">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    // 뷰가 생성되고 데이터가 이미 감시 되고 있을 때 데이터를 가져온다.
    this.fetchData()
  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출됩니다.
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // `getPost`를 데이터 가져오기 위한 유틸리티/API 래퍼로 변경합니다.
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}
</script>
```

### - 스크롤 동작

!!! 히스토리 모드에서만 동작함

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // 원하는 위치로 돌아가기
    return { x: 0, y: 0 }
  }
})
```

savePosition을 반환하면 뒤로/앞으로 버튼으로 탐색할 때 네이티브와 같은 동작 발생

```js
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```