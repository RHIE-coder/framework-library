module.exports = {
  apps: [{ // apps은 고정
    name: 'sampleApp',
    script: './src/app.js',
    instances: 0, //instance 항목값을 '0'으로 설정하면 CPU 코어 수 만큼 프로세스를 생성하겠다는 뜻
    exec_mode: 'cluster',
  }]
}