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

API.name('chunk')
    .arg(`array`)
    .arg(`[size=1]`)
    .call(`[1, 2, 3, 4, 5]`, `3`);
{
    _.chunk(['a', 'b', 'c', 'd'], 2);
    // => [['a', 'b'], ['c', 'd']]
 
    _.chunk(['a', 'b', 'c', 'd'], 3);
    // => [['a', 'b', 'c'], ['d']]
}
/*********************************************/
API.name('compact')
    .arg(`array`)
    .desc(`falsy한 값들을 제외 시켜줌(false, null, 0, "", undefined, NaN)`)
    .call(`[0, 1, false, 2, '', 3]`);
{
    _.compact([0, 1, false, 2, '', 3]);
    // => [1, 2, 3]
}
/*********************************************/
API.name('concat')
    .arg(`array`)
    .arg(`[values]`)
    .desc(`concat한 새로운 배열 생성`)
    .call(`[1], 2, [3], [[4]]`);
{
    const array = [1];
    const other = _.concat(array, 2, [3], [[4]]);
    
    console.log(other);
    // => [1, 2, 3, [4]]
    
    console.log(array);
    // => [1]
}
/*********************************************/
API.name('difference')
    .arg(`array`)
    .arg(`[value]`)
    .desc(`second argument 배열에 포함하지 않은 first argument 배열`)
    .call(`[1,2,3,4,7,8], [3,4,5]`);
{
    _.difference([2, 1], [2, 3]);
    // => [1]
}
/*********************************************/
API.name('differenceBy')
    .arg(`array`)
    .arg(`[values]`)
    .arg(`[comparator]`)
    .desc(`difference 기준에 따라 실행`)
    .call(`[2.1, 1.2], [2.3, 3.4], Math.floor`)
    .call(`[{'x':2},{'x':1}],[{'x':1}],'x'`);
{
    _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
    // => [1.2]
    
    // The `_.property` iteratee shorthand.
    _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
    // => [{ 'x': 2 }]
}
/*********************************************/
API.name('differenceWith')
    .arg(`array`)
    .arg(`[value]`)
    .arg(`[comparator]`)
    .desc(`comparator의 기준으로 일치하는 것을 제외한 것을 반환`);
{
    const objects = [{x:1, y:2}, {x:2, y:1}];
    _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
    // => [{ 'x': 2, 'y': 1 }]
}

API.name(`drop`)
    .arg(`array`)
    .arg(`[n=1]`)
    .desc(`n의 수 만큼 요소 누락(왼쪽)`)
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
/*********************************************/
API.name(`dropRight`)
    .arg(`array`)
    .arg(`[n=1]`)
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
/*********************************************/
API.name(`dropRightWhile`)
    .arg(`array`)
    .arg(`[predicate=_.identity]`)
    .desc(`조건이 들어가 있는 drop 오른쪽`)
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
/*********************************************/
API.name(`dropWhile`)
    .arg(`array`)
    .arg(`[predicate=_.identity]`)
    .desc(`조건이 들어가 있는 drop 왼쪽`)
{
    const users = [
        { 'user': 'barney',  'active': false },
        { 'user': 'fred',    'active': false },
        { 'user': 'pebbles', 'active': true }
    ];
    
    _.dropWhile(users, function(o) { return !o.active; });
    // => objects for ['pebbles']
    
    // The `_.matches` iteratee shorthand.
    _.dropWhile(users, { 'user': 'barney', 'active': false });
    // => objects for ['fred', 'pebbles']
    
    // The `_.matchesProperty` iteratee shorthand.
    _.dropWhile(users, ['active', false]);
    // => objects for ['pebbles']
    
    // The `_.property` iteratee shorthand.
    _.dropWhile(users, 'active');
    // => objects for ['barney', 'fred', 'pebbles']
}
/*********************************************/
API.name(`fill`)
    .arg(`array`)
    .arg(`value`)
    .arg(`[start=0]`)
    .arg(`[end=array.length]`)
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
/*********************************************/
API.name(`findIndex`)
    .arg(`array`)
    .arg(`[predicate=_.identity]`)
    .arg(`[fromIndex=0]`)
{
    const users = [
        { 'user': 'barney',  'active': false },
        { 'user': 'fred',    'active': false },
        { 'user': 'pebbles', 'active': true }
    ];
    
    _.findIndex(users, function(o) { return o.user == 'barney'; });
    // => 0
    
    // The `_.matches` iteratee shorthand.
    _.findIndex(users, { 'user': 'fred', 'active': false });
    // => 1
    
    // The `_.matchesProperty` iteratee shorthand.
    _.findIndex(users, ['active', false]);
    // => 0
    
    // The `_.property` iteratee shorthand.
    _.findIndex(users, 'active');
    // => 2
}
/*********************************************/
API.name('findLastIndex')
    .arg(`array`)
    .arg(`[predicate=_.identity]`)
    .arg(`[fromIndex=array.length-1]`)
    .desc('마지막으로 발견되는 인덱스 반환')
{
    const users = [
        { 'user': 'barney',  'active': true },
        { 'user': 'fred',    'active': false },
        { 'user': 'pebbles', 'active': false }
    ];
    
    _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
    // => 2
    
    // The `_.matches` iteratee shorthand.
    _.findLastIndex(users, { 'user': 'barney', 'active': true });
    // => 0
    
    // The `_.matchesProperty` iteratee shorthand.
    _.findLastIndex(users, ['active', false]);
    // => 2
    
    // The `_.property` iteratee shorthand.
    _.findLastIndex(users, 'active');
    // => 0
}
/*********************************************/
API.name('flatten')
    .arg(`array`)
{
    _.flatten([1, [2, [3, [4]], 5]]);
    // => [1, 2, [3, [4]], 5]
}
/*********************************************/
API.name('flattenDeep')
    .arg(`array`)
{
    _.flattenDeep([1, [2, [3, [4]], 5]]);
    // => [1, 2, 3, 4, 5]   
}
/*********************************************/
API.name('flattenDepth')
    .arg(`array`)
    .arg(`[depth=1]`)
{
    const array = [1, [2, [3, [4]], 5]];
 
    _.flattenDepth(array, 1);
    // => [1, 2, [3, [4]], 5]
    
    _.flattenDepth(array, 2);
    // => [1, 2, 3, [4], 5]
}
/*********************************************/
API.name('fromPairs')
    .arg(`pairs`)
{
    _.fromPairs([['a', 1], ['b', 2]]);
    // => { 'a': 1, 'b': 2 }
}
/*********************************************/
API.name('head') // aliases "first"
    .arg(`array`)
{
    _.head([1, 2, 3]);
    // => 1
    
    _.head([]);
    // => undefined
}
/*********************************************/
API.name('indexOf')
    .arg(`array`)
    .arg(`value`)
    .arg(`[fromIndex=0]`)
{
    _.indexOf([1, 2, 1, 2], 2);
    // => 1
    
    // Search from the `fromIndex`.
    _.indexOf([1, 2, 1, 2], 2, 2);
    // => 3
}
/*********************************************/
API.name('initial')
    .arg(`array`)
    .desc('마지막 배열 요소를 제외한 배열 반환')
{
   _.initial([1, 2, 3]);
    // => [1, 2] 
}
/*********************************************/
API.name('intersection')
    .arg(`[arrays]`)
    .desc(`주어진 모든 배열에 공통적으로 모두 들어있는 요소들 반환`)
{
    _.intersection([2, 1], [2, 3], [1, 2, 3]);
    // => [2]
}
/*********************************************/
API.name('intersectionBy')
    .arg(`[arrays]`)
    .arg(`[iteratee=_.identity]`)
{
    _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
    // => [2.1]
    
    // The `_.property` iteratee shorthand.
    _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
    // => [{ 'x': 1 }]
}
/*********************************************/
API.name('intersectionWith')
    .arg(`[arrays]`)
    .arg(`[comparator]`)
{
    const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
    const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
    
    _.intersectionWith(objects, others, _.isEqual);
    // => [{ 'x': 1, 'y': 2 }]
}
/*********************************************/
API.name('join')
    .arg(`array`)
    .arg(`[separator=',']`)
{
    _.join(['a', 'b', 'c'], '~');
    // => 'a~b~c'
}
/*********************************************/
API.name('last')
    .arg(`array`)
{
    _.last([1, 2, 300]);
    // => 300
}
/*********************************************/
API.name('lastIndexOf')
    .arg(`array`)
    .arg(`value`)
    .arg(`[fromIndex=array.length-1]`)
{
    _.lastIndexOf([1, 2, 1, 2], 2);
    // => 3
    
    // Search from the `fromIndex`.
    _.lastIndexOf([1, 2, 1, 2], 2, 2);
    // => 1
}
/*********************************************/
API.name('nth')
    .arg(`array`)
    .arg(`[n=0]`)
    .desc('n번째 요소 가져오기, 음수 값을 주면 정반대로 탐색')
{
    const array = ['a', 'b', 'c', 'd'];
 
    _.nth(array, 1);
    // => 'b'
    
    _.nth(array, -2);
    // => 'c';

    _.nth(array, -6);
    // => undefined;
}
/*********************************************/
API.name('pull')
    .arg('array')
    .arg('[value]')
    .desc('주어진 요소들을 모두 삭제')
{
    const array = ['a', 'b', 'c', 'a', 'b', 'c'];
 
    _.pull(array, 'a', 'c');
    console.log(array);
    // => ['b', 'b']
}
/*  NOTE
    _without은 주어진 요소들을 모두 삭제한 "새로운 배열"을 반환
    _pull은 객체 자체를 변경함
*/
/*********************************************/
API.name('pullAll')
    .arg(`array`)
    .arg(`values`)
{
    const array = ['a', 'b', 'c', 'a', 'b', 'c'];
 
    _.pullAll(array, ['a', 'c']);
    console.log(array);
    // => ['b', 'b']
}
/*********************************************/
API.name('pullAllBy')
    .arg(`array`)
    .arg(`values`)
    .arg(`[iteratee=_.identity]`)
{
    const array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
 
    _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
    console.log(array);
    // => [{ 'x': 2 }]
}
/*********************************************/
API.name('pullAllWith')
    .arg(`array`)
    .arg(`values`)
    .arg(`[comparator]`)
{
    const array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
 
    _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
    console.log(array);
    // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
}
/*********************************************/
API.name('pullAt')
    .arg('array')
    .arg('[indexes]')
{
    const array = ['a', 'b', 'c', 'd'];
    const pulled = _.pullAt(array, [1, 3]);
    
    console.log(array);
    // => ['a', 'c']
    
    console.log(pulled);
    // => ['b', 'd']
}
/*********************************************/
API.name('remove')
    .arg('array')
    .arg('[predicate=_.identity]')
    .desc('predict에 따라 삭제된 새로운 배열 반환')
{
    const array = [1, 2, 3, 4];
    const evens = _.remove(array, function(n) {
        return n % 2 == 0;
    });
    
    console.log(array);
    // => [1, 3]
    
    console.log(evens);
    // => [2, 4]
}
/*********************************************/
API.name('reverse')
    .arg(`array`)
{
    const array = [1, 2, 3];
 
    _.reverse(array);
    // => [3, 2, 1]
    
    console.log(array);
    // => [3, 2, 1]
}
/*********************************************/
API.name('slice')
    .arg('array')
    .arg('[start=0]')
    .arg('[end=array.length')
/*  
    Array.prototype.slice() : 새로운 객체 반환. 원본 배열은 수정되지 않음
    Array.prototype.splice() : 원본 배열 수정
*/
/*********************************************/
API.name('sortedIndex')
    .arg('array')
    .arg('value')
    .desc('Binary Search를 이용하여 들어올 새로운 값이 정렬이 유지되기 위한 위치를 알려줌')
{
    _.sortedIndex([30, 50], 40)
    // => 1

    _.sortedIndex([10, 20, 30, 40, 50, 60], 38);
    // => 3
}
/*********************************************/
API.name('sortedIndexBy')
    .arg('array')
    .arg('value')
    .arg('[iteratee=_.identity]')
{
    const objects = [{ 'x': 4 }, { 'x': 5 }];
 
    _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
    // => 0
    
    // The `_.property` iteratee shorthand.
    _.sortedIndexBy(objects, { 'x': 4 }, 'x');
    // => 0

    const objects2 = [{ 'x': 4, 'y': 10 }, { 'x': 5 }, {'x': 8, 'z': 20}];
 
    _.sortedIndexBy(objects2, { 'x': 7 }, function(o) { return o.x; });
    // => 2
    
    // The `_.property` iteratee shorthand.
    _.sortedIndexBy(objects2, { 'x': 7 }, 'x');
    // => 2
}
/*********************************************/
API.name('sortedIndexOf')
    .arg('array')
    .arg('value')
    .desc('binary search 알고리즘으로 요소를 찾음')
{
    _.sortedIndexOf([4, 5, 5, 5, 6], 5);
    // => 1
}
/*********************************************/
API.name('sortedLastIndex')
    .arg('array')
    .arg('value')
{
    _.sortedLastIndex([4, 5, 5, 5, 6], 5);
    // => 4
}
/*********************************************/
API.name('sortedLastIndexBy')
    .arg('array')
    .arg('value')
    .arg('[iteratee=_.identity')
    .desc('_sortedLastIndex와 비슷하고 iteratee가 추가된 것')
{
    const objects = [{ 'x': 4, y: 10 }, { 'x': 6, z: 20 }, { 'x': 8, y: 30 }];
     
    _.sortedLastIndexBy(objects, { 'x': 7 }, function(o) { return o.x; });
    // => 2
     
    // The `_.prope것ty` iteratee shorthand.
    _.sortedLastIndexBy(objects, { 'y': 20 }, 'y');
    // => 1
}
/*********************************************/
API.name('sortedLastIndexOf')
    .arg('array')
    .arg('value')
{
    _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
    // => 3
}
/*********************************************/
// _.sortedUniq(array)
{
    _.sortedUniq([1, 1, 2]);
    // => [1, 2]
}
/*********************************************/
// _.sortedUniqBy(array, [iteratee])
{
    _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
    // => [1.1, 2.3]
}
/*********************************************/
{
    _.tail([1, 2, 3]);
    // => [2, 3]
}
/*********************************************/
// _.take(array, [n=1])
{
    _.take([1, 2, 3]);
    // => [1]
    
    _.take([1, 2, 3], 2);
    // => [1, 2]
    
    _.take([1, 2, 3], 5);
    // => [1, 2, 3]
    
    _.take([1, 2, 3], 0);
    // => []
}
/*********************************************/
// _.takeRight(array, [n=1])
{
    _.takeRight([1, 2, 3]);
    // => [3]
    
    _.takeRight([1, 2, 3], 2);
    // => [2, 3]
    
    _.takeRight([1, 2, 3], 5);
    // => [1, 2, 3]
    
    _.takeRight([1, 2, 3], 0);
    // => []
}
/*********************************************/
// _.takeRightWhile(array, [predicate=_.identity])
{
    const users = [
        { 'user': 'barney',  'active': true },
        { 'user': 'fred',    'active': false },
        { 'user': 'pebbles', 'active': false }
    ];
    
    _.takeRightWhile(users, function(o) { return !o.active; });
    // => objects for ['fred', 'pebbles']
    
    // The `_.matches` iteratee shorthand.
    _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
    // => objects for ['pebbles']
    
    // The `_.matchesProperty` iteratee shorthand.
    _.takeRightWhile(users, ['active', false]);
    // => objects for ['fred', 'pebbles']
    
    // The `_.property` iteratee shorthand.
    _.takeRightWhile(users, 'active');
    // => []
}
/*********************************************/
// _.takeWhile(array, [predicate=_.identity])
{
    const users = [
        { 'user': 'barney',  'active': false },
        { 'user': 'fred',    'active': false },
        { 'user': 'pebbles', 'active': true }
    ];
    
    _.takeWhile(users, function(o) { return !o.active; });
    // => objects for ['barney', 'fred']
    
    // The `_.matches` iteratee shorthand.
    _.takeWhile(users, { 'user': 'barney', 'active': false });
    // => objects for ['barney']
    
    // The `_.matchesProperty` iteratee shorthand.
    _.takeWhile(users, ['active', false]);
    // => objects for ['barney', 'fred']
    
    // The `_.property` iteratee shorthand.
    _.takeWhile(users, 'active');
    // => []
}
/*********************************************/
// _.union([arrays])
{
    _.union([2], [1, 2]);
    // => [2, 1]
}
/*********************************************/
// _.unionBy([arrays], [iteratee=_.identity])
{
    _.unionBy([2.1], [1.2, 2.3], Math.floor);
    // => [2.1, 1.2]
    
    // The `_.property` iteratee shorthand.
    _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
    // => [{ 'x': 1 }, { 'x': 2 }]
}
/*********************************************/
// _.unionWith([arrays], [comparator])
{
    const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
    const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
    
    _.unionWith(objects, others, _.isEqual);
    // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
}
/*********************************************/
{
    _.uniq([2, 1, 2]);
    // => [2, 1]
}
/*********************************************/
{
    _.uniqBy([2.1, 1.2, 2.3], Math.floor);
    // => [2.1, 1.2]
    
    // The `_.property` iteratee shorthand.
    _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
    // => [{ 'x': 1 }, { 'x': 2 }]
}
/*********************************************/
{
    const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
    
    _.uniqWith(objects, _.isEqual);
    // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
}
/*********************************************/
{
    const zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
    // => [['a', 1, true], ['b', 2, false]]
    
    _.unzip(zipped);
    // => [['a', 'b'], [1, 2], [true, false]]
}
/*********************************************/
{
    const zipped = _.zip([1, 2], [10, 20], [100, 200]);
    // => [[1, 10, 100], [2, 20, 200]]
    
    _.unzipWith(zipped, _.add);
    // => [3, 30, 300]
}
/*********************************************/
// _.without(array, [values]) -- _.pull 메서드와 비교
{
    _.without([2, 1, 2, 3], 1, 2);
    // => [3]
}
/*********************************************/
// _.xor([arrays])
{
    _.xor([2, 1], [2, 3]);
    // => [1, 3]
}
/*********************************************/
// _.xorBy([arrays], [iteratee=_.identity])
{
    _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
    // => [1.2, 3.4]
    
    // The `_.property` iteratee shorthand.
    _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
    // => [{ 'x': 2 }]
}
/*********************************************/
// _.xorWith([arrays], [comparator])
{
    const objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
    const others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
    
    _.xorWith(objects, others, _.isEqual);
    // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
}
/*********************************************/
{
    _.zip(['a', 'b'], [1, 2], [true, false]);
    // => [['a', 1, true], ['b', 2, false]]
}
/*********************************************/
// _.zipObject([props=[]], [values=[]])
{
    _.zipObject(['a', 'b'], [1, 2]);
    // => { 'a': 1, 'b': 2 }
}
/*********************************************/
{
    _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
    // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
}
/*********************************************/
// _.zipWith([arrays], [iteratee=_.identity])
{
    _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
        return a + b + c;
    });
    // => [111, 222]
}
/*********************************************/