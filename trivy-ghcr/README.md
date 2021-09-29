# trivy-ghcr

Run trivy scans on some repos GHCR images and produce JSON output

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
        uses: socialgouv/dashlord-actions/ghcr-trivy@main
        with:
          repos: socialgouv/sample-next-app,socialgouv/www
        # output: trivy.json
      - uses: actions/upload-artifact@v2
        with:
          name: trivy.json
          path: trivy.json
```
