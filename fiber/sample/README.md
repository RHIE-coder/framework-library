# 내장 미들웨어

## BasicAuth


## Cache


## Compress


## CORS


## CSRF


## EarlyData


## Encrypt Cookie


## EnvVar


## ETag


## ExpVar

Go Fiber에서는 expvar 패키지를 사용하여 응용 프로그램의 런타임 상태를 모니터링 할 수 있습니다.

expvar 패키지는 런타임 상태를 표시하기 위해 var 객체를 노출합니다. var 객체는 문자열로 된 이름과 임의의 값으로 구성되며, 이러한 객체를 사용하여 예를 들어 현재 연결된 클라이언트 수, 처리 된 요청 수, 메모리 사용량 등과 같은 다양한 정보를 추적할 수 있습니다.

Go Fiber에서 expvar 패키지를 사용하면, /debug/vars 엔드포인트를 통해 이러한 정보를 확인할 수 있습니다. 이 엔드포인트에 GET 요청을 보내면, 현재 응용 프로그램의 런타임 상태 정보를 제공하는 JSON 형식의 응답을 받을 수 있습니다. 이를 통해 응용 프로그램의 성능 및 상태를 모니터링하고, 문제가 발생할 경우 신속하게 대응할 수 있습니다.

## Favicon


## FileSystem
 - https://github.com/markbates/pkger
 - https://github.com/gobuffalo/packr
 - https://github.com/GeertJohan/go.rice
 - https://github.com/UnnoTed/fileb0x
 - https://github.com/rakyll/statik

## Idempotency


## Limiter


## Logger


## Monitor


## Pprof


## Proxy


## Recover


## RequestID


## Session


## Skip


## Timeout

---

# 3rd Party

github.com/gofiber/contrib/swagger