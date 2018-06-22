---
layout: default
title:  "DialogService"
feature-title: "Web Automation"
excerpt: "Learn how to use Bellatrix DialogService."
date:   2018-06-22 06:50:17 +0200
permalink: /dialog-service/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```
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
Bellatrix gives you some methods for handling dialogs.
```
App.DialogService.Handle();
```
You can click on the OK button and handle the alert.
```
App.DialogService.Handle((a) => Assert.AreEqual("Try the coupon- happybirthday", a.Text));
```
You can pass an anonymous lambda function and do something with the alert.
```
App.DialogService.Handle(dialogButton: DialogButton.Cancel);
```
You can tell the dialog service to click a different button.