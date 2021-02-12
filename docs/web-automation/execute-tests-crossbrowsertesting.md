---
layout: default
title:  "Execute Tests in CrossBrowserTesting"
excerpt: "Learn to use BELLATRIX to execute web tests in CrossBrowserTesting."
date:   2018-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/execute-tests-crossbrowsertesting/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestClass]
[BrowserStack(BrowserType.Chrome,
    "62",
    "Windows",
    "10",
    Lifecycle.ReuseIfStarted,
    captureNetworkLogs: true,
    captureVideo: true,
    consoleLogType: BrowserStackConsoleLogType.Verbose,
    debug: true,
    build: "myUniqueBuildName")]
public class BrowserStackTests : WebTest
{
    [TestMethod]
    [Ignore]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");

        promotionsLink.Click();
    }

    [TestMethod]
    [Ignore]
    [BrowserStack(BrowserType.Chrome, "62", "Windows", "10", DesktopWindowSize._1280_1024, Lifecycle.ReuseIfStarted)]
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
[BrowserStack(BrowserType.Chrome,
    "62",
    "Windows",
    "10",
    Lifecycle.ReuseIfStarted,
    captureNetworkLogs: true,
    captureVideo: true,
    consoleLogType: BrowserStackConsoleLogType.Verbose,
    debug: true,
    build: "myUniqueBuildName")]
```
To execute BELLATRIX tests in BrowserStack cloud, you should use the BrowserStack attribute instead of Browser. BrowserStack has the same parameters as Browser but adds to additional ones- browser version, platform type, platform version, captureNetworkLogs, consoleLogType, build and debug. The last five are optional and have default values. As with the Browser attribute you can override the class behaviour on Test level.
```csharp
[TestMethod]
[BrowserStack(BrowserType.Chrome, "62", "Windows", "10", DesktopWindowSize._1280_1024, Lifecycle.ReuseIfStarted)]
public void BlogPageOpened_When_PromotionsButtonClicked()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

    var blogLink = App.ElementCreateService.CreateByLinkText<Anchor>("Blog");

    blogLink.Click();
}
```
As mentioned if you use the BrowserStack attribute on method level it overrides the class settings.
```csharp
[BrowserStack(BrowserType.Chrome, "62", "Windows", "10", 1000, 500, Lifecycle.ReuseIfStarted)]
```
```csharp
[BrowserStack(BrowserType.Chrome, "62", "Windows", "10", MobileWindowSize._320_568, Lifecycle.ReuseIfStarted)]
```
```csharp
[BrowserStack(BrowserType.Chrome, "62", "Windows", "10", TabletWindowSize._600_1024, Lifecycle.ReuseIfStarted)]
```
As you can see with the BrowserStack attribute we can change the browser window size again.

Configuration
-------------
```json
"browserStack": {
	"pageLoadTimeout": "30",
	"scriptTimeout": "1",
	"artificialDelayBeforeAction": "0",
	"gridUri":  "http://hub-cloud.browserstack.com/wd/hub/",
	"user": "soioa1",
	"key":  "pnFG3Ky2yLZ5muB1p46P"
}
```
You can find a dedicated section about SauceLabs in **testFrameworkSettings.json** file under the **webSettings** section. There you can set the grid URL, credentials and set some additional timeouts.