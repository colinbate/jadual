(function(root, factory) {
  'use strict';
  /* CommonJS */
  if (typeof exports === 'object') {
    module.exports = factory(require('tiny-datetime'));
  }
  /* AMD module */
  else if (typeof define === 'function' && define.amd) {
    define(['tiny-datetime'], factory);
  }
  /* Browser global */
  else {
    root.jadual = factory(root.tinyDT);
  }
}
(this, function(tiny) {
  'use strict';
  var weekdays = ['day', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      //months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      //last = 'Last day of',
      handlers = {
        daily: function (recurrence, now) {
          var nowTime = tiny.time.fromDate(now),
              nowDate = new Date(now),
              dayOk = recurrence.day === 0 || nowDate.getDay() === (recurrence.day - 1);
          return dayOk && ((!recurrence.startTime || tiny.time.compare(recurrence.startTime, nowTime) <= 0) &&
                (!recurrence.endTime || tiny.time.compare(recurrence.endTime, nowTime) >= 0));
        },
        route: function (recurrence, now) {
          if (!recurrence) {
            return true;
          }
          if (!recurrence.type || recurrence.type === 'daily' || recurrence.type === 'weekly') {
            return handlers.daily(recurrence, now);
          }
          return false;
        }
        //monthly: function () {},
        //yearly: function () {}
      },
      isInRange = function (schedule, now) {
        return ((!schedule.start || schedule.start <= now) &&
                (!schedule.end || schedule.end >= now));
      },
      collect = function (collector, start, arr, fn) {
        var ii, ret, collected = start;
        for (ii = 0; ii < arr.length; ii += 1) {
          ret = fn.call(null, arr[ii], ii);
          collected = collector.call(null, ret, collected);
        }
        return collected;
      },
      anyTrue = function (arr, fn) {
        return collect(function (curr, prev) { return curr || prev; }, false, arr, fn);
      },
      recurrenceMet = function (schedule, now) {
        if (!schedule.recurrences || !schedule.recurrences.length) {
          return true;
        }
        return anyTrue(schedule.recurrences, function (recurrence) {
          return handlers.route.call(null, recurrence, now);
        });
      },
      isScheduled = function (schedule) {
        return !!(schedule && ((schedule.recurrences && schedule.recurrences.length) ||
           schedule.start || schedule.end));
      },
      isValid = function (schedule) {
        var validRange = !(schedule.start && schedule.end && schedule.start > schedule.end);
        return validRange;
      },
      isActive = function (schedule, now) {
        if (!isScheduled(schedule)) {
          return true;
        }
        if (!isValid(schedule)) {
          throw 'Invalid schedule';
        }
        return isInRange(schedule, now) && recurrenceMet(schedule, now);
      },
      humanDay = function (start, end, day) {
        return ' every ' + day + ' between ' + start + ' and ' + end;
      },
      prettyDate = function (date) {
        var day = tiny.date.fromDate(date),
            time = tiny.time.fromDate(date);
        return day + (time === '00:00' ? '' : ' ' + time);
      },
      humanizer = {
        daily: function (recurrence) {
          return humanDay(recurrence.startTime, recurrence.endTime, weekdays[recurrence.day]);
        },
        recurrence: function (recurrence) {
          if (!recurrence) {
            return '';
          }
          if (!recurrence.type || recurrence.type === 'daily' || recurrence.type === 'weekly') {
            return humanizer.daily(recurrence);
          }
          return '';
        }
        //monthly: function () {},
        //yearly: function () {}
      },
      humanize = function (schedule) {
        var str = 'Shown', ii;
        if (!isScheduled(schedule)) {
          return '';
        }
        if (!isValid(schedule)) {
          return 'Invalid schedule';
        }
        if (schedule.start) {
          str += ' starting from ' + prettyDate(schedule.start);
        }
        if (schedule.end) {
          str += ' ending ' + prettyDate(schedule.end);
        }
        if (schedule.recurrences && schedule.recurrences.length) {
          for (ii = 0; ii < schedule.recurrences.length; ii += 1) {
            str += humanizer.recurrence(schedule.recurrences[ii]);
            if (ii < schedule.recurrences.length - 1) {
              str += ' and';
            }
          }
        }
        return str;
      };
  return {
    isActive: isActive,
    humanize: humanize,
    isScheduled: isScheduled
  };
}));