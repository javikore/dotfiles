function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libAtomLiveServer = require('../lib/atom-live-server');

var _libAtomLiveServer2 = _interopRequireDefault(_libAtomLiveServer);

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

'use babel';

describe('AtomLiveServer', function () {
  var workspaceElement = undefined,
      activationPromise = undefined;

  beforeEach(function () {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('atom-live-server');
  });

  describe('when the atom-live-server:toggle event is triggered', function () {
    it('hides and shows the modal panel', function () {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.atom-live-server')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'atom-live-server:toggle');

      waitsForPromise(function () {
        return activationPromise;
      });

      runs(function () {
        expect(workspaceElement.querySelector('.atom-live-server')).toExist();

        var atomLiveServerElement = workspaceElement.querySelector('.atom-live-server');
        expect(atomLiveServerElement).toExist();

        var atomLiveServerPanel = atom.workspace.panelForItem(atomLiveServerElement);
        expect(atomLiveServerPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'atom-live-server:toggle');
        expect(atomLiveServerPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', function () {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.atom-live-server')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'atom-live-server:toggle');

      waitsForPromise(function () {
        return activationPromise;
      });

      runs(function () {
        // Now we can test for view visibility
        var atomLiveServerElement = workspaceElement.querySelector('.atom-live-server');
        expect(atomLiveServerElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'atom-live-server:toggle');
        expect(atomLiveServerElement).not.toBeVisible();
      });
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2pzb2xpcy8uYXRvbS9wYWNrYWdlcy9hdG9tLWxpdmUtc2VydmVyL3NwZWMvYXRvbS1saXZlLXNlcnZlci1zcGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O2lDQUUyQix5QkFBeUI7Ozs7Ozs7OztBQUZwRCxXQUFXLENBQUM7O0FBU1osUUFBUSxDQUFDLGdCQUFnQixFQUFFLFlBQU07QUFDL0IsTUFBSSxnQkFBZ0IsWUFBQTtNQUFFLGlCQUFpQixZQUFBLENBQUM7O0FBRXhDLFlBQVUsQ0FBQyxZQUFNO0FBQ2Ysb0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3RELHFCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUM7R0FDdkUsQ0FBQyxDQUFDOztBQUVILFVBQVEsQ0FBQyxxREFBcUQsRUFBRSxZQUFNO0FBQ3BFLE1BQUUsQ0FBQyxpQ0FBaUMsRUFBRSxZQUFNOzs7QUFHMUMsWUFBTSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7O0FBSTFFLFVBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLHlCQUF5QixDQUFDLENBQUM7O0FBRXBFLHFCQUFlLENBQUMsWUFBTTtBQUNwQixlQUFPLGlCQUFpQixDQUFDO09BQzFCLENBQUMsQ0FBQzs7QUFFSCxVQUFJLENBQUMsWUFBTTtBQUNULGNBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUV0RSxZQUFJLHFCQUFxQixHQUFHLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2hGLGNBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUV4QyxZQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDN0UsY0FBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25ELFlBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLHlCQUF5QixDQUFDLENBQUM7QUFDcEUsY0FBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ3JELENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQzs7QUFFSCxNQUFFLENBQUMsMEJBQTBCLEVBQUUsWUFBTTs7Ozs7OztBQU9uQyxhQUFPLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7O0FBRXRDLFlBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7OztBQUkxRSxVQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDOztBQUVwRSxxQkFBZSxDQUFDLFlBQU07QUFDcEIsZUFBTyxpQkFBaUIsQ0FBQztPQUMxQixDQUFDLENBQUM7O0FBRUgsVUFBSSxDQUFDLFlBQU07O0FBRVQsWUFBSSxxQkFBcUIsR0FBRyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNoRixjQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM1QyxZQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0FBQ3BFLGNBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztPQUNqRCxDQUFDLENBQUM7S0FDSixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoiL2hvbWUvanNvbGlzLy5hdG9tL3BhY2thZ2VzL2F0b20tbGl2ZS1zZXJ2ZXIvc3BlYy9hdG9tLWxpdmUtc2VydmVyLXNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcblxuaW1wb3J0IEF0b21MaXZlU2VydmVyIGZyb20gJy4uL2xpYi9hdG9tLWxpdmUtc2VydmVyJztcblxuLy8gVXNlIHRoZSBjb21tYW5kIGB3aW5kb3c6cnVuLXBhY2thZ2Utc3BlY3NgIChjbWQtYWx0LWN0cmwtcCkgdG8gcnVuIHNwZWNzLlxuLy9cbi8vIFRvIHJ1biBhIHNwZWNpZmljIGBpdGAgb3IgYGRlc2NyaWJlYCBibG9jayBhZGQgYW4gYGZgIHRvIHRoZSBmcm9udCAoZS5nLiBgZml0YFxuLy8gb3IgYGZkZXNjcmliZWApLiBSZW1vdmUgdGhlIGBmYCB0byB1bmZvY3VzIHRoZSBibG9jay5cblxuZGVzY3JpYmUoJ0F0b21MaXZlU2VydmVyJywgKCkgPT4ge1xuICBsZXQgd29ya3NwYWNlRWxlbWVudCwgYWN0aXZhdGlvblByb21pc2U7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgd29ya3NwYWNlRWxlbWVudCA9IGF0b20udmlld3MuZ2V0VmlldyhhdG9tLndvcmtzcGFjZSk7XG4gICAgYWN0aXZhdGlvblByb21pc2UgPSBhdG9tLnBhY2thZ2VzLmFjdGl2YXRlUGFja2FnZSgnYXRvbS1saXZlLXNlcnZlcicpO1xuICB9KTtcblxuICBkZXNjcmliZSgnd2hlbiB0aGUgYXRvbS1saXZlLXNlcnZlcjp0b2dnbGUgZXZlbnQgaXMgdHJpZ2dlcmVkJywgKCkgPT4ge1xuICAgIGl0KCdoaWRlcyBhbmQgc2hvd3MgdGhlIG1vZGFsIHBhbmVsJywgKCkgPT4ge1xuICAgICAgLy8gQmVmb3JlIHRoZSBhY3RpdmF0aW9uIGV2ZW50IHRoZSB2aWV3IGlzIG5vdCBvbiB0aGUgRE9NLCBhbmQgbm8gcGFuZWxcbiAgICAgIC8vIGhhcyBiZWVuIGNyZWF0ZWRcbiAgICAgIGV4cGVjdCh3b3Jrc3BhY2VFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdG9tLWxpdmUtc2VydmVyJykpLm5vdC50b0V4aXN0KCk7XG5cbiAgICAgIC8vIFRoaXMgaXMgYW4gYWN0aXZhdGlvbiBldmVudCwgdHJpZ2dlcmluZyBpdCB3aWxsIGNhdXNlIHRoZSBwYWNrYWdlIHRvIGJlXG4gICAgICAvLyBhY3RpdmF0ZWQuXG4gICAgICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKHdvcmtzcGFjZUVsZW1lbnQsICdhdG9tLWxpdmUtc2VydmVyOnRvZ2dsZScpO1xuXG4gICAgICB3YWl0c0ZvclByb21pc2UoKCkgPT4ge1xuICAgICAgICByZXR1cm4gYWN0aXZhdGlvblByb21pc2U7XG4gICAgICB9KTtcblxuICAgICAgcnVucygoKSA9PiB7XG4gICAgICAgIGV4cGVjdCh3b3Jrc3BhY2VFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdG9tLWxpdmUtc2VydmVyJykpLnRvRXhpc3QoKTtcblxuICAgICAgICBsZXQgYXRvbUxpdmVTZXJ2ZXJFbGVtZW50ID0gd29ya3NwYWNlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYXRvbS1saXZlLXNlcnZlcicpO1xuICAgICAgICBleHBlY3QoYXRvbUxpdmVTZXJ2ZXJFbGVtZW50KS50b0V4aXN0KCk7XG5cbiAgICAgICAgbGV0IGF0b21MaXZlU2VydmVyUGFuZWwgPSBhdG9tLndvcmtzcGFjZS5wYW5lbEZvckl0ZW0oYXRvbUxpdmVTZXJ2ZXJFbGVtZW50KTtcbiAgICAgICAgZXhwZWN0KGF0b21MaXZlU2VydmVyUGFuZWwuaXNWaXNpYmxlKCkpLnRvQmUodHJ1ZSk7XG4gICAgICAgIGF0b20uY29tbWFuZHMuZGlzcGF0Y2god29ya3NwYWNlRWxlbWVudCwgJ2F0b20tbGl2ZS1zZXJ2ZXI6dG9nZ2xlJyk7XG4gICAgICAgIGV4cGVjdChhdG9tTGl2ZVNlcnZlclBhbmVsLmlzVmlzaWJsZSgpKS50b0JlKGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hpZGVzIGFuZCBzaG93cyB0aGUgdmlldycsICgpID0+IHtcbiAgICAgIC8vIFRoaXMgdGVzdCBzaG93cyB5b3UgYW4gaW50ZWdyYXRpb24gdGVzdCB0ZXN0aW5nIGF0IHRoZSB2aWV3IGxldmVsLlxuXG4gICAgICAvLyBBdHRhY2hpbmcgdGhlIHdvcmtzcGFjZUVsZW1lbnQgdG8gdGhlIERPTSBpcyByZXF1aXJlZCB0byBhbGxvdyB0aGVcbiAgICAgIC8vIGB0b0JlVmlzaWJsZSgpYCBtYXRjaGVycyB0byB3b3JrLiBBbnl0aGluZyB0ZXN0aW5nIHZpc2liaWxpdHkgb3IgZm9jdXNcbiAgICAgIC8vIHJlcXVpcmVzIHRoYXQgdGhlIHdvcmtzcGFjZUVsZW1lbnQgaXMgb24gdGhlIERPTS4gVGVzdHMgdGhhdCBhdHRhY2ggdGhlXG4gICAgICAvLyB3b3Jrc3BhY2VFbGVtZW50IHRvIHRoZSBET00gYXJlIGdlbmVyYWxseSBzbG93ZXIgdGhhbiB0aG9zZSBvZmYgRE9NLlxuICAgICAgamFzbWluZS5hdHRhY2hUb0RPTSh3b3Jrc3BhY2VFbGVtZW50KTtcblxuICAgICAgZXhwZWN0KHdvcmtzcGFjZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmF0b20tbGl2ZS1zZXJ2ZXInKSkubm90LnRvRXhpc3QoKTtcblxuICAgICAgLy8gVGhpcyBpcyBhbiBhY3RpdmF0aW9uIGV2ZW50LCB0cmlnZ2VyaW5nIGl0IGNhdXNlcyB0aGUgcGFja2FnZSB0byBiZVxuICAgICAgLy8gYWN0aXZhdGVkLlxuICAgICAgYXRvbS5jb21tYW5kcy5kaXNwYXRjaCh3b3Jrc3BhY2VFbGVtZW50LCAnYXRvbS1saXZlLXNlcnZlcjp0b2dnbGUnKTtcblxuICAgICAgd2FpdHNGb3JQcm9taXNlKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIGFjdGl2YXRpb25Qcm9taXNlO1xuICAgICAgfSk7XG5cbiAgICAgIHJ1bnMoKCkgPT4ge1xuICAgICAgICAvLyBOb3cgd2UgY2FuIHRlc3QgZm9yIHZpZXcgdmlzaWJpbGl0eVxuICAgICAgICBsZXQgYXRvbUxpdmVTZXJ2ZXJFbGVtZW50ID0gd29ya3NwYWNlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYXRvbS1saXZlLXNlcnZlcicpO1xuICAgICAgICBleHBlY3QoYXRvbUxpdmVTZXJ2ZXJFbGVtZW50KS50b0JlVmlzaWJsZSgpO1xuICAgICAgICBhdG9tLmNvbW1hbmRzLmRpc3BhdGNoKHdvcmtzcGFjZUVsZW1lbnQsICdhdG9tLWxpdmUtc2VydmVyOnRvZ2dsZScpO1xuICAgICAgICBleHBlY3QoYXRvbUxpdmVTZXJ2ZXJFbGVtZW50KS5ub3QudG9CZVZpc2libGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19