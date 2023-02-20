const fs = require('fs');

function numberOfDigits(num) {
    return num.toString().length;
}

function generateAccount(prefix, num) {
    const prefixDigits = prefix.length
    const digits = numberOfDigits(num);
    const source = new Array(40 - digits - prefixDigits);
    source.fill(0);
    source.push(...num.toString())
    return '0x'+ prefix +source.join('');
}

(async() => {
    const prefix = process.argv[2] || "0"

    const accountMocks = [];
    
    for(let i = 1; i <= 989; ++i) {
        accountMocks.push(generateAccount(prefix, i))        
    }

    fs.writeFileSync('myMock.json', JSON.stringify(accountMocks, null, 2));
})()

