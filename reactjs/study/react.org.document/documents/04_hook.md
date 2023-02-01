# Hook의 규칙

## - 최상위(at the Top Level)에서만 Hook을 호출해야 합니다

반복문, 조건문 혹은 중첩된 함수 내에서 Hook을 호출하지 마세요. 

## - 오직 React 함수 내에서 Hook을 호출해야 합니다

Hook을 일반적인 JavaScript 함수에서 호출하지 마세요. 대신 아래와 같이 호출할 수 있습니다.

---

# Hook API

## - 기본 Hook

 - useState
 - useEffect
 - useContext

## - 추가 Hooks

 - useReducer
 - useCallback
 - useMemo
 - useRef
 - useImperativeHandle
 - useLayoutEffect
 - useDebugValue
 - useDeferredValue
 - useTransition
 - useId

## - Library Hooks

 - useSyncExternalStore
 - useInsertionEffect