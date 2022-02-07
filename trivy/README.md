# trivy

Run trivy scans on some docker image and produce JSON output

## Usage

```yaml
name: GHCR trivy

on:
  push:
    tags:
      - "v*"

jobs:
  trivy:
    name: trivy scan on GHCR
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: test
        uses: socialgouv/dashlord-actions/trivy@v1
        with:
          image: ghcr.io/socialgouv/fabrique/www
        # output: trivy.json
      - uses: actions/upload-artifact@v2
        with:
          name: trivy.json
          path: trivy.json
```
