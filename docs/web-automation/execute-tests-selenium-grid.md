---
layout: default
title:  "Execute Tests in Selenium Grid"
excerpt: "Learn to use BELLATRIX to execute tests in Selenium Grid."
date:   2018-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/execute-tests-selenium-grid/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
[Remote(BrowserType.Chrome, "62", PlatformType.Windows, BrowserBehavior.ReuseIfStarted)]
public class SeleniumGridTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");

        promotionsLink.Click();
    }

    [TestMethod]
    [Remote(BrowserType.Chrome, "62", PlatformType.Windows, DesktopWindowSize._1280_1024, BrowserBehavior.ReuseIfStarted)]
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
[Remote(BrowserType.Chrome, "62", PlatformType.Windows, BrowserBehavior.ReuseIfStarted)]
```
To use BELLATRIX with Selenium Grid, you should use the Remote attribute instead of Browser. Remote has the same parameters as Browser but adds to additional ones- browser version and platform type. As with the Browser attribute you can override the class behavior on Test level.
```csharp
[TestMethod]
[Remote(BrowserType.Chrome, "62", PlatformType.Windows, DesktopWindowSize._1280_1024, BrowserBehavior.ReuseIfStarted)]
public void BlogPageOpened_When_PromotionsButtonClicked()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

    var blogLink = App.ElementCreateService.CreateByLinkText<Anchor>("Blog");

    blogLink.Click();
}
```
As mentioned if you use the Remote attribute on method level it overrides the class settings.
```csharp
[Remote(BrowserType.Chrome, "62", PlatformType.Windows, 1000, 500, BrowserBehavior.ReuseIfStarted)]
```
```csharp
[Remote(BrowserType.Chrome, "62", PlatformType.Windows, MobileWindowSize._320_568, BrowserBehavior.ReuseIfStarted)]
```
```csharp
[Remote(BrowserType.Chrome, "62", PlatformType.Windows, TabletWindowSize._600_1024, BrowserBehavior.ReuseIfStarted)]
```
As you can see with the Remote attribute we can change the browser window size again.

Configuration
-------------
```json
"remote": {
     "pageLoadTimeout": "30",
     "scriptTimeout": "1",
     "artificialDelayBeforeAction": "0",
     "gridUri":  "http://127.0.0.1:4444/wd/hub"
}
```
You can find a dedicated section about Selenium grid in **testFrameworkSettings.json** file under the **webSettings** section. There you can set the grid URL and set some additional timeouts.