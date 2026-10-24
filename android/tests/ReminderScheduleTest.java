import fr.osteocampus.ReminderSchedule;
import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.Instant;
import java.util.Random;

public final class ReminderScheduleTest {
    public static void main(String[] args) {
        ZoneId zone = ZoneId.of("Europe/Paris");
        for (String date : new String[]{"2026-03-28T12:00:00+01:00[Europe/Paris]", "2026-10-24T12:00:00+02:00[Europe/Paris]", "2026-12-31T23:59:00+01:00[Europe/Paris]"}) {
            long now = ZonedDateTime.parse(date).toInstant().toEpochMilli();
            for (int seed = 0; seed < 100; seed++) {
                long next = ReminderSchedule.tomorrow(now, zone, 9, 20, new Random(seed));
                var local = Instant.ofEpochMilli(next).atZone(zone);
                check(local.toLocalDate().equals(Instant.ofEpochMilli(now).atZone(zone).toLocalDate().plusDays(1)));
                check(local.getHour() >= 9 && local.getHour() < 20);
                check(ReminderSchedule.inWindow(next, next, zone, 9, 20));
                check(!ReminderSchedule.inWindow(next - 1, next, zone, 9, 20));
                check(!ReminderSchedule.inWindow(next + 86400000L, next, zone, 9, 20));
                long late = local.toLocalDate().atTime(20, 0).atZone(zone).toInstant().toEpochMilli();
                check(!ReminderSchedule.inWindow(late, next, zone, 9, 20));
            }
        }
        try {
            ReminderSchedule.tomorrow(0, zone, 20, 9, new Random());
            throw new AssertionError("Invalid window accepted");
        } catch (IllegalArgumentException expected) { }
        System.out.println("Reminder schedule: next day, quiet hours, DST, year rollover and invalid input passed");
    }
    private static void check(boolean valid) {
        if (!valid) throw new AssertionError("Schedule invariant failed");
    }
}
