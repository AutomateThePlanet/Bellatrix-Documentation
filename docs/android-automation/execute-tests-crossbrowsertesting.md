---
layout: default
title:  "Execute Tests in CrossBrowserTesting"
excerpt: "Learn to use BELLATRIX to execute Android tests in CrossBrowserTesting."
date:   2021-10-23 06:50:17 +0200
parent: android-automation
permalink: /android-automation/execute-tests-crossbrowsertesting/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestFixture]
[AndroidCrossBrowserTesting("crossBrowser-storage:ApiDemos.apk",
    "7.1",
    "Android GoogleAPI Emulator",
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.ControlsMaterialDark",
    Lifecycle.RestartEveryTime,
    recordVideo: true,
    recordNetwork: true,
    build: "CI Execution")]
public class CrossBrowserTesting : AndroidTest
{
    [Test]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.Components.CreateByIdContaining<Button>("button");

        button.Click();
    }

    [Test]
    [AndroidCrossBrowserTesting("crossBrowser-storage:ApiDemos.apk",
        "7.1",
        "Android GoogleAPI Emulator",
        Constants.AndroidNativeAppAppExamplePackage,
        ".view.ControlsMaterialDark",
        Lifecycle.ReuseIfStarted,
        recordVideo: true,
        recordNetwork: true,
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
[AndroidCrossBrowserTesting("crossBrowser-storage:ApiDemos.apk",
    "7.1",
    "Android GoogleAPI Emulator",
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.ControlsMaterialDark",
    Lifecycle.RestartEveryTime,
    recordVideo: true,
    recordNetwork: true,
    build: "CI Execution")]
```
To execute BELLATRIX tests in CrossBrowserTesting cloud, you should use the CrossBrowserTesting attribute instead of Android. CrossBrowserTesting has the same parameters as Android but adds to additional ones- deviceName, recordVideo, recordNetwork and build. The last three are optional and have default values. As with the Android attribute you can override the class behaviour on Test level.
```csharp
[Test]
[AndroidCrossBrowserTesting("crossBrowser-storage:ApiDemos.apk",
    "7.1",
    "Android GoogleAPI Emulator",
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.ControlsMaterialDark",
    Lifecycle.ReuseIfStarted,
    recordVideo: true,
    recordNetwork: true,
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
      "platform": "Android",
      "browserName": "",
      "version": "7.1",
      "record_video": "true",
      "record_network": "true",
      "username": "yourUserName",
      "password": "accessKey"
    }
  ]
}
```