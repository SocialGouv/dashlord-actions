# socialgouv/dashlord-actions/report

This GitHub action build a web report based on some [dashlord](https://github.com/socialgouv/dashlord) content.

## Inputs

### `base-path` (optional)

`NEXT_PUBLIC_BASE_PATH` for the next.js build if you host the report in a subfolder. see https://nextjs.org/docs/api-reference/next.config.js/basepath

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
        uses: SocialGouv/dashlord-actions/report@v1
        with:
          base-path: /my-dashlord

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@4.1.0
        with:
          branch: gh-pages
          folder: build
```

## Dev

- A first step is to build a light index of latest scans in `www/src/report.json`. this is done by [`./src/index.js`](./src/index.js).
- The report website itself live in the `www` folder.

```sh
cd www
yarn
yarn start
```

💡 To work with fresh data, get the `report` artifact from some of your `Build website` dashlord job.
