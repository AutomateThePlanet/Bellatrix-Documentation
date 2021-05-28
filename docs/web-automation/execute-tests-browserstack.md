---
layout: default
title:  "Execute Tests in BrowserStack"
excerpt: "Learn to use BELLATRIX to execute web tests in BrowserStack."
date:   2021-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/execute-tests-browserstack/
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
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var promotionsLink = App.Components.CreateByLinkText<Anchor>("Promotions");

        promotionsLink.Click();
    }

    [TestMethod]
    [BrowserStack(BrowserType.Chrome, "62", "Windows", "10", DesktopWindowSize._1280_1024, Lifecycle.ReuseIfStarted)]
    public void BlogPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var blogLink = App.Components.CreateByLinkText<Anchor>("Blog");

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

    var blogLink = App.Components.CreateByLinkText<Anchor>("Blog");

    blogLink.Click();
}
```
As mentioned if you use the BrowserStack attribute on method level it overrides the class settings.
```csharp
[BrowserStack(BrowserType.Chrome, "62", "Windows", "10", 1000, 500, Lifecycle.ReuseIfStarted)]
```
```
[BrowserStack(BrowserType.Chrome, "62", "Windows", "10", MobileWindowSize._320_568, Lifecycle.ReuseIfStarted)]
```
```
[BrowserStack(BrowserType.Chrome, "62", "Windows", "10", TabletWindowSize._600_1024, Lifecycle.ReuseIfStarted)]
```
As you can see with the BrowserStack attribute we can change the browser window size again.

Configuration
-------------
If you don't use the attribute, the default information from the configuration will be used placed under the executionSettings section. Also, you can add additional driver arguments under the arguments section array in the configuration file.
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
        "os": "Windows",
        "os_version": "10",
        "browser": "Chrome",
        "browser_version": "86",
        "browserstack.debug": "true",
        "browserstack.video": "true",
        "browserstack.networkLogs": "true",
        "browserstack.console": "true",
        "browserstack.user": "yourUserName",
        "browserstack.key": "accessKey"
      }
    ]
}
```
Check out the Azure Key Vault integration for information on safely storing secrets such as usernames and passwords. [**Learn more**](/product-integrations/azure-key-vault/)