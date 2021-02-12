---
layout: default
title:  "Add Custom Appium Options"
excerpt: "Learn how to add custom Appium options."
date:   2018-11-20 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/add-custom-appium-options/
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
    Lifecycle.RestartEveryTime)]
public class CustomWebDriverCapabilitiesTests : IOSTest
{
    public override void TestsArrange()
    {
        App.AddAdditionalCapability("autoAcceptAlerts", "true");
        App.AddAdditionalCapability("showIOSLog", "true");
        App.AddAdditionalCapability("remoteDebugProxy", "12000");
    }

    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }
}
```

Explanations
------------
```csharp
App.AddAdditionalCapability("autoAcceptAlerts", "true");
App.AddAdditionalCapability("showIOSLog", "true");
App.AddAdditionalCapability("remoteDebugProxy", "12000");
```
BELLATRIX hides the complexity of initialisation of WebDriver/Appium and all related services. In some cases, you need to customise the set up of a Appium with using custom Appium options. Using the **App** service methods you can add all of these with ease. Make sure to call them in the **TestsArrange** which is called before the execution of the tests placed in the test class. These options are used only for the tests in this particular class.
**Note**: You can use all of these methods no matter which attributes you use- **IOS**, **IOSSauceLabs**, **IOSBrowserStack** or **IOSCrossBrowserTesting**.