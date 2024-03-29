---
layout: default
title:  "Normal Assertions"
excerpt: "Learn how to use normal assertion methods in BELLATRIX tests."
date:   2021-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/normal-assertions/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[Test]
public void AssertCartPageFields()
{
    App.Navigation.Navigate("http://demos.bellatrix.solutions/?add-to-cart=26");

    App.Navigation.Navigate("http://demos.bellatrix.solutions/cart/");

    TextField couponCodeTextField = App.Components.CreateById<TextField>("coupon_code");

    Assert.AreEqual("Coupon code", couponCodeTextField.Placeholder);

    Button applyCouponButton = App.Components.CreateByValueContaining<Button>("Apply coupon");

    Assert.IsTrue(applyCouponButton.IsPresent);
    Assert.IsTrue(applyCouponButton.IsVisible);

    Div messageAlert = App.Components.CreateByClassContaining<Div>("woocommerce-message");

    Assert.IsFalse(messageAlert.IsVisible);

    Button updateCart = App.Components.CreateByValueContaining<Button>("Update cart");

    Assert.IsTrue(updateCart.IsDisabled);

    Span totalSpan = App.Components.CreateByXpath<Span>("//*[@class='order-total']//span");

    Assert.AreEqual("120.00€", totalSpan.InnerText);

    Bellatrix.Assertions.Assert.Multiple(
                () => Assert.AreEqual("120.00€", totalSpan.InnerText),
                () => Assert.IsTrue(updateCart.IsDisabled));
}
```

Explanations
------------
```csharp
Assert.AreEqual("Coupon code", couponCodeTextField.Placeholder);
```
We can assert the default text in the coupon text field through the BELLATRIX element Placeholder property. The different BELLATRIX web elements classes contain lots of these properties which are a representation of the most important HTML element attributes. The biggest drawback of using vanilla assertions is that the messages displayed on failure are not meaningful at all. This is so because most unit testing frameworks are created for much simpler and shorter unit tests. In next chapter, there is information on how BELLATRIX solves the problems with the introduction of Ensure methods. If the bellow assertion fails the following message is displayed: "*Message: Assert.AreEqual failed. Expected:<Coupon code >. Actual:<Coupon code>.*"
You can guess what happened, but you do not have information which element failed and on which page.
```csharp
Assert.IsTrue(applyCouponButton.IsPresent);
Assert.IsTrue(applyCouponButton.IsVisible);
```
Here we assert that the apply coupon button exists and is visible on the page. On fail the following message is displayed: "*Message: Assert.IsTrue failed.*" Cannot learn much about what happened.
```csharp
Div messageAlert = App.Components.CreateByClassContaining<Div>("woocommerce-message");
Assert.IsFalse(messageAlert.IsVisible);
```
Since there are no validation errors, verify that the message div is not visible.
```csharp
Button updateCart = App.Components.CreateByValueContaining<Button>("Update cart");
Assert.IsTrue(updateCart.IsDisabled);
```
We have not made any changes to the added products so the update cart button should be disabled.
```csharp
Span totalSpan = App.Components.CreateByXpath<Span>("//*[@class='order-total']//span");
Assert.AreEqual("120.00€", totalSpan.InnerText);
```
We check the total price contained in the order-total span HTML component.

```csharp
Bellatrix.Assertions.Assert.Multiple(
                () => Assert.AreEqual("120.00€", totalSpan.InnerText),
                () => Assert.IsTrue(updateCart.IsDisabled));
```
You can execute multiple assertions failing only once viewing all results.

One more thing you need to keep in mind is that normal assertion methods do not include BDD logging and any available hooks. BELLATRIX provides you with a full BDD logging support for ensure assertions and gives you a way to hook your logic in multiple places.