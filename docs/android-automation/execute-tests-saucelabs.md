---
layout: default
title:  "Execute Tests in SauceLabs"
excerpt: "Learn to use BELLATRIX to execute Android tests in SauceLabs."
date:   2021-10-23 06:50:17 +0200
parent: android-automation
permalink: /android-automation/execute-tests-saucelabs/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
[AndroidSauceLabs("sauce-storage:ApiDemos.apk",
    "7.1",
    "Android GoogleAPI Emulator",
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.ControlsMaterialDark",
    Lifecycle.RestartEveryTime)]
public class SauceLabsTests : AndroidTest
{
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.Components.CreateByIdContaining<Button>("button");

        button.Click();
    }

    [TestMethod]
    [AndroidSauceLabs("sauce-storage:ApiDemos.apk",
        "7.1",
        "Android GoogleAPI Emulator",
        Constants.AndroidNativeAppAppExamplePackage,
        ".view.ControlsMaterialDark",
        Lifecycle.ReuseIfStarted)]
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
[AndroidSauceLabs("sauce-storage:ApiDemos.apk",
    "7.1",
    "Android GoogleAPI Emulator",
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.ControlsMaterialDark",
    Lifecycle.RestartEveryTime)]
```
To execute BELLATRIX tests in SauceLabs cloud you should use the AndroidSauceLabs attribute instead of Android. SauceLabs has the same parameters as Android but adds to additional ones- device name, recordVideo and recordScreenshots. As with the Android attribute you can override the class behavior on Test level.
```csharp
[TestMethod]
[AndroidSauceLabs("sauce-storage:ApiDemos.apk",
    "7.1",
    "Android GoogleAPI Emulator",
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.ControlsMaterialDark",
    Lifecycle.ReuseIfStarted)]
[Ignore]
public void ButtonClicked_When_CallClickMethodSecond()
{
    var button = App.Components.CreateByIdContaining<Button>("button");

    button.Click();
}
```
As mentioned if you use the SauceLabs attribute on method level it overrides the class settings.

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
      "name": "{runName}",
      "platform": "Android",
      "version": "7.1",
      "recordVideo": "true",
      "recordScreenshots": "true",
      "username": "yourUserName",
      "accessKey": "accessKey"
    }
  ]
}
```