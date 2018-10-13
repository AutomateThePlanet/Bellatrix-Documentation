---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------
For example, to generate a TextField property, you need to type somewhere in you class wtextfield and press Tab.

```csharp
public TextField CouponCode => Element.CreateById<TextField>("coupon_code");
```

WebDriver Example
```csharp
IWebElement agreeCheckBox = driver.FindElement(By.Id("agreeChB"));
agreeCheckBox.Click();
```

Bellatrix Example
```csharp
CheckBox agreeCheckBox =
App.ElementCreateService.CreateById<CheckBox>("agreeChB");
agreeCheckBox.Check();
```

API usability
```csharp
var promotionsLink = App.ElementCreateService.CreateByLinkText<Button>("Promotions").ToBeVisible().ToBeClickable().ToExists();
promotionsLink.Click();
```




For example, there are 15+ HTML5 web controls that cannot be automated out of the box with vanilla WebDriver.
```csharp
Phone billingPhone = App.ElementCreateService.CreateById<Phone>("billing_phone");
billingPhone.SetPhone("+00359894646464");

Color carColor = App.ElementCreateService.CreateById<Color>("car_color");
carColor.SetColor("#f00030");

Time timeElement = App.ElementCreateService.CreateById<Time>("time");
timeElement.SetTime(12, 12);
```

Also, instead of using other 3rd party libraries we ease the usage of default web controls as well.
```csharp
Select billingCountry = App.ElementCreateService.CreateById<Select>("billing_country");
billingCountry.SelectByText("Bulgaria");
```

Or we bring new useful methods to default controls such as Focus and Hover.
```csharp
var confirmBtn = App.ElementCreateService.CreateById<Button>("confirm");

confirmBtn.Hover();
confirmBtn.Focus();
```

Or we bring new useful methods to default controls such as Focus and Hover.
```csharp
var confirmBtn = App.ElementCreateService.CreateById<Button>("confirm");

confirmBtn.Hover();
confirmBtn.Focus();
```

Most the important attributes of each web control are included, as well as their assertion alternatives.
```csharp
var confirmBtn = App.ElementCreateService.CreateById<Button>("confirm");
confirmBtn.EnsureAccessKeyIs(5);

var productQuantity = App.ElementCreateService.CreateById<Number>("qt_number");
productQuantity.EnsureMaxIs(5);
```

You just need to set the shouldCaptureHttpTraffic to true in the Browser attribute.
```csharp
[Browser(BrowserType.Chrome, BrowserBehavior.RestartEveryTime, shouldCaptureHttpTraffic: true)]
```

Assert that no error codes are present in the requests.
```csharp
App.ProxyService.AssertNoErrorCodes();

Assert that a specific request was made.

App.ProxyService.AssertRequestMade("http://demos.bellatrix.solutions/favicon.ico");
```

To make web pages load faster, you can block some not required services- for example, analytics scripts, and you do not need them in test environments.
```csharp
App.ProxyService.SetUrlToBeBlocked("http://demos.bellatrix.solutions/favicon.ico");
```