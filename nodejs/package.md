# `package.json` 다루기

## # local package 

```js
{
    "dependencies": {
        "@do-something": "file:local-packages/lib"
    }
}
```

```sh
npm link local-packages/lib
###
npm install local-package/lib
```