package fr.osteocampus;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public final class RestoreReceiver extends BroadcastReceiver {
    @Override public void onReceive(Context context, Intent intent) {
        Reminders.schedule(context, Intent.ACTION_TIME_CHANGED.equals(intent.getAction()) || Intent.ACTION_TIMEZONE_CHANGED.equals(intent.getAction()));
    }
}
