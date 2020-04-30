---
layout: default
title:  "Normal Assertions"
excerpt: "Learn how to use normal assertion methods in BELLATRIX tests."
date:   2018-11-22 06:50:17 +0200
parent: ios-automation
permalink: /ios-automation/normal-assertions/
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

    Assert.AreEqual(false, button.IsDisabled);

    var answerLabel = App.ElementCreateService.CreateByName<Label>("Answer");

    Assert.IsTrue(answerLabel.IsPresent);

    var password = App.ElementCreateService.CreateById<Password>("IntegerB");

    password.SetPassword("9");

    var textField = App.ElementCreateService.CreateById<TextField>("IntegerA");

    textField.SetText("1");

    Assert.AreEqual("1", textField.GetText());

    var checkBox = App.ElementCreateService.CreateByIOSNsPredicate<CheckBox>(
						"type == \"XCUIElementTypeSwitch\" AND name == \"All-day\"");

    checkBox.Check();

    Assert.IsTrue(checkBox.IsChecked);

    checkBox.Uncheck();

    Assert.IsFalse(checkBox.IsChecked);

    var radioButton = App.ElementCreateService.CreateByIOSNsPredicate<RadioButton>(
							"type == \"XCUIElementTypeSwitch\" AND name == \"All-day\"");

    radioButton.Click();

    Assert.IsTrue(radioButton.IsChecked);

 	Bellatrix.Assertions.Assert.Multiple(
               () => Assert.IsTrue(radioButton.IsChecked),
               () => Assert.IsFalse(!radioButton.IsChecked));
}
```

Explanations
------------
```csharp
Assert.AreEqual(false, button.IsDisabled);
```
We can assert whether the control is disabled. The different BELLATRIX iOS elements classes contain lots of these properties which are a representation of the most important app element attributes. The biggest drawback of using vanilla assertions is that the messages displayed on failure are not meaningful at all. This is so because most unit testing frameworks are created for much simpler and shorter unit tests. In next chapter, there is information how BELLATRIX solves the problems with the introduction of Ensure methods. If the bellow assertion fails the following message is displayed: "*Message: Assert.AreEqual failed. Expected:<false>. Actual:<true>.*"
You can guess what happened, but you do not have information which element failed and on which screen.
```csharp
Assert.IsTrue(checkBox.IsChecked);
```
Asserts that the checkbox is checked. On fail the following message is displayed: "*Message: Assert.IsTrue failed.*"
Cannot learn much about what happened.
```csharp
Assert.AreEqual("1", textField.GetText());
```
Assert the correct text is set.
```csharp
Assert.IsTrue(answerLabel.IsPresent);
```
See if the element is present or not using the IsPresent property.
```csharp
Assert.IsTrue(radioButton.IsChecked);
```
Assert that the radio button is clicked.
```csharp
 Bellatrix.Assertions.Assert.Multiple(
               () => Assert.IsTrue(radioButton.IsChecked),
               () => Assert.IsFalse(!radioButton.IsChecked));
```
You can execute multiple assertions failing only once viewing all results.

One more thing you need to keep in mind is that normal assertion methods do not include BDD logging and any available hooks. BELLATRIX provides you with a full BDD logging support for ensure assertions and gives you a way to hook your logic in multiple places.