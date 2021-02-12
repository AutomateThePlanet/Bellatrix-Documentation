---
layout: default
title:  "Execute Tests in CrossBrowserTesting"
excerpt: "Learn to use BELLATRIX to execute iOS tests in CrossBrowserTesting."
date:   2018-11-23 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/execute-tests-crossbrowsertesting/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
[IOSCrossBrowserTesting("crossBrowser-storage:TestApp.app.zip",
    "11.3",
    "iPhone 6",
    Lifecycle.RestartEveryTime,
    recordVideo: true,
    recordNetwork: true,
    build: "CI Execution")]
public class CrossBrowserTesting : IOSTest
{
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }

    [TestMethod]
    [IOSCrossBrowserTesting("crossBrowser-storage:TestApp.app.zip",
        "11.3",
        "iPhone 6",
        Lifecycle.ReuseIfStarted,
        recordVideo: true,
        recordNetwork: true,
        build: "CI Execution")]
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
[IOSCrossBrowserTesting("crossBrowser-storage:TestApp.app.zip",
    "11.3",
    "iPhone 6",
    Lifecycle.RestartEveryTime,
    recordVideo: true,
    recordNetwork: true,
    build: "CI Execution")]
```
To execute BELLATRIX tests in CrossBrowserTesting cloud, you should use the CrossBrowserTesting attribute instead of IOS. CrossBrowserTesting has the same parameters as IOS but adds to additional ones- deviceName, recordVideo, recordNetwork and build. The last three are optional and have default values. As with the IOS attribute you can override the class behaviour on Test level.
```csharp
[TestMethod]
[IOSCrossBrowserTesting("crossBrowser-storage:TestApp.app.zip",
    "11.3",
    "iPhone 6",
    Lifecycle.ReuseIfStarted,
    recordVideo: true,
    recordNetwork: true,
    build: "CI Execution")]
public void ButtonClicked_When_CallClickMethodSecond()
{
    var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

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