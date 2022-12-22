const crypto = require('crypto')

const arr = new Array(200).fill('something')
function processChunk() {
  if (arr.length === 0) {
    // code that runs after the whole array is executed
    // 모든 배열이 실행이 끝난 뒤에 실행됨
  } else {
    console.log('processing chunk')
    /// 10개만 추출
    const subarr = arr.splice(0, 10)
    for (const item of subarr) {
      // 오래 걸리는 작업
      doHeavyStuff(item)
    }
    // 다음 큐로 작업을 밀어넣음
    setImmediate(processChunk)
  }
}

processChunk()

function doHeavyStuff(item) {
  crypto
    .createHmac('sha256', 'secret')
    .update(new Array(10000).fill(item).join('.'))
    .digest('hex')
}

// 다른 작업도 가능한지 확인하기 위한 함수
let interval = setInterval(() => {
  console.log('tick!')
  if (arr.length === 0) clearInterval(interval)
}, 0)