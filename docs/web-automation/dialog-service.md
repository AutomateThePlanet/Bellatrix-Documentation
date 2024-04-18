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
  playwright: Playwright
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

Playwright
------------
Playwright auto-dismisses dialogs but in case you want to handle them yourself or if Playwright is unable to dismiss them on its own, there are slightly different methods you need to use.
```csharp
[Test]
public void AcceptDialogAlert()
{
    App.Navigation.Navigate("http://demos.bellatrix.solutions/welcome/");

    var couponButton = App.Components.CreateById<Button>("couponBtn");

    App.Dialogs.RunAndWaitForDialog(() => couponButton.Click(), timeout: 1000);

    App.Dialogs.Accept();
}
```

You pass the logic that will trigger a dialog to this **RunAndWaitForDialog** method and you give timeout in milliseconds. In case you don't specify the timeout, it will set the timeout for **ActionTimeoutWhenHandlingDialogs** from the config file.
If you don't use this method, no **EventHandler** would be added and thus you won't be able to do the custom logic for the **Dialog**.

Available methods in this **DialogService** are:
```csharp
Dialog dialog = App.Dialogs.RunAndWaitForDialog(() => couponButton.Click(), timeout: 1000);
```
Adds an **EventHandler** to the Page which will listen for dialogs and get the **Dialog**, then performs the action you have specified which will trigger the event **OnDialog** and finally returns the **Dialog** object.
```csharp
App.Dialogs.Accept();
```
Accepts the dialog.
```csharp
App.Dialogs.Accept("prompt text");
```
Types the prompt text in the dialog and then accepts it.
```csharp
App.Dialogs.Dismiss();
```
Dismisses the dialog.
```csharp
string message = App.Dialogs.GetMessage();
```
Gets the dialog's message.