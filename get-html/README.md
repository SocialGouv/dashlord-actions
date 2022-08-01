# socialgouv/dashlord-actions/get-html

Get HTML content from any URL, single-page or not

## Usage

```yaml
jobs:
  html:
    steps:
      - uses: "socialgouv/dashlord-actions/get-html@v1"
        with:
          url: ${{ matrix.url }}
          # optionals
          language: fr
          output: result.html
      - name: demo
        run: |
          cat result.html
```
