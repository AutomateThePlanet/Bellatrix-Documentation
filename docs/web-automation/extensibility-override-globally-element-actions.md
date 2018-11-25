---
layout: default
title:  "Extensibility- Override Globally Element Actions"
excerpt: "Learn how to override some web elements actions/properties for the whole tests execution."
date:   2018-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/extensibility-override-globally-element-actions/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[Browser(BrowserType.Firefox, BrowserBehavior.RestartEveryTime)]
public class OverrideGloballyElementActionsTests : WebTest
{
    public override void TestsArrange()
    {
        Button.OverrideClickGlobally = (e) =>
        {
            e.ToExists().ToBeClickable().WaitToBe();
            App.JavaScriptService.Execute("arguments[0].click();", e);
        };

        Anchor.OverrideFocusGlobally = CustomFocus;
    }

    private void CustomFocus(Anchor anchor)
    {
        App.JavaScriptService.Execute("window.focus();");
        App.JavaScriptService.Execute("arguments[0].focus();", anchor);
    }

    [TestMethod]
    public void PurchaseRocketWithGloballyOverridenMethods()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

        Select sortDropDown = App.ElementCreateService.CreateByNameEndingWith<Select>("orderby");
        Anchor protonMReadMoreButton = App.ElementCreateService.CreateByInnerTextContaining<Anchor>("Read more");
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
}
```

Explanations
------------
Extensibility and customisation are one of the biggest advantages of BELLATRIX. So, each BELLATRIX web control gives you the possibility to override its behaviour for the whole test run. You need to initialise the static delegates- **Override{MethodName}Globally**.
```csharp
Button.OverrideClickGlobally = (e) =>
{
    e.ToExists().ToBeClickable().WaitToBe();
    App.JavaScriptService.Execute("arguments[0].click();", e);
};
```
We override the behaviour of the button control with an anonymous lambda function. Instead of using the default **webDriverElement.Click()** method, we click via JavaScript code.
```csharp
Anchor.OverrideFocusGlobally = CustomFocus;

private void CustomFocus(Anchor anchor)
{
    App.JavaScriptService.Execute("window.focus();");
    App.JavaScriptService.Execute("arguments[0].focus();", anchor);
}
```
Override the anchor Focus method by assigning a local private function to the global delegate.

**Note:** *Keep in mind that once the control is overridden globally, all tests call your custom logic, the default behaviour is gone.*

**Note:** *Usually, we assign the control overrides in the AssemblyInitialize method which is called once for a test run.*

Here is a list of all global override **Button** delegates:
- OverrideClickGlobally
- OverrideFocusGlobally
- OverrideHoverGlobally
- OverrideInnerTextGlobally
- OverrideIsDisabledGlobally
- OverrideValueGlobally