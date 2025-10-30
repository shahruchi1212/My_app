# 🌟 My_app: React Native Application

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli). This application is configured for location services and mapping, utilizing the **Google Maps API**.

---

## ✨ Project Overview

| Category | Details |
| :--- | :--- |
| **Framework** | React Native |
| **Language** | TypeScript/JavaScript, Kotlin (Android Native) |
| **Key Feature**| Integration with **Google Maps API** and device location services. |
| **Security** | Configured to securely handle separate **Debug** and **Release** API keys using Gradle. |

---

## 🚀 Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### 🔒 Step 1: Secure API Key Configuration (MANDATORY)

This project requires Google Maps API keys. For security, these keys **MUST NOT** be committed to the repository.

1.  **Obtain/Restrict Keys:** Get two separate, **restricted** Google Maps API keys from the Google Cloud Console.
    * **Debug Key:** Restricted to your development SHA-1 fingerprint.
    * **Release Key:** Restricted to your production SHA-1 fingerprint.

2.  **Create `local.properties`:** In the **`android/`** directory, create a file named `local.properties` and add your keys:

    ```properties
    # local.properties (This file is ignored by Git via .gitignore)
    MAPS_API_KEY_DEBUG="YOUR_SECURE_DEBUG_KEY_HERE"
    MAPS_API_KEY_RELEASE="YOUR_SECURE_RELEASE_KEY_HERE"
    ```

3.  **Verify Manifest Placeholder:** The Android build system (Gradle) will automatically inject the correct key into the `AndroidManifest.xml` via the `${mapsApiKey}` placeholder, based on the selected build type.

### Step 2: Install Dependencies

From the root of the project:

```sh
# Using npm
npm install

# OR using Yarn
yarn install