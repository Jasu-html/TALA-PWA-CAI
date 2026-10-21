package com.tala.learning;

import android.Manifest;
import android.content.Intent;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import com.getcapacitor.JSObject;
import com.getcapacitor.PermissionState;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;
import java.util.ArrayList;

@CapacitorPlugin(name = "TalaVoiceInput", permissions = {
    @Permission(alias = "microphone", strings = { Manifest.permission.RECORD_AUDIO })
})
public class TalaVoiceInputPlugin extends Plugin {
    private SpeechRecognizer recognizer;
    private PluginCall pending;
    private String sessionId;

    @PluginMethod
    public void start(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            if (pending != null) { call.reject("Already listening", "busy"); return; }
            if (!SpeechRecognizer.isRecognitionAvailable(getContext())) {
                call.reject("No Android speech recognition service", "service-unavailable"); return;
            }
            pending = call;
            sessionId = call.getString("sessionId", "");
            if (getPermissionState("microphone") != PermissionState.GRANTED) {
                requestPermissionForAlias("microphone", call, "microphonePermission");
            } else begin(call);
        });
    }

    @PermissionCallback
    private void microphonePermission(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            if (pending != call) return; // Cancelled while Android's permission dialog was open.
            if (getPermissionState("microphone") != PermissionState.GRANTED) fail(call, "not-allowed");
            else begin(call);
        });
    }

    private void begin(PluginCall call) {
        try {
            recognizer = SpeechRecognizer.createSpeechRecognizer(getContext());
            final SpeechRecognizer current = recognizer;
            recognizer.setRecognitionListener(new RecognitionListener() {
                private boolean active() { return pending == call && recognizer == current; }
                @Override public void onReadyForSpeech(Bundle params) {
                    if (active()) notifyListeners("listening", new JSObject().put("sessionId", sessionId));
                }
                @Override public void onBeginningOfSpeech() {}
                @Override public void onRmsChanged(float value) {}
                @Override public void onBufferReceived(byte[] buffer) {} // Never store microphone audio.
                @Override public void onEndOfSpeech() {}
                @Override public void onPartialResults(Bundle partialResults) {}
                @Override public void onEvent(int eventType, Bundle params) {}
                @Override public void onError(int error) {
                    if (!active()) return;
                    String code = switch (error) {
                        case SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS -> "not-allowed";
                        case SpeechRecognizer.ERROR_NETWORK, SpeechRecognizer.ERROR_NETWORK_TIMEOUT -> "network";
                        case SpeechRecognizer.ERROR_AUDIO -> "audio-capture";
                        case SpeechRecognizer.ERROR_NO_MATCH, SpeechRecognizer.ERROR_SPEECH_TIMEOUT -> "no-speech";
                        case SpeechRecognizer.ERROR_LANGUAGE_NOT_SUPPORTED, SpeechRecognizer.ERROR_LANGUAGE_UNAVAILABLE -> "language-not-supported";
                        default -> "service-not-allowed";
                    };
                    fail(call, code);
                }
                @Override public void onResults(Bundle results) {
                    if (!active()) return;
                    ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
                    if (matches == null || matches.isEmpty()) { fail(call, "no-speech"); return; }
                    String text = matches.get(0);
                    pending = null;
                    destroyRecognizer();
                    call.resolve(new JSObject().put("transcript", text));
                }
            });
            Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
            intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, "fil-PH");
            intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 1);
            intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, false);
            recognizer.startListening(intent);
        } catch (SecurityException error) { fail(call, "not-allowed"); }
        catch (Exception error) { fail(call, "service-not-allowed"); }
    }

    @PluginMethod
    public void cancel(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            if (pending != null && sessionId.equals(call.getString("sessionId", ""))) fail(pending, "aborted");
            call.resolve();
        });
    }

    private void fail(PluginCall call, String code) {
        if (pending != call) return;
        pending = null;
        destroyRecognizer();
        call.reject("Voice input stopped", code);
    }

    private void destroyRecognizer() {
        SpeechRecognizer current = recognizer;
        recognizer = null;
        if (current != null) { current.cancel(); current.destroy(); }
    }

    @Override protected void handleOnStop() {
        getActivity().runOnUiThread(() -> { if (pending != null) fail(pending, "aborted"); });
    }
    @Override protected void handleOnDestroy() {
        getActivity().runOnUiThread(() -> { if (pending != null) fail(pending, "aborted"); else destroyRecognizer(); });
    }
}
