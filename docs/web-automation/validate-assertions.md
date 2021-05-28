---
layout: default
title:  "Validate Assertions"
excerpt: "Learn how to use BELLATRIX Validate assertion methods."
date:   2021-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/validate-assertions/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[Test]
public void AssertValidateCartPageFields()
{
    App.Navigation.Navigate("http://demos.bellatrix.solutions/?add-to-cart=26");

    App.Navigation.Navigate("http://demos.bellatrix.solutions/cart/");

    TextField couponCodeTextField = App.Components.CreateById<TextField>("coupon_code");

    couponCodeTextField.ValidatePlaceholderIs("Coupon code");

    Button applyCouponButton = App.Components.CreateByValueContaining<Button>("Apply coupon");

    applyCouponButton.ValidateIsVisible();

    Div messageAlert = App.Components.CreateByClassContaining<Div>("woocommerce-message");

    messageAlert.ValidateIsNotVisible();

    Button updateCart = App.Components.CreateByValueContaining<Button>("Update cart");

    updateCart.ValidateIsDisabled();

    Span totalSpan = App.Components.CreateByXpath<Span>("//*[@class='order-total']//span");

    totalSpan.ValidateInnerTextIs("120.00€", timeout: 30, sleepInterval: 2);

    Bellatrix.Assertions.Assert.Multiple(
                () => totalSpan.ValidateInnerTextIs("120.00€", timeout: 30, sleepInterval: 2),
                () => updateCart.ValidateIsDisabled(),
                () => messageAlert.ValidateIsNotVisible());
}
```

Explanations
------------
```csharp
// Assert.AreEqual("Coupon code ", couponCodeTextField.Placeholder);
couponCodeTextField.ValidatePlaceholderIs("Coupon code");
```
We can assert the default text in the coupon text fiend through the BELLATRIX element Placeholder property.
The different BELLATRIX web elements classes contain lots of these properties which are a representation of the most important HTML element attributes. The biggest drawback of using vanilla assertions is that the messages displayed on failure are not meaningful at all. This is so because most unit testing frameworks are created for much simpler and shorter unit tests. There is information in next chapter how BELLATRIX solves
If the commented assertion fails the following message is displayed: 
"*Message: Assert.AreEqual failed. Expected:<Coupon code >. Actual:<Coupon code>.*"
You can guess what happened, but you do not have information which element failed and on which page. If we use the Validate extension methods, BELLATRIX waits some time for the condition to pass. After this period if it is not successful, a beatified meaningful exception message is displayed:
"*The control's placeholder should be 'Coupon code ' but was 'Coupon code'. The test failed on URL: http://demos.bellatrix.solutions/cart/*"
```csharp
Button applyCouponButton = App.Components.CreateByValueContaining<Button>("Apply coupon");

// Assert.IsTrue(applyCouponButton.IsPresent);
// Assert.IsTrue(applyCouponButton.IsVisible);
applyCouponButton.ValidateIsVisible();
```
Assert that the apply coupon button exists and is visible on the page. On fail the following message is displayed: "*Message: Assert.IsTrue failed.*" Cannot learn much about what happened.
Now if we use the **ValidateIsVisible** method and the check does not succeed the following error message is displayed: "*The control should be visible but was NOT. The test failed on URL: http://demos.bellatrix.solutions/cart/*" 
To all exception messages, the current URL is displayed, which improves the troubleshooting.
```csharp
Div messageAlert = App.Components.CreateByClassContaining<Div>("woocommerce-message");
messageAlert.ValidateIsNotVisible();
```
Since there are no validation errors, verify that the message div is not visible.
```csharp
Button updateCart = App.Components.CreateByValueContaining<Button>("Update cart");
updateCart.ValidateIsDisabled();
```
No changes are made to the added products so the update cart button should be disabled.
```csharp
Span totalSpan = App.Components.CreateByXpath<Span>("//*[@class='order-total']//span");
totalSpan.ValidateInnerTextIs("120.00€", timeout: 30, sleepInterval: 2);
```
Check the total price contained in the order-total span HTML component. By default, all Validate methods have 5 seconds timeout. However, you can specify a custom timeout and sleep interval (period for checking again)
```csharp
Bellatrix.Assertions.Assert.Multiple(
                () => totalSpan.ValidateInnerTextIs("120.00€", timeout: 30, sleepInterval: 2),
                () => updateCart.ValidateIsDisabled(),
                () => messageAlert.ValidateIsNotVisible());
```
You can execute multiple validate assertions failing only once viewing all results.

BELLATRIX provides you with a full BDD logging support for Validate assertions and gives you a way to hook your logic in multiple places.