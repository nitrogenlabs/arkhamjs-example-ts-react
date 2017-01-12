ArkhamJS Skeleton App
=====================

A simple skeleton to start you off on your ReactJS project. Uses ArkhamJS framework for a flux architecture.

Getting Started
---------------

- Clone the repo and install the necessary node modules:

```shell
$ npm install                   # Install Node modules listed in ./package.json (may take a while the first time)
$ npm install -g nodemon        # Install Nodemon
$ gulp                          # Compile and launch
```

Usage
-----

#### `gulp` also `gulp dev`
Runs the webpack build system just like in `compile` but enables HMR. The webpack dev server can be found at `localhost:3000`.

#### `gulp compile`
Runs the Webpack build system with your current NODE_ENV and compiles the application to disk (`~/dist`). Production builds will fail on eslint errors (but not on warnings).

#### `gulp test`
Runs unit tests with Karma.

#### `gulp deploy`
Helper script to run tests and then, on success, compile your application.

### Configuration

Basic project configuration can be found in `~/build/config.js`. Here you'll be able to redefine your src and dist directories, as well as tweak what ports Webpack and WebpackDevServer run on.

Structure
---------

The folder structure provided is only meant to serve as a guide, it is by no means prescriptive. It is something that has worked very well for me and my team, but use only what makes sense to you.

```
.
├── bin                      # Build/Start scripts
├── build                    # All build-related configuration
│   ├── webpack              # Environment-specific configuration files for Webpack
|   ├── config.js            # Project configuration settings
|   ├── karma.js            # Karma configuration settings
└── src                      # Application source code
    ├── components           # React Components
    ├── containers           # Components that provide context (e.g. Redux Providers)
    ├── layouts              # Components that dictate major page structure
    ├── reducers             # Redux reducers
    ├── routes               # Application route definitions
    ├── stores               # Redux store configuration
    ├── utils                # Utilities
    ├── views                # Components that live at a route
    └── index.js             # Application bootstrap and rendering
```

### Components vs. Views vs. Layouts

**TL;DR:** They're all components.

This distinction may not be important for you, but as an explanation: A **Layout** is something that describes an entire page structure, such as a fixed navigation, viewport, sidebar, and footer. Most applications will probably only have one layout, but keeping these components separate makes their intent clear. **Views** are components that live at routes, and are generally rendered within a **Layout**. What this ends up meaning is that, with this structure, nearly everything inside of **Components** ends up being a dumb component.

Webpack
-------

### Configuration
The webpack compiler configuration is located in `~/build/webpack`. When the webpack dev server runs, only the client compiler will be used. When webpack itself is run to compile to disk, both the client and server configurations will be used. Settings that are bundle agnostic should be defined in `~/build/config.js` and imported where needed.

### Vendor Bundle
You can redefine which packages to treat as vendor dependencies by editing `vendor_dependencies` in `~/config/index.js`. These default to:

```js
[
  'history',
  'react',
  'react-redux',
  'react-router',
  'redux-router',
  'redux',
  'redux-devtools',
  'redux-devtools/lib/react'
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
  constants   => '~/src/constants'
  containers  => '~/src/containers'
  layouts     => '~/src/layouts'
  reducers    => '~/src/reducers'
  routes      => '~/src/routes'
  services    => '~/src/services'
  styles      => '~/src/styles'
  utils       => '~/src/utils'
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

Database
-------
- Install the latest MacOS [binary](https://www.arangodb.com/download/macosx/) into the Applications directory.
- Create the database `reaktor`.
- Run the gulp import task to import the latest data into your local database.

```
gulp db:get:s3
```

Testing
-------

To add a unit test, simply create `.spec.js` file anywhere in `~/test`. All imports will be relative to the "~/src" directory. The entry point for Karma uses webpack's custom require to load all these files, and Jasmine will be available to you within your test without the need to import them.

Utilities
---------

This boilerplate comes with two simple utilities (thanks to [StevenLangbroek](https://github.com/StevenLangbroek)) to help speed up your Redux development process. In `~/client/utils` you'll find exports for `createConstants` and `createReducer`. The former is pretty much an even lazier `keyMirror`, so if you _really_ hate typing out those constants you may want to give it a shot. Check it out:

```js
import { createConstants } from 'utils';

export default createConstants(
  'TODO_CREATE',
  'TODO_DESTROY',
  'TODO_TOGGLE_COMPLETE'
);
```

The other utility, `create-reducer`, is designed to expedite creating reducers when they're defined via an object map rather than switch statements. As an example, what once looked like this:

```js
import { TODO_CREATE } from 'constants/todo';

const initialState = [];
const handlers = {
  [TODO_CREATE] : (state, payload) => { ... }
};

export default function todo (state = initialState, action) {
  const handler = handlers[action.type];

  return handler ? handler(state, action.payload) : state;
}
```

Can now look like this:

```js
import { TODO_CREATE } from 'constants/todo';
import { createReducer } from 'utils';

const initialState = [];

export default createReducer(initialState, {
  [TODO_CREATE] : (state, payload) => { ... }
});
```

Troubleshooting
---------------

Nothing yet. Having an issue? Report it and I'll get to it as soon as possible!
