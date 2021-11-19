# socialgouv/dashlord-actions/get-html

Get HTML from any URL

## Usage

```yaml
jobs:
  html:
    steps:
      - uses: "socialgouv/dashlord-actions/get-html@v1"
        with:
          url: ${{ matrix.url }}
          output: result.html
      - name: demo
        run: |
          cat result.html
```
