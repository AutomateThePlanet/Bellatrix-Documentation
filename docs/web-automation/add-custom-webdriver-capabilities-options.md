---
layout: default
title:  "Add Custom WebDriver Capabilities and Options"
excerpt: "Learn how to add custom WebDriver capabilities and/or options."
date:   2018-02-20 06:50:17 +0200
parent: web-automation
permalink: /web-automation/add-custom-webdriver-capabilities-options/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[SauceLabs(BrowserType.Firefox,
    "50",
    "Windows",
    Lifecycle.ReuseIfStarted,
    recordScreenshots: true,
    recordVideo: true)]
public class CustomWebDriverCapabilitiesTests : WebTest
{
    public override void TestsArrange()
    {
        var firefoxOptions = new FirefoxOptions
        {
            AcceptInsecureCertificates = true,
            UnhandledPromptBehavior = UnhandledPromptBehavior.Accept,
            PageLoadStrategy = PageLoadStrategy.Eager,
        };

        App.AddWebDriverOptions(firefoxOptions);

        App.AddAdditionalCapability("disable-popup-blocking", true);

        var profileManager = new FirefoxProfileManager();
        FirefoxProfile profile = profileManager.GetProfile("BELLATRIX");

        App.AddWebDriverBrowserProfile(profile);
    }

    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");

        promotionsLink.Click();
    }
}
```

Explanations
------------
```csharp
var firefoxOptions = new FirefoxOptions
{
    AcceptInsecureCertificates = true,
    UnhandledPromptBehavior = UnhandledPromptBehavior.Accept,
    PageLoadStrategy = PageLoadStrategy.Eager,
};

App.AddWebDriverOptions(firefoxOptions);
```
BELLATRIX hides the complexity of initialisation of WebDriver and all related services. In some cases, you need to customise the set up of a browser with using WebDriver options, adding driver capabilities or using browser profile. Using the **App** service methods you can add all of these with ease. Make sure to call them in the **TestsArrange** which is called before the execution of the tests placed in the test class. These options are used only for the tests in this particular class.

**Note**: *You can use all of these methods no matter which attributes you use- Browser, Remote, SauceLabs, BrowserStack or CrossBrowserTesting.*
```csharp
App.AddAdditionalCapability("disable-popup-blocking", true);
```
Add custom WebDriver capability.
```csharp
var profileManager = new FirefoxProfileManager();
FirefoxProfile profile = profileManager.GetProfile("BELLATRIX");

App.AddWebDriverBrowserProfile(profile);
```
Add an existing Firefox profile. You may want to test your application in together with some specific browser extension.