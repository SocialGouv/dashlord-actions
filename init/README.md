# socialgouv/dashlord-init-action

Parse a `dashlord.yaml` or `urls.txt` file to generate a list of urls to use in a GitHub action jobs matrix.

## Usage

See how `needs.init.outputs.sites` is used in the matrix definition

```yaml
jobs:
  init:
    runs-on: ubuntu-latest
    outputs:
      urls: ${{ steps.init.outputs.urls }}
      sites: ${{ steps.init.outputs.sites }}
      config: ${{ steps.init.outputs.config }}
    steps:
      - uses: actions/checkout@v2
      - id: init
        uses: "socialgouv/dashlord-actions/init@main"

  scans:
    runs-on: ubuntu-latest
    needs: init
    strategy:
      fail-fast: false
      max-parallel: 3
      matrix:
        sites: ${{ fromJson(needs.init.outputs.sites) }}
    steps: ...
```

### Expected dashlord.yaml

```yml
title: My dashlord
urls:
  - url: https://www.free.fr
    title: Some website
    repositories:
      - iliad/free-ui
      - iliad/free-api
    tools:
      enabled:
        - screenshot
  - url: http://chez.com
    repositories:
      - ici/chez-ui
      - ici/chez-api
    tools:
      disabled:
        - nmap
        - zaproxy
```

## Hacking

```shell
cd init/
npm run all
npm test -- -u # update jest snapshots
```
