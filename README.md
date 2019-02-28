<img src="./resources/icons/128x128.png" align="right">

## Desktop Comic Reader

An Electron based comic reader.

- Data are scrape from [https://www.manhuagui.com](https://www.manhuagui.com)
- Built from [iRath96/electron-react-typescript-boilerplate](https://github.com/iRath96/electron-react-typescript-boilerplate)
- Inspired by [ComicsReader](https://github.com/ComicsReader/app) and [Arachnid-27/Cimoc](https://github.com/Arachnid-27/Cimoc)

<img src="internals/img/screenshot.png">

## :warning:

- Frequently request may cause your IP banned by the data owner. In my experience, it will unlock after around one day.

## Install

```
yarn
```

## Development

Start the app in the `dev` environment. **There is some issue on hot updates, you may need to refresh few time after edit**

```bash
$ yarn dev
```

If you don't need autofocus when your files was changed, then run `dev` with env `START_MINIMIZED=true`:

```bash
$ START_MINIMIZED=true yarn dev
```

#### Create a Component

You can create a react component quickly by below command

```bash
yarn component ComponentName
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

## TODO

- [ ] New Features
  - Fit to page/with
  - Prev/Next Chapter Button
- [ ] Error Handling

## Credit

- [ComicBunch Icon by ncrow](https://www.deviantart.com/ncrow/art/ComicBunch-Icon-189969026)

## License

[MIT](./LICENSE)

## Disclaimer

This project is for technical testing and educational purposes only. The owner and contributors do not assume any legal responsibilities caused by the users. Users should be aware of and take the risks.
