---
layout: default
title:  "Extensibility- Override Locally Element Actions"
excerpt: "Learn how to override temporary some web elements actions/properties."
date:   2018-02-20 06:50:17 +0200
parent: web-automation
permalink: /web-automation/extensibility-override-locally-element-actions/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[Browser(BrowserType.Firefox, BrowserBehavior.RestartEveryTime)]
public class OverrideLocallyElementActionsTests : WebTest
{
    [TestMethod]
    public void PurchaseRocketWithGloballyOverridenMethods()
    {
        Button.OverrideClickLocally = (e) =>
        {
            e.ToExists().ToBeClickable().WaitToBe();
            App.JavaScriptService.Execute("arguments[0].click();", e);
        };

        Anchor.OverrideFocusLocally = CustomFocus;

        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");
        Anchor protonMReadMoreButton = 
        App.ElementCreateService.CreateByInnerTextContaining<Anchor>("Read more");
        Anchor addToCartFalcon9 = 
        App.ElementCreateService.CreateByAttributesContaining<Anchor>("data-product_id", "28").ToBeClickable();
        Anchor viewCartButton = 
        App.ElementCreateService.CreateByClassContaining<Anchor>("added_to_cart wc-forward").ToBeClickable();
        TextField couponCodeTextField = App.ElementCreateService.CreateById<TextField>("coupon_code");
        Button applyCouponButton = App.ElementCreateService.CreateByValueContaining<Button>("Apply coupon");
        Number quantityBox = App.ElementCreateService.CreateByClassContaining<Number>("input-text qty text");
        Div messageAlert = App.ElementCreateService.CreateByClassContaining<Div>("woocommerce-message");
        Button updateCart = App.ElementCreateService.CreateByValueContaining<Button>("Update cart").ToBeClickable();
        Anchor proceedToCheckout = 
        App.ElementCreateService.CreateByClassContaining<Anchor>("checkout-button button alt wc-forward");
        Heading billingDetailsHeading = 
        App.ElementCreateService.CreateByInnerTextContaining<Heading>("Billing details");
        Span totalSpan = App.ElementCreateService.CreateByXpath<Span>("//*[@class='order-total']//span");

        sortDropDown.SelectByText("Sort by price: low to high");
        protonMReadMoreButton.Hover();
        addToCartFalcon9.Focus();
        addToCartFalcon9.Click();
        viewCartButton.Click();
        couponCodeTextField.SetText("happybirthday");
        applyCouponButton.Click();

        messageAlert.ToHasContent().ToBeVisible().WaitToBe();
        messageAlert.EnsureInnerTextIs("Coupon code applied successfully.");
        quantityBox.SetNumber(0);
        quantityBox.SetNumber(2);

        updateCart.Click();

        totalSpan.EnsureInnerTextIs("95.00€", 15000);

        proceedToCheckout.Click();
        billingDetailsHeading.ToBeVisible().WaitToBe();
    }

    private void CustomFocus(Anchor anchor)
    {
        App.JavaScriptService.Execute("window.focus();");
        App.JavaScriptService.Execute("arguments[0].focus();", anchor);
    }
}
```

Explanations
------------
Extensibility and customisation are one of the biggest advantages of BELLATRIX. So, each BELLATRIX web control gives you the possibility to override its behaviour locally for current test only. You need to initialise the static delegates- **Override{MethodName}Locally**. This may be useful to make a temporary fix only for certain page where the default behaviour is not working as expected.
```csharp
Button.OverrideClickLocally = (e) =>
{
    e.ToExists().ToBeClickable().WaitToBe();
    App.JavaScriptService.Execute("arguments[0].click();", e);
};
```
Below we override the behaviour of the button control with an anonymous lambda function. Instead of using the default webDriverElement.Click() method, we click via JavaScript code.
```csharp
Anchor.OverrideFocusLocally = CustomFocus;

private void CustomFocus(Anchor anchor)
{
    App.JavaScriptService.Execute("window.focus();");
    App.JavaScriptService.Execute("arguments[0].focus();", anchor);
}
```
Override the anchor Focus method by assigning a local private function to the local delegate.

**Note**: *Keep in mind that once the control is overridden locally, after the test's execution the default behaviour is restored.*

**Note**: *In most cases, you can call the local override in some page object, directly in the test or in the TestInit method.*

**Note**: *The local override has precedence over the global override.*

Here is a list of all local override Button delegates:
- OverrideClickLocally
- OverrideFocusLocally
- OverrideHoverLocally
- OverrideInnerTextLocally
- OverrideIsDisabledLocally
- OverrideValueLocally