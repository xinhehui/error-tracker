import detector from 'detector'
var win = window
var doc = win.document
var loc = win.location
var M = win.Sai

// 避免未引用先行脚本抛出异常。
if (!M) { M = {} }
if (!M._DATAS) { M._DATAS = [] }

// 数据通信规范的版本。
var version = '1.0'

var URLLength = detector.engine.trident ? 2083 : 8190
var url = path(loc.href)

// UTILS -------------------------------------------------------

function typeOf (obj) {
  return Object.prototype.toString.call(obj)
}

// 合并 oa, ob 两个对象的属性到新对象，不修改原有对象。
// @param {Object} target, 目标对象。
// @param {Object} object, 来源对象。
// @return {Object} 返回目标对象，目标对象附带有来源对象的属性。
function merge (oa, ob) {
  var result = {}

  for (var i = 0, o, l = arguments.length; i < l; i++) {
    o = arguments[i]
    for (var k in o) {
      if (has(o, k)) {
        result[k] = o[k]
      }
    }
  }
  return result
}

// simple random string.
// @return {String}
function rand () {
  return ('' + Math.random()).slice(-6)
}

// 获得资源的路径（不带参数和 hash 部分）
// 另外新版 Arale 通过 nginx 提供的服务，支持类似：
// > https://www.example.com/??a.js,b.js,c.js
// 的方式请求资源，需要特殊处理。
//
// @param {String} uri, 仅处理绝对路径。
// @return {String} 返回 uri 的文件路径，不包含参数和 jsessionid。
function path (uri) {
  if (undefined === uri || typeof (uri) !== 'string') { return '' }
  var len = uri.length

  var idxSessionID = uri.indexOf(';jsessionid=')
  if (idxSessionID < 0) { idxSessionID = len }

  // 旧版的合并 HTTP 服务。
  var idxMin = uri.indexOf('/min/?')
  if (idxMin >= 0) {
    idxMin = uri.indexOf('?', idxMin)
  }
  if (idxMin < 0) { idxMin = len }

  var idxHash = uri.indexOf('#')
  if (idxHash < 0) { idxHash = len }

  var idxQ = uri.indexOf('??')
  idxQ = uri.indexOf('?', idxQ < 0 ? 0 : idxQ + 2)
  if (idxQ < 0) { idxQ = len }

  var idx = Math.min(idxSessionID, idxMin, idxHash, idxQ)

  return idx < 0 ? uri : uri.substr(0, idx)
}

// 必要的字符串转义，保证发送的数据是安全的。
// @param {String} str.
// @return {String}
function escapeString (str) {
  return String(str).replace(/(?:\r\n|\r|\n)/g, '<CR>')
}

// 将对象转为键值对参数字符串。
function param (obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    return ''
  }
  var p = []
  for (var k in obj) {
    if (!has(obj, k)) { continue }
    if (typeOf(obj[k]) === '[object Array]') {
      for (var i = 0, l = obj[k].length; i < l; i++) {
        p.push(k + '=' + encodeURIComponent(escapeString(obj[k][i])))
      }
    } else {
      p.push(k + '=' + encodeURIComponent(escapeString(obj[k])))
    }
  }
  return p.join('&')
}

function has (obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

function warn (info) {
  win.console && console.warn && console.warn(info)
}

// /UTILS -------------------------------------------------------

var DEFAULT_DATA = {
  url: url,
  ref: path(doc.referrer) || '-',
  clnt: detector.device.name + '/' + detector.device.fullVersion + '|' +
    detector.os.name + '/' + detector.os.fullVersion + '|' +
    detector.browser.name + '/' + detector.browser.fullVersion + '|' +
    detector.engine.name + '/' + detector.engine.fullVersion +
    (detector.browser.compatible ? '|c' : ''),
  v: version
}
function post (url, params, cb) {
  var http = new window.XMLHttpRequest()
  http.open('POST', url, true)
  //Send the proper header information along with the request
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

  http.onreadystatechange = function () { //Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
      cb(http.responseText)
    }
  }
  http.send(params)
}
// 创建 HTTP GET 请求发送数据。
// @param {String} url, 日志服务器 URL 地址。
// @param {Object} data, 附加的监控数据。
// @param {Function} callback
function send (host, data, callback) {
  if (!callback) { callback = function () {} }
  if (!host) { warn('Sai: required logger server.' + host); return callback() }
  if (!data) { return callback() }

  var d = param(data)
  var url = host + (host.indexOf('?') < 0 ? '?' : '&') + d
  // 忽略超长 url 请求，避免资源异常。
  if (url.length > URLLength) { return callback() }

  // @see http://www.javascriptkit.com/jsref/image.shtml
  // 暂时先用post
  var img = new window.Image(1, 1)
  img.onload = img.onerror = img.onabort = function () {
    callback()
    img.onload = img.onerror = img.onabort = null
    img = null
  }

  img.src = url
  // post(url, d, function () {
  //   callback()
  // })
}

var sending = false
/**
 * 分时发送队列中的数据，避免 IE(6) 的连接请求数限制。
 * 这是里逐条发送
 */
function timedSend () {
  if (sending) { return }

  var e = M._DATAS.shift()
  if (!e) { return }
  sending = true

  // 理论上应该在收集异常消息时修正 file，避免连接带有参数。
  // 但是收集部分在 seer 中，不适合放置大量的脚本。
  if (e.profile === 'jserror') {
    e.file = path(e.file)
  }

  var data = merge(DEFAULT_DATA, e)
  data.rnd = rand() // 避免缓存。

  send(M.server, data, function () {
    sending = false
    timedSend()
  })
}

// timedSend 准备好后可以替换 push 方法，自动分时发送。
var _push = M._DATAS.push
M.log = function () {
  _push.apply(M._DATAS, arguments)
  timedSend()
}
M.logConcat = function (logs) {
  M._DATAS = M._DATAS.concat(logs)
  timedSend()
}

// 主动发送已捕获的异常。
timedSend()

export default M
