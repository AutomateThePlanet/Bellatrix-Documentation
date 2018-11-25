---
layout: default
title:  "BrowserService"
excerpt: "Learn how to use BELLATRIX BrowserService."
date:   2018-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/browser-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[Browser(BrowserType.Chrome, BrowserBehavior.RestartEveryTime)]
public class BrowserServiceTests : WebTest
{
    [TestMethod]
    public void GetCurrentUri()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        Debug.WriteLine(App.BrowserService.Url);
    }

    [TestMethod]
    public void ControlBrowser()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        App.BrowserService.Maximize();

        App.BrowserService.Back();

        App.BrowserService.Forward();

        App.BrowserService.Refresh();
    }

    [TestMethod]
    public void GetTabTitle()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        Assert.AreEqual("BELLATRIX .NET test automation framework", App.BrowserService.Title);
    }

    [TestMethod]
    public void PrintCurrentPageHtml()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        Debug.WriteLine(App.BrowserService.HtmlSource);
    }

    [TestMethod]
    [Ignore]
    public void SwitchToFrame()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        var frame = App.ElementCreateService.CreateById<Frame>("myFrameId");
        App.BrowserService.SwitchToFrame(frame);

        var myButton = frame.CreateById<Button>("purchaseBtnId");

        myButton.Click();

        App.BrowserService.SwitchToDefault();
    }
}
```

Explanations
------------
BELLATRIX gives you an interface to most common operations for controlling the started browser through the **BrowserService** class.
```csharp
App.BrowserService.WaitUntilReady();
```
Sometimes, some AJAX async calls are not caught natively by WebDriver. So you can use the BELLATRIX browser service's method. **WaitUntilReady** which waits for these calls automatically to finish. Keep in mind that usually this is not necessary since BELLATRIX has a complex built-in mechanism for handling element waits.
```csharp
Debug.WriteLine(App.BrowserService.Url);
```
Get the current tab URL.
```csharp
App.BrowserService.Maximize();
```
Maximizes the browser.
```csharp
App.BrowserService.Back();
```
Simulates clicking the browser's Back button.
```csharp
App.BrowserService.Forward();
```
Simulates clicking the browser's Forward button.
```csharp
App.BrowserService.Refresh();
```
Simulates clicking the browser's Refresh button.
```csharp
Assert.AreEqual("BELLATRIX .NET test automation framework", App.BrowserService.Title);
```
Get the current tab Title.
```csharp
Debug.WriteLine(App.BrowserService.HtmlSource);
```
Get the current page HTML.
```csharp
var frame = App.ElementCreateService.CreateById<Frame>("myFrameId");
App.BrowserService.SwitchToFrame(frame);
var myButton = frame.CreateById<Button>("purchaseBtnId");
```
To work with elements inside a frame, you should switch to it first. Search for the button inside the frame element. Of course, once you switched to frame, you can create the element through ElementCreateService too.
```csharp
App.BrowserService.SwitchToDefault();
```
To continue searching in the whole page, you need to switch to default again. It is the same process of how you work with WebDriver.