---
layout: default
title:  "Custom Code"
excerpt: "Custom Code"
date:   2018-02-20 06:50:17 +0200
permalink: /customcode/
---
Bellatrix Test Automation Framework 
---------------------------------------------------------


Element Snippets

```csharp
public CheckBox PermanentTransfer => Element.CreateByName<CheckBox>("BellaCheckBox");
```

Locate Elements


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

API Usability- Wait for Elements
```csharp
var purchaseButton = App.ElementCreateService.CreateByName<Button>("Purchase").ToBeVisible().ToBeClickable().ToExists();
purchaseButton.Click();
```

150+ Additional Elements  Actions
```csharp
var purchaseButton = App.ElementCreateService.CreateByName<Button>("Purchase");
purchaseButton.Click();

var calendar = App.ElementCreateService.CreateByAutomationId<Calendar>("calendar");
Assert.AreEqual(false, calendar.IsDisabled);

var checkBox = App.ElementCreateService.CreateByName<CheckBox>("BellaCheckBox");
checkBox.Check();
Assert.IsTrue(checkBox.IsChecked);

var password = App.ElementCreateService.CreateByAutomationId<Password>("passwordBox");
password.SetPassword("topsecret");
```

```csharp
CheckBox agreeCheckBox =
App.ElementCreateService.CreateById<CheckBox>("agreeChB");
agreeCheckBox.Check();
 ```

Or we bring new useful methods to default controls such as Focus and Hover.
```csharp
var datePicker = App.ElementCreateService.CreateByAutomationId<Date>("DatePicker");
datePicker.Hover();
datePicker.Focus();
```
The most important attributes of each desktop control are included, as well as their assertion alternatives.
```csharp
var label = App.ElementCreateService.CreateByName<Label>("Result Label");
Assert.IsTrue(label.IsPresent);
Assert.AreEqual("Rocket", comboBox.InnerText);
```