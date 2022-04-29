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

## Add a new column
To add a new column in the dashboard, you have to follow these steps (cf. Pull Request to add the SE current phase):

1. Make sure the required info to displayed is stored in `report.json`. For instance, the SE current phase is stored in the `betagouv` key.
2. Create a summary extractor for your value. It will add the values that you specify to the summary key in the `report.json`. These values will then be accessible in the dashboard tab. For instance, we created a `betagouv.js` file, that extracts the SE current phase from the `betagouv` key 

## Dev

- A first step is to build a light index of latest scans in `www/src/report.json`. this is done by [`./src/index.js`](./src/index.js).
- The report website itself live in the `www` folder.

```sh
cd www
yarn
yarn start
```

💡 To work with fresh data, get the `report` artifact from some of your `Build website` dashlord job.
