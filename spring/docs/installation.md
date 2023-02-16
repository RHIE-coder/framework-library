```sh
sudo apt-get install openjdk-11-jdk
```

```sh
curl -s "https://get.sdkman.io" | bash
sdk install gradle 8.0
```

# START

```sh
java -XX:+PrintFlagsFinal -version 2>&1 | findstr /I "heapsize permsize version"

& 'C:\Users\publish\openJDK\jdk-11\bin\java.exe' '@C:\Users\publish\AppData\Local\Temp\cp_6wghsqi7wle82p7ltm43dgdvt.argfile' 'com.example.demo.DemoApplication'
& 'C:\Users\publish\openJDK\jdk-11\bin\java.exe -Xms8m -Xmx8m -Xmn2m' '@C:\Users\publish\AppData\Local\Temp\cp_6wghsqi7wle82p7ltm43dgdvt.argfile' 'com.example.demo.DemoApplication'
& 'C:\Users\publish\openJDK\jdk-11\bin\java.exe --Xms8m' '@C:\Users\publish\AppData\Local\Temp\cp_6wghsqi7wle82p7ltm43dgdvt.argfile' 'com.example.demo.DemoApplication'


java -Xmx8g -Xms8g -Xmn2g  -jar .\build\libs\demo-0.0.1-SNAPSHOT.jar
jmap -histo <pid>


jmap -histo 26912 | Out-File ./log.txt
```

