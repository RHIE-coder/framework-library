const _ = require('lodash');

class API {

    constructor(apiName) {
        this.src = '_';
        this.apiName = apiName;
        this.argList = [];
    }

    static name(apiName) {
        return new API(apiName);
    }

    desc(description) {
        this.description = description;
        return this;
    }

    arg(argString) {
        this.argList.push(argString);
        return this;
    }

    call(...argString) {
        const funcFrame = (args) => `${this.src}.${this.apiName}(${args.join(', ')})`
        console.log(`

        ${funcFrame(this.argList)} 
        ${this.description ?? ''}

        command:

            ${funcFrame(argString)}

        `);
        console.log(eval(funcFrame(argString)))
        console.log(`-----------------`);
    }

}

API.name('chunk').arg(`array`).arg(`[size=1]`).call(`[1, 2, 3, 4, 5]`, `3`)
API.name('compact').arg(`array`).desc(`falsy한 값들을 제외 시켜줌(false, null, 0, "", undefined, NaN)`).call(`[0, 1, false, 2, '', 3]`);
API.name('concat').arg(`array`).arg(`[values]`).desc(`concat한 새로운 배열 생성`).call(`[1], 2, [3], [[4]]`);
// deep? shallow?