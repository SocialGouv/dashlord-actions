# socialgouv/dashlord-actions/lhci

Collect LHCI results for any URL

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
          collectFlags: "--numberOfRuns=3"
          chromeFlags: "--window-size=800x600 --disable-gpu"
      - name: demo
        run: |
          cat result.html
```
