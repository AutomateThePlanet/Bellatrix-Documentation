---
layout: default
title:  "Capture HTTP Traffic"
excerpt: "Learn to capture HTTP traffic and make assertions using BELLATRIX."
date:   2018-06-23 06:50:17 +0200
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
[TestClass]
[Browser(BrowserType.Chrome, Lifecycle.RestartEveryTime, shouldCaptureHttpTraffic: true)]
public class CaptureHttpTrafficTests : WebTest
{
    [TestMethod]
    public void CaptureTrafficTests()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");
        Anchor protonMReadMoreButton = 
		App.ElementCreateService.CreateByInnerTextContaining<Anchor>("Read more");
        Anchor addToCartFalcon9 = 
        App.ElementCreateService.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
        Anchor viewCartButton = 
		App.ElementCreateService.CreateByClassContaining<Anchor>("added_to_cart wc-forward").ToBeClickable();

        sortDropDown.SelectByText("Sort by price: low to high");
        protonMReadMoreButton.Hover();
        addToCartFalcon9.Focus();
        addToCartFalcon9.Click();
        viewCartButton.Click();

        App.ProxyService.AssertNoErrorCodes();

        App.ProxyService.AssertNoLargeImagesRequested();

        App.ProxyService.AssertRequestMade("http://demos.bellatrix.solutions/favicon.ico");
    }

    [TestMethod]
    public void RedirectRequestsTest()
    {
        App.ProxyService.SetUrlToBeRedirectedTo(
		"http://demos.bellatrix.solutions/favicon.ico", 
		"https://www.automatetheplanet.com/wp-content/uploads/2016/12/logo.svg");

        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");
        Anchor protonMReadMoreButton = App.ElementCreateService.CreateByInnerTextContaining<Anchor>("Read more");
        Anchor addToCartFalcon9 = 
		App.ElementCreateService.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
        Anchor viewCartButton = 
		App.ElementCreateService.CreateByClassContaining<Anchor>("added_to_cart wc-forward").ToBeClickable();

        sortDropDown.SelectByText("Sort by price: low to high");
        protonMReadMoreButton.Hover();
        addToCartFalcon9.Focus();
        addToCartFalcon9.Click();
        viewCartButton.Click();
    }

    [TestMethod]
    public void BlockRequestsTest()
    {
        App.ProxyService.SetUrlToBeBlocked("http://demos.bellatrix.solutions/favicon.ico");

        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");
        Anchor protonMReadMoreButton = 
		App.ElementCreateService.CreateByInnerTextContaining<Anchor>("Read more");
        Anchor addToCartFalcon9 = 
		App.ElementCreateService.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
        Anchor viewCartButton = 
		App.ElementCreateService.CreateByClassContaining<Anchor>("added_to_cart wc-forward").ToBeClickable();

        sortDropDown.SelectByText("Sort by price: low to high");
        protonMReadMoreButton.Hover();
        addToCartFalcon9.Focus();
        addToCartFalcon9.Click();
        viewCartButton.Click();

        App.ProxyService.AssertRequestNotMade("http://demos.bellatrix.solutions/welcome");
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
App.ProxyService.AssertNoErrorCodes();
```
You can access the proxy through the BELLATRIX **App** service. The proxy service includes several useful assert methods. The first one asserts that no error codes are present in the requests. This way we can catch problems with not loaded images or CSS files.
```csharp
App.ProxyService.AssertNoLargeImagesRequested();
```
Make sure that our images size is optimised.
```csharp
App.ProxyService.AssertRequestMade("http://demos.bellatrix.solutions/favicon.ico");
```
Check if some specific request is made.
```csharp
App.ProxyService.SetUrlToBeRedirectedTo(
		"http://demos.bellatrix.solutions/favicon.ico", 
		"https://www.automatetheplanet.com/wp-content/uploads/2016/12/logo.svg");
```
You can set various URLs to be redirected. This is useful if you do not have access to production code and want to use a mock service instead.
```csharp
App.ProxyService.SetUrlToBeBlocked("http://demos.bellatrix.solutions/favicon.ico");
```
To make web pages load faster, you can block some not required services- for example analytics scripts, you do not need them in test environments.
```csharp
App.ProxyService.AssertRequestNotMade("http://demos.bellatrix.solutions/welcome");
```
Check that no request is made to specific URL.

Configuration
-------------
```json
"webProxySettings": {
     "isEnabled": "true"
}
```
To turn it on you need to **testFrameworkSettings.json** file and set the isEnabled to true.