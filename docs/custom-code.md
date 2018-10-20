---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------
humar readable

WebDriver Example 
```csharp
IWebElement agreeCheckBox = driver.FindElement(By.Id("agreeChB"));
agreeCheckBox.Click();

IWebElement firstNameTextField = driver.FindElement(By.Id("firstName"));
firstNameTextField.SendKeys("John");

IWebElement avatarUpload = driver.FindElement(By.Id("uploadAvatar"));
avatarUpload.SendKeys("pathTo\\myAvatar.jpg");

IWebElement saveBtn = driver.FindElement(By.Id("saveBtn"));
agreeCheckBox.SendKeys(Keys.Enter); 
```


Bellatrix Example 
```csharp
CheckBox agreeCheckBox = App.ElementCreateService.CreateById<CheckBox>("agreeChB");
agreeCheckBox.Check();

TextField firstNameTextField = App.ElementCreateService.CreateById<TextField>("firstName");
firstNameTextField.SetText("John");

InputFile avatarUpload = App.ElementCreateService.CreateById<InputFile>("uploadAvatar");
avatarUpload.Upload("pathTo\\myAvatar.jpg");

Button saveBtn = App.ElementCreateService.CreateById<Button>("saveBtn");
saveBtn.ClickByEnter();
 ```


Hide Low-level Details with Page Objects 
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


BDD Logging 
```csharp
example 
```




