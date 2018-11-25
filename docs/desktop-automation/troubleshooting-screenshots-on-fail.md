---
layout: default
title:  "Troubleshooting- Screenshots on Fail"
excerpt: "Learn how to generate screenshots on test's fail."
date:   2018-06-22 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/troubleshooting-screenshots-on-fail/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
[ScreenshotOnFail(true)]
[App(Constants.WpfAppPath, AppBehavior.RestartEveryTime)]
public class AppScreenshotsOnFailTests : DesktopTest
{
    [TestMethod]
    public void MessageChanged_When_ButtonHovered_Wpf()
    {
        var button = App.ElementCreateService.CreateByName<Button>("E Button");

        button.Hover();

        var label = App.ElementCreateService.CreateByName<Button>("ebuttonHovered");
        Assert.AreEqual("ebuttonHovered", label.InnerText);
    }
    
    [TestMethod]
    [App(Constants.WpfAppPath, AppBehavior.RestartOnFail)]
    [ScreenshotOnFail(false)]
    public void MessageChanged_When_ButtonClicked_Wpf()
    {
        var button = App.ElementCreateService.CreateByName<Button>("E Button");

        button.Click();

        var label = App.ElementCreateService.CreateByName<Button>("ebuttonClicked");
        Assert.AreEqual("ebuttonClicked", label.InnerText);
    }
}
```

Explanations
------------
```csharp
[ScreenshotOnFail(true)]
```
This is the attribute for automatic generation of app screenshots by BELLATRIX. The engine checks after each test, its result, if failed, makes the screenshots. If you place attribute over the class all tests inherit the behaviour. It is possible to put it over each test and this way you override the class behaviour only for this particular test.
```csharp
[TestMethod]
[App(Constants.WpfAppPath, AppBehavior.RestartOnFail)]
[ScreenshotOnFail(false)]
public void MessageChanged_When_ButtonClicked_Wpf()
```
As mentioned above we can override the screenshot behaviour for a particular test. The global behaviour for all tests in the class is to make screenshots on fail. Only for this particular test, we tell BELLATRIX not to make screenshots.

Configuration
-------------
If you open the **testFrameworkSettings.json** file, you find the screenshotsSettings section that controls this behaviour.
```json
"screenshotsSettings": {
    "isEnabled": "true",
    "filePath": "C:\\Troubleshooting\\Screenshots"
}
```
You can turn off the making of screenshots for all tests and specify where the screenshots to be saved.
In the extensibility chapters read more about how you can create different screenshots engine or change the saving strategy.