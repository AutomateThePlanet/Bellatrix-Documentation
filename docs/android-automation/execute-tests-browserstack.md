---
layout: default
title:  "Execute Tests in BrowserStack"
excerpt: "Learn to use BELLATRIX to execute Android tests in BrowserStack."
date:   2021-10-23 06:50:17 +0200
parent: android-automation
permalink: /android-automation/execute-tests-browserstack/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestFixture]
[AndroidBrowserStack("pngG38y26LZ5muB1p46P",
    "7.1",
    "Android GoogleAPI Emulator",
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.ControlsMaterialDark",
    Lifecycle.RestartEveryTime,
    captureVideo: true,
    captureNetworkLogs: true,
    consoleLogType: BrowserStackConsoleLogType.Disable,
    debug: false,
    build: "CI Execution")]
public class BrowserStackTests : AndroidTest
{
    [Test]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.Components.CreateByIdContaining<Button>("button");

        button.Click();
    }

    [Test]
    [AndroidBrowserStack("pngG38y26LZ5muB1p46P",
        "7.1",
        "Android GoogleAPI Emulator",
        Constants.AndroidNativeAppAppExamplePackage,
        ".view.ControlsMaterialDark",
        Lifecycle.ReuseIfStarted,
        captureVideo: true,
        captureNetworkLogs: true,
        consoleLogType: BrowserStackConsoleLogType.Disable,
        debug: false,
        build: "CI Execution")]
    public void ButtonClicked_When_CallClickMethodSecond()
    {
        var button = App.Components.CreateByIdContaining<Button>("button");

        button.Click();
    }
}
```

Explanations
------------
```csharp
[AndroidBrowserStack("pngG38y26LZ5muB1p46P",
    "7.1",
    "Android GoogleAPI Emulator",
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.ControlsMaterialDark",
    Lifecycle.RestartEveryTime,
    captureVideo: true,
    captureNetworkLogs: true,
    consoleLogType: BrowserStackConsoleLogType.Disable,
    debug: false,
    build: "CI Execution")]
```
To execute BELLATRIX tests in BrowserStack cloud, you should use the BrowserStack attribute instead of Android. BrowserStack has the same parameters as Android but adds to additional ones- device name, captureVideo, captureNetworkLogs, consoleLogType, build and debug. The last five are optional and have default values. As with the Android attribute you can override the class behaviour on Test level.
```csharp
[Test]
[AndroidBrowserStack("pngG38y26LZ5muB1p46P",
    "7.1",
    "Android GoogleAPI Emulator",
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.ControlsMaterialDark",
    Lifecycle.ReuseIfStarted,
    captureVideo: true,
    captureNetworkLogs: true,
    consoleLogType: BrowserStackConsoleLogType.Disable,
    debug: false,
    build: "CI Execution")]
public void ButtonClicked_When_CallClickMethodSecond()
{
    var button = App.Components.CreateByIdContaining<Button>("button");

    button.Click();
}
```
As mentioned if you use the BrowserStack attribute on method level it overrides the class settings.

Configuration
------------
If you don't use the attribute, the default information from the configuration will be used placed under the executionSettings section. Also, you can add additional driver arguments under the arguments section array in the configuration file.
```json
"executionSettings": {
  "defaultLifeCycle": "restart everytime",
  "shouldStartLocalService": "false",
  "url": "http://127.0.0.1:4722/wd/hub",
  "arguments": [
    {
      "deviceOrientation": "portrait",
      "deviceName": "Nexus 1",
      "app": "AssemblyFolder\\Demos\\ApiDemos.apk",
      "appWaitActivity": "*",
      "appPackage": "com.example.android.apis",
      "appActivity": ".view.Controls1"
       "os": "Android",
       "os_version": "7.1",
       "browser": "",
       "browser_version": "",
       "browserstack.debug": "true",
       "browserstack.video": "true",
       "browserstack.networkLogs": "true",
       "browserstack.console": "true",
       "browserstack.user": "yourUserName",
       "browserstack.key": "accessKey"
    }
  ]
}
```