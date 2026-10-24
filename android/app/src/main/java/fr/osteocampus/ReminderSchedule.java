package fr.osteocampus;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Random;

public final class ReminderSchedule {
    public static long tomorrow(long now, ZoneId zone, int start, int end, Random random) {
        if (start < 0 || end > 24 || start >= end) throw new IllegalArgumentException("Invalid hours");
        LocalDate day = Instant.ofEpochMilli(now).atZone(zone).toLocalDate().plusDays(1);
        long first = day.atTime(start, 0).atZone(zone).toInstant().toEpochMilli();
        long last = end == 24 ? day.plusDays(1).atStartOfDay(zone).toInstant().toEpochMilli()
                : day.atTime(end, 0).atZone(zone).toInstant().toEpochMilli();
        long minutes = (last - first) / 60000;
        if (minutes <= 0) return tomorrow(now + 86400000L, zone, start, end, random);
        return first + random.nextInt((int) minutes) * 60000L;
    }

    public static boolean inWindow(long now, long scheduled, ZoneId zone, int start, int end) {
        var time = Instant.ofEpochMilli(now).atZone(zone);
        var planned = Instant.ofEpochMilli(scheduled).atZone(zone);
        return now >= scheduled && time.toLocalDate().equals(planned.toLocalDate())
                && time.getHour() >= start && time.getHour() < end;
    }
}
