---
layout: default
title:  "Ensure Assertions"
excerpt: "Learn how to use BELLATRIX ensure assertion methods."
date:   2018-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/ensure-assertions/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestMethod]
public void AssertEnsureCartPageFields()
{
    App.NavigationService.Navigate("http://demos.bellatrix.solutions/?add-to-cart=26");

    App.NavigationService.Navigate("http://demos.bellatrix.solutions/cart/");

    TextField couponCodeTextField = App.ElementCreateService.CreateById<TextField>("coupon_code");

    couponCodeTextField.EnsurePlaceholderIs("Coupon code");

    Button applyCouponButton = App.ElementCreateService.CreateByValueContaining<Button>("Apply coupon");

    applyCouponButton.EnsureIsVisible();

    Div messageAlert = App.ElementCreateService.CreateByClassContaining<Div>("woocommerce-message");

    messageAlert.EnsureIsNotVisible();

    Button updateCart = App.ElementCreateService.CreateByValueContaining<Button>("Update cart");

    updateCart.EnsureIsDisabled();

    Span totalSpan = App.ElementCreateService.CreateByXpath<Span>("//*[@class='order-total']//span");

    totalSpan.EnsureInnerTextIs("120.00€", timeout: 30, sleepInterval: 2);
}
```

Explanations
------------
```csharp
// Assert.AreEqual("Coupon code ", couponCodeTextField.Placeholder);
couponCodeTextField.EnsurePlaceholderIs("Coupon code");
```
We can assert the default text in the coupon text fiend through the BELLATRIX element Placeholder property.
The different BELLATRIX web elements classes contain lots of these properties which are a representation of the most important HTML element attributes. The biggest drawback of using vanilla assertions is that the messages displayed on failure are not meaningful at all. This is so because most unit testing frameworks are created for much simpler and shorter unit tests. There is information in next chapter how BELLATRIX solves
If the commented assertion fails the following message is displayed: 
"*Message: Assert.AreEqual failed. Expected:<Coupon code >. Actual:<Coupon code>.*"
You can guess what happened, but you do not have information which element failed and on which page. If we use the Ensure extension methods, BELLATRIX waits some time for the condition to pass. After this period if it is not successful, a beatified meaningful exception message is displayed:
"*The control's placeholder should be 'Coupon code ' but was 'Coupon code'. The test failed on URL: http://demos.bellatrix.solutions/cart/*"
```csharp
Button applyCouponButton = App.ElementCreateService.CreateByValueContaining<Button>("Apply coupon");

// Assert.IsTrue(applyCouponButton.IsPresent);
// Assert.IsTrue(applyCouponButton.IsVisible);
applyCouponButton.EnsureIsVisible();
```
Assert that the apply coupon button exists and is visible on the page. On fail the following message is displayed: "*Message: Assert.IsTrue failed.*" Cannot learn much about what happened.
Now if we use the **EnsureIsVisible** method and the check does not succeed the following error message is displayed: "*The control should be visible but was NOT. The test failed on URL: http://demos.bellatrix.solutions/cart/*" 
To all exception messages, the current URL is displayed, which improves the troubleshooting.
```csharp
Div messageAlert = App.ElementCreateService.CreateByClassContaining<Div>("woocommerce-message");
messageAlert.EnsureIsNotVisible();
```
Since there are no validation errors, verify that the message div is not visible.
```csharp
Button updateCart = App.ElementCreateService.CreateByValueContaining<Button>("Update cart");
updateCart.EnsureIsDisabled();
```
No changes are made to the added products so the update cart button should be disabled.
```csharp
Span totalSpan = App.ElementCreateService.CreateByXpath<Span>("//*[@class='order-total']//span");
totalSpan.EnsureInnerTextIs("120.00€", timeout: 30, sleepInterval: 2);
```
Check the total price contained in the order-total span HTML element. By default, all Ensure methods have 5 seconds timeout. However, you can specify a custom timeout and sleep interval (period for checking again)

BELLATRIX provides you with a full BDD logging support for ensure assertions and gives you a way to hook your logic in multiple places.