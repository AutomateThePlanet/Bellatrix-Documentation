---
layout: default
title:  "AppService"
excerpt: "Learn how to use BELLATRIX Android AppService."
date:   2018-06-22 06:50:17 +0200
parent: android-automation
permalink: /android-automation/app-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.Controls1",
    AppBehavior.RestartEveryTime)]
public class AppServiceTests : AndroidTest
{
    [TestMethod]
    public void TestBackgroundApp()
    {
        App.AppService.BackgroundApp(1);
    }

    [TestMethod]
    public void TestResetApp()
    {
        App.AppService.ResetApp();
    }

    [TestMethod]
    public void InstallAppInstalledFalse_When_AppIsUninstalled()
    {
        string appPath = Path.Combine(ProcessProvider.GetExecutingAssemblyFolder(), "Demos\\ApiDemos.apk");

        App.AppService.InstallApp(appPath);

        App.AppService.RemoveApp("com.example.android.apis");

        Assert.IsFalse(App.AppService.IsAppInstalled("com.example.android.apis"));

        App.AppService.InstallApp(appPath);
        Assert.IsTrue(App.AppService.IsAppInstalled("com.example.android.apis"));
    }
}
```

Explanations
------------
BELLATRIX gives you an interface to most common operations for controlling the Android app through the AppService class. We already saw one of them StartActivity for opening a particular initial activity.
```csharp
App.AppService.BackgroundApp(1);
```
Backgrounds the app for the specified number of seconds.
```csharp
App.AppService.ResetApp();
```
Resets the app.
```csharp
Assert.IsTrue(App.AppService.IsAppInstalled("com.example.android.apis"));
```
Checks whether the app with the specified app package is installed.
```csharp
App.AppService.InstallApp(appPath);
```
Installs the APK file on the device.
```csharp
App.AppService.RemoveApp("io.appium.android.apis");
```
Uninstalls the app with the specified app package.