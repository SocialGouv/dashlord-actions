# socialgouv/dashlord-actions/lhci

Collect LHCI results for any URL, single-page-app or not

## Usage

```yaml
jobs:
  html:
    steps:
      - uses: "socialgouv/dashlord-actions/lhci@v1"
        with:
          url: ${{ matrix.url }}
          # optionals
          language: fr
          collect-flags: "--numberOfRuns=3"
          chrome-flags: "--window-size=800x600 --disable-gpu"
      - name: demo
        run: |
          cat result.html
```
