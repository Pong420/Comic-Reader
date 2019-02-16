## Desktop Comic Reader (WIP)

An Electron based comic reader.

Built from [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate), inspired by [ComicsReader](https://github.com/ComicsReader/app) and [Arachnid-27/Cimoc](https://github.com/Arachnid-27/Cimoc)

<img src="internals/img/screenshot.png">

## Note

- A local server will listen on port 8080 for data scraping

## Install

```
yarn && cd server && yarn && cd ..
```

## Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

If you don't need autofocus when your files was changed, then run `dev` with env `START_MINIMIZED=true`:

```bash
$ START_MINIMIZED=true yarn dev
```

## Packaging

To package apps for the local platform:

```bash
$ yarn package
```

To package apps for all platforms:

First, refer to the [Multi Platform Build docs](https://www.electron.build/multi-platform-build) for dependencies.

Then,

```bash
$ yarn package-all
```

To package apps with options:

```bash
$ yarn package --[option]
```

To run End-to-End Test

```bash
$ yarn build-e2e
$ yarn test-e2e

# Running e2e tests in a minimized window
$ START_MINIMIZED=true yarn build-e2e
$ yarn test-e2e
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:

```bash
DEBUG_PROD=true yarn package
```

## License

[MIT](./LICENSE)

## Disclaimer

This project is for technical testing and educational purposes only. The owner and contributors do not assume any legal responsibilities caused by the users. Users should be aware of and take the risks.
