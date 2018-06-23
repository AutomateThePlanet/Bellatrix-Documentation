---
layout: default
title:  "Execute Tests in SauceLabs"
feature-title: "Web Automation"
excerpt: "Learn to use Bellatrix to execute web tests in SauceLabs."
date:   2018-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/execute-tests-saucelabs/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```
[TestClass]
[SauceLabs(BrowserType.Chrome,
    "62",
    "Windows",
    BrowserBehavior.ReuseIfStarted,
    recordScreenshots: true,
    recordVideo: true)]
public class SauceLabsTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");

        promotionsLink.Click();
    }

    [TestMethod]
    [SauceLabs(BrowserType.Chrome, "62", "Windows", DesktopWindowSize._1280_1024, BrowserBehavior.ReuseIfStarted)]
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
```
[SauceLabs(BrowserType.Chrome,
    "62",
    "Windows",
    BrowserBehavior.ReuseIfStarted,
    recordScreenshots: true,
    recordVideo: true)]
```
To execute Bellatrix tests in SauceLabs cloud you should use the SauceLabs attribute instead of Browser. SauceLabs has the same parameters as Browser but adds to additional ones- browser version, platform type, recordVideo and recordScreenshots. As with the Browser attribute you can override the class behavior on Test level.
```
[TestMethod]
[SauceLabs(BrowserType.Chrome, "62", "Windows", DesktopWindowSize._1280_1024, BrowserBehavior.ReuseIfStarted)]
public void BlogPageOpened_When_PromotionsButtonClicked()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

    var blogLink = App.ElementCreateService.CreateByLinkText<Anchor>("Blog");

    blogLink.Click();
}
```
As mentioned if you use the SauceLabs attribute on method level it overrides the class settings.
```
[SauceLabs(BrowserType.Chrome, "62", "Windows", 1000, 500, BrowserBehavior.ReuseIfStarted)]
```
```
[SauceLabs(BrowserType.Chrome, "62", "Windows", MobileWindowSize._320_568, BrowserBehavior.ReuseIfStarted)]
```
```
[SauceLabs(BrowserType.Chrome, "62", "Windows", TabletWindowSize._600_1024, BrowserBehavior.ReuseIfStarted)]
```
As you can see with the SauceLabs attribute we can change the browser window size again.

Configuration
-------------
```
"sauceLabs": {
    "pageLoadTimeout": "30",
    "scriptTimeout": "1",
    "artificialDelayBeforeAction": "0",
    "gridUri":  "http://ondemand.saucelabs.com:80/wd/hub",
    "user": "aangelov",
    "key":  "mySecretKey"
}
```
You can find a dedicated section about SauceLabs in **testFrameworkSettings.json** file under the **webSettings** section. There you can set the grid URL, credentials and set some additional timeouts.