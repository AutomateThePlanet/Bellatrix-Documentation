---
layout: default
title:  "Add Custom Appium Options"
excerpt: "Learn how to add custom Appium options."
date:   2018-10-20 06:50:17 +0200
parent: android-automation
permalink: /android-automation/add-custom-appium-options/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.Controls1",
    AppBehavior.ReuseIfStarted)]
public class CustomWebDriverCapabilitiesTests : AndroidTest
{
    public override void TestsArrange()
    {
        App.AddAppiumCapability("locale", "fr_CA");
        App.AddAppiumCapability("language", "fr");
        App.AddAppiumCapability("autoWebview", "true");
        App.AddAppiumCapability("noReset", "false");
    }

    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

        button.Click();
    }

    [TestMethod]
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
App.AddAppiumCapability("locale", "fr_CA");
App.AddAppiumCapability("language", "fr");
App.AddAppiumCapability("autoWebview", "true");
App.AddAppiumCapability("noReset", "false");
```
BELLATRIX hides the complexity of initialisation of WebDriver/Appium and all related services. In some cases, you need to customise the set up of a Appium with using custom Appium options. Using the **App** service methods you can add all of these with ease. Make sure to call them in the **TestsArrange** which is called before the execution of the tests placed in the test class. These options are used only for the tests in this particular class.
**Note**: You can use all of these methods no matter which attributes you use- **Android**, **AndroidSauceLabs**, **AndroidBrowserStack** or **AndroidCrossBrowserTesting**.