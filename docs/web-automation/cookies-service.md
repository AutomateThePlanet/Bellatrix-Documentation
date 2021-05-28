---
layout: default
title:  "CookiesService"
excerpt: "Learn how to use BELLATRIX CookiesService."
date:   2021-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/cookies-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestFixture]
public class CookiesServiceTests : WebTest
{
    [Test]
    public void GetAllCookies()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/welcome/");

        App.Cookies.AddCookie("woocommerce_items_in_cart1", "3");
        App.Cookies.AddCookie("woocommerce_items_in_cart2", "3");
        App.Cookies.AddCookie("woocommerce_items_in_cart3", "3");

        var cookies = App.Cookies.GetAllCookies();

        Assert.AreEqual(3, cookies.Count);
    }

    [Test]
    public void GetSpecificCookie()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/welcome/");

        App.Cookies.AddCookie("woocommerce_items_in_cart", "3");

        var itemsInCartCookie = App.Cookies.GetCookie("woocommerce_items_in_cart");

        Assert.AreEqual("3", itemsInCartCookie);
    }

    [Test]
    public void DeleteAllCookies()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/welcome/");

        var protonRocketAddToCartBtn = App.Components.CreateAllByInnerTextContaining<Anchor>("Add to cart").First();
        protonRocketAddToCartBtn.Click();

        App.Cookies.DeleteAllCookies();
    }

    [Test]
    public void DeleteSpecificCookie()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/welcome/");

        var protonRocketAddToCartBtn = App.Components.CreateAllByInnerTextContaining<Anchor>("Add to cart").First();
        protonRocketAddToCartBtn.Click();

        App.Cookies.DeleteCookie("woocommerce_items_in_cart");
    }

    [Test]
    public void AddNewCookie()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/welcome/");

        App.Cookies.AddCookie("woocommerce_items_in_cart", "3");
    }
}
```

Explanations
------------
BELLATRIX gives you an interface for easier work with cookies using the CookiesService. You need to make sure that you have navigated to the desired web page.
```csharp
var cookies = App.Cookies.GetAllCookies();
```
Get all cookies.
```csharp
var itemsInCartCookie = App.Cookies.GetCookie("woocommerce_items_in_cart");
```
Get a specific cookie by name.
```csharp
App.Cookies.DeleteAllCookies();
```
Delete all cookies.
```csharp
App.Cookies.DeleteCookie("woocommerce_items_in_cart");
```
Delete a specific cookie by name.
```csharp
App.Cookies.AddCookie("woocommerce_items_in_cart", "3");
```
Add a new cookie.