const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const morgan = require('morgan');

require('@flagtail/jsconfig-alias-mapper')({
    rootPath: path.join(__dirname, '..'),
})

require('@/utils/message')

app.use(require('cors')())
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(require('cookie-parser')());
app.use(require('express-session')({
    secret: 'my-secret-key',
    resave: true,
    saveUninitialized: false,
}))
app.set('view-engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

app.use(
    morgan(':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms')
);

const route = express.Router();
const routesPath = path.join(__dirname, 'routes');

app.use('/pro', (req, res, next) => {
    console.log('pro pro pro');
    next();
})

require("fs")
    .readdirSync(routesPath, {withFileTypes:false})
    .map(file => path.basename(file, path.extname(file)))
    .forEach(file=> {
        const method = file.split("#")[0];
        const url = "/"+file.split("#")[1].replaceAll("-","/");
        const routeInfo = require(`${routesPath}/${file}`);
        const middleware = routeInfo?.middleware ?? [];
        const router = routeInfo?.router;
        if(!router) throw new ReferenceError(`[ ${file} ] file must have 'router' property`)
        route[method.toLowerCase()](url, middleware, router);
    })
app.use("/", route);

http.createServer(app).listen(3300, ()=> {
    console.log(`Server Listening...`);
})