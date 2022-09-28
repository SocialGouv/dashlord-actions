# dashlord-actions/ecoindex

Caclule l'eco index d'un URL : http://www.ecoindex.fr/quest-ce-que-ecoindex/

## Usage

```yaml
jobs:
  scans:
    steps:
      - uses: "socialgouv/dashlord-actions/ecoindex@v1"
        with:
          url: ${{ matrix.url }}
          output: scans/ecoindex.json
```
