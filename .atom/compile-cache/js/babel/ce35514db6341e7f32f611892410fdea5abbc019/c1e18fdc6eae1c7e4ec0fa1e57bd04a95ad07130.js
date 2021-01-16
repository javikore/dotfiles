"use babel";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LivereloadView = (function (_HTMLDivElement) {
  _inherits(LivereloadView, _HTMLDivElement);

  function LivereloadView() {
    _classCallCheck(this, LivereloadView);

    _get(Object.getPrototypeOf(LivereloadView.prototype), 'constructor', this).apply(this, arguments);

    this._link = null;
    this._tooltip = null;
    this._command = null;
  }

  _createClass(LivereloadView, [{
    key: 'initialize',
    value: function initialize(state) {
      var _this = this;

      // add content
      this.innerHTML = '<a href="#" data-url></a>';
      this.firstChild.addEventListener('click', function (event) {
        return _this.handleClick(event);
      }, false);

      // add classes
      this.classList.add('livereload-status', 'inline-block');

      this.url = '';
      this.text = 'Off';
      this.tooltip = '';
    }
  }, {
    key: 'attach',
    value: function attach() {
      // Register command that toggles this view
      this._command = atom.commands.add('atom-workspace', { 'livereload:toggle': this.toggle.bind(this) });
    }
  }, {
    key: 'detach',
    value: function detach() {
      this._tooltip.dispose();
      this._command.dispose();
    }
  }, {
    key: 'serialize',
    value: function serialize() {
      return this._activated;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      try {
        this.detach();
      } catch (e) {};
      this.remove();
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      var event = new Event('toggle');
      this.dispatchEvent(event);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();
      if (this.url) {
        atom.clipboard.write(this.url, 'url');
      }
    }
  }, {
    key: 'text',
    set: function set(text) {
      this.firstChild.textContent = 'LiveReload: ' + text;
    },
    get: function get() {
      return this.firstChild.textContent;
    }
  }, {
    key: 'url',
    set: function set(url) {
      this.firstChild.dataset.url = url;
    },
    get: function get() {
      return this.firstChild.dataset.url;
    }
  }, {
    key: 'tooltip',
    set: function set(text) {
      if (this._tooltip) this._tooltip.dispose();
      this._tooltip = atom.tooltips.add(this, { title: text });
    }
  }]);

  return LivereloadView;
})(HTMLDivElement);

exports['default'] = document.registerElement('livereload-status-bar', { prototype: LivereloadView.prototype });
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pzb2xpcy8uYXRvbS9wYWNrYWdlcy9saXZlcmVsb2FkL2xpYi9saXZlcmVsb2FkLXZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFDOzs7Ozs7Ozs7Ozs7OztJQUVOLGNBQWM7WUFBZCxjQUFjOztXQUFkLGNBQWM7MEJBQWQsY0FBYzs7K0JBQWQsY0FBYzs7U0FDbEIsS0FBSyxHQUFHLElBQUk7U0FDWixRQUFRLEdBQUcsSUFBSTtTQUNmLFFBQVEsR0FBRyxJQUFJOzs7ZUFIWCxjQUFjOztXQUtSLG9CQUFDLEtBQUssRUFBRTs7OztBQUVoQixVQUFJLENBQUMsU0FBUyxHQUFHLDJCQUEyQixDQUFDO0FBQzdDLFVBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUEsS0FBSztlQUFJLE1BQUssV0FBVyxDQUFDLEtBQUssQ0FBQztPQUFBLEVBQUUsS0FBSyxDQUFDLENBQUM7OztBQUduRixVQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLENBQUMsQ0FBQzs7QUFFeEQsVUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDZCxVQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztBQUNsQixVQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztLQUNuQjs7O1dBRUssa0JBQUc7O0FBRVAsVUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRSxnQkFBZ0IsRUFBRSxFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUUsQ0FBQTtLQUN2Rzs7O1dBRUssa0JBQUc7QUFDUCxVQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3hCLFVBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDekI7OztXQUVRLHFCQUFHO0FBQ1YsYUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3hCOzs7V0FFTSxtQkFBRztBQUNSLFVBQUk7QUFBRSxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7T0FBRSxDQUFDLE9BQU0sQ0FBQyxFQUFDLEVBQUUsQ0FBQztBQUNqQyxVQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDZjs7O1dBRUssa0JBQUc7QUFDUCxVQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoQyxVQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzNCOzs7V0FFVSxxQkFBQyxLQUFLLEVBQUU7QUFDakIsV0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3ZCLFVBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNaLFlBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7T0FDdkM7S0FDRjs7O1NBRU8sYUFBQyxJQUFJLEVBQUU7QUFDYixVQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxjQUFjLEdBQUcsSUFBSSxDQUFDO0tBQ3JEO1NBRU8sZUFBRztBQUNULGFBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7S0FDcEM7OztTQUVNLGFBQUMsR0FBRyxFQUFFO0FBQ1gsVUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztLQUNuQztTQUVNLGVBQUc7QUFDUixhQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztLQUNwQzs7O1NBRVUsYUFBQyxJQUFJLEVBQUU7QUFDaEIsVUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDM0MsVUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUUsQ0FBQztLQUM1RDs7O1NBcEVHLGNBQWM7R0FBUyxjQUFjOztxQkF1RTVCLFFBQVEsQ0FBQyxlQUFlLENBQUMsdUJBQXVCLEVBQUUsRUFBQyxTQUFTLEVBQUMsY0FBYyxDQUFDLFNBQVMsRUFBQyxDQUFDIiwiZmlsZSI6Ii9ob21lL2pzb2xpcy8uYXRvbS9wYWNrYWdlcy9saXZlcmVsb2FkL2xpYi9saXZlcmVsb2FkLXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBiYWJlbFwiO1xuXG5jbGFzcyBMaXZlcmVsb2FkVmlldyBleHRlbmRzIEhUTUxEaXZFbGVtZW50IHtcbiAgX2xpbmsgPSBudWxsO1xuICBfdG9vbHRpcCA9IG51bGw7XG4gIF9jb21tYW5kID0gbnVsbDtcblxuICBpbml0aWFsaXplKHN0YXRlKSB7XG4gICAgLy8gYWRkIGNvbnRlbnRcbiAgICB0aGlzLmlubmVySFRNTCA9ICc8YSBocmVmPVwiI1wiIGRhdGEtdXJsPjwvYT4nO1xuICAgIHRoaXMuZmlyc3RDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRoaXMuaGFuZGxlQ2xpY2soZXZlbnQpLCBmYWxzZSk7XG5cbiAgICAvLyBhZGQgY2xhc3Nlc1xuICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnbGl2ZXJlbG9hZC1zdGF0dXMnLCAnaW5saW5lLWJsb2NrJyk7XG5cbiAgICB0aGlzLnVybCA9ICcnO1xuICAgIHRoaXMudGV4dCA9ICdPZmYnO1xuICAgIHRoaXMudG9vbHRpcCA9ICcnO1xuICB9XG5cbiAgYXR0YWNoKCkge1xuICAgIC8vIFJlZ2lzdGVyIGNvbW1hbmQgdGhhdCB0b2dnbGVzIHRoaXMgdmlld1xuICAgIHRoaXMuX2NvbW1hbmQgPSBhdG9tLmNvbW1hbmRzLmFkZCggJ2F0b20td29ya3NwYWNlJywgeyAnbGl2ZXJlbG9hZDp0b2dnbGUnOiB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpIH0gKVxuICB9XG5cbiAgZGV0YWNoKCkge1xuICAgIHRoaXMuX3Rvb2x0aXAuZGlzcG9zZSgpO1xuICAgIHRoaXMuX2NvbW1hbmQuZGlzcG9zZSgpO1xuICB9XG5cbiAgc2VyaWFsaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmF0ZWQ7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRyeSB7IHRoaXMuZGV0YWNoKCkgfSBjYXRjaChlKXt9O1xuICAgIHRoaXMucmVtb3ZlKCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0b2dnbGUnKTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLnVybCkge1xuICAgICAgYXRvbS5jbGlwYm9hcmQud3JpdGUodGhpcy51cmwsICd1cmwnKTtcbiAgICB9XG4gIH1cblxuICBzZXQgdGV4dCh0ZXh0KSB7XG4gICAgdGhpcy5maXJzdENoaWxkLnRleHRDb250ZW50ID0gJ0xpdmVSZWxvYWQ6ICcgKyB0ZXh0O1xuICB9XG5cbiAgZ2V0IHRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlyc3RDaGlsZC50ZXh0Q29udGVudDtcbiAgfVxuXG4gIHNldCB1cmwodXJsKSB7XG4gICAgdGhpcy5maXJzdENoaWxkLmRhdGFzZXQudXJsID0gdXJsO1xuICB9XG5cbiAgZ2V0IHVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5maXJzdENoaWxkLmRhdGFzZXQudXJsO1xuICB9XG5cbiAgc2V0IHRvb2x0aXAodGV4dCkge1xuICAgIGlmICh0aGlzLl90b29sdGlwKSB0aGlzLl90b29sdGlwLmRpc3Bvc2UoKTtcbiAgICB0aGlzLl90b29sdGlwID0gYXRvbS50b29sdGlwcy5hZGQoIHRoaXMsIHsgdGl0bGU6IHRleHQgfSApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnbGl2ZXJlbG9hZC1zdGF0dXMtYmFyJywge3Byb3RvdHlwZTpMaXZlcmVsb2FkVmlldy5wcm90b3R5cGV9KTtcbiJdfQ==