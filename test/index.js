var RankCloud = require('../')
var config = require('./config.json')
var run = require('iterator-runner')

var client = new RankCloud(config.rankcloud)

run(function *() {
  try {
    var result = yield client.userConnect.bind(client, {
      id: config.test.id,
      sns_type: 'FB',
      token: config.test.token
    })
    console.info('connect', result)

    result = yield client.userDisconnect.bind(client, {
      id: config.test.id,
      sns_type: 'FB'
    })
    console.info('disconnect', result)

    result = yield client.userDelete.bind(client, {
      id: config.test.id,
      sns_type: 'FB'
    })
    console.info('delete', result)
  } catch (err) {
    console.error(err)
  }
})
