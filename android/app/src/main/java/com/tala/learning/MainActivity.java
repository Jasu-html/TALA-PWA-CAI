package com.tala.learning;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AlertDialog;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private AlertDialog exitDialog;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(TalaVoiceInputPlugin.class);
        registerPlugin(TalaClassroomFilesPlugin.class);
        super.onCreate(savedInstanceState);
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN);
        View content = findViewById(android.R.id.content);
        // Paint real inset space black, including on Android 15/16 where changing
        // statusBarColor alone no longer protects edge-to-edge content.
        content.setBackgroundColor(Color.BLACK);
        ViewCompat.setOnApplyWindowInsetsListener(content, (view, insets) -> {
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            Insets keyboard = insets.getInsets(WindowInsetsCompat.Type.ime());
            view.setPadding(bars.left, bars.top, bars.right, Math.max(bars.bottom, keyboard.bottom));
            return new WindowInsetsCompat.Builder(insets)
                .setInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout() | WindowInsetsCompat.Type.ime(), Insets.NONE)
                .build();
        });
        WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        controller.setAppearanceLightStatusBars(false);
        controller.setAppearanceLightNavigationBars(false);
        controller.show(WindowInsetsCompat.Type.systemBars());
        ViewCompat.requestApplyInsets(content);
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                WindowInsetsCompat insets = ViewCompat.getRootWindowInsets(content);
                if (insets != null && insets.isVisible(WindowInsetsCompat.Type.ime())) {
                    controller.hide(WindowInsetsCompat.Type.ime());
                    return;
                }
                if (bridge == null || bridge.getWebView() == null) { confirmExit(); return; }
                bridge.getWebView().evaluateJavascript(
                    "Boolean(window.TALA_UI && window.TALA_UI.back && window.TALA_UI.back())",
                    handled -> { if (!"true".equals(handled)) confirmExit(); }
                );
            }
        });
    }

    private void confirmExit() {
        if (isFinishing() || (exitDialog != null && exitDialog.isShowing())) return;
        exitDialog = new AlertDialog.Builder(this)
            .setTitle("Isara ang TALA?")
            .setMessage("Maaari kang bumalik mamaya. Naka-save ang iyong progreso.")
            .setNegativeButton("Magpatuloy", (dialog, which) -> dialog.dismiss())
            .setPositiveButton("Isara", (dialog, which) -> finish())
            .show();
    }
}
