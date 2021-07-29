---
layout: default
title:  "Troubleshooting- Full Page Screenshots on Fail"
excerpt: "Learn how to generate full page screenshots on test's fail."
date:   2021-06-22 06:50:17 +0200
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
[TestFixture]
public class FullPageScreenshotsOnFailTests : WebTest
{
    [Test]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");
        var promotionsLink = App.Components.CreateByLinkText<Anchor>("Promotions");
        promotionsLink.Click();
    }
}
```

Explanations
------------
The engine checks after each test its result, if failed, it takes the screenshots. We have a unique engine for screenshots. We do not use vanilla WebDriver. If you use the WebDriver method, it makes a screenshot only of the visible part of the page. If you have to do it precisely by yourself, you need thousands of lines of code.

Configuration
-------------
If you open the **testFrameworkSettings.json** file, you find the **screenshotsSettings** section that controls this behaviour.
```json
"screenshotsSettings": {
    "isEnabled": "true",
    "filePath": "C:\\Troubleshooting\\Screenshots"
}
```
You can turn off the taking of screenshots for all tests and specify where the screenshots are to be saved. In the extensibility chapters read more about how you can create a different screenshots engine or change the saving strategy.