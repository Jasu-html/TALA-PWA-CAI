package com.tala.learning;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.OutputStream;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@CapacitorPlugin(name = "TalaClassroomFiles")
public class TalaClassroomFilesPlugin extends Plugin {
    private final ExecutorService writer = Executors.newSingleThreadExecutor();
    private boolean saving;

    @PluginMethod
    public void save(PluginCall call) {
        String filename = call.getString("filename", "");
        String data = call.getString("data", "");
        String mime = call.getString("mime", "");
        if (!filename.matches("[A-Za-z0-9_-]+\\.(json|csv)") || data.length() > 5000000 ||
            !(mime.equals("application/json") || mime.equals("text/csv"))) {
            call.reject("Invalid export", "invalid-export"); return;
        }
        getActivity().runOnUiThread(() -> {
            if (saving) { call.reject("An export is already open", "busy"); return; }
            saving = true;
            Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
            intent.addCategory(Intent.CATEGORY_OPENABLE);
            intent.setType(mime);
            intent.putExtra(Intent.EXTRA_TITLE, filename);
            try { startActivityForResult(call, intent, "documentCreated"); }
            catch (Exception error) { saving = false; call.reject("Cannot open the file picker", "unavailable"); }
        });
    }

    @ActivityCallback
    private void documentCreated(PluginCall call, ActivityResult result) {
        saving = false;
        if (call == null) return;
        if (result.getResultCode() != Activity.RESULT_OK || result.getData() == null) {
            call.reject("Cancelled", "cancelled"); return;
        }
        Uri uri = result.getData().getData();
        if (uri == null || !"content".equals(uri.getScheme())) { call.reject("Invalid document", "invalid-document"); return; }
        writer.execute(() -> {
            try (OutputStream stream = getContext().getContentResolver().openOutputStream(uri, "w")) {
                if (stream == null) throw new IllegalStateException("No output stream");
                stream.write(call.getString("data", "").getBytes(StandardCharsets.UTF_8));
                stream.flush();
            } catch (Exception error) { call.reject("Cannot save this document. Try a different location.", "write-failed"); return; }
            call.resolve(new JSObject().put("saved", true));
        });
    }

    @PluginMethod
    public void open(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            if (saving) { call.reject("A file picker is already open", "busy"); return; }
            saving = true;
            Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
            intent.addCategory(Intent.CATEGORY_OPENABLE);
            intent.setType("application/json");
            try { startActivityForResult(call, intent, "fileOpened"); }
            catch (Exception error) { saving = false; call.reject("Cannot open the file picker", "unavailable"); }
        });
    }

    @ActivityCallback
    private void fileOpened(PluginCall call, ActivityResult result) {
        saving = false;
        if (call == null) return;
        if (result.getResultCode() != Activity.RESULT_OK || result.getData() == null) { call.reject("Cancelled", "cancelled"); return; }
        Uri uri = result.getData().getData();
        if (uri == null || !"content".equals(uri.getScheme())) { call.reject("Invalid document", "invalid-document"); return; }
        writer.execute(() -> {
            try (InputStream stream = getContext().getContentResolver().openInputStream(uri);
                 ByteArrayOutputStream bytes = new ByteArrayOutputStream()) {
                if (stream == null) throw new IllegalStateException("No input stream");
                byte[] buffer = new byte[8192]; int count;
                while ((count = stream.read(buffer)) != -1) {
                    if (bytes.size() + count > 5000000) { call.reject("Backup is larger than 5 MB", "too-large"); return; }
                    bytes.write(buffer, 0, count);
                }
                call.resolve(new JSObject().put("data", bytes.toString("UTF-8")));
            } catch (Exception error) { call.reject("Cannot read this document", "read-failed"); }
        });
    }

    @Override protected void handleOnDestroy() { writer.shutdown(); }
}
