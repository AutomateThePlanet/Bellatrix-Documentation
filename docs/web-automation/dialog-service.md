---
layout: default
title:  "DialogService"
excerpt: "Learn how to use BELLATRIX DialogService."
date:   2021-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/dialog-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestFixture]
public class DialogServiceTests : WebTest
{
    [Test]
    public void AcceptDialogAlert()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/welcome/");

        var couponButton = App.Components.CreateById<Button>("couponBtn");
        couponButton.Click();

        App.Dialogs.Handle();
    }

    [Test]
    public void HappyBirthdayCouponDisplayed_When_ClickOnCouponButton()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/welcome/");

        var couponButton = App.Components.CreateById<Button>("couponBtn");
        couponButton.Click();

        App.Dialogs.Handle((a) => Assert.AreEqual("Try the coupon- happybirthday", a.Text));
    }

    [Test]
    [Ignore]
    public void DismissDialogAlert()
    {
        App.Navigation.Navigate("http://demos.bellatrix.solutions/welcome/");

        var couponButton = App.Components.CreateById<Button>("couponBtn");
        couponButton.Click();

        App.Dialogs.Handle(dialogButton: DialogButton.Cancel);
    }
}
```

Explanations
------------
BELLATRIX gives you some methods for handling dialogs.
```csharp
App.Dialogs.Handle();
```
You can click on the OK button and handle the alert.
```csharp
App.Dialogs.Handle((a) => Assert.AreEqual("Try the coupon- happybirthday", a.Text));
```
You can pass an anonymous lambda function and do something with the alert.
```csharp
App.Dialogs.Handle(dialogButton: DialogButton.Cancel);
```
You can tell the dialog service to click a different button.