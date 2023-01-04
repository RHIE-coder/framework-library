module.exports = {
  apps: [{  
    name: 'sampleApp',
    script: './src/app.js',
    instances: 0, 
    exec_mode: 'cluster',
  }]
}