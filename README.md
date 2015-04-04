# Jadual

Malay for schedule, this is a tiny scheduling library.

Although to be clear, this isn't a library which you tell it to do this thing at this time. It is more for testing whether a particular "now" time is within a schedule as defined by data passed into the library.

At the moment it only supports daily and weekly scheduling. The schedule is defined by a data structure which looks like this:

```
{
    recurrences: [
        { day: Weekday, startTime: Time, endTime: Time }
    ],
    start: DateTime,
    end: DateTime
 }
```

Where `DateTime` is a JavaScript compatible datetime representation (an integer timestamp, ISO date, etc). `Time` in this case is a string time of the form `HH:mm[:ss]` and `Weekday` can be `0` to represent "daily" or `1..7` to represent Sunday through Saturday.