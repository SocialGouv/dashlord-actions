# dashlord report website

This is a Next.js static website that produces the DashLord report based on some input data.

The data is generated with the `@socialgouv/dashlord-actions/report` action.

## Dev

Run `yarn && yarn dev` to get started

The `src` folder contains sample data files :

- `config.json` : the repo `dashlord.yml` as json
- `report.json` : the report data
- `trends.json` : computed trends from GIT history

## Build

```
yarn build
yarn export
```
