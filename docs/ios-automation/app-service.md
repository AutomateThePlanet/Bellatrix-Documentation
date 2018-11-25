---
layout: default
title:  "AppService"
excerpt: "Learn how to use BELLATRIX IOS AppService."
date:   2018-11-20 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/app-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    AppBehavior.RestartEveryTime)]
public class AppServiceTests : IOSTest
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
    public void InstallAppInstalledTrue_When_AppIsInstalled()
    {
        Assert.IsTrue(App.AppService.IsAppInstalled("com.apple.mobilecal"));
    }

    [TestMethod]
    public void InstallAppInstalledFalse_When_AppIsUninstalled()
    {
        string appPath = Path.Combine(ProcessProvider.GetExecutingAssemblyFolder(), "Demos/TestApp.app.zip");

        App.AppService.InstallApp(appPath);

        App.AppService.RemoveApp("com.apple.mobilecal");

        Assert.IsFalse(App.AppService.IsAppInstalled("com.apple.mobilecal"));

        App.AppService.InstallApp(appPath);
        Assert.IsTrue(App.AppService.IsAppInstalled("om.apple.mobilecal"));
    }
}
```

Explanations
------------
BELLATRIX gives you an interface to most common operations for controlling the iOS app through the AppService class.
```csharp
App.AppService.BackgroundApp(1);
```
Backgrounds the app for the specified number of seconds.
```csharp
App.AppService.ResetApp();
```
Resets the app.
```csharp
Assert.IsTrue(App.AppService.IsAppInstalled("com.apple.mobilecal"));
```
Checks whether the app with the specified bundleId is installed.
```csharp
App.AppService.InstallApp(appPath);
```
Installs the app file on the device.
```csharp
App.AppService.RemoveApp("com.apple.mobilecal");
```
Uninstalls the app with the specified bundleId. You can get your app's bundleId from XCode.