# Vue CLI 시작하기

 - [VUE CLI](https://cli.vuejs.org/#getting-started)

## [ install ]

```sh
npm install @vue/cli
```

## [ Create Vue Project ]

 - legacy : `init`
 - now : `create`

```sh
npx vue create hello-world

# You can also create and manage projects using a graphical interface with the vue ui command:
npx vue ui
```

## [ Concept ] 

### - CLI

 - `@vue/cli`

 It provides the ability to quickly scaffold a new project via vue create. You can also manage your projects using a graphical user interface via vue ui
 
 ### - CLI Service

 - `@vue/cli-service`

 development dependency. It's an npm package installed locally into every project created by @vue/cli.

 The CLI Service is built on top of webpack and webpack-dev-server. It contains:

 - The core service that loads other CLI Plugins;
 - An internal webpack config that is optimized for most apps;
 - The vue-cli-service binary inside the project, which comes with the basic serve, build and inspect commands.

 ### - CLI Plugins

  - `@vue/cli-plugin-*`

CLI Plugins are npm packages that provide optional features to your Vue CLI projects, such as Babel/TypeScript transpilation, ESLint integration, unit testing, and end-to-end testing. 

When you run the vue-cli-service binary inside your project, it automatically resolves and loads all CLI Plugins listed in your project's package.json.