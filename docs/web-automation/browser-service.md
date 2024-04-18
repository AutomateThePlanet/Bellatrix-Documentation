---
layout: default
title:  "BrowserService"
excerpt: "Learn how to use BELLATRIX BrowserService."
date:   2021-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/browser-service/
anchors:
  example: Example
  explanations: Explanations
  playwright: Playwright
---
Example
-------
```csharp
[TestFixture]
public class BrowserServiceTests : WebTest
{
    [Test]
    public void GetCurrentUri()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        Debug.WriteLine(App.Browser.Url);
    }

    [Test]
    public void ControlBrowser()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        App.Browser.Maximize();

        App.Browser.Back();

        App.Browser.Forward();

        App.Browser.Refresh();
    }

    [Test]
    public void GetTabTitle()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        Assert.AreEqual("BELLATRIX .NET test automation framework", App.Browser.Title);
    }

    [Test]
    public void PrintCurrentPageHtml()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        Debug.WriteLine(App.Browser.HtmlSource);
    }

    [Test]
    [Ignore]
    public void SwitchToFrame()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        var frame = App.Components.CreateById<Frame>("myFrameId");
        App.Browser.SwitchToFrame(frame);

        var myButton = frame.CreateById<Button>("purchaseBtnId");

        myButton.Click();

        App.Browser.SwitchToDefault();
    }
}
```

Explanations
------------
BELLATRIX gives you an interface to most common operations for controlling the started browser through the **BrowserService** class.
```csharp
App.Browser.WaitUntilReady();
```
Sometimes, some AJAX async calls are not caught natively by WebDriver. So you can use the BELLATRIX browser service's method **WaitUntilReady** which waits for these calls automatically to finish. Keep in mind that usually this is not necessary since BELLATRIX has a complex built-in mechanism for handling element waits.
```csharp
Debug.WriteLine(App.Browser.Url);
```
Get the current tab URL.
```csharp
App.Browser.Maximize();
```
Maximizes the browser.
```csharp
App.Browser.Back();
```
Simulates clicking the browser's Back button.
```csharp
App.Browser.Forward();
```
Simulates clicking the browser's Forward button.
```csharp
App.Browser.Refresh();
```
Simulates clicking the browser's Refresh button.
```csharp
Assert.AreEqual("BELLATRIX .NET test automation framework", App.Browser.Title);
```
Get the current tab Title.
```csharp
Debug.WriteLine(App.Browser.HtmlSource);
```
Get the current page HTML.
```csharp
var frame = App.Components.CreateById<Frame>("myFrameId");
App.Browser.SwitchToFrame(frame);
var myButton = frame.CreateById<Button>("purchaseBtnId");
```
To work with elements inside a frame, you should switch to it first. Search for the button inside the frame component. Of course, once you switched to frame, you can create the element through ComponentCreateService too.
```csharp
App.Browser.SwitchToDefault();
```
To continue searching in the whole page, you need to switch to default again. It is the same process as how you work with WebDriver.

Playwright
------------
**Maximize** and **Minimize** don't work for Playwright.

**SwitchToDefault** and **SwitchToFrame** are not necessary, because Bellatrix.Playwright treats iframes as any other element. You have to use **Frame** component.