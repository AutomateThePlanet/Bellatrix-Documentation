---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------



WebDriver Example
```csharp
WindowsElement agreeCheckBox = driver.FindElementById("agreeChB"));
agreeCheckBox.Click();

WindowsElement firstNameTextField = driver.FindElementById("firstName"));
firstNameTextField.SendKeys("John");

WindowsElement avatarUpload = driver.FindElementById("uploadAvatar"));
avatarUpload.SendKeys("pathTo\\myAvatar.jpg");

WindowsElement saveBtn = driver.FindElementById("saveBtn"));
agreeCheckBox.SendKeys(Keys.Enter);
```



Bellatrix Example
```csharp
CheckBox agreeCheckBox = App.ElementCreateService.CreateById<CheckBox>("agreeChB");
agreeCheckBox.Check();

TextField firstNameTextField = App.ElementCreateService.CreateById<TextField>("firstName");
firstNameTextField.SetText("John");

var comboBox = App.ElementCreateService.CreateByAutomationId<ComboBox>("select");
comboBox.SelectByText("Item2");

Button saveBtn = App.ElementCreateService.CreateById<Button>("saveBtn");
saveBtn.ClickByEnter();
```


page object
```csharp
var homePage = App.GoTo<HomePage>();

homePage.FilterProducts(ProductFilter.Popularity);
homePage.AddProductById(28);
homePage.ViewCartButton.Click();

var cartPage = App.Create<CartPage>();

cartPage.ApplyCoupon("happybirthday");
cartPage.UpdateProductQuantity(1, 2);
cartPage.AssertTotalPrice("95.00");
cartPage.ProceedToCheckout.Click();
```

```csharp
Start Test
Class = BDDLoggingTests Name = PurchaseRocketWithLogs
Select 'Sort by price: low to high' on CartPage 
Click ApplyCupon on CartPage 
Ensure SuccessDiv on CartPage inner text is 'Coupon code applied successfully.'
Set '0' into QuantityNumber on CartPage 
Click UpdateCartButton on CartPage 
Ensure OrderTotalSpan on CartPage inner text is '95.00€'
```