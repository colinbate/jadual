/*global describe:false, it:false, expect:false */
var jadual = require('../jadual');
describe('jadual API', function () {
  describe('isScheduled()', function () {
    it('returns false if schedule is falsy', function () {
      expect(jadual.isScheduled('')).toBe(false);
    });
    it('returns false if schedule is empty', function () {
      expect(jadual.isScheduled({})).toBe(false);
    });
    it('returns false if schedule has empty recurrences', function () {
      expect(jadual.isScheduled({recurrences: []})).toBe(false);
    });
    it('returns true if contains a start date', function () {
      expect(jadual.isScheduled({start: 123456789})).toBe(true);
    });
    it('returns true if contains an end date', function () {
      expect(jadual.isScheduled({end: '2016-01-01T13:00:00'})).toBe(true);
    });
    it('returns true if there is a recurrence', function () {
      expect(jadual.isScheduled({recurrences: [
        {day: 0, startTime: '01:00', endTime: '02:00'}
      ]})).toBe(true);
    });
  });
  describe('humanize()', function () {
    it('returns an empty string when there is no schedule', function () {
      expect(jadual.humanize({})).toBe('');
    });
    it('returns an invalid schedule string when the start is after the end date', function () {
      var invalidSchedule = {
        start: '2015-09-27T23:00:00',
        end: '2015-05-09T12:30:00'
      };
      expect(jadual.humanize(invalidSchedule)).toBe('Invalid schedule');
    });
    it('handles schedule with only start date', function () {
      var schedule = {
        start: '2015-05-09T10:00:00'
      };
      expect(jadual.humanize(schedule)).toBe('Shown starting from 2015-05-09 10:00');
    });
    it('handles schedule with only end date', function () {
      var schedule = {
        end: '2015-09-27T00:00:00'
      };
      expect(jadual.humanize(schedule)).toBe('Shown ending 2015-09-27');
    });
    xit('handles schedule with both start and end dates', function () {
      var schedule = {
        
      };
      expect(jadual.humanize(schedule)).toBe('');
    });
    xit('handles schedule with daily recurrence', function () {
      var schedule = {
        
      };
      expect(jadual.humanize(schedule)).toBe('');
    });
    xit('handles schedule with single weekly recurrence', function () {
      var schedule = {
        
      };
      expect(jadual.humanize(schedule)).toBe('');
    });
    xit('handles schedule with multiple recurrences', function () {
      var schedule = {
        
      };
      expect(jadual.humanize(schedule)).toBe('');
    });
    xit('handles schedule with start and end date and recurrence', function () {
      var schedule = {
        
      };
      expect(jadual.humanize(schedule)).toBe('');
    });
  });
  
  describe('isActive()', function () {
    it('returns true when there is no schedule', function () {
      expect(jadual.isActive({})).toBe(true);
    });
    it('throws when the start is after the end date', function () {
      var invalidSchedule = {
        start: '2015-09-27T23:00:00',
        end: '2015-05-09T12:30:00'
      };
      expect(function () {
        jadual.isActive(invalidSchedule);
      }).toThrow();
    });
    xit('handles schedule with only start date', function () {
      
    });
    xit('handles schedule with only end date', function () {
      
    });
    xit('handles schedule with both start and end dates', function () {
      
    });
    xit('handles schedule with daily recurrence', function () {
      
    });
    xit('handles schedule with single weekly recurrence', function () {
      
    });
    xit('handles schedule with multiple recurrences', function () {
      
    });
    xit('handles schedule with start and end date and recurrence', function () {
      
    });
  })
});