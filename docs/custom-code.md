---
layout: default
title:  "Custom Code"
excerpt: "All You Need to Write Maintainable Regression Tests"
date:   2018-02-20 06:50:17 +0200
permalink: /overview/
anchors:
  bellatrix-test-automation-framework : Bellatrix Test Automation Framework 
  meissa-test-runner: Meissa Test Runner
---
Bellatrix Test Automation Framework 
---------------------------------------------------------
Bellatrix Full-page Screenshots
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
}
```

Bellatrix Video Recording
```csharp
[TestClass]
[VideoRecording(VideoRecordingMode.OnlyFail)]
[Browser(BrowserType.Chrome, BrowserBehavior.ReuseIfStarted)]
public class VideoRecordingTests : WebTest
{
    [TestMethod]
    public void PromotionsPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        var promotionsLink = App.ElementCreateService.CreateByLinkText<Anchor>("Promotions");
        promotionsLink.Click();
    }
}
```
