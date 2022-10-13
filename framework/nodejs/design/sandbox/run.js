const fs = require("fs");
const cache = {};

function inconsistentRead(filename, callback) {
    if(cache[filename]) {
        //동기적으로 호출됨
        callback(cache[filename]);
    }else {
        //비동기 함수
       setTimeout(callback, 1000) 
    }
}

function createFileReader(filename) {
    const listeners = [];
    inconsistentRead(filename, value => {
        listeners.forEach(listener => listener(value));
    })

    return {
        onDataReady: listener => listeners.push(listener)
    };
}
const reader1 = createFileReader("data.txt");
reader1.onDataReady(data => {
    console.log(`First call data: ${data}`);

    // ... 잠시 후 동일한 파일에 대해 다시 읽기를 수행합니다.
    const reader2 = createFileReader("data.txt");
    reader2.onDataReady(data => {
        console.log(`Second call data: ${data}`);
    })
})

