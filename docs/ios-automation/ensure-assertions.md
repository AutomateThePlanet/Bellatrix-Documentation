---
layout: default
title:  "Ensure Assertions"
excerpt: "Learn how to use BELLATRIX ensure assertion methods."
date:   2018-11-22 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/ensure-assertions/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestMethod]
public void CommonAssertionsIOSControls()
{
    var button = App.ElementCreateService.CreateByName<Button>("ComputeSumButton");

    button.Click();

    button.EnsureIsNotDisabled();

    var answerLabel = App.ElementCreateService.CreateByName<Label>("Answer");

    answerLabel.EnsureIsVisible();

    var password = App.ElementCreateService.CreateById<Password>("IntegerB");

    password.SetPassword("9");

    var textField = App.ElementCreateService.CreateById<TextField>("IntegerA");

    textField.SetText("1");

    textField.EnsureTextIs("1");

    var checkBox = 
	App.ElementCreateService.CreateByIOSNsPredicate<CheckBox>(
		"type == \"XCUIElementTypeSwitch\" AND name == \"All-day\"");

    checkBox.Check();

    checkBox.EnsureIsChecked();

    var radioButton = 
	App.ElementCreateService.CreateByIOSNsPredicate<RadioButton>(
		"type == \"XCUIElementTypeSwitch\" AND name == \"All-day\"");

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
We can assert whether the control is disabled. The different BELLATRIX iOS elements classes contain lots of these properties which are a representation of the most important app element attributes. The biggest drawback of using vanilla assertions is that the messages displayed on failure are not meaningful at all. If the bellow assertion fails the following message is displayed: "*Message: Assert.AreEqual failed. Expected:<false>. Actual:<true>.*" You can guess what happened, but you do not have information which element failed and on which page. If we use the Ensure extension methods, BELLATRIX waits some time for the condition to pass. After this period if it is not successful, a beatified meaningful exception message is displayed: "***The control should be disabled but it was NOT.***"
```csharp
var checkBox = App.ElementCreateService.CreateByIOSNsPredicate<CheckBox>(
					"type == \"XCUIElementTypeSwitch\" AND name == \"All-day\"");
checkBox.EnsureIsChecked();
```
Here we assert that the checkbox is checked. On fail the following message is displayed: "*Message: Assert.IsTrue failed.*" Cannot learn much about what happened. Now if we use the EnsureIsChecked method and the assertion does not succeed the following error message is displayed: "***The control should be checked but was NOT.***"
```csharp
var answerLabel = App.ElementCreateService.CreateByName<Label>("Answer");
answerLabel.EnsureIsVisible();
```
See if the element is present or not using the IsPresent property.
```csharp
var textField = App.ElementCreateService.CreateById<TextField>("IntegerA");
textField.EnsureTextIs("1");
```
Assert that the proper text is set.
```csharp
var radioButton = App.ElementCreateService.CreateByIOSNsPredicate<RadioButton>(
						"type == \"XCUIElementTypeSwitch\" AND name == \"All-day\"");
radioButton.EnsureIsChecked(timeout: 30, sleepInterval: 2);
```
By default, all **Ensure** methods have 5 seconds timeout. However, you can specify a custom timeout and sleep interval (period for checking again).
**Note**: BELLATRIX provides you with a full BDD logging support for ensure assertions and gives you a way to hook your logic in multiple places.