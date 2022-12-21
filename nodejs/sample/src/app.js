const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const morgan = require('morgan');

const moduleLoader = require('./module-loader')(__dirname, {
    "@": "./",
})

console.log(require('crypto'))
console.log(require('@/utils/format'));
console.log(require('@/utils/memory'));

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
// app.use(morgan('combined'))

const route = express.Router();
const routesPath = path.join(__dirname, 'routes');

require("fs")
    .readdirSync(routesPath, {withFileTypes:false})
    .map(file => path.basename(file, path.extname(file)))
    .forEach(file=> {
        const method = file.split("#")[0];
        const url = "/"+file.split("#")[1].replaceAll("-","/");
        route[method.toLowerCase()](url, require(`${routesPath}/${file}`));
    })
app.use("/", route);

http.createServer(app).listen(3300, ()=> {
    console.log(`Server Listening...`);
})