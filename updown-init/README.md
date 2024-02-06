# socialgouv/dashlord-actions/updown-init <a href="https://opensource.org/licenses/Apache-2.0"><img src="https://img.shields.io/badge/License-Apache--2.0-yellow.svg" alt="License: Apache-2.0"></a>

Create missing [updown.io](https://updown.io) entries from a local `dashlord.yaml` config file

The default recipients can be defined in the dashlord config `updownioRecipients` array.

You get extract recipients ID's from your Dev Console in the [updown.io bulk edit page](https://updown.io/checks/recipients):

```js
const recipients = Array.from(
  document.body.querySelectorAll("#bulk-update-table tr:nth-child(2) input")
);
console.log(
  recipients.map((n) => ({ value: n.value, id: n.dataset.recipientIdentifier }))
);
```

### github-action

```yaml
jobs:
  html:
    steps:
      - uses: actions/checkout@v3 # get the dashlord.yml
      - uses: "socialgouv/dashlord-actions/updown-init@v1"
        env:
          UPDOWNIO_API_KEY: ${{ secrets.UPDOWNIO_API_KEY }} # write-enabled updown.io token
```
