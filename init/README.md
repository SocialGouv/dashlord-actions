# socialgouv/dashlord-init-action

Parse a `dashlord.yaml` or `urls.txt` file to generate a list of urls to use in a GitHub action jobs matrix.

## Usage

See how `needs.init.outputs.urls_json` is used in the matrix definition

```yaml
jobs:
  init:
    runs-on: ubuntu-latest
    outputs:
      urls: ${{ steps.init.outputs.urls }}
      urls_json: ${{ steps.init.outputs.urls_json }}
      json: ${{ steps.init.outputs.json }}
    steps:
      - uses: actions/checkout@v2
      - id: init
        uses: "socialgouv/dashlord-init-action@master"

  scans:
    runs-on: ubuntu-latest
    needs: init
    strategy:
      fail-fast: false
      max-parallel: 3
      matrix:
        urls: ${{ fromJson(needs.init.outputs.urls_json) }}
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
  - url: http://chez.com
    repositories:
      - ici/chez-ui
      - ici/chez-api
```

## Hacking

Prerequisite: docker installed.
Test action locally with [act](https://github.com/nektos/act):

from files (no url):

```shell
act -j action -e no-url.json
```

from url input (workflow_dispatch):

```shell
act -j action -e url.json
```