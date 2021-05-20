# dashlord-report-action

This GitHub action build a web report based on some [dashlord](https://github.com/socialgouv/dashlord) content.

## Inputs

### `public-url`

`PUBLIC_URL` for the build. defaults to your repository name.

see https://create-react-app.dev/docs/using-the-public-folder/#adding-assets-outside-of-the-module-system

## Example usage

```yml
name: Build DashLord report
on:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - id: dashlord-report
        uses: SocialGouv/dashlord-report-action@master

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@4.1.0
        with:
          branch: gh-pages
          folder: build
```

## Dev

- A first step is to build a light index of latest scans in `www/src/report.json`. this is done by [`./src/index.js`](./src/index.js).
- The report website itself live in the `www` folder.

💡 To work with fresh data, get the `report` artifact from some of your `Build website` dashlord job.
