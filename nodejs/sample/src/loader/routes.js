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

function parseRoutes(loadRouteList, routePath) {
    const dirents = fs.readdirSync(routePath, {withFileTypes:true})
    for(let i = 0; i < dirents.length; ++i) {
        if(dirents[i].isDirectory()) {
            parseRoutes(loadRouteList, `${routePath}/${dirents[i].name}`)
        } else {
            const routeFileName = path.basename(dirents[i].name, path.extname(dirents[i].name));
            const routeFilePath = `${routePath}/${routeFileName}`
            loadRouteList.push({
                base: dirents[i].name,
                routeFileName,
                routeFilePath,
            });
        }
    }
    return loadRouteList;
}

function getRouteInfos(config) {
        const routeList = [];
        const dirents = fs.readdirSync(routePath, {withFileTypes:true})
        const loadRouteList = parseRoutes(routeList, config.routeFiles);
        console.log(loadRouteList)
        // .map(file => path.basename(file, path.extname(file)))
        // .map(file => {
        //     return {
        //         filename: file,
        //         method: file.split(config.method)[0],
        //         url: `/${file.split(config.method)[1]
        //                 .replaceAll(config.delimiter, "/")
        //                 .replaceAll(config.param, ":")}`,
        //         target: require(`${config.routeFiles}/${file}`),
        //     }
        // });
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

module.exports = (loaderConfig) => {
    const config = parseConfig(loaderConfig);
    const router = getRouter(config.moduleName);
    if(!router) {
        throw new ReferenceError("the [moduleName] should be express or koa")
    }
    const routeInfos = getRouteInfos(config);
    console.log(routeInfos); 
    throw new Error();
    loadRoutes(router, routeInfos); 
    return router;
}