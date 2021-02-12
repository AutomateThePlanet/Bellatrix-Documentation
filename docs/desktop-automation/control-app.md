---
layout: default
title:  "Control App"
excerpt: "Learn how to desktop application with BELLATRIX desktop module."
date:   2018-06-22 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/control-app/
anchors:
  overview: Overview
  explanations: Explanations
---
Overview
--------

This is how one BELLATRIX test class looks like.
```csharp
[TestClass]
[App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
public class ControlAppTests : DesktopTest
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
[TestClass]
```
This is the main attribute that you need to mark each class that contains MSTest tests.
```csharp
[App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
```
This is the attribute for automatic start/control of WebDriver applications by BELLATRIX. If you have to do it manually properly, you will need thousands of lines of code.
**appPath**- sets the path where your application is.
**Lifecycle** enum controls when the app is started and stopped. This can drastically increase or decrease the tests execution time, depending on your needs.
However you need to be careful because in case of tests failures the app may need to be restarted.
**Available options:**

- **RestartEveryTime**- for each test a separate WebDriver instance is created and the previous app instance is
- **RestartOnFail**- the app is only restarted if the previous test failed. Alternatively, if the previous test's app was different.
- **ReuseIfStarted**- the app is only restarted if the previous test's app was different. In all other cases, the app is reused if possible.

**Note**: However, use this option with caution since in some rare cases if you have not properly setup your tests you may need to restart the app if the test fails otherwise all other tests may fail too.

There are even more things you can do with this attribute, but we look into them in the next sections.

```csharp
public class ControlAppTests : DesktopTest
```
All desktop BELLATRIX test classes should inherit from the DesktopTest base class. This way you can use all built-in BELLATRIX tools and functionalities.
```csharp
[App(Constants.WpfAppPath, Lifecycle.RestartEveryTime)]
public class ControlAppTests : DesktopTest
```
If you place attribute over the class all tests inherit the behaviour. It is possible to place it over each test and this way it overrides the class behaviour only for this particular test.
```csharp
[TestMethod]
public void PromotionsPageOpened_When_PromotionsButtonClicked()
```
All MSTest tests should be marked with the TestMethod attribute.
```csharp
var button = App.ElementCreateService.CreateByName<Button>("E Button");
```
Use the element creation service to create an instance of the button. There are much more details about this process in the next sections.
```csharp
[TestMethod]
[App(Constants.WpfAppPath, Lifecycle.RestartOnFail)]
public void MessageChanged_When_ButtonClicked_Wpf()
{
    var button = App.ElementCreateService.CreateByName<Button>("E Button");

    button.Click();

    var label = App.ElementCreateService.CreateByName<Button>("ebuttonClicked");
    Assert.AreEqual("ebuttonClicked", label.InnerText);
}
```
As mentioned above you can override the app behaviour for a particular test. The global behaviour for all tests in the class is to reuse the app instance. Only for this particular test, BELLATRIX opens it and restarts it only on fail.

