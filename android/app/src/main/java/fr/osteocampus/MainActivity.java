package fr.osteocampus;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public final class MainActivity extends Activity {
    private static final String ORIGIN = "https://campus.invalid/";
    private WebView web;
    private String destination = "";

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        web = new WebView(this);
        web.getSettings().setJavaScriptEnabled(true);
        web.getSettings().setDomStorageEnabled(true);
        web.getSettings().setAllowFileAccess(false);
        web.getSettings().setAllowContentAccess(false);
        web.getSettings().setMixedContentMode(0);
        web.addJavascriptInterface(new Bridge(), "AndroidReminders");
        web.setWebChromeClient(new android.webkit.WebChromeClient() {
            @Override public boolean onJsConfirm(WebView view, String url, String message, android.webkit.JsResult result) {
                new android.app.AlertDialog.Builder(MainActivity.this).setMessage(message)
                        .setPositiveButton("Confirmer", (dialog, which) -> result.confirm())
                        .setNegativeButton("Annuler", (dialog, which) -> result.cancel())
                        .setOnCancelListener(dialog -> result.cancel()).show();
                return true;
            }
        });
        web.setWebViewClient(new WebViewClient() {
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (trusted(uri)) return false;
                if ("https".equals(uri.getScheme())) {
                    try { startActivity(new Intent(Intent.ACTION_VIEW, uri)); }
                    catch (android.content.ActivityNotFoundException error) { }
                }
                return true;
            }
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (trusted(uri)) {
                    String path = uri.getPath();
                    if (path == null || path.equals("/")) path = "/index.html";
                    if (path.contains("..") || !path.matches("/[a-zA-Z0-9_./-]+")) return denied();
                    String mime = path.endsWith(".js") ? "text/javascript" : path.endsWith(".css") ? "text/css" : path.endsWith(".svg") ? "image/svg+xml" : "text/html";
                    try { return new WebResourceResponse(mime, "UTF-8", getAssets().open(path.substring(1))); }
                    catch (IOException error) { return denied(); }
                }
                return denied();
            }
            @Override public void onPageFinished(WebView view, String url) { openDestination(); }
        });
        web.setOnApplyWindowInsetsListener((view, insets) -> {
            view.setPadding(insets.getSystemWindowInsetLeft(), insets.getSystemWindowInsetTop(), insets.getSystemWindowInsetRight(), insets.getSystemWindowInsetBottom());
            return insets;
        });
        setContentView(web);
        acceptIntent(getIntent());
        web.loadUrl(ORIGIN + "index.html");
    }
    private boolean trusted(Uri uri) {
        return "https".equals(uri.getScheme()) && "campus.invalid".equals(uri.getHost()) && uri.getPort() == -1 && uri.getUserInfo() == null;
    }
    private WebResourceResponse denied() {
        return new WebResourceResponse("text/plain", "UTF-8", new ByteArrayInputStream(new byte[0]));
    }
    private void acceptIntent(Intent intent) {
        String id = intent.getStringExtra("lesson");
        if (id == null || !id.matches("[a-z0-9-]{1,80}")) return;
        JSONArray learned = Reminders.learned(this);
        for (int i = 0; i < learned.length(); i++) {
            JSONObject lesson = learned.optJSONObject(i);
            if (lesson != null && id.equals(lesson.optString("id"))) destination = id;
        }
    }
    private void openDestination() {
        if (!destination.isEmpty()) {
            web.evaluateJavascript("location.hash=" + JSONObject.quote("#/quiz/" + destination), null);
            destination = "";
        }
    }
    private void refresh() {
        web.evaluateJavascript("window.dispatchEvent(new Event('reminders-status'))", null);
    }
    @Override public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        acceptIntent(intent);
        openDestination();
    }
    @Override public void onResume() {
        super.onResume();
        Reminders.schedule(this, false);
        if (web != null) refresh();
    }
    @Override public void onRequestPermissionsResult(int code, String[] permissions, int[] results) {
        super.onRequestPermissionsResult(code, permissions, results);
        if (code == 7) { Reminders.schedule(this, false); refresh(); }
    }
    @Override public void onDestroy() {
        web.removeJavascriptInterface("AndroidReminders");
        web.destroy();
        super.onDestroy();
    }
    public final class Bridge {
        @JavascriptInterface public String status() { return Reminders.status(MainActivity.this); }
        @JavascriptInterface public void syncLearned(String raw) {
            if (raw == null || raw.length() > 100000) return;
            JSONArray safe = new JSONArray();
            try {
                JSONArray items = new JSONArray(raw);
                for (int i = 0; i < Math.min(items.length(), 500); i++) {
                    JSONObject item = items.getJSONObject(i);
                    String id = item.getString("id");
                    String title = item.getString("title");
                    if (!id.matches("[a-z0-9-]{1,80}") || title.length() > 200) continue;
                    safe.put(new JSONObject().put("id", id).put("title", title));
                }
            } catch (JSONException error) { return; }
            String value = safe.toString();
            runOnUiThread(() -> {
                Reminders.prefs(MainActivity.this).edit().putString("learned", value).apply();
                Reminders.schedule(MainActivity.this, false);
            });
        }
        @JavascriptInterface public void configure(boolean enabled, int start, int end) {
            if (start < 0 || end > 24 || start >= end) return;
            runOnUiThread(() -> {
                Reminders.prefs(MainActivity.this).edit().putBoolean("enabled", enabled).putInt("start", start).putInt("end", end).apply();
                Reminders.cancel(MainActivity.this);
                if (enabled && Build.VERSION.SDK_INT >= 33 && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                    requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 7);
                } else { Reminders.schedule(MainActivity.this, true); }
                refresh();
            });
        }
    }
}
