# NAJI Android APK Build

NAJI is a Node.js/Express web application. The Android build uses **Capacitor** to package the existing `public/` web interface into a native Android application.

## GitHub Actions

The workflow at `.github/workflows/android-apk.yml`:

1. Checks out the repository.
2. Installs Node.js 20 and Java 17.
3. Installs the NAJI dependencies.
4. Generates the Android platform with Capacitor.
5. Syncs `public/` into the Android app.
6. Builds a debug APK with Gradle.
7. Uploads the APK as the `NAJI-debug-apk` artifact.

Run it manually from **GitHub → Actions → Build Android APK → Run workflow**.

## Important API note

The APK contains the web UI, but the Express server in `server.js` is not itself running inside the Android WebView. Calls such as `/api/generate-key` and `/api/sound` therefore need a reachable deployed NAJI backend when used from the APK.

Do not put private API keys or `.env` secrets into the Android bundle or public repository.
