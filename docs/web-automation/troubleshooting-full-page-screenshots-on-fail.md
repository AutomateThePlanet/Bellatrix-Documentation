---
layout: default
title:  "Troubleshooting- Full Page Screenshots on Fail"
excerpt: "Learn how to generate full page screenshots on test's fail."
date:   2018-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/troubleshooting-full-page-screenshots-on-fail/
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
[Browser(BrowserType.Chrome, BrowserBehavior.ReuseIfStarted)]
public class FullPageScreenshotsOnFailTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");
        promotionsLink.Click();
    }

    [TestMethod]
    [ScreenshotOnFail(false)]
    public void BlogPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var blogLink = App.ElementCreateService.CreateByLinkText<Anchor>("Blog");

        blogLink.Click();
    }
}
```

Explanations
------------
```csharp
[ScreenshotOnFail(true)]
```
his is the attribute for automatic generation of full-page screenshots by BELLATRIX. The engine checks after each test, its result, if failed, makes the screenshots. We have a unique engine for the screenshots. We do not use vanilla WebDriver. If you use the WebDriver method, it makes a screenshot only of the visible part of the page. If you have to do it manually precisely, you need thousands of lines of code.
If you place attribute over the class all tests inherit the behaviour. It is possible to put it over each test and this way you override the class behaviour only for this particular test.
```csharp
[TestMethod]
[ScreenshotOnFail(false)]
public void BlogPageOpened_When_PromotionsButtonClicked()
```
As mentioned above we can override the screenshot behaviour for a particular test. The global behaviour for all tests in the class is to make screenshots on fail. Only for this particular test, we tell BELLATRIX not to make screenshots.

Configuration
-------------
If you open the **testFrameworkSettings.json** file, you find the **screenshotsSettings** section that controls this behaviour.
```json
"screenshotsSettings": {
    "isEnabled": "true",
    "filePath": "C:\\Troubleshooting\\Screenshots"
}
```
You can turn off the making of screenshots for all tests and specify where the screenshots to be saved. In the extensibility chapters read more about how you can create different screenshots engine or change the saving strategy.