# socialgouv/dashlord-actions/init

Parse a `dashlord.yaml` or `urls.txt` file to generate a list of urls to use in a GitHub action jobs matrix.

## Usage

See how `needs.init.outputs.sites` is used in the matrix definition

```yaml
jobs:
  init:
    runs-on: ubuntu-latest
    outputs:
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
    steps:
      # example steps
      - name: Mozilla HTTP Observatory
        if: ${{ matrix.sites.tools.httpobs }}
        continue-on-error: true
        timeout-minutes: 15
        uses: SocialGouv/httpobs-action@master
        with:
          url: "${{ matrix.sites.url }}"
          output: "scans/http.json"
```

### Expected dashlord.yaml

```yml
title: Test 1
tools:
  screenshot: true
  nmap: true
  zaproxy: true
  wappalyzer: true
  httpobs: true
  testssl: true
  lighthouse: true
  thirdparties: true
  nuclei: false
  updownio: true
  dependabot: true
  codescan: true
urls:
  - url: https://www.free.fr
    title: Free
    repositories:
      - iliad/free-ui
      - iliad/free-api
  - url: invalid-url
  - url: http://chez.com
    repositories:
      - chez/chez-ui
      - chez/chez-api
    tools:
      screenshot: false
      updownio: false
  - url: https://voila.fr
```

## Hacking

```shell
cd init/
npm run all
npm test -- -u # update jest snapshots
```
