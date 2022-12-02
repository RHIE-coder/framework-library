const _ = require('lodash');

/* Date */
{
    _.now()
}
/*********************************************/
/* Function */
{
    const done = _.after(3, function() {
      console.log('done!');
    });
     
    done();
    done();
    done(); // done!
}
/*********************************************/
{
  _.ary(function(x, y, z){
    console.log(x, y, z);  
  }, 2)(10, 20 ,30);
}
/*********************************************/
// _.before(n, func)
{
  let count = 0;
  const hook = _.before(3, function() {
    console.log(`HOOK: ${++count}`);
  })
  hook(); // HOOK: 1
  console.log(count); // 1
  hook(); // HOOK: 2
  console.log(count); // 2
  hook(); 
  console.log(count); // 2
  hook(); 
  console.log(count); // 2
  hook(); 
  console.log(count); // 2
}
/*********************************************/
// _.bind(func, thisArg-The `this` binding func, [partials])
{
  function hello(message, suffix){
    console.log(`hello ${this.name}~! ${message}:${suffix}`)
  }
  _.bind(hello, { name: "rhie"})("beautiful", "!") // hello rhie~! beautiful:!

  const greeting = _.bind(hello, { name: "alice"}, "wonderful")
  greeting('~'); // hello alice~! wonderful:~

  _.bind(hello, {name: 'bob'}, 'incredible', '...')('new argument') // hello bob~! incredible:...
}
/*********************************************/
{
  const object = {
    'user': 'fred',
    'greet': function(greeting, punctuation) {
      return greeting + ' ' + this.user + punctuation;
    }
  };
  
  const bound = _.bindKey(object, 'greet', 'hi');
  bound('!'); // => 'hi fred!'
}
/*********************************************/
// _.curry(func, [arity=func.length])
/*********************************************/
// _.curryRight(func, [arity=func.length])
/*********************************************/
// _.debounce(func, [wait=0], [options={}])
{
  _.debounce()
}
/*********************************************/
/*********************************************/
/*********************************************/
/*********************************************/
/*********************************************/
/*********************************************/
/*********************************************/
/*********************************************/
/*********************************************/
/*********************************************/
/*********************************************/
/*********************************************/
/*********************************************/
/*********************************************/
/*********************************************/
/*********************************************/