# dashlord-actions

Basic GitHub actions used in [dashlord](https://github.com/socialgouv/dashlord) workflows.

Actions

| Action  | Usage                                      |
| ------- | ------------------------------------------ |
| init    | read dashloard.yml                         |
| save    | save a single url scan result for dashlord |
| report  | build a report.json from latest scans      |
| website | build a website from report.json           |

[![](./workflows.png)](https://excalidraw.com/#json=5097005936279552,BIdgMf7vmfpdFCKoCVegXg)

## Usage

See [dashlord template repo](https://github.com/socialgouv/dashlord)

## Development

### Start website

```sh
cd report/www
yarn
yarn start
```

### Build a `report.json`

Build a new report.json on a local repo with scan results :

```sh
DASHLORD_URLS=http://test1.com,http://test1.com  \ # optional
DASHLORD_REPO_PATH=/path/to/some/dashlord-repo \ #optional
node report/src > report/www/src/report.json
```
