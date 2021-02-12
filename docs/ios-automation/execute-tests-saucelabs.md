---
layout: default
title:  "Execute Tests in SauceLabs"
excerpt: "Learn to use BELLATRIX to execute iOS tests in SauceLabs."
date:   2018-11-23 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/execute-tests-saucelabs/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
[IOSSauceLabs("sauce-storage:TestApp.app.zip",
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.RestartEveryTime)]
public class SauceLabsTests : IOSTest
{
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }

    [TestMethod]
    [IOSSauceLabs("sauce-storage:TestApp.app.zip",
        Constants.IOSDefaultVersion,
        Constants.IOSDefaultDeviceName,
        Lifecycle.ReuseIfStarted)]
    public void ButtonClicked_When_CallClickMethodSecond()
    {
        var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }
}
```

Explanations
------------
```csharp
[IOSSauceLabs("sauce-storage:TestApp.app.zip",
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.RestartEveryTime)]
```
To execute BELLATRIX tests in SauceLabs cloud you should use the IOSSauceLabs attribute instead of IOS. SauceLabs has the same parameters as IOS but adds to additional ones- device name, recordVideo and recordScreenshots. As with the IOS attribute you can override the class behavior on Test level.
```csharp
[TestMethod]
[IOSSauceLabs("sauce-storage:TestApp.app.zip",
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.ReuseIfStarted)]
public void ButtonClicked_When_CallClickMethodSecond()
{
    var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

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