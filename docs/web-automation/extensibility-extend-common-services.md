---
layout: default
title:  "Extensibility- Extend Common Services"
excerpt: "Learn how to extend BELLATRIX common services."
date:   2021-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/extensibility-extend-common-services/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestFixture]
[Browser(BrowserType.Firefox, Lifecycle.RestartEveryTime)]
public class ExtendExistingCommonServicesTests : WebTest
{
    [Test]
    [Ignore]
    public void PurchaseRocket()
    {
        App.NavigationService.NavigateViaJavaScript("http://demos.bellatrix.solutions/");

        Select sortDropDown = App.Components.CreateByNameEndingWith<Select>("orderby");
        Anchor protonMReadMoreButton = 
        App.Components.CreateByInnerTextContaining<Anchor>("Read more");
        Anchor addToCartFalcon9 = 
        App.Components.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
        Anchor viewCartButton = 
        App.Components.CreateByClassContaining<Anchor>("added_to_cart wc-forward").ToBeClickable();
        TextField couponCodeTextField = App.Components.CreateById<TextField>("coupon_code");
        Button applyCouponButton = App.Components.CreateByValueContaining<Button>("Apply coupon");
        Number quantityBox = App.Components.CreateByClassContaining<Number>("input-text qty text");
        Div messageAlert = App.Components.CreateByClassContaining<Div>("woocommerce-message");
        Button updateCart = App.Components.CreateByValueContaining<Button>("Update cart").ToBeClickable();
        Button proceedToCheckout = 
        App.Components.CreateByClassContaining<Button>("checkout-button button alt wc-forward");
        Heading billingDetailsHeading = 
        App.Components.CreateByInnerTextContaining<Heading>("Billing details");
        Span totalSpan = App.Components.CreateByXpath<Span>("//*[@class='order-total']//span");

        sortDropDown.SelectByText("Sort by price: low to high");
        protonMReadMoreButton.Hover();
        addToCartFalcon9.Focus();
        addToCartFalcon9.Click();
        viewCartButton.Click();
        couponCodeTextField.SetText("happybirthday");
        applyCouponButton.Click();

        messageAlert.ToHasContent().ToBeVisible().WaitToBe();
        messageAlert.ValidateInnerTextIs("Coupon code applied successfully.");
        quantityBox.SetNumber(0);
        quantityBox.SetNumber(2);

        updateCart.Click();

        totalSpan.ValidateInnerTextIs("95.00€", 15000);

        proceedToCheckout.SubmitButtonWithEnter();
        billingDetailsHeading.ToBeVisible().WaitToBe();
    }
}
```

Explanations
------------
```csharp
public static class NavigationServiceExtensions
{
    public static void NavigateViaJavaScript(this NavigationService navigationService, string url)
    {
        var javaScriptService = new JavaScriptService();

        if (!navigationService.IsUrlValid(url))
        {
            throw new ArgumentException($"The specified URL- {url} is not in a valid format!");
        }

        javaScriptService.Execute($"window.location.href = '{url}';");
    }

    public static bool IsUrlValid(this NavigationService navigationService, string url)
    {
        bool result = Uri.TryCreate(url, UriKind.Absolute, out var uriResult) && uriResult.Scheme == Uri.UriSchemeHttp;

        return result;
    }
}
```
One way to extend the BELLATRIX common services is to create an extension method for the additional action.
1. Place it in a static class like this one.
2. Create a static method for the action.
3. Pass the common service as a parameter with the keyword 'this'.
4. Access the native driver via WrappedDriver.

Later to use the method in your tests, add a using statement containing this class's namespace.
```csharp
using Bellatrix.Web.GettingStarted.Advanced.Elements.Extension.Methods;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Bellatrix.Web.GettingStarted
```
To use the additional method you created, add a using statement to the extension methods' namespace.
```csharp
App.NavigationService.NavigateViaJavaScript("http://demos.bellatrix.solutions/");
```
Use newly added navigation though JavaScript which is not part of the original implementation of the common service.