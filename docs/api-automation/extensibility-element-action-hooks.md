---
layout: default
title:  "Extensibility- Element Action Hooks"
excerpt: "Learn how to extend BELLATRIX web element controls using element action hooks."
date:   2021-06-23 06:50:17 +0200
parent: web-automation
permalink: /web-automation/extensibility-element-action-hooks/
anchors:
  introduction: Introduction
  example: Example
  explanations: Explanations
---
Introduction
------------
Another way to extend BELLATRIX is to use the controls hooks. This is how the BDD logging and highlighting are implemented. For each method of the control, there are two hooks- one that is called before the action and one after. For example, the available hooks for the button are:
- **Clicking** - an event executed before button click
- **Clicked** - an event executed after the button is clicked
- **Hovering** - an event executed before button hover
- **Hovered** - an event executed after the button is hovered
- **Focusing** - an event executed before button focus
- **Focused** - an event executed after the button is focused

You need to implement the event handlers for these events and subscribe them. BELLATRIX gives you again a shortcut- you need to create a class and inherit the **{ControlName}EventHandlers**.
In the example, **DebugLogger** is called for each button event printing to Debug window the coordinates of the button. You can call external logging provider, making screenshots before or after each action, the possibilities are limitless.

Example
-------
```csharp
public class DebugLoggingButtonEventHandlers : ButtonEventHandlers
{
    protected override void ClickingEventHandler(object sender, ElementActionEventArgs arg)
    {
        DebugLogger.LogInfo($"Before clicking button. Coordinates: X={arg.component.Wrappedcomponent.Location.X} Y={arg.component.Wrappedcomponent.Location.Y}");
    }

    protected override void ClickedEventHandler(object sender, ElementActionEventArgs arg)
    {
        DebugLogger.LogInfo($"After button clicked. Coordinates: X={arg.component.Wrappedcomponent.Location.X} Y={arg.component.Wrappedcomponent.Location.Y}");
    }

    protected override void HoveringEventHandler(object sender, ElementActionEventArgs arg)
    {
        DebugLogger.LogInfo($"Before hovering button. Coordinates: X={arg.component.Wrappedcomponent.Location.X} Y={arg.component.Wrappedcomponent.Location.Y}");
    }

    protected override void HoveredEventHandler(object sender, ElementActionEventArgs arg)
    {
        DebugLogger.LogInfo($"After button hovered. Coordinates: X={arg.component.Wrappedcomponent.Location.X} Y={arg.component.Wrappedcomponent.Location.Y}");
    }

    protected override void FocusingEventHandler(object sender, ElementActionEventArgs arg)
    {
        DebugLogger.LogInfo($"Before focusing button. Coordinates: X={arg.component.Wrappedcomponent.Location.X} Y={arg.component.Wrappedcomponent.Location.Y}");
    }

    protected override void FocusedEventHandler(object sender, ElementActionEventArgs arg)
    {
        DebugLogger.LogInfo($"After button focused. Coordinates: X={arg.component.Wrappedcomponent.Location.X} Y={arg.component.Wrappedcomponent.Location.Y}");
    }
}
```
```csharp
[TestFixture]
[Browser(BrowserType.Chrome, BrowserBehavior.RestartEveryTime)]
public class ElementActionHooksTests : WebTest
{
    public override void TestsArrange()
    {
        App.AddElementEventHandler<DebugLoggingButtonEventHandlers>();
    }

    [Test]
    public void PurchaseRocketWithGloballyOverridenMethods()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/");

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
        Anchor proceedToCheckout = 
        App.Components.CreateByClassContaining<Anchor>("checkout-button button alt wc-forward");
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
```csharp
public override void TestsArrange()
{
    App.AddElementEventHandler<DebugLoggingButtonEventHandlers>();
}
```
Once you have created the **EventHandlers** class, you need to tell BELLATRIX to use it. To do so call the **App** service method.

**Note**: *Usually, we add element event handlers in the **AssemblyInitialize** method which is called once for a test run.*

```csharp
 App.RemoveElementEventHandler<DebugLoggingButtonEventHandlers>();
```
If you need to remove it during the run you can use the method bellow.

Each BELLATRIX Ensure method gives you a hook too. To implement them you can derive the **EnsureExtensionsEventHandlers** base class and override the event handler methods you need. For example for the method **EnsureIsChecked**, **EnsuredIsCheckedEvent** event is called after the check is done.