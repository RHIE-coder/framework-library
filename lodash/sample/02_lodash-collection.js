const _ = require('lodash');

// _.countBy(collection, [iteratee=_.identity])
{
    _.countBy([6.1, 4.2, 6.3], Math.floor);
    // => { '4': 1, '6': 2 }
    
    // The `_.property` iteratee shorthand.
    _.countBy(['one', 'two', 'three'], 'length');
    // => { '3': 2, '5': 1 }
}
/*********************************************/
// _.forEach(collection, [iteratee=_.identity]) : Alias _.each
{
    _.forEach([1, 2], function(value) {
        console.log(value);
    });
    // => Logs `1` then `2`.
    
    _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
        console.log(key);
    });
    // => Logs 'a' then 'b' (iteration order is not guaranteed).
}
/*********************************************/
// _.forEachRight(collection, [iteratee=_.identity]) : Alias _.eachRight
{
    _.forEachRight([1, 2], function(value) {
     console.log(value);
    });
    // => Logs `2` then `1`.
}
/*********************************************/
// _.groupBy(collection, [iteratee=_.identity])
{
    _.groupBy([6.1, 4.2, 6.3], Math.floor);
    // => { '4': [4.2], '6': [6.1, 6.3] }
    
    // The `_.property` iteratee shorthand.
    _.groupBy(['one', 'two', 'three'], 'length');
    // => { '3': ['one', 'two'], '5': ['three'] }
}
/*********************************************/
// _.includes(collection, value, [fromIndex=0])
{
    _.includes([1, 2, 3], 1);
    // => true
    
    _.includes([1, 2, 3], 1, 2);
    // => false
    
    _.includes({ 'a': 1, 'b': 2 }, 1);
    // => true
    
    _.includes('abcd', 'bc');
    // => true
}
/*********************************************/
// _.invokeMap(collection, path, [args])
{
    _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
    // => [[1, 5, 7], [1, 2, 3]]
    
    _.invokeMap([123, 456], String.prototype.split, '');
    // => [['1', '2', '3'], ['4', '5', '6']]
}
/*********************************************/
// _.keyBy(collection, [iteratee=_.identity])
{
    const array = [
        { 'dir': 'left', 'code': 97 },
        { 'dir': 'right', 'code': 100 }
    ];
    
    _.keyBy(array, function(o) {
        return String.fromCharCode(o.code);
    });
    // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
    
    _.keyBy(array, 'dir');
    // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
}
/*********************************************/
// _.map(collection, [iteratee=_.identity])
{
    function square(n) {
        return n * n;
    }
    
    _.map([4, 8], square);
    // => [16, 64]
    
    _.map({ 'a': 4, 'b': 8 }, square);
    // => [16, 64] (iteration order is not guaranteed)
    
    const users = [
        { 'user': 'barney' },
        { 'user': 'fred' }
    ];
    
    // The `_.property` iteratee shorthand.
    _.map(users, 'user');
    // => ['barney', 'fred']
}
/*********************************************/
// _.orderBy(collection, [iteratees=[_.identity]], [orders])
{
    const users = [
        { 'user': 'fred',   'age': 48 },
        { 'user': 'barney', 'age': 34 },
        { 'user': 'fred',   'age': 40 },
        { 'user': 'barney', 'age': 36 }
    ];
    
    // Sort by `user` in ascending order and by `age` in descending order.
    _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
    // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
}
/*********************************************/
// _.partition(collection, [predicate=_.identity])
{
    const users = [
        { 'user': 'barney',  'age': 36, 'active': false },
        { 'user': 'fred',    'age': 40, 'active': true },
        { 'user': 'pebbles', 'age': 1,  'active': false }
    ];
    
    _.partition(users, function(o) { return o.active; });
    // => objects for [['fred'], ['barney', 'pebbles']]
    
    // The `_.matches` iteratee shorthand.
    _.partition(users, { 'age': 1, 'active': false });
    // => objects for [['pebbles'], ['barney', 'fred']]
    
    // The `_.matchesProperty` iteratee shorthand.
    _.partition(users, ['active', false]);
    // => objects for [['barney', 'pebbles'], ['fred']]
    
    // The `_.property` iteratee shorthand.
    _.partition(users, 'active');
    // => objects for [['fred'], ['barney', 'pebbles']]
}
/*********************************************/ 
// _.reduce(collection, [iteratee=_.identity], [accumulator])
{
    _.reduce([1, 2], function(sum, n) {
        return sum + n;
    }   , 0);
    // => 3
    
    _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
        (result[value] || (result[value] = [])).push(key);
        return result;
    }, {});
    // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
}
/*********************************************/
// _.reduceRight(collection, [iteratee=_.identity], [accumulator])
console.log("===============")
{
    const array = [[0, 1], [2, 3], [4, 5]];
 
    _.reduceRight(array, function(flattened, other) {
        console.log(flattened, other);
        return flattened.concat(other);
    }, []);
    // => [4, 5, 2, 3, 0, 1]
}
/*********************************************/
// _.reject(collection, [predicate=_.identity]) : _.filter와 정반대
{
    const users = [
        { 'user': 'barney', 'age': 36, 'active': false },
        { 'user': 'fred',   'age': 40, 'active': true }
    ];
    
    _.reject(users, function(o) { return !o.active; });
    // => objects for ['fred']
    
    // The `_.matches` iteratee shorthand.
    _.reject(users, { 'age': 40, 'active': true });
    // => objects for ['barney']
    
    // The `_.matchesProperty` iteratee shorthand.
    _.reject(users, ['active', false]);
    // => objects for ['fred']
    
    // The `_.property` iteratee shorthand.
    _.reject(users, 'active');
    // => objects for ['barney']
}
/*********************************************/
// _.sample(collection) : 랜덤
{
    _.sample([1, 2, 3, 4]);
    // => 2
}
/*********************************************/
// _.sampleSize(collection, [n=1]) : 랜덤
{
    _.sampleSize([1, 2, 3], 2);
    // => [3, 1]
    
    _.sampleSize([1, 2, 3], 4);
    // => [2, 3, 1]
}
/*********************************************/
{
    _.shuffle([1, 2, 3, 4]);
    // => [4, 1, 3, 2]
}
/*********************************************/
{
    _.size([1, 2, 3]);
    // => 3
    
    _.size({ 'a': 1, 'b': 2 });
    // => 2
    
    _.size('pebbles');
    // => 7
}
/*********************************************/
{
    _.some([null, 0, 'yes', false], Boolean);
    // => true
    
    const users = [
        { 'user': 'barney', 'active': true },
        { 'user': 'fred',   'active': false }
    ];
    
    // The `_.matches` iteratee shorthand.
    _.some(users, { 'user': 'barney', 'active': false });
    // => false
    
    // The `_.matchesProperty` iteratee shorthand.
    _.some(users, ['active', false]);
    // => true
    
    // The `_.property` iteratee shorthand.
    _.some(users, 'active');
    // => true
}
/*********************************************/
// _.sortBy(collection, [iteratees=[_.identity]])
{
    const users = [
        { 'user': 'fred',   'age': 48 },
        { 'user': 'barney', 'age': 36 },
        { 'user': 'fred',   'age': 40 },
        { 'user': 'barney', 'age': 34 }
    ];
    
    _.sortBy(users, [function(o) { return o.user; }]);
    // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
    
    _.sortBy(users, ['user', 'age']);
    // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
}
/*********************************************/