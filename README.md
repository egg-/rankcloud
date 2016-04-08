# rankcloud

[rank.cloud](http://rankwave.github.io/devsite.rankwave/kr/sdk/connect/http-getting-started/) module for Node.js

[![version](https://img.shields.io/npm/v/rankcloud.svg) ![download](https://img.shields.io/npm/dm/rankcloud.svg)](https://www.npmjs.com/package/rankcloud)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


## Usage

```json

# config.json
{
  "rankcloud": {
    "mode": "product",
    "connect_id": ""
  },
  "test": {
    "id": "facebook access_token"
  }
}
```

```javascript

var RankCloud = require('./')
var config = require('./config.json')
var run = require('iterator-runner')

var client = new RankCloud(config.rankcloud)

run(function *() {
  try {
    var result = yield client.userConnect.bind(null, {
      id: config.test.id,
      sns_type: 'FB',
      token: config.test.token
    })
    console.info('connect', result)

    result = yield client.userDisconnect.bind(null, {
      id: config.test.id,
      sns_type: 'FB'
    })
    console.info('disconnect', result)

    result = yield client.userDelete.bind(null, {
      id: config.test.id,
      sns_type: 'FB'
    })
    console.info('delete', result)
  } catch (err) {
    console.error(err)
  }
})

```

## LICENSE

rankcloud is licensed under the MIT license.
