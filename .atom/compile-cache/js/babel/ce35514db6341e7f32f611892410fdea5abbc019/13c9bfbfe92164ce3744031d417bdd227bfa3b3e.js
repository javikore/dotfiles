Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = config;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

"use babel";

var DEFAULT_EXTS = 'html css js png gif jpg php php5 py rb erb coffee'.split(' ');
var DEFAULT_EXCLUSIONS = '.DS_Store .gitignore .git/ .svn/ .hg/'.split(' ');

function config() {
  var custom = {
    // port number
    port: atom.config.get('livereload.port'),

    // use HTTPS
    https: atom.config.get('livereload.useHTTPS') ? {} : null,

    // applyCSSLive
    applyCSSLive: atom.config.get('livereload.applyCSSLive') || true,

    // applyImageLive
    applyImageLive: atom.config.get('livereload.applyImageLive') || false,

    // delay for update
    delayForUpdate: atom.config.get('livereload.delayForUpdate'),

    // auto start
    autoStart: !!atom.config.get('livereload.autoStart'),

    // exts
    exts: atom.config.get('livereload.exts').split(','),

    // exclusions
    exclusions: atom.config.get('livereload.exclusions').split(',')
  };

  // exts
  custom.exts = _lodash2['default'].chain(custom.exts).map(function (ext) {
    return ext.trim();
  }).concat(DEFAULT_EXTS).uniq().value();

  // exclusions
  custom.exclusions = _lodash2['default'].chain(custom.exclusions).map(function (ex) {
    return ex.trim();
  }).concat(DEFAULT_EXCLUSIONS).uniq().map(function (pattern) {
    return new RegExp(pattern.replace(/([.\\\/])/g, '\\$1'));
  }).value();

  return custom;
}

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pzb2xpcy8uYXRvbS9wYWNrYWdlcy9saXZlcmVsb2FkL2xpYi9jb25maWcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQU93QixNQUFNOzs7O3NCQUxoQixRQUFROzs7O0FBRnRCLFdBQVcsQ0FBQzs7QUFJWixJQUFNLFlBQVksR0FBRyxtREFBbUQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDcEYsSUFBTSxrQkFBa0IsR0FBRyx1Q0FBdUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRS9ELFNBQVMsTUFBTSxHQUFHO0FBQy9CLE1BQUksTUFBTSxHQUFHOztBQUVYLFFBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzs7O0FBR3hDLFNBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJOzs7QUFHekQsZ0JBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLElBQUk7OztBQUdoRSxrQkFBYyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLElBQUksS0FBSzs7O0FBR3JFLGtCQUFjLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7OztBQUc1RCxhQUFTLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDOzs7QUFHcEQsUUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7O0FBR25ELGNBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7R0FDaEUsQ0FBQzs7O0FBR0YsUUFBTSxDQUFDLElBQUksR0FBRyxvQkFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBRSxVQUFBLEdBQUc7V0FBSSxHQUFHLENBQUMsSUFBSSxFQUFFO0dBQUEsQ0FBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7O0FBR2hHLFFBQU0sQ0FBQyxVQUFVLEdBQUcsb0JBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUUsVUFBQSxFQUFFO1dBQUksRUFBRSxDQUFDLElBQUksRUFBRTtHQUFBLENBQUUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUUsVUFBQSxPQUFPLEVBQUk7QUFBRSxXQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBRSxDQUFDLENBQUE7R0FBRSxDQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRWhNLFNBQU8sTUFBTSxDQUFDO0NBQ2YiLCJmaWxlIjoiL2hvbWUvanNvbGlzLy5hdG9tL3BhY2thZ2VzL2xpdmVyZWxvYWQvbGliL2NvbmZpZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGJhYmVsXCI7XG5cbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IERFRkFVTFRfRVhUUyA9ICdodG1sIGNzcyBqcyBwbmcgZ2lmIGpwZyBwaHAgcGhwNSBweSByYiBlcmIgY29mZmVlJy5zcGxpdCgnICcpO1xuY29uc3QgREVGQVVMVF9FWENMVVNJT05TID0gJy5EU19TdG9yZSAuZ2l0aWdub3JlIC5naXQvIC5zdm4vIC5oZy8nLnNwbGl0KCcgJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZygpIHtcbiAgdmFyIGN1c3RvbSA9IHtcbiAgICAvLyBwb3J0IG51bWJlclxuICAgIHBvcnQ6IGF0b20uY29uZmlnLmdldCgnbGl2ZXJlbG9hZC5wb3J0JyksXG5cbiAgICAvLyB1c2UgSFRUUFNcbiAgICBodHRwczogYXRvbS5jb25maWcuZ2V0KCdsaXZlcmVsb2FkLnVzZUhUVFBTJykgPyB7fSA6IG51bGwsXG5cbiAgICAvLyBhcHBseUNTU0xpdmVcbiAgICBhcHBseUNTU0xpdmU6IGF0b20uY29uZmlnLmdldCgnbGl2ZXJlbG9hZC5hcHBseUNTU0xpdmUnKSB8fCB0cnVlLFxuXG4gICAgLy8gYXBwbHlJbWFnZUxpdmVcbiAgICBhcHBseUltYWdlTGl2ZTogYXRvbS5jb25maWcuZ2V0KCdsaXZlcmVsb2FkLmFwcGx5SW1hZ2VMaXZlJykgfHwgZmFsc2UsXG5cbiAgICAvLyBkZWxheSBmb3IgdXBkYXRlXG4gICAgZGVsYXlGb3JVcGRhdGU6IGF0b20uY29uZmlnLmdldCgnbGl2ZXJlbG9hZC5kZWxheUZvclVwZGF0ZScpLFxuXG4gICAgLy8gYXV0byBzdGFydFxuICAgIGF1dG9TdGFydDogISFhdG9tLmNvbmZpZy5nZXQoJ2xpdmVyZWxvYWQuYXV0b1N0YXJ0JyksXG5cbiAgICAvLyBleHRzXG4gICAgZXh0czogYXRvbS5jb25maWcuZ2V0KCdsaXZlcmVsb2FkLmV4dHMnKS5zcGxpdCgnLCcpLFxuXG4gICAgLy8gZXhjbHVzaW9uc1xuICAgIGV4Y2x1c2lvbnM6IGF0b20uY29uZmlnLmdldCgnbGl2ZXJlbG9hZC5leGNsdXNpb25zJykuc3BsaXQoJywnKVxuICB9O1xuXG4gIC8vIGV4dHNcbiAgY3VzdG9tLmV4dHMgPSBfLmNoYWluKGN1c3RvbS5leHRzKS5tYXAoIGV4dCA9PiBleHQudHJpbSgpICkuY29uY2F0KERFRkFVTFRfRVhUUykudW5pcSgpLnZhbHVlKCk7XG5cbiAgLy8gZXhjbHVzaW9uc1xuICBjdXN0b20uZXhjbHVzaW9ucyA9IF8uY2hhaW4oY3VzdG9tLmV4Y2x1c2lvbnMpLm1hcCggZXggPT4gZXgudHJpbSgpICkuY29uY2F0KERFRkFVTFRfRVhDTFVTSU9OUykudW5pcSgpLm1hcCggcGF0dGVybiA9PiB7IHJldHVybiBuZXcgUmVnRXhwKHBhdHRlcm4ucmVwbGFjZSgvKFsuXFxcXFxcL10pL2csICdcXFxcJDEnICkpIH0gKS52YWx1ZSgpO1xuXG4gIHJldHVybiBjdXN0b207XG59XG4iXX0=