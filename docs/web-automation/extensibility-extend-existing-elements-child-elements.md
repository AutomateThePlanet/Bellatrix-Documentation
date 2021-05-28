---
layout: default
title:  "Extensibility- Extend Existing Elements- Child Elements"
excerpt: "Learn how to extend BELLATRIX web elements using child elements."
date:   2021-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/extensibility-extend-existing-elements-child-elements/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestFixture]
public class ExtendExistingElementWithChildElementsTests : WebTest
{
    [Test]
    public void PurchaseRocket()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/");

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
        Button updateCart = 
        App.Components.CreateByValueContaining<Button>("Update cart").ToBeClickable();

        ExtendedButton proceedToCheckout = 
        App.Components.CreateByClassContaining<ExtendedButton>("checkout alt wc-forward");
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
public class ExtendedButton : Button
{
    public void SubmitButtonWithEnter()
    {
        var action = new Actions(WrappedDriver);
        action.MoveToElement(WrappedElement).SendKeys(Keys.Enter).Perform();
    }

    public void JavaScriptFocus()
    {
        JavaScriptService.Execute("window.focus();");
        JavaScriptService.Execute("arguments[0].focus();", this);
    }
}
```
The second way of extending an existing element is to create a child component. Inherit the element you want to extend. In this case, two methods are added to the standard Button component. Next in your tests, use the ExtendedButton instead of regular Button to have access to these methods.
The same strategy can be used to create a completely new element that BELLATRIX does not provide. You need to extend the 'Element' as a base class.
```csharp
 ExtendedButton proceedToCheckout = 
 App.Components.CreateByClassContaining<ExtendedButton>("checkout-button button alt wc-forward");
```
Instead of the regular button, we create the ExtendedButton, this way we can use its new methods.
```csharp
proceedToCheckout.SubmitButtonWithEnter();
```
Use the new custom method provided by the ExtendedButton class.