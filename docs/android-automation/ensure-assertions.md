---
layout: default
title:  "Ensure Assertions"
excerpt: "Learn how to use BELLATRIX ensure assertion methods."
date:   2018-10-22 06:50:17 +0200
parent: android-automation
permalink: /android-automation/ensure-assertions/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestMethod]
public void CommonAssertionsAndroidControls()
{
    var button = App.ElementCreateService.CreateByIdContaining<Button>("button");

    button.EnsureIsNotDisabled();

    var checkBox = App.ElementCreateService.CreateByIdContaining<CheckBox>("check1");

    checkBox.Check();

    checkBox.EnsureIsChecked();

    var comboBox = App.ElementCreateService.CreateByIdContaining<ComboBox>("spinner1");

    comboBox.SelectByText("Jupiter");

    comboBox.EnsureTextIs("Jupiter");

    var label = App.ElementCreateService.CreateByText<Label>("textColorPrimary");

    label.EnsureIsVisible();

    var radioButton = App.ElementCreateService.CreateByIdContaining<RadioButton>("radio2");

    radioButton.Click();

    radioButton.EnsureIsChecked(timeout: 30, sleepInterval: 2);
}
```

Explanations
------------
```csharp
button.EnsureIsNotDisabled();
//Assert.AreEqual(false, button.IsDisabled);
```
We can assert whether the control is disabled. The different BELLATRIX Android elements classes contain lots of these properties which are a representation of the most important app element attributes. The biggest drawback of using vanilla assertions is that the messages displayed on failure are not meaningful at all. If the bellow assertion fails the following message is displayed: "*Message: Assert.AreEqual failed. Expected:<false>. Actual:<true>.*" You can guess what happened, but you do not have information which element failed and on which page. If we use the Ensure extension methods, BELLATRIX waits some time for the condition to pass. After this period if it is not successful, a beatified meaningful exception message is displayed: "***The control should be disabled but it was NOT.***"
```csharp
var checkBox = App.ElementCreateService.CreateByIdContaining<CheckBox>("check1");
checkBox.EnsureIsChecked();
```
Here we assert that the checkbox is checked. On fail the following message is displayed: "*Message: Assert.IsTrue failed.*" Cannot learn much about what happened. Now if we use the EnsureIsChecked method and the assertion does not succeed the following error message is displayed: "***The control should be checked but was NOT.***"
```csharp
var comboBox = App.ElementCreateService.CreateByIdContaining<ComboBox>("spinner1");
comboBox.EnsureTextIs("Jupiter");
```
Assert that the proper item is selected from the combobox items.
```csharp
var label = App.ElementCreateService.CreateByText<Label>("textColorPrimary");
label.EnsureIsVisible();
```
See if the element is present or not using the IsPresent property.
```csharp
var radioButton = App.ElementCreateService.CreateByIdContaining<RadioButton>("radio2");
 radioButton.EnsureIsChecked(timeout: 30, sleepInterval: 2);
```
By default, all Ensure methods have 5 seconds timeout. However, you can specify a custom timeout and sleep interval (period for checking again).

Bellatrix provides you with a full BDD logging support for ensure assertions and gives you a way to hook your logic in multiple places.