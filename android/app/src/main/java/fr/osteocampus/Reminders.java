package fr.osteocampus;

import android.Manifest;
import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import java.time.ZoneId;
import java.util.Random;

final class Reminders {
    static final String CHANNEL = "revision";
    static final int NOTIFICATION = 42;
    static SharedPreferences prefs(Context context) {
        return context.getSharedPreferences("revision", Context.MODE_PRIVATE);
    }
    static NotificationManager manager(Context context) {
        return context.getSystemService(NotificationManager.class);
    }
    static void channel(Context context) {
        manager(context).createNotificationChannel(new NotificationChannel(CHANNEL, "Révisions quotidiennes", NotificationManager.IMPORTANCE_DEFAULT));
    }
    static boolean permitted(Context context) {
        channel(context);
        return (Build.VERSION.SDK_INT < 33 || context.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED)
                && manager(context).areNotificationsEnabled()
                && manager(context).getNotificationChannel(CHANNEL).getImportance() != NotificationManager.IMPORTANCE_NONE;
    }
    static JSONArray learned(Context context) {
        try { return new JSONArray(prefs(context).getString("learned", "[]")); }
        catch (JSONException error) { return new JSONArray(); }
    }
    static PendingIntent alarm(Context context) {
        return PendingIntent.getBroadcast(context, 1, new Intent(context, ReminderReceiver.class), PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }
    static void cancel(Context context) {
        context.getSystemService(AlarmManager.class).cancel(alarm(context));
        prefs(context).edit().remove("next").apply();
        manager(context).cancel(NOTIFICATION);
    }
    static void schedule(Context context, boolean replace) {
        SharedPreferences settings = prefs(context);
        if (!settings.getBoolean("enabled", false) || learned(context).length() == 0 || !permitted(context)) {
            cancel(context);
            return;
        }
        long now = System.currentTimeMillis();
        long next = settings.getLong("next", 0);
        if (replace || next <= now) next = ReminderSchedule.tomorrow(now, ZoneId.systemDefault(), settings.getInt("start", 9), settings.getInt("end", 20), new Random());
        settings.edit().putLong("next", next).apply();
        context.getSystemService(AlarmManager.class).setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, next, alarm(context));
    }
    static String status(Context context) {
        SharedPreferences settings = prefs(context);
        JSONObject result = new JSONObject();
        try {
            result.put("supported", true);
            result.put("enabled", settings.getBoolean("enabled", false));
            result.put("permission", permitted(context));
            result.put("start", settings.getInt("start", 9));
            result.put("end", settings.getInt("end", 20));
            result.put("next", settings.getLong("next", 0));
            result.put("count", learned(context).length());
        } catch (JSONException error) { return "{}"; }
        return result.toString();
    }
}
