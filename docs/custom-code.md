---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------


Lazy Loading of Elements

Webdriver
```csharp
var agreeCheckBox = driver.FindElementById("agreeChB"));
var confirmButton = driver.FindElementById("confirm"));
agreeCheckBox.Click(); // disables the button
confirmButton.Click();
```

Lazy Loading of Elements
Bellatrix
```csharp
var agreeCheckBox = App.ElementCreateService.CreateById<CheckBox>("agreeChB");
var confirmButton = App.ElementCreateService.CreateById<Button>("confirm");
agreeCheckBox.Uncheck();
confirmButton.Click();
```
In most cases, if you just call the following code snippet, your test will fail because the content box with a correct message might be displayed asynchronously.
```csharp
Assert.AreEqual("Order Completed", successBox.Text);
```
Waits for the message alert to disappear.
```csharp
updateCart.EnsureIsDisabled();
```

Wait for message alert to disappear.
```csharp
messageAlert.EnsureIsNotVisible();
```

You can even fine-tune the timeouts.
```csharp
totalContentBox.EnsureInnerTextIs("120.00€", timeout: 30, sleepInterval: 2);
```