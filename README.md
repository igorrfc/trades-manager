# Trades Manager

A useful UI to edit trades on an investor's portfolio

![Trades Manager](https://user-images.githubusercontent.com/7783787/33780663-55680088-dc30-11e7-9b6a-5d7a1095a0b2.png)

## [Demo](https://react-trades-manager.herokuapp.com)

# Initial setup

```sh
yarn install
```

## Environments

To get the trades manager communicating with the trades API, you'll need to set
it as a `env` var. To do this, you must create a file called `.env` on the root
path of the project and set the following key=value:

```sh
REACT_APP_TRADES_API=www.yourtradesapi.com
```

We have a staging API for development use. You can use it as well:
https://trades-api-stag.herokuapp.com/

# Start the server

```sh
npm start
```

# Run tests

```sh
npm test
```

## Features

* [x] UI built with React
* [x] Client-side state management with Redux
* [x] Webpack module bundler
* [x] Sass preprocessor
* [x] Specs with Jest plus Enzyme

## Folder Structure

```
trades-manager/
  README.md
  package.json
  public/
    index.html
    favicon.ico
    manifest.json
  src/
    actions/
    components/
    constants/
    containers/
    css/
    reducers/
    utils/
    index.js
    setupTests.js
```

## What’s Inside?

* [React](https://facebook.github.io/react)
* [Redux](http://redux.js.org)
* [Jest](https://facebook.github.io/jest/)
* [Enzyme](http://airbnb.io/enzyme/docs/api/)
* [Babel](http://babeljs.io)
* [webpack](https://webpack.js.org)
* [ESLint](http://eslint.org)
* [Sass](http://sass-lang.com)
* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [Bootstrap](http://getbootstrap.com)
* [Reactstrap](https://reactstrap.github.io)
