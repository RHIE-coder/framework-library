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
        return this;
    }

}

API.name('chunk').arg(`array`).arg(`[size=1]`).call(`[1, 2, 3, 4, 5]`, `3`)
API.name('compact').arg(`array`).desc(`falsy한 값들을 제외 시켜줌(false, null, 0, "", undefined, NaN)`).call(`[0, 1, false, 2, '', 3]`);
API.name('concat').arg(`array`).arg(`[values]`).desc(`concat한 새로운 배열 생성`).call(`[1], 2, [3], [[4]]`);
API.name('difference').arg(`array`).arg(`[value]`).desc(`second argument 배열에 포함하지 않은 first argument 배열`).call(`[1,2,3,4,7,8], [3,4,5]`);
API.name('differenceBy').arg(`array`).arg(`[values]`).arg(`[comparator]`).desc(`difference 기준에 따라 실행`).call(`[2.1, 1.2], [2.3, 3.4], Math.floor`).call(`[{'x':2},{'x':1}],[{'x':1}],'x'`);
API.name('differenceWith').arg(`array`).arg(`[value]`).arg(`[comparator]`).desc(`comparator의 기준으로 일치하는 것을 제외한 것을 반환`);
{
    const objects = [{x:1, y:2}, {x:2, y:1}];
    _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
    // => [{ 'x': 2, 'y': 1 }]
}

API.name(`drop`).arg(`array`).arg(`[n=1]`).desc(`n의 수 만큼 요소 누락(왼쪽)`)
{
    _.drop([1, 2, 3]);
    // => [2, 3]
    
    _.drop([1, 2, 3], 2);
    // => [3]
    
    _.drop([1, 2, 3], 5);
    // => []
    
    _.drop([1, 2, 3], 0);
    // => [1, 2, 3]
}

API.name(`dropRight`).arg(`array`).arg(`[n=1]`)
{
    _.dropRight([1, 2, 3]);
    // => [1, 2]
    
    _.dropRight([1, 2, 3], 2);
    // => [1]
    
    _.dropRight([1, 2, 3], 5);
    // => []
    
    _.dropRight([1, 2, 3], 0);
    // => [1, 2, 3]
}

API.name(`dropRightWhile`).arg(`array`).arg(`[predicate=_.identity]`).desc(`조건이 들어가 있는 drop 오른쪽`)
{
    const users = [
        { 'user': 'barney',  'active': true },
        { 'user': 'fred',    'active': false },
        { 'user': 'pebbles', 'active': false }
    ];

    _.dropRightWhile(users, function(o) { return !o.active; });
    // => objects for ['barney']
    
    // The `_.matches` iteratee shorthand.
    _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
    // => objects for ['barney', 'fred']
    
    // The `_.matchesProperty` iteratee shorthand.
    _.dropRightWhile(users, ['active', false]);
    // => objects for ['barney']
    
    // The `_.property` iteratee shorthand.
    _.dropRightWhile(users, 'active');
    // => objects for ['barney', 'fred', 'pebbles']
}

API.name(`dropWhile`).arg(`array`).arg(`[predicate=_.identity]`).desc(`조건이 들어가 있는 drop 왼쪽`)

API.name(`fill`).arg(`array`).arg(`value`).arg(`[start=0]`).arg(`[end=array.length]`)
{
    const array = [1, 2, 3];
 
    _.fill(array, 'a');
    console.log(array);
    // => ['a', 'a', 'a']
    
    _.fill(Array(3), 2);
    // => [2, 2, 2]
    
    _.fill([4, 6, 8, 10], '*', 1, 3);
    // => [4, '*', '*', 10]
}

