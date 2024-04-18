---
layout: default
title:  "Execute Tests in Selenium Grid"
excerpt: "Learn to use BELLATRIX to execute tests in Selenium Grid."
date:   2021-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/execute-tests-selenium-grid/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
  playwright: Playwright
---
Example
-------
```csharp
[TestFixture]
[Remote(BrowserType.Chrome, "62", PlatformType.Windows, Lifecycle.ReuseIfStarted)]
public class SeleniumGridTests : WebTest
{
    [Test]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        var promotionsLink = App.Components.CreateByLinkText<Anchor>("Promotions");

        promotionsLink.Click();
    }

    [Test]
    [Remote(BrowserType.Chrome, "62", PlatformType.Windows, DesktopWindowSize._1280_1024, Lifecycle.ReuseIfStarted)]
    public void BlogPageOpened_When_PromotionsButtonClicked()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        var blogLink = App.Components.CreateByLinkText<Anchor>("Blog");

        blogLink.Click();
    }
}
```

Explanations
------------
```csharp
[Remote(BrowserType.Chrome, "62", PlatformType.Windows, Lifecycle.ReuseIfStarted)]
```
To use BELLATRIX with Selenium Grid, you should use the Remote attribute instead of Browser. Remote has the same parameters as Browser but adds some additional ones; browser version and platform type. As with the Browser attribute you can override the class behavior on Test level.
```csharp
[Test]
[Remote(BrowserType.Chrome, "62", PlatformType.Windows, DesktopWindowSize._1280_1024, Lifecycle.ReuseIfStarted)]
public void BlogPageOpened_When_PromotionsButtonClicked()
{
    App.Navigation.Navigate("http://demos.bellatrix.solutions/");

    var blogLink = App.Components.CreateByLinkText<Anchor>("Blog");

    blogLink.Click();
}
```
As mentioned if you use the Remote attribute on method level it overrides the class settings.
```csharp
[Remote(BrowserType.Chrome, "62", PlatformType.Windows, 1000, 500, Lifecycle.ReuseIfStarted)]
```
```csharp
[Remote(BrowserType.Chrome, "62", PlatformType.Windows, MobileWindowSize._320_568, Lifecycle.ReuseIfStarted)]
```
```csharp
[Remote(BrowserType.Chrome, "62", PlatformType.Windows, TabletWindowSize._600_1024, Lifecycle.ReuseIfStarted)]
```
As you can see with the Remote attribute we can change the browser window size again.

Configuration
-------------
If you don't use the attribute, the default configuration under the executionSettings section will be used. Also, you can add additional driver arguments under the arguments section array in the configuration file.
```json
"executionSettings": {
  "executionType": "regular",
  "defaultBrowser": "chrome",
  "defaultLifeCycle": "restart every time",
  "resolution": "1920x1080",
  "browserVersion": "91",
  "url": "http://127.0.0.1:4444/wd/hub",
    "arguments": [
    {
        "name": "{runName}",
        "platform": "Windows",
        "version": "86",
        "recordVideo": "true",
        "recordScreenshots": "true",
        "screenResolution": "1920x1080x24",
        "username": "yourUserName",
        "accessKey": "accessKey"
    }
   ]
}
```
Check out the Azure Key Vault integration for information on safely storing secrets such as usernames and passwords. [**Learn more**](/product-integrations/azure-key-vault/)

Playwright
-------------
Playwright supports only Chrome for Selenium Grid execution. Also, in the **ExecuteAttribute**, you cannot add **PlatformType**.