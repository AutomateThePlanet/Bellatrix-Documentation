---
layout: default
title:  "Control App"
excerpt: "Learn how to control iOS applications with BELLATRIX iOS module."
date:   2021-10-20 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/control-app/
anchors:
  overview: Overview
  explanations: Explanations
  configuration: Configuration
---
Overview
--------

This is how one BELLATRIX test class looks like.
```csharp
[TestClass]
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.ReuseIfStarted)]
public class BellatrixAppBehaviourTests : IOSTest
{
    [TestMethod]
    public void ButtonClicked_When_CallClickMethod()
    {
        var button = App.Components.CreateByName<Button>("ComputeSumButton");

        button.Click();
    }

    [TestMethod]
    [IOS(Constants.IOSNativeAppPath,
        Constants.IOSDefaultVersion,
        Constants.IOSDefaultDeviceName,
        Lifecycle.RestartOnFail)]
    public void ReturnsTrue_When_CallButtonIsPresent()
    {
        var button = App.Components.CreateByName<Button>("ComputeSumButton");

        Assert.IsTrue(button.IsPresent);
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
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.ReuseIfStarted)]
```
This is the attribute for automatic start/control of iOS apps by BELLATRIX. If you have to do it manually properly, you will need thousands of lines of code.
**appPath**- sets the path where your app file is.
**Lifecycle** enum controls when the app is started and stopped. This can drastically increase or decrease the tests execution time, depending on your needs.
However you need to be careful because in case of tests failures the app may need to be restarted.
**Available options:**

- **RestartEveryTime**- for each test a separate WebDriver instance is created and the previous app instance is
- **RestartOnFail**- the app is only restarted if the previous test failed. Alternatively, if the previous test's app was different.
- **ReuseIfStarted**- the app is only restarted if the previous test's app was different. In all other cases, the app is reused if possible.

**Note**: However, use this option with caution since in some rare cases if you have not properly setup your tests you may need to restart the app if the test fails otherwise all other tests may fail too.

There are even more things you can do with this attribute, but we look into them in the next sections.

```csharp
public class BellatrixAppBehaviourTests : IOSTest
```
All iOS BELLATRIX test classes should inherit from the **IOSTest** base class. This way you can use all built-in BELLATRIX tools and functionalities.
```csharp
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.ReuseIfStarted)]
public class BellatrixAppBehaviourTests : IOSTest
```
If you place attribute over the class all tests inherit the behaviour. It is possible to place it over each test and this way it overrides the class behaviour only for this particular test.
```csharp
[TestMethod]
public void ButtonClicked_When_CallClickMethod()
```
All MSTest tests should be marked with the **TestMethod** attribute.
```csharp
var button = App.Components.CreateByName<Button>("ComputeSumButton");
```
Use the element creation service to create an instance of the button. There are much more details about this process in the next sections.
```csharp
[IOS(Constants.IOSNativeAppPath,
    Constants.IOSDefaultVersion,
    Constants.IOSDefaultDeviceName,
    Lifecycle.RestartOnFail)]
public void ReturnsTrue_When_CallButtonIsPresent()
{
    var button = App.Components.CreateByName<Button>("ComputeSumButton");

    Assert.IsTrue(button.IsPresent);
}
```
As mentioned above you can override the app behaviour for a particular test. The global behaviour for all tests in the class is to reuse an instance of the app. Only for this particular test, BELLATRIX opens the app and restarts it only on fail.

Configuration
------------
If you don't use the attribute, the default information from the configuration will be used placed under the executionSettings section. Also, you can add additional driver arguments under the arguments section array in the configuration file.
```json
"executionSettings": {
  "defaultLifeCycle": "restart every time",
  "shouldStartLocalService": "false",
  "url": "http://127.0.0.1:4722/wd/hub",
  "arguments": [
    {
      "platformName": "iOS",
      "browserName": "",
      "platformVersion": "11.3",
      "deviceName": "iPhone 6",
      "app": "com.apple.mobilecal"
    }
  ]
}
```