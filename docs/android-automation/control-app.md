---
layout: default
title:  "Control App"
excerpt: "Learn how to control Android applications with BELLATRIX Android module."
date:   2018-10-20 06:50:17 +0200
parent: android-automation
permalink: /android-automation/control-app/
anchors:
  overview: Overview
  explanations: Explanations
---
Overview
--------

This is how one BELLATRIX test class looks like.
```csharp
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.Controls1",
    AppBehavior.ReuseIfStarted)]
public class BellatrixAppBehaviourTests : AndroidTest
{
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        App.AppService.StartActivity(Constants.AndroidNativeAppAppExamplePackage, ".view.Controls1");

        var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

        button.Click();
    }

    [TestMethod]
    [Android(Constants.AndroidNativeAppPath,
        Constants.AndroidDefaultAndroidVersion,
        Constants.AndroidDefaultDeviceName,
        Constants.AndroidNativeAppAppExamplePackage,
        ".view.Controls1",
        AppBehavior.RestartOnFail)]
    public void ReturnsSave_When_GetText()
    {
        var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

        Assert.AreEqual("Save", button.GetText());
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
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.Controls1",
    AppBehavior.ReuseIfStarted)]
```
This is the attribute for automatic start/control of Android apps by BELLATRIX. If you have to do it manually properly, you will need thousands of lines of code.
**appPath**- sets the path where your application APK is.
**AppBehavior** enum controls when the app is started and stopped. This can drastically increase or decrease the tests execution time, depending on your needs.
However you need to be careful because in case of tests failures the app may need to be restarted.
**Available options:**

- **RestartEveryTime**- for each test a separate WebDriver instance is created and the previous app instance is
- **RestartOnFail**- the app is only restarted if the previous test failed. Alternatively, if the previous test's app was different.
- **ReuseIfStarted**- the app is only restarted if the previous test's app was different. In all other cases, the app is reused if possible.

**Note**: However, use this option with caution since in some rare cases if you have not properly setup your tests you may need to restart the app if the test fails otherwise all other tests may fail too.

There are even more things you can do with this attribute, but we look into them in the next sections.

```csharp
public class BellatrixAppBehaviourTests : AndroidTest
```
All Android BELLATRIX test classes should inherit from the AndroidTest base class. This way you can use all built-in BELLATRIX tools and functionalities.
```csharp
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.Controls1",
    AppBehavior.ReuseIfStarted)]
public class BellatrixAppBehaviourTests : AndroidTest
```
If you place attribute over the class all tests inherit the behaviour. It is possible to place it over each test and this way it overrides the class behaviour only for this particular test.
```csharp
[TestMethod]
public void ButtonClicked_When_CallClickMethod()
```
All MSTest tests should be marked with the TestMethod attribute.
```csharp
var button = App.ElementCreateService.CreateByIdContaining<Button>("button");
```
Use the element creation service to create an instance of the button. There are much more details about this process in the next sections.
```csharp
[TestMethod]
[Android(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    Constants.AndroidNativeAppAppExamplePackage,
    ".view.Controls1",
    AppBehavior.RestartOnFail)]
public void ReturnsSave_When_GetText()
{
    var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

    Assert.AreEqual("Save", button.GetText());
}
```
As mentioned above you can override the app behaviour for a particular test. The global behaviour for all tests in the class is to reuse an instance of the app. Only for this particular test, BELLATRIX opens the app and restarts it only on fail.
