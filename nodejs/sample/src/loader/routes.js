const path = require("path");
const fs = require("fs");

function parseConfig(config) {
    config.moduleName = config.moduleName ?? "express";
    config.routeFiles = config.routeFiles ?? path.join(__dirname, "..", "routes");
    config.method = config.method ?? '@';
    config.delimiter = config.delimiter ?? '-';
    config.param = config.param ?? '#';
    return config;
}

function parseRoutes(config) {
    return fs.readdirSync(config.routeFiles, {withFileTypes:false})
        .map(file => path.basename(file, path.extname(file)))
        .map(file => {
            return {
                filename: file,
                method: file.split(config.method)[1],
                url: `/${file.split(config.method)[0]
                        .replaceAll(config.delimiter, "/")
                        .replaceAll(config.param, ":")}`,
                target: require(`${config.routeFiles}/${file}`),
            }
        });
}

function getRouter(moduleName) {
    if(moduleName === "express") {
       return require("express").Router();
    }

    if(moduleName === "koa") {
       throw new Error("koa module is not supported yet");
       return new require("koa-router")();
    }
}

function loadRoutes(router, routeInfos) {
    routeInfos.forEach(routeInfo => {
        const {filename, method, url, target} = routeInfo;
        const middleware = target?.middleware ?? [];
        const route = target?.route;
        if(!route) throw new ReferenceError(`[ ${filename} ] file must have 'router' property`)
        router[method.toLowerCase()](
            url, 
            middleware,
            route,
        );
    })
}

module.exports = (loadConfig) => {
    const config = parseConfig(loadConfig);
    const router = getRouter(config.moduleName);
    if(!router) {
        throw new ReferenceError("the [moduleName] should be express or koa")
    }
    const routeInfos = parseRoutes(config);
    loadRoutes(router, routeInfos); 
    return router;
}