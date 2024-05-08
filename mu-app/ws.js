var _url = "";
var _client;
var _pingInterval = 5; // 5秒
var _isClosed = false;
var _handlers = {};
var _autoReconnect = false;
var _currentRequest = null;
var ENV = null;

function encodeUtf8(text) {
  const code = encodeURIComponent(text);
  const bytes = [];
  for (var i = 0; i < code.length; i++) {
    const c = code.charAt(i);
    if (c === "%") {
      const hex = code.charAt(i + 1) + code.charAt(i + 2);
      const hexVal = parseInt(hex, 16);
      bytes.push(hexVal);
      i += 2;
    } else bytes.push(c.charCodeAt(0));
  }
  return bytes;
}

function decodeUtf8(bytes) {
  var encoded = "";
  for (var i = 0; i < bytes.length; i++) {
    encoded += "%" + bytes[i].toString(16);
  }
  return decodeURIComponent(encoded);
}

module.exports = {
  setEnv: function (env) {
    ENV = env;
  },
  getCurrentRequest: function () {
    return _currentRequest;
  },
  initialize: function (url, pingInterval, autoReconnect) {
    _url = url;
    _autoReconnect = autoReconnect || _autoReconnect;
    _pingInterval = pingInterval || _pingInterval;
    if (ENV.debugMode) {
      log("loading jar...");
    }

    runtime.loadJar("./jars/Java-WebSocket-1.5.3-SNAPSHOT.jar");

    if (ENV.debugMode) {
      log("jar loaded");
    }

    _client = new JavaAdapter(
      org.java_websocket.client.WebSocketClient,
      {
        onOpen: function (handshakeData) {
          log("%s connected, starting ping-pong thread ", _url, handshakeData);
          _isClosed = false;
          threads.start(function () {
            while (true) {
              while (!_isClosed && _client.isOpen()) {
                sleep(_pingInterval * 1000);
                _client.sendPing();
                // if (ENV.debugMode) {
                //   log("send ping now");
                // }
              }

              if (_autoReconnect) {
                _client.reconnectBlocking();
                continue;
              }
              break;
            }
          });
        },
        onMessage: function (message) {
          if (ENV.debugMode) {
            log("onMessage %s", message);
          }
          let obj = JSON.parse(message);
          _currentRequest = obj;
          if (obj.method) {
            if (_handlers[obj.method]) {
              threads.start(function () {
                _handlers[obj.method](_client, obj);
              });
            } else {
              log("%s's handler is not found", obj.method);
            }
          } else {
            log("not valid message %s", message);
          }
        },
        onClose: function (code, reason, remote) {
          log(
            "connection closed, stop ping-pong thread, code: %d, reason: %s, remote: %s",
            code,
            reason,
            remote
          );
          _isClosed = true;
        },
        onError: function (ex) {
          log("Exception: %s", ex);
        },
        onWebsocketPong: function (socket, data) {
          // if (ENV.debugMode) {
          //   log(
          //     "pong received: %s, data: %s",
          //     socket,
          //     decodeUtf8(data.getPayloadData())
          //   );
          // }
        },
      },
      new java.net.URI(url)
    );

    if (ENV.debugMode) {
      log("client created");
    }

    let connect = _client.connect();
    if (ENV.debugMode) {
      log("connecting: %s", url);
      log("连接%s", connect ? '成功' : '失败');
    }
    while (_client.getReadyState() != 'OPEN') {
      if (ENV.debugMode) {
        log("连接已断开！尝试重连中");
      }
      sleep(2000);
      if (_client.getReadyState() == 'CLOSING' || _client.getReadyState() == 'CLOSED') {
        _client.reconnect();
      }
    }
  },
  waitForConnected: function (milliseconds) {
    while (true) {
      let connected = _client.isOpen();
      if (ENV.debugMode) {
        log("%s connected: %s", _url, connected);
      }
      sleep(milliseconds || 2000);
      if (connected) {
        break;
      } else {
        if (ENV.debugMode) {
          log("连接状态: %s", _client.getReadyState());
        }
      }
    }
  },
  waitForDisconnected: function (milliseconds) {
    while (true) {
      let connected = _client.isOpen();
      if (ENV.debugMode) {
        log("%s connected: %s", _url, connected);
      }
      sleep(milliseconds || 2000);
      if (!connected) {
        break;
      }
    }
  },
  getUrl: function () {
    return _url;
  },
  getPingInterval: function () {
    return _pingInterval;
  },
  setPingInterval: function (pingInterval) {
    _pingInterval = pingInterval;
  },
  send: function (text) {
    _client.send(text);
  },
  sendObject: function (obj) {
    _client.send(JSON.stringify(obj));
  },
  isOpen: function () {
    return _client.isOpen();
  },
  close: function (message) {
    _client.close(1000, message || "正常退出");
  },
  on: function (method, handler) {
    _handlers[method] = handler;
  },
};
