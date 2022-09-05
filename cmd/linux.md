```sh
cat print | jq | sed -E 's/(^ *)"([^"]*)":/\1\2:/'
```
본 명령어는 JSON `{ "name" : "rhie" }`의 Key를 둘러싸고 있는 `"`을 `{ name : "rhie" }`와 같이 없애줍니다.

<hr><br><br><br><br>
