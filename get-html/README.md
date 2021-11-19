# socialgouv/dashlord-actions/get-html

Get HTML from any URL

## Usage

```yaml
jobs:
  html:
    steps:
      - uses: "socialgouv/dashlord-actions/get-html@master"
        id: example
        with:
          url: ${{ matrix.url }}
      - name: demo
        run: |
          echo "${{ steps.example.outputs.html }}"
```
