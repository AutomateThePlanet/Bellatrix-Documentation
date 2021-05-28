---
layout: default
title:  "Capture HTTP Traffic"
excerpt: "Learn to capture HTTP traffic and make assertions using BELLATRIX."
date:   2021-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/capture-http-traffic/
anchors:
  example: Example
  explanations: Explanations
  configuration: Configuration
---
Example
-------
```csharp
[TestFixture]
[Browser(BrowserType.Chrome, Lifecycle.RestartEveryTime, shouldCaptureHttpTraffic: true)]
public class CaptureHttpTrafficTests : WebTest
{
    [Test]
    public void CaptureTrafficTests()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        Select sortDropDown = App.Components.CreateByNameEndingWith<Select>("orderby");
        Anchor protonMReadMoreButton = 
		App.Components.CreateByInnerTextContaining<Anchor>("Read more");
        Anchor addToCartFalcon9 = 
        App.Components.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
        Anchor viewCartButton = 
		App.Components.CreateByClassContaining<Anchor>("added_to_cart wc-forward").ToBeClickable();

        sortDropDown.SelectByText("Sort by price: low to high");
        protonMReadMoreButton.Hover();
        addToCartFalcon9.Focus();
        addToCartFalcon9.Click();
        viewCartButton.Click();

        App.Proxy.AssertNoErrorCodes();

        App.Proxy.AssertNoLargeImagesRequested();

        App.Proxy.AssertRequestMade("http://demos.bellatrix.solutions/favicon.ico");
    }

    [Test]
    public void RedirectRequestsTest()
    {
        App.Proxy.SetUrlToBeRedirectedTo(
		"http://demos.bellatrix.solutions/favicon.ico", 
		"https://www.automatetheplanet.com/wp-content/uploads/2016/12/logo.svg");

        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        Select sortDropDown = App.Components.CreateByNameEndingWith<Select>("orderby");
        Anchor protonMReadMoreButton = App.Components.CreateByInnerTextContaining<Anchor>("Read more");
        Anchor addToCartFalcon9 = 
		App.Components.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
        Anchor viewCartButton = 
		App.Components.CreateByClassContaining<Anchor>("added_to_cart wc-forward").ToBeClickable();

        sortDropDown.SelectByText("Sort by price: low to high");
        protonMReadMoreButton.Hover();
        addToCartFalcon9.Focus();
        addToCartFalcon9.Click();
        viewCartButton.Click();
    }

    [Test]
    public void BlockRequestsTest()
    {
        App.Proxy.SetUrlToBeBlocked("http://demos.bellatrix.solutions/favicon.ico");

        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

        Select sortDropDown = App.Components.CreateByNameEndingWith<Select>("orderby");
        Anchor protonMReadMoreButton = 
		App.Components.CreateByInnerTextContaining<Anchor>("Read more");
        Anchor addToCartFalcon9 = 
		App.Components.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
        Anchor viewCartButton = 
		App.Components.CreateByClassContaining<Anchor>("added_to_cart wc-forward").ToBeClickable();

        sortDropDown.SelectByText("Sort by price: low to high");
        protonMReadMoreButton.Hover();
        addToCartFalcon9.Focus();
        addToCartFalcon9.Click();
        viewCartButton.Click();

        App.Proxy.AssertRequestNotMade("http://demos.bellatrix.solutions/welcome");
    }
}
```

Explanations
------------
Capture HTTP traffic is one of the most requested features for WebDriver. However by design WebDriver does not include such feature. Happily, for you, we added it to BELLATRIX.
```csharp
[Browser(BrowserType.Chrome, Lifecycle.RestartEveryTime, shouldCaptureHttpTraffic: true)]
```
By default, the proxy is not used in your tests even if it is enabled. You need to set the shouldCaptureHttpTraffic to true in the **Browser** attribute. After that, each request and response made by the browser is captured, and you have the option to modify it or make assertions against it.
```csharp
App.Proxy.AssertNoErrorCodes();
```
You can access the proxy through the BELLATRIX **App** service. The proxy service includes several useful assert methods. The first one asserts that no error codes are present in the requests. This way we can catch problems with not loaded images or CSS files.
```csharp
App.Proxy.AssertNoLargeImagesRequested();
```
Make sure that our images size is optimised.
```csharp
App.Proxy.AssertRequestMade("http://demos.bellatrix.solutions/favicon.ico");
```
Check if some specific request is made.
```csharp
App.Proxy.SetUrlToBeRedirectedTo(
		"http://demos.bellatrix.solutions/favicon.ico", 
		"https://www.automatetheplanet.com/wp-content/uploads/2016/12/logo.svg");
```
You can set various URLs to be redirected. This is useful if you do not have access to production code and want to use a mock service instead.
```csharp
App.Proxy.SetUrlToBeBlocked("http://demos.bellatrix.solutions/favicon.ico");
```
To make web pages load faster, you can block some not required services- for example analytics scripts, you do not need them in test environments.
```csharp
App.Proxy.AssertRequestNotMade("http://demos.bellatrix.solutions/welcome");
```
Check that no request is made to specific URL.

Configuration
-------------
```json
"webSettings": {
  "isParallelExecutionEnabled": "false",
  "artificialDelayBeforeAction": "0",
  "automaticallyScrollToVisible": "false",
  "waitUntilReadyOnElementFound": "false",
  "waitForAngular": "false",
  "shouldHighlightElements": "true",
  "shouldCaptureHttpTraffic": "false",
  "pathToSslCertificate": "path",
```
To turn it on you need to edit **testFrameworkSettings.json** file and set **shouldCaptureHttpTraffic** to true.