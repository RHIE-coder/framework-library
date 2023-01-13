const express = require('express');
const app = express();

app.use('/public', express.static(require('@/utils/path-builder').fromApp("public")));

app.set('view-engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', require("@/utils/path-builder").fromApp("views"));

app.use(require('cors')());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(require('cookie-parser')());
app.use(require('express-session')({
    secret: process.env.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: false,
}));

const morgan = require('morgan');
app.use(
    morgan(':remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms')
);

app.use("/", 
    require("@/loader/routes")({
        moduleName: "express",
        routeFiles: require("@/utils/path-builder").fromApp("routes"),
        method:'@',
        delimiter: '-',
        param: '#',
    })
);

module.exports = app;