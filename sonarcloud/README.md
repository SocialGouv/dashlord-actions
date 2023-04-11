# socialgouv/dashlord-actions/sonarcloud

This GitHub action extract data from [SonarCloud Web API](https://docs.sonarcloud.io/advanced-setup/web-api/)

## Inputs

### `repos`

Comma-separated list of repos to get results for. example : `sensgithub/eHospital, zabbix/zabbix`.

The naming of org/repo should match the ones in SonarCloud.

### `output` (optional)

Path for the JSON result file. defaults to `sonarcloud.json`.

## Example usage

```yml
name: Get SonarCloud results
on:
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: SocialGouv/dashlord-actions/sonarcloud@v1
        with:
          repos: facebook/react, isbang/compose-action
      - run: |
          cat sonarcloud.json
```

Add `SONARCLOUD_API_TOKEN` in environment if your project is not public.

Example output :

```json
[
  {
    "repo": "sensgithub/eHospital",
    "result": {
      "name": "main",
      "isMain": true,
      "type": "LONG",
      "status": {
        "bugs": 174,
        "vulnerabilities": 23,
        "codeSmells": 2198
      },
      "analysisDate": "2023-04-03T01:37:49+0200",
      "commit": {
        "sha": "28f2cf43a343f5215ffa1052d9c659333626a2a4",
        "date": "2023-04-03T01:37:44+0200",
        "message": "Delete codeql.yml"
      }
    }
  },
  {
    "repo": "zabbix/zabbix",
    "result": {
      "name": "master",
      "isMain": true,
      "type": "LONG",
      "status": {
        "qualityGateStatus": "ERROR",
        "bugs": 73,
        "vulnerabilities": 26,
        "codeSmells": 13669
      },
      "analysisDate": "2023-04-02T02:17:15+0200",
      "commit": {
        "sha": "f9d2062ed6560094ad6f4c8772cd82b72328cd83",
        "date": "2023-03-31T21:45:03+0200",
        "message": ".......... [ZBX-1357] automatic update of translation strings"
      }
    }
  }
]
```
