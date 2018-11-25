---
layout: default
title:  "DialogService"
excerpt: "Learn how to use BELLATRIX DialogService."
date:   2018-06-22 06:50:17 +0200
parent: web-automation
permalink: /web-automation/dialog-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestClass]
[Browser(BrowserType.Chrome, BrowserBehavior.RestartEveryTime)]
public class DialogServiceTests : WebTest
{
    [TestMethod]
    public void AcceptDialogAlert()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/welcome/");

        var couponButton = App.ElementCreateService.CreateById<Button>("couponBtn");
        couponButton.Click();

        App.DialogService.Handle();
    }

    [TestMethod]
    public void HappyBirthdayCouponDisplayed_When_ClickOnCouponButton()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/welcome/");

        var couponButton = App.ElementCreateService.CreateById<Button>("couponBtn");
        couponButton.Click();

        App.DialogService.Handle((a) => Assert.AreEqual("Try the coupon- happybirthday", a.Text));
    }

    [TestMethod]
    [Ignore]
    public void DismissDialogAlert()
    {
        App.NavigationService.Navigate("http://demos.bellatrix.solutions/welcome/");

        var couponButton = App.ElementCreateService.CreateById<Button>("couponBtn");
        couponButton.Click();

        App.DialogService.Handle(dialogButton: DialogButton.Cancel);
    }
}
```

Explanations
------------
BELLATRIX gives you some methods for handling dialogs.
```csharp
App.DialogService.Handle();
```
You can click on the OK button and handle the alert.
```csharp
App.DialogService.Handle((a) => Assert.AreEqual("Try the coupon- happybirthday", a.Text));
```
You can pass an anonymous lambda function and do something with the alert.
```csharp
App.DialogService.Handle(dialogButton: DialogButton.Cancel);
```
You can tell the dialog service to click a different button.