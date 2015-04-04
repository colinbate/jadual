var jadual = require('../jadual');
describe('jadual API', function () {
  describe('isScheduled()', function () {
    it('returns false if schedule is falsy', function () {
      expect(jadual.isScheduled('')).toBe(false);
    });
  });
});