 - Xms20M : 시작할 때 20MB의 Heap 메모리 할당. 그래서 시작할 때 20M free, 20M total이 됨
 - Xmn10M : young object 새롭게 생성된 객체들이 처음 자리잡는 영역
 - Xmx50M : 더 많은 Heap이 필요할 때 최대 50M

#### 기본값 체크

```sh
java -XX:+PrintFlagsFinal -version 2>&1 | findstr /I "heapsize permsize version"
```
