package fr.osteocampus;

import android.app.Notification;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import org.json.JSONArray;
import org.json.JSONObject;
import java.time.ZoneId;
import java.util.Random;

public final class ReminderReceiver extends BroadcastReceiver {
    @Override public void onReceive(Context context, Intent intent) {
        SharedPreferences settings = Reminders.prefs(context);
        long now = System.currentTimeMillis();
        long scheduled = settings.getLong("next", 0);
        if (scheduled == 0 || now < scheduled) return;
        JSONArray lessons = Reminders.learned(context);
        if (settings.getBoolean("enabled", false) && lessons.length() > 0 && Reminders.permitted(context)
                && ReminderSchedule.inWindow(now, scheduled, ZoneId.systemDefault(), settings.getInt("start", 9), settings.getInt("end", 20))) {
            JSONObject lesson = lessons.optJSONObject(new Random().nextInt(lessons.length()));
            if (lesson != null) {
                Intent open = new Intent(context, MainActivity.class).putExtra("lesson", lesson.optString("id"));
                open.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
                PendingIntent action = PendingIntent.getActivity(context, 2, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
                Notification notification = new Notification.Builder(context, Reminders.CHANNEL)
                        .setSmallIcon(android.R.drawable.ic_popup_reminder)
                        .setContentTitle("Un petit rappel de révision ?")
                        .setContentText(lesson.optString("title"))
                        .setContentIntent(action)
                        .setAutoCancel(true)
                        .setVisibility(Notification.VISIBILITY_PRIVATE)
                        .build();
                try { Reminders.manager(context).notify(Reminders.NOTIFICATION, notification); }
                catch (SecurityException error) { Reminders.cancel(context); }
            }
        }
        Reminders.schedule(context, true);
    }
}
