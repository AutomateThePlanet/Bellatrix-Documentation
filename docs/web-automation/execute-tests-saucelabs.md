---
layout: default
title:  "Execute Tests in SauceLabs"
excerpt: "Learn to use BELLATRIX to execute web tests in SauceLabs."
date:   2021-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/execute-tests-saucelabs/
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
[SauceLabs(BrowserType.Chrome,
    "62",
    "Windows",
    Lifecycle.ReuseIfStarted,
    recordScreenshots: true,
    recordVideo: true)]
public class SauceLabsTests : WebTest
{
    [Test]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        var promotionsLink = App.Components.CreateByLinkText<Anchor>("Promotions");

        promotionsLink.Click();
    }

    [Test]
    [SauceLabs(BrowserType.Chrome, "62", "Windows", DesktopWindowSize._1280_1024, Lifecycle.ReuseIfStarted)]
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
[SauceLabs(BrowserType.Chrome,
    "62",
    "Windows",
    Lifecycle.ReuseIfStarted,
    recordScreenshots: true,
    recordVideo: true)]
```
To execute BELLATRIX tests in SauceLabs cloud you should use the SauceLabs attribute instead of Browser. SauceLabs has the same parameters as Browser but adds some additional ones; browser version, platform type, recordVideo and recordScreenshots. As with the Browser attribute you can override the class behavior at the Test level.
```csharp
[Test]
[SauceLabs(BrowserType.Chrome, "62", "Windows", DesktopWindowSize._1280_1024, Lifecycle.ReuseIfStarted)]
public void BlogPageOpened_When_PromotionsButtonClicked()
{
    App.Navigation.Navigate("http://demos.bellatrix.solutions/");

    var blogLink = App.Components.CreateByLinkText<Anchor>("Blog");

    blogLink.Click();
}
```
As mentioned if you use the SauceLabs attribute on method level it overrides the class settings.
```csharp
[SauceLabs(BrowserType.Chrome, "62", "Windows", 1000, 500, Lifecycle.ReuseIfStarted)]
```
```csharp
[SauceLabs(BrowserType.Chrome, "62", "Windows", MobileWindowSize._320_568, Lifecycle.ReuseIfStarted)]
```
```csharp
[SauceLabs(BrowserType.Chrome, "62", "Windows", TabletWindowSize._600_1024, Lifecycle.ReuseIfStarted)]
```
As you can see with the SauceLabs attribute we can change the browser window size again.

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
Currently, Bellatrix.Playwright does not support running tests in SauceLabs.