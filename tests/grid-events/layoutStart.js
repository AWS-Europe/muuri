(function (window) {

  var Muuri = window.Muuri;

  QUnit.module('Grid events');

  QUnit.test('layoutStart: should be triggered after grid.layout() (before the items are positioned)', function (assert) {

    assert.expect(4);

    var container = utils.createGrid();
    var grid = new Muuri(container);
    var layout = grid._layout;
    var teardown = function () {
      grid.destroy();
      container.parentNode.removeChild(container);
    };

    utils.setStyles(container, {height: ''});
    grid.on('layoutStart', function (items) {
      assert.strictEqual(arguments.length, 1, 'should have one argument');
      assert.deepEqual(utils.sortedIdList(items), utils.sortedIdList(grid.getItems('active')), 'should be an array of the items that are about to be laid out');
      assert.notStrictEqual(grid._layout, layout, 'should be called after layout is created');
      assert.notStrictEqual(container.style.height, '', 'should be called after container dimensions are updated');
    });
    grid.move(0, -1);
    teardown();

  });

})(this);