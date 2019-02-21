## Desktop Comic Reader (WIP)

An Electron based comic reader.

- Data are scrape from [https://www.manhuagui.com](https://www.manhuagui.com)
- Built from [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
- Inspired by [ComicsReader](https://github.com/ComicsReader/app) and [Arachnid-27/Cimoc](https://github.com/Arachnid-27/Cimoc)

<img src="internals/img/screenshot.png">

## :warning: Note

- Project is working in progress and not ready for packaging
- A local server will automatically started at port `8080` for data scraping.
- Home page allow infinite scrolling but don't scroll too fast. Otherwise your IP may **blocked** by data owner.

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
