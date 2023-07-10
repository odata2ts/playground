# UI5 with odata2ts & MobX

This app demonstrates the usage of
[odata2ts](https://odata2ts.github.io/) and [MobX](https://mobx.js.org/README.html#introduction)
in [UI5](https://sdk.openui5.org/) apps.

This app has been bootstrapped with easy-ui5 with its TypeScript support enabled.

## The Example App

The app depends on `mobx` and `ui5-mobx` for state management.

`odata2ts` gives you a full-fledged and domain-savvy OData client including TS interfaces
representing the data model. Equipped with this OData client you realize all the OData communication.

### odata2ts

`@odata2ts/odata2ts` is responsible for generating a full-fledged and domain-savvy OData client including TS interfaces
representing the data model. `@odata2ts/odata-service` brings in needed runtime dependencies for the OData client.
And since we're occupied with UI5 here, we use the `@odata2ts/http-client-jquery` to use jQuery for HTTP
communication.

Any configuration is handled in `odata2ts.config.ts`.

### ui5-mobx

[ui5-mobx](https://github.com/cpro-js/ui5-mobx) provides a special `sap.ui.model.Model` implementation
with reactive bindings:

- `PropertyBinding`
- `ListBinding`
- `ContextBinding`

**One-way** as well as **two-way** data binding are supported. This is used as usual in the views.

Take a look at the `MainController` to see how the `MobxModel` is initialized.

## Stores

As best practice: Create an own class that is all about your state. Everything related to your state
and MobX should be handled in this **store**. For big applications you create one store
per domain / "page" of your application.

Take a look ate the `MainStore` to see MobX in action.

## Setup

### Requirements

Either [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for dependency management.

### Installation

Use `npm` (or `yarn`) to install the dependencies:

```sh
npm i
```

(To use yarn, just do `yarn` instead.)

## Usage

### Run the App

Execute the following command to run the app locally for development in watch mode (the browser reloads the app automatically when there are changes in the source code):

```sh
npm start
```

As shown in the terminal after executing this command, the app is then running on http://localhost:8080/index.html. A browser window with this URL should automatically open.

(When using yarn, do `yarn start` instead.)

### Debug the App

In the browser, you can directly debug the original TypeScript code, which is supplied via sourcemaps (need to be enabled in the browser's developer console if it does not work straight away). If the browser doesn't automatically jump to the TypeScript code when setting breakpoints, use e.g. `Ctrl`/`Cmd` + `P` in Chrome to open the `*.ts` file you want to debug.

### Build the App

#### Unoptimized (but quick)

Execute the following command to build the project and get an app that can be deployed:

```sh
npm run build
```

The result is placed into the `dist` folder. To start the generated package, just run

```sh
npm run start:dist
```

Note that `index.html` still loads the UI5 framework from the relative URL `resources/...`, which does not physically exist, but is only provided dynamically by the UI5 tooling. So for an actual deployment you should change this URL to either [the CDN](https://sdk.openui5.org/#/topic/2d3eb2f322ea4a82983c1c62a33ec4ae) or your local deployment of UI5.

(When using yarn, do `yarn build` and `yarn start:dist` instead.)

#### Optimized

For an optimized self-contained build (takes longer because the UI5 resources are built, too), do:

```sh
npm run build:opt
```

To start the generated package, again just run:

```sh
npm run start:dist
```

In this case, all UI5 framework resources are also available within the `dist` folder, so the folder can be deployed as-is to any static web server, without changing the bootstrap URL.

With the self-contained build, the bootstrap URL in `index.html` has already been modified to load the newly created `sap-ui-custom.js` for bootstrapping, which contains all app resources as well as all needed UI5 JavaScript resources. Most UI5 resources inside the `dist` folder are for this reason actually **not** needed to run the app. Only the non-JS-files, like translation texts and CSS files, are used and must also be deployed. (Only when for some reason JS files are missing from the optimized self-contained bundle, they are also loaded separately.)

(When using yarn, do `yarn build:opt` and `yarn start:dist` instead.)

### Check the Code

Do the following to run a TypeScript check:

```sh
npm run ts-typecheck
```

This checks the application code for any type errors (but will also complain in case of fundamental syntax issues which break the parsing).

To lint the TypeScript code, do:

```sh
npm run lint
```

(Again, when using yarn, do `yarn ts-typecheck` and `yarn lint` instead.)

## License

This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSE) file.
