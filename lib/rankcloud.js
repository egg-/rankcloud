var request = require('request')

var ENDPOINT = 'https://api.rankwave.com'

/**
 * RankCloud constructor
 * @method RankCloud
 * @param  {object} opts
 * @param  {string} opts.connect_id Data Source 별로 발급되어 있는 ID 값.
 */
function RankCloud (opts) {
  this.connect_id = opts.connect_id
  this.mode = opts.mode || 'product'
  return this
}

/**
 * request data.
 * @method request
 * @param  {object} param
 * @param  {string} param.url
 * @param  {string} [param.method]
 * @param  {object} [param.data]
 * @param  {function} cb
 */
RankCloud.prototype.request = function (param, cb) {
  var data = param.data || {}
  data.connect_id = this.connect_id

  var opts = {
    uri: ENDPOINT + param.url,
    method: param.method || 'POST',
    form: data
  }

  if (this.mode !== 'product') {
    return cb(null, opts)
  }

  return request(opts, function (err, res, body) {
    if (err) {
      return cb(err)
    } else if (res.statusCode !== 200) {
      return cb(JSON.parse(body).error)
    }

    cb(null, JSON.parse(body))
  })
}

/**
 * connect user data
 * @method userConnect
 * @param  {object} param
 * @param  {string} param.id SNS에서 발급 받은 ID
 * @param  {string} param.sns_type 인증을 수행한 SNS 타입. FB or TW
 * @param  {string} param.token SNS 에서 발급받은 oAuth 인증 token.
 * @param  {string} param.token_secret SNS 에서 발급받은 oAuth 인증 secret.
 * @param  {function} cb
 */
RankCloud.prototype.userConnect = function (param, cb) {
  return this.request({
    url: '/2.0/interface/userConnect.do',
    data: {
      id: param.id,
      sns_type: param.sns_type,
      id_type: 'sns', // fixed
      token: param.token,
      token_secret: param.token_secret || ''
    }
  }, cb)
}

/**
 * disconnect user data
 * @method userDisconnect
 * @param  {object} param
 * @param  {string} param.id SNS에서 발급 받은 ID
 * @param  {string} param.sns_type 인증을 수행한 SNS 타입. FB or TW
 * @param  {function} cb
 */
RankCloud.prototype.userDisconnect = function (param, cb) {
  return this.request({
    url: '/2.0/interface/userDisconnect.do',
    data: {
      id: param.id,
      sns_type: param.sns_type,
      id_type: 'sns' // fixed
    }
  }, cb)
}

/**
 * delete user data
 * @method userDelete
 * @param  {object} param
 * @param  {string} param.id SNS에서 발급 받은 ID
 * @param  {string} param.sns_type 인증을 수행한 SNS 타입. FB or TW
 * @param  {function} cb
 */
RankCloud.prototype.userDelete = function (param, cb) {
  return this.request({
    url: '/2.0/interface/userDelete.do',
    data: {
      id: param.id,
      sns_type: param.sns_type,
      id_type: 'sns' // fixed
    }
  }, cb)
}

module.exports = RankCloud
