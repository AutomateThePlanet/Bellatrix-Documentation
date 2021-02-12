---
layout: default
title:  "Add Custom WebDriver Capabilities"
excerpt: "Learn how to add custom WebDriver capabilities."
date:   2018-02-20 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/add-custom-webdriver-capabilities/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
public class AddCustomWebDriverCapabilitiesTests : DesktopTest
{
    public override void TestsArrange()
    {
        App.AddAdditionalCapability("appArguments", @"MyTestFile.txt");
        App.AddAdditionalCapability("appWorkingDir", @"C:\MyTestFolder\");
    }

    [TestMethod]
    public void MessageChanged_When_ButtonHovered_Wpf()
    {
        var button = App.ElementCreateService.CreateByName<Button>("E Button");

        button.Hover();

        var label = App.ElementCreateService.CreateByName<Button>("ebuttonHovered");
        Assert.AreEqual("ebuttonHovered", label.InnerText);
    }

    [TestMethod]
    [App(Constants.WpfAppPath, Lifecycle.RestartOnFail)]
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
App.AddAdditionalCapability("appArguments", @"MyTestFile.txt");
App.AddAdditionalCapability("appWorkingDir", @"C:\MyTestFolder\");
```
BELLATRIX hides the complexity of initialisation of WebDriver and all related services. In some cases, you need to customise the set up of the app with adding driver capabilities. Using the **App** service methods you can add all of these with ease. Make sure to call them in the **TestsArrange** which is called before the execution of the tests placed in the test class. These options are used only for the tests in this particular class.