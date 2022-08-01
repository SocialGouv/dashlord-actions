# socialgouv/dashlord-actions/lhci

Get HTML from any URL, single-page-app or not

## Usage

```yaml
jobs:
  html:
    steps:
      - uses: "socialgouv/dashlord-actions/lhci@v1"
        with:
          url: ${{ matrix.url }}
          language: fr
      - name: demo
        run: |
          cat result.html
```
