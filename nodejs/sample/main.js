const fs = require('fs');

function numberOfDigits(num) {
    return num.toString().length;
}

function generateAccount(num) {
    const digits = numberOfDigits(num);
    const source = new Array(40 - digits);
    source.fill(0);
    source.push(...num.toString())
    return '0x'+source.join('');
}

(async() => {

    const accountMocks = [];
    
    for(let i = 1; i <= 1000; ++i) {
        accountMocks.push(generateAccount(i))        
    }

    fs.writeFileSync('myMock.json', JSON.stringify(accountMocks, null, 2));
})()

