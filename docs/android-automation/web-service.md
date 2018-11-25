---
layout: default
title:  "WebService"
excerpt: "Learn how to use BELLATRIX Android WebService."
date:   2018-10-22 06:50:17 +0200
parent: android-automation
permalink: /android-automation/web-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[AndroidWeb(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    AppBehavior.RestartEveryTime)]
public class WebServiceTests : AndroidTest
{
    [TestMethod]
    public void HtmlSourceContainsShop_When_OpenWebPageWithChrome()
    {
        App.Web.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        Assert.IsTrue(App.Web.BrowserService.HtmlSource.Contains("Shop"));
    }
}
```

Explanations
------------
BELLATRIX gives you an interface for easier work with web apps. Using it, you can access most of the features
of BELLATRIX web APIs.
```csharp
[TestClass]
[AndroidWeb(Constants.AndroidNativeAppPath,
    Constants.AndroidDefaultAndroidVersion,
    Constants.AndroidDefaultDeviceName,
    AppBehavior.RestartEveryTime)]
public class WebServiceTests : AndroidTest
```
To test web apps, you can start Chrome browser using the AndroidWeb attribute.
```csharp
App.Web.NavigationService.Navigate("http://demos.bellatrix.solutions/");
```
Opens Chrome browser and navigates to the mentioned page.
```csharp
Assert.IsTrue(App.Web.BrowserService.HtmlSource.Contains("Shop"));
```
Through **Web** property you can access almost all BELLATRIX Web APIs.