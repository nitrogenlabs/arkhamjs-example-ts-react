ArkhamJS Skeleton App
=====================

A simple skeleton to start you off on your ReactJS project. Uses the following modules:
 - [arkhamjs](https://github.com/nitrogenlabs/arkhamjs) - A clean, simple Flux framework.
 - [react](https://www.npmjs.com/package/react) - A declarative, efficient, and flexible JavaScript library for building user interfaces.
 - [typescript](https://www.npmjs.com/package/typescript) - TypeScript is a language for application scale JavaScript development.
 - [webpack](https://www.npmjs.com/package/webpack) - Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.
 - [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for node.

[![Travis](https://img.shields.io/travis/nitrogenlabs/arkhamjs-skeleton.svg?style=flat-square)](https://travis-ci.org/nitrogenlabs/arkhamjs-skeleton)
[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![Issues](http://img.shields.io/github/issues/nitrogenlabs/arkhamjs-skeleton.svg?style=flat-square)](https://github.com/nitrogenlabs/arkhamjs-skeleton/issues)
[![Gitter](https://img.shields.io/gitter/room/NitrgenLabs/arkhamjs.svg?style=flat-square)](https://gitter.im/NitrogenLabs/arkhamjs)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://opensource.org/licenses/MIT)

Getting Started
---------------

- Clone the repo and install the necessary node modules:

```shell
$ npm install -g yarn gulp nodemon  # Install Gulp and Nodemon
$ yarn                              # Install Node modules listed in ./package.json (may take a while the first time)
```

Usage
-----

#### `yarn start` also `yarn run development`
Runs the webpack build system to compile scripts on the fly. Run local web server. The default webpack dev server can be found at `localhost:5000`. The port can be changed in the config.

#### `yarn run docs`
Compile documentation for the application.

#### `yarn test`
Runs tslint then run unit tests with Jest.

#### `yarn run compile`
Run tests and then, on success, compile your application for a pre-production environment. 

#### `yarn run production`
Run tests and then, on success, compile your application for a production environment. Run local web server. The default web server url is: `localhost:3000`. The port can be changed in the config.

### Configuration

Basic project configuration can be found in `~/build/config.js`. Here you'll be able to redefine your src and dist directories, as well as tweak what ports Webpack and WebpackDevServer run on.

Structure
---------

The folder structure provided is only meant to serve as a guide, it is by no means prescriptive. It is something that has worked very well for me and my team, but use only what makes sense to you.

```
.
├── build                    # All build-related configuration
│   ├── tasts                # Gulp configurations
│   ├── config.ts            # Project configuration settings
│   └── dev-server.ts        # Development server configuration
│   └── prod-server.ts       # Production server configuration
├── coverage                 # Unit test coverage reports
├── dist                     # Compiled files
│   ├── development          # Development files
│   └── production           # Production files
├── js                       # External js files
├── src                      # Application source code
│   ├── actions              # Flux actions
│   ├── components           # React components
│   ├── config               # App Configuration
│   ├── constants            # App constants
│   ├── errors               # Custom errors
│   ├── fonts                # Font files
│   ├── icons                # SVG files
│   ├── img                  # Images
│   ├── services             # Helpers and utilities
│   ├── stores               # Redux store configuration
│   ├── styles               # SCSS styles
│   ├── views                # React components/views that live at a route
│   └── index.ts             # Application bootstrap and rendering
```

### Components vs. Views vs. Layouts

**TL;DR:** They're all components.

This distinction may not be important for you, but as an explanation: A **Layout** is something that describes an entire page structure, such as a fixed navigation, viewport, sidebar, and footer. Most applications will probably only have one layout, but keeping these components separate makes their intent clear. **Views** are components that live at routes, and are generally rendered within a **Layout**. What this ends up meaning is that, with this structure, nearly everything inside of **Components** ends up being a dumb component.

Webpack
-------

### Configuration
The webpack compiler configuration is located in `~/build/webpack`. When the webpack dev server runs, only the client compiler will be used. When webpack itself is run to compile to disk, both the client and server configurations will be used. Settings that are bundle agnostic should be defined in `~/build/config.js` and imported where needed.

### Vendor Bundle
You can redefine which packages to treat as vendor dependencies by editing the vendor property in the webpack config in `~/build/config.js`. These default to:

```js
[
  'arkhamjs',
  'bluebird',
  'react',
  'react-dom',
  'react-router',
  'whatwg-fetch'
]
```

### Aliases
As mentioned in features, the default Webpack configuration provides some globals and aliases to make your life easier. These can be used as such:

```js
import MyComponent from '../../components/my-component'; // without alias
import MyComponent from 'components/my-component'; // with alias

  // Available aliases:
  actions     => '~/src/actions'
  components  => '~/src/components'
  config      => '~/src/config/[env]'
  constants   => '~/src/constants'
  errors      => '~/src/errors'
  services    => '~/src/services'
  stores      => '~/src/stores'
  styles      => '~/src/styles'
  views       => '~/src/views'
```

### Globals

#### `__DEV__`
True when `process.env.NODE_ENV` is `development`

#### `__PROD__`
True when `process.env.NODE_ENV` is `production`

#### `__DEBUG__`
True when the compiler is run with `--debug` (any environment).

Styles
------

All `.scss` imports will be run through the sass-loader, extracted during production builds, and ignored during server builds. If you're requiring styles from a base styles directory (useful for generic, app-wide styles) in your JS, you can make use of the `styles` alias, e.g.:

```js
// ~/src/components/some/nested/component/index.jsx
import `styles/core.scss`;
```

Furthermore, this `styles` directory is aliased for sass imports, which further eliminates manual directory traversing. An example nested `.scss` file:

```scss
// current path: ~/src/styles/some/nested/style.scss
// what used to be this:
@import '../../base';

// can now be this:
@import 'base';
```

Testing
-------

To add a unit test, simply create a `*.test.js` file within the `/src` directory. All imports will be relative to the "~/src" directory. The the testing cofiguration as well as the directory aliases are located in the `package.json` file. Jest will be available to you within your test without the need to import.

Troubleshooting
---------------

Nothing yet. Having an issue? Report it and We'll get to it as soon as possible!
