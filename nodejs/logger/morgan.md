# Morgan

```sh
npm i morgan
```

## # embeded format

```js
const morgan = require('morgan');

/*  
         * Standard Apache combined log output.
         * :remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
*/
app.use(morgan('combined'));

/*  
         * Standard Apache common log output.
         * :remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length]
*/
app.use(morgan('common'));

/*  
         * Concise output colored by response status for development use. The
         * :status token will be colored red for server error codes, yellow for
         * client error codes, cyan for redirection codes, and uncolored for
         * all other codes.
         * :method :url :status :response-time ms - :res[content-length]
*/
app.use(morgan('dev'));

/*  
         * Shorter than default, also including response time.
         * :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
*/
app.use(morgan('short'));

/*  
         * The minimal output.
         * :method :url :status :res[content-length] - :response-time ms
*/
app.use(morgan('tiny'));
```

## # custom

```js
app.use(
    morgan(':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms')
);
```