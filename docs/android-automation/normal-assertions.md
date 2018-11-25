---
layout: default
title:  "Normal Assertions"
excerpt: "Learn how to use normal assertion methods in BELLATRIX tests."
date:   2018-10-22 06:50:17 +0200
parent: android-automation
permalink: /android-automation/normal-assertions/
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
    Assert.AreEqual(false, button.IsDisabled);

    var checkBox = App.ElementCreateService.CreateByIdContaining<CheckBox>("check1");

    checkBox.Check();

    Assert.IsTrue(checkBox.IsChecked);

    var comboBox = App.ElementCreateService.CreateByIdContaining<ComboBox>("spinner1");

    comboBox.SelectByText("Jupiter");

    Assert.AreEqual("Jupiter", comboBox.GetText());

    var label = App.ElementCreateService.CreateByText<Label>("textColorPrimary");

    Assert.IsTrue(label.IsPresent);

    var radioButton = App.ElementCreateService.CreateByIdContaining<RadioButton>("radio2");

    radioButton.Click();

    Assert.IsTrue(radioButton.IsChecked);
}
```

Explanations
------------
```csharp
Assert.AreEqual(false, button.IsDisabled);
```
We can assert whether the control is disabled. The different BELLATRIX Android elements classes contain lots of these properties which are a representation of the most important app element attributes. The biggest drawback of using vanilla assertions is that the messages displayed on failure are not meaningful at all. This is so because most unit testing frameworks are created for much simpler and shorter unit tests. In next chapter, there is information how BELLATRIX solves the problems with the introduction of Ensure methods. If the bellow assertion fails the following message is displayed: "*Message: Assert.AreEqual failed. Expected:<false>. Actual:<true>.*"
You can guess what happened, but you do not have information which element failed and on which screen.
```csharp
Assert.IsTrue(checkBox.IsChecked);
```
Asserts that the checkbox is checked. On fail the following message is displayed: "*Message: Assert.IsTrue failed.*"
Cannot learn much about what happened.
```csharp
Assert.AreEqual("Jupiter", comboBox.GetText());
```
Assert that the proper item is selected from the combobox items.
```csharp
Assert.IsTrue(label.IsPresent);
```
See if the element is present or not using the IsPresent property.
```csharp
Assert.IsTrue(radioButton.IsChecked);
```
Assert that the radio button is clicked.

One more thing you need to keep in mind is that normal assertion methods do not include BDD logging and any available hooks. BELLATRIX provides you with a full BDD logging support for ensure assertions and gives you a way to hook your logic in multiple places.