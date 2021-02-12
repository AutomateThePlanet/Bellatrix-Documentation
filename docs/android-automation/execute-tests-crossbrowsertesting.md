---
layout: default
title:  "Execute Tests in CrossBrowserTesting"
excerpt: "Learn to use BELLATRIX to execute Android tests in CrossBrowserTesting."
date:   2018-10-23 06:50:17 +0200
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
[TestClass]
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
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

        button.Click();
    }

    [TestMethod]
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
        var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

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
[TestMethod]
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
    var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

    button.Click();
}
```
As mentioned if you use the BrowserStack attribute on method level it overrides the class settings.

Configuration
-------------
```json
"browserStack": {
	"gridUri":  "http://hub-cloud.browserstack.com/wd/hub/",
	"user": "soioa1",
	"key":  "pnFG3Ky2yLZ5muB1p46P"
}
```
You can find a dedicated section about SauceLabs in **testFrameworkSettings.json** file under the **mobileSettings** section. There you can set the grid URL and credentials.