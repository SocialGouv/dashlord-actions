# socialgouv/dashlord-actions/init

Parse a `dashlord.yaml` or `urls.txt` file to generate a list of urls to use in a GitHub action jobs matrix.

## Usage

See how `needs.init.outputs.sites` is used in the matrix definition

if `with.incubator` is an existing [beta.gouv incubator id](https://beta.gouv.fr/api/v2.6/incubators.json) then the URLS from the API will be merged with the local dashlord.yml entries.

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
        uses: "socialgouv/dashlord-actions/init@v1"
        with: # optional
          url: https://beta.gouv.fr # optional
          tool: lighthouse # optional
          incubator: sgmas # optional

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

See a working workflow : https://github.com/betagouv/dashlord/blob/main/.github/workflows/scans.yml

And a sample dashlord.yml : https://github.com/betagouv/dashlord/blob/main/dashlord.yml

## Hacking

```shell
cd init/
npm run all
npm test -- -u # update jest snapshots
```
