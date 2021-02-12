---
layout: default
title:  "Execute Tests in SauceLabs"
excerpt: "Learn to use BELLATRIX to execute Android tests in SauceLabs."
date:   2018-10-23 06:50:17 +0200
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
        var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

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
        var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

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
    var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

    button.Click();
}
```
As mentioned if you use the SauceLabs attribute on method level it overrides the class settings.

Configuration
-------------
```json
"sauceLabs": {
         "gridUri":  "http://ondemand.saucelabs.com:80/wd/hub",
         "user": "aangelov",
         "key":  "mySecretKey"
     }
```
You can find a dedicated section about SauceLabs in **testFrameworkSettings.json** file under the **mobileSettings** section. There you can set the grid URL and credentials.