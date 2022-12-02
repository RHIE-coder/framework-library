# Lodash

## # api 중 suffix 관련 의미

 - By: iteratee - The iteratee invoked per element. (`_.matches`, `_.matchesProperty`, `_.property`)
 - While : predicate - The function invoked per iteration. (`_.matches`, `_.matchesProperty`, `_.property`)
 - With : comparator - 인자(들)을 받아 비교나 검증(boolean 반환)

## # Throttle & Debounce

 - Throttle : 행위가 발생하고 정해진 시간 후에 이벤트 발생. 매 행위마다 이벤트가 발생하는 방식이 아님.(유사 주기적 이벤트 발생)
 - Debounce : 주어진 시간(카운트다운) 안에 행위가 발생하지 않으면 이벤트 발생. 발생 시에는 시간 초기화. 끝자락에 이벤트가 1번 호출되는 방식.

