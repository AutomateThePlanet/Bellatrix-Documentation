---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------
iOS
ACCELERATE TEST CREATION


BELLATRIX Web

```csharp
[TestClass]
[Browser(BrowserType.Firefox, BrowserBehavior.ReuseIfStarted)]
[ExecutionTimeUnder(2)]
public class BellatrixBrowserBehaviourTests : WebTest
{
    [TestMethod]
    [Browser(BrowserType.Chrome, BrowserBehavior.RestartOnFail)]
    public void BlogPageOpened_When_PromotionsButtonClicked()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        var blogLink = App.ElementCreateService.CreateByLinkText<Anchor>("Blog");
        blogLink.EnsureIsVisible();
        
        blogLink.Click();
    }
}
```

BELLATRIX Desktop

```csharp
[TestClass]
[App(Constants.WpfAppPath, AppBehavior.RestartEveryTime)]
[ExecutionTimeUnder(2)]
public class ControlAppTests : DesktopTest
{
    [TestMethod]
    public void MessageChanged_When_ButtonHovered_Wpf()
    {
        var button = App.ElementCreateService.CreateByName<Button>("LoginButton");
        button.Hover();
        var label = App.ElementCreateService.CreateByName<Button>("successLabel");
        label.EnsureInnerTextIs("Sucess");
    }
}
```

BELLATRIX API

```csharp
[TestClass]
[ExecutionTimeUnder(2)]
public class CreateSimpleRequestTests : APITest
{
    [TestMethod]
    public void GetAlbumById()
    {
        var request = new RestRequest("api/Albums/10");        
        var client = App.GetApiClientService();
        
        var response = client.Get<Albums>(request);
        response.AssertContentContains("Audioslave");
    }
}
```

Cloud Readiness


```csharp
[TestClass]
[SauceLabs(BrowserType.Chrome, "62", "Windows", BrowserBehavior.ReuseIfStarted, recordScreenshots: true, recordVideo: true)]
public class SauceLabsTests : WebTest
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


2

```csharp
[BrowserStack(BrowserType.Chrome,
    "62",
    "Windows",
    "10",
    BrowserBehavior.ReuseIfStarted,
    captureNetworkLogs: true,
    captureVideo: true,
    consoleLogType: BrowserStackConsoleLogType.Verbose,
    debug: true,
    build: "myUniqueBuildName")]
```

Troubleshooting Easiness
BELLATRIX Full-page Screenshots

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
BELLATRIX Video Recording

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

Override Actions Globally
```csharp
[TestClass]
[Browser(BrowserType.Firefox, BrowserBehavior.RestartEveryTime)]
public class OverrideGloballyElementActionsTests : WebTest
{
    public override void TestsArrange()
    {
        Button.OverrideClickGlobally = (e) =>
        {
            e.ToExists().ToBeClickable().WaitToBe();
            App.JavaScriptService.Execute("arguments[0].click();", e);
        };
        Anchor.OverrideFocusGlobally = CustomFocus;
    }
    private void CustomFocus(Anchor anchor)
    {
        App.JavaScriptService.Execute("window.focus();");
        App.JavaScriptService.Execute("arguments[0].focus();", anchor);
    }
    [TestMethod]
    public void PurchaseRocketWithGloballyOverridenMethods()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");
        Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");     
        Anchor addToCartFalcon9 = 
        App.ElementCreateService.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
        Span totalSpan = App.ElementCreateService.CreateByXpath<Span>("//*[@class='order-total']//span");
        sortDropDown.SelectByText("Sort by price: low to high");
        addToCartFalcon9.Focus();
        addToCartFalcon9.Click();
        totalSpan.EnsureInnerTextIs("95.00€", 15000);
    }
}
```

Override Actions Locally
```csharp
Button.OverrideClickLocally = (e) =>
{
    e.ToExists().ToBeClickable().WaitToBe();
    App.JavaScriptService.Execute("arguments[0].click();", e);
};
```

Extensibility through Events
```csharp
public class DebugLoggingButtonEventHandlers : ButtonEventHandlers
{
    protected override void ClickingEventHandler(object sender, ElementActionEventArgs arg)
    {
        DebugLogger.LogInfo($"Before clicking button. Coordinates: X={arg.Element.WrappedElement.Location.X} Y={arg.Element.WrappedElement.Location.Y}");
    }
    protected override void HoveringEventHandler(object sender, ElementActionEventArgs arg)
    {
        DebugLogger.LogInfo($"Before hovering button. Coordinates: X={arg.Element.WrappedElement.Location.X} Y={arg.Element.WrappedElement.Location.Y}");
    }
}
[TestClass]
[Browser(BrowserType.Chrome, BrowserBehavior.RestartEveryTime)]
public class ElementActionHooksTests : WebTest
{
    public override void TestsArrange()
    {
        App.AddElementEventHandler<DebugLoggingButtonEventHandlers>();
    }
    [TestMethod]
    public void PurchaseRocketWithGloballyOverridenMethods()
    {
        // some test logic
    }
}
```