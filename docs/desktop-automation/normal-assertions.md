---
layout: default
title:  "Normal Assertions"
excerpt: "Learn how to use normal assertion methods in BELLATRIX tests."
date:   2018-06-22 06:50:17 +0200
parent: desktop-automation
permalink: /desktop-automation/normal-assertions/
anchors:
  example: Example
  explanations: Explanations
---
Example
-------
```csharp
[TestMethod]
public void CommonActionsWithDesktopControls_Wpf()
{
    var calendar = App.ElementCreateService.CreateByAutomationId<Calendar>("calendar");

    Assert.AreEqual(false, calendar.IsDisabled);

    var checkBox = App.ElementCreateService.CreateByName<CheckBox>("BellaCheckBox");

    checkBox.Check();

    Assert.IsTrue(checkBox.IsChecked);

    var comboBox = App.ElementCreateService.CreateByAutomationId<ComboBox>("select");

    comboBox.SelectByText("Item2");

    Assert.AreEqual("Item2", comboBox.InnerText);

    var label = App.ElementCreateService.CreateByName<Label>("Result Label");

    Assert.IsTrue(label.IsPresent);

    var radioButton = App.ElementCreateService.CreateByName<RadioButton>("RadioButton");

    radioButton.Click();

    Assert.IsTrue(radioButton.IsChecked);

	Bellatrix.Assertions.Assert.Multiple(
        () => Assert.IsTrue(radioButton.IsChecked),
        () => Assert.AreEqual("Item2", comboBox.InnerText));
}
```

Explanations
------------
```csharp
Assert.AreEqual(false, calendar.IsDisabled);
```
We can assert weather the control is disabled. The different BELLATRIX desktop elements classes contain lots of these properties which are a representation of the most important app element attributes.The biggest drawback of using vanilla assertions is that the messages displayed on failure are not meaningful at all. This is so because most unit testing frameworks are created for much simpler and shorter unit tests. In next chapter, there is information how BELLATRIX solves the problems with the introduction of Ensure methods. 
If the bellow assertion fails the following message is displayed: "*Message: Assert.AreEqual failed. Expected:<false>. Actual:<true>.*" You can guess what happened, but you do not have information which element failed and on which page.
```csharp
Assert.IsTrue(checkBox.IsChecked);
```
Here we assert that the checkbox is checked. On fail the following message is displayed: "*Message: Assert.IsTrue failed.*" Cannot learn much about what happened.
```csharp
Assert.AreEqual("Item2", comboBox.InnerText);
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
```csharp
Bellatrix.Assertions.Assert.Multiple(
        () => Assert.IsTrue(radioButton.IsChecked),
        () => Assert.AreEqual("Item2", comboBox.InnerText));
```
You can execute multiple assertions failing only once viewing all results.

One more thing you need to keep in mind is that normal assertion methods do not include BDD logging and any available hooks. BELLATRIX provides you with a full BDD logging support for ensure assertions and gives you a way to hook your logic in multiple places.