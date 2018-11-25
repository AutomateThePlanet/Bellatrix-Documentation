---
layout: default
title:  "CookiesService"
excerpt: "Learn how to use BELLATRIX CookiesService."
date:   2018-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/cookies-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[Browser(BrowserType.Chrome, BrowserBehavior.RestartEveryTime)]
public class CookiesServiceTests : WebTest
{
    [TestMethod]
    public void GetAllCookies()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/welcome/");

        App.CookieService.AddCookie("woocommerce_items_in_cart1", "3");
        App.CookieService.AddCookie("woocommerce_items_in_cart2", "3");
        App.CookieService.AddCookie("woocommerce_items_in_cart3", "3");

        var cookies = App.CookieService.GetAllCookies();

        Assert.AreEqual(3, cookies.Count);
    }

    [TestMethod]
    public void GetSpecificCookie()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/welcome/");

        App.CookieService.AddCookie("woocommerce_items_in_cart", "3");

        var itemsInCartCookie = App.CookieService.GetCookie("woocommerce_items_in_cart");

        Assert.AreEqual("3", itemsInCartCookie);
    }

    [TestMethod]
    public void DeleteAllCookies()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/welcome/");

        var protonRocketAddToCartBtn = App.ElementCreateService.CreateAllByInnerTextContaining<Anchor>("Add to cart").First();
        protonRocketAddToCartBtn.Click();

        App.CookieService.DeleteAllCookies();
    }

    [TestMethod]
    public void DeleteSpecificCookie()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/welcome/");

        var protonRocketAddToCartBtn = App.ElementCreateService.CreateAllByInnerTextContaining<Anchor>("Add to cart").First();
        protonRocketAddToCartBtn.Click();

        App.CookieService.DeleteCookie("woocommerce_items_in_cart");
    }

    [TestMethod]
    public void AddNewCookie()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/welcome/");

        App.CookieService.AddCookie("woocommerce_items_in_cart", "3");
    }
}
```

Explanations
------------
BELLATRIX gives you an interface for easier work with cookies using the CookiesService. You need to make sure that you have navigated to the desired web page.
```csharp
var cookies = App.CookieService.GetAllCookies();
```
Get all cookies.
```csharp
var itemsInCartCookie = App.CookieService.GetCookie("woocommerce_items_in_cart");
```
Get a specific cookie by name.
```csharp
App.CookieService.DeleteAllCookies();
```
Delete all cookies.
```csharp
App.CookieService.DeleteCookie("woocommerce_items_in_cart");
```
Delete a specific cookie by name.
```csharp
App.CookieService.AddCookie("woocommerce_items_in_cart", "3");
```
Add a new cookie.