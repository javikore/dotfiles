Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fayeWebsocket = require('faye-websocket');

var _fayeWebsocket2 = _interopRequireDefault(_fayeWebsocket);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

"use babel";

var PROTOCOL_CONN_CHECK_1 = 'http://livereload.com/protocols/connection-check-1';
var PROTOCOL_MONITORING_7 = 'http://livereload.com/protocols/official-7';
var PROTOCOL_SAVING_1 = 'http://livereload.com/protocols/saving-1';

var Server = (function (_EventEmitter) {
  _inherits(Server, _EventEmitter);

  // client url

  function Server(config) {
    _classCallCheck(this, Server);

    _get(Object.getPrototypeOf(Server.prototype), 'constructor', this).call(this);
    this.paths = [];
    this.sockets = [];
    this.app = null;
    this.watcher = null;
    this._url = '';
    this.config = _lodash2['default'].assign({}, config);
    this.paths = [];
  }

  _createClass(Server, [{
    key: 'initServer',
    value: function initServer() {
      var _this = this;

      var config = this.config;

      if (config.https === null) {
        this.app = _http2['default'].createServer(this.handleRequest);
      } else {
        this.app = _https2['default'].createServer(config.https, this.handleRequest);
      }

      this.app.on('error', function (err) {
        if (err.code === 'EADDRINUSE') {
          setTimeout(_this.start.bind(_this, 0), 100);

          _this.debug('LiveReload: port ' + _this.config.port + ' already in use. Trying another port...');
          _this.emit('newport');
        }
      });

      this.app.on('listening', function () {
        _this.debug('LiveReload: listening on port ' + _this.address.port + '.');
        _this.emit('start');
      });

      this.app.on('upgrade', function (request, socket, body) {
        if (!_fayeWebsocket2['default'].isWebSocket(request)) return;
        var ws = new _fayeWebsocket2['default'](request, socket, body);

        ws.on('message', function (event) {
          var data = event.data,
              json;
          try {
            json = JSON.parse(event.data);
            if (typeof json.command === 'string') {
              _this.handleCommand(json);
            }
          } catch (e) {}
        });

        ws.on('close', function (event) {
          _this.sockets = _this.sockets.filter(function (sock) {
            return sock !== ws;
          });
          ws = null;
        });

        _this.sockets.push(ws);
      });
    }
  }, {
    key: 'start',
    value: function start(port) {
      if (typeof port === 'undefined') {
        port = this.config.port;
      }
      if (!this.app) {
        this.initServer();
      }
      this.app.listen(port);
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.app) {
        this.app.close();
        this.app = null;
      }

      this.sockets = [];
      this.unwatch();

      this.emit('stop');
    }
  }, {
    key: 'watch',
    value: function watch(paths) {
      paths = paths.filter(function (path) {
        return !/^atom\:\/\//.test(path);
      });

      if (paths.length < 1) return;

      this.paths = [].concat(_toConsumableArray(this.paths), _toConsumableArray(paths));

      if (this.watcher) {
        this.watcher.watch(paths);
        return;
      }

      this.watcher = _chokidar2['default'].watch(paths, {
        ignoreInitial: true,
        ignored: this.config.exclusions
      });

      var _refresh = this.refresh.bind(this);

      this.watcher.on('add', _refresh).on('change', _refresh).on('unlink', _refresh);
    }
  }, {
    key: 'unwatch',
    value: function unwatch() {
      if (this.watcher) {
        this.watcher.unwatch(this.paths);
        this.watcher.close();
      }
      this.watcher = null;
      this.paths = [];
    }
  }, {
    key: 'refresh',
    value: function refresh(filepath) {
      var extname = _path2['default'].extname(filepath).substring(1);

      if (this.config.exts.indexOf(extname) < 0) return;

      setTimeout(this.send.bind(this, {
        command: 'reload',
        path: filepath,
        liveCSS: this.config.applyCSSLive,
        liveImg: this.config.applyImageLive
      }), this.config.delayForUpdate);
    }
  }, {
    key: 'handleRequest',
    value: function handleRequest(req, res) {
      var content = '',
          status = 200,
          headers;

      switch (_url2['default'].parse(req.url).pathname) {
        case '/':
          res.writeHead(200, { 'Content-Type': 'application/json' });
          break;
        case '/livereload.js':
        case '/xlivereload.js':
          res.writeHead(200, { 'Content-Type': 'text/javascript' });
          content = _fs2['default'].readFileSync(__dirname + '/../node_modules/livereload-js/dist/livereload.js');
          break;
        default:
          res.writeHead(300, { 'Content-Type': 'text/plain' });
          content = 'Not Found';
      }

      res.end(content);
    }
  }, {
    key: 'handleCommand',
    value: function handleCommand(command) {
      switch (command.command) {
        case 'hello':
          this.send({
            command: 'hello',
            protocols: [PROTOCOL_MONITORING_7],
            serverName: 'atom-livereload'
          });
          break;
        case 'ping':
          this.send({
            command: 'pong',
            token: command.token
          });
          break;
      }
    }
  }, {
    key: 'debug',
    value: function debug(text) {
      if (this.config.debug || true) {
        console.log(text);
      }
    }
  }, {
    key: 'send',
    value: function send(command) {
      this.sockets.forEach(function (sock) {
        sock.send(JSON.stringify(command));
      });
    }
  }, {
    key: 'activated',
    get: function get() {
      return !!this.app;
    }
  }, {
    key: 'address',
    get: function get() {
      return this.app.address();
    }
  }]);

  return Server;
})(_events2['default']);

exports['default'] = Server;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pzb2xpcy8uYXRvbS9wYWNrYWdlcy9saXZlcmVsb2FkL2xpYi9zZXJ2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztzQkFFeUIsUUFBUTs7OztvQkFDaEIsTUFBTTs7OztxQkFDTCxPQUFPOzs7O21CQUNULEtBQUs7Ozs7a0JBQ04sSUFBSTs7OztvQkFDRixNQUFNOzs7OzZCQUNELGdCQUFnQjs7Ozt3QkFDakIsVUFBVTs7OztzQkFDakIsUUFBUTs7OztBQVZ0QixXQUFXLENBQUM7O0FBWVosSUFBTSxxQkFBcUIsR0FBRyxvREFBb0QsQ0FBQztBQUNuRixJQUFNLHFCQUFxQixHQUFHLDRDQUE0QyxDQUFDO0FBQzNFLElBQU0saUJBQWlCLEdBQUcsMENBQTBDLENBQUM7O0lBRS9ELE1BQU07WUFBTixNQUFNOzs7O0FBT0MsV0FQUCxNQUFNLENBT0UsTUFBTSxFQUFFOzBCQVBoQixNQUFNOztBQVFSLCtCQVJFLE1BQU0sNkNBUUE7U0FQVixLQUFLLEdBQUcsRUFBRTtTQUNWLE9BQU8sR0FBRyxFQUFFO1NBQ1osR0FBRyxHQUFHLElBQUk7U0FDVixPQUFPLEdBQUcsSUFBSTtTQUNkLElBQUksR0FBRyxFQUFFO0FBSVAsUUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLFFBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0dBQ2pCOztlQVhHLE1BQU07O1dBYUEsc0JBQUc7OztBQUNYLFVBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7O0FBRXpCLFVBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLEVBQUU7QUFDekIsWUFBSSxDQUFDLEdBQUcsR0FBRyxrQkFBSyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO09BQ2xELE1BQU07QUFDTCxZQUFJLENBQUMsR0FBRyxHQUFHLG1CQUFNLFlBQVksQ0FBQyxNQUFN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OztBQUVELFNBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDbEI7OztXQUVZLHVCQUFDLE9BQU8sRUFBRTtBQUNyQixjQUFRLE9BQU8sQ0FBQyxPQUFPO0FBQ3JCLGFBQUssT0FBTztBQUNWLGNBQUksQ0FBQyxJQUFJLENBQUM7QUFDUixtQkFBTyxFQUFFLE9BQU87QUFDaEIscUJBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO0FBQ2xDLHNCQUFVLEVBQUUsaUJBQWlCO1dBQzlCLENBQUMsQ0FBQztBQUNILGdCQUFNO0FBQUEsQUFDUixhQUFLLE1BQU07QUFDWCxjQUFJLENBQUMsSUFBSSxDQUFDO0FBQ1IsbUJBQU8sRUFBRSxNQUFNO0FBQ2YsaUJBQUssRUFBRSxPQUFPLENBQUMsS0FBSztXQUNyQixDQUFDLENBQUM7QUFDSCxnQkFBTTtBQUFBLE9BQ1A7S0FDRjs7O1dBVUksZUFBQyxJQUFJLEVBQUU7QUFDVixVQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtBQUM3QixlQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ25CO0tBQ0Y7OztXQUVHLGNBQUMsT0FBTyxFQUFFO0FBQ1osVUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUUsVUFBQSxJQUFJLEVBQUk7QUFDNUIsWUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7T0FDcEMsQ0FBQyxDQUFDO0tBQ0o7OztTQWxCWSxlQUFHO0FBQ2QsYUFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUNuQjs7O1NBRVUsZUFBRztBQUNaLGFBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUMzQjs7O1NBL0tHLE1BQU07OztxQkE4TEcsTUFBTSIsImZpbGUiOiIvaG9tZS9qc29saXMvLmF0b20vcGFja2FnZXMvbGl2ZXJlbG9hZC9saWIvc2VydmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgYmFiZWxcIjtcblxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xuaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgaHR0cHMgZnJvbSAnaHR0cHMnO1xuaW1wb3J0IHVybCBmcm9tICd1cmwnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IFdlYlNvY2tldCBmcm9tICdmYXllLXdlYnNvY2tldCc7XG5pbXBvcnQgY2hva2lkYXIgZnJvbSAnY2hva2lkYXInO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuY29uc3QgUFJPVE9DT0xfQ09OTl9DSEVDS18xID0gJ2h0dHA6Ly9saXZlcmVsb2FkLmNvbS9wcm90b2NvbHMvY29ubmVjdGlvbi1jaGVjay0xJztcbmNvbnN0IFBST1RPQ09MX01PTklUT1JJTkdfNyA9ICdodHRwOi8vbGl2ZXJlbG9hZC5jb20vcHJvdG9jb2xzL29mZmljaWFsLTcnO1xuY29uc3QgUFJPVE9DT0xfU0FWSU5HXzEgPSAnaHR0cDovL2xpdmVyZWxvYWQuY29tL3Byb3RvY29scy9zYXZpbmctMSc7XG5cbmNsYXNzIFNlcnZlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIHBhdGhzID0gW107XG4gIHNvY2tldHMgPSBbXTtcbiAgYXBwID0gbnVsbDtcbiAgd2F0Y2hlciA9IG51bGw7XG4gIF91cmwgPSAnJzsgLy8gY2xpZW50IHVybFxuXG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jb25maWcgPSBfLmFzc2lnbih7fSwgY29uZmlnKTtcbiAgICB0aGlzLnBhdGhzID0gW107XG4gIH1cblxuICBpbml0U2VydmVyKCkge1xuICAgIHZhciBjb25maWcgPSB0aGlzLmNvbmZpZztcblxuICAgIGlmIChjb25maWcuaHR0cHMgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXBwID0gaHR0cC5jcmVhdGVTZXJ2ZXIodGhpcy5oYW5kbGVSZXF1ZXN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hcHAgPSBodHRwcy5jcmVhdGVTZXJ2ZXIoY29uZmlnLmh0dHBzLCB0aGlzLmhhbmRsZVJlcXVlc3QpO1xuICAgIH1cblxuICAgIHRoaXMuYXBwLm9uKCdlcnJvcicsIGVyciA9PiB7XG4gICAgICBpZiAoZXJyLmNvZGUgPT09ICdFQUREUklOVVNFJykge1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMuc3RhcnQuYmluZCh0aGlzLCAwKSwgMTAwKTtcblxuICAgICAgICB0aGlzLmRlYnVnKGBMaXZlUmVsb2FkOiBwb3J0ICR7dGhpcy5jb25maWcucG9ydH0gYWxyZWFkeSBpbiB1c2UuIFRyeWluZyBhbm90aGVyIHBvcnQuLi5gKTtcbiAgICAgICAgdGhpcy5lbWl0KCduZXdwb3J0Jyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFwcC5vbignbGlzdGVuaW5nJywgKCkgPT4ge1xuICAgICAgdGhpcy5kZWJ1ZyhgTGl2ZVJlbG9hZDogbGlzdGVuaW5nIG9uIHBvcnQgJHt0aGlzLmFkZHJlc3MucG9ydH0uYCk7XG4gICAgICB0aGlzLmVtaXQoJ3N0YXJ0Jyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFwcC5vbigndXBncmFkZScsIChyZXF1ZXN0LCBzb2NrZXQsIGJvZHkpID0+IHtcbiAgICAgIGlmICghV2ViU29ja2V0LmlzV2ViU29ja2V0KHJlcXVlc3QpKSByZXR1cm47XG4gICAgICB2YXIgd3MgPSBuZXcgV2ViU29ja2V0KHJlcXVlc3QsIHNvY2tldCwgYm9keSk7XG5cbiAgICAgIHdzLm9uKCdtZXNzYWdlJywgZXZlbnQgPT4ge1xuICAgICAgICB2YXIgZGF0YSA9IGV2ZW50LmRhdGEsIGpzb247XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAganNvbiA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XG4gICAgICAgICAgaWYgKHR5cGVvZiBqc29uLmNvbW1hbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNvbW1hbmQoanNvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoKGUpIHsgfVxuICAgICAgfSk7XG5cbiAgICAgIHdzLm9uKCdjbG9zZScsIGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5zb2NrZXRzID0gdGhpcy5zb2NrZXRzLmZpbHRlciggc29jayA9PiAoc29jayAhPT0gd3MpICk7XG4gICAgICAgIHdzID0gbnVsbDtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnNvY2tldHMucHVzaCh3cyk7XG4gICAgfSk7XG4gIH1cblxuICBzdGFydChwb3J0KSB7XG4gICAgaWYgKHR5cGVvZiBwb3J0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcG9ydCA9IHRoaXMuY29uZmlnLnBvcnQ7XG4gICAgfVxuICAgIGlmICghdGhpcy5hcHApIHtcbiAgICAgIHRoaXMuaW5pdFNlcnZlcigpO1xuICAgIH1cbiAgICB0aGlzLmFwcC5saXN0ZW4ocG9ydCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLmFwcCkge1xuICAgICAgdGhpcy5hcHAuY2xvc2UoKTtcbiAgICAgIHRoaXMuYXBwID0gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLnNvY2tldHMgPSBbXTtcbiAgICB0aGlzLnVud2F0Y2goKTtcblxuICAgIHRoaXMuZW1pdCgnc3RvcCcpO1xuICB9XG5cbiAgd2F0Y2gocGF0aHMpIHtcbiAgICBwYXRocyA9IHBhdGhzLmZpbHRlciggcGF0aCA9PiAhL15hdG9tXFw6XFwvXFwvLy50ZXN0KHBhdGgpICk7XG5cbiAgICAgIGlmIChwYXRocy5sZW5ndGggPCAxKSByZXR1cm47XG5cbiAgICAgIHRoaXMucGF0aHMgPSBbLi4udGhpcy5wYXRocywgLi4ucGF0aHNdO1xuXG4gICAgICBpZiAodGhpcy53YXRjaGVyKSB7XG4gICAgICAgIHRoaXMud2F0Y2hlci53YXRjaChwYXRocyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy53YXRjaGVyID0gY2hva2lkYXIud2F0Y2gocGF0aHMsIHtcbiAgICAgICAgaWdub3JlSW5pdGlhbDogdHJ1ZSxcbiAgICAgICAgaWdub3JlZDogdGhpcy5jb25maWcuZXhjbHVzaW9uc1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBfcmVmcmVzaCA9IHRoaXMucmVmcmVzaC5iaW5kKHRoaXMpO1xuXG4gICAgICB0aGlzLndhdGNoZXJcbiAgICAgIC5vbignYWRkJywgX3JlZnJlc2gpXG4gICAgICAub24oJ2NoYW5nZScsIF9yZWZyZXNoKVxuICAgICAgLm9uKCd1bmxpbmsnLCBfcmVmcmVzaCk7XG4gIH1cblxuICB1bndhdGNoKCkge1xuICAgIGlmICh0aGlzLndhdGNoZXIpIHtcbiAgICAgIHRoaXMud2F0Y2hlci51bndhdGNoKHRoaXMucGF0aHMpO1xuICAgICAgdGhpcy53YXRjaGVyLmNsb3NlKCk7XG4gICAgfVxuICAgIHRoaXMud2F0Y2hlciA9IG51bGw7XG4gICAgdGhpcy5wYXRocyA9IFtdO1xuICB9XG5cbiAgcmVmcmVzaChmaWxlcGF0aCkge1xuICAgIHZhciBleHRuYW1lID0gcGF0aC5leHRuYW1lKGZpbGVwYXRoKS5zdWJzdHJpbmcoMSk7XG5cbiAgICBpZiAodGhpcy5jb25maWcuZXh0cy5pbmRleE9mKGV4dG5hbWUpIDwgMCkgcmV0dXJuO1xuXG4gICAgc2V0VGltZW91dChcbiAgICAgIHRoaXMuc2VuZC5iaW5kKHRoaXMsIHtcbiAgICAgICAgY29tbWFuZDogJ3JlbG9hZCcsXG4gICAgICAgIHBhdGg6IGZpbGVwYXRoLFxuICAgICAgICBsaXZlQ1NTOiB0aGlzLmNvbmZpZy5hcHBseUNTU0xpdmUsXG4gICAgICAgIGxpdmVJbWc6IHRoaXMuY29uZmlnLmFwcGx5SW1hZ2VMaXZlXG4gICAgICB9KSxcbiAgICAgIHRoaXMuY29uZmlnLmRlbGF5Rm9yVXBkYXRlXG4gICAgKTtcbiAgfVxuXG4gIGhhbmRsZVJlcXVlc3QocmVxLCByZXMpIHtcbiAgICB2YXIgY29udGVudCA9ICcnLCBzdGF0dXMgPSAyMDAsIGhlYWRlcnM7XG5cbiAgICBzd2l0Y2ggKHVybC5wYXJzZShyZXEudXJsKS5wYXRobmFtZSkge1xuICAgICAgY2FzZSAnLyc6XG4gICAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJy9saXZlcmVsb2FkLmpzJzpcbiAgICAgIGNhc2UgJy94bGl2ZXJlbG9hZC5qcyc6XG4gICAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7J0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2phdmFzY3JpcHQnfSk7XG4gICAgICAgIGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMoX19kaXJuYW1lICsgJy8uLi9ub2RlX21vZHVsZXMvbGl2ZXJlbG9hZC1qcy9kaXN0L2xpdmVyZWxvYWQuanMnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXMud3JpdGVIZWFkKDMwMCwgeydDb250ZW50LVR5cGUnOiAndGV4dC9wbGFpbid9KTtcbiAgICAgICAgY29udGVudCA9ICdOb3QgRm91bmQnO1xuICAgIH1cblxuICAgIHJlcy5lbmQoY29udGVudCk7XG4gIH1cblxuICBoYW5kbGVDb21tYW5kKGNvbW1hbmQpIHtcbiAgICBzd2l0Y2ggKGNvbW1hbmQuY29tbWFuZCkge1xuICAgICAgY2FzZSAnaGVsbG8nOlxuICAgICAgICB0aGlzLnNlbmQoe1xuICAgICAgICAgIGNvbW1hbmQ6ICdoZWxsbycsXG4gICAgICAgICAgcHJvdG9jb2xzOiBbUFJPVE9DT0xfTU9OSVRPUklOR183XSxcbiAgICAgICAgICBzZXJ2ZXJOYW1lOiAnYXRvbS1saXZlcmVsb2FkJ1xuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwaW5nJzpcbiAgICAgIHRoaXMuc2VuZCh7XG4gICAgICAgIGNvbW1hbmQ6ICdwb25nJyxcbiAgICAgICAgdG9rZW46IGNvbW1hbmQudG9rZW5cbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFjdGl2YXRlZCgpIHtcbiAgICByZXR1cm4gISF0aGlzLmFwcDtcbiAgfVxuXG4gIGdldCBhZGRyZXNzKCkge1xuICAgIHJldHVybiB0aGlzLmFwcC5hZGRyZXNzKCk7XG4gIH1cblxuICBkZWJ1Zyh0ZXh0KSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmRlYnVnIHx8IHRydWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKHRleHQpO1xuICAgIH1cbiAgfVxuXG4gIHNlbmQoY29tbWFuZCkge1xuICAgIHRoaXMuc29ja2V0cy5mb3JFYWNoKCBzb2NrID0+IHtcbiAgICAgIHNvY2suc2VuZChKU09OLnN0cmluZ2lmeShjb21tYW5kKSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VydmVyO1xuIl19