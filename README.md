# NAJI

This repository contains the NAJI app source archive and an automated Android build.

## Build an APK with GitHub Actions

The workflow at `.github/workflows/android-apk.yml`:

1. Extracts `naji-android-ready-updated.zip`.
2. Installs the Node.js and Capacitor dependencies.
3. Creates the Android project if the archive does not contain one.
4. Builds a debug APK with Gradle.
5. Uploads `app-debug.apk` as a workflow artifact.

Run it from **Actions → Build Android APK → Run workflow**, or push to `main`. The APK can be downloaded from the completed workflow run under **Artifacts**.
